The 401/403/404 page-error distinction — same layout, distinct icon + copy, never red.

```jsx
<PageError code={401} action={<Button variant="primary">Sign in</Button>} />
<PageError code={403} action={<Button variant="secondary" icon="arrow-left">Back to dashboard</Button>} />
<PageError code={404} action={<Button variant="secondary" icon="arrow-left">Back to dashboard</Button>} />
```

401 = not authenticated (lock), 403 = no permission (shield-alert), 404 = doesn't exist (search-x). Recipients of a public link get the standalone public pages instead (expired / not-found / forbidden).
