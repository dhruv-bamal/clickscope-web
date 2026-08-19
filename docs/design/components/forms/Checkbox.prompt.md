Checkbox with a right-hand label. Supports an `indeterminate` state for a table "select all" partial.

```jsx
<Checkbox checked={agree} onChange={e => setAgree(e.target.checked)} label="Require password" />
<Checkbox indeterminate label="Select all" />
```

Use a checkbox when the choice takes effect on submit; use `Toggle` for instant on/off.
