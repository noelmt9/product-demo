Redesign the Insights page and update the Performance page to support the demo flow for the prototype. The persona using the prototype is an ops manager at a post-charge-off collection agency logging in to check on their accounts.



Insights page — complete redesign:



Top section: Chat-first briefing. This is the first thing visible when the page loads. Not a dashboard. Not cards. A chat interface taking up the top ~40% of the screen.



Show a pre-populated morning briefing from the system. The briefing should feel like a smart colleague summarizing your day, not a report. Use this exact exchange:



System (labeled "Analyst"): "Good morning. Here's where Apex Recovery stands as of today.



Your portfolio crossed the 2.5% liquidation target this week — currently at 2.7%, up from 2.3% last week. $287K collected this month so far.



Three things worth noting:





High Propensity / High Balance cohort had a strong week — collections jumped 40% over last week. Settlement offers combined with voice follow-ups are driving this.



Coach deployed a fix on the 'I already paid' objection handling. Early results showing drop-off down from 34% to 18% on those conversations.



One compliance flag this week on a NY timezone issue. Already resolved, no open risk.



One item needs your review in Approvals — a settlement offer at 20% discount that exceeds the pre-approved threshold."



Below the briefing, show an input box with placeholder text: "Ask anything about your portfolio..." This is static but shows the chat-first concept. The briefing should feel concise, outcome-focused — every sentence answers "so what" not "what happened."



Middle section: Outcome cards. Below the chat, show 4 cards in a horizontal row. These are outcome-based, not activity-based:





"Total Collected" — $287,400 this month (not "9 campaigns running")



"Liquidation Rate" — 2.7% ↑ with target line at 2.5% (not "2,870 daily touchpoints")



"Accounts Resolved" — 743 of 12,000 (not "conversations audited")



"Compliance" — 99.86%, zero open risk (not "4 flags raised")



Each card should show the number large, a small trend indicator, and one line of context underneath. Keep it tight — this row should feel like a glanceable scoreboard.



Bottom section: Agent activity as coordination outcomes. Replace the current activity feed. Instead of showing individual agent actions as a log, show outcomes that resulted from agent coordination. Each entry shows what improved, by how much, and which agents contributed — as small colored dots after the outcome text, not as a workflow narrative.



Mock 4-5 entries:





"Medical debt contact rate improved from 22% to 34%" — Analyst (blue dot) Team Lead (purple dot) Collector (amber dot) — 3 days ago



"Objection drop-off on 'I already paid' reduced from 34% to 18%" — Coach (teal dot) Collector (amber dot) — 2 days ago



"Spanish-speaking cohort connect rate jumped from 18% to 31%" — Analyst (blue dot) Team Lead (purple dot) Collector (amber dot) — 5 days ago



"NY timezone compliance issue identified and resolved in 18 hours" — Compliance (red dot) Collector (amber dot) — 1 day ago



"340 accounts re-scored from Low to Medium propensity based on engagement signals" — Analyst (blue dot) — 1 day ago



Each entry: outcome text in regular weight, percentage change highlighted in green, agent dots at the end, timestamp right-aligned. No mention of who sent what to whom. Just: this improved, these agents were involved.



Real-time progress section (optional, below the activity). Show 1-2 items where an agent is currently working, with visible reasoning. Styled as a subtle card with a pulsing dot or "in progress" label:





Analyst: "Analyzing Week 3 payment patterns across cohorts... checking if settlement offer is outperforming standard reminder on High Prop / High Bal... early signal: 4.2% conversion vs 1.8%... preparing recommendation for Team Lead"



Compliance: "Scanning today's 412 conversations... 380 reviewed, 32 remaining... no flags so far"



This shows the system is alive and thinking, not just showing stale data. Keep it compact — 2-3 lines per item, muted styling so it doesn't dominate the page.
