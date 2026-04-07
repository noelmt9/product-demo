import { teamLeadData, collectorData } from '../data';
import { Section } from './shared';

export default function Campaigns() {
  return (
    <div className="p-8 bg-gray-50">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Campaigns</h1>
        <p className="text-sm text-gray-600 mt-1">Campaign strategy, active operations, and delivery performance</p>
      </div>

      {/* Today's Summary */}
      <Section title="Today's Summary" className="mb-6">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Total Touchpoints</p>
          <p className="text-3xl font-semibold text-gray-900 text-numeric">{collectorData.todayDelivery.totalTouchpoints.toLocaleString()}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 border border-gray-200 rounded">
            <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Voice AI</p>
            <p className="text-xl font-semibold text-gray-900 mb-1 text-numeric">{collectorData.todayDelivery.voiceAI.calls} calls</p>
            <p className="text-sm text-gray-700 text-numeric">{collectorData.todayDelivery.voiceAI.connections} connections ({collectorData.todayDelivery.voiceAI.rate}%)</p>
          </div>

          <div className="p-4 bg-gray-50 border border-gray-200 rounded">
            <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Human Agents</p>
            <p className="text-xl font-semibold text-gray-900 mb-1 text-numeric">{collectorData.todayDelivery.humanAgents.calls} calls</p>
            <p className="text-sm text-gray-700 text-numeric">{collectorData.todayDelivery.humanAgents.connections} connections ({collectorData.todayDelivery.humanAgents.rate}%)</p>
          </div>

          <div className="p-4 bg-gray-50 border border-gray-200 rounded">
            <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">SMS</p>
            <p className="text-xl font-semibold text-gray-900 mb-1 text-numeric">{collectorData.todayDelivery.sms.sends} sends</p>
            <p className="text-sm text-gray-700 text-numeric">{collectorData.todayDelivery.sms.opens} opens ({collectorData.todayDelivery.sms.openRate}%), {collectorData.todayDelivery.sms.clicks} clicks ({collectorData.todayDelivery.sms.clickRate}%)</p>
          </div>

          <div className="p-4 bg-gray-50 border border-gray-200 rounded">
            <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Email</p>
            <p className="text-xl font-semibold text-gray-900 mb-1 text-numeric">{collectorData.todayDelivery.email.sends} sends</p>
            <p className="text-sm text-gray-700 text-numeric">{collectorData.todayDelivery.email.opens} opens ({collectorData.todayDelivery.email.openRate}%), {collectorData.todayDelivery.email.clicks} clicks ({collectorData.todayDelivery.email.clickRate}%)</p>
          </div>
        </div>
      </Section>

      {/* Active Campaigns - Full Width Cards */}
      <Section title="Active Campaigns" className="mb-6">
        <div className="space-y-3 mb-4">
          {collectorData.activeCampaigns.map((campaign, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-xs text-gray-700">{campaign.status}</span>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-900 mb-0.5">{campaign.name}</h3>
                    <p className="text-xs text-gray-600">{campaign.channel}</p>
                  </div>

                  <div className="flex items-center gap-8">
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Target Cohort</p>
                      <p className="text-sm text-gray-900">{campaign.cohort}</p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Daily Volume</p>
                      <p className="text-sm font-medium text-gray-900">{campaign.volume}</p>
                    </div>
                  </div>
                </div>

                <button className="ml-4 text-sm text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">Showing 9 of 9 campaigns</p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-sm border border-gray-200 rounded text-gray-400 cursor-not-allowed">
              Previous
            </button>
            <button className="px-3 py-1.5 text-sm border border-gray-300 rounded bg-white text-gray-900 font-medium">
              1
            </button>
            <button className="px-3 py-1.5 text-sm border border-gray-200 rounded text-gray-400 cursor-not-allowed">
              Next
            </button>
          </div>
        </div>
      </Section>

      {/* Strategy Change Log */}
      <Section title="Strategy Change Log">
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
    </div>
  );
}
