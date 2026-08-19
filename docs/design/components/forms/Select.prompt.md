Single-choice select with a trailing chevron. Use for simple choices; use a `DropdownMenu` popover for rich options with descriptions.

```jsx
<Select label="Expiration" options={[
  { value: "never", label: "Never" },
  { value: "7d", label: "In 7 days" },
  { value: "30d", label: "In 30 days" },
]} />
```
