Floating menu for row kebab menus, the account menu, and split actions.

```jsx
<DropdownMenu items={[
  { icon: "pencil", label: "Edit" },
  { icon: "qr-code", label: "QR code" },
  { icon: "copy", label: "Copy link", hint: "⌘C" },
  { divider: true },
  { icon: "trash-2", label: "Delete", danger: true },
]} />
```

Wrap it in a positioned container anchored to its trigger; open/close and outside-click are the app's to wire.
