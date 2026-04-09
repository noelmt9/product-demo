import React from 'react';

// ── Data ──────────────────────────────────────────────────────────────────────

const AGENT_META = {
  Manager:   { color: '#8b5cf6', bg: 'bg-purple-100', text: 'text-purple-700', dot: '#8b5cf6' },
  Auditor:   { color: '#ef4444', bg: 'bg-red-100',    text: 'text-red-700',    dot: '#ef4444' },
  Coach:     { color: '#06b6d4', bg: 'bg-cyan-100',   text: 'text-cyan-700',   dot: '#06b6d4' },
  Analyst:   { color: '#2196af', bg: 'bg-blue-100',   text: 'text-blue-700',   dot: '#2196af' },
  Collector: { color: '#f59e0b', bg: 'bg-amber-100',  text: 'text-amber-700',  dot: '#f59e0b' },
};

const allApprovals = [
  // Manager
  {
    id: 1, agent: 'Manager', approver: 'Client',
    decision: 'Settlement offer at 20% discount — exceeds pre-approved 15% threshold',
    details: '45 high-balance accounts (avg $4,800) showing settlement interest. 20% discount could recover $216K vs standard 15% offer.',
    businessCase: '45 accounts · Projected recovery at 20%: $216K vs $180K at 15% · Net incremental: $36K',
    counterfactual: 'If rejected: 45 accounts continue at standard 15% — $36K left on the table. Risk of disengagement increases after 30 days.',
    dollarAtStake: 36000, criticality: 'high', status: 'pending', hoursAgo: 2,
    category: 'Settlement Authority',
  },
  {
    id: 2, agent: 'Manager', approver: 'Auditor',
    decision: 'Agent Settlement Protocol: $12K batch authorization',
    details: 'Recovery Agent initiated a new settlement protocol for the Southwest Residential Portfolio. Proposed settlement: $12,475 currently at 4-day delinquency.',
    businessCase: 'Expected recovery: $216K · Settlement cost: $43K discount · Net gain: $173K · Each week of delay costs ~$2-3K in recovery probability',
    counterfactual: 'If rejected: accounts age 30+ days, reducing recovery probability by ~40% ($86K at risk).',
    dollarAtStake: 173000, criticality: 'critical', status: 'pending', hoursAgo: 4,
    category: 'Settlement Authority',
  },
  {
    id: 3, agent: 'Manager', approver: 'Client',
    decision: 'Extend campaign window by 2 weeks for Low Prop / High Bal cohort',
    details: 'Human agent ROI on this cohort is recovering after strategy adjustment. Extending gives 1,500 accounts 2 additional weeks of coverage.',
    businessCase: 'Projected additional recovery: $28K · Cost: $4.2K agent hours · Net: $23.8K',
    counterfactual: 'If rejected: cohort exits campaign with 65% of accounts unworked.',
    dollarAtStake: 23800, criticality: 'medium', status: 'pending', hoursAgo: 8,
    category: 'Campaign Change',
  },
  // Auditor
  {
    id: 4, agent: 'Auditor', approver: 'Manager',
    decision: 'Compliance Buffer Expansion: 3% → 5% for northeast accounts',
    details: 'Compliance system updated risk parameters for this account category in the northeast region. Buffer expansion covers 1,200 additional accounts.',
    businessCase: 'Prevents estimated $64,500 in potential violation exposure · Covers 340 gray-zone accounts',
    counterfactual: 'If rejected: 340 accounts in gray zone where state-specific rules may trigger violations.',
    dollarAtStake: 64500, criticality: 'high', status: 'pending', hoursAgo: 6,
    category: 'Compliance Rule',
  },
  {
    id: 5, agent: 'Auditor', approver: 'Manager',
    decision: 'Exclude 12 accounts with active cease-and-desist from all outbound',
    details: '12 accounts flagged with attorney representation letters received since placement. FDCPA requires immediate cessation of contact.',
    businessCase: 'Prevents regulatory violation · Avg FDCPA fine: $1,000/violation · Exposure: $12K minimum',
    counterfactual: 'If rejected and contact continues: each call is a FDCPA violation, estimated $12K+ in exposure.',
    dollarAtStake: 12000, criticality: 'critical', status: 'pending', hoursAgo: 1,
    category: 'FDCPA Compliance',
  },
  // Coach
  {
    id: 6, agent: 'Coach', approver: 'Ops Manager',
    decision: 'Agent 6 formal warning — second mini-Miranda violation in 2 weeks',
    details: 'Second compliance violation in 2 weeks. Formal warning required per SOP. Agent completed retraining but HR escalation is needed.',
    businessCase: null,
    counterfactual: 'If not escalated: third violation triggers mandatory suspension per SOP, affecting campaign capacity.',
    dollarAtStake: null, criticality: 'medium', status: 'pending', hoursAgo: 24,
    category: 'HR / Compliance',
  },
  {
    id: 7, agent: 'Coach', approver: 'Ops Manager',
    decision: 'Approve updated objection-handling script for "I already paid" scenario',
    details: 'Coach has drafted a revised script for the "I already paid" objection based on 18 scored calls. 3 agents currently below threshold on this scenario.',
    businessCase: 'Estimated +4% resolution rate on disputed accounts if script adopted · 380 accounts affected · Projected $18K incremental',
    counterfactual: 'If rejected: agents continue with current script, quality scores remain below 85 threshold.',
    dollarAtStake: 18000, criticality: 'medium', status: 'pending', hoursAgo: 36,
    category: 'Training / QA',
  },
  // Analyst
  {
    id: 8, agent: 'Analyst', approver: 'Auto-approved',
    decision: 'Re-score 340 accounts from Low → Medium propensity',
    details: 'Engagement signals (SMS clicks + email opens) indicate higher propensity. Re-scoring complete, cohort assignments updated.',
    businessCase: 'Estimated additional recovery: $42K from re-scored cohort over 4 weeks',
    counterfactual: null,
    dollarAtStake: 42000, criticality: 'low', status: 'auto-approved', hoursAgo: 24,
    category: 'Model Update',
  },
  {
    id: 9, agent: 'Analyst', approver: 'Manager',
    decision: 'Reallocate 1 human agent from Low Prop / Low Bal → Medium Prop cohort',
    details: 'ROI per agent-hour on Low Prop / Low Bal has declined 22% week-over-week. Reallocation to Medium Prop projected to improve overall liquidation rate.',
    businessCase: 'Projected net gain from reallocation: $14K over 2 weeks · Low Prop / Low Bal: email-only maintained at no incremental cost',
    counterfactual: 'If rejected: agent continues working negative-margin cohort, $800 loss continues per week.',
    dollarAtStake: 14000, criticality: 'medium', status: 'pending', hoursAgo: 12,
    category: 'Resource Reallocation',
  },
  // Collector
  {
    id: 10, agent: 'Collector', approver: 'Manager',
    decision: 'Launch WhatsApp outreach for TX/FL Spanish-preference accounts',
    details: '180 accounts in TX/FL with Spanish preference have low response to voice AI and SMS. WhatsApp pilot would test a new channel for this segment.',
    businessCase: 'Pilot: 180 accounts · Projected contact rate: 55% (vs 32% current) · Estimated incremental recovery: $22K',
    counterfactual: 'If rejected: 180 accounts continue on existing channels with 32% contact rate and diminishing returns.',
    dollarAtStake: 22000, criticality: 'low', status: 'pending', hoursAgo: 18,
    category: 'Channel Expansion',
  },
];

const approvalHistory = [
  { date: 'Day 17', agent: 'Manager', decision: 'Settlement offer SMS for 2+ failed PTP accounts',     outcome: 'Approved', criticality: 'high',     turnaround: 1.8, dollarImpact: 36000,  dollarLabel: '$36K recovered' },
  { date: 'Day 15', agent: 'Analyst', decision: 'Reallocation: 2 agents from Low Prop → Medium Prop', outcome: 'Approved', criticality: 'medium',   turnaround: 2.1, dollarImpact: 14000,  dollarLabel: '+$14K projected' },
  { date: 'Day 12', agent: 'Auditor', decision: 'TCPA timezone fix for NY accounts',                  outcome: 'Approved', criticality: 'critical', turnaround: 0.5, dollarImpact: 0,      dollarLabel: 'Risk avoided' },
  { date: 'Day 10', agent: 'Manager', decision: 'Voice AI frequency: 3x → 5x/week High Prop/High Bal',outcome: 'Approved', criticality: 'high',     turnaround: 3.2, dollarImpact: 28000,  dollarLabel: '+$28K projected' },
  { date: 'Day 8',  agent: 'Coach',   decision: 'Spanish SMS campaign for TX/FL cohort',              outcome: 'Approved', criticality: 'medium',   turnaround: 4.0, dollarImpact: 18000,  dollarLabel: '+$18K projected' },
  { date: 'Day 5',  agent: 'Manager', decision: '22% settlement for 8 hardship accounts',             outcome: 'Rejected', criticality: 'high',     turnaround: 6.1, dollarImpact: 0,      dollarLabel: '—' },
  { date: 'Day 3',  agent: 'Analyst', decision: 'Shift medical debt cohort to SMS-first',             outcome: 'Approved', criticality: 'medium',   turnaround: 1.2, dollarImpact: 22000,  dollarLabel: '+$22K projected' },
];

// ── Derived stats helpers ─────────────────────────────────────────────────────

function calcStats(history) {
  const approved = history.filter(h => h.outcome === 'Approved');
  const rejected = history.filter(h => h.outcome === 'Rejected');
  const approvedDollar = approved.reduce((s, h) => s + h.dollarImpact, 0);
  return { approved: approved.length, rejected: rejected.length, approvedDollar };
}


// ── Sub-components ────────────────────────────────────────────────────────────

const CriticalityBadge = ({ level }) => {
  const map = {
    critical: 'bg-red-100 text-red-700',
    high:     'bg-amber-100 text-amber-700',
    medium:   'bg-blue-100 text-blue-700',
    low:      'bg-gray-100 text-gray-500',
  };
  return (
    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${map[level]}`}>
      {level === 'critical' ? 'Critical' : level === 'high' ? 'High' : level === 'medium' ? 'Medium' : 'Low'}
    </span>
  );
};

const ApprovalCard = ({ a, onAgentClick }) => {
  const meta = AGENT_META[a.agent] || AGENT_META.Analyst;
  return (
    <div className={`bg-white rounded-xl border overflow-hidden ${a.criticality === 'critical' ? 'border-red-200' : a.criticality === 'high' ? 'border-amber-200' : 'border-gray-200'}`}>
      <div className="p-5">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-start gap-2 flex-1 min-w-0">
            <span className="inline-block w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: meta.color }} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <button onClick={() => onAgentClick && onAgentClick(a.agent)} className="text-xs font-bold hover:underline" style={{ color: meta.color }}>{a.agent}</button>
                <span className="text-[10px] text-gray-400">{a.hoursAgo < 24 ? `${a.hoursAgo}h ago` : `${Math.round(a.hoursAgo/24)}d ago`}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 font-medium">{a.category}</span>
              </div>
              <p className="text-sm font-semibold text-gray-900 leading-snug">{a.decision}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
            <CriticalityBadge level={a.criticality} />
            {a.dollarAtStake && (
              <span className="text-xs font-bold text-gray-700">${a.dollarAtStake.toLocaleString()} at stake</span>
            )}
          </div>
        </div>

        <p className="text-xs text-gray-500 mb-3 leading-relaxed">{a.details}</p>

        {/* Business case */}
        {a.businessCase && (
          <div className="rounded-lg px-3 py-2.5 mb-2 text-xs" style={{ backgroundColor: '#f0faf8', border: '1px solid #d4eae5' }}>
            <span className="font-bold text-gray-500 uppercase tracking-wider text-[10px]">Business Case · </span>
            <span className="text-gray-700">{a.businessCase}</span>
          </div>
        )}

        {/* Counterfactual */}
        {a.counterfactual && (
          <div className="rounded-lg px-3 py-2.5 mb-3 text-xs bg-red-50 border border-red-100">
            <span className="font-bold text-red-400 uppercase tracking-wider text-[10px]">If Rejected · </span>
            <span className="text-red-700">{a.counterfactual}</span>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-500"><span className="font-medium text-gray-700">From:</span> {a.agent}</span>
          <svg className="w-3.5 h-3.5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          <span className="text-xs text-gray-500"><span className="font-medium text-gray-700">To:</span> {a.approver}</span>
          {a.status === 'pending' && (
            <div className="ml-auto flex gap-2">
              <button className="px-4 py-1.5 text-xs font-bold text-white rounded-full" style={{ background: 'linear-gradient(135deg, #2196af, #61ab5e)' }}>Approve</button>
              <button className="px-4 py-1.5 text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">Reject</button>
            </div>
          )}
          {a.status === 'auto-approved' && (
            <span className="ml-auto text-xs font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">Auto-approved</span>
          )}
        </div>
      </div>
    </div>
  );
};

// ── TAB: Overall ──────────────────────────────────────────────────────────────

function OverallTab({ onAgentClick }) {
  const pending = allApprovals.filter(a => a.status === 'pending');

  return (
    <div className="px-8 py-6 space-y-6">

      {/* All pending — sorted by criticality */}
      <div>
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">All Pending — by Criticality</h2>
        <div className="space-y-3">
          {[...pending]
            .sort((a, b) => {
              const order = { critical: 0, high: 1, medium: 2, low: 3 };
              return order[a.criticality] - order[b.criticality];
            })
            .map(a => <ApprovalCard key={a.id} a={a} onAgentClick={onAgentClick} />)}
        </div>
      </div>
    </div>
  );
}

// ── TAB: Agent-specific ───────────────────────────────────────────────────────

function AgentTab({ agent, onAgentClick }) {
  const meta = AGENT_META[agent];
  const agentApprovals = allApprovals.filter(a => a.agent === agent);
  const pending = agentApprovals.filter(a => a.status === 'pending');
  const resolved = agentApprovals.filter(a => a.status !== 'pending');
  const totalStake = pending.reduce((s, a) => s + (a.dollarAtStake || 0), 0);
  const oldest = pending.length ? Math.max(...pending.map(a => a.hoursAgo)) : 0;
  const agentHistory = approvalHistory.filter(h => h.agent === agent);
  const stats = calcStats(agentHistory);

  // Category breakdown
  const categories = [...new Set(agentApprovals.map(a => a.category))];

  return (
    <div className="px-8 py-6 space-y-6">
      {/* Agent highlights — top row */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Pending Approvals</div>
          <div className="text-3xl font-extrabold" style={{ color: meta.color }}>{pending.length}</div>
          <div className="text-xs text-gray-400 mt-1">Awaiting human sign-off</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">$ At Stake (Pending)</div>
          <div className="text-3xl font-extrabold text-gray-900">{totalStake > 0 ? `$${(totalStake/1000).toFixed(0)}K` : '—'}</div>
          <div className="text-xs text-gray-400 mt-1">Across pending decisions</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Oldest Pending</div>
          <div className="text-3xl font-extrabold text-gray-900">{oldest > 0 ? (oldest >= 24 ? `${Math.round(oldest/24)}d` : `${oldest}h`) : '—'}</div>
          <div className="text-xs text-gray-400 mt-1">Time since raised</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Auto-approved</div>
          <div className="text-3xl font-extrabold text-green-600">{resolved.filter(a => a.status === 'auto-approved').length}</div>
          <div className="text-xs text-gray-400 mt-1">No human action needed</div>
        </div>
      </div>

      {/* Historical decision summary */}
      {agentHistory.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-3">Historical Decisions</div>
          <div className="flex gap-8">
            <div>
              <div className="text-3xl font-extrabold text-gray-900">{stats.approved}</div>
              <div className="mt-1">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(97,171,94,0.1)', color: '#61ab5e', border: '1px solid rgba(97,171,94,0.25)' }}>Approved</span>
              </div>
            </div>
            <div className="w-px bg-gray-100" />
            <div>
              <div className="text-3xl font-extrabold text-gray-900">{stats.rejected}</div>
              <div className="mt-1">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(239,68,68,0.08)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)' }}>Rejected</span>
              </div>
            </div>
            <div className="w-px bg-gray-100" />
            <div>
              <div className="text-3xl font-extrabold text-gray-900">{stats.approvedDollar > 0 ? `$${(stats.approvedDollar/1000).toFixed(0)}K` : '—'}</div>
              <div className="mt-1">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(33,150,175,0.08)', color: '#2196af', border: '1px solid rgba(33,150,175,0.2)' }}>$ Unlocked</span>
              </div>
            </div>
          </div>
          {(stats.approved + stats.rejected) > 0 && (
            <>
              <div className="mt-4 h-2 rounded-full bg-gray-100 overflow-hidden">
                <div className="h-2 rounded-full" style={{ backgroundColor: '#2196af', width: `${(stats.approved / (stats.approved + stats.rejected)) * 100}%` }} />
              </div>
              <div className="text-xs text-gray-400 mt-1">{Math.round((stats.approved / (stats.approved + stats.rejected)) * 100)}% approval rate · {stats.approved + stats.rejected} total decisions</div>
            </>
          )}
        </div>
      )}

      {/* Categories */}
      {categories.length > 1 && (
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Approval Categories</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => {
              const catCount = agentApprovals.filter(a => a.category === cat).length;
              return (
                <div key={cat} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold" style={{ backgroundColor: `${meta.color}15`, color: meta.color, border: `1px solid ${meta.color}30` }}>
                  {cat} · {catCount}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Pending approvals */}
      {pending.length > 0 && (
        <div>
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Pending Approvals</h2>
          <div className="space-y-3">
            {[...pending].sort((a,b) => {
              const order = { critical: 0, high: 1, medium: 2, low: 3 };
              return order[a.criticality] - order[b.criticality];
            }).map(a => <ApprovalCard key={a.id} a={a} onAgentClick={onAgentClick} />)}
          </div>
        </div>
      )}

      {/* Auto-approved / resolved */}
      {resolved.length > 0 && (
        <div>
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Auto-Approved</h2>
          <div className="space-y-3">
            {resolved.map(a => <ApprovalCard key={a.id} a={a} onAgentClick={onAgentClick} />)}
          </div>
        </div>
      )}

      {pending.length === 0 && resolved.length === 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-10 text-center">
          <div className="text-gray-400 text-sm">No approvals from {agent} yet</div>
        </div>
      )}

    </div>
  );
}

// ── TABS config ───────────────────────────────────────────────────────────────

const TABS = [
  { id: 'overall',   label: 'Overall' },
  { id: 'Manager',   label: 'Manager' },
  { id: 'Auditor',   label: 'Auditor' },
  { id: 'Coach',     label: 'Coach' },
  { id: 'Analyst',   label: 'Analyst' },
  { id: 'Collector', label: 'Collector' },
];

// ── Main Component ────────────────────────────────────────────────────────────

export default function Approvals({ onAgentClick }) {
  const [activeTab, setActiveTab] = React.useState('overall');

  const pending = allApprovals.filter(a => a.status === 'pending');
  const totalStake = pending.reduce((s, a) => s + (a.dollarAtStake || 0), 0);
  const critical = pending.filter(a => a.criticality === 'critical').length;

  return (
    <div className="min-h-full bg-gray-50">

      {/* ── HERO STRIP ───────────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-200 px-8 pt-8 pb-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Approvals</h1>
            <p className="text-sm text-gray-500 mt-0.5">Human-in-the-loop review · Apex Recovery Partners · Day 18</p>
          </div>
          {critical > 0 && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-200">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              {critical} critical approval{critical > 1 ? 's' : ''} need immediate action
            </span>
          )}
        </div>

        {/* Hero cards */}
        <div className="grid grid-cols-4 gap-5">
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Potential Gain</div>
            <div className="text-4xl font-extrabold text-gray-900">$847K</div>
            <div className="text-xs text-gray-400 mt-1">Across {pending.length} pending decisions</div>
            <div className="text-xs font-semibold mt-1" style={{ color: '#2196af' }}>↑ Act now to capture</div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Critical Pending</div>
            <div className="text-4xl font-extrabold text-gray-900">{critical}</div>
            <div className="text-xs text-gray-400 mt-1">Immediate action required</div>
            <div className="mt-1">
              <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(239,68,68,0.08)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)' }}>
                ${pending.filter(a=>a.criticality==='critical').reduce((s,a)=>s+(a.dollarAtStake||0),0).toLocaleString()} potential gain
              </span>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Total Pending</div>
            <div className="text-4xl font-extrabold text-gray-900">{pending.length}</div>
            <div className="text-xs text-gray-400 mt-1">Awaiting human sign-off</div>
            <div className="mt-1">
              <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(33,150,175,0.08)', color: '#2196af', border: '1px solid rgba(33,150,175,0.2)' }}>
                $847K potential gain
              </span>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">$ Unlocked by Approvals</div>
            <div className="text-4xl font-extrabold text-gray-900">$118K</div>
            <div className="text-xs text-gray-400 mt-1">6 approved · 1 rejected this placement</div>
            <div className="mt-1">
              <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(97,171,94,0.1)', color: '#61ab5e', border: '1px solid rgba(97,171,94,0.25)' }}>
                ↑ Recovered or projected
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── TAB BAR ──────────────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-200 px-8">
        <div className="flex gap-0">
          {TABS.map(tab => {
            const tabPending = tab.id === 'overall'
              ? pending.length
              : pending.filter(a => a.agent === tab.id).length;
            const meta = AGENT_META[tab.id];
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                  isActive ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                {meta && <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: isActive ? meta.color : '#9ca3af' }} />}
                {tab.label}
                {tabPending > 0 && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ml-0.5 ${isActive ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>
                    {tabPending}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── TAB CONTENT ──────────────────────────────────────────────────────── */}
      {activeTab === 'overall'   && <OverallTab onAgentClick={onAgentClick} />}
      {activeTab === 'Manager'   && <AgentTab agent="Manager"   onAgentClick={onAgentClick} />}
      {activeTab === 'Auditor'   && <AgentTab agent="Auditor"   onAgentClick={onAgentClick} />}
      {activeTab === 'Coach'     && <AgentTab agent="Coach"     onAgentClick={onAgentClick} />}
      {activeTab === 'Analyst'   && <AgentTab agent="Analyst"   onAgentClick={onAgentClick} />}
      {activeTab === 'Collector' && <AgentTab agent="Collector" onAgentClick={onAgentClick} />}

    </div>
  );
}
