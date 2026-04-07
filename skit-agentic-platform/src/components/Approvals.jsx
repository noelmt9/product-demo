import { Section } from './shared';

const pendingApprovals = [
  {
    id: 1,
    agent: 'Manager',
    agentColor: '#8b5cf6',
    decision: 'New Spanish SMS template pending approval',
    requester: 'Manager',
    approver: 'Compliance',
    status: 'pending',
    timestamp: '2 hours ago',
    details: 'New SMS content variant for TX/FL Spanish-preference cohort. Requires compliance review before deployment.'
  },
  {
    id: 2,
    agent: 'Analyst',
    agentColor: '#3b82f6',
    decision: 'Reallocate 2 agents from Low Prop to Medium Prop',
    requester: 'Analyst',
    approver: 'Manager',
    status: 'pending',
    timestamp: '4 hours ago',
    details: 'Low propensity cohort showing diminishing returns. Recommend shifting resources to medium propensity for better ROI.'
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
    details: '45 high-balance accounts (avg $4,800) showing settlement interest. 20% discount could recover $216K vs standard 15%.'
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
    details: 'Second compliance violation in 2 weeks. Formal warning required per SOP. Agent completed retraining but needs escalation.'
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
    details: 'Engagement signals (SMS clicks + email opens) indicate higher propensity. Re-scoring complete, cohort assignments updated.'
  }
];

export default function Approvals({ onAgentClick }) {
  return (
    <div className="p-8 bg-gray-50">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Approvals</h1>
        <p className="text-sm text-gray-600 mt-1">Human-in-the-loop review and sign-off</p>
      </div>

      {/* Pending Count */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Pending approvals</p>
            <p className="text-2xl font-semibold text-gray-900 mt-1">{pendingApprovals.filter(a => a.status === 'pending').length}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
            <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Approvals List */}
      <Section title="Approval Queue">
        <div className="space-y-4">
          {pendingApprovals.map((approval) => (
            <div key={approval.id} className="border border-gray-200 rounded-lg p-5 bg-white hover:shadow-sm transition-shadow">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3 flex-1">
                  <span
                    className="inline-block w-2 h-2 rounded-full mt-1.5"
                    style={{ backgroundColor: approval.agentColor }}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <button
                        onClick={() => onAgentClick && onAgentClick(approval.agent)}
                        className="text-sm font-semibold text-gray-900 hover:text-blue-600"
                      >
                        {approval.agent}
                      </button>
                      <span className="text-xs text-gray-500">• {approval.timestamp}</span>
                    </div>
                    <p className="text-base font-medium text-gray-900 mb-2">{approval.decision}</p>
                    <p className="text-sm text-gray-600">{approval.details}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded ${
                  approval.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                  approval.status === 'auto-approved' ? 'bg-green-100 text-green-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {approval.status === 'pending' ? 'Pending' :
                   approval.status === 'auto-approved' ? 'Auto-approved' :
                   approval.status}
                </span>
              </div>

              {/* Approval Flow */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <div className="text-xs text-gray-600">
                  <span className="font-medium">Requested by:</span> {approval.requester}
                </div>
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <div className="text-xs text-gray-600">
                  <span className="font-medium">Approver:</span> {approval.approver}
                </div>
                {approval.status === 'pending' && (
                  <div className="ml-auto flex gap-2">
                    <button className="px-3 py-1.5 text-xs font-medium text-green-700 bg-green-50 hover:bg-green-100 border border-green-200 rounded transition-colors">
                      Approve
                    </button>
                    <button className="px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded transition-colors">
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
