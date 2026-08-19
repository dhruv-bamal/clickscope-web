Centered empty state — first-run hero, no-results, or a page-level error.

```jsx
<EmptyState
  icon="link-2"
  title="Create your first short link"
  description="Paste a long URL and get a short, shareable link in seconds."
  action={<Button variant="primary" icon="plus">Create link</Button>}
/>
```

Distinguish "nothing exists yet" (offer creation) from "nothing matched" (offer a clear-filters ghost action). Reuse with danger coloring for page errors.
