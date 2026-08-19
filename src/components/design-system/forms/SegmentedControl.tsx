import React from "react";

/* Equal-width segmented track (theme light/dark/system, analytics range 24h/7d/30d).
   The active segment lifts onto a surface; arrow keys move between options. */
export interface SegmentedOption {
  value: string;
  label: React.ReactNode;
}
export interface SegmentedControlProps {
  /** Strings or {value,label} objects. */
  options: (string | SegmentedOption)[];
  value: string;
  onChange?: (value: string) => void;
  "aria-label"?: string;
}

export function SegmentedControl({ options, value, onChange, "aria-label": ariaLabel }: SegmentedControlProps) {
  return (
    <div className="cs-segmented" role="tablist" aria-label={ariaLabel}>
      {options.map((o) => {
        const val = typeof o === "string" ? o : o.value;
        const label = typeof o === "string" ? o : o.label;
        const active = val === value;
        return (
          <button
            key={val}
            type="button"
            role="tab"
            aria-selected={active}
            data-active={String(active)}
            className="cs-segmented__opt"
            onClick={() => onChange && onChange(val)}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
