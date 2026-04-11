import { analystData, teamLeadData, complianceData, coachData, collectorData } from '../data';

const agentDataMap = {
  'Analyst': { data: analystData, color: '#3b82f6', role: 'Context, Modeling & Performance' },
  'Manager': { data: teamLeadData, color: '#8b5cf6', role: 'Campaign Strategy & Optimization' },
  'Auditor': { data: complianceData, color: '#ef4444', role: 'Regulatory & Guardrails' },
  'Coach': { data: coachData, color: '#06b6d4', role: 'Quality & Training' },
  'Collector': { data: collectorData, color: '#f59e0b', role: 'Multichannel Execution' }
};

const mockDocuments = {
  'Analyst': [
    { name: 'Portfolio_Scoring_Model_v2.3.pdf', size: '2.4 MB', type: 'pdf' },
    { name: 'Cohort_Segmentation_Rules.xlsx', size: '156 KB', type: 'excel' },
    { name: 'KPI_Benchmarks_2025.pdf', size: '890 KB', type: 'pdf' }
  ],
  'Manager': [
    { name: 'Campaign_Strategy_Playbook.pdf', size: '3.1 MB', type: 'pdf' },
    { name: 'Content_Library_Templates.docx', size: '1.2 MB', type: 'word' },
    { name: 'Channel_Cadence_Matrix.xlsx', size: '245 KB', type: 'excel' }
  ],
  'Auditor': [
    { name: 'FDCPA_Compliance_Guide_2025.pdf', size: '4.2 MB', type: 'pdf' },
    { name: 'State_Regulations_Summary.pdf', size: '1.8 MB', type: 'pdf' },
    { name: 'TCPA_Rules_Reference.pdf', size: '920 KB', type: 'pdf' }
  ],
  'Coach': [
    { name: 'Quality_Scoring_Rubric_v3.pdf', size: '1.1 MB', type: 'pdf' },
    { name: 'Training_Curriculum_Q1_2025.pptx', size: '5.6 MB', type: 'ppt' },
    { name: 'Objection_Handling_Scripts.docx', size: '680 KB', type: 'word' }
  ],
  'Collector': [
    { name: 'Multi-Channel_Delivery_SOP.pdf', size: '2.8 MB', type: 'pdf' },
    { name: 'Campaign_Scheduling_Rules.xlsx', size: '310 KB', type: 'excel' },
    { name: 'Escalation_Workflow.pdf', size: '1.4 MB', type: 'pdf' }
  ]
};

const getFileIcon = (type) => {
  switch (type) {
    case 'pdf':
      return (
        <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 18h12V6h-4V2H4v16zm-2 1V0h10l4 4v16H2v-1z"/>
        </svg>
      );
    case 'excel':
      return (
        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 2h12a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2zm8 2v4h4V4h-4zM4 4v4h4V4H4zm0 6v4h4v-4H4zm8 0v4h4v-4h-4z"/>
        </svg>
      );
    case 'word':
      return (
        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 2h8l4 4v10a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2z"/>
        </svg>
      );
    case 'ppt':
      return (
        <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 2h8l4 4v10a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2z"/>
        </svg>
      );
    default:
      return (
        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
  }
};

export default function AgentPanel({ agent, onClose }) {
  const agentInfo = agentDataMap[agent];
  if (!agentInfo) return null;

  const { data, color, role } = agentInfo;
  const documents = mockDocuments[agent] || [];

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/20 z-40"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed top-0 right-0 bottom-0 w-[600px] bg-white shadow-2xl z-50 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4" style={{ borderColor: '#dee2e6' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
              <div>
                <h2 className="text-lg font-semibold text-gray-900">{agent}</h2>
                <p className="text-sm text-gray-600">{role}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Skills */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Skills</h3>
            <div className="space-y-1.5">
              {data.skills.map((skill, idx) => (
                <p key={idx} className="text-sm text-gray-700">• {skill}</p>
              ))}
            </div>
          </div>

          {/* Activity Log */}
          {data.activityLog && (
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Recent Activity</h3>
              <div className="space-y-2">
                {data.activityLog.map((log, idx) => (
                  <div key={idx} className="flex gap-3 text-sm">
                    <span className="text-gray-500 w-12 flex-shrink-0">Day {log.day}</span>
                    <p className="text-gray-700 flex-1">{log.action}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Configuration */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-900">Configuration / SOP</h3>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors" style={{ color: '#4c6ef5', border: '1px solid #dee2e6' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f8f9fa'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Document
              </button>
            </div>

            {/* Document List */}
            <div className="mb-4 space-y-2">
              {documents.map((doc, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-lg transition-colors cursor-pointer group"
                  style={{ backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                >
                  <div className="flex-shrink-0">
                    {getFileIcon(doc.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{doc.name}</p>
                    <p className="text-xs text-gray-500">{doc.size}</p>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1 hover:bg-gray-200 rounded">
                      <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button className="p-1 hover:bg-gray-200 rounded">
                      <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Configuration Text */}
            <div className="pt-4 border-t" style={{ borderColor: '#dee2e6' }}>
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Active Configuration</p>
              <div className="space-y-1.5">
                {data.configuration.map((config, idx) => (
                  <p key={idx} className="text-sm text-gray-700">• {config}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
