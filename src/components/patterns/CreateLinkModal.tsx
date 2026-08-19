"use client";
// Composed entirely from existing design-system atoms (Modal, Input, Select,
// Toggle, Button) — no new primitives, no token changes. Mirrors
// EditLinkModal's field set (destination, expiration, max clicks, password
// protect) plus a custom-alias Input that EditLinkModal correctly omits
// (aliases are immutable after creation — see EditLinkModal.tsx). New in
// 12b: the source bundle never shipped a create-link modal, only the edit
// one.

import React, { useState } from "react";
import { Modal, Button, Input, Select, Toggle } from "@/components/design-system";
import { EXPIRATION_OPTIONS, expirationToIso } from "@/lib/expiration";
import type { CreateLinkRequest } from "@/types/api";

export interface CreateLinkModalProps {
  open?: boolean;
  onClose: () => void;
  /** Caller performs the actual POST /api/links call; this component only
   * collects and shapes the form values. Async so the modal can show
   * `saving` and stay open (with the error) if the request fails. */
  onCreate: (values: CreateLinkRequest) => Promise<void>;
}

export function CreateLinkModal({ open = true, onClose, onCreate }: CreateLinkModalProps) {
  const [dest, setDest] = useState("");
  const [alias, setAlias] = useState("");
  const [expiration, setExpiration] = useState("never");
  const [maxClicks, setMaxClicks] = useState("");
  const [pw, setPw] = useState(false);
  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const save = async () => {
    setSaving(true);
    setError(null);
    try {
      const body: CreateLinkRequest = { destinationUrl: dest };
      if (alias) body.customAlias = alias;
      const isoExpires = expirationToIso(expiration);
      if (isoExpires) body.expiresAt = isoExpires;
      if (maxClicks) body.maxClicks = Number(maxClicks);
      if (pw && password) body.password = password;
      await onCreate(body);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't create link. Try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      title="Create link"
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={saving}>
            Cancel
          </Button>
          <Button variant="primary" icon="link-2" onClick={save} loading={saving} disabled={!dest}>
            Create link
          </Button>
        </>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Input
          label="Destination URL"
          placeholder="https://example.com/very/long/path"
          value={dest}
          onChange={(e) => setDest(e.target.value)}
          autoFocus
        />
        <Input
          label="Custom alias"
          mono
          prefix="short.link/"
          placeholder="my-link (optional)"
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
        />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <Select label="Expiration" value={expiration} onChange={(e) => setExpiration(e.target.value)} options={EXPIRATION_OPTIONS} />
          <Input
            label="Max clicks"
            type="number"
            min={1}
            placeholder="Unlimited"
            value={maxClicks}
            onChange={(e) => setMaxClicks(e.target.value)}
          />
        </div>
        <Toggle on={pw} onChange={setPw} label="Password protect" />
        {pw && <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />}
        {error && <span className="cs-help cs-help--error">{error}</span>}
      </div>
    </Modal>
  );
}
