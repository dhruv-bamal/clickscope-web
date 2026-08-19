Text input with a persistent label above and helper/validation text below. Use `mono` for machine-text fields and `prefix` to fuse a domain to the left edge.

```jsx
<Input label="Destination URL" placeholder="https://example.com/very/long/path" />
<Input label="Custom alias" mono prefix="short.link/" success="Alias available" />
<Input label="Password" type="password" error="Incorrect password" />
```

Validation display (border color, icon, message) is specified; when it fires is the developer's call.
