import { complianceData } from '../data';
import { AgentHeader, Section, DataTable } from './shared';

export default function ComplianceAgent() {
  return (
    <div className="p-8 bg-gray-50">
      <AgentHeader
        color="#ef4444"
        name="Compliance"
        role="Regulatory & Guardrails"
        description="Ensures every consumer interaction meets regulatory requirements (FDCPA, TCPA, state-specific rules) and client brand guidelines. Sets pre-launch guardrails for Team Lead's campaign design. Audits live conversations across all channels. Flags potential violations, generates compliance reports for client examiners."
      />

      <Section title="Skills" className="mb-6">
        <div className="grid grid-cols-2 gap-x-6 gap-y-2">
          {complianceData.skills.map((skill, idx) => (
            <div key={idx} className="text-sm text-gray-700">• {skill}</div>
          ))}
        </div>
      </Section>

      <Section title="This Week's Summary" className="mb-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Conversations Audited</p>
            <p className="text-2xl font-semibold text-gray-900 text-numeric">{complianceData.weekSummary.audited.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Flags Raised</p>
            <p className="text-2xl font-semibold text-gray-900 text-numeric">{complianceData.weekSummary.flagsRaised}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Flags Resolved</p>
            <p className="text-2xl font-semibold text-green-600 text-numeric">{complianceData.weekSummary.flagsResolved}/{complianceData.weekSummary.flagsRaised}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Avg Resolution Time</p>
            <p className="text-2xl font-semibold text-gray-900">{complianceData.weekSummary.avgResolutionTime}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Compliance Score</p>
            <p className="text-2xl font-semibold text-green-600 text-numeric">{complianceData.weekSummary.complianceScore}%</p>
          </div>
        </div>
      </Section>

      <Section title="Flagged Issues Detail" className="mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left py-2 px-3 text-xs font-semibold uppercase tracking-wide text-gray-600">#</th>
              <th className="text-left py-2 px-3 text-xs font-semibold uppercase tracking-wide text-gray-600">Type</th>
              <th className="text-left py-2 px-3 text-xs font-semibold uppercase tracking-wide text-gray-600">Description</th>
              <th className="text-left py-2 px-3 text-xs font-semibold uppercase tracking-wide text-gray-600">Channel</th>
              <th className="text-left py-2 px-3 text-xs font-semibold uppercase tracking-wide text-gray-600">Agent Type</th>
              <th className="text-left py-2 px-3 text-xs font-semibold uppercase tracking-wide text-gray-600">Status</th>
              <th className="text-left py-2 px-3 text-xs font-semibold uppercase tracking-wide text-gray-600">Corrective Action</th>
            </tr>
          </thead>
          <tbody>
            {complianceData.flags.map((flag) => (
              <tr key={flag.id} className="border-b border-gray-100 last:border-0">
                <td className="py-2 px-3 text-gray-700">{flag.id}</td>
                <td className="py-2 px-3">
                  <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded ${
                    flag.type === 'FDCPA'
                      ? 'text-orange-700 bg-orange-50 border border-orange-200'
                      : 'text-red-700 bg-red-50 border border-red-200'
                  }`}>
                    {flag.type}
                  </span>
                </td>
                <td className="py-2 px-3 text-gray-700">{flag.description}</td>
                <td className="py-2 px-3 text-gray-700">{flag.channel}</td>
                <td className="py-2 px-3 text-gray-700">{flag.agentType}</td>
                <td className="py-2 px-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-gray-700">{flag.status}</span>
                  </div>
                </td>
                <td className="py-2 px-3 text-gray-700">{flag.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      <Section title="Configuration / SOP">
        <div className="space-y-1.5">
          {complianceData.configuration.map((config, idx) => (
            <p key={idx} className="text-sm text-gray-700">• {config}</p>
          ))}
        </div>
      </Section>
    </div>
  );
}
