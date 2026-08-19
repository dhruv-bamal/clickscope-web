Single-series area chart for clicks-over-time. Fill/line use the sky accent, never indigo.

```jsx
<AnalyticsChart data={dailyClicks} labels={dates} />
<AnalyticsChart data={[]} loading />
```

Empty data returns `null` — render the "no analytics data yet" empty state rather than a flat zero line. Pair with `TableBar` for in-table breakdown bars.
