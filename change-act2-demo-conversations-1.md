Design the Conversations page. The ops manager arrives here from the "View conversations →" link on the High Prop / High Bal cohort card on Performance. They're here to understand what drove the collections spike.

Top bar: Filters. Horizontal filter bar below the page title:
- Cohort filter: Show "High propensity / High balance" as pre-selected (with a small "x" to clear). This shows they arrived filtered.
- Channel filter: "All channels" dropdown. Static.
- Outcome filter: Pill toggles — "All" / "Settled" / "PTP" / "Payment" / "No Answer" / "Dispute". "All" selected by default. Static.
- Date range: "Last 7 days" selected. Static.

Top section: Conversation summary cards. 4 small cards in a horizontal row, showing outcomes for this filtered view:
- Total Conversations: 342 (this cohort, last 7 days)
- Converted: 48 (settled or paid)
- Conversion Rate: 14%
- Avg Touches to Convert: 3.2

These are outcome numbers, not activity numbers. The ops manager immediately sees: 48 out of 342 conversations on this cohort led to money.

Main section: Conversation list. Show 10 conversation rows with pagination appropriately.

Each row is a compact card or table row showing:
- Account ID (e.g., #APX-4821)
- Journey summary — the multi-touch sequence, not just one interaction. Show as small channel icons in sequence: SMS → Voice AI → Payment Bot. This is critical — it shows the cross-channel coordination that drove the spike.
- Outcome: colored badge — "Settled" (green), "PTP" (blue), "Callback" (amber), "No Answer" (gray), "Dispute" (red)
- Amount: $3,400 (only for Settled/Payment outcomes)
- Quality Score: 89/100 (small, muted — from Coach)
- Compliance: green dot (clean) or red dot (flagged)
- Timestamp: "2 days ago"

Mock these specific conversations to tell the settlement + voice story:
Row 1: #APX-4821 | SMS → SMS (click) → Payment Bot (inbound) | Settled | $3,400 | Quality: — | Compliance: green | 1 day ago
Journey note: "Received settlement SMS Day 17. Clicked link. Called payment bot next day. Settled at 15% discount."
Row 2: #APX-3107 | Voice AI → SMS (settlement) → Voice AI → Human Agent | Settled | $5,100 | Quality: 91 | Compliance: green | 2 days ago
Journey note: "Initial voice AI no answer. Settlement SMS sent. Second voice AI connected, consumer asked questions. Transferred to human agent. Settled at 15%."
Row 3: #APX-2894 | SMS → Voice AI → PTP | PTP | — | Quality: 88 | Compliance: green | 2 days ago
Journey note: "SMS opened. Voice AI follow-up connected. Consumer promised to pay Friday. PTP tracked."
Row 4: #APX-5523 | Voice AI → Settled | Settled | $4,200 | Quality: 93 | Compliance: green | 3 days ago
Journey note: "Voice AI connected first attempt. Consumer agreed to settlement on call. Processed via payment bot."
Row 5: #APX-1876 | SMS → SMS → No Answer | No Answer | — | Quality: — | Compliance: green | 3 days ago
Journey note: "Two SMS sent. No opens. No engagement."
Row 6: #APX-4410 | Voice AI → Human Agent → Dispute | Dispute | — | Quality: 85 | Compliance: green | 4 days ago
Journey note: "Voice AI connected. Consumer disputed debt. Transferred to human agent. Dispute logged, account flagged."
Row 7: #APX-3298 | Email → SMS (click) → Payment Bot | Settled | $2,800 | Quality: — | Compliance: green | 4 days ago
Journey note: "Email opened. Settlement SMS follow-up clicked. Consumer completed payment via bot."
Row 8: #APX-6012 | Voice AI → Voice AI → SMS → PTP | PTP | — | Quality: 90 | Compliance: green | 5 days ago
Journey note: "Two voice AI attempts, first no answer, second connected. SMS reinforcement sent. Consumer promised payment next week."
Row 9 and 10, use appropriate mock details.

Design notes for each row:
- The journey summary (channel icons in sequence) is the most important visual element. Show small icons or pills for each channel touch in order, connected by a thin line or arrow. This shows the multi-channel coordination at a glance.
- Journey notes should be in muted small text below each row, visible by default — not hidden behind a click. The ops manager needs to scan these quickly.
- Settled/Payment rows should have a subtle green left border. Dispute rows subtle red. This lets the eye immediately sort good from bad.
- Quality score and Compliance dot sit together on the right side — this pre-seeds the quality check the ops manager will do in Act 2 when they go to Quality page. They can already see here: most conversations are scoring well and clean.

Bottom section: Channel contribution summary. A small section below the conversation list:
- "What drove conversions on this cohort this week:"
- SMS → Voice follow-up: 22 conversions (46%)
- Voice AI direct: 12 conversions (25%)
- SMS → Payment Bot: 8 conversions (17%)
- Email → SMS → Payment Bot: 6 conversions (12%)
- This shows the ops manager that the settlement SMS + voice follow-up combination is the winner — explaining the spike they saw on Performance.


