Redesign the Performance page to be visual and chart-rich. It should feel like a monitoring dashboard (think Datadog, Grafana, Mixpanel), not a data table.

Top bar: Filters. Add a horizontal filter bar at the top of the page, below the title:
- Time range selector: "Last 7 days" / "Last 14 days" / "Last 30 days" / "All time" — pill-style toggle, "Last 30 days" selected by default. Static, non-functional.
- Cohort filter: "All cohorts" dropdown. Static.
- Channel filter: "All channels" dropdown. Static.

These don't need to work. They just signal that this is a real analytics view.

Row 1: Summary metric cards with sparklines. 4 cards in a horizontal row. Each card shows:
- Metric name (small, muted, uppercase)
- Current value (large, 28-32px)
- Small sparkline chart inside the card showing the daily trend over the last 18 days (not just weekly snapshots). Use a simple line — green if trending up, amber if flat.
- Below the value: "vs target: 2.5%" or similar context line

Cards:
- Total Collected: $287,400 with sparkline showing daily cumulative collection curve
- Liquidation Rate: 2.7% with sparkline showing daily rate climbing from ~1.2% to 2.7%
- Contact Rate: 38% with sparkline showing gradual climb
- RPC Rate: 28% with sparkline showing gradual climb

Row 2: Main chart — Collections over time. A line or area chart taking full width. X-axis: Day 1 through Day 18. Two lines:
- Daily collections amount (bar chart underneath or area fill)
- Cumulative collections (line on top)
- Mark the activation target as a horizontal dashed line
- Annotate 2-3 key moments directly on the chart: Day 3 "Strategy shift: medical debt SMS-first", Day 12 "Voice AI increased to 5x/week", Day 17 "Settlement offers launched"
- These annotations show that strategy changes drove performance changes — the system adapting visually

Row 3: Cohort performance — visual cards, not a table. Show each of the 5 cohorts as a card in a horizontal scrollable row or 2x3 grid. Each cohort card contains:
- Cohort name (bold)
- A small bar chart or mini line chart showing that cohort's liquidation trend over 3 weeks
- Key metrics below the chart: Liquidation, Contact Rate, Collections — as compact numbers
- Week-over-week change as a colored badge (+40% in green, +12% in green, etc.)

The High Prop / High Bal card must visually stand out:
- Give it a green border or a subtle green glow/shadow
- The +40% badge should be prominent
- Add "View conversations →" link at the bottom of this card only
- Add the one-line context below: "Settlement + voice follow-up driving spike"

The other cards are normal styling. The point is this one card pulls your eye.

Row 4: Analyst Recommendations. Keep the 2-3 recommendation cards from the previous spec. Each as a compact card with the recommendation text and agent dots. No change here — this section was already good.

Remove the Portfolio-level KPIs table entirely. That data is now shown in Row 1 (cards with sparklines) and Row 2 (chart). No need for a flat table repeating the same numbers.

Remove the cohort breakdown table. Replace it with the visual cohort cards in Row 3. The table was the problem — cards with mini-charts are the solution.

General styling notes:
- Charts can be simple — use Recharts (already available). Line charts and bar charts only. No pie charts.
- Keep the color palette restrained: one accent color for the main trend line (blue), green for positive changes, amber for watch items. Gray for gridlines and axes.
- Chart backgrounds should be white, with very light gray gridlines.
- The page should feel dense but visual — lots of information, but presented as charts and cards, not rows and columns.





