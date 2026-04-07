# CLAUDE.md — Skit.ai Agentic Collections Platform (Prototype)

## What This Is

An internal prototype for an **Agentic Platform** product that reimagines how Skit.ai delivers end-to-end (E2E) debt collection outcomes. Instead of presenting Skit as a voice bot vendor or a services company, this prototype demonstrates that the work Skit's E2E team does is a **system of intelligent agents** — and the product makes that system visible, configurable, and controllable.

This is a **static visual prototype** — no interactivity, no live data, no backend. The goal is to communicate the product direction internally so the team can align on the vision before iterating further.

---

## Why This Product Exists (Business Context)

Skit.ai has evolved from a voice AI bot company to an end-to-end collections outcome partner. The E2E team (40 people) manages the full lifecycle: portfolio modeling → campaign strategy → multi-channel execution (voice AI, SMS, email, human agents) → daily performance optimization → client reporting.

**The problem:** This work is invisible. It lives in people's heads, emails, Google Sheets, and daily standup calls. Clients see a bot or a human agent talking to consumers — they don't see the intelligence system behind it. Sales demos still show a voice bot, not the end-to-end engine.

**The product thesis:** The E2E team's work can be decomposed into distinct functional components. Each component can be represented as an **agent** with defined skills, configurable SOPs, and observable behavior. The platform is the orchestration layer that makes all of this visible and controllable.

**The real work pipeline (4 phases + human ops):**
```
Context Collection → Campaign Setup → Multichannel AI Delivery → Performance Tuning
       ↑                                                                |
       └────────────────── Feedback Loop ──────────────────────────────┘
```

- **Context Collection:** Portfolio analysis, Debt analysis, Client KT, CX behaviour analysis. Fed by client data, consumer behavior, campaign insights, external signals.
- **Campaign Setup:** Data Cleaning, Skip Tracing, Cohort Creation, Content Creation, Offer/Scheme creation, Multichannel delivery setup, Integrations setup, Payment setup, Compliance guardrails.
- **Multichannel AI Delivery:** Email, Phone, Text, WhatsApp outbound. Plus inbound: Inbound Bot, Live Transfers, Email/Website Collections.
- **Performance Tuning:** Connectivity metrics, RPC metrics, P2P metrics, Resolution metrics. Feedback loop back to Context Collection.
- **Human Agent Operations (parallel):** 1st Party collections via Mulberry Street Capital — experienced collectors (5-15yr), accent neutralization, tech enabled → Consumer.

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
Receive accounts → Analyze & model portfolio → Create cohorts → Set strategy per cohort
→ Execute campaigns across channels → Monitor performance → Adjust strategy → Repeat
```

This loop runs **daily** during hypercare and **weekly** during steady-state. Today it requires coordination across Digital Ops, Agent Ops, Analytics, QA, and Project Management teams. The agentic platform makes each step a visible, trackable, and configurable agent action.

### Agent Team

Each agent is named using **standard collections industry terminology** — anyone working in debt collection will immediately recognize what each agent does. No translation needed.

| Agent Name | Role | Maps to in the E2E Team Today | What It Does |
|---|---|---|---|
| **Analyst** | Context, Modeling & Performance | Pavan's analytics team (3 people) + MIS Executives (2) + the daily/weekly performance review process | The data brain. Handles the full arc: ingests placement files, cleans data, runs skip tracing, segments into cohorts, scores propensity. Then continuously tracks KPIs against activation benchmarks, identifies underperforming cohorts, recommends reallocation, and feeds signals back into strategy. Owns both the upfront portfolio model and the ongoing performance feedback loop. |
| **Team Lead** | Campaign Strategy & Optimization | Digital Ops campaign executives (4) + modeling team daily strategy calls | Designs and optimizes the campaign strategy per cohort — which channels, what content, what offers/schemes, what cadence, what timing. Reviews Analyst's performance data daily and recommends adjustments. Owns the 3C framework (Channel, Content, Cadence) and the campaign calendar. |
| **Compliance** | Regulatory & Guardrails | QA Analysts (2) for compliance monitoring | Pre-launch: sets compliance guardrails per state, FDCPA/TCPA rules, client brand guidelines, channel restrictions. Ongoing: audits conversations across all channels for regulatory violations, flags potential issues, generates compliance reports for client examiners. |
| **Coach** | Quality & Training | QA Analysts (2) for quality + Trainer (1) | Audits conversation quality (separate from compliance — focuses on effectiveness, tone, objection handling). Scores agents (human and AI). Identifies coaching opportunities, runs calibration sessions, designs refresher training. Tracks quality scores over time. |
| **Collector** | Multichannel Execution | Campaign Executives (4) + Dialer Manager (1) + Digital Collector (1) + Human Collectors (23) + Agent Ops team | The operational nerve center. Manages all active campaign delivery: Voice AI bots, human agent queues, SMS sends, email sequences, WhatsApp. Handles inbound (Inbound Bot, live transfers, email/website collections). Coordinates with human agent operations (1st party collections via Mulberry). Tracks delivery metrics in real time. |

### How the Agents Work Together

```
Analyst                    Team Lead                 Collector
  │                           │                         │
  ├─ Ingests placement        │                         │
  ├─ Cleans data              │                         │
  ├─ Runs skip tracing        │                         │
  ├─ Creates cohorts ────────→├─ Designs campaign       │
  │                           ├─ Sets 3C per cohort     │
  │                           ├─ Creates content ──────→├─ Launches campaigns
  │                           │                         ├─ Manages AI delivery
  │                           │    Compliance           ├─ Manages human agents
  │                           │      │                  ├─ Handles inbound
  │                           │      ├─ Reviews content │
  │                           │      ├─ Sets guardrails │
  │                           │      ├─ Audits live ────┤
  │                           │      │  conversations   │
  │                           │                         │
  │                           │    Coach                │
  │                           │      │                  │
  │                           │      ├─ Scores quality ─┤
  │                           │      ├─ Flags coaching  │
  │                           │      ├─ Runs training   │
  │                           │                         │
  ├─ Tracks KPIs ←────────────────────────────────────── Performance data
  ├─ Spots underperformance   │                         │
  ├─ Recommends reallocation─→├─ Adjusts strategy       │
  ├─ Re-scores cohorts        ├─ Changes cadence ──────→├─ Updates campaigns
  │                           ├─ Swaps content ────────→├─ Deploys changes
  └─ Feeds signals back ─────→└─ Next cycle             └─ Next cycle
```

### Platform Layers

The product has 4 conceptual layers:

**Layer 1 — Infrastructure (invisible)**
Telephony, SMS/email providers, SFTP integrations, dialer, number rotation, payment processing. Clients and most internal users never see this. It just works.

**Layer 2 — Business Context (configurable per client)**
This is the "bring your own SOP" layer. Compliance rules, attempt limits, channel restrictions, state exclusions, language rules, brand guardrails, working hours, weekend policies, offer parameters, payment plan rules. Set once during onboarding (maps to Phase 1-2 of the current operating playbook), adjusted as needed. Each agent operates within these constraints.

**Layer 3 — Agent Intelligence (the core)**
Where the 5 agents live. Each agent has:
- **Skills**: what it can do (e.g., Analyst can segment by balance, age, region, debt type, behavioral signals)
- **Configuration**: client-specific SOPs and rules (e.g., Compliance rules vary by state and client)
- **Activity log**: observable trace of what it did and why
- **Outputs**: artifacts it produces (cohort maps, campaign calendars, compliance reports, quality scores, performance summaries)

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
- Agent cards should feel like "team member profiles" — name, role, status, what they've been doing
- The overall feel should be: **this is a command center for running a collections operation through intelligent agents**

### Data Scenario

All mock data should represent a **post-charge-off agency scenario**.

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
- 1st Party collections via Mulberry Street Capital: experienced collectors, accent neutralization, tech enabled

**Cohort breakdown (Analyst agent output):**
| Cohort | Accounts | Avg Balance | Propensity | Strategy |
|---|---|---|---|---|
| High propensity / Low balance | 2,400 | $1,200 | High | Digital-only (SMS + Email) |
| High propensity / High balance | 1,800 | $4,500 | High | Voice AI → Human agent escalation |
| Medium propensity / All balances | 4,200 | $2,600 | Medium | Multi-channel blitz (all channels) |
| Low propensity / Low balance | 2,100 | $900 | Low | Low-touch digital (email only, monthly) |
| Low propensity / High balance | 1,500 | $5,200 | Low | Human agent priority (skip-traced, intensive) |

**Performance data (Analyst agent output):**
- Week 1: 1.8% liquidation rate (below 2.5% target)
- Week 2: 2.3% liquidation rate (improving, strategy adjustments kicking in)
- Week 3 (current): 2.7% liquidation rate (above target, trending well)
- Contact rate: 38% overall, 52% on high-propensity cohorts
- PTP (Promise to Pay) rate: 12% of contacted accounts
- Kept-PTP rate: 68% of promises kept
- RPC (Right Party Contact) rate: 28% overall
- Agent productivity: 45 accounts/agent/day
- Resolution rate: 6.2% of total portfolio (cumulative)

**Strategy changes log (Team Lead agent output):**
- Day 3: Shifted medical debt cohort from voice-first to SMS-first (voice connect rates were 18%, SMS open rate was 41%)
- Day 8: Added Spanish-language SMS variant for TX/FL cohort (identified 22% Spanish-preference accounts via demographic data)
- Day 12: Increased voice AI attempts on high-propensity/high-balance from 3x/week to 5x/week (compliance allows 7x, conservative start showing room to push)
- Day 15: Reallocated 2 human agents from low-propensity to medium-propensity cohort (low-propensity was showing diminishing returns on human touch)
- Day 17: Introduced settlement offer SMS for accounts with 2+ failed PTP (new content variant, 15% discount offer)

**Compliance flags (Compliance agent output):**
- 2,847 conversations audited this week
- 3 flagged for potential FDCPA mini-Miranda issues (agent didn't state call was from a debt collector within first 30 seconds)
- 1 flagged for potential TCPA issue (call placed outside permitted hours for NY timezone)
- Compliance score: 99.86%
- All flags resolved within 24 hours, corrective actions logged

**Quality scores (Coach agent output):**
- Human agent average quality score: 87/100
- Voice AI quality score: 92/100
- Top coaching opportunity: Objection handling on "I already paid this" — 3 agents scored below threshold
- Calibration session scheduled: Friday, focused on medical debt sensitivity
- Training completion: 6/6 agents current on Q1 compliance refresher

**Campaign status (Collector agent output):**
- Voice AI: 3 bots active (English general, English empathetic for medical, Spanish), 1,200 calls/day
- Human Agents: 6 active, averaging 45 outbound calls/day each
- SMS: 3 campaigns running (payment reminder, settlement offer, PTP follow-up), 800 sends/day
- Email: 3 sequences active (intro, follow-up, final notice), 600 sends/day
- Inbound: Bot handling payment calls, live transfers for disputes/hardship
- Active campaigns: 9 total across channels

### Screen Layout

The prototype should show the following views, arranged as tabs or sections that are all visible or navigable:

---

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
- **Team Lead** — "Recommended increasing SMS cadence on Medium Propensity cohort from 2x/week to 3x/week based on 34% open-rate trend." — 2 hours ago
- **Compliance** — "Audited 412 conversations today. 1 flag: potential time-zone violation on NY account. Escalated to QA lead." — 4 hours ago
- **Analyst** — "Week 3 liquidation rate hit 2.7%, crossing the 2.5% activation target. High-propensity cohorts driving 60% of collections." — 6 hours ago
- **Coach** — "Scored 18 human agent calls. 3 agents below threshold on 'I already paid' objection handling. Calibration session scheduled Friday." — 8 hours ago
- **Analyst** — "Re-scored 340 accounts from Low Propensity to Medium Propensity based on recent engagement signals (SMS clicks + email opens)." — 1 day ago
- **Collector** — "Launched Spanish SMS campaign for TX/FL cohort. 180 accounts targeted in first batch." — 1 day ago
- **Team Lead** — "Introduced settlement offer SMS for accounts with 2+ failed PTP. 15% discount, targeting 620 accounts." — 1 day ago

**Bottom section — Weekly KPI Summary Table:**
| Metric | Week 1 | Week 2 | Week 3 | Target |
|---|---|---|---|---|
| Liquidation Rate | 1.8% | 2.3% | 2.7% | 2.5% |
| Contact Rate | 31% | 35% | 38% | 40% |
| RPC Rate | 22% | 25% | 28% | 30% |
| PTP Rate | 8% | 10% | 12% | 12% |
| Kept-PTP | 62% | 65% | 68% | 70% |
| Resolution Rate | 1.8% | 3.9% | 6.2% | — |
| Compliance Score | 99.91% | 99.88% | 99.86% | 99.5% |

---

#### Screen 2: Agent Team

A grid/card layout showing all 5 agents. Each card shows:
- Agent name and role
- A short description (1 sentence of what it does)
- Status indicator (Active)
- Key metric it owns
- Last action (1 line)

**Analyst** — Context, Modeling & Performance
"Analyzes portfolios, creates cohorts, tracks performance, and feeds signals back into strategy."
Key metric: 2.7% liquidation rate (↑ from 1.8% Week 1)
Last action: "Re-scored 340 accounts from Low → Medium propensity based on engagement signals."

**Team Lead** — Campaign Strategy & Optimization
"Designs campaign strategy per cohort and adjusts based on performance data."
Key metric: 4 strategy changes this week
Last action: "Introduced settlement offer SMS for accounts with 2+ failed PTP."

**Compliance** — Regulatory & Guardrails
"Audits conversations for regulatory compliance and maintains pre-launch guardrails."
Key metric: 99.86% compliance score
Last action: "Flagged 1 potential TCPA time-zone violation on NY account."

**Coach** — Quality & Training
"Scores conversation quality, identifies coaching opportunities, runs agent training."
Key metric: 87/100 avg agent quality score
Last action: "3 agents below threshold on objection handling. Calibration session scheduled."

**Collector** — Multichannel Execution
"Manages all campaign delivery — AI and human, outbound and inbound, across all channels."
Key metric: 9 active campaigns, 2,870 daily touchpoints
Last action: "Launched Spanish SMS campaign for TX/FL cohort."

---

#### Screen 3: Analyst Agent (Individual Agent View)

**Header:** Analyst — Context, Modeling & Performance
**Description:** "The data brain. Handles the full arc from portfolio intake to ongoing performance optimization. Ingests placement files, cleans data, runs skip tracing, segments accounts into actionable cohorts, and scores propensity. Then continuously tracks KPIs against activation benchmarks, identifies underperforming cohorts, recommends reallocation between digital and human operations, and feeds engagement signals back to re-score cohorts and inform strategy changes."

**Skills section:**
- Portfolio intake and data cleaning
- Skip tracing (contact enrichment — phone, email, address)
- Cohort creation (by balance, age, region, debt type, prior placements, contact completeness)
- Propensity scoring (payer likelihood based on demographic + behavioral signals)
- Channel allocation recommendation (digital vs. human per cohort)
- KPI tracking (liquidation, contact rate, RPC, PTP, kept-PTP, resolution rate, agent productivity)
- Benchmark comparison (current vs. activation targets vs. similar portfolio baselines)
- Cohort-level performance breakdown
- Underperformance alerting (flags cohorts falling below threshold)
- Reallocation recommendation (shift accounts/agents between cohorts based on ROI)
- Re-scoring on engagement signals (adjusts cohorts as new data comes in)
- Feedback loop to Team Lead (triggers strategy change recommendations)

**Current Portfolio Model (cohort table):**
Show the 5-cohort breakdown with accounts, avg balance, propensity, and assigned strategy.

**Performance Dashboard:**
Show the weekly KPI table, plus cohort-level breakdown:
| Cohort | Liquidation | Contact Rate | RPC Rate | PTP Rate | Status |
|---|---|---|---|---|---|
| High Prop / Low Bal | 4.1% | 48% | 35% | 15% | ✅ Above target |
| High Prop / High Bal | 3.8% | 52% | 38% | 18% | ✅ Above target |
| Medium Prop | 2.2% | 36% | 26% | 11% | ⚠️ Slightly below |
| Low Prop / Low Bal | 0.4% | 12% | 8% | 3% | ➡️ Expected |
| Low Prop / High Bal | 1.9% | 28% | 22% | 8% | ⚠️ Below target |

**Recent Alerts / Recommendations:**
- "Medium Propensity cohort contact rate plateauing at 36%. Recommend adding morning SMS nudge before voice AI attempt to improve pickup rates." — Day 17
- "Low Prop / High Bal showing diminishing returns on human agent time. ROI per agent-hour dropped 22% from Week 2 to Week 3. Consider reducing from 5x/week to 3x/week and reallocating 1 agent to Medium Propensity." — Day 16
- "Week 3 liquidation crossed activation target (2.7% vs 2.5%). Recommend preparing Activation Review materials for client." — Day 18

**Recent Activity Log:**
- Day 18: Re-scored 340 accounts from Low → Medium propensity based on SMS click + email open engagement.
- Day 18: Published Week 3 performance summary. Liquidation at 2.7%, above 2.5% activation target.
- Day 14: Initial portfolio model created. 5 cohorts defined. Shared with Team Lead for campaign planning.
- Day 1: Received placement file (12,000 accounts). Completed intake validation and data cleaning. 11,847 accounts clean, 153 flagged for data issues. Skip tracing initiated on accounts with missing contact info.

**Configuration / SOP section:**
- Minimum cohort size: 200 accounts
- Re-scoring frequency: Weekly (or on significant engagement signal volume)
- Propensity model inputs: Balance, age of debt, number of prior placements, region, contact info completeness, past payment behavior, engagement signals
- Activation benchmarks: Liquidation ≥ 2.5%, Contact Rate ≥ 40%, Kept-PTP ≥ 70%
- Alert threshold: Flag when any cohort drops 15%+ below its target for 3+ consecutive days
- Reporting cadence: Daily internal summary, weekly client-facing report
- Skip tracing vendor: Configured per client (TLO, LexisNexis, etc.)

---

#### Screen 4: Team Lead Agent (Individual Agent View)

**Header:** Team Lead — Campaign Strategy & Optimization
**Description:** "Designs and optimizes the campaign strategy per cohort — which channels, what content, what offers and schemes, what cadence, what timing. Reviews Analyst's performance data daily and recommends adjustments to maximize outcomes within compliance guardrails. Owns the 3C framework: Channel, Content, Cadence."

**Skills section:**
- Campaign calendar design (channel + content + cadence per cohort)
- Content creation and A/B variant design (message variants by debt type, tone, language)
- Offer and scheme design (settlement percentages, payment plans, hardship programs)
- Cadence optimization (timing, frequency, day-of-week patterns)
- Strategy change recommendation (based on Analyst's performance signals)
- Cross-channel coordination (ensuring channels don't conflict — e.g., don't call someone who just received SMS 10 min ago)
- Next-best-action logic (what to do after a consumer engages, ignores, or refuses)

**Current Campaign Calendar:**
| Cohort | Voice AI | Human Agent | SMS | Email |
|---|---|---|---|---|
| High Prop / Low Bal | — | — | 3x/week | 2x/week |
| High Prop / High Bal | 5x/week | On escalation | 2x/week | 1x/week |
| Medium Prop | 3x/week | 2x/week | 3x/week | 2x/week |
| Low Prop / Low Bal | — | — | — | 1x/month |
| Low Prop / High Bal | 1x/week | 5x/week | 1x/week | 1x/week |

**Active Content Variants:**
- Voice AI: English general, English empathetic (medical debt), Spanish
- SMS: Payment reminder, Settlement offer (15% discount), PTP follow-up
- Email: Intro sequence, Follow-up sequence, Final notice

**Strategy Change Log:**
Each with date, what changed, why (data trigger), and observed impact:
- Day 3: Shifted medical debt cohort from voice-first to SMS-first. Trigger: voice connect rate 18%, SMS open rate 41%. Impact: contact rate on medical cohort improved from 22% to 34%.
- Day 8: Added Spanish-language SMS for TX/FL cohort. Trigger: identified 22% Spanish-preference accounts. Impact: +8% response rate on targeted accounts.
- Day 12: Increased voice AI on high-prop/high-bal from 3x to 5x/week. Trigger: compliance allows 7x, conservative start left room. Impact: contact rate improved from 44% to 52%.
- Day 15: Reallocated 2 agents from low-prop to medium-prop. Trigger: Analyst flagged diminishing returns. Impact: monitoring (too early for full impact).
- Day 17: Introduced settlement offer SMS for 2+ failed PTP accounts. Trigger: 620 accounts with broken promises. Impact: monitoring.

**Configuration / SOP section:**
- Max daily attempts per account: 7 (FDCPA/TCPA)
- Client-imposed cap: 5 (conservative start)
- Restricted hours: Before 8am / After 9pm local time
- Weekend calling: Saturdays only, 9am-5pm
- SMS opt-out honored within 1 hour
- Content approval: All new message templates require Compliance agent review before launch
- Cross-channel gap: Minimum 2 hours between different channel touches on same account
- Settlement authority: Up to 20% discount pre-approved; above 20% requires client approval

---

#### Screen 5: Compliance Agent (Individual Agent View)

**Header:** Compliance — Regulatory & Guardrails
**Description:** "Ensures every consumer interaction meets regulatory requirements (FDCPA, TCPA, state-specific rules) and client brand guidelines. Sets pre-launch guardrails for Team Lead's campaign design. Audits live conversations across all channels. Flags potential violations, generates compliance reports for client examiners."

**Skills section:**
- Pre-launch content review (message templates, scripts, offer terms)
- Pre-launch guardrail configuration (state rules, attempt limits, channel restrictions)
- Conversation audit (voice calls, SMS threads, email sequences)
- FDCPA compliance check (mini-Miranda, harassment, false representation, unfair practices)
- TCPA compliance check (calling hours, consent, do-not-call)
- State-specific rule enforcement (NY, TX, CA, FL and others)
- Compliance report generation (for client compliance teams and examiners)
- Corrective action tracking (flag → investigate → resolve → document)

**This Week's Summary:**
- Conversations audited: 2,847
- Flags raised: 4 (3 FDCPA, 1 TCPA)
- Flags resolved: 4/4 (100%)
- Average resolution time: 18 hours
- Overall compliance score: 99.86%

**Flagged Issues Detail:**
| # | Type | Description | Channel | Agent Type | Status | Corrective Action |
|---|---|---|---|---|---|---|
| 1 | FDCPA | Mini-Miranda not stated within 30 seconds | Voice | Human | Resolved | Agent retrained, call script updated |
| 2 | FDCPA | Mini-Miranda not stated within 30 seconds | Voice | Human | Resolved | Same agent, second occurrence — formal warning issued |
| 3 | FDCPA | Incorrect balance quoted to consumer | Voice | Human | Resolved | Data sync issue identified, fix deployed |
| 4 | TCPA | Call placed at 8:47 PM EST to NY consumer (after 8 PM NY rule) | Voice | AI | Resolved | Timezone mapping corrected for NY accounts |

**Configuration / SOP section:**
- Audit coverage: 100% of voice AI calls, 100% of human agent calls (first 2 weeks), 30% random sample after Week 2
- Flag severity levels: Critical (potential lawsuit risk), Warning (process gap), Info (coaching opportunity)
- Auto-escalation: Critical flags auto-escalated to E2E function head and client compliance contact
- State rules loaded: NY, TX, CA, FL, IL, PA, OH, GA (top 8 states by account volume)
- Regulations enforced: FDCPA, TCPA, Reg F, state-specific collection laws
- Client-specific rules: No voicemail drops on medical debt, all settlement offers require "this is an attempt to collect a debt" disclosure

---

#### Screen 6: Coach Agent (Individual Agent View)

**Header:** Coach — Quality & Training
**Description:** "Audits conversation quality — separate from compliance, focused on effectiveness, tone, and resolution skill. Scores human agents and AI bots. Identifies coaching opportunities, runs calibration sessions, designs refresher training. Tracks quality trends to ensure the team continuously improves."

**Skills section:**
- Conversation quality scoring (tone, professionalism, empathy, accuracy, resolution effectiveness)
- Agent-level performance profiling (strengths, weaknesses, trend over time)
- Coaching opportunity identification (specific skills or scenarios needing improvement)
- Calibration session design and scheduling
- Training content creation (objection handling scripts, scenario role-plays)
- AI bot quality audit (are bot conversations effective? where do they fail?)
- Quality trend tracking (week-over-week quality score movement)

**This Week's Summary:**
- Human agent calls scored: 142
- AI bot conversations scored: 480
- Human agent average quality: 87/100
- AI bot average quality: 92/100
- Coaching flags raised: 3 agents on "I already paid this" objection handling
- Calibration sessions completed: 1 (medical debt sensitivity)
- Training compliance: 6/6 agents current on Q1 refresher

**Agent Scoreboard:**
| Agent | Quality Score | Trend | Top Strength | Coaching Need |
|---|---|---|---|---|
| Agent 1 | 91 | ↑ | Empathy & rapport | — |
| Agent 2 | 89 | → | Payment plan negotiation | Call pacing (rushes close) |
| Agent 3 | 88 | ↑ | Objection handling | — |
| Agent 4 | 86 | ↓ | Technical accuracy | "Already paid" objection |
| Agent 5 | 84 | → | Persistence | Empathy on medical debt |
| Agent 6 | 82 | ↓ | Call control | "Already paid" objection, mini-Miranda timing |

**Upcoming Actions:**
- Friday: Calibration session — "I already paid this" objection handling (Agents 4, 5, 6)
- Next Monday: Medical debt sensitivity refresher (all agents)
- Next Wednesday: AI bot review — settlement offer conversation flow (are bots effectively explaining terms?)

**Configuration / SOP section:**
- Scoring rubric: 10 dimensions, weighted (empathy 15%, accuracy 15%, compliance 20%, resolution 20%, tone 10%, pace 5%, call control 5%, disclosure 5%, follow-up 2.5%, documentation 2.5%)
- Minimum quality threshold: 80/100 (below = mandatory coaching within 48 hours)
- Calibration frequency: Weekly during hypercare, biweekly during steady-state
- AI bot review: Weekly during hypercare (focus on conversation drop-off points)

---

#### Screen 7: Collector Agent (Individual Agent View)

**Header:** Collector — Multichannel Execution
**Description:** "The operational nerve center. Manages all active campaign delivery across channels — Voice AI bots, human agent queues, SMS sends, email sequences, WhatsApp. Handles inbound (payment bots, live transfers, email/website collections). Coordinates with human agent operations (1st party collections). Tracks delivery metrics in real time and ensures campaigns run on schedule within compliance windows."

**Skills section:**
- Campaign launch and scheduling
- Multi-channel delivery management (Voice AI, Human Agents, SMS, Email, WhatsApp)
- Bot management (which bot variant for which cohort, bot health monitoring)
- Agent queue management (account assignment, workload balancing, escalation routing)
- Inbound handling (payment bot, live transfers for disputes/hardship, email/website intake)
- Real-time delivery tracking (attempts, connections, sends, opens, clicks, replies)
- Delivery failure handling (bounced emails, invalid numbers, opt-outs, DNC)
- Human agent coordination (1st party collections via Mulberry — experienced collectors, accent neutralization)

**Active Campaigns:**
| Campaign | Channel | Cohort | Daily Volume | Status |
|---|---|---|---|---|
| Voice AI - English General | Voice | Med Prop + High Prop/High Bal | 800 calls | ✅ Running |
| Voice AI - English Empathetic | Voice | Medical debt subset | 200 calls | ✅ Running |
| Voice AI - Spanish | Voice | TX/FL Spanish-pref | 200 calls | ✅ Running |
| Human Outbound | Voice | Low Prop/High Bal + Escalations | 270 calls | ✅ Running |
| SMS - Payment Reminder | SMS | High Prop/Low Bal + Med Prop | 500 sends | ✅ Running |
| SMS - Settlement Offer | SMS | 2+ failed PTP accounts | 180 sends | ✅ Running |
| SMS - PTP Follow-up | SMS | Accounts with active PTP | 120 sends | ✅ Running |
| Email - Intro Sequence | Email | All new accounts (Week 1) | 200 sends | ✅ Running |
| Email - Follow-up | Email | Engaged but unpaid | 400 sends | ✅ Running |

**Inbound Operations:**
- Payment Bot: 85 inbound payment calls handled today (avg 4 min, 78% completion rate)
- Live Transfers: 12 disputes, 8 hardship requests routed to senior agents
- Email/Website: 34 inbound emails processed, 18 payment portal visits

**Today's Delivery Summary:**
- Total touchpoints: 2,870 (across all channels)
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
- Inbound routing: Payment queries → Bot, Disputes → Senior agent, Hardship → Senior agent
- 1st Party (Mulberry) coordination: Daily placement sync, shared disposition codes, unified reporting

---

#### Screen 8: Portfolio Deep Dive

A more detailed view of the portfolio. Shows Analyst's modeling output and how accounts flow through the system.

**Top section — Portfolio Overview:**
- Total accounts: 12,000
- Clean accounts: 11,847
- Data issues: 153 (missing contact info — skip tracing in progress)
- Total portfolio value: $33.6M
- Debt types: Credit Card (42%), Personal Loan (28%), Medical (30%)
- Top states: TX (18%), FL (15%), CA (14%), NY (12%), IL (8%)
- Average age since charge-off: 14 months
- Prior placements: Primary (45%), Secondary (35%), Tertiary (20%)

**Cohort Visualization:**
A visual representation (table or simple bar chart) of the 5 cohorts showing:
- Account count
- Total value
- Strategy assigned
- Current liquidation rate per cohort
- Week-over-week trend

**Account Flow (conceptual):**
Show how accounts move through the system:
```
New Placement → Analyst (clean, enrich, model) → Cohorts Created
  → Team Lead (set strategy per cohort) → Campaign Calendar
    → Collector (execute across channels) → Consumer Interactions
      → Analyst (track outcomes, re-score) → Strategy Adjustments
        → Compliance (audit) + Coach (score quality) → Continuous Improvement
```
- Accounts can move between cohorts (e.g., Analyst re-scored 340 from Low → Medium based on engagement)
- Inbound interactions feed back into the loop (consumer called back → update disposition → Analyst incorporates)

**Contact Info Coverage:**
| Channel | Coverage | Notes |
|---|---|---|
| Phone (Cell) | 72% | Primary channel for voice AI |
| Phone (Landline) | 41% | Lower priority, used for human agents |
| Email | 58% | Skip tracing added 12% coverage since Day 1 |
| SMS-eligible (cell + consent) | 68% | Subset of cell phone with TCPA consent |

---

## Design Notes

- Use a **sidebar navigation** with icons for each screen (Command Center, Agent Team, Analyst, Team Lead, Compliance, Coach, Collector, Portfolio)
- Use a **dark theme** (dark gray/navy background, white/light text) — the team uses dark tools and this signals "internal platform"
- Each agent should have a **distinct accent color** so they're visually distinguishable in the activity feed and cards:
  - Analyst: Blue
  - Team Lead: Purple
  - Compliance: Red/Orange
  - Coach: Teal/Cyan
  - Collector: Amber/Yellow
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
2. See how each agent maps to real work happening today (and the real work pipeline: Context Collection → Campaign Setup → Multichannel AI Delivery → Performance Tuning)
3. Feel that this framing (agentic platform) is a credible and differentiated product direction
4. Be able to point at specific screens and say "yes, this is what we do" or "no, this should be different"
5. Start thinking about which agents to build first as real product

---

## File Structure

This should be a single React file (`.jsx`) or minimal file structure. All mock data should be embedded in the file. No external dependencies beyond React and Tailwind. The prototype should render as a single-page app with tab-based navigation between screens.

If the file gets too large for a single component, split into:
```
/src
  App.jsx          — Main app with sidebar navigation
  data.js          — All mock data (cohorts, KPIs, agent activity, campaigns, flags, quality scores)
  CommandCenter.jsx
  AgentTeam.jsx
  AnalystAgent.jsx
  TeamLeadAgent.jsx
  ComplianceAgent.jsx
  CoachAgent.jsx
  CollectorAgent.jsx
  Portfolio.jsx
```

Keep it simple. This is a prototype.
