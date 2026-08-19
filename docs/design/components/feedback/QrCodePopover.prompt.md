QR display body for a popover (desktop) or modal (mobile), anchored to a `qr-code` trigger.

```jsx
<QrCodePopover shortUrl="short.link/launch" onDownload={dl} onCopy={copy} />
<QrCodePopover state="loading" />
<QrCodePopover state="error" onRetry={regen} />
```

The frame stays plain white in every theme so scanner contrast holds. Loading uses a skeleton (shape is known), never a spinner; errors keep the surface open with a Retry.
