"use client";
// The one client boundary for the dashboard route — same split rationale as
// design-system/ShowcaseInteractive.tsx: page.tsx stays a Server Component
// (so its `metadata` export works, which a "use client" page file can't
// have), and every piece of interactive state (link list, pagination,
// modals, toasts) lives here instead.

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  IconButton,
  Badge,
  DataTable,
  StatCard,
  EmptyState,
  Modal,
  PageError,
  Skeleton,
  Toast,
  AnalyticsChart,
  SegmentedControl,
  type DataTableColumn,
  type ToastProps,
} from "@/components/design-system";
import { Pagination } from "@/components/patterns/Pagination";
import { CreateLinkModal } from "@/components/patterns/CreateLinkModal";
import { EditLinkModal, type EditLinkValues } from "@/components/patterns/EditLinkModal";
import { DeleteConfirmModal } from "@/components/patterns/DeleteConfirmModal";
import { useAuth } from "@/context/AuthContext";
import { listLinks, createLink, updateLink, deleteLink, getLinkStats, ApiError } from "@/lib/api";
import { deriveLinkStatus } from "@/lib/deriveLinkStatus";
import type { Link } from "@/types/link";
import type { CreateLinkRequest, ListLinksResponse, LinkStatsResponse } from "@/types/api";

const LIMIT = 20;

type ToastFields = Pick<ToastProps, "variant" | "title" | "detail">;
type ToastState = ToastFields | null;

/** Shared shape for turning a caught error into Toast props — used by every
 * mutation below. 429s get a distinct, retry-worded message; everything else
 * surfaces the API's message plus its requestId (correlates to Pino logs on
 * the API side) via Toast's `detail`, which is a plain ReactNode — this
 * composes without adding a requestId prop to Toast itself. */
function errorToast(err: unknown, title: string): ToastFields {
  if (err instanceof ApiError) {
    if (err.code === "TOO_MANY_REQUESTS") {
      return {
        variant: "warning",
        title: "Slow down",
        detail: err.retryAfterSeconds ? `Try again in ${err.retryAfterSeconds}s.` : "Try again shortly.",
      };
    }
    return {
      variant: "danger",
      title,
      detail: (
        <>
          {err.message}
          <div style={{ fontSize: "var(--text-xs)", color: "var(--color-fg-subtle)", marginTop: 2 }}>ref: {err.requestId}</div>
        </>
      ),
    };
  }
  return { variant: "danger", title, detail: "Something went wrong." };
}

export function DashboardInteractive() {
  const { token, user, isLoading, logout } = useAuth();
  const router = useRouter();

  const [links, setLinks] = useState<Link[]>([]);
  const [pagination, setPagination] = useState<ListLinksResponse["pagination"] | null>(null);
  const [offset, setOffset] = useState(0);
  const [loadingLinks, setLoadingLinks] = useState(true);
  const [listError, setListError] = useState<unknown>(null);

  const [createOpen, setCreateOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<Link | null>(null);
  const [editSaving, setEditSaving] = useState(false);
  const [deletingLink, setDeletingLink] = useState<Link | null>(null);
  const [deleteSaving, setDeleteSaving] = useState(false);
  const [statsLink, setStatsLink] = useState<Link | null>(null);

  const [toast, setToast] = useState<ToastState>(null);

  // UX redirect, not a security boundary — the API's requireAuth middleware
  // is what actually stops an unauthenticated request; this only avoids
  // flashing a broken dashboard. Gated on `isLoading` so a real logged-in
  // user doesn't get bounced for one frame while AuthContext's mount-time
  // restore is still running.
  useEffect(() => {
    if (!isLoading && !token) router.replace("/login");
  }, [isLoading, token, router]);

  // Link list fetch. Keyed on [token, offset] — token so a different
  // account's session (login after logout, no reload) always refetches
  // instead of showing stale data; offset so Prev/Next re-triggers this same
  // effect instead of needing a separate imperative fetch call.
  useEffect(() => {
    if (!token) return;
    const controller = new AbortController();
    setLoadingLinks(true);
    setListError(null);
    listLinks(token, { limit: LIMIT, offset }, controller.signal)
      .then(({ links, pagination }) => {
        setLinks(links);
        setPagination(pagination);
      })
      .catch((err) => {
        if (err instanceof Error && err.name === "AbortError") return;
        setListError(err);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoadingLinks(false);
      });
    return () => controller.abort();
  }, [token, offset]);

  if (!isLoading && !token) {
    return (
      <div style={{ minHeight: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <PageError code={401} action={<Button onClick={() => router.push("/login")}>Sign in</Button>} />
      </div>
    );
  }

  const handleCreate = async (body: CreateLinkRequest) => {
    if (!token) return;
    const { link } = await createLink(token, body);
    setLinks((prev) => [link, ...prev]);
    setPagination((prev) => (prev ? { ...prev, total: prev.total + 1 } : prev));
    setCreateOpen(false);
    setToast({ variant: "success", title: "Link created", detail: `short.link/${link.shortCode}` });
  };

  const handleSaveEdit = async (values: EditLinkValues) => {
    if (!token || !editingLink) return;
    setEditSaving(true);
    try {
      const { link } = await updateLink(token, editingLink.id, {
        destinationUrl: values.destinationUrl,
        expiresAt: values.expiresAt,
        maxClicks: values.maxClicks,
      });
      setLinks((prev) => prev.map((l) => (l.id === link.id ? link : l)));
      setEditingLink(null);
      setToast({ variant: "success", title: "Link updated" });
    } catch (err) {
      setToast(errorToast(err, "Couldn't update link"));
    } finally {
      setEditSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!token || !deletingLink) return;
    setDeleteSaving(true);
    try {
      await deleteLink(token, deletingLink.id);
      setLinks((prev) => prev.filter((l) => l.id !== deletingLink.id));
      setPagination((prev) => (prev ? { ...prev, total: Math.max(0, prev.total - 1) } : prev));
      setToast({ variant: "success", title: "Link deleted" });
      setDeletingLink(null);
    } catch (err) {
      setToast(errorToast(err, "Couldn't delete link"));
    } finally {
      setDeleteSaving(false);
    }
  };

  const columns: DataTableColumn<Link>[] = [
    { key: "shortCode", header: "Short link", mono: true, render: (r) => `short.link/${r.shortCode}` },
    { key: "destinationUrl", header: "Destination" },
    { key: "clickCount", header: "Clicks", align: "right", render: (r) => r.clickCount.toLocaleString() },
    { key: "status", header: "Status", render: (r) => <Badge status={deriveLinkStatus(r)} /> },
    {
      key: "actions",
      header: "",
      align: "right",
      render: (r) => (
        <div style={{ display: "inline-flex", gap: 2 }}>
          <IconButton
            icon="bar-chart-3"
            label="View stats"
            onClick={(e) => {
              e.stopPropagation();
              setStatsLink(r);
            }}
          />
          <IconButton
            icon="square-pen"
            label="Edit link"
            onClick={(e) => {
              e.stopPropagation();
              setEditingLink(r);
            }}
          />
          <IconButton
            icon="trash-2"
            label="Delete link"
            onClick={(e) => {
              e.stopPropagation();
              setDeletingLink(r);
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: "72rem", margin: "0 auto", padding: 24, display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-3)" }}>
        <div>
          <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 600 }}>Links</h1>
          {user && <p style={{ color: "var(--color-fg-muted)", fontSize: "var(--text-sm)" }}>{user.email}</p>}
        </div>
        <div style={{ display: "flex", gap: "var(--space-2)" }}>
          <Button variant="secondary" onClick={logout}>
            Log out
          </Button>
          <Button variant="primary" icon="link-2" onClick={() => setCreateOpen(true)}>
            Create link
          </Button>
        </div>
      </div>

      {pagination && <StatCard label="Total links" value={pagination.total.toLocaleString()} />}

      {Boolean(listError) && <Toast {...errorToast(listError, "Couldn't load links")} onDismiss={() => setListError(null)} />}

      {loadingLinks ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} height={44} />
          ))}
        </div>
      ) : links.length === 0 ? (
        <EmptyState
          icon="inbox"
          title="Create your first short link"
          description="Paste a long URL to get started."
          action={
            <Button variant="primary" icon="link-2" onClick={() => setCreateOpen(true)}>
              Create link
            </Button>
          }
        />
      ) : (
        <>
          <DataTable columns={columns} rows={links} getRowKey={(r) => r.id} onRowClick={(r) => setStatsLink(r)} />
          {pagination && (
            <Pagination
              total={pagination.total}
              limit={pagination.limit}
              offset={pagination.offset}
              onPrev={() => setOffset((o) => Math.max(0, o - LIMIT))}
              onNext={() => setOffset((o) => o + LIMIT)}
            />
          )}
        </>
      )}

      {createOpen && <CreateLinkModal onClose={() => setCreateOpen(false)} onCreate={handleCreate} />}

      {editingLink && (
        <EditLinkModal
          key={editingLink.shortCode}
          shortCode={editingLink.shortCode}
          initialValues={{
            destinationUrl: editingLink.destinationUrl,
            expiresAt: editingLink.expiresAt,
            maxClicks: editingLink.maxClicks,
            isPasswordProtected: editingLink.isPasswordProtected,
          }}
          onClose={() => setEditingLink(null)}
          onSave={handleSaveEdit}
          saving={editSaving}
        />
      )}

      {deletingLink && (
        <DeleteConfirmModal
          target={{ kind: "single", shortUrl: `short.link/${deletingLink.shortCode}` }}
          onCancel={() => setDeletingLink(null)}
          onConfirm={handleDelete}
          saving={deleteSaving}
        />
      )}

      {statsLink && <LinkStatsModal token={token} link={statsLink} onClose={() => setStatsLink(null)} />}

      {toast && (
        <div style={{ position: "fixed", bottom: 24, right: 24, maxWidth: 360, zIndex: 10 }}>
          <Toast {...toast} onDismiss={() => setToast(null)} />
        </div>
      )}
    </div>
  );
}

const RANGE_OPTIONS = [
  { value: "1", label: "24h" },
  { value: "7", label: "7d" },
  { value: "30", label: "30d" },
];

function LinkStatsModal({ token, link, onClose }: { token: string | null; link: Link; onClose: () => void }) {
  const [days, setDays] = useState("7");
  const [stats, setStats] = useState<LinkStatsResponse["stats"]>([]);
  const [loading, setLoading] = useState(true);

  // Keyed on [token, link.id, days] — switching the SegmentedControl range or
  // the link this modal is showing both need a fresh fetch; an AbortController
  // guards against a slow 30d response landing after a quicker 7d one already
  // rendered (see Notes.md's stale-response race entry).
  useEffect(() => {
    if (!token) return;
    const controller = new AbortController();
    setLoading(true);
    getLinkStats(token, link.id, Number(days), controller.signal)
      .then(({ stats }) => setStats(stats))
      .catch((err) => {
        if (err instanceof Error && err.name === "AbortError") return;
        setStats([]);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [token, link.id, days]);

  return (
    <Modal title={`Stats — short.link/${link.shortCode}`} onClose={onClose} size="lg">
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <SegmentedControl aria-label="Stats range" value={days} onChange={setDays} options={RANGE_OPTIONS} />
        <AnalyticsChart data={stats.map((s) => s.clicks)} labels={stats.map((s) => s.day)} loading={loading} height={220} />
      </div>
    </Modal>
  );
}
