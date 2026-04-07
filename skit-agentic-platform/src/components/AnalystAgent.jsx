import { analystData, cohorts } from '../data';

const StatusDot = ({ status }) => {
  const colors = {
    above: 'bg-green-500',
    below: 'bg-amber-500',
    expected: 'bg-gray-400'
  };
  return <span className={`inline-block w-2 h-2 rounded-full ${colors[status] || 'bg-gray-400'}`} />;
};

export default function AnalystAgent() {
  return (
    <div className="p-8 bg-gray-50">
      {/* Header */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <div className="flex items-center gap-3 mb-2">
          <span className="inline-block w-2 h-2 rounded-full bg-blue-500" />
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Analyst</h1>
            <p className="text-sm text-gray-600">Context, Modeling & Performance</p>
          </div>
        </div>
        <p className="text-sm text-gray-700 mt-4 leading-relaxed">
          The data brain. Handles the full arc from portfolio intake to ongoing performance optimization.
          Ingests placement files, cleans data, runs skip tracing, segments accounts into actionable cohorts,
          and scores propensity. Then continuously tracks KPIs against activation benchmarks, identifies
          underperforming cohorts, recommends reallocation between digital and human operations, and feeds
          engagement signals back to re-score cohorts and inform strategy changes.
        </p>
      </div>

      {/* Skills */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Skills</h2>
        <div className="grid grid-cols-2 gap-x-6 gap-y-2">
          {analystData.skills.map((skill, idx) => (
            <div key={idx} className="text-sm text-gray-700">
              • {skill}
            </div>
          ))}
        </div>
      </div>

      {/* Current Portfolio Model */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Current Portfolio Model</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left py-2 px-3 text-xs font-semibold uppercase tracking-wide text-gray-600">Cohort</th>
              <th className="text-right py-2 px-3 text-xs font-semibold uppercase tracking-wide text-gray-600">Accounts</th>
              <th className="text-right py-2 px-3 text-xs font-semibold uppercase tracking-wide text-gray-600">Avg Balance</th>
              <th className="text-left py-2 px-3 text-xs font-semibold uppercase tracking-wide text-gray-600">Propensity</th>
              <th className="text-left py-2 px-3 text-xs font-semibold uppercase tracking-wide text-gray-600">Strategy</th>
            </tr>
          </thead>
          <tbody>
            {cohorts.map((cohort, idx) => (
              <tr key={idx} className="border-b border-gray-100 last:border-0">
                <td className="py-2 px-3 font-medium text-gray-900">{cohort.name}</td>
                <td className="py-2 px-3 text-right text-gray-700 text-numeric">{cohort.accounts.toLocaleString()}</td>
                <td className="py-2 px-3 text-right text-gray-700 text-numeric">{cohort.avgBalance}</td>
                <td className="py-2 px-3 text-gray-700">{cohort.propensity}</td>
                <td className="py-2 px-3 text-gray-700">{cohort.strategy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Performance Dashboard */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Performance Dashboard</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left py-2 px-3 text-xs font-semibold uppercase tracking-wide text-gray-600">Cohort</th>
              <th className="text-right py-2 px-3 text-xs font-semibold uppercase tracking-wide text-gray-600">Liquidation</th>
              <th className="text-right py-2 px-3 text-xs font-semibold uppercase tracking-wide text-gray-600">Contact Rate</th>
              <th className="text-right py-2 px-3 text-xs font-semibold uppercase tracking-wide text-gray-600">RPC Rate</th>
              <th className="text-right py-2 px-3 text-xs font-semibold uppercase tracking-wide text-gray-600">PTP Rate</th>
              <th className="text-left py-2 px-3 text-xs font-semibold uppercase tracking-wide text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {cohorts.map((cohort, idx) => (
              <tr key={idx} className="border-b border-gray-100 last:border-0">
                <td className="py-2 px-3 font-medium text-gray-900">{cohort.name}</td>
                <td className="py-2 px-3 text-right text-gray-700 text-numeric">{cohort.liquidation}%</td>
                <td className="py-2 px-3 text-right text-gray-700 text-numeric">{cohort.contactRate}%</td>
                <td className="py-2 px-3 text-right text-gray-700 text-numeric">{cohort.rpcRate}%</td>
                <td className="py-2 px-3 text-right text-gray-700 text-numeric">{cohort.ptpRate}%</td>
                <td className="py-2 px-3">
                  <div className="flex items-center gap-2">
                    <StatusDot status={cohort.status} />
                    <span className="text-gray-700">
                      {cohort.status === 'above' && 'Above target'}
                      {cohort.status === 'below' && 'Below target'}
                      {cohort.status === 'expected' && 'On track'}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Recent Alerts / Recommendations */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Recent Alerts / Recommendations</h2>
        <div className="space-y-3">
          {analystData.alerts.map((alert, idx) => (
            <div key={idx} className="flex gap-3 p-3 bg-amber-50 border border-amber-200 rounded">
              <span className="inline-block w-2 h-2 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-gray-900">{alert.message}</p>
                <p className="text-xs text-gray-600 mt-1">Day {alert.day}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity Log */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Recent Activity Log</h2>
        <div className="space-y-0">
          {analystData.activityLog.map((log, idx) => (
            <div key={idx} className="flex gap-4 py-3 border-b border-gray-100 last:border-0">
              <span className="text-xs text-gray-500 w-12 flex-shrink-0">Day {log.day}</span>
              <p className="text-sm text-gray-700 flex-1">{log.action}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Configuration / SOP */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Configuration / SOP</h2>
        <div className="space-y-1.5">
          {analystData.configuration.map((config, idx) => (
            <p key={idx} className="text-sm text-gray-700">• {config}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
