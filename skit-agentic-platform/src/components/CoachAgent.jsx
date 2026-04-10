import { coachData } from '../data';
import { AgentHeader, Section } from './shared';

export default function CoachAgent() {
  return (
    <div className="p-8 bg-gray-50">
      <AgentHeader
        color="#06b6d4"
        name="Coach"
        role="Quality & Training"
        description="Audits conversation quality — separate from compliance, focused on effectiveness, tone, and resolution skill. Scores human agents and AI bots. Identifies coaching opportunities, runs calibration sessions, designs refresher training. Tracks quality trends to ensure the team continuously improves."
      />

      <Section title="Skills" className="mb-6">
        <div className="grid grid-cols-2 gap-x-6 gap-y-2">
          {coachData.skills.map((skill, idx) => (
            <div key={idx} className="text-sm text-gray-700">• {skill}</div>
          ))}
        </div>
      </Section>

      <Section title="This Week's Summary" className="mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Human Calls Scored</p>
            <p className="text-2xl font-semibold text-gray-900 text-numeric">{coachData.weekSummary.humanCallsScored}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">AI Conversations Scored</p>
            <p className="text-2xl font-semibold text-gray-900 text-numeric">{coachData.weekSummary.aiConversationsScored}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Human Avg Quality</p>
            <p className="text-2xl font-semibold text-gray-900 text-numeric">{coachData.weekSummary.humanAvgQuality}/100</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">AI Avg Quality</p>
            <p className="text-2xl font-semibold text-gray-900 text-numeric">{coachData.weekSummary.aiAvgQuality}/100</p>
          </div>
        </div>
        <div className="p-3 bg-cyan-50 border border-cyan-200 rounded space-y-1">
          <p className="text-sm text-gray-900"><span className="font-medium">Coaching Flags:</span> {coachData.weekSummary.coachingFlags}</p>
          <p className="text-sm text-gray-900"><span className="font-medium">Calibration Completed:</span> {coachData.weekSummary.calibrationCompleted}</p>
          <p className="text-sm text-gray-900"><span className="font-medium">Training Compliance:</span> {coachData.weekSummary.trainingCompliance}</p>
        </div>
      </Section>

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
                  <span className="font-semibold text-gray-900 text-numeric">
                    {agent.score}/100
                  </span>
                  {' '}
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                    agent.score >= 85 ? 'bg-green-50 text-green-700' : agent.score >= 80 ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'
                  }`}>
                    {agent.trend === 'up' ? '↑' : agent.trend === 'down' ? '↓' : '→'}
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

      <Section title="Upcoming Actions" className="mb-6">
        <div className="space-y-1.5">
          {coachData.upcomingActions.map((action, idx) => (
            <p key={idx} className="text-sm text-gray-700">• {action}</p>
          ))}
        </div>
      </Section>

      <Section title="Configuration / SOP">
        <div className="space-y-1.5">
          {coachData.configuration.map((config, idx) => (
            <p key={idx} className="text-sm text-gray-700">• {config}</p>
          ))}
        </div>
      </Section>
    </div>
  );
}
