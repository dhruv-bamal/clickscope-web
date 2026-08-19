"use client";
// Owns form field state (destination, expiration, max clicks, password
// protection) the same way the reference CreateLinkModal does — a real
// interactive form, not a consequence of anything else in the library.

import React, { useState } from "react";
import { Modal, Button, Input, Select, Toggle } from "@/components/design-system";

export interface EditLinkValues {
  destinationUrl: string;
  expiresAt: string | null;
  maxClicks: number | null;
  isPasswordProtected: boolean;
}

export interface EditLinkModalProps {
  open?: boolean;
  /** The link's fixed short code, shown but not editable — changing it would
   * break every copy already handed out. */
  shortCode: string;
  initialValues: EditLinkValues;
  onClose: () => void;
  onSave: (values: EditLinkValues) => void;
}

const EXPIRATION_OPTIONS = [
  { value: "never", label: "Never" },
  { value: "7d", label: "In 7 days" },
  { value: "30d", label: "In 30 days" },
];

/**
 * EditLinkModal — a second Modal instance mirroring CreateLinkModal's exact
 * field composition (destination, expiration, password protection) plus a
 * max-clicks Input the source bundle never modeled in any form despite the
 * API supporting it (see Notes.md). Distinct from LinkDetailScreen's
 * read-only DetailRow view, per Modal.prompt.md's "focused decisions and
 * short forms" pattern rather than a new page/route.
 *
 * Reset contract: form state initializes from `initialValues` once, on
 * mount — it does not watch `initialValues` for changes and resync (that
 * needs an effect calling setState, which triggers a redundant second render;
 * oxlint's react/set-state-in-effect rule catches exactly this). If the
 * target link can change while a parent instance stays mounted, render this
 * with `key={shortCode}` so React remounts — and reinitializes — it fresh per
 * link, instead of updating one instance in place.
 */
export function EditLinkModal({ open = true, shortCode, initialValues, onClose, onSave }: EditLinkModalProps) {
  const [dest, setDest] = useState(initialValues.destinationUrl);
  const [expiration, setExpiration] = useState(initialValues.expiresAt ? "7d" : "never");
  const [maxClicks, setMaxClicks] = useState(initialValues.maxClicks?.toString() ?? "");
  const [pw, setPw] = useState(initialValues.isPasswordProtected);

  if (!open) return null;

  const save = () =>
    onSave({
      destinationUrl: dest,
      expiresAt: initialValues.expiresAt,
      maxClicks: maxClicks ? Number(maxClicks) : null,
      isPasswordProtected: pw,
    });

  return (
    <Modal
      title="Edit link"
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" icon="square-pen" onClick={save}>
            Save changes
          </Button>
        </>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Input label="Destination URL" value={dest} onChange={(e) => setDest(e.target.value)} autoFocus />
        <Input label="Short link" mono prefix="short.link/" value={shortCode} disabled help="The short link can't be changed after creation." />
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
      </div>
    </Modal>
  );
}
