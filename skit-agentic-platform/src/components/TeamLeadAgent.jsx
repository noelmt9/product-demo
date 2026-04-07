import { teamLeadData } from '../data';
import { AgentHeader, Section, DataTable } from './shared';

export default function TeamLeadAgent() {
  return (
    <div className="p-8 bg-gray-50">
      <AgentHeader
        color="#8b5cf6"
        name="Team Lead"
        role="Campaign Strategy & Optimization"
        description="Designs and optimizes the campaign strategy per cohort — which channels, what content, what offers and schemes, what cadence, what timing. Reviews Analyst's performance data daily and recommends adjustments to maximize outcomes within compliance guardrails. Owns the 3C framework: Channel, Content, Cadence."
      />

      <Section title="Skills" className="mb-6">
        <div className="grid grid-cols-2 gap-x-6 gap-y-2">
          {teamLeadData.skills.map((skill, idx) => (
            <div key={idx} className="text-sm text-gray-700">• {skill}</div>
          ))}
        </div>
      </Section>

      <Section title="Current Campaign Calendar" className="mb-6">
        <DataTable
          headers={['Cohort', 'Voice AI', 'Human Agent', 'SMS', 'Email']}
          rows={teamLeadData.campaignCalendar.map(row => [
            row.cohort, row.voiceAI, row.humanAgent, row.sms, row.email
          ])}
        />
      </Section>

      <Section title="Active Content Variants" className="mb-6">
        <div className="space-y-1.5">
          {teamLeadData.contentVariants.map((variant, idx) => (
            <p key={idx} className="text-sm text-gray-700">• {variant}</p>
          ))}
        </div>
      </Section>

      <Section title="Strategy Change Log" className="mb-6">
        <div className="space-y-3">
          {teamLeadData.strategyChanges.map((change, idx) => (
            <div key={idx} className="p-3 bg-gray-50 border border-gray-200 rounded">
              <div className="flex items-start gap-3 mb-2">
                <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium text-purple-700 bg-purple-50 border border-purple-200 rounded">
                  Day {change.day}
                </span>
                <p className="font-medium text-gray-900 text-sm flex-1">{change.change}</p>
              </div>
              <div className="ml-14 space-y-1">
                <p className="text-xs text-gray-600"><span className="font-medium">Trigger:</span> {change.trigger}</p>
                <p className="text-xs text-gray-600"><span className="font-medium">Impact:</span> {change.impact}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Configuration / SOP">
        <div className="space-y-1.5">
          {teamLeadData.configuration.map((config, idx) => (
            <p key={idx} className="text-sm text-gray-700">• {config}</p>
          ))}
        </div>
      </Section>
    </div>
  );
}
