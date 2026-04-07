import React from 'react';
import { agents } from '../data';

const agentColors = {
  Analyst: '#3b82f6',
  'Manager': '#8b5cf6',
  Compliance: '#ef4444',
  Coach: '#06b6d4',
  Collector: '#f59e0b'
};

const coordinationOutcomes = [
  {
    outcome: "Medical debt contact rate improved from 22% to 34%",
    changeValue: "+12%",
    agents: ['Analyst', 'Manager', 'Collector'],
    timestamp: "3 days ago"
  },
  {
    outcome: "Objection drop-off on 'I already paid' reduced from 34% to 18%",
    changeValue: "-16%",
    agents: ['Coach', 'Collector'],
    timestamp: "2 days ago"
  },
  {
    outcome: "Spanish-speaking cohort connect rate jumped from 18% to 31%",
    changeValue: "+13%",
    agents: ['Analyst', 'Manager', 'Collector'],
    timestamp: "5 days ago"
  },
  {
    outcome: "NY timezone compliance issue identified and resolved in 18 hours",
    changeValue: null,
    agents: ['Compliance', 'Collector'],
    timestamp: "1 day ago"
  },
  {
    outcome: "340 accounts re-scored from Low to Medium propensity based on engagement signals",
    changeValue: null,
    agents: ['Analyst'],
    timestamp: "1 day ago"
  }
];

const realTimeProgress = [
  {
    agent: 'Analyst',
    color: '#3b82f6',
    activity: "Analyzing Week 3 payment patterns across cohorts... checking if settlement offer is outperforming standard reminder on High Prop / High Bal... early signal: 4.2% conversion vs 1.8%... preparing recommendation for Manager"
  },
  {
    agent: 'Compliance',
    color: '#ef4444',
    activity: "Scanning today's 412 conversations... 380 reviewed, 32 remaining... no flags so far"
  }
];

export default function CommandCenter({ onAgentClick, onCoachActivityClick, onNavigate }) {
  const [activeTab, setActiveTab] = React.useState('outcomes');
  const [placeholderIndex, setPlaceholderIndex] = React.useState(0);
  const [showBriefing, setShowBriefing] = React.useState(false);

  const placeholders = [
    "What drove the liquidation rate increase this week?",
    "Show me accounts most likely to settle",
    "Which cohorts are underperforming?",
    "Summarize compliance issues this month",
    "How is the Spanish campaign performing?",
    "What's the ROI on settlement offers?"
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    // Animate briefing on page load
    const timer = setTimeout(() => {
      setShowBriefing(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-8 bg-gray-50">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Insights</h1>
        <p className="text-sm text-gray-600 mt-1">Agent activity, patterns, and recommendations</p>
      </div>

      {/* Outcome Cards */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Total Collected</p>
          <div className="flex items-baseline gap-2 mb-1">
            <p className="text-3xl font-semibold text-green-600 text-numeric">$287,400</p>
            <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </div>
          <p className="text-xs text-gray-600">This month (Feb 1-24)</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Liquidation Rate</p>
          <div className="flex items-baseline gap-2 mb-1">
            <p className="text-3xl font-semibold text-green-600 text-numeric">2.7%</p>
            <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </div>
          <p className="text-xs text-gray-600">Target: 2.5% (above target)</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Accounts Resolved</p>
          <div className="flex items-baseline gap-2 mb-1">
            <p className="text-3xl font-semibold text-gray-900 text-numeric">743</p>
          </div>
          <p className="text-xs text-gray-600">of 12,000 total accounts</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Compliance</p>
          <div className="flex items-baseline gap-2 mb-1">
            <p className="text-3xl font-semibold text-green-600 text-numeric">99.86%</p>
          </div>
          <p className="text-xs text-gray-600 flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500" />
            Zero open risk
          </p>
        </div>
      </div>

      {/* Chat Input Box - Highlighted */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-4 mb-6 shadow-sm">
        <div className="relative">
          <input
            type="text"
            placeholder={placeholders[placeholderIndex]}
            className="w-full px-5 py-4 text-sm bg-white border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
            disabled
            key={placeholderIndex}
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>
        <p className="text-xs text-blue-700 mt-2 ml-1">Ask anything about your portfolio, campaigns, or performance</p>
      </div>

      {/* Morning Briefing */}
      <div className={`bg-gradient-to-br from-slate-50 to-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm transition-all duration-700 ${
        showBriefing ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        <div className="space-y-3">
          <p className="text-sm text-gray-900 leading-relaxed">
            Portfolio <button
              onClick={() => onNavigate('performance')}
              className="font-semibold text-blue-600 hover:underline"
            >
              crossed 2.5% target
            </button> — now at <button
              onClick={() => onNavigate('performance')}
              className="font-semibold text-green-600 hover:underline"
            >
              2.7%
            </button>. <button
              onClick={() => onNavigate('payments')}
              className="font-semibold text-blue-600 hover:underline"
            >
              $287K collected
            </button> this month.
          </p>

          <div className="space-y-2 pl-3 border-l-2 border-blue-200">
            <div className="flex gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
              <p className="text-sm text-gray-900 leading-relaxed">
                <button
                  onClick={() => onNavigate('performance')}
                  className="font-medium text-blue-600 hover:underline"
                >
                  High Propensity / High Balance
                </button> cohort +40% this week. Settlement offers + voice follow-ups driving spike.
              </p>
            </div>
            <div className="flex gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 flex-shrink-0" />
              <p className="text-sm text-gray-900 leading-relaxed">
                <button
                  onClick={onCoachActivityClick}
                  className="font-medium text-teal-600 hover:underline"
                >
                  Coach deployed fix
                </button> on "I already paid" objection. Drop-off reduced 34% → 18%.
              </p>
            </div>
            <div className="flex gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
              <p className="text-sm text-gray-900 leading-relaxed">
                Compliance: 1 flag (NY timezone) resolved. Zero open risk.
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-900 leading-relaxed pt-1">
            <button className="font-medium text-blue-600 hover:underline">1 item in Approvals</button> — settlement offer at 20% discount.
          </p>
        </div>
      </div>

      {/* Agent Team - Horizontal Cards */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Agent Team</h2>
        <div className="grid grid-cols-5 gap-4">
          {agents.map((agent) => (
            <button
              key={agent.name}
              onClick={() => onAgentClick(agent.name)}
              className="border border-gray-200 rounded-lg p-4 text-left hover:border-gray-300 hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="inline-block w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: agentColors[agent.name] }}
                />
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-gray-900 truncate">{agent.name}</h3>
                  <p className="text-xs text-gray-600 truncate">{agent.role}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500 mb-0.5">Key Metric</p>
                  <p className="text-xs font-medium text-gray-900 leading-snug">{agent.keyMetric}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* AI Agent Activities - Tabbed */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-gray-900">AI Agent Activities</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('outcomes')}
              className={`px-4 py-1.5 text-sm font-medium rounded transition-colors ${
                activeTab === 'outcomes'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Outcomes
            </button>
            <button
              onClick={() => setActiveTab('progress')}
              className={`px-4 py-1.5 text-sm font-medium rounded transition-colors ${
                activeTab === 'progress'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              In Progress
            </button>
          </div>
        </div>

        {/* Outcomes Tab */}
        {activeTab === 'outcomes' && (
          <div className="space-y-3">
            {coordinationOutcomes.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-sm text-gray-900">
                    {item.changeValue && (
                      <>
                        {item.outcome.split(item.changeValue.replace('+', '').replace('-', ''))[0]}
                        <span className="font-semibold text-green-600">{item.changeValue}</span>
                        {item.outcome.split(item.changeValue.replace('+', '').replace('-', ''))[1]}
                      </>
                    )}
                    {!item.changeValue && item.outcome}
                  </span>
                  <div className="flex items-center gap-1.5 ml-2">
                    {item.agents.map((agent, agentIdx) => (
                      <button
                        key={agentIdx}
                        onClick={() => onAgentClick(agent)}
                        className="inline-block w-2 h-2 rounded-full hover:ring-2 hover:ring-offset-1 transition-all"
                        style={{ backgroundColor: agentColors[agent] }}
                        title={agent}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-xs text-gray-500 flex-shrink-0 ml-4">{item.timestamp}</span>
              </div>
            ))}
          </div>
        )}

        {/* In Progress Tab */}
        {activeTab === 'progress' && (
          <div className="space-y-4">
            {realTimeProgress.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="relative">
                    <span
                      className="inline-block w-2 h-2 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span
                      className="absolute inset-0 rounded-full animate-ping"
                      style={{ backgroundColor: item.color, opacity: 0.4 }}
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <button
                    onClick={() => onAgentClick(item.agent)}
                    className="text-sm font-semibold text-gray-900 hover:text-blue-600 mb-1"
                  >
                    {item.agent}
                  </button>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.activity}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
