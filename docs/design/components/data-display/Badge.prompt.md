Status badge — semantic tint + dot + label. Use the `status` shortcut for link/analytics statuses.

```jsx
<Badge status="active" />        {/* green "Active" */}
<Badge status="expiring" />      {/* amber "Expiring soon" */}
<Badge status="expired" />       {/* red "Expired" */}
<Badge status="protected" />     {/* sky "Password" */}
<Badge variant="info">Beta</Badge>
```

Status is always carried by text, never color alone.
