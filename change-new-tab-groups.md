Restructure the sidebar navigation completely. Here's the new layout:
Remove all current nav items from the sidebar. Replace with the following 8 items, grouped in three visual clusters. Groups are separated by extra spacing (16-20px gap between groups), no group labels.
Group 1:

Insights
Approvals

Group 2:

Portfolio
Performance
Payments

Group 3:

Campaigns
Conversations
Quality

Remove Overview as a page. The Command Center / Overview content (portfolio snapshot, agent team cards, activity feed, KPI table) should become the default view when you land on Insights. Rename the page title from "Overview" to "Insights." Keep the subtitle as something like "Agent activity, patterns, and recommendations." The agent activity feed, analyst recommendations, and any high-level summaries live here. This is where the system's thinking surfaces.

Add Approvals page. This is the human-in-the-loop hub. Show a list of pending decisions that need human review before agents can proceed. Mock 4-5 items:
- Compliance: "New Spanish SMS template pending approval" — submitted by Team Lead, waiting Compliance review. Show approve/reject buttons (static, non-functional).
- Team Lead: "Reallocate 2 agents from Low Prop to Medium Prop" — recommended by Analyst, needs Team Lead sign-off.
- Compliance: "Settlement offer at 20% discount exceeds pre-approved 15% threshold" — needs client approval.
- Coach: "Agent 6 formal warning — second mini-Miranda violation" — needs Ops Manager sign-off.
- Analyst: "Re-score 340 accounts from Low to Medium propensity" — auto-approved (show as completed, to demonstrate that not everything needs human review, some are informational).

Each item should show: which agent raised it, what the decision is, who needs to approve, status (pending/approved/auto-approved), and timestamp. Simple table or card list.
Keep Portfolio page as it currently exists. Move it to Group 2.
Add Performance page. Pull the weekly KPI trend table (Week 1/2/3 + targets) and the cohort-level performance breakdown table from wherever they currently live. Also pull Analyst's alerts and recommendations. This is the numbers page — liquidation rate, contact rate, RPC, PTP, kept-PTP, resolution rate, compliance score, all in one view with trends. Add a "Client Reports" section with mock report titles like "Week 3 Performance Summary — Apex Recovery Partners" and "Monthly Activation Review — February 2026" as downloadable report placeholders.
Add Payments page. New page. Mock payment and settlement data:

Summary cards: Total collected this month: $287,400. Settlements processed: 142. Average settlement: $1,860. Payment plans active: 89.
Recent payments table: 8-10 rows showing account ID, amount, type (full payment / settlement / payment plan installment), channel that drove it (SMS → Payment Bot / Human Agent / Email link), date, status (cleared / pending / failed).
Settlement breakdown: count at each discount level (10%, 15%, 20%). Total discount given vs total recovered.

Keep Campaigns page as it currently exists. Move it to Group 3.
Add Conversations page. New page. Show a table of recent conversations across all channels. Mock 10-12 rows. Each row: Account ID, Channel (Voice AI / Human / SMS / Email), Direction (Outbound / Inbound), Duration or Message Count, Outcome (PTP / Payment / Callback Requested / No Answer / Dispute / Hangup), Quality Score (if scored by Coach), Compliance Flag (if any), Timestamp. Add simple filter tabs at the top: All, Flagged, Scored, PTP, Payments. Static, showing "All" view by default.
Keep Quality page. Move it to Group 3. It should have two tabs as previously built:

Overview — Compliance summary (conversations audited, flags, compliance score, flagged issues table) + Coach summary (agent scoreboard, quality scores, upcoming actions).
Active Improvements — Coach's 3 active cases (objection handling fix, medical debt empathy gap, settlement cross-channel disconnect).

Agent detail panels: Keep all agent-specific pages in the nav. When an agent name appears anywhere (activity feed, approvals, agent team cards, conversations, quality page), clicking it opens a slide-out panel from the right showing that agent's detail — skills, configuration/SOP, full activity log. Keep all existing agent detail content, just serve it from panels not pages.

Keep the FAB button (Ask) in the bottom-right corner. No changes.

Sidebar styling: The three groups should be visually distinct through spacing only — no divider lines, no group headers. Just 16-20px of extra vertical space between groups. Active tab highlight should be subtle — light background or left accent border, consistent with current style.
