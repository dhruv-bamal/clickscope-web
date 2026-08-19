The mobile link-list item and the prominent result card shown after a link is created.

```jsx
<LinkCard
  shortUrl="short.link/launch"
  destination="https://acme.com/2026/spring-launch-campaign"
  status="active"
  clicks={1284}
  created="Mar 4"
  onCopy={handleCopy}
  onQr={openQr}
  onMenu={openMenu}
/>
```

Set `copied` to briefly swap the copy icon to a check. Set `selected` for bulk-select highlight.
