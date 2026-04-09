import { useState } from 'react';

// ── Agent data ───────────────────────────────────────────────────────────────

const agentColorMap = {
  Manager: '#8b5cf6', Scrubber: '#10b981', Tracer: '#6366f1', Analyst: '#3b82f6',
  Collector: '#f59e0b', Auditor: '#ef4444', Coach: '#06b6d4',
};

const agentIconMap = {
  Manager: '🎯', Scrubber: '🧹', Tracer: '🔍', Analyst: '📊',
  Collector: '📞', Auditor: '🛡️', Coach: '🎓',
};

const agentCategoryMap = {
  Manager: 'Orchestration · Supervisor',
  Scrubber: 'Compliance · Pre-filter',
  Tracer: 'Data · Enrichment',
  Analyst: 'Intelligence · Segmentation',
  Collector: 'Outreach · Negotiation',
  Auditor: 'Regulatory · Guardrails',
  Coach: 'Quality · Improvement',
};

const agentStatusMap = {
  Manager: 'Active', Scrubber: 'Active', Tracer: 'Active', Analyst: 'Active',
  Collector: 'Busy', Auditor: 'Active', Coach: 'Idle',
};

const agentMetrics = {
  Manager:   [{ label: 'Agents managed', value: '7' }, { label: 'Accounts routed', value: '4,280' }, { label: 'Decision accuracy', value: '94%' }],
  Scrubber:  [{ label: 'Accounts scrubbed', value: '11,847' }, { label: 'Suppressed today', value: '312' }, { label: 'Pass rate', value: '97.4%' }],
  Tracer:    [{ label: 'Profiles enriched', value: '1,312' }, { label: 'Contact hit rate', value: '71%' }, { label: 'Data points added', value: '4,890' }],
  Analyst:   [{ label: 'Accounts scored', value: '12,000' }, { label: 'Segments active', value: '5' }, { label: 'High-priority pool', value: '$4.2M' }],
  Collector: [{ label: 'RPCs today', value: '284' }, { label: 'PTPs captured', value: '$48.2K' }, { label: 'PTP rate', value: '12%' }],
  Auditor:   [{ label: 'Audited', value: '2,847' }, { label: 'Compliance score', value: '99.86%' }, { label: 'Flags this week', value: '4' }],
  Coach:     [{ label: 'Sessions reviewed', value: '142' }, { label: 'PTP lift (30d)', value: '+8%' }, { label: 'Scripts updated', value: '3' }],
};

const agentDescriptions = {
  Manager: 'Orchestrates the entire agent fleet, routing accounts to the right agent at the right time. Manages approval workflows, escalation chains, and cross-agent coordination. Acts as the supervisor that ensures every account gets worked optimally.',
  Scrubber: 'Pre-filters every account before outreach begins. Runs DNC scrubs, bankruptcy checks, statute of limitations validation, and litigator screening. Ensures no contact is made to accounts that should be suppressed, protecting the agency from regulatory risk.',
  Tracer: 'Continuously skip-traces unreachable accounts, refreshes stale contact data, validates phone numbers, and builds digital footprints. Turns dead accounts into workable ones by finding current contact information.',
  Analyst: 'The intelligence engine. Scores every account for propensity to pay, builds segments, calibrates offers, and overlays state-specific rules. Continuously re-scores based on engagement signals to keep cohorts accurate.',
  Collector: 'The outreach engine. Handles multi-channel contact across voice AI, SMS, email, and human agents. Runs negotiation flows, captures promises to pay, delivers Mini-Miranda disclosures, and manages the full conversation lifecycle.',
  Auditor: 'Audits every consumer interaction for regulatory compliance. Reviews conversations against FDCPA, TCPA, and state-specific rules. Generates compliance reports, flags violations, and tracks corrective actions to resolution.',
  Coach: 'Analyzes conversation quality, identifies failure patterns, and writes improved scripts. Tracks agent performance over time, detects when PTP rates drop, and deploys targeted coaching interventions.',
};

const agentSkills = {
  Manager:   [{ icon: '🔀', name: 'Agent Routing', desc: 'Routes accounts to optimal agent based on account profile and agent capacity' }, { icon: '✅', name: 'Approval Management', desc: 'Manages approval workflows for strategy changes and settlements' }, { icon: '⚡', name: 'Escalation Handling', desc: 'Detects stalled accounts and escalates to human operators' }, { icon: '📋', name: 'Portfolio Overview', desc: 'Maintains real-time view of all accounts and their current agent assignment' }],
  Scrubber:  [{ icon: '🚫', name: 'DNC Scrub', desc: 'Checks all contacts against federal and state Do Not Call registries' }, { icon: '⚖️', name: 'Bankruptcy Check', desc: 'Screens for active bankruptcy filings via PACER integration' }, { icon: '📅', name: 'SOL Validation', desc: 'Validates statute of limitations by state and debt type' }, { icon: '🔒', name: 'Litigator Screen', desc: 'Flags accounts associated with known serial litigators' }],
  Tracer:    [{ icon: '🔎', name: 'Skip Tracing', desc: 'Locates updated contact info for unreachable consumers' }, { icon: '📱', name: 'Phone Validation', desc: 'Validates phone numbers as active, mobile, and reachable' }, { icon: '💰', name: 'Asset Intelligence', desc: 'Identifies employment and asset signals to inform collection strategy' }, { icon: '🌐', name: 'Digital Footprint', desc: 'Maps digital presence to find alternate contact channels' }],
  Analyst:   [{ icon: '🎯', name: 'Propensity Scoring', desc: 'ML-based scoring of payment likelihood using 40+ features' }, { icon: '📊', name: 'Segment Builder', desc: 'Creates dynamic cohorts based on balance, age, behavior, and signals' }, { icon: '💵', name: 'Offer Calibration', desc: 'Determines optimal settlement/payment plan terms per account' }, { icon: '🗺️', name: 'State Rule Overlay', desc: 'Applies state-specific collection rules to strategy decisions' }],
  Collector: [{ icon: '📡', name: 'Multi-channel Outreach', desc: 'Orchestrates voice AI, SMS, email, and human agent contacts' }, { icon: '🤝', name: 'Negotiation Engine', desc: 'Runs payment negotiation flows with configurable offer ladders' }, { icon: '👤', name: 'RPC Verification', desc: 'Confirms right party contact before proceeding with collection' }, { icon: '📜', name: 'Mini-Miranda Delivery', desc: 'Ensures compliant debt disclosure within first 30 seconds' }],
  Auditor:   [{ icon: '🎧', name: 'Conversation Audit', desc: 'Reviews all consumer interactions against compliance rules' }, { icon: '📝', name: 'Pre-launch Review', desc: 'Approves new scripts and templates before deployment' }, { icon: '🏛️', name: 'State Rule Enforcement', desc: 'Enforces state-specific collection laws and restrictions' }, { icon: '📄', name: 'Compliance Reporting', desc: 'Generates audit reports for client compliance teams' }],
  Coach:     [{ icon: '🔬', name: 'Conversation Analysis', desc: 'Deep-dives into conversation transcripts to find patterns' }, { icon: '✍️', name: 'Script Authoring', desc: 'Writes and A/B tests new conversation scripts' }, { icon: '🚨', name: 'Failure Detection', desc: 'Identifies where conversations break down and why' }, { icon: '📈', name: 'Performance Tracking', desc: 'Tracks agent quality scores and coaching impact over time' }],
};

const agentConnectors = {
  Manager:   [{ icon: '🗄️', name: 'Core DB', connected: true }, { icon: '📡', name: 'Event Bus', connected: true }, { icon: '💬', name: 'Slack Alerts', connected: true }],
  Scrubber:  [{ icon: '🚫', name: 'DNC Registry', connected: true }, { icon: '⚖️', name: 'PACER API', connected: true }, { icon: '🔍', name: 'LexisNexis Risk', connected: true }],
  Tracer:    [{ icon: '🔎', name: 'LexisNexis TLO', connected: true }, { icon: '📊', name: 'Acxiom', connected: true }, { icon: '🏛️', name: 'Public Records API', connected: true }],
  Analyst:   [{ icon: '🗄️', name: 'Core DB', connected: true }, { icon: '💳', name: 'Credit Bureau', connected: true }, { icon: '🤖', name: 'Internal ML Models', connected: true }],
  Collector: [{ icon: '📞', name: 'Dialer', connected: true }, { icon: '💬', name: 'SMS Gateway', connected: true }, { icon: '📧', name: 'Email Provider', connected: true }, { icon: '🔊', name: 'IVR Platform', connected: true }],
  Auditor:   [{ icon: '🎧', name: 'Call Recording Store', connected: true }, { icon: '🏛️', name: 'CFPB Rules Engine', connected: true }, { icon: '📊', name: 'Compliance Dashboard', connected: true }],
  Coach:     [{ icon: '🎧', name: 'Call Transcripts', connected: true }, { icon: '📊', name: 'Analytics Platform', connected: true }, { icon: '📝', name: 'Script Repository', connected: true }],
};

const agentRecentActivity = {
  Manager:   [{ text: 'Routed **284 accounts** to Collector for outbound blitz', time: '2h ago' }, { text: 'Approved settlement strategy change for Medium Propensity cohort', time: '4h ago' }, { text: 'Escalated **12 stalled accounts** to human review queue', time: '6h ago' }],
  Scrubber:  [{ text: 'Scrubbed **1,247 new accounts** from morning placement file', time: '1h ago' }, { text: 'Suppressed **312 accounts** matching DNC registry', time: '1h ago' }, { text: 'Flagged **8 accounts** with active bankruptcy filings', time: '3h ago' }],
  Tracer:    [{ text: 'Skip trace batch complete. **78 new phone numbers** appended', time: '6h ago' }, { text: '**340 of 1,200** unreachable accounts now have fresh contact info', time: '1d ago' }, { text: '6 enriched accounts converted, **$18,400 collected**', time: '2d ago' }],
  Analyst:   [{ text: 'Re-scored **340 accounts** from Low to Medium propensity', time: '2h ago' }, { text: 'Week 3 liquidation hit **2.7%**, crossing activation target', time: '6h ago' }, { text: 'Published cohort breakdown. High Prop/High Bal driving **60%** of collections', time: '1d ago' }],
  Collector: [{ text: 'Completed **284 RPCs** across voice AI and human agents', time: '30m ago' }, { text: 'Captured **$48.2K in PTPs** from today\'s outbound campaigns', time: '1h ago' }, { text: 'Launched Spanish SMS campaign for TX/FL cohort, **180 accounts**', time: '4h ago' }, { text: 'PTP reminder SMS sent to **620 accounts** with payment due in 24h', time: '6h ago' }],
  Auditor:   [{ text: 'Audited **412 conversations** today. 1 timezone flag on NY account', time: '4h ago' }, { text: 'Cleared settlement offer SMS template for FDCPA compliance', time: '1d ago' }, { text: 'Updated timezone mapping for **NY accounts** after TCPA flag', time: '2d ago' }],
  Coach:     [{ text: '**3 agents** below threshold on "I already paid" objection handling', time: '8h ago' }, { text: 'Scored **18 human agent calls**. Average quality: 87/100', time: '1d ago' }, { text: 'Deployed objection fix. Drop-off reduced **34% to 18%**', time: '3d ago' }],
};

const agentOrder = ['Manager', 'Scrubber', 'Tracer', 'Analyst', 'Collector', 'Auditor', 'Coach'];

// Combined activity feed — all agents mixed, sorted by time
const combinedActivity = [
  { agent: 'Collector', text: 'Completed **284 RPCs** across voice AI and human agents', time: '30m ago' },
  { agent: 'Collector', text: 'Captured **$48.2K in PTPs** from today\'s outbound campaigns', time: '1h ago' },
  { agent: 'Scrubber', text: 'Scrubbed **1,247 new accounts** from morning placement file', time: '1h ago' },
  { agent: 'Analyst', text: 'Re-scored **340 accounts** from Low to Medium propensity', time: '2h ago' },
  { agent: 'Manager', text: 'Routed **284 accounts** to Collector for outbound blitz', time: '2h ago' },
  { agent: 'Auditor', text: 'Audited **412 conversations** today. 1 timezone flag on NY account', time: '4h ago' },
  { agent: 'Collector', text: 'Launched Spanish SMS campaign for TX/FL, **180 accounts**', time: '4h ago' },
  { agent: 'Manager', text: 'Approved settlement strategy change for Medium Propensity', time: '4h ago' },
  { agent: 'Analyst', text: 'Week 3 liquidation hit **2.7%**, crossing activation target', time: '6h ago' },
  { agent: 'Tracer', text: 'Skip trace complete. **78 new phone numbers** appended', time: '6h ago' },
  { agent: 'Coach', text: '**3 agents** below threshold on objection handling', time: '8h ago' },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

const StatusPill = ({ status }) => {
  const styles = {
    Active: 'bg-emerald-50 text-emerald-700',
    Busy: 'bg-amber-50 text-amber-700',
    Idle: 'bg-gray-100 text-gray-500',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold ${styles[status]}`}>
      {status === 'Busy' && <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />}
      {status === 'Active' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
      {status === 'Idle' && <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />}
      {status}{status === 'Busy' ? ' · Live now' : ''}
    </span>
  );
};

const BoldText = ({ text }) => (
  <span dangerouslySetInnerHTML={{ __html: text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-800 font-semibold">$1</strong>') }} />
);

// ── Agent Card (List View) ───────────────────────────────────────────────────

const AgentCard = ({ name, onSelect }) => {
  const color = agentColorMap[name];
  const status = agentStatusMap[name];
  const metrics = agentMetrics[name];
  const activity = agentRecentActivity[name];

  return (
    <button
      onClick={() => onSelect(name)}
      className="card text-left w-full overflow-hidden transition-all hover:translate-y-[-1px] group"
    >
      {/* Color accent stripe */}
      <div className="h-1 w-full" style={{ background: color }} />

      <div className="p-4">
        {/* Header: icon + name + status */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{ background: `${color}15` }}>
              {agentIconMap[name]}
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900">{name}</div>
              <div className="text-[11px] text-gray-400">{agentCategoryMap[name]}</div>
            </div>
          </div>
          <StatusPill status={status} />
        </div>

        {/* Metrics row */}
        <div className="flex gap-2 mb-3">
          {metrics.map((m, i) => (
            <div key={i} className="flex-1 rounded-lg px-2.5 py-2 text-center" style={{ background: '#f0f8f6' }}>
              <div className="text-[13px] font-bold text-gray-800" style={{ fontVariantNumeric: 'tabular-nums' }}>{m.value}</div>
              <div className="text-[10px] text-gray-400 leading-tight">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Recent activity snippet */}
        <div className="text-[12px] text-gray-500 leading-relaxed mb-3 line-clamp-1">
          <BoldText text={activity[0].text} />
        </div>

        {/* Footer: Talk button + timestamp */}
        <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid #ecf6f3' }}>
          <div
            onClick={(e) => { e.stopPropagation(); onSelect(name); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold text-white transition-all hover:opacity-90 cursor-pointer"
            style={{ background: color }}
          >
            <span className="material-symbols-outlined text-xs">chat</span>
            Talk to {name}
          </div>
          <span className="text-[11px] text-gray-400 flex-shrink-0" style={{ fontVariantNumeric: 'tabular-nums' }}>
            {status === 'Busy' ? <span className="text-emerald-600 font-semibold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />Live now</span> : activity[0].time}
          </span>
        </div>
      </div>
    </button>
  );
};

// ── Agent Detail View ────────────────────────────────────────────────────────

// Mock chat responses per agent
const agentChatResponses = {
  Manager: "I've routed 284 accounts to Collector for today's outbound blitz. 12 accounts are stalled and flagged for human review. The Medium Propensity settlement strategy change is pending your approval.",
  Scrubber: "Morning placement of 1,247 accounts processed. 312 suppressed via DNC, 8 flagged for active bankruptcy. Pass rate is 97.4%. All clean accounts forwarded to Tracer for enrichment.",
  Tracer: "Latest skip trace batch appended 78 new phone numbers. Overall enrichment rate is at 71%. 340 previously unreachable accounts now have valid contact info. 6 have already converted for $18.4K.",
  Analyst: "Week 3 liquidation crossed the 2.5% activation target at 2.7%. High Prop/High Bal cohort is driving 60% of collections. I've re-scored 340 accounts from Low to Medium propensity based on engagement signals.",
  Collector: "284 RPCs completed today across voice AI and human agents. Captured $48.2K in PTPs. PTP rate at 12%. Spanish SMS campaign in TX/FL is showing 8% higher response than English.",
  Auditor: "412 conversations audited today. 1 low-risk flag on a NY timezone issue, already resolved. Compliance score at 99.86%. Settlement SMS template cleared for FDCPA compliance.",
  Coach: "3 agents are below threshold on the 'I already paid' objection. Calibration session scheduled for Friday. The objection handling fix I deployed last week reduced drop-off from 34% to 18%.",
};

const AgentDetail = ({ name, onBack }) => {
  const color = agentColorMap[name];
  const status = agentStatusMap[name];
  const metrics = agentMetrics[name];
  const skills = agentSkills[name];
  const connectors = agentConnectors[name];
  const activity = agentRecentActivity[name];
  const description = agentDescriptions[name];
  const [chatOpen, setChatOpen] = useState(false);
  const [chatSent, setChatSent] = useState(false);
  const [chatInput, setChatInput] = useState('');

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    setChatSent(true);
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2 text-sm">
          <button onClick={onBack} className="text-gray-400 hover:text-gray-700 transition-colors font-medium">Agents</button>
          <span className="text-gray-300">/</span>
          <span className="text-gray-800 font-semibold">{name}</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onBack} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-500 transition-all" style={{ background: '#ffffff', border: '1px solid #d4eae5' }}>
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-500 transition-all" style={{ background: '#ffffff', border: '1px solid #d4eae5' }}>
            <span className="material-symbols-outlined text-sm">edit</span>
            Edit agent
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-500 transition-all" style={{ background: '#fef2f2', border: '1px solid #fecaca' }}>
            <span className="material-symbols-outlined text-sm">block</span>
            Disable
          </button>
        </div>
      </div>

      {/* Header card */}
      <div className="card overflow-hidden mb-6">
        <div className="h-1.5 w-full" style={{ background: color }} />
        <div className="p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: `${color}15` }}>
              {agentIconMap[name]}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-xl font-bold text-gray-900">{name}</h1>
                <StatusPill status={status} />
              </div>
              <div className="text-sm text-gray-400">{agentCategoryMap[name]}</div>
            </div>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed mb-5">{description}</p>

          {/* Metrics bar */}
          <div className="flex gap-3 p-4 rounded-xl" style={{ background: '#f0f8f6' }}>
            {metrics.map((m, i) => (
              <div key={i} className="flex-1 text-center">
                <div className="text-lg font-bold text-gray-900" style={{ fontVariantNumeric: 'tabular-nums' }}>{m.value}</div>
                <div className="text-[11px] text-gray-400">{m.label}</div>
              </div>
            ))}
          </div>

          {/* Inline chat section */}
          <div className="mt-5 pt-5" style={{ borderTop: '1px solid #ecf6f3' }}>
            {!chatOpen ? (
              <button
                onClick={() => setChatOpen(true)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all hover:shadow-sm"
                style={{ background: '#f0f8f6', border: '1px solid #d4eae5' }}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${color}15` }}>
                  <span className="material-symbols-outlined text-base" style={{ color }}>chat</span>
                </div>
                <span className="text-sm text-gray-400">Ask {name} a question...</span>
              </button>
            ) : (
              <div className="animate-fadeIn">
                {/* Chat messages */}
                {chatSent && (
                  <div className="space-y-3 mb-4">
                    {/* User message */}
                    <div className="flex justify-end">
                      <div className="max-w-md px-4 py-2.5 rounded-2xl rounded-tr-sm text-sm text-white" style={{ background: 'linear-gradient(135deg, #2196af, #61ab5e)' }}>
                        {chatInput}
                      </div>
                    </div>
                    {/* Agent response */}
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0" style={{ background: `${color}15` }}>
                        {agentIconMap[name]}
                      </div>
                      <div className="max-w-lg">
                        <div className="px-4 py-3 rounded-2xl rounded-tl-sm text-sm text-gray-700 leading-relaxed" style={{ background: '#f0f8f6', border: '1px solid #d4eae5' }}>
                          {agentChatResponses[name]}
                        </div>
                        <div className="text-[10px] text-gray-400 mt-1 ml-1" style={{ fontFamily: 'monospace' }}>just now</div>
                      </div>
                    </div>
                  </div>
                )}
                {/* Chat input */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-xl" style={{ background: '#f0f8f6', border: '1px solid #d4eae5' }}>
                    <span className="material-symbols-outlined text-base text-gray-400">chat</span>
                    <input
                      type="text"
                      value={chatSent ? '' : chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                      placeholder={chatSent ? 'Ask a follow-up...' : `Ask ${name} a question...`}
                      className="flex-1 text-sm bg-transparent border-none outline-none text-gray-800 placeholder-gray-400"
                    />
                  </div>
                  <button
                    onClick={handleSendChat}
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-white flex-shrink-0 transition-all hover:opacity-90"
                    style={{ background: color }}
                  >
                    <span className="material-symbols-outlined text-base">arrow_upward</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3-column grid: Skills, Connectors, Activity */}
      <div className="grid grid-cols-3 gap-5">

        {/* Skills */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Skills</h3>
            <button className="text-[11px] font-semibold" style={{ color: '#2196af' }}>+ Add skill</button>
          </div>
          <div className="space-y-0">
            {skills.map((skill, i) => (
              <div key={i} className="flex items-start gap-3 py-3 group" style={{ borderTop: i > 0 ? '1px solid #ecf6f3' : 'none' }}>
                <span className="text-base mt-0.5">{skill.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-semibold text-gray-800">{skill.name}</div>
                  <div className="text-[11px] text-gray-400 leading-relaxed">{skill.desc}</div>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                  <button className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600" style={{ border: '1px solid #d4eae5' }}>
                    <span className="material-symbols-outlined text-xs">edit</span>
                  </button>
                  <button className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200" style={{ border: '1px solid #d4eae5' }}>
                    <span className="material-symbols-outlined text-xs">close</span>
                  </button>
                </div>
              </div>
            ))}
            <button className="w-full mt-3 py-2.5 rounded-lg text-[11px] font-medium text-gray-400 hover:text-teal-600 transition-all" style={{ border: '1px dashed #d4eae5' }}>
              + Add skill
            </button>
          </div>
        </div>

        {/* Connectors */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Connectors</h3>
            <button className="text-[11px] font-semibold" style={{ color: '#2196af' }}>+ Add connector</button>
          </div>
          <div className="space-y-0">
            {connectors.map((conn, i) => (
              <div key={i} className="flex items-center gap-3 py-3 group" style={{ borderTop: i > 0 ? '1px solid #ecf6f3' : 'none' }}>
                <span className="text-base">{conn.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-gray-800">{conn.name}</div>
                </div>
                <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Connected
                </span>
                <button className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all" style={{ border: '1px solid #d4eae5' }}>
                  <span className="material-symbols-outlined text-xs">close</span>
                </button>
              </div>
            ))}
            <button className="w-full mt-3 py-2.5 rounded-lg text-[11px] font-medium text-gray-400 hover:text-teal-600 transition-all" style={{ border: '1px dashed #d4eae5' }}>
              + Add connector
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Recent Activity</h3>
            <span className="text-[11px] text-gray-400">{activity.length} events</span>
          </div>
          <div className="space-y-0">
            {activity.map((a, i) => (
              <div key={i} className="py-3" style={{ borderTop: i > 0 ? '1px solid #ecf6f3' : 'none' }}>
                <div className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: color }} />
                  <div>
                    <div className="text-[12px] text-gray-600 leading-relaxed">
                      <BoldText text={a.text} />
                    </div>
                    <div className="text-[10px] text-gray-400 mt-1" style={{ fontVariantNumeric: 'tabular-nums', fontFamily: 'monospace' }}>{a.time}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Main Component ───────────────────────────────────────────────────────────

export default function Agents({ onAgentClick }) {
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [filter, setFilter] = useState('All');

  const filteredAgents = agentOrder.filter(name => {
    if (filter === 'All') return true;
    return agentStatusMap[name] === filter;
  });

  const activeCount = agentOrder.filter(n => agentStatusMap[n] === 'Active').length;
  const busyCount = agentOrder.filter(n => agentStatusMap[n] === 'Busy').length;

  // ── Detail view ──
  if (selectedAgent) {
    return (
      <div className="p-8 max-w-6xl mx-auto">
        <AgentDetail
          name={selectedAgent}
          onBack={() => setSelectedAgent(null)}
        />
      </div>
    );
  }

  // ── List view ──
  return (
    <div className="p-8 max-w-6xl mx-auto">

      {/* Top bar */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold text-gray-900">Agents</h1>
          <span className="text-[11px] font-semibold text-gray-400 px-2 py-0.5 rounded-full" style={{ background: '#e8f4f1', border: '1px solid #d4eae5' }}>{agentOrder.length} agents</span>
        </div>
        <div className="flex items-center gap-2">
          {/* Filter tabs */}
          {['All', 'Active', 'Idle'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filter === f ? 'text-white' : 'text-gray-500'}`}
              style={filter === f ? { background: 'linear-gradient(135deg, #2196af, #61ab5e)' } : { background: '#ffffff', border: '1px solid #d4eae5' }}
            >
              {f}
            </button>
          ))}
          <div className="w-px h-6 bg-gray-200 mx-1" />
          <button className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold text-white" style={{ background: 'linear-gradient(135deg, #2196af, #61ab5e)' }}>
            <span className="material-symbols-outlined text-sm">add</span>
            Add Agent
          </button>
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="card p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#e8f4f1' }}>
            <span className="material-symbols-outlined text-lg" style={{ color: '#2196af' }}>smart_toy</span>
          </div>
          <div>
            <div className="text-lg font-bold text-gray-900">{activeCount + busyCount}</div>
            <div className="text-[11px] text-gray-400">Active agents</div>
          </div>
        </div>
        <div className="card p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#e8f4f1' }}>
            <span className="material-symbols-outlined text-lg" style={{ color: '#61ab5e' }}>people</span>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-gray-900">4,280</span>
              <span className="text-[11px] font-semibold text-emerald-600">+12%</span>
            </div>
            <div className="text-[11px] text-gray-400">Accounts touched today</div>
          </div>
        </div>
        <div className="card p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#e8f4f1' }}>
            <span className="material-symbols-outlined text-lg" style={{ color: '#2196af' }}>bolt</span>
          </div>
          <div>
            <div className="text-lg font-bold text-gray-900">1,847</div>
            <div className="text-[11px] text-gray-400">Actions taken today</div>
          </div>
        </div>
      </div>

      {/* Main layout: card grid + activity feed */}
      <div className="grid grid-cols-3 gap-6">

        {/* Agent cards — 2 cols */}
        <div className="col-span-2">
          <div className="grid grid-cols-2 gap-4">
            {filteredAgents.map(name => (
              <AgentCard
                key={name}
                name={name}
                onSelect={setSelectedAgent}
              />
            ))}
          </div>
        </div>

        {/* Activity feed — right panel */}
        <div className="col-span-1">
          <div className="card p-5 sticky top-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Activity Feed</h3>
              <span className="text-[11px] text-gray-400">All agents</span>
            </div>
            <div className="space-y-0 max-h-[calc(100vh-280px)] overflow-y-auto">
              {combinedActivity.map((a, i) => {
                const color = agentColorMap[a.agent];
                return (
                  <div key={i} className="py-3" style={{ borderTop: i > 0 ? '1px solid #ecf6f3' : 'none' }}>
                    <div className="flex items-start gap-2.5">
                      <div className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5" style={{ background: `${color}15` }}>
                        {agentIconMap[a.agent]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] font-semibold mb-0.5" style={{ color }}>{a.agent}</div>
                        <div className="text-[12px] text-gray-500 leading-relaxed">
                          <BoldText text={a.text} />
                        </div>
                        <div className="text-[10px] text-gray-400 mt-1" style={{ fontVariantNumeric: 'tabular-nums', fontFamily: 'monospace' }}>{a.time}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
