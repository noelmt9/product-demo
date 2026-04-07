import { weeklyKPIs, cohorts, analystData } from '../data';
import { Section } from './shared';

const clientReports = [
  { title: 'Week 3 Performance Summary — Apex Recovery Partners', date: 'Feb 24, 2026', type: 'Weekly' },
  { title: 'Week 2 Performance Summary — Apex Recovery Partners', date: 'Feb 17, 2026', type: 'Weekly' },
  { title: 'Week 1 Performance Summary — Apex Recovery Partners', date: 'Feb 10, 2026', type: 'Weekly' },
  { title: 'Hypercare Activation Report — Apex Recovery Partners', date: 'Feb 5, 2026', type: 'Milestone' },
];

export default function Reports() {
  return (
    <div className="p-8 bg-gray-50">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Reports</h1>
        <p className="text-sm text-gray-600 mt-1">Performance trends, cohort analysis, and client deliverables</p>
      </div>

      {/* Key Metrics - Visual Cards */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Liquidation Rate</p>
          <div className="flex items-baseline gap-2 mb-2">
            <p className="text-3xl font-semibold text-green-600 text-numeric">2.7%</p>
            <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span className="text-green-600 font-medium">+50%</span>
            <span>vs Week 1 (1.8%)</span>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Contact Rate</p>
          <div className="flex items-baseline gap-2 mb-2">
            <p className="text-3xl font-semibold text-gray-900 text-numeric">38%</p>
            <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span className="text-green-600 font-medium">+23%</span>
            <span>vs Week 1 (31%)</span>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">PTP Rate</p>
          <div className="flex items-baseline gap-2 mb-2">
            <p className="text-3xl font-semibold text-gray-900 text-numeric">12%</p>
            <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span className="text-green-600 font-medium">+50%</span>
            <span>vs Week 1 (8%)</span>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Compliance Score</p>
          <div className="flex items-baseline gap-2 mb-2">
            <p className="text-3xl font-semibold text-green-600 text-numeric">99.86%</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
            <span>Within target (99.5%+)</span>
          </div>
        </div>
      </div>

      {/* Cohort Performance - Visual Grid */}
      <Section title="Cohort Performance Overview" className="mb-6">
        <div className="grid grid-cols-5 gap-4">
          {cohorts.map((cohort, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg p-4">
              <div className="mb-3">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">{cohort.name}</h3>
                <p className="text-xs text-gray-600">{cohort.accounts.toLocaleString()} accounts</p>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Liquidation</p>
                  <p className={`text-2xl font-semibold text-numeric ${
                    cohort.liquidation >= 3 ? 'text-green-600' : cohort.liquidation >= 2 ? 'text-amber-600' : 'text-gray-700'
                  }`}>
                    {cohort.liquidation}%
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-500">Contact</span>
                    <span className="text-gray-900 font-medium">{cohort.contactRate}%</span>
                  </div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-500">RPC</span>
                    <span className="text-gray-900 font-medium">{cohort.rpcRate}%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">PTP</span>
                    <span className="text-gray-900 font-medium">{cohort.ptpRate}%</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <span className={`inline-block w-2 h-2 rounded-full ${
                    cohort.status === 'above' ? 'bg-green-500' : cohort.status === 'below' ? 'bg-amber-500' : 'bg-gray-400'
                  }`} />
                  <span className="text-xs text-gray-600">
                    {cohort.status === 'above' && 'Above target'}
                    {cohort.status === 'below' && 'Below target'}
                    {cohort.status === 'expected' && 'On track'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Weekly Trend - Simplified Visual */}
      <Section title="3-Week Performance Trend" className="mb-6">
        <div className="grid grid-cols-7 gap-6">
          {weeklyKPIs.rows.map((row, idx) => (
            <div key={idx} className="space-y-3">
              <p className="text-sm font-medium text-gray-900">{row[0]}</p>
              <div className="flex items-end gap-2 h-16">
                {[row[1], row[2], row[3]].map((value, weekIdx) => {
                  const numValue = parseFloat(value.replace('%', ''));
                  const maxValue = Math.max(...[row[1], row[2], row[3]].map(v => parseFloat(v.replace('%', ''))));
                  const height = (numValue / maxValue) * 100;

                  return (
                    <div key={weekIdx} className="flex-1 flex flex-col items-center">
                      <div
                        className="w-full bg-blue-500 rounded-t"
                        style={{ height: `${height}%` }}
                      />
                      <p className="text-xs text-gray-600 mt-1">W{weekIdx + 1}</p>
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-gray-600">
                Latest: <span className="font-medium text-gray-900">{row[3]}</span>
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Alerts - Visual Cards */}
      <Section title="Active Alerts & Recommendations" className="mb-6">
        <div className="grid grid-cols-3 gap-4">
          {analystData.alerts.map((alert, idx) => (
            <div key={idx} className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-start gap-3">
                <span className="inline-block w-2 h-2 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 mb-2">{alert.message}</p>
                  <p className="text-xs text-gray-600">Day {alert.day}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Client Reports - Compact List */}
      <Section title="Client Reports">
        <div className="grid grid-cols-2 gap-3">
          {clientReports.map((report, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 border border-gray-200 rounded hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{report.title}</p>
                  <p className="text-xs text-gray-600">{report.date}</p>
                </div>
              </div>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex-shrink-0">
                Download
              </button>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
