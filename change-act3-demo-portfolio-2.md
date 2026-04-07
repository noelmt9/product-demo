Upload flow — this is a stepped sequence that appears after clicking "New Placement". Show it as a full-width section that replaces or pushes down the portfolio content, or as a large modal/panel. The key is visible agent reasoning at each step.



Step 1: File upload. Simple drop zone:

- "Drop your placement file here or click to browse"

- Show a mock file appearing: "apex_recovery_batch2_feb26.csv — 3,000 accounts"

- A "Process" button below. Static — the next step is already pre-populated as if they clicked it.



Step 2: Agent processing — visible reasoning. This is the most important part of Act 3. Show each agent picking up the file in sequence. Each agent's work appears as a card or section, with visible reasoning text that feels like watching the agent think. Use a subtle "completed" checkmark or green dot on each step as it finishes.



Analyst — Validation & Cleaning: Show a card with "Analyst" label and blue dot. Inside, show reasoning text:

- "Validating 3,000 accounts..."

- "2,847 clean. 153 flagged — 89 missing phone, 42 missing email, 22 duplicate account numbers."

- "Skip tracing initiated for 131 recoverable accounts via TLO."

- "Portfolio composition: Credit Card 58%, Personal Loan 30%, Medical 12%."

- "Balance distribution: 24% under $1K, 38% $1-3K, 25% $3-5K, 13% $5K+. Skews higher than current Apex portfolio."

- "Average age since charge-off: 11 months. Newer than current batch (14 months)."

- Status: ✓ Complete



Analyst — Cohort Creation: Second card, still Analyst. This is where the intelligence transfer happens:

- "Creating cohorts... applying learnings from existing Apex portfolio..."

- "Identified 580 accounts matching High Prop / High Bal profile from current portfolio. Similar balance range, contact completeness, and state distribution."

- "Recommending settlement + voice strategy for this segment — based on 40% improvement seen on matching cohort in current placement."

- "4 cohorts created:"



Show a mini cohort table inside this card:

CohortAccountsAvg BalanceRecommended Strategy

High Prop / High Bal580$4,800Settlement SMS + Voice (proven on current portfolio)High Prop / Low Bal720$1,100Digital-only SMS + EmailMedium Prop1,200$2,900Multi-channel blitzLow Prop / High Bal347$5,400Human agent priority



Compliance — Pre-scan: Card with "Compliance" label and red dot:

- "Scanning state distribution for 3,000 accounts..."

- "820 accounts in NY — NY calling hour restrictions and state-specific rules auto-configured."

- "540 accounts in CA — California RFDCPA rules applied."

- "45 accounts flagged with prior litigation — excluded from outbound voice per FDCPA best practice."

- "12 accounts in cease-and-desist status — excluded from all contact channels."

- "Guardrails configured for 8 states: NY, TX, CA, FL, IL, PA, OH, GA."

- Status: ✓ Complete



Team Lead — Campaign Plan: Card with "Team Lead" label and purple dot:

- "Proposing campaign plan for new placement..."

- "Replicating successful strategy from current Apex portfolio with adjustments for new batch composition."

- "High Prop / High Bal (580 accounts): Settlement SMS Day 1, Voice AI follow-up Day 3, Human agent escalation on engagement. Proven approach — current portfolio showing 40% improvement with this strategy."

- "High Prop / Low Bal (720 accounts): SMS 3x/week, Email 2x/week. Low balance doesn't justify voice AI cost."

- "Medium Prop (1,200 accounts): Multi-channel — Voice AI 3x/week, SMS 2x/week, Email 1x/week."

- "Low Prop / High Bal (347 accounts): Human agent 5x/week, skip-traced accounts prioritized."

- "Estimated first-month liquidation: 1.8-2.2% based on comparable portfolio performance."



Show a mini campaign calendar inside this card:

Cohort Voice AI Human Agent SMS Email

High Prop / High Bal 5x/week On escalation 3x/week (settlement) 1x/week

High Prop / Low Bal — — 3x/week 2x/week

Medium Prop 3x/week 2x/week 2x/week 1x/week

Low Prop / High Bal 1x/week 5x/week 1x/week 1x/week







Status: ✓ Complete



Step 3: Summary and Approvals routing. After all agent cards are complete, show a summary section:

"New placement processed. 3,000 accounts validated, 4 cohorts created, campaign plan ready."

Then show a notification-style block:





"3 items sent to Approvals for your review before go-live:"





Campaign plan for Batch 2 — approve campaign calendar and channel allocation



Settlement offer terms — 15% discount, matching current portfolio terms



Compliance guardrail configuration — 57 accounts excluded, state rules applied



A "Go to Approvals →" link

Step 4: Update Approvals page. Add 3 new items to the top of the existing Approvals page, marked as "New" with a blue badge:





Team Lead: "Batch 2 — Campaign plan for 3,000 accounts. 4 cohorts, settlement + voice strategy on high-propensity segment." — Approve / Reject buttons. Status: Pending.



Team Lead: "Batch 2 — Settlement offer at 15% discount for High Prop / High Bal cohort (580 accounts)." — Approve / Reject buttons. Status: Pending.



Compliance: "Batch 2 — 57 accounts excluded from contact (45 litigation, 12 cease-and-desist). Guardrails configured for 8 states." — Acknowledge button. Status: Pending.

These sit above the existing approval items, showing the system just created new work that needs human sign-off.

Design notes for the upload flow:





The agent processing cards should feel sequential — Analyst first, then Compliance, then Team Lead. Each one appears after the previous completes. In the prototype, show all of them as already completed (static), but visually ordered top to bottom with the checkmarks suggesting they ran in sequence.



The reasoning text inside each card should feel like watching someone think, not reading a report. Short lines, each one a step in the logic. Use muted text styling — not bold, not loud. Think of it like a terminal log but in clean prose.



The intelligence transfer moment is the most important line in the entire flow: "Identified 580 accounts matching High Prop / High Bal profile... Recommending settlement + voice strategy based on 40% improvement seen on matching cohort." Make this line slightly more prominent — maybe a subtle highlight background or slightly bolder weight. This is the "the system learns" moment.



The mini tables inside the agent cards (cohort table, campaign calendar) should be compact and clean. Same styling as other tables in the app but smaller — 12px font, tight padding.



The "Go to Approvals →" link at the end closes the loop. The demo can end here or continue to the Approvals page to show the ops manager signing off.


