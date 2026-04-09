// Mock data for Skit.ai Agentic Collections Platform Prototype

export const portfolioSnapshot = {
  clientName: "Apex Recovery Partners",
  totalAccounts: 12000,
  portfolioValue: "$33.6M",
  liquidationRate: 2.7,
  liquidationTarget: 2.5,
  trend: "up",
  phase: "Hypercare — Week 3",
  daysSinceGoLive: 18
};

export const cohorts = [
  {
    name: "High propensity / Low balance",
    accounts: 2400,
    avgBalance: "$1,200",
    propensity: "High",
    strategy: "Digital-only (SMS + Email)",
    liquidation: 4.1,
    contactRate: 48,
    rpcRate: 35,
    ptpRate: 15,
    status: "above"
  },
  {
    name: "High propensity / High balance",
    accounts: 1800,
    avgBalance: "$4,500",
    propensity: "High",
    strategy: "Voice AI → Human agent escalation",
    liquidation: 3.8,
    contactRate: 52,
    rpcRate: 38,
    ptpRate: 18,
    status: "above"
  },
  {
    name: "Medium propensity / All balances",
    accounts: 4200,
    avgBalance: "$2,600",
    propensity: "Medium",
    strategy: "Multi-channel blitz (all channels)",
    liquidation: 2.2,
    contactRate: 36,
    rpcRate: 26,
    ptpRate: 11,
    status: "below"
  },
  {
    name: "Low propensity / Low balance",
    accounts: 2100,
    avgBalance: "$900",
    propensity: "Low",
    strategy: "Low-touch digital (email only, monthly)",
    liquidation: 0.4,
    contactRate: 12,
    rpcRate: 8,
    ptpRate: 3,
    status: "expected"
  },
  {
    name: "Low propensity / High balance",
    accounts: 1500,
    avgBalance: "$5,200",
    propensity: "Low",
    strategy: "Human agent priority (skip-traced, intensive)",
    liquidation: 1.9,
    contactRate: 28,
    rpcRate: 22,
    ptpRate: 8,
    status: "below"
  }
];

export const weeklyKPIs = {
  headers: ["Metric", "Week 1", "Week 2", "Week 3", "Target"],
  rows: [
    ["Liquidation Rate", "1.8%", "2.3%", "2.7%", "2.5%"],
    ["Contact Rate", "31%", "35%", "38%", "40%"],
    ["RPC Rate", "22%", "25%", "28%", "30%"],
    ["PTP Rate", "8%", "10%", "12%", "12%"],
    ["Kept-PTP", "62%", "65%", "68%", "70%"],
    ["Resolution Rate", "1.8%", "3.9%", "6.2%", "—"],
    ["Compliance Score", "99.91%", "99.88%", "99.86%", "99.5%"]
  ]
};

export const agentActivityFeed = [
  {
    agent: "Manager",
    color: "purple",
    action: "Recommended increasing SMS cadence on Medium Propensity cohort from 2x/week to 3x/week based on 34% open-rate trend.",
    time: "2 hours ago"
  },
  {
    agent: "Auditor",
    color: "red",
    action: "Audited 412 conversations today. 1 flag: potential time-zone violation on NY account. Escalated to QA lead.",
    time: "4 hours ago"
  },
  {
    agent: "Analyst",
    color: "blue",
    action: "Week 3 liquidation rate hit 2.7%, crossing the 2.5% activation target. High-propensity cohorts driving 60% of collections.",
    time: "6 hours ago"
  },
  {
    agent: "Coach",
    color: "teal",
    action: "Scored 18 human agent calls. 3 agents below threshold on 'I already paid' objection handling. Calibration session scheduled Friday.",
    time: "8 hours ago"
  },
  {
    agent: "Analyst",
    color: "blue",
    action: "Re-scored 340 accounts from Low Propensity to Medium Propensity based on recent engagement signals (SMS clicks + email opens).",
    time: "1 day ago"
  },
  {
    agent: "Collector",
    color: "amber",
    action: "Launched Spanish SMS campaign for TX/FL cohort. 180 accounts targeted in first batch.",
    time: "1 day ago"
  },
  {
    agent: "Manager",
    color: "purple",
    action: "Introduced settlement offer SMS for accounts with 2+ failed PTP. 15% discount, targeting 620 accounts.",
    time: "1 day ago"
  }
];

export const agents = [
  {
    name: "Manager",
    role: "Campaign Strategy & Optimization",
    color: "purple",
    description: "Designs campaign strategy per cohort and adjusts based on performance data.",
    keyMetric: "5 strategy changes this week",
    lastAction: "Introduced settlement offer SMS for accounts with 2+ failed PTP.",
    status: "Active"
  },
  {
    name: "Analyst",
    role: "Context, Modeling & Performance",
    color: "blue",
    description: "Analyzes portfolios, creates cohorts, tracks performance, and feeds signals back into strategy.",
    keyMetric: "2.7% liquidation rate (↑ from 1.8% Week 1)",
    lastAction: "Re-scored 340 accounts from Low → Medium propensity based on engagement signals.",
    status: "Active"
  },
  {
    name: "Collector",
    role: "Multichannel Execution",
    color: "amber",
    description: "Manages all campaign delivery — AI and human, outbound and inbound, across all channels.",
    keyMetric: "9 active campaigns, 2,870 daily touchpoints",
    lastAction: "Launched Spanish SMS campaign for TX/FL cohort.",
    status: "Active"
  },
  {
    name: "Coach",
    role: "Quality & Training",
    color: "teal",
    description: "Scores conversation quality, identifies coaching opportunities, runs agent training.",
    keyMetric: "87/100 avg agent quality score",
    lastAction: "3 agents below threshold on objection handling. Calibration session scheduled.",
    status: "Active"
  },
  {
    name: "Auditor",
    role: "Regulatory & Guardrails",
    color: "red",
    description: "Audits conversations for regulatory compliance and maintains pre-launch guardrails.",
    keyMetric: "99.86% compliance score",
    lastAction: "Flagged 1 potential TCPA time-zone violation on NY account.",
    status: "Active"
  },
  {
    name: "Upsell Opportunity",
    role: "Growth & Client Expansion",
    color: "emerald",
    description: "Identifies segments outperforming benchmarks and drafts upsell cases for clients. Turns the platform from a collection tool into a growth tool.",
    keyMetric: "3 upsell signals active, $205K projected",
    lastAction: "Auto-finance <$3K cohort crossed 4% liquidation. Upsell brief drafted.",
    status: "Active"
  },
  {
    name: "Tracer",
    role: "Skip Trace & Contact Recovery",
    color: "indigo",
    description: "Continuously skip-traces unreachable accounts, refreshes stale contact data, and tracks collections from accounts the client could never have worked.",
    keyMetric: "$127K from previously unreachable accounts",
    lastAction: "340 of 1,200 unreachable accounts now have fresh contact info. 6 converted ($18,400).",
    status: "Active"
  }
];

// Analyst Agent Data
export const analystData = {
  skills: [
    "Portfolio intake and data cleaning",
    "Skip tracing (contact enrichment — phone, email, address)",
    "Cohort creation (by balance, age, region, debt type, prior placements, contact completeness)",
    "Propensity scoring (payer likelihood based on demographic + behavioral signals)",
    "Channel allocation recommendation (digital vs. human per cohort)",
    "KPI tracking (liquidation, contact rate, RPC, PTP, kept-PTP, resolution rate, agent productivity)",
    "Benchmark comparison (current vs. activation targets vs. similar portfolio baselines)",
    "Cohort-level performance breakdown",
    "Underperformance alerting (flags cohorts falling below threshold)",
    "Reallocation recommendation (shift accounts/agents between cohorts based on ROI)",
    "Re-scoring on engagement signals (adjusts cohorts as new data comes in)",
    "Feedback loop to Team Lead (triggers strategy change recommendations)"
  ],
  alerts: [
    {
      message: "Medium Propensity cohort contact rate plateauing at 36%. Recommend adding morning SMS nudge before voice AI attempt to improve pickup rates.",
      day: 17
    },
    {
      message: "Low Prop / High Bal showing diminishing returns on human agent time. ROI per agent-hour dropped 22% from Week 2 to Week 3. Consider reducing from 5x/week to 3x/week and reallocating 1 agent to Medium Propensity.",
      day: 16
    },
    {
      message: "Week 3 liquidation crossed activation target (2.7% vs 2.5%). Recommend preparing Activation Review materials for client.",
      day: 18
    }
  ],
  activityLog: [
    { day: 18, action: "Re-scored 340 accounts from Low → Medium propensity based on SMS click + email open engagement." },
    { day: 18, action: "Published Week 3 performance summary. Liquidation at 2.7%, above 2.5% activation target." },
    { day: 14, action: "Initial portfolio model created. 5 cohorts defined. Shared with Team Lead for campaign planning." },
    { day: 1, action: "Received placement file (12,000 accounts). Completed intake validation and data cleaning. 11,847 accounts clean, 153 flagged for data issues. Skip tracing initiated on accounts with missing contact info." }
  ],
  configuration: [
    "Minimum cohort size: 200 accounts",
    "Re-scoring frequency: Weekly (or on significant engagement signal volume)",
    "Propensity model inputs: Balance, age of debt, number of prior placements, region, contact info completeness, past payment behavior, engagement signals",
    "Activation benchmarks: Liquidation ≥ 2.5%, Contact Rate ≥ 40%, Kept-PTP ≥ 70%",
    "Alert threshold: Flag when any cohort drops 15%+ below its target for 3+ consecutive days",
    "Reporting cadence: Daily internal summary, weekly client-facing report",
    "Skip tracing vendor: Configured per client (TLO, LexisNexis, etc.)"
  ]
};

// Team Lead Agent Data
export const teamLeadData = {
  skills: [
    "Campaign calendar design (channel + content + cadence per cohort)",
    "Content creation and A/B variant design (message variants by debt type, tone, language)",
    "Offer and scheme design (settlement percentages, payment plans, hardship programs)",
    "Cadence optimization (timing, frequency, day-of-week patterns)",
    "Strategy change recommendation (based on Analyst's performance signals)",
    "Cross-channel coordination (ensuring channels don't conflict)",
    "Next-best-action logic (what to do after a consumer engages, ignores, or refuses)"
  ],
  campaignCalendar: [
    { cohort: "High Prop / Low Bal", voiceAI: "—", humanAgent: "—", sms: "3x/week", email: "2x/week" },
    { cohort: "High Prop / High Bal", voiceAI: "5x/week", humanAgent: "On escalation", sms: "2x/week", email: "1x/week" },
    { cohort: "Medium Prop", voiceAI: "3x/week", humanAgent: "2x/week", sms: "3x/week", email: "2x/week" },
    { cohort: "Low Prop / Low Bal", voiceAI: "—", humanAgent: "—", sms: "—", email: "1x/month" },
    { cohort: "Low Prop / High Bal", voiceAI: "1x/week", humanAgent: "5x/week", sms: "1x/week", email: "1x/week" }
  ],
  contentVariants: [
    "Voice AI: English general, English empathetic (medical debt), Spanish",
    "SMS: Payment reminder, Settlement offer (15% discount), PTP follow-up",
    "Email: Intro sequence, Follow-up sequence, Final notice"
  ],
  strategyChanges: [
    {
      day: 3,
      change: "Shifted medical debt cohort from voice-first to SMS-first",
      trigger: "Voice connect rate 18%, SMS open rate 41%",
      impact: "Contact rate on medical cohort improved from 22% to 34%"
    },
    {
      day: 8,
      change: "Added Spanish-language SMS for TX/FL cohort",
      trigger: "Identified 22% Spanish-preference accounts",
      impact: "+8% response rate on targeted accounts"
    },
    {
      day: 12,
      change: "Increased voice AI on high-prop/high-bal from 3x to 5x/week",
      trigger: "Compliance allows 7x, conservative start left room",
      impact: "Contact rate improved from 44% to 52%"
    },
    {
      day: 15,
      change: "Reallocated 2 agents from low-prop to medium-prop",
      trigger: "Analyst flagged diminishing returns",
      impact: "Monitoring (too early for full impact)"
    },
    {
      day: 17,
      change: "Introduced settlement offer SMS for 2+ failed PTP accounts",
      trigger: "620 accounts with broken promises",
      impact: "Monitoring"
    }
  ],
  configuration: [
    "Max daily attempts per account: 7 (FDCPA/TCPA)",
    "Client-imposed cap: 5 (conservative start)",
    "Restricted hours: Before 8am / After 9pm local time",
    "Weekend calling: Saturdays only, 9am-5pm",
    "SMS opt-out honored within 1 hour",
    "Content approval: All new message templates require Compliance agent review before launch",
    "Cross-channel gap: Minimum 2 hours between different channel touches on same account",
    "Settlement authority: Up to 20% discount pre-approved; above 20% requires client approval"
  ]
};

// Compliance Agent Data
export const complianceData = {
  skills: [
    "Pre-launch content review (message templates, scripts, offer terms)",
    "Pre-launch guardrail configuration (state rules, attempt limits, channel restrictions)",
    "Conversation audit (voice calls, SMS threads, email sequences)",
    "FDCPA compliance check (mini-Miranda, harassment, false representation, unfair practices)",
    "TCPA compliance check (calling hours, consent, do-not-call)",
    "State-specific rule enforcement (NY, TX, CA, FL and others)",
    "Compliance report generation (for client compliance teams and examiners)",
    "Corrective action tracking (flag → investigate → resolve → document)"
  ],
  weekSummary: {
    audited: 2847,
    flagsRaised: 4,
    flagsResolved: 4,
    avgResolutionTime: "18 hours",
    complianceScore: 99.86
  },
  flags: [
    {
      id: 1,
      type: "FDCPA",
      description: "Mini-Miranda not stated within 30 seconds",
      channel: "Voice",
      agentType: "Human",
      status: "Resolved",
      action: "Agent retrained, call script updated"
    },
    {
      id: 2,
      type: "FDCPA",
      description: "Mini-Miranda not stated within 30 seconds",
      channel: "Voice",
      agentType: "Human",
      status: "Resolved",
      action: "Same agent, second occurrence — formal warning issued"
    },
    {
      id: 3,
      type: "FDCPA",
      description: "Incorrect balance quoted to consumer",
      channel: "Voice",
      agentType: "Human",
      status: "Resolved",
      action: "Data sync issue identified, fix deployed"
    },
    {
      id: 4,
      type: "TCPA",
      description: "Call placed at 8:47 PM EST to NY consumer (after 8 PM NY rule)",
      channel: "Voice",
      agentType: "AI",
      status: "Resolved",
      action: "Timezone mapping corrected for NY accounts"
    }
  ],
  configuration: [
    "Audit coverage: 100% of voice AI calls, 100% of human agent calls (first 2 weeks), 30% random sample after Week 2",
    "Flag severity levels: Critical (potential lawsuit risk), Warning (process gap), Info (coaching opportunity)",
    "Auto-escalation: Critical flags auto-escalated to E2E function head and client compliance contact",
    "State rules loaded: NY, TX, CA, FL, IL, PA, OH, GA (top 8 states by account volume)",
    "Regulations enforced: FDCPA, TCPA, Reg F, state-specific collection laws",
    "Client-specific rules: No voicemail drops on medical debt, all settlement offers require 'this is an attempt to collect a debt' disclosure"
  ]
};

// Coach Agent Data
export const coachData = {
  skills: [
    "Conversation quality scoring (tone, professionalism, empathy, accuracy, resolution effectiveness)",
    "Agent-level performance profiling (strengths, weaknesses, trend over time)",
    "Coaching opportunity identification (specific skills or scenarios needing improvement)",
    "Calibration session design and scheduling",
    "Training content creation (objection handling scripts, scenario role-plays)",
    "AI bot quality audit (are bot conversations effective? where do they fail?)",
    "Quality trend tracking (week-over-week quality score movement)"
  ],
  weekSummary: {
    humanCallsScored: 142,
    aiConversationsScored: 480,
    humanAvgQuality: 87,
    aiAvgQuality: 92,
    coachingFlags: "3 agents on 'I already paid this' objection handling",
    calibrationCompleted: "1 (medical debt sensitivity)",
    trainingCompliance: "6/6 agents current on Q1 refresher"
  },
  agentScoreboard: [
    { agent: "Agent 1", score: 91, trend: "up", strength: "Empathy & rapport", need: "—" },
    { agent: "Agent 2", score: 89, trend: "stable", strength: "Payment plan negotiation", need: "Call pacing (rushes close)" },
    { agent: "Agent 3", score: 88, trend: "up", strength: "Objection handling", need: "—" },
    { agent: "Agent 4", score: 86, trend: "down", strength: "Technical accuracy", need: "'Already paid' objection" },
    { agent: "Agent 5", score: 84, trend: "stable", strength: "Persistence", need: "Empathy on medical debt" },
    { agent: "Agent 6", score: 82, trend: "down", strength: "Call control", need: "'Already paid' objection, mini-Miranda timing" }
  ],
  upcomingActions: [
    "Friday: Calibration session — 'I already paid this' objection handling (Agents 4, 5, 6)",
    "Next Monday: Medical debt sensitivity refresher (all agents)",
    "Next Wednesday: AI bot review — settlement offer conversation flow (are bots effectively explaining terms?)"
  ],
  configuration: [
    "Scoring rubric: 10 dimensions, weighted (empathy 15%, accuracy 15%, compliance 20%, resolution 20%, tone 10%, pace 5%, call control 5%, disclosure 5%, follow-up 2.5%, documentation 2.5%)",
    "Minimum quality threshold: 80/100 (below = mandatory coaching within 48 hours)",
    "Calibration frequency: Weekly during hypercare, biweekly during steady-state",
    "AI bot review: Weekly during hypercare (focus on conversation drop-off points)"
  ]
};

// Collector Agent Data
export const collectorData = {
  skills: [
    "Campaign launch and scheduling",
    "Multi-channel delivery management (Voice AI, Human Agents, SMS, Email, WhatsApp)",
    "Bot management (which bot variant for which cohort, bot health monitoring)",
    "Agent queue management (account assignment, workload balancing, escalation routing)",
    "Inbound handling (payment bot, live transfers for disputes/hardship, email/website intake)",
    "Real-time delivery tracking (attempts, connections, sends, opens, clicks, replies)",
    "Delivery failure handling (bounced emails, invalid numbers, opt-outs, DNC)",
    "Human agent coordination (1st party collections via Mulberry — experienced collectors, accent neutralization)",
    "PTP adherence monitoring and automated follow-up orchestration"
  ],
  inboundMetrics: {
    totalIBCalls: 85,
    avgCallDuration: '4 min',
    completionRate: 78,
    disputes: 12,
    hardship: 8,
    paymentPortalVisits: 18,
    inboundEmails: 34,
    ibConversionRate: 42,
  },
  rpcMetrics: {
    overall: 28,
    target: 30,
    byChannel: {
      voiceAI: 38,
      humanAgent: 55,
      sms: 'N/A',
    },
    byCohort: {
      'High Prop/High Bal': 38,
      'High Prop/Low Bal': 32,
      'Medium Prop': 26,
      'Low Prop/High Bal': 22,
      'Low Prop/Low Bal': 8,
    }
  },
  ptpMetrics: {
    activePTPs: 620,
    ptpRate: 12,
    adherenceRate: 68,
    adherenceTarget: 70,
    keptThisWeek: 422,
    brokenThisWeek: 198,
    adherenceActions: [
      { action: 'Sent PTP reminder SMS 24h before due date', accounts: 620, outcome: '34 confirmed payment', status: 'completed' },
      { action: 'Voice AI follow-up call on Day 1 of missed PTP', accounts: 198, outcome: '47 re-committed to new date', status: 'completed' },
      { action: 'Escalated repeat PTP-breakers to human agent queue', accounts: 89, outcome: '12 settled, 8 on hardship plan', status: 'in_progress' },
      { action: 'Settlement SMS to accounts with 2+ broken PTPs', accounts: 62, outcome: 'Monitoring — 8% conversion projected', status: 'pending' },
    ]
  },
  activeCampaigns: [
    { name: "Voice AI - English General", channel: "Voice", cohort: "Med Prop + High Prop/High Bal", volume: "800 calls", status: "Running" },
    { name: "Voice AI - English Empathetic", channel: "Voice", cohort: "Medical debt subset", volume: "200 calls", status: "Running" },
    { name: "Voice AI - Spanish", channel: "Voice", cohort: "TX/FL Spanish-pref", volume: "200 calls", status: "Running" },
    { name: "Human Outbound", channel: "Voice", cohort: "Low Prop/High Bal + Escalations", volume: "270 calls", status: "Running" },
    { name: "SMS - Payment Reminder", channel: "SMS", cohort: "High Prop/Low Bal + Med Prop", volume: "500 sends", status: "Running" },
    { name: "SMS - Settlement Offer", channel: "SMS", cohort: "2+ failed PTP accounts", volume: "180 sends", status: "Running" },
    { name: "SMS - PTP Follow-up", channel: "SMS", cohort: "Accounts with active PTP", volume: "120 sends", status: "Running" },
    { name: "Email - Intro Sequence", channel: "Email", cohort: "All new accounts (Week 1)", volume: "200 sends", status: "Running" },
    { name: "Email - Follow-up", channel: "Email", cohort: "Engaged but unpaid", volume: "400 sends", status: "Running" }
  ],
  inboundOps: [
    "Payment Bot: 85 inbound payment calls handled today (avg 4 min, 78% completion rate)",
    "Live Transfers: 12 disputes, 8 hardship requests routed to senior agents",
    "Email/Website: 34 inbound emails processed, 18 payment portal visits"
  ],
  todayDelivery: {
    totalTouchpoints: 2870,
    voiceAI: { calls: 1200, connections: 456, rate: 38 },
    humanAgents: { calls: 270, connections: 148, rate: 55 },
    sms: { sends: 800, opens: 328, openRate: 41, clicks: 52, clickRate: 6.5 },
    email: { sends: 600, opens: 138, openRate: 23, clicks: 24, clickRate: 4 }
  },
  configuration: [
    "Campaign hours: Mon-Fri 8am-9pm local, Sat 9am-5pm local",
    "Max concurrent voice campaigns per account: 1 (no overlapping calls)",
    "SMS-to-voice gap: Minimum 2 hours between SMS send and voice attempt on same account",
    "Delivery retry logic: Failed calls retried next business day, bounced emails removed after 2 bounces",
    "Human agent assignment: Round-robin within cohort, priority escalations override",
    "Inbound routing: Payment queries → Bot, Disputes → Senior agent, Hardship → Senior agent",
    "1st Party (Mulberry) coordination: Daily placement sync, shared disposition codes, unified reporting"
  ]
};

// Portfolio Deep Dive Data
export const portfolioData = {
  overview: {
    totalAccounts: 12000,
    cleanAccounts: 11847,
    dataIssues: 153,
    portfolioValue: "$33.6M",
    debtTypes: "Credit Card (42%), Personal Loan (28%), Medical (30%)",
    topStates: "TX (18%), FL (15%), CA (14%), NY (12%), IL (8%)",
    avgAgeSinceChargeOff: "14 months",
    priorPlacements: "Primary (45%), Secondary (35%), Tertiary (20%)"
  },
  contactCoverage: [
    { channel: "Phone (Cell)", coverage: "72%", notes: "Primary channel for voice AI" },
    { channel: "Phone (Landline)", coverage: "41%", notes: "Lower priority, used for human agents" },
    { channel: "Email", coverage: "58%", notes: "Skip tracing added 12% coverage since Day 1" },
    { channel: "SMS-eligible (cell + consent)", coverage: "68%", notes: "Subset of cell phone with TCPA consent" }
  ]
};
