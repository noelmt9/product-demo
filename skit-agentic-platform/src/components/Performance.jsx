import React from 'react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Section } from './shared';

// Generate daily data for 18 days
const generateDailyData = () => {
  const days = [];
  const liquidationProgression = [1.2, 1.3, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.65, 2.68, 2.7, 2.7];
  const contactProgression = [31, 32, 33, 33, 34, 35, 35, 36, 36, 37, 37, 38, 38, 38, 38, 38, 38, 38];
  const rpcProgression = [22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 27, 28, 28, 28, 28, 28];
  const dailyCollections = [8200, 12400, 15600, 18200, 14800, 16200, 11400, 17800, 19200, 21400, 16800, 18600, 22400, 24800, 19200, 21600, 23800, 25200];

  let cumulative = 0;
  for (let i = 0; i < 18; i++) {
    cumulative += dailyCollections[i];
    days.push({
      day: i + 1,
      liquidation: liquidationProgression[i],
      contact: contactProgression[i],
      rpc: rpcProgression[i],
      dailyCollections: dailyCollections[i],
      cumulativeCollections: cumulative
    });
  }
  return days;
};

const dailyData = generateDailyData();

// Cohort trend data (3 weeks)
const cohortTrendData = {
  "High propensity / Low balance": [3.3, 3.8, 4.1],
  "High propensity / High balance": [2.7, 3.2, 3.8],
  "Medium propensity / All balances": [1.8, 2.0, 2.2],
  "Low propensity / Low balance": [0.3, 0.35, 0.4],
  "Low propensity / High balance": [1.8, 1.85, 1.9]
};

const cohortMetrics = [
  { name: "High propensity / Low balance", liquidation: 4.1, contact: 48, collections: 49800, change: "+24%", changeColor: "green", cost: 8100, margin: 41700, costPerDollar: 0.16 },
  { name: "High propensity / High balance", liquidation: 3.8, contact: 52, collections: 94200, change: "+40%", changeColor: "green", highlight: true, cost: 14200, margin: 80000, costPerDollar: 0.15 },
  { name: "Medium propensity / All balances", liquidation: 2.2, contact: 36, collections: 57600, change: "+18%", changeColor: "green", cost: 18400, margin: 39200, costPerDollar: 0.32 },
  { name: "Low propensity / Low balance", liquidation: 0.4, contact: 12, collections: 8400, change: "+12%", changeColor: "green", cost: 9200, margin: -800, costPerDollar: 1.10, negativeMargin: true },
  { name: "Low propensity / High balance", liquidation: 1.9, contact: 28, collections: 77400, change: "+8%", changeColor: "green", cost: 22100, margin: 55300, costPerDollar: 0.29 }
];

const analystRecommendations = [
  {
    message: "High Prop / High Bal settlement + voice strategy is working. Recommend expanding this approach to Medium Propensity cohort — similar balance profile, currently under-penetrated on settlement offers.",
    agents: ["Analyst"]
  },
  {
    message: "Medium Propensity contact rate plateauing at 36%. Adding morning SMS nudge before voice attempt could improve pickup. Manager has a proposed change in Approvals.",
    agents: ["Analyst", "Manager"]
  },
  {
    message: "Week 3 liquidation crossed activation target. Recommend scheduling Activation Review with client.",
    agents: ["Analyst"]
  }
];

const agentColors = {
  "Analyst": "blue",
  "Manager": "purple"
};

// Sparkline component
const Sparkline = ({ data, dataKey, color = "#10b981" }) => (
  <ResponsiveContainer width="100%" height={40}>
    <LineChart data={data}>
      <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} dot={false} />
    </LineChart>
  </ResponsiveContainer>
);

// Mini trend chart for cohort cards
const MiniTrendChart = ({ data, color = "#3b82f6" }) => {
  const chartData = data.map((val, idx) => ({ week: idx + 1, value: val }));
  return (
    <ResponsiveContainer width="100%" height={80}>
      <BarChart data={chartData}>
        <Bar dataKey="value" fill={color} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default function Performance({ onNavigate }) {
  const [expandedRec, setExpandedRec] = React.useState(null);

  return (
    <div className="p-8 bg-gray-50">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Performance</h1>
        <p className="text-sm text-gray-600 mt-1">Real-time monitoring dashboard</p>
      </div>

      {/* Analyst Recommendations - Compact Row */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-block w-2 h-2 rounded-full bg-blue-500" />
          <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">Analyst Recommendations</span>
          <span className="text-xs text-gray-500">• {analystRecommendations.length} active</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {analystRecommendations.map((rec, idx) => (
            <button
              key={idx}
              onClick={() => setExpandedRec(expandedRec === idx ? null : idx)}
              className="p-3 bg-white border border-gray-200 rounded-lg text-left hover:border-blue-300 hover:shadow-sm transition-all"
            >
              <div className="flex items-start gap-2">
                <div className="flex gap-1 mt-1 flex-shrink-0">
                  {rec.agents.map((agent, agentIdx) => (
                    <span
                      key={agentIdx}
                      className={`inline-block w-1.5 h-1.5 rounded-full ${
                        agentColors[agent] === 'blue' ? 'bg-blue-500' : 'bg-purple-500'
                      }`}
                    />
                  ))}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs text-gray-900 ${expandedRec === idx ? '' : 'line-clamp-2'}`}>
                    {rec.message}
                  </p>
                  {expandedRec === idx && (
                    <div className="mt-2 pt-2 border-t border-gray-100">
                      <span className="text-xs text-blue-600 font-medium">View details →</span>
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="mb-6 flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-600 uppercase">Time Range:</span>
          <div className="flex gap-1">
            {["Last 7 days", "Last 14 days", "Last 30 days", "All time"].map((option, idx) => (
              <button
                key={idx}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                  option === "Last 30 days"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        <div className="h-6 w-px bg-gray-200" />
        <div className="flex items-center gap-3">
          <select className="px-3 py-1.5 text-xs font-medium bg-white border border-gray-200 rounded text-gray-700">
            <option>All cohorts</option>
          </select>
          <select className="px-3 py-1.5 text-xs font-medium bg-white border border-gray-200 rounded text-gray-700">
            <option>All channels</option>
          </select>
        </div>
      </div>

      {/* Row 1: Summary Metric Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {/* Total Collected */}
        <div className="p-5 bg-white border border-gray-200 rounded-lg">
          <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Total Collected</div>
          <div className="text-3xl font-bold text-gray-900 mb-3">$287,400</div>
          <Sparkline data={dailyData} dataKey="cumulativeCollections" color="#10b981" />
          <div className="text-xs text-gray-600 mt-2">Day 1 - Day 18 cumulative</div>
        </div>

        {/* Liquidation Rate */}
        <div className="p-5 bg-white border border-gray-200 rounded-lg">
          <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Liquidation Rate</div>
          <div className="text-3xl font-bold text-gray-900 mb-3">2.7%</div>
          <Sparkline data={dailyData} dataKey="liquidation" color="#10b981" />
          <div className="text-xs text-gray-600 mt-2">vs target: 2.5% <span className="text-green-600 font-medium">↑ +0.2%</span></div>
        </div>

        {/* Contact Rate */}
        <div className="p-5 bg-white border border-gray-200 rounded-lg">
          <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Contact Rate</div>
          <div className="text-3xl font-bold text-gray-900 mb-3">38%</div>
          <Sparkline data={dailyData} dataKey="contact" color="#f59e0b" />
          <div className="text-xs text-gray-600 mt-2">vs target: 40% <span className="text-amber-600 font-medium">↓ -2%</span></div>
        </div>

        {/* RPC Rate */}
        <div className="p-5 bg-white border border-gray-200 rounded-lg">
          <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">RPC Rate</div>
          <div className="text-3xl font-bold text-gray-900 mb-3">28%</div>
          <Sparkline data={dailyData} dataKey="rpc" color="#f59e0b" />
          <div className="text-xs text-gray-600 mt-2">vs target: 30% <span className="text-amber-600 font-medium">↓ -2%</span></div>
        </div>
      </div>

      {/* Row 2: Main Chart - Collections Over Time */}
      <Section title="Collections Over Time" className="mb-6">
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={dailyData}>
            <defs>
              <linearGradient id="colorCollections" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="day" label={{ value: 'Day', position: 'insideBottom', offset: -5 }} stroke="#9ca3af" />
            <YAxis yAxisId="left" label={{ value: 'Daily Collections ($)', angle: -90, position: 'insideLeft' }} stroke="#9ca3af" />
            <YAxis yAxisId="right" orientation="right" label={{ value: 'Cumulative ($)', angle: 90, position: 'insideRight' }} stroke="#9ca3af" />
            <Tooltip />
            <Area yAxisId="left" type="monotone" dataKey="dailyCollections" stroke="#3b82f6" fill="url(#colorCollections)" />
            <Line yAxisId="right" type="monotone" dataKey="cumulativeCollections" stroke="#10b981" strokeWidth={2} dot={false} />

            {/* Annotations */}
            <ReferenceLine yAxisId="left" x={3} stroke="#6366f1" strokeDasharray="3 3" label={{ value: "Day 3: SMS-first", position: "top", fill: "#6366f1", fontSize: 11 }} />
            <ReferenceLine yAxisId="left" x={12} stroke="#6366f1" strokeDasharray="3 3" label={{ value: "Day 12: Voice 5x/wk", position: "top", fill: "#6366f1", fontSize: 11 }} />
            <ReferenceLine yAxisId="left" x={17} stroke="#6366f1" strokeDasharray="3 3" label={{ value: "Day 17: Settlements", position: "top", fill: "#6366f1", fontSize: 11 }} />
          </AreaChart>
        </ResponsiveContainer>
      </Section>

      {/* Upsell Signals */}
      <section className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-gray-700">rocket_launch</span>
          <h2 className="text-base font-semibold text-gray-900">Intelligence: Upsell Signals</h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white border-2 border-teal-200 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded text-white" style={{background: 'linear-gradient(135deg, #3BA7F6, #5FCFC4)'}}>Outperforming</span>
              <span className="text-sm font-bold text-gray-900">Auto-Finance &lt;$3K Portfolio</span>
            </div>
            <p className="text-sm text-gray-600 mb-3">Outperforming at 4.1%, versus 1.6x above the aggregate benchmark. Client has 22,000 similar accounts in-house.</p>
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
              <span>Confidence: <strong className="text-teal-600">High</strong></span>
              <span>|</span>
              <span>Projected: <strong>$205K over 60 days</strong></span>
            </div>
            <button className="px-4 py-2 rounded-lg text-white text-xs font-bold" style={{background: 'linear-gradient(135deg, #3BA7F6, #5FCFC4)'}}>Draft Upsell Case</button>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-700">Negative Trend</span>
              <span className="text-sm font-bold text-gray-900">Fintech Tier 2: Latency Drop</span>
            </div>
            <p className="text-sm text-gray-600 mb-3">Contact rate declined significantly by 18%. This unit economics forecast suggests escalation.</p>
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
              <span>Severity: <strong className="text-amber-600">Medium</strong></span>
              <span>|</span>
              <span>Est. impact: <strong>-$34K/month</strong></span>
            </div>
            <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-xs font-bold hover:bg-gray-200 transition-colors">Review Economic Draft</button>
          </div>
        </div>
      </section>

      {/* Row 3: Cohort Performance Cards */}
      <Section title="Cohort Performance">
        <div className="grid grid-cols-3 gap-4">
          {cohortMetrics.map((cohort, idx) => (
            <div
              key={idx}
              className={`p-4 bg-white rounded-lg ${
                cohort.highlight
                  ? "border-2 border-green-500 shadow-lg shadow-green-100"
                  : "border border-gray-200"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="font-semibold text-gray-900 text-sm flex-1">{cohort.name}</div>
                <span
                  className={`px-2 py-0.5 text-xs font-bold rounded ${
                    cohort.changeColor === "green" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {cohort.change}
                </span>
              </div>

              <MiniTrendChart
                data={cohortTrendData[cohort.name]}
                color={cohort.highlight ? "#10b981" : "#3b82f6"}
              />

              <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-gray-100">
                <div>
                  <div className="text-xs text-gray-500">Liquidation</div>
                  <div className="text-sm font-semibold text-gray-900">{cohort.liquidation}%</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Contact</div>
                  <div className="text-sm font-semibold text-gray-900">{cohort.contact}%</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Collections</div>
                  <div className="text-sm font-semibold text-gray-900">${(cohort.collections / 1000).toFixed(0)}k</div>
                </div>
              </div>

              {/* Unit Economics */}
              <div className={`grid grid-cols-3 gap-2 mt-3 pt-3 border-t ${cohort.negativeMargin ? 'border-red-100 bg-red-50/50 -mx-4 px-4 -mb-4 pb-4 rounded-b-lg' : 'border-gray-100'}`}>
                <div>
                  <div className="text-xs text-gray-500">Cost</div>
                  <div className="text-sm font-semibold text-gray-900">${(cohort.cost / 1000).toFixed(1)}k</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Margin</div>
                  <div className={`text-sm font-semibold ${cohort.negativeMargin ? 'text-red-600' : 'text-green-600'}`}>${cohort.negativeMargin ? '' : '+'}{(cohort.margin / 1000).toFixed(1)}k</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">$/dollar</div>
                  <div className={`text-sm font-semibold ${cohort.negativeMargin ? 'text-red-600' : 'text-gray-900'}`}>${cohort.costPerDollar.toFixed(2)}</div>
                </div>
              </div>
              {cohort.negativeMargin && (
                <div className="text-xs text-red-600 font-medium mt-2 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">warning</span>
                  Negative margin — suggest channel substitution to email-only
                </div>
              )}

              {cohort.highlight && (
                <>
                  <div className="text-xs text-gray-600 mt-3 pt-3 border-t border-gray-100">
                    Settlement + voice follow-up driving spike
                  </div>
                  <button
                    onClick={() => onNavigate && onNavigate('conversations')}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium mt-2"
                  >
                    View conversations →
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
