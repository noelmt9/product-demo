import { collectorData } from '../data';
import { AgentHeader, Section } from './shared';

export default function CollectorAgent() {
  return (
    <div className="p-8 bg-gray-50">
      <AgentHeader
        color="#f59e0b"
        name="Collector"
        role="Multichannel Execution"
        description="The operational nerve center. Manages all active campaign delivery across channels — Voice AI bots, human agent queues, SMS sends, email sequences, WhatsApp. Handles inbound (payment bots, live transfers, email/website collections). Coordinates with human agent operations (1st party collections). Tracks delivery metrics in real time and ensures campaigns run on schedule within compliance windows."
      />

      <Section title="Skills" className="mb-6">
        <div className="grid grid-cols-2 gap-x-6 gap-y-2">
          {collectorData.skills.map((skill, idx) => (
            <div key={idx} className="text-sm text-gray-700">• {skill}</div>
          ))}
        </div>
      </Section>

      <Section title="Active Campaigns" className="mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left py-2 px-3 text-xs font-semibold uppercase tracking-wide text-gray-600">Campaign</th>
              <th className="text-left py-2 px-3 text-xs font-semibold uppercase tracking-wide text-gray-600">Channel</th>
              <th className="text-left py-2 px-3 text-xs font-semibold uppercase tracking-wide text-gray-600">Cohort</th>
              <th className="text-right py-2 px-3 text-xs font-semibold uppercase tracking-wide text-gray-600">Daily Volume</th>
              <th className="text-left py-2 px-3 text-xs font-semibold uppercase tracking-wide text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {collectorData.activeCampaigns.map((campaign, idx) => (
              <tr key={idx} className="border-b border-gray-100 last:border-0">
                <td className="py-2 px-3 font-medium text-gray-900">{campaign.name}</td>
                <td className="py-2 px-3 text-gray-700">{campaign.channel}</td>
                <td className="py-2 px-3 text-gray-700">{campaign.cohort}</td>
                <td className="py-2 px-3 text-right text-gray-700 text-numeric">{campaign.volume}</td>
                <td className="py-2 px-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-gray-700">{campaign.status}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      <Section title="Inbound Operations" className="mb-6">
        <div className="space-y-1.5">
          {collectorData.inboundOps.map((op, idx) => (
            <p key={idx} className="text-sm text-gray-700">• {op}</p>
          ))}
        </div>
      </Section>

      <Section title="Today's Delivery Summary" className="mb-6">
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

      <Section title="Configuration / SOP">
        <div className="space-y-1.5">
          {collectorData.configuration.map((config, idx) => (
            <p key={idx} className="text-sm text-gray-700">• {config}</p>
          ))}
        </div>
      </Section>
    </div>
  );
}
