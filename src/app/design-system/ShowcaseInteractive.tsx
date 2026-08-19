"use client";
// Holds every piece of local demo state the showcase needs (Modal open/close,
// Toast, Toggle/Checkbox/SegmentedControl/FilterBar, DropdownMenu, Pagination
// offset) plus the components that only need a client boundary because this
// page attaches no-op demo handlers (onCopy/onMenu/onRowClick/...) to
// otherwise-server-safe primitives like LinkCard and Toast. Split out of
// page.tsx specifically so QrCodePopover — an async Server Component — never
// ends up inside this client tree; see page.tsx and Notes.md for why that
// split is load-bearing, not stylistic.

import React, { useState } from "react";
import {
  Button,
  IconButton,
  Checkbox,
  SegmentedControl,
  Select,
  Textarea,
  Toggle,
  Input,
  AnalyticsChart,
  Badge,
  DataTable,
  TableBar,
  LinkCard,
  StatCard,
  Tag,
  DropdownMenu,
  EmptyState,
  Modal,
  PageError,
  Skeleton,
  Spinner,
  Toast,
  BulkActionToolbar,
  FilterBar,
  type DataTableColumn,
} from "@/components/design-system";
import { Pagination } from "@/components/patterns/Pagination";
import { DeleteConfirmModal } from "@/components/patterns/DeleteConfirmModal";
import { EditLinkModal } from "@/components/patterns/EditLinkModal";
import { Section } from "./Section";

const ANALYTICS_DATA = [120, 180, 150, 220, 260, 210, 300, 340, 280, 360, 400, 420];
const ANALYTICS_LABELS = ANALYTICS_DATA.map((_, i) => `Mar ${i + 1}`);

interface MockLinkRow {
  id: string;
  short: string;
  destination: string;
  clicks: number;
  status: "active" | "expiring" | "expired" | "protected" | "paused";
}

const MOCK_ROWS: MockLinkRow[] = [
  { id: "1", short: "short.link/launch", destination: "https://acme.com/spring-launch", clicks: 8213, status: "active" },
  { id: "2", short: "short.link/promo24", destination: "https://acme.com/promo/24", clicks: 452, status: "expiring" },
  { id: "3", short: "short.link/webinar", destination: "https://acme.com/events/webinar", clicks: 91, status: "expired" },
  { id: "4", short: "short.link/vault", destination: "https://acme.com/internal/vault", clicks: 12, status: "protected" },
  { id: "5", short: "short.link/q2", destination: "https://acme.com/reports/q2", clicks: 0, status: "paused" },
];

const TABLE_COLUMNS: DataTableColumn<MockLinkRow>[] = [
  { key: "short", header: "Short link", mono: true },
  { key: "destination", header: "Destination" },
  { key: "clicks", header: "Clicks", align: "right", render: (r) => r.clicks.toLocaleString() },
  { key: "status", header: "Status", render: (r) => <Badge status={r.status} /> },
];

export function ShowcaseInteractive() {
  const [segment, setSegment] = useState("7d");
  const [checked, setChecked] = useState(true);
  const [toggled, setToggled] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<(string | number)[]>(["1"]);
  const [showToast, setShowToast] = useState(true);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [offset, setOffset] = useState(0);

  return (
    <>
      <Section title="Forms">
        <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap" }}>
          {(["primary", "secondary", "ghost", "destructive", "link"] as const).map((variant) => (
            <Button key={variant} variant={variant} icon="link-2">
              {variant}
            </Button>
          ))}
          <Button variant="primary" loading>
            Loading
          </Button>
        </div>
        <div style={{ display: "flex", gap: "var(--space-2)" }}>
          <IconButton icon="copy" label="Copy" />
          <IconButton icon="qr-code" label="Show QR code" variant="secondary" />
          <IconButton icon="trash-2" label="Delete" />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "var(--space-4)" }}>
          <Input label="Destination URL" placeholder="https://example.com/very/long/path" defaultValue="https://acme.com/spring-launch" />
          <Input label="Custom alias" mono prefix="short.link/" placeholder="my-link" success="Alias available" />
          <Input label="Email" type="email" error="That doesn't look like an email" defaultValue="not-an-email" />
          <Textarea label="Notes" help="Internal only — never shown to recipients." placeholder="Optional notes about this link" />
          <Select label="Expiration" options={[{ value: "never", label: "Never" }, { value: "7d", label: "In 7 days" }]} />
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", justifyContent: "flex-end" }}>
            <Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} label="Remember me" />
            <Checkbox indeterminate readOnly label="Select all (partial)" />
            <Toggle on={toggled} onChange={setToggled} label="Password protect" />
          </div>
        </div>
        <SegmentedControl
          aria-label="Analytics range"
          value={segment}
          onChange={setSegment}
          options={[
            { value: "24h", label: "24h" },
            { value: "7d", label: "7d" },
            { value: "30d", label: "30d" },
          ]}
        />
      </Section>

      <Section title="Data display">
        <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap" }}>
          {(["active", "expiring", "expired", "protected", "paused"] as const).map((s) => (
            <Badge key={s} status={s} />
          ))}
        </div>
        <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap" }}>
          <Tag>campaign</Tag>
          <Tag tone="primary" onRemove={() => {}}>
            status: active
          </Tag>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "var(--space-4)" }}>
          <StatCard label="Total clicks" value="24,819" delta="+12.4% vs last week" direction="up" />
          <StatCard label="Unique visitors" value="18,204" delta="-3.1%" direction="down" />
          <StatCard label="QR scans" value="1,204" />
        </div>
        <LinkCard shortUrl="short.link/launch" destination="https://acme.com/spring-launch" status="active" clicks={8213} created="Mar 4" onCopy={() => {}} onMenu={() => {}} onQr={() => {}} />
        <div className="cs-card" style={{ padding: 20 }}>
          <div className="cs-statcard__eyebrow" style={{ marginBottom: 14 }}>
            Clicks — last 30 days
          </div>
          <AnalyticsChart data={ANALYTICS_DATA} labels={ANALYTICS_LABELS} height={180} />
        </div>
        <DataTable columns={TABLE_COLUMNS} rows={MOCK_ROWS} getRowKey={(r) => r.id} />
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--color-fg-muted)" }}>TableBar (referrer share)</span>
          <TableBar pct={62} />
        </div>
      </Section>

      <Section title="Feedback" subtitle="The real QR code lives in its own server-rendered section below — QrCodePopover is an async Server Component and can't render inside this client tree.">
        <div style={{ display: "flex", gap: "var(--space-6)", flexWrap: "wrap", alignItems: "center" }}>
          <Spinner />
          <Skeleton width={160} height={16} />
        </div>
        <EmptyState icon="inbox" title="Create your first short link" description="Paste a long URL to get started." />
        <div style={{ position: "relative" }}>
          <IconButton icon="ellipsis-vertical" label="Link actions" onClick={() => setMenuOpen((v) => !v)} />
          {menuOpen && (
            <div style={{ position: "absolute", top: "100%", left: 0, marginTop: 4, zIndex: 1 }}>
              <DropdownMenu
                items={[
                  { label: "Edit", icon: "square-pen", onClick: () => setMenuOpen(false) },
                  { label: "Copy", icon: "copy", onClick: () => setMenuOpen(false) },
                  { divider: true },
                  { label: "Delete", icon: "trash-2", danger: true, onClick: () => setMenuOpen(false) },
                ]}
              />
            </div>
          )}
        </div>
        {showToast && (
          <Toast
            variant="success"
            title="Link copied"
            detail="short.link/launch"
            action={{ label: "Undo", onClick: () => setShowToast(false) }}
            onDismiss={() => setShowToast(false)}
          />
        )}
        {!showToast && (
          <Button variant="secondary" size="sm" onClick={() => setShowToast(true)}>
            Show toast again
          </Button>
        )}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "var(--space-4)" }}>
          <PageError code={401} action={<Button variant="primary">Sign in</Button>} />
          <PageError code={403} action={<Button variant="secondary">Back to dashboard</Button>} />
          <PageError code={404} action={<Button variant="secondary">Back to dashboard</Button>} />
        </div>
        <div style={{ display: "flex", gap: "var(--space-4)", flexWrap: "wrap" }}>
          <Button variant="secondary" onClick={() => setModalOpen(true)}>
            Open Modal
          </Button>
          <Button variant="destructive" onClick={() => setDeleteOpen(true)}>
            Open DeleteConfirmModal
          </Button>
          <Button variant="secondary" onClick={() => setEditOpen(true)}>
            Open EditLinkModal
          </Button>
        </div>
      </Section>

      <Section title="Navigation" subtitle="FilterBar and BulkActionToolbar occupy the same slot above a link table — toggle selection to see the swap.">
        <FilterBar
          query={query}
          onQuery={setQuery}
          status={status}
          onStatus={setStatus}
          pills={status !== "all" ? [{ label: status, onRemove: () => setStatus("all") }] : []}
          onClear={() => setStatus("all")}
        />
        {selectedKeys.length > 0 ? (
          <BulkActionToolbar
            count={selectedKeys.length}
            onClear={() => setSelectedKeys([])}
            actions={[
              { label: "Export", icon: "download", variant: "secondary", onClick: () => {} },
              { label: "Delete", icon: "trash-2", variant: "destructive", onClick: () => setDeleteOpen(true) },
            ]}
          />
        ) : (
          <Button variant="ghost" size="sm" onClick={() => setSelectedKeys(["1"])}>
            Select a row (demo)
          </Button>
        )}
      </Section>

      <Section title="Patterns" subtitle="New in Phase 12a — not part of the handoff bundle. See Notes.md.">
        <Pagination total={214} limit={20} offset={offset} onPrev={() => setOffset((o) => Math.max(0, o - 20))} onNext={() => setOffset((o) => o + 20)} />
        <p style={{ fontSize: "var(--text-sm)", color: "var(--color-fg-muted)" }}>
          Signup screen: <a href="/signup">/signup</a>
        </p>
      </Section>

      {modalOpen && (
        <Modal
          title="Create link"
          onClose={() => setModalOpen(false)}
          footer={
            <>
              <Button variant="secondary" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" icon="link-2" onClick={() => setModalOpen(false)}>
                Create link
              </Button>
            </>
          }
        >
          <Input label="Destination URL" placeholder="https://example.com/very/long/path" autoFocus />
        </Modal>
      )}

      {deleteOpen && (
        <DeleteConfirmModal
          target={selectedKeys.length > 1 ? { kind: "bulk", count: selectedKeys.length } : { kind: "single", shortUrl: "short.link/launch" }}
          onCancel={() => setDeleteOpen(false)}
          onConfirm={() => setDeleteOpen(false)}
        />
      )}

      {editOpen && (
        <EditLinkModal
          shortCode="launch"
          initialValues={{ destinationUrl: "https://acme.com/spring-launch", expiresAt: null, maxClicks: null, isPasswordProtected: false }}
          onClose={() => setEditOpen(false)}
          onSave={() => setEditOpen(false)}
        />
      )}
    </>
  );
}
