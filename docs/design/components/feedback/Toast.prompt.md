Transient confirmation, bottom-right. Semantic left border + icon.

```jsx
<Toast variant="success" title="Link created" detail="short.link/launch is live" />
<Toast variant="success" title="Link deleted" action={{ label: "Undo", onClick: undo }} onDismiss={close} />
```

Success/info auto-dismiss (~5s); errors persist until dismissed. Never use a toast for a blocking error that needs a decision.
