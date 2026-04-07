Redesign the Portfolio page and add an upload flow. The ops manager arrives here , they review the current state, see depletion, upload new accounts, and watch the system process them.



Portfolio page — redesign:



Top section: Portfolio summary cards. 4 cards in a horizontal row:

- Total Accounts: 12,000 (with sub-text: "11,257 active, 743 resolved")

- Portfolio Value: $33.6M (with sub-text: "$31.5M remaining")

- Avg Balance: $2,800

- Days Active: 18 (with sub-text: "Hypercare — Week 3")



Second section: Cohort allocation view. Show the 5 cohorts as visual cards (similar to Performance page cohort cards, but focused on allocation and runway, not performance). Each card shows:

- Cohort name

- A horizontal progress bar showing penetration — how much of the cohort has been worked through. Fill color green for healthy, amber for running low.

- Accounts: total / remaining / resolved

- Remaining value in dollars

- Assigned strategy (one line: e.g., "Settlement SMS + Voice follow-up")

- Estimated runway: "~X weeks at current pace"



The High Prop / High Bal card should signal depletion:

- Progress bar at 62% filled, colored amber

- Runway: "~2 weeks at current pace"

- Add a small alert line in amber text: "Best-performing cohort nearing depletion"

- This creates the natural urgency for the upload



Other cohort cards show lower penetration (30-45%) with green progress bars and longer runway. The contrast makes the depletion obvious.



Third section: Contact coverage table. Keep the existing contact coverage table:

ChannelCoverageNotes
Phone (Cell)72%Primary for voice AI
Phone (Landline)41%Used for human agents
Email58%Skip tracing added 12%
SMS-eligible68%Cell + TCPA consent

Fourth section: Upload action. A prominent but clean button or card at the bottom:

- "New Placement" button, styled as a primary action (filled button, not a link)

- Sub-text below the button: "Upload a new batch of accounts. Analyst will validate, model, and prepare a campaign plan."

- When clicked (in the prototype, this should be functional enough to show the upload flow described below — either as a modal, a new panel, or a new section that expands on the same page)


