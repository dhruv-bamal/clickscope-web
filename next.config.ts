import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Standalone output traces the server bundle's actual dependency graph
  // and emits a pruned .next/standalone/node_modules, plus server.js — but
  // deliberately excludes .next/static/ and public/ (meant to be served by
  // a CDN/reverse proxy in front of it). The Dockerfile copies both back in
  // manually. See Notes.md, "Phase 15b."
  output: "standalone",
};

export default nextConfig;
