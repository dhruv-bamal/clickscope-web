# Multi-stage build producing a single production image for the Next.js
# frontend. Mirrors clickscope-api's Phase 15a Dockerfile's stage-per-concern
# shape (deps -> build -> runtime), but the runtime stage deliberately does
# NOT follow that Dockerfile's `npm ci --omit=dev` pattern -- see the comment
# on the runtime stage below, and Notes.md, "Phase 15b."

# ---- deps: install once ----
FROM node:24-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ---- build: compile the app.
# NEXT_PUBLIC_API_URL must arrive as a build ARG, not a runtime ENV --
# Next.js inlines NEXT_PUBLIC_*-prefixed vars into the client JS bundle at
# `next build` time. Setting it only via `docker run -e` has zero effect on
# JS that was already compiled into static chunks in this stage. ----
FROM deps AS build
WORKDIR /app
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
COPY next.config.ts tsconfig.json ./
COPY public ./public
COPY src ./src
RUN npm run build

# ---- runtime: a fresh, minimal image containing ONLY next build's
# standalone output.
#
# Unlike clickscope-api's runtime-base stage, this stage does NOT run its
# own `npm ci --omit=dev` against package.json. `output: "standalone"`
# already performs its own dependency trace at build time and copies only
# the production packages actually reachable from the server bundle into
# .next/standalone/node_modules -- running npm ci here would be redundant
# work against a package.json this stage doesn't even need, and would
# resolve a *different*, un-traced dependency set than the one the server
# bundle was actually built and tested against. The API's runtime-base
# pattern exists because that repo's build output is plain compiled JS with
# no built-in dependency pruning of its own; the frontend's build output
# already did that pruning itself, so re-doing it here would be wrong, not
# just unnecessary. ----
FROM node:24-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
# Next's standalone server.js binds to localhost by default -- without this,
# the container is unreachable from outside despite `docker run -p` mapping
# the port, since the process itself never listens on the external
# interface. See the official Next.js Docker example (vercel/next.js,
# examples/with-docker) for the same setting.
ENV HOSTNAME=0.0.0.0
# node:24-alpine already ships a non-root `node` user (uid 1000) -- same
# convention as clickscope-api's Dockerfile.
USER node

# Standalone output excludes .next/static/ and public/ by design (see
# next.config.ts's comment and Notes.md, "Phase 15b") -- both must be
# copied in at these exact destination paths or static assets 404 despite
# the server booting fine.
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
COPY --from=build --chown=node:node /app/public ./public

EXPOSE 3000
# Exec form, not shell form -- this makes `node` PID 1, so it receives
# SIGTERM directly from `docker stop`. Shell-form CMD makes /bin/sh PID 1,
# which does not forward SIGTERM to the child node process. Same reasoning
# as clickscope-api's Dockerfile.
CMD ["node", "server.js"]
