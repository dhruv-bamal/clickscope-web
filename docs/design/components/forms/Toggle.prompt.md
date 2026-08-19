Switch for instant on/off settings — link active/paused, "require password".

```jsx
<Toggle on={active} onChange={setActive} label="Link active" />
```

Use `Toggle` for settings that apply instantly; use `Checkbox` when the choice only takes effect on form submit.
