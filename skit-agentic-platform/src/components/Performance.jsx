import React from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';
import { Section } from './shared';

// ── Data ─────────────────────────────────────────────────────────────────────

const generateDailyData = () => {
  const liquidation  = [1.2,1.3,1.5,1.6,1.7,1.8,1.9,2.0,2.1,2.2,2.3,2.4,2.5,2.6,2.65,2.68,2.7,2.7];
  const contact      = [31,32,33,33,34,35,35,36,36,37,37,38,38,38,38,38,38,38];
  const rpc          = [22,22,23,23,24,24,25,25,26,26,27,27,27,28,28,28,28,28];
  const daily        = [8200,12400,15600,18200,14800,16200,11400,17800,19200,21400,16800,18600,22400,24800,19200,21600,23800,25200];
  let cum = 0;
  return daily.map((d, i) => { cum += d; return { day: i+1, liquidation: liquidation[i], contact: contact[i], rpc: rpc[i], dailyCollections: d, cumulativeCollections: cum }; });
};
const dailyData = generateDailyData();

const funnelTrendData = {
  Accounts:    dailyData.map((_, i) => ({ day: i+1, value: 12000 })),
  Contacted:   dailyData.map((d) => ({ day: d.day, value: Math.round(12000 * (d.contact / 100)) })),
  RPC:         dailyData.map((d) => ({ day: d.day, value: Math.round(12000 * (d.rpc / 100)) })),
  PTP:         dailyData.map((d, i) => ({ day: d.day, value: Math.round(180 + i * 12.4) })),
  'Kept PTP':  dailyData.map((d, i) => ({ day: d.day, value: Math.round(110 + i * 9.1) })),
  Resolved:    dailyData.map((d, i) => ({ day: d.day, value: Math.round(40 + i * 39) })),
};

const cohortMetrics = [
  { name: 'High prop / Low bal',    liquidation: 4.1, contact: 48, rpc: 35, ptp: 15, collections: 49800,  change: '+24%', cost: 8100,  margin: 41700, costPerDollar: 0.16 },
  { name: 'High prop / High bal',   liquidation: 3.8, contact: 52, rpc: 38, ptp: 18, collections: 94200,  change: '+40%', cost: 14200, margin: 80000, costPerDollar: 0.15, highlight: true },
  { name: 'Medium prop / All bal',  liquidation: 2.2, contact: 36, rpc: 26, ptp: 11, collections: 57600,  change: '+18%', cost: 18400, margin: 39200, costPerDollar: 0.32 },
  { name: 'Low prop / Low bal',     liquidation: 0.4, contact: 12, rpc: 8,  ptp: 3,  collections: 8400,   change: '+12%', cost: 9200,  margin: -800,  costPerDollar: 1.10, negativeMargin: true },
  { name: 'Low prop / High bal',    liquidation: 1.9, contact: 28, rpc: 22, ptp: 8,  collections: 77400,  change: '+8%',  cost: 22100, margin: 55300, costPerDollar: 0.29 },
];

const cohortTrendData = [3.3, 3.8, 4.1];

const sentimentData = {
  overall: 72, positive: 41, neutral: 34, negative: 25,
  byChannel: [
    { channel: 'Voice AI',    positive: 38, neutral: 36, negative: 26 },
    { channel: 'Human Agent', positive: 54, neutral: 30, negative: 16 },
    { channel: 'SMS',         positive: 35, neutral: 42, negative: 23 },
    { channel: 'Email',       positive: 28, neutral: 48, negative: 24 },
  ],
  callingReasons: [
    { reason: 'Payment / Arrangement',       count: 312, pct: 36, sentiment: 'positive', resolution: '82% resolved on first contact' },
    { reason: 'Dispute — Account Validity',  count: 148, pct: 17, sentiment: 'negative', resolution: 'Routed to senior agent, 64% resolved within 48h' },
    { reason: 'Hardship / Cannot Pay',       count: 134, pct: 15, sentiment: 'negative', resolution: '89% offered payment plan or deferral' },
    { reason: 'Balance Inquiry',             count: 121, pct: 14, sentiment: 'neutral',  resolution: '97% resolved by bot' },
    { reason: 'Installment Plan Request',    count: 96,  pct: 11, sentiment: 'neutral',  resolution: '74% converted to active plan' },
    { reason: 'Talk to Spouse / Callback',   count: 52,  pct: 6,  sentiment: 'neutral',  resolution: '38% followed up, 22% converted' },
    { reason: 'Validation Request (Written)',count: 9,   pct: 1,  sentiment: 'negative', resolution: 'Pending — 6 unresolved' },
  ],
};

const agentPerfData = [
  { name: 'Agent 1', calls: 48, rpc: 31, ptp: 9, collections: 18400, quality: 91, trend: '↑', strength: 'Empathy & rapport',        coaching: '—' },
  { name: 'Agent 2', calls: 46, rpc: 28, ptp: 8, collections: 16200, quality: 89, trend: '→', strength: 'Payment plan negotiation',  coaching: 'Call pacing' },
  { name: 'Agent 3', calls: 47, rpc: 30, ptp: 9, collections: 17800, quality: 88, trend: '↑', strength: 'Objection handling',         coaching: '—' },
  { name: 'Agent 4', calls: 44, rpc: 25, ptp: 7, collections: 14100, quality: 86, trend: '↓', strength: 'Technical accuracy',         coaching: '"Already paid" objection' },
  { name: 'Agent 5', calls: 43, rpc: 24, ptp: 6, collections: 13200, quality: 84, trend: '→', strength: 'Persistence',                coaching: 'Empathy on medical debt' },
  { name: 'Agent 6', calls: 41, rpc: 22, ptp: 5, collections: 11700, quality: 82, trend: '↓', strength: 'Call control',               coaching: '"Already paid", mini-Miranda' },
];

const inboundData = [
  { day: 1, paymentCalls: 42, disputes: 8, hardship: 5, emailInbound: 18 },
  { day: 2, paymentCalls: 55, disputes: 11, hardship: 7, emailInbound: 22 },
  { day: 3, paymentCalls: 61, disputes: 9,  hardship: 6, emailInbound: 24 },
  { day: 4, paymentCalls: 58, disputes: 12, hardship: 8, emailInbound: 20 },
  { day: 5, paymentCalls: 70, disputes: 10, hardship: 9, emailInbound: 28 },
  { day: 6, paymentCalls: 75, disputes: 14, hardship: 11, emailInbound: 32 },
  { day: 7, paymentCalls: 68, disputes: 9,  hardship: 7, emailInbound: 25 },
  { day: 8, paymentCalls: 80, disputes: 15, hardship: 12, emailInbound: 30 },
  { day: 9, paymentCalls: 82, disputes: 13, hardship: 10, emailInbound: 35 },
  { day: 10, paymentCalls: 78, disputes: 11, hardship: 9, emailInbound: 31 },
  { day: 11, paymentCalls: 85, disputes: 16, hardship: 13, emailInbound: 38 },
  { day: 12, paymentCalls: 88, disputes: 14, hardship: 11, emailInbound: 34 },
  { day: 13, paymentCalls: 84, disputes: 12, hardship: 10, emailInbound: 33 },
  { day: 14, paymentCalls: 90, disputes: 18, hardship: 14, emailInbound: 40 },
  { day: 15, paymentCalls: 85, disputes: 15, hardship: 12, emailInbound: 36 },
  { day: 16, paymentCalls: 88, disputes: 13, hardship: 11, emailInbound: 37 },
  { day: 17, paymentCalls: 85, disputes: 12, hardship: 8, emailInbound: 34 },
  { day: 18, paymentCalls: 85, disputes: 12, hardship: 8, emailInbound: 34 },
];

const agencyBenchmark = [
  { metric: 'Liquidation Rate',  skit: 2.7,  agencyC: 2.4,  agencyB: 2.1,  agencyA: 1.9,  unit: '%', higher: true },
  { metric: 'Contact Rate',      skit: 38,   agencyC: 33,   agencyB: 30,   agencyA: 27,   unit: '%', higher: true },
  { metric: 'RPC Rate',          skit: 28,   agencyC: 24,   agencyB: 21,   agencyA: 18,   unit: '%', higher: true },
  { metric: 'PTP Rate',          skit: 12,   agencyC: 10,   agencyB: 9,    agencyA: 7,    unit: '%', higher: true },
  { metric: 'Kept-PTP Rate',     skit: 68,   agencyC: 62,   agencyB: 58,   agencyA: 54,   unit: '%', higher: true },
  { metric: 'Resolution Rate',   skit: 6.2,  agencyC: 5.1,  agencyB: 4.4,  agencyA: 3.8,  unit: '%', higher: true },
  { metric: 'Compliance Score',  skit: 99.86,agencyC: 99.6, agencyB: 99.1, agencyA: 98.8, unit: '%', higher: true },
  { metric: 'Cost per $1 Collected', skit: 0.18, agencyC: 0.22, agencyB: 0.27, agencyA: 0.31, unit: '$', higher: false },
  { metric: 'Avg Quality Score', skit: 87,   agencyC: 81,   agencyB: 76,   agencyA: 72,   unit: '/100', higher: true },
  { metric: 'Bot Abandonment',   skit: 22,   agencyC: 27,   agencyB: 31,   agencyA: 34,   unit: '%', higher: false },
];

const enrichmentData = {
  skipTrace: [
    { source: 'TLO',       found: 420, pct: 48 },
    { source: 'LexisNexis',found: 280, pct: 32 },
    { source: 'Internal',  found: 100, pct: 11 },
    { source: 'Failed',    found: 78,  pct: 9 },
  ],
  coverage: [
    { label: 'Phone (Cell)',          before: 64, after: 72, note: 'Primary voice AI channel' },
    { label: 'Phone (Landline)',       before: 38, after: 41, note: 'Used for human agents' },
    { label: 'Email',                 before: 46, after: 58, note: '+12% via skip tracing' },
    { label: 'SMS-eligible (consent)',before: 61, after: 68, note: 'TCPA consented subset' },
  ],
  propensitySignals: [
    { signal: 'SMS click (within 48h)',         weight: 'High',   accounts: 340, action: 'Re-score to Medium propensity' },
    { signal: 'Email open + link click',         weight: 'High',   accounts: 218, action: 'Add to settlement offer cohort' },
    { signal: 'Inbound call — inquiry only',     weight: 'Medium', accounts: 134, action: 'Queue for human agent follow-up' },
    { signal: 'Broken PTP (1st installment)',    weight: 'High',   accounts: 89,  action: 'Escalate to senior agent' },
    { signal: 'Payment portal visit (no payment)',weight: 'Medium', accounts: 76,  action: 'SMS reminder within 2h' },
    { signal: 'Voicemail left (no callback)',    weight: 'Low',    accounts: 420, action: 'Re-attempt next cycle, switch channel' },
  ],
};

const ptpDetailData = [
  { week: 'Week 1', made: 144, kept: 89,  broken: 55,  keptPct: 62, value: 64800 },
  { week: 'Week 2', made: 162, kept: 105, broken: 57,  keptPct: 65, value: 72900 },
  { week: 'Week 3', made: 97,  kept: 80,  broken: 17,  keptPct: 82, value: 43700 },
];

const ptpByCohort = [
  { cohort: 'High prop / High bal', ptpRate: 18, adherence: 76, avgValue: 4100, atRisk: 28400 },
  { cohort: 'High prop / Low bal',  ptpRate: 15, adherence: 72, avgValue: 980,  atRisk: 14200 },
  { cohort: 'Medium prop',          ptpRate: 11, adherence: 64, avgValue: 2200, atRisk: 62400 },
  { cohort: 'Low prop / High bal',  ptpRate: 8,  adherence: 58, avgValue: 3800, atRisk: 31800 },
  { cohort: 'Low prop / Low bal',   ptpRate: 3,  adherence: 55, avgValue: 640,  atRisk: 12200 },
];

// ── Shared sub-components ─────────────────────────────────────────────────────

const Sparkline = ({ data, dataKey, color = '#61ab5e' }) => (
  <ResponsiveContainer width="100%" height={36}>
    <LineChart data={data}>
      <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} dot={false} />
    </LineChart>
  </ResponsiveContainer>
);

const sentColor = s => s === 'positive' ? 'text-green-600' : s === 'negative' ? 'text-red-500' : 'text-gray-500';
const sentDot   = s => s === 'positive' ? 'bg-green-500'  : s === 'negative' ? 'bg-red-500'   : 'bg-gray-400';

const HL = ({ label, value, sub, color }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-4">
    <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">{label}</div>
    <div className={`text-2xl font-extrabold ${color || 'text-gray-900'}`}>{value}</div>
    {sub && <div className="text-xs text-gray-400 mt-0.5">{sub}</div>}
  </div>
);

const FunnelStep = ({ label, value, sub, pct, isLast, isExpanded, onClick }) => (
  <div className="flex items-center flex-1 min-w-0">
    <div className="flex flex-col items-center flex-1 min-w-0">
      <button
        onClick={onClick}
        className="w-full rounded-lg px-3 py-3 text-center border transition-all"
        style={{
          background: isExpanded ? '#f0faf8' : '#ffffff',
          borderColor: isExpanded ? '#2196af' : '#d4eae5',
          boxShadow: isExpanded ? '0 0 0 2px rgba(33,150,175,0.15)' : 'none',
          cursor: 'pointer',
        }}
      >
        <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">{label}</div>
        <div className="text-2xl font-extrabold text-gray-900">{value}</div>
        {sub && <div className="text-[11px] text-gray-400 mt-0.5">{sub}</div>}
      </button>
      {pct && <div className="mt-1.5 text-xs font-semibold text-gray-400">{pct}</div>}
    </div>
    {!isLast && (
      <div className="flex flex-col items-center px-1 flex-shrink-0 mt-[-14px]">
        <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
          <path d="M0 8 H18 M12 2 L20 8 L12 14" stroke="#2196af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.35"/>
        </svg>
      </div>
    )}
  </div>
);

// ── TAB: Overview ─────────────────────────────────────────────────────────────

function OverviewTab({ onNavigate }) {
  const [expandedFunnel, setExpandedFunnel] = React.useState(null);
  const [expandedCohort, setExpandedCohort] = React.useState(null);

  const funnelSteps = [
    { label: 'Accounts',  value: '12,000', sub: 'Total placement',     pct: null,                key: 'Accounts' },
    { label: 'Contacted', value: '4,560',  sub: '38% contact rate',    pct: '38% of placement',  key: 'Contacted' },
    { label: 'RPC',       value: '3,360',  sub: 'Right party contact',  pct: '28% of placement',  key: 'RPC' },
    { label: 'PTP',       value: '403',    sub: 'Promise to pay',      pct: '12% of RPC',        key: 'PTP' },
    { label: 'Kept PTP',  value: '274',    sub: '68% adherence',       pct: '68% of PTP',        key: 'Kept PTP' },
    { label: 'Resolved',  value: '743',    sub: 'Cumulative',          pct: '6.2% of placement', key: 'Resolved' },
  ];

  return (
    <div className="px-8 py-6 space-y-6">
      {/* KPI Summary row */}
      <div className="grid grid-cols-7 gap-3">
        {[
          { label: 'Liquidation Rate', value: '2.7%', sub: '↑ vs 2.5% target', color: 'text-blue-600' },
          { label: 'Contact Rate', value: '38%', sub: '↑ from 31% Wk1' },
          { label: 'RPC Rate', value: '28%', sub: '↑ from 22% Wk1' },
          { label: 'PTP Rate', value: '12%', sub: 'At target' },
          { label: 'Kept-PTP', value: '68%', sub: '↓ 2pts from target', color: 'text-amber-600' },
          { label: 'Resolution', value: '6.2%', sub: 'Cumulative' },
          { label: 'Compliance', value: '99.86%', sub: '↑ vs 99.5% floor', color: 'text-green-600' },
        ].map((k, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-lg p-3">
            <div className="text-[9px] font-bold uppercase tracking-wider text-gray-400 mb-1">{k.label}</div>
            <div className={`text-xl font-extrabold ${k.color || 'text-gray-900'}`}>{k.value}</div>
            <div className="text-[10px] text-gray-400 mt-0.5">{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Collections funnel */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-6 pt-5 pb-2">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Collections Funnel</h2>
            <span className="text-xs text-gray-400">Week 3 · All channels</span>
          </div>
          <p className="text-xs text-gray-400 mb-5">End-to-end conversion — click any step for trend</p>
          <div className="flex items-start gap-1">
            {funnelSteps.map((step, i) => (
              <FunnelStep
                key={step.key}
                label={step.label}
                value={step.value}
                sub={step.sub}
                pct={step.pct}
                isLast={i === funnelSteps.length - 1}
                isExpanded={expandedFunnel === step.key}
                onClick={() => setExpandedFunnel(expandedFunnel === step.key ? null : step.key)}
              />
            ))}
          </div>
          {expandedFunnel && (
            <div className="mt-4 pt-4" style={{ borderTop: '1px solid #d4eae5' }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold text-gray-900">{expandedFunnel}</span>
                <span className="text-xs text-gray-400">— 18-day trend</span>
              </div>
              <ResponsiveContainer width="100%" height={120}>
                <AreaChart data={funnelTrendData[expandedFunnel]} margin={{ top: 5, right: 10, bottom: 5, left: 10 }}>
                  <defs>
                    <linearGradient id="funnelGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#2196af" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#2196af" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="day" tick={{ fontSize: 10 }} stroke="#9ca3af" />
                  <YAxis tick={{ fontSize: 10 }} stroke="#9ca3af" />
                  <Tooltip />
                  <Area type="monotone" dataKey="value" stroke="#2196af" fill="url(#funnelGrad)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
        <div className="grid grid-cols-5 gap-px mt-4" style={{ borderTop: '1px solid #d4eae5' }}>
          {[
            { label: 'Unreached',   value: '7,440', note: 'Skip trace / re-attempt in progress' },
            { label: 'No RPC',      value: '1,200', note: 'Connected but not right party' },
            { label: 'No PTP',      value: '2,957', note: 'Engaged but no commitment' },
            { label: 'Broken PTP',  value: '129',   note: '620 total broken this placement' },
            { label: 'In progress', value: '469',   note: 'Active payment plans running' },
          ].map((d, i) => (
            <div key={i} className="px-4 py-3" style={{ backgroundColor: '#f8fcfb' }}>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Drop-off: {d.label}</div>
              <div className="text-sm font-bold text-red-500">{d.value}</div>
              <div className="text-[10px] text-gray-400 mt-0.5">{d.note}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Collections over time */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Collections Over Time</h2>
          <span className="text-xs text-gray-400">Daily + cumulative · 18 days</span>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={dailyData}>
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#2196af" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#2196af" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="day" label={{ value: 'Day', position: 'insideBottom', offset: -5 }} stroke="#9ca3af" />
            <YAxis yAxisId="left"  label={{ value: 'Daily ($)', angle: -90, position: 'insideLeft' }} stroke="#9ca3af" />
            <YAxis yAxisId="right" orientation="right" label={{ value: 'Cumulative ($)', angle: 90, position: 'insideRight' }} stroke="#9ca3af" />
            <Tooltip />
            <Area  yAxisId="left"  type="monotone" dataKey="dailyCollections"      stroke="#2196af" fill="url(#grad)" />
            <Line  yAxisId="right" type="monotone" dataKey="cumulativeCollections" stroke="#61ab5e" strokeWidth={2} dot={false} />
            <ReferenceLine yAxisId="left" x={3}  stroke="#2196af" strokeDasharray="3 3" label={{ value: 'Day 3: SMS-first',    position: 'top', fill: '#2196af', fontSize: 11 }} />
            <ReferenceLine yAxisId="left" x={12} stroke="#2196af" strokeDasharray="3 3" label={{ value: 'Day 12: Voice 5x/wk', position: 'top', fill: '#2196af', fontSize: 11 }} />
            <ReferenceLine yAxisId="left" x={17} stroke="#2196af" strokeDasharray="3 3" label={{ value: 'Day 17: Settlements',  position: 'top', fill: '#2196af', fontSize: 11 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Weekly KPI Table */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Weekly KPI Summary</h2>
        <div className="rounded-lg overflow-hidden" style={{ border: '1px solid #d4eae5' }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: '#f0faf8', borderBottom: '1px solid #d4eae5' }}>
                {['Metric', 'Week 1', 'Week 2', 'Week 3', 'Target'].map(h => (
                  <th key={h} className={`py-2.5 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wide ${h === 'Metric' ? 'text-left' : 'text-center'}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { metric: 'Liquidation Rate', w1: '1.8%', w2: '2.3%', w3: '2.7%', target: '2.5%', beat: true },
                { metric: 'Contact Rate',      w1: '31%',  w2: '35%',  w3: '38%',  target: '40%',  beat: false },
                { metric: 'RPC Rate',          w1: '22%',  w2: '25%',  w3: '28%',  target: '30%',  beat: false },
                { metric: 'PTP Rate',          w1: '8%',   w2: '10%',  w3: '12%',  target: '12%',  beat: true },
                { metric: 'Kept-PTP',          w1: '62%',  w2: '65%',  w3: '68%',  target: '70%',  beat: false },
                { metric: 'Resolution Rate',   w1: '1.8%', w2: '3.9%', w3: '6.2%', target: '—',    beat: null },
                { metric: 'Compliance Score',  w1: '99.91%', w2: '99.88%', w3: '99.86%', target: '99.5%', beat: true },
              ].map((row, i) => (
                <tr key={i} className="last:border-0" style={{ borderBottom: '1px solid #ecf6f3' }}>
                  <td className="py-2.5 px-4 font-medium text-gray-900">{row.metric}</td>
                  <td className="py-2.5 px-4 text-center text-gray-500 tabular-nums">{row.w1}</td>
                  <td className="py-2.5 px-4 text-center text-gray-600 tabular-nums">{row.w2}</td>
                  <td className="py-2.5 px-4 text-center font-bold tabular-nums" style={{ color: '#2196af' }}>{row.w3}</td>
                  <td className="py-2.5 px-4 text-center">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      row.beat === true ? 'bg-green-100 text-green-700' :
                      row.beat === false ? 'bg-amber-100 text-amber-700' :
                      'bg-gray-100 text-gray-500'
                    }`}>{row.target}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── TAB: Inbound ──────────────────────────────────────────────────────────────

function InboundTab() {
  return (
    <div className="px-8 py-6 space-y-6">
      {/* Highlights */}
      <div className="grid grid-cols-5 gap-4">
        <HL label="Inbound Calls Today" value="85" sub="Avg 4 min / call" />
        <HL label="Payment Bot Completion" value="78%" sub="Full IVR resolution" color="text-green-600" />
        <HL label="Live Transfers" value="20" sub="12 disputes · 8 hardship" />
        <HL label="Email / Web Inbound" value="34" sub="18 payment portal visits" />
        <HL label="Avg Handle Time" value="4.2 min" sub="Bot: 3.1 · Human: 6.8" />
      </div>

      {/* Inbound volume chart */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Inbound Volume by Type</h2>
          <span className="text-xs text-gray-400">18-day trend</span>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={inboundData}>
            <defs>
              <linearGradient id="payGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#61ab5e" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#61ab5e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="day" tick={{ fontSize: 10 }} stroke="#9ca3af" />
            <YAxis tick={{ fontSize: 10 }} stroke="#9ca3af" />
            <Tooltip />
            <Area type="monotone" dataKey="paymentCalls" name="Payment calls" stroke="#61ab5e" fill="url(#payGrad)" strokeWidth={2} />
            <Line type="monotone" dataKey="disputes"    name="Disputes"       stroke="#ef4444" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="hardship"    name="Hardship"       stroke="#f59e0b" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="emailInbound" name="Email/web"     stroke="#8b5cf6" strokeWidth={2} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
        <div className="flex items-center gap-5 mt-3">
          {[['#61ab5e','Payment calls'], ['#ef4444','Disputes'], ['#f59e0b','Hardship'], ['#8b5cf6','Email/web']].map(([c, l]) => (
            <div key={l} className="flex items-center gap-1.5">
              <span className="w-3 h-2 rounded-sm" style={{ backgroundColor: c }} />
              <span className="text-xs text-gray-500">{l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Inbound routing breakdown */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">Bot Routing Outcomes</h3>
          <div className="space-y-3">
            {[
              { label: 'Payment completed via bot', count: 66,  pct: 78, color: '#61ab5e' },
              { label: 'Transferred to live agent', count: 15,  pct: 18, color: '#2196af' },
              { label: 'Abandoned / hung up',        count: 4,   pct: 5,  color: '#f59e0b' },
            ].map((r, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-700">{r.label}</span>
                  <span className="font-bold text-gray-900">{r.count} <span className="text-gray-400 font-normal">({r.pct}%)</span></span>
                </div>
                <div className="w-full h-1.5 rounded-full" style={{ backgroundColor: '#d4eae5' }}>
                  <div className="h-1.5 rounded-full" style={{ width: `${r.pct}%`, backgroundColor: r.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">Live Transfer Dispositions</h3>
          <div className="space-y-2.5">
            {[
              { type: 'Dispute — account validity',  count: 12, outcome: '8 pending, 4 resolved' },
              { type: 'Hardship / cannot pay',       count: 8,  outcome: '7 offered plan, 1 escalated' },
              { type: 'Verification required',        count: 4,  outcome: '4 verified, DNC updated' },
              { type: 'Legal / attorney rep',         count: 2,  outcome: '2 flagged, Compliance notified' },
              { type: 'Balance dispute',              count: 3,  outcome: '2 resolved, 1 pending data' },
            ].map((r, i) => (
              <div key={i} className="flex items-start justify-between text-xs py-2 border-b border-gray-100 last:border-0">
                <span className="text-gray-700 font-medium flex-1 pr-4">{r.type}</span>
                <span className="text-gray-900 font-bold w-6 text-right flex-shrink-0">{r.count}</span>
                <span className="text-gray-400 flex-1 text-right">{r.outcome}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Calling reason + sentiment */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">Calling Reason Breakdown & Sentiment</h3>
        <div className="rounded-lg overflow-hidden" style={{ border: '1px solid #d4eae5' }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: '#f0faf8', borderBottom: '1px solid #d4eae5' }}>
                {['Reason', 'Count', 'Share', 'Sentiment', 'Resolution'].map(h => (
                  <th key={h} className={`py-2 px-3 text-xs font-semibold text-gray-600 uppercase tracking-wide ${h === 'Reason' || h === 'Resolution' ? 'text-left' : 'text-center'}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sentimentData.callingReasons.map((row, i) => (
                <tr key={i} className="last:border-0" style={{ borderBottom: '1px solid #ecf6f3' }}>
                  <td className="py-2.5 px-3 font-medium text-gray-900">{row.reason}</td>
                  <td className="py-2.5 px-3 text-center tabular-nums text-gray-700">{row.count}</td>
                  <td className="py-2.5 px-3 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <div className="w-14 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: '#d4eae5' }}>
                        <div className="h-full rounded-full" style={{ width: `${row.pct * 2.7}%`, backgroundColor: '#2196af' }} />
                      </div>
                      <span className="text-xs text-gray-600 tabular-nums w-7">{row.pct}%</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span className={`inline-flex items-center gap-1 text-xs font-medium ${sentColor(row.sentiment)}`}>
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${sentDot(row.sentiment)}`} />
                      {row.sentiment.charAt(0).toUpperCase() + row.sentiment.slice(1)}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-xs text-gray-600">{row.resolution}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── TAB: Promises ─────────────────────────────────────────────────────────────

function PromisesTab() {
  return (
    <div className="px-8 py-6 space-y-6">
      {/* Highlights */}
      <div className="grid grid-cols-5 gap-4">
        <HL label="Total PTPs Made" value="403" sub="All 3 weeks" />
        <HL label="Kept-PTP Rate" value="68%" sub="274 kept · 129 broken" color="text-amber-600" />
        <HL label="Warm PTP" value="312" sub="Via voice / direct contact" />
        <HL label="Cold PTP" value="91" sub="Via SMS / email" />
        <HL label="At-Risk PTP Value" value="$142K" sub="89 accounts · missed 1st installment" color="text-red-600" />
      </div>

      {/* Weekly PTP trend */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">PTP Pipeline by Week</h2>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={ptpDetailData} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="week" tick={{ fontSize: 11 }} stroke="#9ca3af" />
            <YAxis tick={{ fontSize: 10 }} stroke="#9ca3af" />
            <Tooltip />
            <Bar dataKey="made"   name="PTPs Made"   fill="#2196af" radius={[3,3,0,0]} />
            <Bar dataKey="kept"   name="PTPs Kept"   fill="#61ab5e" radius={[3,3,0,0]} />
            <Bar dataKey="broken" name="PTPs Broken" fill="#ef4444" radius={[3,3,0,0]} />
          </BarChart>
        </ResponsiveContainer>
        <div className="flex items-center gap-5 mt-3">
          {[['#2196af','Made'], ['#61ab5e','Kept'], ['#ef4444','Broken']].map(([c, l]) => (
            <div key={l} className="flex items-center gap-1.5">
              <span className="w-3 h-2 rounded-sm" style={{ backgroundColor: c }} />
              <span className="text-xs text-gray-500">{l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly PTP detail table */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">Weekly PTP Detail</h3>
        <div className="rounded-lg overflow-hidden" style={{ border: '1px solid #d4eae5' }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: '#f0faf8', borderBottom: '1px solid #d4eae5' }}>
                {['Week', 'PTPs Made', 'Kept', 'Broken', 'Adherence %', 'Est. Value'].map(h => (
                  <th key={h} className={`py-2.5 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wide ${h === 'Week' ? 'text-left' : 'text-center'}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ptpDetailData.map((row, i) => (
                <tr key={i} className="last:border-0" style={{ borderBottom: '1px solid #ecf6f3' }}>
                  <td className="py-2.5 px-4 font-medium text-gray-900">{row.week}</td>
                  <td className="py-2.5 px-4 text-center tabular-nums text-gray-700">{row.made}</td>
                  <td className="py-2.5 px-4 text-center tabular-nums text-green-700 font-semibold">{row.kept}</td>
                  <td className="py-2.5 px-4 text-center tabular-nums text-red-600 font-semibold">{row.broken}</td>
                  <td className="py-2.5 px-4 text-center">
                    <span className={`text-sm font-bold ${row.keptPct >= 70 ? 'text-green-600' : 'text-amber-600'}`}>{row.keptPct}%</span>
                  </td>
                  <td className="py-2.5 px-4 text-center tabular-nums font-semibold text-gray-900">${row.value.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PTP by cohort */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">PTP Performance by Cohort</h3>
        <div className="rounded-lg overflow-hidden" style={{ border: '1px solid #d4eae5' }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: '#f0faf8', borderBottom: '1px solid #d4eae5' }}>
                {['Cohort', 'PTP Rate', 'Adherence', 'Avg PTP Value', 'At-Risk Value', 'Status'].map(h => (
                  <th key={h} className={`py-2.5 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wide ${h === 'Cohort' ? 'text-left' : 'text-center'}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ptpByCohort.map((row, i) => (
                <tr key={i} className="last:border-0" style={{ borderBottom: '1px solid #ecf6f3' }}>
                  <td className="py-2.5 px-4 font-medium text-gray-900">{row.cohort}</td>
                  <td className="py-2.5 px-4 text-center tabular-nums font-semibold" style={{ color: '#2196af' }}>{row.ptpRate}%</td>
                  <td className="py-2.5 px-4 text-center">
                    <span className={`text-sm font-bold ${row.adherence >= 70 ? 'text-green-600' : row.adherence >= 60 ? 'text-amber-600' : 'text-red-600'}`}>{row.adherence}%</span>
                  </td>
                  <td className="py-2.5 px-4 text-center tabular-nums text-gray-700">${row.avgValue.toLocaleString()}</td>
                  <td className="py-2.5 px-4 text-center tabular-nums text-red-600 font-semibold">${row.atRisk.toLocaleString()}</td>
                  <td className="py-2.5 px-4 text-center">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                      row.adherence >= 70 ? 'bg-green-100 text-green-700' :
                      row.adherence >= 60 ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {row.adherence >= 70 ? '✓ On target' : row.adherence >= 60 ? '⚠ Monitor' : '↓ Action needed'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PTP recovery actions */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">Broken PTP Recovery Actions</h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            { count: 89, label: 'Missed 1st installment', action: 'SMS reminder + human agent call within 24h', urgency: 'high' },
            { count: 40, label: 'Missed 2nd installment', action: 'Escalate to settlement offer (15% discount)', urgency: 'high' },
            { count: 620, label: 'Total broken (placement)', action: 'Analyst: re-score, queue for next wave', urgency: 'medium' },
          ].map((r, i) => (
            <div key={i} className={`rounded-lg p-4 border ${r.urgency === 'high' ? 'border-red-200 bg-red-50' : 'border-amber-200 bg-amber-50'}`}>
              <div className={`text-3xl font-extrabold mb-1 ${r.urgency === 'high' ? 'text-red-600' : 'text-amber-600'}`}>{r.count}</div>
              <div className="text-xs font-semibold text-gray-700 mb-2">{r.label}</div>
              <div className={`text-xs ${r.urgency === 'high' ? 'text-red-700' : 'text-amber-700'}`}>→ {r.action}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── TAB: Agent Performance ────────────────────────────────────────────────────

function AgentPerformanceTab() {
  return (
    <div className="px-8 py-6 space-y-6">
      {/* Highlights */}
      <div className="grid grid-cols-5 gap-4">
        <HL label="Active Human Agents" value="6" sub="All agents working" />
        <HL label="Avg Daily Calls" value="45" sub="Per agent outbound" />
        <HL label="Avg Quality Score" value="87/100" sub="↑ from 82 at start" color="text-blue-600" />
        <HL label="Bot Quality Score" value="92/100" sub="Voice AI conversations" color="text-green-600" />
        <HL label="Bot Abandonment" value="22%" sub="Hung up before resolution" color="text-amber-600" />
      </div>

      {/* Agent scoreboard */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Human Agent Scoreboard</h2>
        <div className="rounded-lg overflow-hidden" style={{ border: '1px solid #d4eae5' }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: '#f0faf8', borderBottom: '1px solid #d4eae5' }}>
                {['Agent', 'Daily Calls', 'RPC', 'PTP', 'Collections', 'Quality', 'Trend', 'Top Strength', 'Coaching Need'].map(h => (
                  <th key={h} className={`py-2.5 px-3 text-xs font-semibold text-gray-600 uppercase tracking-wide ${['Agent','Top Strength','Coaching Need'].includes(h) ? 'text-left' : 'text-center'}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {agentPerfData.map((a, i) => (
                <tr key={i} className="last:border-0" style={{ borderBottom: '1px solid #ecf6f3' }}>
                  <td className="py-2.5 px-3 font-semibold text-gray-900">{a.name}</td>
                  <td className="py-2.5 px-3 text-center tabular-nums text-gray-700">{a.calls}</td>
                  <td className="py-2.5 px-3 text-center tabular-nums text-gray-700">{a.rpc}</td>
                  <td className="py-2.5 px-3 text-center tabular-nums font-semibold" style={{ color: '#2196af' }}>{a.ptp}</td>
                  <td className="py-2.5 px-3 text-center tabular-nums font-semibold text-gray-900">${a.collections.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-center">
                    <span className={`text-sm font-bold ${a.quality >= 90 ? 'text-green-600' : a.quality >= 85 ? 'text-blue-600' : 'text-amber-600'}`}>{a.quality}</span>
                  </td>
                  <td className="py-2.5 px-3 text-center text-sm font-bold" style={{ color: a.trend === '↑' ? '#61ab5e' : a.trend === '↓' ? '#ef4444' : '#9ca3af' }}>{a.trend}</td>
                  <td className="py-2.5 px-3 text-xs text-gray-600">{a.strength}</td>
                  <td className="py-2.5 px-3 text-xs text-gray-500">{a.coaching}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Voice AI performance */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Voice AI Bot Performance</h2>
        <div className="grid grid-cols-3 gap-4 mb-5">
          {[
            { bot: 'English General', calls: 800, connect: '38%', ptp: '8%', quality: 92, status: 'Running' },
            { bot: 'English Empathetic (Medical)', calls: 200, connect: '41%', ptp: '11%', quality: 91, status: 'Running' },
            { bot: 'Spanish (TX/FL)', calls: 200, connect: '44%', ptp: '13%', quality: 90, status: 'Running' },
          ].map((b, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs font-bold text-gray-800">{b.bot}</div>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-green-100 text-green-700">{b.status}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div><span className="text-gray-400">Calls/day</span><br /><span className="font-bold text-gray-900">{b.calls.toLocaleString()}</span></div>
                <div><span className="text-gray-400">Connect rate</span><br /><span className="font-bold" style={{ color: '#2196af' }}>{b.connect}</span></div>
                <div><span className="text-gray-400">PTP rate</span><br /><span className="font-bold text-gray-900">{b.ptp}</span></div>
                <div><span className="text-gray-400">Quality</span><br /><span className="font-bold text-green-600">{b.quality}/100</span></div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="text-xs font-bold text-amber-700 mb-2">Bot Drop-Off Analysis</div>
          <div className="grid grid-cols-4 gap-4 text-xs">
            {[
              { label: 'Hung up at greeting', pct: 8 },
              { label: 'Hung up mid-script', pct: 7 },
              { label: 'Disconnected (network)', pct: 4 },
              { label: 'Requested human (transferred)', pct: 18 },
            ].map((d, i) => (
              <div key={i} className="text-center">
                <div className="text-xl font-bold text-amber-700">{d.pct}%</div>
                <div className="text-amber-600 mt-0.5">{d.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Coaching pipeline */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Coaching & Training Pipeline</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Open Coaching Actions</h3>
            <div className="space-y-2.5">
              {[
                { agent: 'Agents 4, 5, 6', issue: '"I already paid" objection handling', due: 'Friday', type: 'Calibration session' },
                { agent: 'All agents', issue: 'Medical debt empathy refresher', due: 'Next Monday', type: 'Group training' },
                { agent: 'Agent 6', issue: 'Mini-Miranda timing (2nd violation)', due: 'Immediate', type: 'Formal warning issued' },
              ].map((c, i) => (
                <div key={i} className="border border-gray-100 rounded-lg p-3">
                  <div className="flex items-start justify-between mb-1">
                    <span className="text-xs font-semibold text-gray-800">{c.agent}</span>
                    <span className="text-[10px] text-gray-400">{c.due}</span>
                  </div>
                  <div className="text-xs text-gray-600 mb-1">{c.issue}</div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 font-medium">{c.type}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Training Compliance</h3>
            <div className="space-y-3">
              {[
                { module: 'Q1 Compliance Refresher', completed: 6, total: 6, pct: 100 },
                { module: 'Mini-Miranda Timing',      completed: 5, total: 6, pct: 83 },
                { module: 'Medical Debt Sensitivity', completed: 4, total: 6, pct: 67 },
                { module: 'Settlement Offer Scripts', completed: 6, total: 6, pct: 100 },
              ].map((t, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-700">{t.module}</span>
                    <span className="font-bold" style={{ color: t.pct === 100 ? '#61ab5e' : '#f59e0b' }}>{t.completed}/{t.total}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full" style={{ backgroundColor: '#d4eae5' }}>
                    <div className="h-1.5 rounded-full" style={{ width: `${t.pct}%`, backgroundColor: t.pct === 100 ? '#61ab5e' : '#f59e0b' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── TAB: Benchmark ────────────────────────────────────────────────────────────

function BenchmarkTab() {
  return (
    <div className="px-8 py-6 space-y-6">
      {/* Highlights */}
      <div className="grid grid-cols-4 gap-4">
        <HL label="Overall Ranking" value="#1" sub="of 4 agencies on same portfolio" color="text-blue-600" />
        <HL label="Liquidation vs Next" value="+12.5%" sub="Skit 2.7% vs Agency C 2.4%" color="text-green-600" />
        <HL label="Cost per $1 Collected" value="$0.18" sub="vs $0.22 next best" color="text-green-600" />
        <HL label="Compliance Score" value="99.86%" sub="vs 99.6% next best" />
      </div>

      {/* Benchmark chart */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Head-to-Head: Skit.ai vs Agency A / B / C</h2>
        <p className="text-xs text-gray-400 mb-5">Same portfolio type · Hypercare Week 3 · Liquidation rate (%) — Skit.ai highlighted</p>
        <div className="space-y-3">
          {agencyBenchmark.map((row, i) => {
            const max = Math.max(row.skit, row.agencyC, row.agencyB, row.agencyA);
            const formatVal = (v) => row.unit === '$' ? `$${v}` : `${v}${row.unit}`;
            const skitBest = row.higher ? row.skit >= max : row.skit <= Math.min(row.agencyC, row.agencyB, row.agencyA);
            return (
              <div key={i} className="border border-gray-100 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-gray-800">{row.metric}</span>
                  {skitBest && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-green-100 text-green-700">Best in class</span>}
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: 'Skit.ai', val: row.skit, isSkit: true },
                    { label: 'Agency C', val: row.agencyC },
                    { label: 'Agency B', val: row.agencyB },
                    { label: 'Agency A', val: row.agencyA },
                  ].map((a, j) => {
                    const pct = row.higher
                      ? (a.val / max) * 100
                      : ((1 / a.val) / (1 / Math.min(row.skit, row.agencyA))) * 100;
                    const cappedPct = Math.min(pct, 100);
                    return (
                      <div key={j}>
                        <div className="flex justify-between text-[10px] mb-1">
                          <span className={a.isSkit ? 'font-bold' : 'text-gray-400'} style={a.isSkit ? { color: '#2196af' } : {}}>
                            {a.label}
                          </span>
                          <span className={a.isSkit ? 'font-bold' : 'text-gray-500'} style={a.isSkit ? { color: '#2196af' } : {}}>
                            {formatVal(a.val)}
                          </span>
                        </div>
                        <div className="w-full h-1.5 rounded-full" style={{ backgroundColor: '#e5e7eb' }}>
                          <div className="h-1.5 rounded-full" style={{ width: `${cappedPct}%`, backgroundColor: a.isSkit ? '#2196af' : '#9ca3af' }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Upsell signals */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-gray-700 text-lg">rocket_launch</span>
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Intelligence: Upsell Signals</h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="border-2 rounded-xl p-5" style={{ borderColor: '#2196af40' }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded text-white" style={{ background: 'linear-gradient(135deg, #2196af, #61ab5e)' }}>Outperforming</span>
              <span className="text-sm font-bold text-gray-900">Auto-Finance &lt;$3K Portfolio</span>
            </div>
            <p className="text-sm text-gray-600 mb-3">Outperforming at 4.1%, 1.6x above aggregate benchmark. Client has 22,000 similar accounts in-house.</p>
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
              <span>Confidence: <strong style={{ color: '#2196af' }}>High</strong></span>
              <span>|</span>
              <span>Projected: <strong>$205K over 60 days</strong></span>
            </div>
            <button className="px-4 py-2 rounded-lg text-white text-xs font-bold" style={{ background: 'linear-gradient(135deg, #2196af, #61ab5e)' }}>Draft Upsell Case</button>
          </div>
          <div className="border border-gray-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-700">Negative Trend</span>
              <span className="text-sm font-bold text-gray-900">Fintech Tier 2: Latency Drop</span>
            </div>
            <p className="text-sm text-gray-600 mb-3">Contact rate declined by 18%. Unit economics forecast suggests escalation.</p>
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
              <span>Severity: <strong className="text-amber-600">Medium</strong></span>
              <span>|</span>
              <span>Est. impact: <strong>-$34K/month</strong></span>
            </div>
            <button className="px-4 py-2 rounded-lg text-gray-700 text-xs font-bold" style={{ backgroundColor: '#f0faf8', border: '1px solid #d4eae5' }}>Review Economic Draft</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── TAB: Enrichment ───────────────────────────────────────────────────────────

function EnrichmentTab() {
  return (
    <div className="px-8 py-6 space-y-6">
      {/* Highlights */}
      <div className="grid grid-cols-4 gap-4">
        <HL label="Accounts Skip-Traced" value="878" sub="Of 1,024 needing enrichment" color="text-blue-600" />
        <HL label="Data Issue Accounts" value="153" sub="Missing contact at placement" />
        <HL label="Cell Coverage" value="72%" sub="↑ from 64% at placement" color="text-green-600" />
        <HL label="Email Coverage" value="58%" sub="↑ from 46% at placement" color="text-green-600" />
      </div>

      {/* Coverage before/after */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Contact Coverage: Before vs After Enrichment</h2>
        <div className="space-y-4">
          {enrichmentData.coverage.map((c, i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-medium text-gray-800">{c.label}</span>
                <span className="text-xs text-gray-400">{c.note}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="text-[10px] text-gray-400 mb-0.5">At placement ({c.before}%)</div>
                  <div className="w-full h-2 rounded-full" style={{ backgroundColor: '#e5e7eb' }}>
                    <div className="h-2 rounded-full" style={{ width: `${c.before}%`, backgroundColor: '#9ca3af' }} />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-[10px] mb-0.5" style={{ color: '#2196af' }}>Now ({c.after}%)</div>
                  <div className="w-full h-2 rounded-full" style={{ backgroundColor: '#e5e7eb' }}>
                    <div className="h-2 rounded-full" style={{ width: `${c.after}%`, backgroundColor: '#2196af' }} />
                  </div>
                </div>
                <div className="text-xs font-bold text-green-600 w-12 text-right">+{c.after - c.before}pts</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skip trace sources */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">Skip Trace Source Breakdown</h3>
          <div className="space-y-3">
            {enrichmentData.skipTrace.map((s, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-700">{s.source}</span>
                  <span className="font-bold text-gray-900">{s.found} <span className="text-gray-400 font-normal">({s.pct}%)</span></span>
                </div>
                <div className="w-full h-1.5 rounded-full" style={{ backgroundColor: '#d4eae5' }}>
                  <div className="h-1.5 rounded-full" style={{ width: `${s.pct}%`, backgroundColor: s.source === 'Failed' ? '#ef4444' : '#2196af' }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-gray-500">
            Total accounts enriched: <strong className="text-gray-900">878</strong> of 1,024 attempted
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">Portfolio Composition</h3>
          <div className="space-y-3">
            {[
              { label: 'Debt Type: Credit Card',    pct: 42, color: '#2196af' },
              { label: 'Debt Type: Medical',        pct: 30, color: '#ef4444' },
              { label: 'Debt Type: Personal Loan',  pct: 28, color: '#8b5cf6' },
              { label: 'State: TX + FL',            pct: 33, color: '#f59e0b' },
              { label: 'State: CA + NY',            pct: 26, color: '#61ab5e' },
              { label: 'Prior Placements: Primary', pct: 45, color: '#06b6d4' },
            ].map((d, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600">{d.label}</span>
                  <span className="font-bold text-gray-900">{d.pct}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full" style={{ backgroundColor: '#e5e7eb' }}>
                  <div className="h-1.5 rounded-full" style={{ width: `${d.pct}%`, backgroundColor: d.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Propensity re-scoring signals */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Propensity Re-Scoring Signals</h2>
        <div className="rounded-lg overflow-hidden" style={{ border: '1px solid #d4eae5' }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: '#f0faf8', borderBottom: '1px solid #d4eae5' }}>
                {['Signal', 'Weight', 'Accounts Affected', 'Action Triggered'].map(h => (
                  <th key={h} className={`py-2.5 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wide ${h === 'Signal' || h === 'Action Triggered' ? 'text-left' : 'text-center'}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {enrichmentData.propensitySignals.map((row, i) => (
                <tr key={i} className="last:border-0" style={{ borderBottom: '1px solid #ecf6f3' }}>
                  <td className="py-2.5 px-4 font-medium text-gray-900">{row.signal}</td>
                  <td className="py-2.5 px-4 text-center">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      row.weight === 'High' ? 'bg-blue-100 text-blue-700' :
                      row.weight === 'Medium' ? 'bg-amber-100 text-amber-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>{row.weight}</span>
                  </td>
                  <td className="py-2.5 px-4 text-center tabular-nums font-semibold text-gray-900">{row.accounts}</td>
                  <td className="py-2.5 px-4 text-xs text-gray-600">{row.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── TAB: Cohorts ──────────────────────────────────────────────────────────────

function CohortsTab({ onNavigate }) {
  const [expandedCohort, setExpandedCohort] = React.useState(null);

  return (
    <div className="px-8 py-6 space-y-6">
      {/* Highlights */}
      <div className="grid grid-cols-4 gap-4">
        <HL label="Total Cohorts" value="5" sub="All active" />
        <HL label="Best Cohort Liq" value="4.1%" sub="High prop / Low bal" color="text-green-600" />
        <HL label="Re-scored Accounts" value="340" sub="Low → Medium propensity" color="text-blue-600" />
        <HL label="At-Risk Cohort" value="Low/High bal" sub="Diminishing ROI — monitor" color="text-amber-600" />
      </div>

      {/* Cohort cards */}
      <div className="grid grid-cols-5 gap-3">
        {cohortMetrics.map((c, i) => (
          <button
            key={i}
            onClick={() => setExpandedCohort(expandedCohort === i ? null : i)}
            className="text-left bg-white border border-gray-200 rounded-xl p-4 transition-all hover:shadow-md"
            style={
              c.highlight
                ? { borderColor: '#61ab5e', borderWidth: '2px', boxShadow: '0 4px 12px rgba(97,171,94,0.15)' }
                : expandedCohort === i
                ? { borderColor: '#2196af', boxShadow: '0 0 0 2px rgba(33,150,175,0.12)' }
                : {}
            }
          >
            <div className="flex items-start justify-between mb-3">
              <div className="text-xs font-semibold text-gray-900 leading-tight flex-1 pr-1">{c.name}</div>
              <span className="text-xs font-bold px-1.5 py-0.5 rounded flex-shrink-0" style={{ backgroundColor: 'rgba(97,171,94,0.1)', color: '#61ab5e' }}>{c.change}</span>
            </div>
            <div className="text-3xl font-extrabold mb-1" style={{ color: '#2196af' }}>{c.liquidation}%</div>
            <div className="text-[10px] text-gray-400 mb-3">Liquidation rate</div>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs" style={{ borderTop: '1px solid #d4eae5', paddingTop: '8px' }}>
              <div><span className="text-gray-400">Contact</span> <span className="font-semibold text-gray-900">{c.contact}%</span></div>
              <div><span className="text-gray-400">RPC</span> <span className="font-semibold text-gray-900">{c.rpc}%</span></div>
              <div><span className="text-gray-400">PTP</span> <span className="font-semibold text-gray-900">{c.ptp}%</span></div>
              <div><span className="text-gray-400">Coll</span> <span className="font-semibold text-gray-900">${(c.collections/1000).toFixed(0)}k</span></div>
            </div>
            {expandedCohort === i && (
              <div className="mt-3 pt-3 text-xs space-y-1" style={{ borderTop: '1px solid #d4eae5' }}>
                <div className="flex justify-between"><span className="text-gray-400">Cost</span><span className="font-semibold">${(c.cost/1000).toFixed(1)}k</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Margin</span><span className={`font-semibold ${c.negativeMargin ? 'text-red-600' : 'text-green-600'}`}>{c.negativeMargin ? '' : '+'}{(c.margin/1000).toFixed(1)}k</span></div>
                <div className="flex justify-between"><span className="text-gray-400">$/dollar</span><span className={`font-semibold ${c.negativeMargin ? 'text-red-600' : 'text-gray-700'}`}>${c.costPerDollar.toFixed(2)}</span></div>
                {c.negativeMargin && <div className="text-[10px] text-red-600 font-medium mt-1">⚠ Negative margin</div>}
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Cohort detail table */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Cohort Detail Table</h2>
        <div className="rounded-lg overflow-hidden" style={{ border: '1px solid #d4eae5' }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: '#f0faf8', borderBottom: '1px solid #d4eae5' }}>
                {['Cohort', 'Accounts', 'Avg Balance', 'Propensity', 'Liquidation', 'Contact', 'RPC', 'PTP', 'Collections', 'Margin', 'Status'].map(h => (
                  <th key={h} className={`py-2.5 px-3 text-xs font-semibold text-gray-600 uppercase tracking-wide ${h === 'Cohort' || h === 'Status' ? 'text-left' : 'text-center'}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { cohort: 'High prop / Low bal',   accounts: 2400, avgBal: 1200, prop: 'High',   status: '✅ Above target', ...cohortMetrics[0] },
                { cohort: 'High prop / High bal',  accounts: 1800, avgBal: 4500, prop: 'High',   status: '✅ Above target', ...cohortMetrics[1] },
                { cohort: 'Medium prop / All bal', accounts: 4200, avgBal: 2600, prop: 'Medium', status: '⚠ Slightly below', ...cohortMetrics[2] },
                { cohort: 'Low prop / Low bal',    accounts: 2100, avgBal: 900,  prop: 'Low',    status: '➡ Expected', ...cohortMetrics[3] },
                { cohort: 'Low prop / High bal',   accounts: 1500, avgBal: 5200, prop: 'Low',    status: '⚠ Below target', ...cohortMetrics[4] },
              ].map((row, i) => (
                <tr key={i} className="last:border-0" style={{ borderBottom: '1px solid #ecf6f3' }}>
                  <td className="py-2.5 px-3 font-medium text-gray-900 text-xs">{row.cohort}</td>
                  <td className="py-2.5 px-3 text-center tabular-nums text-gray-700">{row.accounts.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-center tabular-nums text-gray-700">${row.avgBal.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-center">
                    <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${
                      row.prop === 'High' ? 'bg-green-100 text-green-700' :
                      row.prop === 'Medium' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>{row.prop}</span>
                  </td>
                  <td className="py-2.5 px-3 text-center font-bold tabular-nums" style={{ color: '#2196af' }}>{row.liquidation}%</td>
                  <td className="py-2.5 px-3 text-center tabular-nums text-gray-700">{row.contact}%</td>
                  <td className="py-2.5 px-3 text-center tabular-nums text-gray-700">{row.rpc}%</td>
                  <td className="py-2.5 px-3 text-center tabular-nums text-gray-700">{row.ptp}%</td>
                  <td className="py-2.5 px-3 text-center tabular-nums font-semibold text-gray-900">${(row.collections/1000).toFixed(0)}k</td>
                  <td className="py-2.5 px-3 text-center tabular-nums font-semibold" style={{ color: row.negativeMargin ? '#ef4444' : '#61ab5e' }}>
                    {row.negativeMargin ? '-' : '+'}{Math.abs(row.margin/1000).toFixed(1)}k
                  </td>
                  <td className="py-2.5 px-3 text-xs text-gray-600">{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cohort strategy */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Cohort Strategy Assignment</h2>
        <div className="rounded-lg overflow-hidden" style={{ border: '1px solid #d4eae5' }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: '#f0faf8', borderBottom: '1px solid #d4eae5' }}>
                {['Cohort', 'Voice AI', 'Human Agent', 'SMS', 'Email', 'Strategy'].map(h => (
                  <th key={h} className={`py-2.5 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wide ${h === 'Cohort' || h === 'Strategy' ? 'text-left' : 'text-center'}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { cohort: 'High prop / Low bal',   voice: '—', human: '—',        sms: '3x/wk', email: '2x/wk', strategy: 'Digital-only — cost efficient' },
                { cohort: 'High prop / High bal',  voice: '5x/wk', human: 'On escalation', sms: '2x/wk', email: '1x/wk', strategy: 'AI → Human escalation' },
                { cohort: 'Medium prop',           voice: '3x/wk', human: '2x/wk', sms: '3x/wk', email: '2x/wk', strategy: 'Full multi-channel blitz' },
                { cohort: 'Low prop / Low bal',    voice: '—', human: '—',        sms: '—',    email: '1x/mo', strategy: 'Low-touch email only' },
                { cohort: 'Low prop / High bal',   voice: '1x/wk', human: '5x/wk', sms: '1x/wk', email: '1x/wk', strategy: 'Human priority — skip-traced' },
              ].map((row, i) => (
                <tr key={i} className="last:border-0" style={{ borderBottom: '1px solid #ecf6f3' }}>
                  <td className="py-2.5 px-4 font-medium text-gray-900">{row.cohort}</td>
                  <td className="py-2.5 px-4 text-center text-xs text-gray-600">{row.voice}</td>
                  <td className="py-2.5 px-4 text-center text-xs text-gray-600">{row.human}</td>
                  <td className="py-2.5 px-4 text-center text-xs text-gray-600">{row.sms}</td>
                  <td className="py-2.5 px-4 text-center text-xs text-gray-600">{row.email}</td>
                  <td className="py-2.5 px-4 text-xs text-gray-600 italic">{row.strategy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── TABS config ───────────────────────────────────────────────────────────────

const TABS = [
  { id: 'overview',   label: 'Overview' },
  { id: 'inbound',    label: 'Inbound' },
  { id: 'promises',   label: 'Promises' },
  { id: 'agents',     label: 'Agent Performance' },
  { id: 'benchmark',  label: 'Benchmark' },
  { id: 'enrichment', label: 'Enrichment' },
  { id: 'cohorts',    label: 'Cohorts' },
];

// ── Main Component ────────────────────────────────────────────────────────────

export default function Performance({ onNavigate }) {
  const [activeTab, setActiveTab] = React.useState('overview');

  return (
    <div className="min-h-full bg-gray-50">

      {/* ── FIXED HERO STRIP ───────────────────────────────────────────────── */}
      <div className="px-8 pt-8 pb-6 bg-white border-b border-gray-200">

        {/* Title row */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Performance</h1>
            <p className="text-sm text-gray-500 mt-0.5">Apex Recovery Partners · Hypercare Week 3 · Day 18</p>
          </div>
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
            style={{ background: 'linear-gradient(135deg, rgba(33,150,175,0.12), rgba(97,171,94,0.12))', color: '#2196af', border: '1px solid rgba(33,150,175,0.3)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#61ab5e' }} />
            Above activation target
          </span>
        </div>

        {/* Hero cards */}
        <div className="grid grid-cols-3 gap-5">
          {/* Total Collected */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Total Collected</div>
            <div className="text-4xl font-extrabold text-gray-900 mb-1">$287,400</div>
            <div className="text-xs text-gray-400 mb-3">Day 1 – Day 18 cumulative</div>
            <Sparkline data={dailyData} dataKey="cumulativeCollections" color="#61ab5e" />
            <div className="mt-2 flex items-center gap-2 text-xs font-medium">
              <span style={{ color: '#61ab5e' }}>↑ $25,200 yesterday</span>
              <span className="text-gray-300">·</span>
              <span className="text-gray-400">Avg $15,967/day</span>
            </div>
          </div>

          {/* Liquidation Rate */}
          <div className="bg-white border border-gray-200 rounded-xl p-5" style={{ borderColor: '#2196af40' }}>
            <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#2196af' }}>Liquidation Rate</div>
            <div className="flex items-end gap-3 mb-1">
              <div className="text-4xl font-extrabold text-gray-900">2.7%</div>
              <div className="mb-1.5 text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(97,171,94,0.1)', color: '#61ab5e', border: '1px solid rgba(97,171,94,0.25)' }}>↑ +0.2% vs target</div>
            </div>
            <div className="text-xs text-gray-400 mb-3">Target: 2.5% · 6-mo avg: 2.1%</div>
            <Sparkline data={dailyData} dataKey="liquidation" color="#2196af" />
            <div className="mt-2 flex items-center gap-2 text-xs font-medium">
              <span style={{ color: '#2196af' }}>Week 1: 1.8%</span>
              <span className="text-gray-300">→</span>
              <span style={{ color: '#2196af' }}>Week 2: 2.3%</span>
              <span className="text-gray-300">→</span>
              <span className="font-bold" style={{ color: '#61ab5e' }}>Week 3: 2.7%</span>
            </div>
          </div>

          {/* Agency Ranking */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Agency Ranking</div>
            <div className="flex items-end gap-3 mb-3">
              <div className="text-4xl font-extrabold text-gray-900">#1</div>
              <div className="mb-1.5 text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(97,171,94,0.1)', color: '#61ab5e', border: '1px solid rgba(97,171,94,0.25)' }}>of 4 agencies</div>
            </div>
            <div className="text-xs text-gray-400 mb-4">Liquidation rate · same portfolio type · Hypercare Wk 3</div>
            <div className="space-y-2">
              {[
                { label: 'Skit.ai',  val: 2.7, isSkit: true },
                { label: 'Agency C', val: 2.4 },
                { label: 'Agency B', val: 2.1 },
                { label: 'Agency A', val: 1.9 },
              ].map((a, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className={`text-[11px] w-16 flex-shrink-0 ${a.isSkit ? 'font-bold' : 'text-gray-400'}`} style={a.isSkit ? { color: '#2196af' } : {}}>
                    {a.label}
                  </div>
                  <div className="flex-1 rounded-full h-1.5" style={{ backgroundColor: '#d4eae5' }}>
                    <div className="h-1.5 rounded-full" style={{ width: `${(a.val / 3) * 100}%`, backgroundColor: a.isSkit ? '#2196af' : '#9ca3af' }} />
                  </div>
                  <div className={`text-[11px] w-8 text-right flex-shrink-0 tabular-nums ${a.isSkit ? 'font-bold' : 'text-gray-400'}`} style={a.isSkit ? { color: '#2196af' } : {}}>
                    {a.val}%
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 text-xs font-medium" style={{ color: '#2196af' }}>12.5% above next best agency</div>
          </div>
        </div>
      </div>

      {/* ── TAB BAR ─────────────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-200 px-8">
        <div className="flex gap-0">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── TAB CONTENT ─────────────────────────────────────────────────────── */}
      {activeTab === 'overview'   && <OverviewTab onNavigate={onNavigate} />}
      {activeTab === 'inbound'    && <InboundTab />}
      {activeTab === 'promises'   && <PromisesTab />}
      {activeTab === 'agents'     && <AgentPerformanceTab />}
      {activeTab === 'benchmark'  && <BenchmarkTab />}
      {activeTab === 'enrichment' && <EnrichmentTab />}
      {activeTab === 'cohorts'    && <CohortsTab onNavigate={onNavigate} />}

    </div>
  );
}
