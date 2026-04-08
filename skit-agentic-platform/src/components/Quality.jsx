import { useState } from 'react';
import { complianceData, coachData } from '../data';
import { Section } from './shared';

const agentColors = {
  'Collector': '#f59e0b',
  'Compliance': '#ef4444',
  'Manager': '#8b5cf6'
};

const improvementCases = [
  {
    id: 'objection-handling',
    title: 'Objection Handling — "I already paid this"',
    status: 'Fix deployed',
    statusColor: 'bg-emerald-600',
    source: '142 scored calls this week. 3 agents (Agent 4, 5, 6) failing on this objection consistently.',
    diagnosis: 'Agents go silent for 4-5 seconds after the objection, then repeat the balance amount. Consumer perceives this as dismissive and hangs up. Drop-off rate at this moment: 34%.',
    proposedFix: 'New response flow — acknowledge first ("I understand that can be frustrating, let me look into this for you"), then verify ("Can I confirm the date and method of your payment?"), then resolve pathway based on verification outcome.',
    deployment: [
      { agent: 'Collector', action: 'Voice AI objection handling branch updated on all 3 bot variants. Live since Day 16.' },
      { agent: 'Collector', action: 'Updated script pushed to human agent queue. Calibration session scheduled Friday for Agents 4, 5, 6.' }
    ],
    projectedImpact: '+12% RPC retention on accounts where this objection is raised, based on similar fixes deployed on Pollack & Rosen portfolio.',
    earlySignal: 'Voice AI calls hitting this objection now show 18% drop-off vs 34% pre-fix.'
  },
  {
    id: 'medical-empathy',
    title: 'Medical Debt Empathy Gap',
    status: 'In review',
    statusColor: 'bg-amber-500',
    source: '480 AI bot conversations scored this week. Medical debt cohort showing 40% consumer drop-off at hardship mention.',
    diagnosis: 'When consumers say "I\'m going through hardship" or similar, the current bot flow jumps directly to "Would you like to set up a payment plan?" Consumers perceive this as tone-deaf. They disengage before hearing the options. Human agents have the same pattern but less severe (28% drop-off).',
    proposedFix: 'Insert empathy acknowledgment step before any solution. New flow — acknowledge hardship, ask open question about their situation, then explore options based on response. New Voice AI conversation branch required. Human agents get a coaching brief.',
    deployment: [
      { agent: 'Compliance', action: 'Updated empathetic bot script submitted for review. Waiting approval.' },
      { agent: 'Collector', action: 'Pending Compliance approval.' },
      { agent: 'Collector', action: 'Human agent coaching brief drafted. Will be covered in Monday\'s medical debt sensitivity refresher.' }
    ],
    projectedImpact: 'Estimated -15% drop-off on hardship mentions, based on before/after data from Lane Health portfolio.',
    earlySignal: null
  },
  {
    id: 'settlement-disconnect',
    title: 'Settlement Offer Cross-Channel Disconnect',
    status: 'Diagnosing',
    statusColor: 'bg-blue-600',
    source: 'Analysis of settlement offer campaign (SMS → Voice follow-up). 620 accounts targeted since Day 17.',
    diagnosis: 'Consumers who receive the 15% settlement SMS and then get a voice call convert at 2%. SMS → email follow-up converts at 8%. Root cause: voice call script re-explains the offer from scratch instead of referencing the SMS. Consumer feels like they\'re starting over. Email follow-up references the SMS directly, which is why it performs better.',
    proposedFix: 'Update voice call script to reference prior SMS. New opening: "Hi, I\'m calling about the settlement offer we sent you recently." Also update bot\'s next-best-action to detect SMS engagement before initiating voice follow-up.',
    deployment: [
      { agent: 'Manager', action: 'Script update being drafted.' },
      { agent: null, action: 'Pending: Voice AI bot update + human agent briefing once script is finalized.' }
    ],
    projectedImpact: 'If voice follow-up conversion matches email (8%), estimated additional $18,000 in collections over remaining placement period.',
    earlySignal: null
  }
];

export default function Quality({ initialTab = 'overview', onTabChange }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (onTabChange) onTabChange(tab);
  };

  return (
    <div className="p-8 bg-gray-50">
      {/* Header — Revenue Protection framing */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Quality & Compliance</h1>
        <p className="text-sm text-gray-600 mt-1">Compliance as revenue protection, quality scoring, and agent performance</p>
      </div>

      {/* Revenue Protection Hero */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-1">43 violations prevented today.</h2>
            <h3 className="text-xl font-bold text-gray-700">Estimated exposure avoided: <span className="text-emerald-600">$64,500</span></h3>
          </div>
          <div className="flex gap-6 text-center">
            <div>
              <div className="text-2xl font-extrabold text-gray-900">99.86%</div>
              <div className="text-xs text-gray-500">Score</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-gray-900">18 hrs</div>
              <div className="text-xs text-gray-500">Avg Resolution</div>
            </div>
          </div>
        </div>
        {/* Breakdown */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-red-50 rounded-lg p-3">
            <div className="flex items-center gap-1 mb-1"><span className="w-2 h-2 rounded-full bg-red-500" /><span className="text-[10px] font-bold text-red-700 uppercase">Critical</span></div>
            <div className="text-lg font-bold text-red-700">0</div>
            <div className="text-[10px] text-gray-500">No lawsuit-risk issues</div>
          </div>
          <div className="bg-amber-50 rounded-lg p-3">
            <div className="flex items-center gap-1 mb-1"><span className="w-2 h-2 rounded-full bg-amber-500" /><span className="text-[10px] font-bold text-amber-700 uppercase">Warning</span></div>
            <div className="text-lg font-bold text-amber-700">3</div>
            <div className="text-[10px] text-gray-500">Human agent timing issues — training deployed</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="flex items-center gap-1 mb-1"><span className="w-2 h-2 rounded-full bg-blue-500" /><span className="text-[10px] font-bold text-blue-700 uppercase">Info</span></div>
            <div className="text-lg font-bold text-blue-700">1</div>
            <div className="text-[10px] text-gray-500">AI timezone error — fix within 4 hours</div>
          </div>
        </div>
        {/* Client-Ready Narrative */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-sm text-gray-500">description</span>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Client-Ready Narrative</span>
          </div>
          <p className="text-sm text-gray-700">4 flags detected this week. 3 low-severity human agent timing issues (training deployed within 24 hours). 1 AI timezone error corrected within 4 hours. <strong>Zero open risk.</strong> All corrective actions documented and verifiable.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex gap-6">
          <button
            onClick={() => handleTabChange('overview')}
            className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'overview'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => handleTabChange('improvements')}
            className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'improvements'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
            }`}
          >
            Active Improvements
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Compliance Summary */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Compliance Summary</h2>
          <div className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Conversations Audited</p>
              <p className="text-2xl font-semibold text-gray-900 text-numeric">{complianceData.weekSummary.audited.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Compliance Score</p>
              <p className="text-2xl font-semibold text-green-600 text-numeric">{complianceData.weekSummary.complianceScore}%</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Flags Resolved</p>
              <p className="text-2xl font-semibold text-green-600 text-numeric">{complianceData.weekSummary.flagsResolved}/{complianceData.weekSummary.flagsRaised}</p>
              <p className="text-xs text-gray-500 mt-1">Avg: {complianceData.weekSummary.avgResolutionTime}</p>
            </div>
          </div>
        </div>

        {/* Quality Summary */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Quality Summary</h2>
          <div className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Calls Scored</p>
              <p className="text-2xl font-semibold text-gray-900 text-numeric">{coachData.weekSummary.humanCallsScored + coachData.weekSummary.aiConversationsScored}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Human Avg</p>
                <p className="text-2xl font-semibold text-cyan-600 text-numeric">{coachData.weekSummary.humanAvgQuality}/100</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">AI Avg</p>
                <p className="text-2xl font-semibold text-cyan-600 text-numeric">{coachData.weekSummary.aiAvgQuality}/100</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Severity Legend */}
      <div className="flex gap-4 mb-4">
        <span className="inline-flex items-center gap-1 text-xs font-bold"><span className="w-2 h-2 rounded-full bg-red-500" />CRITICAL — lawsuit risk</span>
        <span className="inline-flex items-center gap-1 text-xs font-bold"><span className="w-2 h-2 rounded-full bg-amber-500" />WARNING — process gap</span>
        <span className="inline-flex items-center gap-1 text-xs font-bold"><span className="w-2 h-2 rounded-full bg-blue-500" />INFO — coaching opportunity</span>
      </div>

      {/* Flagged Issues */}
      <Section title="Flagged Issues" className="mb-6">
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

      {/* Agent Scoreboard */}
      <Section title="Agent Scoreboard" className="mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left py-2 px-3 text-xs font-semibold uppercase tracking-wide text-gray-600">Agent</th>
              <th className="text-right py-2 px-3 text-xs font-semibold uppercase tracking-wide text-gray-600">Quality Score</th>
              <th className="text-left py-2 px-3 text-xs font-semibold uppercase tracking-wide text-gray-600">Trend</th>
              <th className="text-left py-2 px-3 text-xs font-semibold uppercase tracking-wide text-gray-600">Top Strength</th>
              <th className="text-left py-2 px-3 text-xs font-semibold uppercase tracking-wide text-gray-600">Coaching Need</th>
            </tr>
          </thead>
          <tbody>
            {coachData.agentScoreboard.map((agent, idx) => (
              <tr key={idx} className="border-b border-gray-100 last:border-0">
                <td className="py-2 px-3 font-medium text-gray-900">{agent.agent}</td>
                <td className="py-2 px-3 text-right">
                  <span className={`font-semibold text-numeric ${
                    agent.score >= 85 ? 'text-green-600' : agent.score >= 80 ? 'text-amber-600' : 'text-red-600'
                  }`}>
                    {agent.score}/100
                  </span>
                </td>
                <td className="py-2 px-3">
                  {agent.trend === 'up' && (
                    <svg className="w-4 h-4 text-green-600 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                  )}
                  {agent.trend === 'down' && (
                    <svg className="w-4 h-4 text-red-600 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  )}
                  {agent.trend === 'stable' && <span className="text-gray-400">—</span>}
                </td>
                <td className="py-2 px-3 text-gray-700">{agent.strength}</td>
                <td className="py-2 px-3 text-gray-700">{agent.need}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      {/* Upcoming Actions */}
      <Section title="Upcoming Training & Calibration">
        <div className="space-y-1.5">
          {coachData.upcomingActions.map((action, idx) => (
            <p key={idx} className="text-sm text-gray-700">• {action}</p>
          ))}
        </div>
      </Section>
        </div>
      )}

      {/* Active Improvements Tab */}
      {activeTab === 'improvements' && (
        <div className="space-y-6">
          {improvementCases.map((caseItem) => (
            <div key={caseItem.id} id={caseItem.id} className="bg-white border border-gray-200 rounded-lg p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <h3 className="text-base font-semibold text-gray-900">{caseItem.title}</h3>
                <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold text-white rounded ${caseItem.statusColor}`}>
                  {caseItem.status}
                </span>
              </div>

              {/* Flow Steps */}
              <div className="space-y-5">
                {/* Source */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-semibold text-gray-600">1</span>
                    </div>
                    <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="text-xs uppercase tracking-wide text-gray-500 mb-1 font-semibold">Source</p>
                    <p className="text-sm text-gray-900">{caseItem.source}</p>
                  </div>
                </div>

                {/* Diagnosis */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-semibold text-gray-600">2</span>
                    </div>
                    <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="text-xs uppercase tracking-wide text-gray-500 mb-1 font-semibold">Diagnosis</p>
                    <p className="text-sm text-gray-900">{caseItem.diagnosis}</p>
                  </div>
                </div>

                {/* Proposed Fix */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-semibold text-gray-600">3</span>
                    </div>
                    <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="text-xs uppercase tracking-wide text-gray-500 mb-1 font-semibold">Proposed Fix</p>
                    <p className="text-sm text-gray-900">{caseItem.proposedFix}</p>
                  </div>
                </div>

                {/* Deployment */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-semibold text-blue-600">4</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-wide text-gray-500 mb-3 font-semibold">Deployment</p>
                    <div className="space-y-2">
                      {caseItem.deployment.map((deploy, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          {deploy.agent && (
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <span className="text-gray-400">→</span>
                              <span
                                className="inline-block w-2 h-2 rounded-full"
                                style={{ backgroundColor: agentColors[deploy.agent] }}
                              />
                              <span className="text-sm font-medium text-gray-900">{deploy.agent}:</span>
                            </div>
                          )}
                          {!deploy.agent && (
                            <span className="text-gray-400 flex-shrink-0">→</span>
                          )}
                          <p className="text-sm text-gray-700">{deploy.action}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Impact Section */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-xs uppercase tracking-wide text-blue-900 mb-2 font-semibold">Projected Impact</p>
                  <p className="text-sm text-blue-900 mb-2">{caseItem.projectedImpact}</p>
                  {caseItem.earlySignal && (
                    <div className="mt-3 pt-3 border-t border-blue-200">
                      <p className="text-xs uppercase tracking-wide text-blue-700 mb-1 font-semibold">Early Signal</p>
                      <p className="text-sm text-blue-800">{caseItem.earlySignal}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
