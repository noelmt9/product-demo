import { useState } from 'react';

// ── Agent data ───────────────────────────────────────────────────────────────

const agentColorMap = {
  Manager: '#8b5cf6', Scrubber: '#10b981', Tracer: '#6366f1', Analyst: '#3b82f6',
  Collector: '#f59e0b', Auditor: '#ef4444', Coach: '#06b6d4',
};

const agentIconMap = {
  Manager: 'hub', Scrubber: 'shield', Tracer: 'person_search', Analyst: 'query_stats',
  Collector: 'call', Auditor: 'verified_user', Coach: 'school',
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
  Collector: 'Active', Auditor: 'Active', Coach: 'Active',
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
  Manager: 'Orchestrates the entire agent fleet, routing accounts to the right agent at the right time. Manages approval workflows, escalation chains, and cross-agent coordination.',
  Scrubber: 'Pre-filters every account before outreach begins. Runs DNC scrubs, bankruptcy checks, statute of limitations validation, and litigator screening to protect the agency from regulatory risk.',
  Tracer: 'Continuously skip-traces unreachable accounts, refreshes stale contact data, validates phone numbers, and builds digital footprints. Turns dead accounts into workable ones.',
  Analyst: 'The intelligence engine. Scores every account for propensity to pay, builds segments, calibrates offers, and overlays state-specific rules. Re-scores continuously based on engagement signals.',
  Collector: 'The outreach engine. Handles multi-channel contact across voice AI, SMS, email, and human agents. Runs negotiation flows, captures promises to pay, and manages the full conversation lifecycle.',
  Auditor: 'Audits every consumer interaction for regulatory compliance. Reviews conversations against FDCPA, TCPA, and state-specific rules. Generates compliance reports and tracks corrective actions.',
  Coach: 'Analyzes conversation quality, identifies failure patterns, and writes improved scripts. Tracks agent performance over time and deploys targeted coaching interventions.',
};

const agentSkills = {
  Manager:   [{ icon: 'alt_route', name: 'Agent Routing', desc: 'Routes accounts to optimal agent based on profile and capacity' }, { icon: 'task_alt', name: 'Approval Management', desc: 'Manages approval workflows for strategy changes and settlements' }, { icon: 'bolt', name: 'Escalation Handling', desc: 'Detects stalled accounts and escalates to human operators' }, { icon: 'dashboard', name: 'Portfolio Overview', desc: 'Maintains real-time view of all accounts and their assignments' }],
  Scrubber:  [{ icon: 'block', name: 'DNC Scrub', desc: 'Checks contacts against federal and state Do Not Call registries' }, { icon: 'gavel', name: 'Bankruptcy Check', desc: 'Screens for active bankruptcy filings via PACER integration' }, { icon: 'event', name: 'SOL Validation', desc: 'Validates statute of limitations by state and debt type' }, { icon: 'lock', name: 'Litigator Screen', desc: 'Flags accounts associated with known serial litigators' }],
  Tracer:    [{ icon: 'search', name: 'Skip Tracing', desc: 'Locates updated contact info for unreachable consumers' }, { icon: 'smartphone', name: 'Phone Validation', desc: 'Validates phone numbers as active, mobile, and reachable' }, { icon: 'account_balance', name: 'Asset Intelligence', desc: 'Identifies employment and asset signals for collection strategy' }, { icon: 'language', name: 'Digital Footprint', desc: 'Maps digital presence to find alternate contact channels' }],
  Analyst:   [{ icon: 'target', name: 'Propensity Scoring', desc: 'ML-based scoring of payment likelihood using 40+ features' }, { icon: 'stacked_bar_chart', name: 'Segment Builder', desc: 'Creates dynamic cohorts based on balance, age, and behavior' }, { icon: 'payments', name: 'Offer Calibration', desc: 'Determines optimal settlement or payment plan terms per account' }, { icon: 'map', name: 'State Rule Overlay', desc: 'Applies state-specific collection rules to strategy decisions' }],
  Collector: [{ icon: 'cell_tower', name: 'Multi-channel Outreach', desc: 'Orchestrates voice AI, SMS, email, and human agent contacts' }, { icon: 'handshake', name: 'Negotiation Engine', desc: 'Runs payment negotiation flows with configurable offer ladders' }, { icon: 'person', name: 'RPC Verification', desc: 'Confirms right party contact before proceeding with collection' }, { icon: 'description', name: 'Mini-Miranda Delivery', desc: 'Ensures compliant debt disclosure within first 30 seconds' }],
  Auditor:   [{ icon: 'headphones', name: 'Conversation Audit', desc: 'Reviews all consumer interactions against compliance rules' }, { icon: 'rate_review', name: 'Pre-launch Review', desc: 'Approves new scripts and templates before deployment' }, { icon: 'account_balance', name: 'State Rule Enforcement', desc: 'Enforces state-specific collection laws and restrictions' }, { icon: 'article', name: 'Compliance Reporting', desc: 'Generates audit reports for client compliance teams' }],
  Coach:     [{ icon: 'troubleshoot', name: 'Conversation Analysis', desc: 'Deep-dives into transcripts to find failure patterns' }, { icon: 'edit_note', name: 'Script Authoring', desc: 'Writes and A/B tests new conversation scripts' }, { icon: 'report', name: 'Failure Detection', desc: 'Identifies where conversations break down and why' }, { icon: 'trending_up', name: 'Performance Tracking', desc: 'Tracks quality scores and coaching impact over time' }],
};

const agentConnectors = {
  Manager:   [{ icon: 'storage', name: 'Core DB' }, { icon: 'cell_tower', name: 'Event Bus' }, { icon: 'notifications', name: 'Slack Alerts' }],
  Scrubber:  [{ icon: 'block', name: 'DNC Registry' }, { icon: 'gavel', name: 'PACER API' }, { icon: 'search', name: 'LexisNexis Risk' }],
  Tracer:    [{ icon: 'search', name: 'LexisNexis TLO' }, { icon: 'analytics', name: 'Acxiom' }, { icon: 'account_balance', name: 'Public Records API' }],
  Analyst:   [{ icon: 'storage', name: 'Core DB' }, { icon: 'credit_card', name: 'Credit Bureau' }, { icon: 'smart_toy', name: 'Internal ML Models' }],
  Collector: [{ icon: 'call', name: 'Dialer' }, { icon: 'sms', name: 'SMS Gateway' }, { icon: 'email', name: 'Email Provider' }, { icon: 'record_voice_over', name: 'IVR Platform' }],
  Auditor:   [{ icon: 'headphones', name: 'Call Recording Store' }, { icon: 'policy', name: 'CFPB Rules Engine' }, { icon: 'dashboard', name: 'Compliance Dashboard' }],
  Coach:     [{ icon: 'headphones', name: 'Call Transcripts' }, { icon: 'analytics', name: 'Analytics Platform' }, { icon: 'description', name: 'Script Repository' }],
};

const agentRecentActivity = {
  Manager:   [{ text: 'Routed **284 accounts** to Collector for outbound blitz', time: '2h ago' }, { text: 'Approved settlement strategy change for Medium Propensity cohort', time: '4h ago' }, { text: 'Escalated **12 stalled accounts** to human review queue', time: '6h ago' }],
  Scrubber:  [{ text: 'Scrubbed **1,247 new accounts** from morning placement file', time: '1h ago' }, { text: 'Suppressed **312 accounts** matching DNC registry', time: '1h ago' }, { text: 'Flagged **8 accounts** with active bankruptcy filings', time: '3h ago' }],
  Tracer:    [{ text: 'Skip trace batch complete. **78 new phone numbers** appended', time: '6h ago' }, { text: '**340 of 1,200** unreachable accounts now have fresh contact info', time: '1d ago' }, { text: '6 enriched accounts converted, **$18,400 collected**', time: '2d ago' }],
  Analyst:   [{ text: 'Re-scored **340 accounts** from Low to Medium propensity', time: '2h ago' }, { text: 'Week 3 liquidation hit **2.7%**, crossing activation target', time: '6h ago' }, { text: 'Published cohort breakdown. High Prop/High Bal driving **60%** of collections', time: '1d ago' }],
  Collector: [{ text: 'Completed **284 RPCs** across voice AI and human agents', time: '30m ago' }, { text: 'Captured **$48.2K in PTPs** from today\'s outbound campaigns', time: '1h ago' }, { text: 'Launched Spanish SMS campaign for TX/FL cohort, **180 accounts**', time: '4h ago' }],
  Auditor:   [{ text: 'Audited **412 conversations** today. 1 timezone flag on NY account', time: '4h ago' }, { text: 'Cleared settlement offer SMS template for FDCPA compliance', time: '1d ago' }, { text: 'Updated timezone mapping for **NY accounts** after TCPA flag', time: '2d ago' }],
  Coach:     [{ text: '**3 agents** below threshold on "I already paid" objection handling', time: '8h ago' }, { text: 'Scored **18 human agent calls**. Average quality: 87/100', time: '1d ago' }, { text: 'Deployed objection fix. Drop-off reduced **34% to 18%**', time: '3d ago' }],
};

const agentChatResponses = {
  Manager: "I've routed 284 accounts to Collector for today's outbound blitz. 12 accounts are stalled and flagged for human review. The Medium Propensity settlement strategy change is pending your approval.",
  Scrubber: "Morning placement of 1,247 accounts processed. 312 suppressed via DNC, 8 flagged for active bankruptcy. Pass rate is 97.4%. All clean accounts forwarded to Tracer for enrichment.",
  Tracer: "Latest skip trace batch appended 78 new phone numbers. Overall enrichment rate is at 71%. 340 previously unreachable accounts now have valid contact info. 6 have already converted for $18.4K.",
  Analyst: "Week 3 liquidation crossed the 2.5% activation target at 2.7%. High Prop/High Bal cohort is driving 60% of collections. I've re-scored 340 accounts from Low to Medium propensity based on engagement signals.",
  Collector: "284 RPCs completed today across voice AI and human agents. Captured $48.2K in PTPs. PTP rate at 12%. Spanish SMS campaign in TX/FL is showing 8% higher response than English.",
  Auditor: "412 conversations audited today. 1 low-risk flag on a NY timezone issue, already resolved. Compliance score at 99.86%. Settlement SMS template cleared for FDCPA compliance.",
  Coach: "3 agents are below threshold on the 'I already paid' objection. Calibration session scheduled for Friday. The objection handling fix I deployed last week reduced drop-off from 34% to 18%.",
};

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

const agentOrder = ['Manager', 'Collector', 'Analyst', 'Auditor', 'Coach', 'Scrubber', 'Tracer'];

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
      {status}{status === 'Busy' ? ' · Live' : ''}
    </span>
  );
};

const BoldText = ({ text }) => (
  <span dangerouslySetInnerHTML={{ __html: text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-800 font-semibold">$1</strong>') }} />
);

// ── Agent Card ───────────────────────────────────────────────────────────────

const AgentCard = ({ name, onSelect }) => {
  const status = agentStatusMap[name];
  const metrics = agentMetrics[name];
  const activity = agentRecentActivity[name];

  return (
    <button
      onClick={() => onSelect(name)}
      className="card text-left w-full overflow-hidden transition-all hover:translate-y-[-1px]"
    >
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#f8f9fa' }}>
              <span className="material-symbols-outlined text-lg" style={{ color: '#4c6ef5' }}>{agentIconMap[name]}</span>
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900">{name}</div>
              <div className="text-[11px] text-gray-400">{agentCategoryMap[name]}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <StatusPill status={status} />
            <span className="text-[10px] text-gray-400" style={{ fontVariantNumeric: 'tabular-nums' }}>{activity[0].time}</span>
          </div>
        </div>

        <div className="flex gap-2">
          {metrics.map((m, i) => (
            <div key={i} className="flex-1 rounded-lg px-2.5 py-2 text-center" style={{ background: '#f8f9fa' }}>
              <div className="text-[13px] font-bold text-gray-800" style={{ fontVariantNumeric: 'tabular-nums' }}>{m.value}</div>
              <div className="text-[10px] text-gray-400 leading-tight">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </button>
  );
};

// ── Agent Detail (shown as tab content) ──────────────────────────────────────

const AgentDetail = ({ name }) => {
  const status = agentStatusMap[name];
  const metrics = agentMetrics[name];
  const skills = agentSkills[name];
  const connectors = agentConnectors[name];
  const activity = agentRecentActivity[name];
  const description = agentDescriptions[name];
  const [detailTab, setDetailTab] = useState('details');

  return (
    <div className="animate-fadeIn">
      {/* Header card */}
      <div className="card overflow-hidden mb-6">
        <div className="p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: '#f8f9fa' }}>
              <span className="material-symbols-outlined text-2xl" style={{ color: '#4c6ef5' }}>{agentIconMap[name]}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-lg font-bold text-gray-900">{name}</h2>
                <StatusPill status={status} />
              </div>
              <div className="text-sm text-gray-400">{agentCategoryMap[name]}</div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-500" style={{ background: '#ffffff', border: '1px solid #dee2e6' }}>
                <span className="material-symbols-outlined text-sm">edit</span>
                Edit
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-500" style={{ background: '#fef2f2', border: '1px solid #fecaca' }}>
                <span className="material-symbols-outlined text-sm">block</span>
                Disable
              </button>
            </div>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed mb-5">{description}</p>

          <div className="flex gap-3 p-4 rounded-xl" style={{ background: '#f8f9fa' }}>
            {metrics.map((m, i) => (
              <div key={i} className="flex-1 text-center">
                <div className="text-lg font-bold text-gray-900" style={{ fontVariantNumeric: 'tabular-nums' }}>{m.value}</div>
                <div className="text-[11px] text-gray-400">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detail tabs */}
      <div className="flex items-center gap-6 mb-5" style={{ borderBottom: '1px solid #dee2e6' }}>
        {[{ id: 'details', label: 'Details' }, { id: 'activity', label: 'Recent Activity' }].map(tab => (
          <button
            key={tab.id}
            onClick={() => setDetailTab(tab.id)}
            className={`pb-3 text-sm font-medium transition-all relative ${detailTab === tab.id ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
          >
            {tab.label}
            {detailTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full" style={{ background: '#4c6ef5' }} />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {detailTab === 'details' ? (
        <div className="grid grid-cols-2 gap-5 animate-fadeIn">
          {/* Skills */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Skills</h3>
              <button className="text-[11px] font-semibold" style={{ color: '#4c6ef5' }}>+ Add skill</button>
            </div>
            {skills.map((skill, i) => (
              <div key={i} className="flex items-start gap-3 py-3 group" style={{ borderTop: i > 0 ? '1px solid #f3f4f6' : 'none' }}>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: '#f8f9fa' }}>
                  <span className="material-symbols-outlined text-sm" style={{ color: '#4c6ef5' }}>{skill.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-semibold text-gray-800">{skill.name}</div>
                  <div className="text-[11px] text-gray-400 leading-relaxed">{skill.desc}</div>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                  <button className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600" style={{ border: '1px solid #dee2e6' }}>
                    <span className="material-symbols-outlined text-xs">edit</span>
                  </button>
                  <button className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500" style={{ border: '1px solid #dee2e6' }}>
                    <span className="material-symbols-outlined text-xs">close</span>
                  </button>
                </div>
              </div>
            ))}
            <button className="w-full mt-3 py-2.5 rounded-lg text-[11px] font-medium text-gray-400 hover:text-indigo-600 transition-all" style={{ border: '1px dashed #dee2e6' }}>
              + Add skill
            </button>
          </div>

          {/* Connectors */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Connectors</h3>
              <button className="text-[11px] font-semibold" style={{ color: '#4c6ef5' }}>+ Add connector</button>
            </div>
            {connectors.map((conn, i) => (
              <div key={i} className="flex items-center gap-3 py-3 group" style={{ borderTop: i > 0 ? '1px solid #f3f4f6' : 'none' }}>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#f8f9fa' }}>
                  <span className="material-symbols-outlined text-sm text-gray-500">{conn.icon}</span>
                </div>
                <div className="flex-1 text-[13px] font-medium text-gray-800">{conn.name}</div>
                <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Connected
                </span>
                <button className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all" style={{ border: '1px solid #dee2e6' }}>
                  <span className="material-symbols-outlined text-xs">close</span>
                </button>
              </div>
            ))}
            <button className="w-full mt-3 py-2.5 rounded-lg text-[11px] font-medium text-gray-400 hover:text-indigo-600 transition-all" style={{ border: '1px dashed #dee2e6' }}>
              + Add connector
            </button>
          </div>
        </div>
      ) : (
        <div className="card p-5 animate-fadeIn">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Recent Activity</h3>
            <span className="text-[11px] text-gray-400">{activity.length} events</span>
          </div>
          {activity.map((a, i) => (
            <div key={i} className="py-3.5" style={{ borderTop: i > 0 ? '1px solid #f3f4f6' : 'none' }}>
              <div className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: '#4c6ef5' }} />
                <div className="flex-1">
                  <div className="text-[13px] text-gray-600 leading-relaxed"><BoldText text={a.text} /></div>
                  <div className="text-[10px] text-gray-400 mt-1" style={{ fontFamily: 'monospace' }}>{a.time}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


// ── Main Component ───────────────────────────────────────────────────────────

export default function Agents() {
  const [activeTab, setActiveTab] = useState('agents');
  const [selectedAgent, setSelectedAgent] = useState(null);
  const activeCount = agentOrder.filter(n => agentStatusMap[n] === 'Active').length;
  const busyCount = agentOrder.filter(n => agentStatusMap[n] === 'Busy').length;

  // If an agent is selected from the card grid, show detail
  if (selectedAgent) {
    return (
      <div className="p-8 max-w-6xl mx-auto">
        <div className="flex items-center gap-2 text-sm mb-5">
          <button onClick={() => setSelectedAgent(null)} className="text-gray-400 hover:text-gray-700 transition-colors font-medium">Agents</button>
          <span className="text-gray-300">/</span>
          <span className="text-gray-800 font-semibold">{selectedAgent}</span>
        </div>
        <AgentDetail name={selectedAgent} />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold text-gray-900">Agents</h1>
          <span className="text-[11px] font-semibold text-gray-400 px-2 py-0.5 rounded-full" style={{ background: '#f8f9fa', border: '1px solid #dee2e6' }}>{agentOrder.length} agents</span>
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-4 mb-5">
        <div className="card p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#f8f9fa' }}>
            <span className="material-symbols-outlined text-lg" style={{ color: '#4c6ef5' }}>smart_toy</span>
          </div>
          <div>
            <div className="text-lg font-bold text-gray-900">{activeCount + busyCount}</div>
            <div className="text-[11px] text-gray-400">Active agents</div>
          </div>
        </div>
        <div className="card p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#f8f9fa' }}>
            <span className="material-symbols-outlined text-lg" style={{ color: '#4c6ef5' }}>people</span>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-gray-900">4,280</span>
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700">+12%</span>
            </div>
            <div className="text-[11px] text-gray-400">Accounts touched today</div>
          </div>
        </div>
        <div className="card p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#f8f9fa' }}>
            <span className="material-symbols-outlined text-lg" style={{ color: '#4c6ef5' }}>bolt</span>
          </div>
          <div>
            <div className="text-lg font-bold text-gray-900">1,847</div>
            <div className="text-[11px] text-gray-400">Actions taken today</div>
          </div>
        </div>
      </div>

      {/* Tabs — clean underline style */}
      <div className="flex items-center gap-6 mb-6" style={{ borderBottom: '1px solid #dee2e6' }}>
        {[
          { id: 'agents', label: 'All Agents' },
          { id: 'activity', label: 'Recent Activity' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 text-sm font-medium transition-all relative ${activeTab === tab.id ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full" style={{ background: '#4c6ef5' }} />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'agents' ? (
        <div className="grid grid-cols-2 gap-4 animate-fadeIn">
          {agentOrder.map(name => (
            <AgentCard key={name} name={name} onSelect={setSelectedAgent} />
          ))}
        </div>
      ) : (
        <div className="card p-5 animate-fadeIn">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Activity Feed</h3>
            <span className="text-[11px] text-gray-400">All agents · Today</span>
          </div>
          {combinedActivity.map((a, i) => {
            const c = agentColorMap[a.agent];
            return (
              <div key={i} className="py-3.5" style={{ borderTop: i > 0 ? '1px solid #f3f4f6' : 'none' }}>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${c}12` }}>
                    <span className="material-symbols-outlined text-sm" style={{ color: c }}>{agentIconMap[a.agent]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[12px] font-semibold" style={{ color: c }}>{a.agent}</span>
                      <span className="text-[10px] text-gray-400" style={{ fontFamily: 'monospace' }}>{a.time}</span>
                    </div>
                    <div className="text-[13px] text-gray-600 leading-relaxed"><BoldText text={a.text} /></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
