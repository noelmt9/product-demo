# CLAUDE.md — Skit.ai Agentic Collections Platform (Prototype)

## What This Is

An internal prototype for an **Agentic Platform** product that reimagines how Skit.ai delivers end-to-end (E2E) debt collection outcomes. Instead of presenting Skit as a voice bot vendor or a services company, this prototype demonstrates that the work Skit's E2E team does is a **system of intelligent agents** — and the product makes that system visible, configurable, and controllable.

This is a **static visual prototype** — no interactivity, no live data, no backend. The goal is to communicate the product direction internally so the team can align on the vision before iterating further.

---

## Why This Product Exists (Business Context)

Skit.ai has evolved from a voice AI bot company to an end-to-end collections outcome partner. The E2E team (40 people) manages the full lifecycle: portfolio modeling → campaign strategy → multi-channel execution (voice AI, SMS, email, human agents) → daily performance optimization → client reporting.

**The problem:** This work is invisible. It lives in people's heads, emails, Google Sheets, and daily standup calls. Clients see a bot or a human agent talking to consumers — they don't see the intelligence system behind it. Sales demos still show a voice bot, not the end-to-end engine.

**The product thesis:** The E2E team's work can be decomposed into distinct functional components. Each component can be represented as an **agent** with defined skills, configurable SOPs, and observable behavior. The platform is the orchestration layer that makes all of this visible and controllable.

**Competitive reference:** Salient (trysalient.com) operates in auto finance and has named agents like "Marshall" (compliance/QA agent). They agentify components of collection work. Skit's version is broader — covering the full outcome loop, not just individual tasks.

---

## Target Audience for This Prototype

- Internal team only (CEO, Head of Sales, E2E team leads)
- This will be shown in an internal review to align on product direction
- Does NOT need to be client-ready or polished — clarity of concept over visual polish
- Will be iterated with team feedback before any external use

---

## Core Product Concept

### The Outcome Loop

The platform's core value is making visible the **daily outcome optimization loop** that the E2E team runs:

```
Receive accounts → Model portfolio into cohorts → Set strategy per cohort
→ Execute campaigns across channels → Monitor performance → Adjust strategy → Repeat
```

This loop runs **daily** during hypercare and **weekly** during steady-state. Today it requires coordination across Digital Ops, Agent Ops, Analytics, QA, and Project Management teams. The agentic platform makes each step a visible, trackable, and configurable agent action.

### Agent Team

Each agent maps to a real function the E2E team performs today. The agents are:

| Agent Name | One-word Role | Maps to Today | What It Does |
|---|---|---|---|
| **Scout** | Modeling | Pavan's analytics team (3 people) | Ingests placement files, segments accounts into cohorts (by balance, age, region, debt type, payer likelihood), identifies payer/non-payer profiles, recommends digital vs. human allocation per cohort. Runs on every new placement batch. |
| **Strategist** | Planning | Digital Ops campaign executives (4) + modeling team daily strategy calls | Designs campaign calendar per cohort: which channel, what content, what cadence, what time. Proposes strategy changes daily based on performance data. Owns the "3C" framework — Channel, Content, Cadence. |
| **Sentinel** | Compliance | QA Analysts (2) | Audits conversations (calls, SMS, emails) for compliance violations (FDCPA, TCPA, state-specific rules, client brand guidelines). Flags issues, scores quality, generates compliance reports. Equivalent to Salient's "Marshall." |
| **Pulse** | Performance | Daily/weekly performance review process run by function head | Tracks KPIs against activation benchmarks (penetration, PTP, kept-PTP, contact rate, agent productivity, liquidation). Identifies underperforming cohorts. Recommends reallocation between digital and human operations. Generates daily/weekly reports. |
| **Runner** | Execution | Campaign Executives + Dialer Manager + Digital Collector | The operational heartbeat. Shows what's actively running — which bots on which cohorts, which human agents on which accounts, which channels are live. Tracks real-time campaign status and delivery metrics (attempts, connections, sends, opens, clicks). |

### Platform Layers

The product has 4 conceptual layers:

**Layer 1 — Infrastructure (invisible)**
Telephony, SMS/email providers, SFTP integrations, dialer, number rotation. Clients and most internal users never see this. It just works.

**Layer 2 — Business Context (configurable per client)**
This is the "bring your own SOP" layer. Compliance rules, attempt limits, channel restrictions, state exclusions, language rules, brand guardrails, working hours, weekend policies. Set once during onboarding (maps to Phase 1-2 of the current operating playbook), adjusted as needed. Each agent operates within these constraints.

**Layer 3 — Agent Intelligence (the core)**
Where the 5 agents live. Each agent has:
- **Skills**: what it can do (e.g., Scout can segment by balance, age, region, debt type, behavioral signals)
- **Configuration**: client-specific SOPs and rules (e.g., Sentinel's compliance rules vary by state)
- **Activity log**: observable trace of what it did and why
- **Outputs**: artifacts it produces (cohort maps, campaign calendars, compliance reports, performance summaries)

**Layer 4 — Management / Orchestration (the UI)**
What users see. Command center with portfolio overview, agent team view, individual agent views, portfolio deep-dive. Future: chat interface to query agents. For this prototype, all views are static.

---

## Prototype Specification

### Tech Stack
- **React** (single-page app, single .jsx file or minimal file structure)
- **Tailwind CSS** for styling (utility classes only — no custom CSS build)
- **Mock data as embedded JSON** — no external files, no API calls, no backend
- **Static views only** — no interactivity, no click handlers beyond basic navigation tabs
- **No real AI/LLM calls** — all agent outputs are pre-written mock content

### Design Approach
- Internal prototype — prioritize **clarity of concept** over polish
- Clean, minimal, dark-mode-friendly (the team uses dark tools)
- Dense information display is fine — this audience reads dashboards daily
- Use clear labels and section headers so someone unfamiliar can understand what each area represents
- No animations, no transitions, no loading states — everything is static and visible

### Data Scenario

All mock data should represent a **post-charge-off agency scenario** modeled loosely after patterns from Pollack & Rosen (a debt buyer client).

**Client profile for mock data:**
- Client name: "Apex Recovery Partners" (fictional)
- Portfolio: Post-charge-off consumer debt (credit card + personal loan + medical)
- Total accounts in current placement: ~12,000 accounts
- Average balance: $2,800
- Portfolio age: Mix of 6-month to 3-year post charge-off
- Channels available: Voice AI, Human Agents, SMS, Email
- Human agents assigned: 6
- Compliance: FDCPA, TCPA, state-specific (NY, TX, CA, FL heavy)
- Current phase: Hypercare (Week 3) — so there's live performance data to show

**Cohort breakdown (Scout agent output):**
| Cohort | Accounts | Avg Balance | Strategy |
|---|---|---|---|
| High propensity / Low balance | 2,400 | $1,200 | Digital-only (SMS + Email) |
| High propensity / High balance | 1,800 | $4,500 | Voice AI → Human agent escalation |
| Medium propensity / All balances | 4,200 | $2,600 | Multi-channel blitz (all channels) |
| Low propensity / Low balance | 2,100 | $900 | Low-touch digital (email only, monthly) |
| Low propensity / High balance | 1,500 | $5,200 | Human agent priority (skip-traced, intensive) |

**Performance data (Pulse agent output):**
- Week 1: 1.8% liquidation rate (below 2.5% target)
- Week 2: 2.3% liquidation rate (improving, strategy adjustments kicking in)
- Week 3 (current): 2.7% liquidation rate (above target, trending well)
- Contact rate: 38% overall, 52% on high-propensity cohorts
- PTP (Promise to Pay) rate: 12% of contacted accounts
- Kept-PTP rate: 68% of promises kept
- Agent productivity: 45 accounts/agent/day

**Strategy changes log (Strategist agent output):**
- Day 3: Shifted medical debt cohort from voice-first to SMS-first (voice connect rates were 18%, SMS open rate was 41%)
- Day 8: Added Spanish-language SMS variant for TX/FL cohort (identified 22% Spanish-preference accounts via demographic data)
- Day 12: Increased voice AI attempts on high-propensity/high-balance from 3x/week to 5x/week (compliance allows 7x, conservative start showing room to push)
- Day 15: Reallocated 2 human agents from low-propensity to medium-propensity cohort (low-propensity was showing diminishing returns on human touch)

**Compliance flags (Sentinel agent output):**
- 2,847 conversations audited this week
- 3 flagged for potential FDCPA mini-Miranda issues (agent didn't state call was from a debt collector within first 30 seconds)
- 1 flagged for potential TCPA issue (call placed outside permitted hours for NY timezone)
- Compliance score: 99.86%
- All flags resolved within 24 hours, corrective actions logged

**Campaign status (Runner agent output):**
- Voice AI: 3 bots active (English general, English empathetic for medical, Spanish), 1,200 calls/day
- Human Agents: 6 active, averaging 45 outbound calls/day each
- SMS: 2 campaigns running (payment reminder, settlement offer), 800 sends/day
- Email: 3 sequences active (intro, follow-up, final notice), 600 sends/day
- Active campaigns: 8 total across channels

### Screen Layout

The prototype should show the following views, arranged as tabs or sections that are all visible or navigable:

#### Screen 1: Command Center (Home)

This is the "start with outcomes" view. It should immediately communicate: here's the portfolio, here's how it's performing, here's what the agents are doing.

**Top section — Portfolio Snapshot:**
- Client name: Apex Recovery Partners
- Total accounts: 12,000 | Total portfolio value: $33.6M
- Current liquidation rate: 2.7% (with trend arrow up, and target line at 2.5%)
- Phase: Hypercare — Week 3
- Days since go-live: 18

**Middle section — Agent Activity Feed:**
A vertical feed showing recent agent actions, most recent first. Each entry shows:
- Agent name + icon
- What it did (1-2 sentence summary)
- When (relative time)

Example entries:
- **Strategist** — "Recommended increasing SMS cadence on Medium Propensity cohort from 2x/week to 3x/week based on 34% open-rate trend." — 2 hours ago
- **Sentinel** — "Audited 412 conversations today. 1 flag: potential time-zone violation on NY account. Escalated to QA lead." — 4 hours ago
- **Pulse** — "Week 3 liquidation rate hit 2.7%, crossing the 2.5% activation target. High-propensity cohorts driving 60% of collections." — 6 hours ago
- **Scout** — "Re-scored 340 accounts from Low Propensity to Medium Propensity based on recent engagement signals (SMS clicks + email opens)." — 1 day ago
- **Runner** — "Launched Spanish SMS campaign for TX/FL cohort. 180 accounts targeted in first batch." — 1 day ago

**Bottom section — Weekly KPI Summary Table:**
| Metric | Week 1 | Week 2 | Week 3 | Target |
|---|---|---|---|---|
| Liquidation Rate | 1.8% | 2.3% | 2.7% | 2.5% |
| Contact Rate | 31% | 35% | 38% | 40% |
| PTP Rate | 8% | 10% | 12% | 12% |
| Kept-PTP | 62% | 65% | 68% | 70% |
| Compliance Score | 99.91% | 99.88% | 99.86% | 99.5% |

#### Screen 2: Agent Team

A grid/card layout showing all 5 agents. Each card shows:
- Agent name and one-word role
- A short description (1 sentence of what it does)
- Status indicator (Active)
- Key metric it owns (e.g., Scout → "5 cohorts modeled", Strategist → "4 strategy changes this week", Sentinel → "2,847 conversations audited", Pulse → "2.7% liquidation rate", Runner → "8 campaigns active")
- Last action (1 line)

This view communicates: there is a team, each member has a clear job, and they are all working.

#### Screen 3: Scout Agent (Individual Agent View)

Represents the Portfolio Analyst / Modeling function.

**Header:** Scout Agent — Modeling
**Description:** "Analyzes placement files to segment accounts into actionable cohorts based on balance, age, region, debt type, and behavioral propensity signals. Recommends optimal allocation between digital and human channels per cohort."

**Skills section (list):**
- Portfolio segmentation (balance, age, region, debt type)
- Propensity scoring (payer likelihood based on demographic + behavioral signals)
- Channel allocation recommendation (digital vs. human per cohort)
- Re-scoring on engagement signals (adjusts cohorts as new data comes in)

**Current Portfolio Model (the cohort table from the data scenario above):**
Show the 5-cohort breakdown as a visual table with accounts, avg balance, and assigned strategy per cohort.

**Configuration / SOP section:**
- Minimum cohort size: 200 accounts (don't create micro-segments)
- Re-scoring frequency: Weekly (or on significant engagement signal volume)
- Propensity model inputs: Balance, age of debt, number of prior placements, region, contact info completeness, past payment behavior

**Recent Activity Log:**
- Day 18: Re-scored 340 accounts from Low → Medium propensity based on SMS click + email open engagement
- Day 14: Initial portfolio model created. 5 cohorts defined. Shared with Strategist for campaign planning.
- Day 1: Received placement file (12,000 accounts). Completed intake validation. 11,847 accounts clean, 153 flagged for data issues (missing phone/email).

#### Screen 4: Strategist Agent (Individual Agent View)

Represents the Strategy / Campaign Planning function.

**Header:** Strategist Agent — Planning
**Description:** "Designs and optimizes the campaign strategy per cohort — which channels, what content, what cadence, what timing. Reviews performance data daily and recommends adjustments to maximize outcomes within compliance guardrails."

**Skills section:**
- Campaign calendar design (channel + content + cadence per cohort)
- A/B content recommendation (message variants by debt type, tone, language)
- Cadence optimization (timing, frequency, day-of-week patterns)
- Strategy change recommendation (based on performance signals)
- Cross-channel coordination (ensuring channels don't conflict — e.g., don't call someone who just received SMS 10 min ago)

**Current Campaign Calendar (simplified view):**
A matrix showing Cohort × Channel with cadence info:
| Cohort | Voice AI | Human Agent | SMS | Email |
|---|---|---|---|---|
| High Prop / Low Bal | — | — | 3x/week | 2x/week |
| High Prop / High Bal | 5x/week | On escalation | 2x/week | 1x/week |
| Medium Prop | 3x/week | 2x/week | 3x/week | 2x/week |
| Low Prop / Low Bal | — | — | — | 1x/month |
| Low Prop / High Bal | 1x/week | 5x/week | 1x/week | 1x/week |

**Strategy Change Log:**
Show the 4 strategy changes from the data scenario above, each with:
- Date
- What changed
- Why (data point that triggered it)
- Impact observed (if enough time has passed)

**Configuration / SOP section:**
- Max daily attempts per account: 7 (FDCPA/TCPA)
- Client-imposed cap: 5 (conservative start)
- Restricted hours: Before 8am / After 9pm local time
- Weekend calling: Saturdays only, 9am-5pm
- SMS opt-out honored within 1 hour
- Content approval: All new message templates require Sentinel review before launch

#### Screen 5: Sentinel Agent (Individual Agent View)

Represents the Compliance / QA function.

**Header:** Sentinel Agent — Compliance
**Description:** "Audits all consumer interactions across channels for regulatory compliance (FDCPA, TCPA, state-specific rules) and client brand guidelines. Flags potential violations, scores conversation quality, and generates compliance reports for client examiners."

**Skills section:**
- Conversation audit (voice calls, SMS threads, email sequences)
- FDCPA compliance check (mini-Miranda, harassment, false representation, unfair practices)
- TCPA compliance check (calling hours, consent, do-not-call)
- State-specific rule enforcement (NY, TX, CA, FL and others)
- Quality scoring (tone, professionalism, accuracy of information, resolution effectiveness)
- Compliance report generation (for client compliance teams and examiners)

**This Week's Summary:**
- Conversations audited: 2,847
- Flags raised: 4 (3 FDCPA, 1 TCPA)
- Flags resolved: 4/4 (100%)
- Average resolution time: 18 hours
- Overall compliance score: 99.86%
- Quality score (agent calls): 87/100

**Flagged Issues Detail:**
Show each of the 4 flags with:
- Issue type (FDCPA / TCPA)
- Description (1 sentence)
- Channel (Voice / SMS / Email)
- Agent type (Human / AI)
- Status (Resolved)
- Corrective action taken

**Configuration / SOP section:**
- Audit coverage: 100% of voice AI calls, 100% of human agent calls (first 2 weeks), 30% random sample after Week 2
- Flag severity levels: Critical (potential lawsuit risk), Warning (process gap), Info (coaching opportunity)
- Auto-escalation: Critical flags auto-escalated to E2E function head and client compliance contact
- State rules loaded: NY, TX, CA, FL, IL, PA, OH, GA (top 8 states by account volume)

#### Screen 6: Pulse Agent (Individual Agent View)

Represents the Performance Monitoring function.

**Header:** Pulse Agent — Performance
**Description:** "Tracks portfolio performance against activation benchmarks. Identifies underperforming cohorts, surfaces trends, and recommends reallocation of resources between digital and human operations to maximize outcomes."

**Skills section:**
- KPI tracking (liquidation, contact rate, PTP, kept-PTP, agent productivity)
- Benchmark comparison (current performance vs. activation targets vs. similar portfolio baselines)
- Cohort-level performance breakdown
- Underperformance alerting (flags cohorts falling below threshold)
- Reallocation recommendation (shift accounts/agents between cohorts based on ROI)
- Trend analysis (week-over-week, day-over-day patterns)

**Performance Dashboard:**
Show the weekly KPI table from the Command Center, but expanded with cohort-level breakdown:
| Cohort | Liquidation | Contact Rate | PTP Rate | Status |
|---|---|---|---|---|
| High Prop / Low Bal | 4.1% | 48% | 15% | ✅ Above target |
| High Prop / High Bal | 3.8% | 52% | 18% | ✅ Above target |
| Medium Prop | 2.2% | 36% | 11% | ⚠️ Slightly below |
| Low Prop / Low Bal | 0.4% | 12% | 3% | ➡️ Expected |
| Low Prop / High Bal | 1.9% | 28% | 8% | ⚠️ Below target |

**Recent Alerts / Recommendations:**
- "Medium Propensity cohort contact rate plateauing at 36%. Recommend adding morning SMS nudge before voice AI attempt to improve pickup rates." — Day 17
- "Low Prop / High Bal showing diminishing returns on human agent time. ROI per agent-hour dropped 22% from Week 2 to Week 3. Consider reducing from 5x/week to 3x/week and reallocating 1 agent to Medium Propensity." — Day 16
- "Week 3 liquidation crossed activation target (2.7% vs 2.5%). Recommend preparing Activation Review materials for client." — Day 18

**Configuration / SOP section:**
- Activation benchmarks: Liquidation ≥ 2.5%, Contact Rate ≥ 40%, Kept-PTP ≥ 70%
- Alert threshold: Flag when any cohort drops 15%+ below its target for 3+ consecutive days
- Reporting cadence: Daily internal summary, weekly client-facing report
- Benchmark source: Internal portfolio baselines across 50+ client engagements

#### Screen 7: Runner Agent (Individual Agent View)

Represents the Campaign Execution / Operations function.

**Header:** Runner Agent — Execution
**Description:** "The operational heartbeat. Manages active campaign delivery across all channels — voice AI bots, human agent queues, SMS sends, email sequences. Tracks delivery metrics in real time and ensures campaigns run on schedule within compliance windows."

**Skills section:**
- Campaign launch and scheduling
- Multi-channel delivery management (voice AI, human agents, SMS, email)
- Real-time delivery tracking (attempts, connections, sends, opens, clicks, replies)
- Bot management (which bot variant for which cohort)
- Agent queue management (account assignment, workload balancing)
- Delivery failure handling (bounced emails, invalid numbers, opt-outs)

**Active Campaigns:**
| Campaign | Channel | Cohort | Daily Volume | Status |
|---|---|---|---|---|
| Voice AI - English General | Voice | Med Prop + High Prop/High Bal | 800 calls | ✅ Running |
| Voice AI - English Empathetic | Voice | Medical debt subset | 200 calls | ✅ Running |
| Voice AI - Spanish | Voice | TX/FL Spanish-pref | 200 calls | ✅ Running |
| Human Outbound | Voice | Low Prop/High Bal + Escalations | 270 calls | ✅ Running |
| SMS - Payment Reminder | SMS | High Prop/Low Bal + Med Prop | 500 sends | ✅ Running |
| SMS - Settlement Offer | SMS | Low Prop/High Bal | 300 sends | ✅ Running |
| Email - Intro Sequence | Email | All new accounts (Week 1) | 200 sends | ✅ Running |
| Email - Follow-up | Email | Engaged but unpaid | 400 sends | ✅ Running |

**Today's Delivery Summary:**
- Total attempts: 2,870 (across all channels)
- Voice AI: 1,200 calls → 456 connections (38%)
- Human Agents: 270 calls → 148 connections (55%)
- SMS: 800 sends → 328 opens (41%), 52 link clicks (6.5%)
- Email: 600 sends → 138 opens (23%), 24 clicks (4%)

**Configuration / SOP section:**
- Campaign hours: Mon-Fri 8am-9pm local, Sat 9am-5pm local
- Max concurrent voice campaigns per account: 1 (no overlapping calls)
- SMS-to-voice gap: Minimum 2 hours between SMS send and voice attempt on same account
- Delivery retry logic: Failed calls retried next business day, bounced emails removed after 2 bounces
- Human agent assignment: Round-robin within cohort, priority escalations override

#### Screen 8: Portfolio Deep Dive

A more detailed view of the portfolio. This is what Scout produces and Strategist uses.

**Top section — Portfolio Overview:**
- Total accounts: 12,000
- Clean accounts: 11,847
- Data issues: 153 (missing contact info)
- Total portfolio value: $33.6M
- Debt types: Credit Card (42%), Personal Loan (28%), Medical (30%)
- Top states: TX (18%), FL (15%), CA (14%), NY (12%), IL (8%)

**Cohort Visualization:**
A visual representation (table or simple bar chart) of the 5 cohorts showing:
- Account count
- Total value
- Strategy assigned
- Current liquidation rate per cohort

**Account Flow (conceptual):**
Show how accounts move:
- New placement → Scout models → Cohort assigned → Strategist sets campaign → Runner executes → Pulse monitors → Strategy adjustment → Repeat
- Accounts can move between cohorts (e.g., Scout re-scored 340 from Low → Medium based on engagement)

---

## Design Notes

- Use a **sidebar navigation** with icons for each screen (Command Center, Agent Team, Scout, Strategist, Sentinel, Pulse, Runner, Portfolio)
- Use a **dark theme** (dark gray/navy background, white/light text) — the team uses dark tools and this signals "internal platform"
- Each agent should have a **distinct accent color** so they're visually distinguishable in the activity feed:
  - Scout: Blue
  - Strategist: Purple
  - Sentinel: Red/Orange
  - Pulse: Green
  - Runner: Yellow/Amber
- Tables should be dense but readable — this audience is comfortable with data-heavy views
- No loading states, no animations, no hover effects — pure static render
- Agent cards should feel like "team member profiles" — name, role, status, what they've been doing
- The overall feel should be: **this is a command center for running a collections operation through intelligent agents**

---

## What This Prototype Is NOT

- It is NOT a chatbot or conversational AI demo
- It is NOT a dashboard/BI tool (though it shows data — the data is agent-produced, not raw analytics)
- It is NOT a voice bot demo or any channel-specific demo
- It is NOT functional software — no backend, no real data, no interactivity
- It is NOT client-facing at this stage

## What Success Looks Like

After seeing this prototype, the internal team should:
1. Understand that the E2E team's work is decomposable into distinct agents
2. See how each agent maps to real work happening today
3. Feel that this framing (agentic platform) is a credible and differentiated product direction
4. Be able to point at specific screens and say "yes, this is what we do" or "no, this should be different"
5. Start thinking about which agents to build first as real product

---

## File Structure

This should be a single React file (`.jsx`) or minimal file structure. All mock data should be embedded in the file. No external dependencies beyond React and Tailwind. The prototype should render as a single-page app with tab-based navigation between screens.

If the file gets too large for a single component, split into:
```
/src
  App.jsx          — Main app with navigation
  data.js          — All mock data (cohorts, KPIs, agent activity, campaigns, flags)
  CommandCenter.jsx
  AgentTeam.jsx
  AgentDetail.jsx  — Reusable component for individual agent views (Scout, Strategist, etc.)
  Portfolio.jsx
```

Keep it simple. This is a prototype.
