Centered dialog over a blurred scrim, for focused decisions and short forms.

```jsx
<Modal
  title="Delete link?"
  onClose={close}
  footer={<>
    <Button variant="secondary" onClick={close}>Cancel</Button>
    <Button variant="destructive" onClick={confirm}>Delete link</Button>
  </>}
>
  This permanently deletes short.link/launch. It can't be undone.
</Modal>
```

Esc and scrim-click call `onClose`. For a destructive confirm, the primary footer button is the `destructive` variant.
