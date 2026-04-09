import { Section } from './shared';

const pendingApprovals = [
  {
    id: 1,
    agent: 'Manager',
    agentColor: '#8b5cf6',
    decision: 'Agent Settlement Protocol: $12K',
    requester: 'Manager',
    approver: 'Auditor',
    status: 'pending',
    timestamp: '2 hours ago',
    details: 'Recovery Agent has initiated a new settlement protocol for the Southwest Residential Portfolio. The proposed settlement is $12,475 currently at 4-day delinquency.',
    businessCase: 'Expected recovery: $216K. Settlement cost: $43K discount. Net gain: $173K. Each week of delay costs ~$2-3K in recovery probability.',
    counterfactual: 'If rejected: accounts age 30+ days, reducing recovery probability by ~40% ($86K at risk).'
  },
  {
    id: 2,
    agent: 'Auditor',
    agentColor: '#ef4444',
    decision: 'Compliance Buffer Expansion',
    requester: 'Auditor',
    approver: 'Manager',
    status: 'pending',
    timestamp: '4 hours ago',
    details: 'Compliance System recently updated its risk parameters for this account category in the northeast region. The system recommends expanding the compliance buffer from 3% to 5%.',
    businessCase: 'Covers 1,200 additional accounts. Prevents estimated $64,500 in potential violation exposure.',
    counterfactual: 'If rejected: current 3% buffer leaves 340 accounts in gray zone where state-specific rules may trigger violations.'
  },
  {
    id: 3,
    agent: 'Manager',
    agentColor: '#8b5cf6',
    decision: 'Settlement offer at 20% discount exceeds pre-approved 15% threshold',
    requester: 'Manager',
    approver: 'Client',
    status: 'pending',
    timestamp: '6 hours ago',
    details: '45 high-balance accounts (avg $4,800) showing settlement interest. 20% discount could recover $216K vs standard 15%.',
    businessCase: '45 accounts, projected recovery at 20%: $216K vs $180K at 15%. Net incremental: $36K.',
    counterfactual: 'If rejected: English-only continues at 34% contact rate. 620 accounts remain unworked.'
  },
  {
    id: 4,
    agent: 'Coach',
    agentColor: '#06b6d4',
    decision: 'Agent 6 formal warning — second mini-Miranda violation',
    requester: 'Coach',
    approver: 'Ops Manager',
    status: 'pending',
    timestamp: '1 day ago',
    details: 'Second compliance violation in 2 weeks. Formal warning required per SOP. Agent completed retraining but needs escalation.',
    businessCase: null,
    counterfactual: null
  },
  {
    id: 5,
    agent: 'Analyst',
    agentColor: '#3b82f6',
    decision: 'Re-score 340 accounts from Low to Medium propensity',
    requester: 'Analyst',
    approver: 'Auto-approved',
    status: 'auto-approved',
    timestamp: '1 day ago',
    details: 'Engagement signals (SMS clicks + email opens) indicate higher propensity. Re-scoring complete, cohort assignments updated.',
    businessCase: null,
    counterfactual: null
  }
];

const lostOpportunities = [
  {
    category: "Installment Request Unresolved",
    count: 14,
    description: "Consumer asked for installment plan but wasn't offered one",
    color: "amber",
    action: "Queue for human agent callback with plan offer"
  },
  {
    category: "Talk to Spouse Unresolved",
    count: 8,
    description: "Consumer deferred decision without a follow-up scheduled",
    color: "amber",
    action: "Schedule callback in 48h with SMS reminder"
  },
  {
    category: "Written Validation Pending",
    count: 6,
    description: "Consumer requested written validation — no response sent yet",
    color: "red",
    action: "Compliance to send validation letter within 5 days (FDCPA)"
  },
  {
    category: "Voice Unresolved",
    count: 23,
    description: "Voice contact made, no resolution or disposition captured",
    color: "amber",
    action: "Analyst flagged for re-attempt next cycle"
  }
];

export default function Approvals({ onAgentClick }) {
  return (
    <div className="p-8 bg-gray-50">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Approvals Workflow</h1>
        <p className="text-sm text-gray-600 mt-1">Human-in-the-loop review and sign-off</p>
      </div>

      {/* At-Risk PTP + Turnaround Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-red-200 rounded-lg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-red-600 mb-2">At-Risk PTP Value</p>
          <p className="text-2xl font-bold text-red-600">$142,000</p>
          <p className="text-xs text-gray-500 mt-1">PTPs at risk of being broken</p>
          <p className="text-xs text-gray-400 mt-1">Missed 1st installment</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Broken PTP Accounts</p>
          <p className="text-2xl font-bold text-amber-600">89</p>
          <p className="text-xs text-gray-500 mt-1">Missed installment on active plan</p>
          <p className="text-xs text-gray-400 mt-1">620 total broken PTPs this placement</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Pending Approvals</p>
          <p className="text-2xl font-bold text-amber-600">{pendingApprovals.filter(a => a.status === 'pending').length}</p>
          <p className="text-xs text-gray-500 mt-1">Awaiting human sign-off</p>
          <p className="text-xs text-gray-400 mt-1">Total $ at stake: $295K</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Avg Approval Turnaround</p>
          <p className="text-2xl font-bold text-gray-900">3.2 hrs</p>
          <p className="text-xs text-gray-500 mt-1">Avg time to act on approval</p>
          <p className="text-xs text-green-500 mt-1">↓ 1.4 hrs faster than last week</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Approvals List — 2 cols */}
        <div className="col-span-2 space-y-4">
          {pendingApprovals.map((approval) => (
            <div key={approval.id} className="border border-gray-200 rounded-lg p-5 bg-white hover:shadow-sm transition-shadow">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3 flex-1">
                  <span className="inline-block w-2 h-2 rounded-full mt-1.5" style={{ backgroundColor: approval.agentColor }} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <button onClick={() => onAgentClick && onAgentClick(approval.agent)} className="text-sm font-semibold text-gray-900 hover:text-blue-600">{approval.agent}</button>
                      <span className="text-xs text-gray-500">• {approval.timestamp}</span>
                    </div>
                    <p className="text-base font-medium text-gray-900 mb-2">{approval.decision}</p>
                    <p className="text-sm text-gray-600">{approval.details}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded flex-shrink-0 ${
                  approval.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                  approval.status === 'auto-approved' ? 'bg-green-100 text-green-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {approval.status === 'pending' ? 'Pending' : approval.status === 'auto-approved' ? 'Auto-approved' : approval.status}
                </span>
              </div>

              {/* Business Case */}
              {approval.businessCase && (
                <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 mb-3">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Business Case</p>
                  <p className="text-sm text-gray-700">{approval.businessCase}</p>
                </div>
              )}

              {/* Counterfactual */}
              {approval.counterfactual && (
                <div className="bg-red-50 border border-red-100 rounded-lg p-3 mb-3">
                  <p className="text-xs font-bold text-red-400 uppercase tracking-wider mb-1">If Rejected</p>
                  <p className="text-sm text-red-700">{approval.counterfactual}</p>
                </div>
              )}

              {/* Approval Flow */}
              <div className="flex items-center gap-4 pt-3 border-t border-gray-100">
                <div className="text-xs text-gray-600"><span className="font-medium">From:</span> {approval.requester}</div>
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                <div className="text-xs text-gray-600"><span className="font-medium">To:</span> {approval.approver}</div>
                {approval.status === 'pending' && (
                  <div className="ml-auto flex gap-2">
                    <button className="px-4 py-1.5 text-xs font-bold text-white rounded-full" style={{background: 'linear-gradient(135deg, #3BA7F6, #5FCFC4)'}}>Approve</button>
                    <button className="px-4 py-1.5 text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">Reject</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="rounded-xl p-5 text-white" style={{background: 'linear-gradient(135deg, #162A44, #1e3a5f)'}}>
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-sm">rocket_launch</span>
              <span className="text-xs font-bold uppercase tracking-widest" style={{color: '#5FCFC4'}}>Upsell Opportunity</span>
            </div>
            <h3 className="text-lg font-bold mb-2">Auto-finance &lt;$3K outperforming by 1.6x</h3>
            <p className="text-sm text-slate-300 mb-4">Client has 22,000 similar accounts in-house. Projected incremental recovery: $205K over 60 days.</p>
            <button className="w-full px-4 py-2 rounded-lg text-sm font-bold" style={{background: 'linear-gradient(135deg, #3BA7F6, #5FCFC4)', color: 'white'}}>Review & Send</button>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Quick Stats</h4>
            <div className="space-y-3">
              <div className="flex justify-between text-sm"><span className="text-gray-500">Pending</span><span className="font-bold text-amber-600">{pendingApprovals.filter(a => a.status === 'pending').length}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Auto-approved</span><span className="font-bold text-green-600">{pendingApprovals.filter(a => a.status === 'auto-approved').length}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Total $ at stake</span><span className="font-bold">$295K</span></div>
            </div>
          </div>

          {/* Lost Opportunities */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Lost Opportunities</h4>
            <p className="text-xs text-gray-400 mb-4">Accounts with intent signals that went unresolved</p>
            <div className="space-y-3">
              {lostOpportunities.map((opp, idx) => (
                <div key={idx} className="border border-gray-100 rounded-lg p-3">
                  <div className="flex items-start justify-between mb-1">
                    <span className="text-xs font-semibold text-gray-800 leading-tight flex-1 pr-2">{opp.category}</span>
                    <span className={`text-sm font-bold flex-shrink-0 ${opp.color === 'red' ? 'text-red-600' : 'text-amber-600'}`}>
                      {opp.count}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">{opp.description}</p>
                  <div className={`text-[10px] font-medium px-2 py-1 rounded ${
                    opp.color === 'red' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'
                  }`}>
                    → {opp.action}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between text-xs text-gray-500">
              <span>Total unresolved</span>
              <span className="font-bold text-gray-800">{lostOpportunities.reduce((s, o) => s + o.count, 0)} accounts</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
