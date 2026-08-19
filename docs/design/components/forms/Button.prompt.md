The primary action control — one filled `primary` (indigo) button per view; everything else is `secondary`, `ghost`, `destructive`, or `link`.

```jsx
<Button variant="primary" icon="plus">Create link</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="ghost" size="sm">Filter</Button>
<Button variant="destructive" icon="trash-2">Delete</Button>
<Button variant="primary" loading>Saving</Button>
```

Sizes `sm | md | lg` (lg for marketing / mobile-primary). `loading` shows an inline spinner and keeps width. Never place two filled indigo buttons side by side.
