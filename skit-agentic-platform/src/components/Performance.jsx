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

const hlBadgeMap = {
  'text-green-600': { bg: 'bg-green-50', text: 'text-green-700', label: '↑' },
  'text-red-600':   { bg: 'bg-red-50',   text: 'text-red-700',   label: '↓' },
  'text-amber-600': { bg: 'bg-amber-50', text: 'text-amber-700', label: '~' },
  'text-blue-600':  { bg: 'bg-blue-50',  text: 'text-blue-700',  label: 'i' },
};

const HL = ({ label, value, sub, color }) => {
  const badge = color ? hlBadgeMap[color] : null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">{label}</div>
      <div className="flex items-baseline gap-1.5">
        <div className="text-2xl font-extrabold text-gray-900">{value}</div>
        {badge && <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${badge.bg} ${badge.text}`}>{badge.label}</span>}
      </div>
      {sub && <div className="text-xs text-gray-400 mt-0.5">{sub}</div>}
    </div>
  );
};

// Bar-chart style funnel (like Google Analytics screenshot)
const BarFunnel = ({ viewMode }) => {
  // Account-level values
  const accountSteps = [
    { label: 'Accounts',  accounts: 12000, dollars: 33600000, pct: 100,  convPct: null,   dropPct: null },
    { label: 'Contacted', accounts: 4560,  dollars: 14400000, pct: 38,   convPct: '38%',  dropPct: '62%' },
    { label: 'RPC',       accounts: 3360,  dollars: 10100000, pct: 28,   convPct: '74%',  dropPct: '26%' },
    { label: 'PTP',       accounts: 403,   dollars: 1780000,  pct: 3.4,  convPct: '12%',  dropPct: '88%' },
    { label: 'Kept PTP',  accounts: 274,   dollars: 1210000,  pct: 2.3,  convPct: '68%',  dropPct: '32%' },
    { label: 'Resolved',  accounts: 743,   dollars: 2870000,  pct: 6.2,  convPct: null,   dropPct: null },
  ];

  const maxVal = viewMode === 'accounts' ? 12000 : 33600000;
  const fmtVal = (step) => viewMode === 'accounts'
    ? step.accounts.toLocaleString()
    : `$${(step.dollars / 1000000).toFixed(1)}M`;
  const barPct = (step) => viewMode === 'accounts'
    ? (step.accounts / maxVal) * 100
    : (step.dollars / maxVal) * 100;

  const BAR_COLOR = '#2196af';
  const CONNECTOR_COLOR = '#d4eae5';
  const MAX_BAR_HEIGHT = 160;

  return (
    <div className="flex items-end gap-0 w-full" style={{ height: MAX_BAR_HEIGHT + 80 }}>
      {accountSteps.map((step, i) => {
        const h = Math.max((barPct(step) / 100) * MAX_BAR_HEIGHT, 8);
        const isLast = i === accountSteps.length - 1;
        return (
          <React.Fragment key={step.label}>
            <div className="flex flex-col items-center flex-1">
              {/* Value label above bar */}
              <div className="text-xs font-bold text-gray-700 mb-1 tabular-nums">{fmtVal(step)}</div>
              {/* Conversion badge */}
              {step.convPct && (
                <div className="text-[10px] font-semibold px-1.5 py-0.5 rounded mb-1" style={{ background: 'rgba(33,150,175,0.12)', color: '#2196af' }}>
                  {step.convPct}
                </div>
              )}
              {!step.convPct && i > 0 && <div className="mb-4" />}
              {/* Bar */}
              <div
                className="w-full rounded-t-md transition-all"
                style={{ height: h, backgroundColor: BAR_COLOR, opacity: 0.85 + i * 0.02 }}
              />
              {/* Step label */}
              <div className="text-[10px] font-bold uppercase tracking-wide text-gray-500 mt-2 text-center leading-tight">{step.label}</div>
              {/* Drop-off */}
              {step.dropPct && (
                <div className="text-[10px] text-gray-900 font-medium mt-0.5">↓ {step.dropPct} <span className="text-[9px] font-semibold px-1 py-0.5 rounded-full bg-red-50 text-red-700">drop</span></div>
              )}
            </div>
            {/* Arrow connector */}
            {!isLast && (
              <div className="flex-shrink-0 flex items-end pb-8">
                <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
                  <rect x="0" y="8" width="20" height="4" rx="2" fill={CONNECTOR_COLOR} />
                  <path d="M18 4 L26 10 L18 16" stroke={CONNECTOR_COLOR} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

// ── KPI / Chart data keyed by period + granularity ───────────────────────────

const KPI_METRICS = [
  { key: 'liq',     metric: 'Liquidation Rate', unit: '%', target: 2.5 },
  { key: 'contact', metric: 'Contact Rate',      unit: '%', target: 40  },
  { key: 'rpc',     metric: 'RPC Rate',          unit: '%', target: 30  },
  { key: 'ptp',     metric: 'PTP Rate',          unit: '%', target: 12  },
  { key: 'kptp',    metric: 'Kept-PTP Rate',     unit: '%', target: 70  },
  { key: 'res',     metric: 'Resolution Rate',   unit: '%', target: null },
];

// Base KPI values per period (All Creditors baseline)
const BASE_KPI = {
  'All Time': { monthly: [
    { label: 'Jan', liq: 1.4, contact: 28, rpc: 19, ptp: 6,  kptp: 58, res: 1.2 },
    { label: 'Feb', liq: 1.9, contact: 32, rpc: 23, ptp: 9,  kptp: 63, res: 2.8 },
    { label: 'Mar', liq: 2.4, contact: 36, rpc: 26, ptp: 11, kptp: 66, res: 4.6 },
    { label: 'Apr', liq: 2.7, contact: 38, rpc: 28, ptp: 12, kptp: 68, res: 6.2 },
  ]},
  Jan: {
    monthly: [{ label: 'Jan', liq: 1.4, contact: 28, rpc: 19, ptp: 6, kptp: 58, res: 1.2 }],
    weekly:  [
      { label: 'Wk 1', liq: 1.1, contact: 25, rpc: 16, ptp: 4, kptp: 54, res: 0.3 },
      { label: 'Wk 2', liq: 1.3, contact: 27, rpc: 18, ptp: 6, kptp: 57, res: 0.7 },
      { label: 'Wk 3', liq: 1.5, contact: 29, rpc: 20, ptp: 7, kptp: 60, res: 1.1 },
      { label: 'Wk 4', liq: 1.7, contact: 31, rpc: 22, ptp: 8, kptp: 62, res: 1.5 },
    ],
    daily: Array.from({length:31},(_,i) => ({ label: `${i+1}`, liq: +(1.1+i*0.029).toFixed(2), contact: 25+Math.round(i*0.2), rpc: 16+Math.round(i*0.19), ptp: 4+Math.round(i*0.13), kptp: 54+Math.round(i*0.26), res: +(i*0.039).toFixed(1) })),
  },
  Feb: {
    monthly: [{ label: 'Feb', liq: 1.9, contact: 32, rpc: 23, ptp: 9, kptp: 63, res: 2.8 }],
    weekly:  [
      { label: 'Wk 1', liq: 1.7, contact: 30, rpc: 21, ptp: 7,  kptp: 60, res: 1.7 },
      { label: 'Wk 2', liq: 1.9, contact: 32, rpc: 23, ptp: 9,  kptp: 62, res: 2.1 },
      { label: 'Wk 3', liq: 2.0, contact: 33, rpc: 24, ptp: 9,  kptp: 64, res: 2.5 },
      { label: 'Wk 4', liq: 2.1, contact: 34, rpc: 25, ptp: 10, kptp: 65, res: 2.9 },
    ],
    daily: Array.from({length:28},(_,i) => ({ label: `${i+1}`, liq: +(1.7+i*0.015).toFixed(2), contact: 30+Math.round(i*0.14), rpc: 21+Math.round(i*0.15), ptp: 7+Math.round(i*0.11), kptp: 60+Math.round(i*0.18), res: +(1.7+i*0.043).toFixed(1) })),
  },
  Mar: {
    monthly: [{ label: 'Mar', liq: 2.4, contact: 36, rpc: 26, ptp: 11, kptp: 66, res: 4.6 }],
    weekly:  [
      { label: 'Wk 1', liq: 2.1, contact: 33, rpc: 23, ptp: 9,  kptp: 63, res: 3.2 },
      { label: 'Wk 2', liq: 2.3, contact: 35, rpc: 25, ptp: 10, kptp: 65, res: 3.8 },
      { label: 'Wk 3', liq: 2.5, contact: 37, rpc: 27, ptp: 11, kptp: 67, res: 4.4 },
      { label: 'Wk 4', liq: 2.6, contact: 38, rpc: 27, ptp: 12, kptp: 67, res: 5.0 },
    ],
    daily: Array.from({length:31},(_,i) => ({ label: `${i+1}`, liq: +(2.1+i*0.016).toFixed(2), contact: 33+Math.round(i*0.16), rpc: 23+Math.round(i*0.16), ptp: 9+Math.round(i*0.097), kptp: 63+Math.round(i*0.13), res: +(3.2+i*0.058).toFixed(1) })),
  },
  Apr: {
    monthly: [{ label: 'Apr', liq: 2.7, contact: 38, rpc: 28, ptp: 12, kptp: 68, res: 6.2 }],
    weekly:  [
      { label: 'Wk 1', liq: 2.6, contact: 37, rpc: 27, ptp: 11, kptp: 67, res: 5.5 },
      { label: 'Wk 2', liq: 2.7, contact: 38, rpc: 28, ptp: 12, kptp: 68, res: 6.2 },
    ],
    daily: Array.from({length:13},(_,i) => ({ label: `${i+1}`, liq: +(2.6+i*0.008).toFixed(2), contact: 37+Math.round(i*0.08), rpc: 27+Math.round(i*0.08), ptp: 11+Math.round(i*0.077), kptp: 67+Math.round(i*0.077), res: +(5.5+i*0.058).toFixed(1) })),
  },
};

// Collections over time data per period
const COLLECTIONS_DATA = {
  'All Time': [
    { label: 'Jan', daily: 62400,  cumulative: 62400  },
    { label: 'Feb', daily: 75200,  cumulative: 137600 },
    { label: 'Mar', daily: 98400,  cumulative: 236000 },
    { label: 'Apr', daily: 51400,  cumulative: 287400 },
  ],
  Jan: Array.from({length:31},(_,i) => ({ label: `${i+1}`, daily: 1200+Math.round(i*62), cumulative: (i+1)*2010+Math.round(i*i*3) })),
  Feb: Array.from({length:28},(_,i) => ({ label: `${i+1}`, daily: 1800+Math.round(i*78), cumulative: 62400+(i+1)*2685+Math.round(i*i*4) })),
  Mar: Array.from({length:31},(_,i) => ({ label: `${i+1}`, daily: 2400+Math.round(i*95), cumulative: 137600+(i+1)*3174+Math.round(i*i*5) })),
  Apr: Array.from({length:13},(_,i) => ({ label: `${i+1}`, daily: 8200+Math.round(i*1309), cumulative: 236000+[8200,20600,36200,54400,69200,85400,96800,114600,133800,155200,172000,193600,216800,240000][i]||0 })),
};

// Apply creditor multiplier to a data point
function applyCreditorMult(point, creditor) {
  const m = CREDITOR_MULTIPLIERS[creditor] || CREDITOR_MULTIPLIERS['All Creditors'];
  return {
    ...point,
    liq:     +(point.liq     * m.liq).toFixed(2),
    contact: Math.round(point.contact * m.contact),
    rpc:     Math.round((point.rpc || 0) * m.contact),
    ptp:     Math.round((point.ptp || 0) * m.liq),
    kptp:    Math.round((point.kptp || 0) * ((m.liq + 1) / 2)),
    res:     +((point.res || 0) * m.liq).toFixed(1),
    daily:        point.daily        ? Math.round(point.daily        * m.collected) : undefined,
    cumulative:   point.cumulative   ? Math.round(point.cumulative   * m.collected) : undefined,
  };
}

// Derive the periods array to show in KPI cards
function getKpiPeriods(period, granularity, creditor) {
  const gran = granularity === 'Monthly' ? 'monthly' : granularity === 'Weekly' ? 'weekly' : 'daily';
  const raw = BASE_KPI[period]?.[gran] || BASE_KPI['All Time'].monthly;
  return raw.map(p => applyCreditorMult(p, creditor));
}

// Derive chart data for Collections Over Time
function getCollectionsData(period, granularity, creditor) {
  if (period === 'All Time') {
    return COLLECTIONS_DATA['All Time'].map(p => applyCreditorMult(p, creditor));
  }
  const gran = granularity === 'Daily' ? period : period; // weekly also maps to daily data, sliced
  const raw = COLLECTIONS_DATA[period] || COLLECTIONS_DATA['Apr'];
  if (granularity === 'Weekly') {
    // Aggregate daily into weeks
    const weeks = [];
    for (let w = 0; w < 4; w++) {
      const slice = raw.slice(w*7, (w+1)*7);
      if (!slice.length) break;
      const sum = slice.reduce((a, b) => a + b.daily, 0);
      const last = slice[slice.length - 1];
      weeks.push({ label: `Wk ${w+1}`, daily: sum, cumulative: last.cumulative });
    }
    return weeks.map(p => applyCreditorMult(p, creditor));
  }
  return raw.map(p => applyCreditorMult(p, creditor));
}

function getXLabel(period, granularity) {
  if (period === 'All Time') return 'Month';
  if (granularity === 'Weekly') return 'Week';
  return 'Day';
}

// ── KPI Summary ───────────────────────────────────────────────────────────────

function KpiSummary({ filters }) {
  const { period, granularity, selectedCreditor } = filters;
  const periods = getKpiPeriods(period, granularity, selectedCreditor);
  const latest  = periods[periods.length - 1];

  const periodLabel = period === 'All Time'
    ? `Jan – Apr 13 · ${granularity}`
    : `${period} · ${granularity}`;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">KPI Summary</h2>
        <span className="text-xs text-gray-400">{periodLabel}{selectedCreditor !== 'All Creditors' ? ` · ${selectedCreditor}` : ''}</span>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {KPI_METRICS.map((m, i) => {
          const vals   = periods.map(p => p[m.key]);
          const current = latest[m.key];
          const maxVal  = Math.max(...vals, m.target || 0);
          const barW    = v => `${Math.min(Math.round((v / maxVal) * 100), 100)}%`;
          const beat    = m.target ? current >= m.target : null;
          return (
            <div key={i} className="border border-gray-100 rounded-xl p-4">
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-semibold text-gray-600">{m.metric}</span>
                {beat !== null && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${beat ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                    {beat ? 'Above target' : 'Near target'}
                  </span>
                )}
              </div>
              <div className="text-2xl font-extrabold mb-0.5" style={{ color: '#2196af' }}>{current}{m.unit}</div>
              <div className="text-[10px] text-gray-400 mb-3">{latest.label} · {m.target ? `Target: ${m.target}${m.unit}` : 'No target set'}</div>
              <div className="space-y-1.5">
                {periods.map((p, j) => (
                  <div key={j} className="flex items-center gap-2">
                    <span className="text-[9px] text-gray-400 w-7 flex-shrink-0 truncate">{p.label}</span>
                    <div className="flex-1 h-2 rounded-full" style={{ backgroundColor: '#f3f4f6' }}>
                      <div className="h-2 rounded-full transition-all" style={{ width: barW(p[m.key]), backgroundColor: j === periods.length - 1 ? '#2196af' : '#93c5fd' }} />
                    </div>
                    <span className="text-[10px] font-semibold tabular-nums text-gray-700 w-8 text-right">{p[m.key]}{m.unit}</span>
                  </div>
                ))}
                {m.target && (
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] text-gray-400 w-7 flex-shrink-0">Goal</span>
                    <div className="flex-1 h-2 rounded-full" style={{ backgroundColor: '#f3f4f6' }}>
                      <div className="h-2 rounded-full" style={{ width: barW(m.target), backgroundColor: '#61ab5e', opacity: 0.55 }} />
                    </div>
                    <span className="text-[10px] font-semibold tabular-nums text-gray-700 w-8 text-right">{m.target}{m.unit}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── TAB: Overview ─────────────────────────────────────────────────────────────

function OverviewTab({ onNavigate, filters }) {
  const { period, granularity, selectedCreditor, viewMode } = filters;
  const chartData  = getCollectionsData(period, granularity, selectedCreditor);
  const xLabel     = getXLabel(period, granularity);

  const fmtTick = v => viewMode === 'dollars' ? `$${(v/1000).toFixed(0)}K` : v.toLocaleString();

  const funnelLabel = period === 'All Time'
    ? 'All Time · All channels'
    : `${period} · ${granularity}`;

  return (
    <div className="px-8 py-6 space-y-6">

      {/* Collections funnel */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-6 pt-5 pb-4">
          <div className="flex items-center justify-between mb-1">
            <div>
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Collections Funnel</h2>
              <p className="text-xs text-gray-400 mt-0.5">{funnelLabel} · End-to-end conversion{selectedCreditor !== 'All Creditors' ? ` · ${selectedCreditor}` : ''}</p>
            </div>
            <span className="text-xs text-gray-400">Viewing by: <strong className="text-gray-700">{viewMode === 'accounts' ? '# Accounts' : '$ Value'}</strong></span>
          </div>
          <div className="mt-5 px-2">
            <BarFunnel viewMode={viewMode} />
          </div>
        </div>
        <div className="grid grid-cols-5 gap-px" style={{ borderTop: '1px solid #d4eae5' }}>
          {[
            { label: 'Unreached',   accounts: '7,440', dollars: '$18.6M', note: 'Skip trace / re-attempt in progress' },
            { label: 'No RPC',      accounts: '1,200', dollars: '$4.3M',  note: 'Connected but not right party' },
            { label: 'No PTP',      accounts: '2,957', dollars: '$8.3M',  note: 'Engaged but no commitment' },
            { label: 'Broken PTP',  accounts: '129',   dollars: '$0.6M',  note: '620 total broken this placement' },
            { label: 'In progress', accounts: '469',   dollars: '$1.7M',  note: 'Active payment plans running' },
          ].map((d, i) => (
            <div key={i} className="px-4 py-3" style={{ backgroundColor: '#f8fcfb' }}>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Drop-off: {d.label}</div>
              <div className="text-sm font-bold text-gray-900">{viewMode === 'accounts' ? d.accounts : d.dollars} <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-red-50 text-red-700">Drop</span></div>
              <div className="text-[10px] text-gray-400 mt-0.5">{d.note}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Collections over time — driven by filters */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Collections Over Time</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {period === 'All Time' ? 'Jan – Apr 13' : period} · {granularity}{selectedCreditor !== 'All Creditors' ? ` · ${selectedCreditor}` : ''}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5"><span className="w-3 h-2 rounded-sm" style={{ backgroundColor: '#2196af' }} /><span className="text-xs text-gray-500">Daily collected</span></div>
            <div className="flex items-center gap-1.5"><span className="w-3 h-2 rounded-sm" style={{ backgroundColor: '#61ab5e' }} /><span className="text-xs text-gray-500">Cumulative</span></div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={chartData} key={`${period}-${granularity}-${selectedCreditor}`}>
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#2196af" stopOpacity={0.18} />
                <stop offset="95%" stopColor="#2196af" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="label" tick={{ fontSize: 10 }} stroke="#9ca3af" label={{ value: xLabel, position: 'insideBottom', offset: -2, fontSize: 11 }} />
            <YAxis yAxisId="left"  tickFormatter={v => `$${(v/1000).toFixed(0)}K`} stroke="#9ca3af" tick={{ fontSize: 10 }} width={52} />
            <YAxis yAxisId="right" orientation="right" tickFormatter={v => `$${(v/1000).toFixed(0)}K`} stroke="#9ca3af" tick={{ fontSize: 10 }} width={52} />
            <Tooltip formatter={(v, name) => [`$${v.toLocaleString()}`, name === 'daily' ? 'Daily collected' : 'Cumulative']} labelFormatter={l => `${xLabel} ${l}`} />
            <Area yAxisId="left"  type="monotone" dataKey="daily"      name="daily"      stroke="#2196af" fill="url(#grad)" strokeWidth={2} />
            <Line yAxisId="right" type="monotone" dataKey="cumulative" name="cumulative" stroke="#61ab5e" strokeWidth={2} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* KPI Summary */}
      <KpiSummary filters={filters} />
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
                  <td className="py-2.5 px-4 text-center tabular-nums text-gray-900 font-semibold">{row.kept} <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-green-50 text-green-700">Kept</span></td>
                  <td className="py-2.5 px-4 text-center tabular-nums text-gray-900 font-semibold">{row.broken} <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-red-50 text-red-700">Broken</span></td>
                  <td className="py-2.5 px-4 text-center">
                    <span className="text-sm font-bold text-gray-900">{row.keptPct}%</span>{' '}<span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${row.keptPct >= 70 ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>{row.keptPct >= 70 ? 'On track' : 'Monitor'}</span>
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
                    <span className="text-sm font-bold text-gray-900">{row.adherence}%</span>{' '}<span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${row.adherence >= 70 ? 'bg-green-50 text-green-700' : row.adherence >= 60 ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'}`}>{row.adherence >= 70 ? '↑' : row.adherence >= 60 ? '~' : '↓'}</span>
                  </td>
                  <td className="py-2.5 px-4 text-center tabular-nums text-gray-700">${row.avgValue.toLocaleString()}</td>
                  <td className="py-2.5 px-4 text-center tabular-nums text-gray-900 font-semibold">${row.atRisk.toLocaleString()} <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-red-50 text-red-700">At risk</span></td>
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
              <div className="text-3xl font-extrabold text-gray-900 mb-1">{r.count} <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${r.urgency === 'high' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'}`}>{r.urgency === 'high' ? 'Urgent' : 'Monitor'}</span></div>
              <div className="text-xs font-semibold text-gray-700 mb-2">{r.label}</div>
              <div className={`text-xs ${r.urgency === 'high' ? 'text-red-700' : 'text-amber-700'}`}>→ {r.action}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Plans section */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Payment Plans</h3>
          <span className="text-xs text-gray-400">Active installment arrangements</span>
        </div>
        <div className="grid grid-cols-4 gap-4 mb-5">
          {[
            { label: 'Active Plans', value: '94', sub: 'In good standing', color: 'text-green-600' },
            { label: 'Total Plan Value', value: '$218K', sub: 'Outstanding balance', color: 'text-gray-900' },
            { label: 'Avg Monthly Payment', value: '$184', sub: 'Across all plans', color: 'text-gray-900' },
            { label: 'Plans at Risk', value: '23', sub: 'Missed last installment', color: 'text-red-600' },
          ].map((c, i) => (
            <div key={i} className="border border-gray-100 rounded-lg p-4">
              <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">{c.label}</div>
              <div className={`text-2xl font-extrabold ${c.color}`}>{c.value}</div>
              <div className="text-[10px] text-gray-400 mt-0.5">{c.sub}</div>
            </div>
          ))}
        </div>
        <div className="rounded-lg overflow-hidden" style={{ border: '1px solid #d4eae5' }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: '#f0faf8', borderBottom: '1px solid #d4eae5' }}>
                {['Cohort', 'Active Plans', 'Avg Plan ($)', 'Avg Term', 'On Track', 'At Risk'].map(h => (
                  <th key={h} className={`py-2.5 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wide ${h === 'Cohort' ? 'text-left' : 'text-center'}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { cohort: 'High prop / High bal',  plans: 32, avg: 4200, term: '6 mo', onTrack: 28, atRisk: 4 },
                { cohort: 'Medium prop / All bal',  plans: 41, avg: 2100, term: '4 mo', onTrack: 33, atRisk: 8 },
                { cohort: 'Low prop / High bal',    plans: 18, avg: 4800, term: '8 mo', onTrack: 9,  atRisk: 9 },
                { cohort: 'High prop / Low bal',    plans: 3,  avg: 980,  term: '3 mo', onTrack: 3,  atRisk: 0 },
                { cohort: 'Low prop / Low bal',     plans: 0,  avg: 0,    term: '—',    onTrack: 0,  atRisk: 2 },
              ].map((row, i) => (
                <tr key={i} className="last:border-0" style={{ borderBottom: '1px solid #ecf6f3' }}>
                  <td className="py-2.5 px-4 font-medium text-gray-900">{row.cohort}</td>
                  <td className="py-2.5 px-4 text-center tabular-nums text-gray-700">{row.plans}</td>
                  <td className="py-2.5 px-4 text-center tabular-nums text-gray-700">{row.avg > 0 ? `$${row.avg.toLocaleString()}` : '—'}</td>
                  <td className="py-2.5 px-4 text-center text-gray-600">{row.term}</td>
                  <td className="py-2.5 px-4 text-center tabular-nums font-semibold text-green-700">{row.onTrack}</td>
                  <td className="py-2.5 px-4 text-center tabular-nums font-semibold text-red-600">{row.atRisk > 0 ? row.atRisk : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
                    <span className="text-sm font-bold text-gray-900">{a.quality}</span>{' '}<span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${a.quality >= 90 ? 'bg-green-50 text-green-700' : a.quality >= 85 ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'}`}>{a.quality >= 90 ? '↑' : a.quality >= 85 ? '~' : '↓'}</span>
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
                <div><span className="text-gray-400">Quality</span><br /><span className="font-bold text-gray-900">{b.quality}/100</span></div>
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
                <div className="text-xl font-bold text-gray-900">{d.pct}%</div>
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
                <div className="w-16 text-right"><span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-green-50 text-green-700">+{c.after - c.before}pts</span></div>
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

const perfClients = [
  { client: 'Meridian Bank', debtType: 'Credit Card', accounts: 2840, balance: 8200000, collected: 221400, liqRate: 2.7, avgAge: '11 mo', status: 'above',
    cohorts: [
      { name: 'High Prop / High Bal', accounts: 620, collected: 84200, liqRate: 3.4, age: '8 mo', channels: ['Voice', 'SMS', 'Human'] },
      { name: 'High Prop / Low Bal', accounts: 480, collected: 38400, liqRate: 2.9, age: '9 mo', channels: ['SMS', 'Email'] },
      { name: 'Medium Prop', accounts: 740, collected: 48100, liqRate: 2.4, age: '12 mo', channels: ['Voice', 'SMS', 'Email'] },
      { name: 'Low Prop / High Bal', accounts: 340, collected: 22100, liqRate: 1.6, age: '18 mo', channels: ['Human', 'SMS'] },
      { name: 'Low Prop / Low Bal', accounts: 280, collected: 4200, liqRate: 0.5, age: '22 mo', channels: ['Email'] },
    ]},
  { client: 'Pinnacle Financial', debtType: 'Credit Card', accounts: 2180, balance: 5960000, collected: 143400, liqRate: 2.4, avgAge: '13 mo', status: 'on-target',
    cohorts: [
      { name: 'High Prop', accounts: 540, collected: 52200, liqRate: 3.0, age: '10 mo', channels: ['Voice', 'SMS'] },
      { name: 'Medium Prop', accounts: 780, collected: 48600, liqRate: 2.2, age: '14 mo', channels: ['SMS', 'Email'] },
      { name: 'Low Prop / High Bal', accounts: 420, collected: 28400, liqRate: 1.4, age: '19 mo', channels: ['Human'] },
      { name: 'Low Prop / Low Bal', accounts: 440, collected: 14200, liqRate: 0.4, age: '20 mo', channels: ['Email'] },
    ]},
  { client: 'Clearview Medical', debtType: 'Medical', accounts: 2040, balance: 3570000, collected: 135660, liqRate: 3.8, avgAge: '10 mo', status: 'above',
    cohorts: [
      { name: 'High Prop / Empathetic', accounts: 680, collected: 58400, liqRate: 4.6, age: '6 mo', channels: ['Voice'] },
      { name: 'Medium Prop', accounts: 820, collected: 52800, liqRate: 3.2, age: '11 mo', channels: ['SMS', 'Email'] },
      { name: 'Low Prop', accounts: 540, collected: 24460, liqRate: 1.4, age: '16 mo', channels: ['Email'] },
    ]},
  { client: 'Crestline Lending', debtType: 'Personal Loan', accounts: 1920, balance: 6720000, collected: 120960, liqRate: 1.8, avgAge: '16 mo', status: 'below',
    cohorts: [
      { name: 'High Prop', accounts: 380, collected: 42800, liqRate: 2.6, age: '12 mo', channels: ['Voice', 'SMS'] },
      { name: 'Medium Prop', accounts: 640, collected: 44200, liqRate: 1.7, age: '17 mo', channels: ['Voice', 'SMS', 'Email'] },
      { name: 'Low Prop', accounts: 900, collected: 33960, liqRate: 0.6, age: '22 mo', channels: ['Email'] },
    ]},
  { client: 'Summit Health', debtType: 'Medical', accounts: 1580, balance: 2133000, collected: 90000, liqRate: 4.2, avgAge: '9 mo', status: 'above',
    cohorts: [
      { name: 'High Prop', accounts: 520, collected: 38200, liqRate: 5.1, age: '5 mo', channels: ['Voice', 'SMS'] },
      { name: 'Medium Prop', accounts: 640, collected: 34800, liqRate: 3.6, age: '10 mo', channels: ['SMS', 'Email'] },
      { name: 'Low Prop', accounts: 420, collected: 17000, liqRate: 1.8, age: '14 mo', channels: ['Email'] },
    ]},
  { client: 'Harbor Finance', debtType: 'Personal Loan', accounts: 1440, balance: 5040000, collected: 95760, liqRate: 1.9, avgAge: '18 mo', status: 'below',
    cohorts: [
      { name: 'High Prop', accounts: 320, collected: 36400, liqRate: 2.8, age: '14 mo', channels: ['Voice', 'SMS'] },
      { name: 'Medium Prop', accounts: 520, collected: 34200, liqRate: 1.8, age: '19 mo', channels: ['SMS', 'Human'] },
      { name: 'Low Prop', accounts: 600, collected: 25160, liqRate: 0.5, age: '24 mo', channels: ['Email', 'SMS'] },
    ]},
];

function CohortsTab({ onNavigate }) {
  const [expandedClient, setExpandedClient] = React.useState(null);
  const [hoveredCohort, setHoveredCohort] = React.useState(null);
  const totalCohorts = perfClients.reduce((s, c) => s + c.cohorts.length, 0);

  return (
    <div className="px-8 py-6 space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <HL label="Clients" value="6" sub="All with active cohorts" />
        <HL label="Total Cohorts" value={totalCohorts.toString()} sub="Across all clients" />
        <HL label="Best Client Liq" value="4.2%" sub="Summit Health" />
        <HL label="Re-scored" value="340" sub="Low to Medium propensity" />
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="grid px-6 py-2.5 border-b border-gray-100" style={{ gridTemplateColumns: '1fr 90px 100px 100px 80px' }}>
          <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Client</div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 text-right">Accounts</div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 text-right">Balance</div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 text-right">Collected</div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 text-right">Liq Rate</div>
        </div>
        <div className="divide-y divide-gray-50">
          {perfClients.map((cl, i) => {
            const isExp = expandedClient === cl.client;
            const totalCohortColl = cl.cohorts.reduce((s, ch) => s + ch.collected, 0);
            return (
              <div key={i}>
                <div
                  onClick={() => { setExpandedClient(isExp ? null : cl.client); setHoveredCohort(null); }}
                  className={`grid items-center px-6 py-3 cursor-pointer transition-colors ${isExp ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
                  style={{ gridTemplateColumns: '1fr 90px 100px 100px 80px' }}
                >
                  <div className="flex items-center gap-2 pr-3 min-w-0">
                    <span className={`material-symbols-outlined text-gray-400 transition-transform flex-shrink-0 ${isExp ? 'rotate-90' : ''}`} style={{ fontSize: 14 }}>chevron_right</span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-900 truncate">{cl.client}</span>
                        <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full whitespace-nowrap flex-shrink-0 ${cl.debtType === 'Credit Card' ? 'bg-blue-50 text-blue-700' : cl.debtType === 'Medical' ? 'bg-red-50 text-red-700' : 'bg-purple-50 text-purple-700'}`}>{cl.debtType}</span>
                      </div>
                      <div className="text-[10px] text-gray-400 mt-0.5">avg {cl.avgAge} · {cl.cohorts.length} cohorts</div>
                    </div>
                  </div>
                  <div className="text-right"><div className="text-sm font-bold text-gray-900 tabular-nums">{cl.accounts.toLocaleString()}</div></div>
                  <div className="text-right"><div className="text-sm font-bold text-gray-900 tabular-nums">${(cl.balance/1000000).toFixed(1)}M</div></div>
                  <div className="text-right"><div className="text-sm font-bold text-gray-900 tabular-nums">${cl.collected.toLocaleString()}</div></div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-gray-900 tabular-nums">{cl.liqRate}%</div>
                    <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${cl.status === 'above' ? 'bg-emerald-50 text-emerald-700' : cl.status === 'on-target' ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'}`}>{cl.status === 'above' ? 'Above' : cl.status === 'on-target' ? 'On target' : 'Below'}</span>
                  </div>
                </div>
                {isExp && (
                  <div className="animate-fadeIn" style={{ background: '#f8fcfb' }}>
                    <div className="grid px-6 py-1.5 ml-6" style={{ gridTemplateColumns: '1fr 80px 80px 70px 60px 80px', borderBottom: '1px solid #ecf6f3' }}>
                      <div className="text-[9px] font-bold uppercase tracking-wider text-gray-400">Cohort</div>
                      <div className="text-[9px] font-bold uppercase tracking-wider text-gray-400 text-right">Collected</div>
                      <div className="text-[9px] font-bold uppercase tracking-wider text-gray-400 text-right">% Share</div>
                      <div className="text-[9px] font-bold uppercase tracking-wider text-gray-400 text-right">Liq Rate</div>
                      <div className="text-[9px] font-bold uppercase tracking-wider text-gray-400 text-right">Age</div>
                      <div className="text-[9px] font-bold uppercase tracking-wider text-gray-400 text-center">Channels</div>
                    </div>
                    {cl.cohorts.map((ch, j) => {
                      const share = Math.round((ch.collected / totalCohortColl) * 100);
                      const isHov = hoveredCohort === `${cl.client}-${j}`;
                      const someHov = hoveredCohort && hoveredCohort.startsWith(cl.client);
                      const dim = someHov && !isHov;
                      return (
                        <div key={j} onMouseEnter={() => setHoveredCohort(`${cl.client}-${j}`)} onMouseLeave={() => setHoveredCohort(null)}
                          className={`grid items-center px-6 py-2 ml-6 transition-all ${isHov ? 'bg-white' : ''}`}
                          style={{ gridTemplateColumns: '1fr 80px 80px 70px 60px 80px', opacity: dim ? 0.25 : 1, borderBottom: '1px solid #ecf6f3' }}>
                          <div className="min-w-0">
                            <div className={`text-xs font-medium ${isHov ? 'text-gray-900' : 'text-gray-700'}`}>{ch.name}</div>
                            <div className="text-[10px] text-gray-400">{ch.accounts.toLocaleString()} accounts</div>
                          </div>
                          <div className="text-right"><span className={`text-xs font-bold tabular-nums ${isHov ? 'text-gray-900' : 'text-gray-600'}`}>${(ch.collected/1000).toFixed(0)}K</span></div>
                          <div className="text-right"><span className={`text-[11px] font-bold tabular-nums ${isHov ? 'text-gray-900' : 'text-gray-500'}`}>{share}%</span></div>
                          <div className="text-right"><span className={`text-xs font-bold tabular-nums ${isHov ? 'text-gray-900' : 'text-gray-600'}`}>{ch.liqRate}%</span></div>
                          <div className="text-right"><span className="text-xs text-gray-500 tabular-nums">{ch.age}</span></div>
                          <div className="flex gap-0.5 justify-center">
                            {ch.channels.map(chan => (
                              <span key={chan} className={`text-[7px] font-semibold px-1 py-0.5 rounded ${chan === 'Voice' ? 'bg-emerald-50 text-emerald-700' : chan === 'SMS' ? 'bg-blue-50 text-blue-700' : chan === 'Email' ? 'bg-purple-50 text-purple-700' : 'bg-amber-50 text-amber-700'}`}>{chan}</span>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="grid px-6 py-3 border-t-2" style={{ gridTemplateColumns: '1fr 90px 100px 100px 80px', borderColor: '#d4eae5', backgroundColor: '#f8fcfb' }}>
          <div className="text-xs font-bold text-gray-900 pl-5">Total · 6 clients · {totalCohorts} cohorts</div>
          <div className="text-right text-xs font-bold text-gray-900 tabular-nums">{perfClients.reduce((s,c) => s+c.accounts, 0).toLocaleString()}</div>
          <div className="text-right text-xs font-bold text-gray-900 tabular-nums">${(perfClients.reduce((s,c) => s+c.balance, 0)/1000000).toFixed(1)}M</div>
          <div className="text-right text-xs font-bold text-gray-900 tabular-nums">${perfClients.reduce((s,c) => s+c.collected, 0).toLocaleString()}</div>
          <div className="text-right text-xs font-bold text-gray-900 tabular-nums">2.7%</div>
        </div>
      </div>
    </div>
  );
}

// ── TABS config ───────────────────────────────────────────────────────────────

const TABS = [
  { id: 'overview',   label: 'Overview' },
  { id: 'inbound',    label: 'Inbound' },
  { id: 'promises',   label: 'Promises & Plans' },
  { id: 'cohorts',    label: 'Cohorts' },
];

// ── Main Component ────────────────────────────────────────────────────────────

const PERIODS   = ['All Time', 'Jan', 'Feb', 'Mar', 'Apr'];
const GRANULARS = ['Monthly', 'Weekly', 'Daily'];
const CREDITORS = ['All Creditors', 'Chase Bank', 'Synchrony Financial', 'Avant LLC', 'LendingClub', 'Envision Healthcare', 'LifePoint Health'];

// Per-creditor multipliers so charts shift when creditor changes
const CREDITOR_MULTIPLIERS = {
  'All Creditors':        { liq: 1.00, contact: 1.00, collected: 1.00 },
  'Chase Bank':           { liq: 1.12, contact: 1.08, collected: 0.77 },
  'Synchrony Financial':  { liq: 0.94, contact: 1.00, collected: 0.50 },
  'Avant LLC':            { liq: 0.70, contact: 0.82, collected: 0.42 },
  'LendingClub':          { liq: 0.74, contact: 0.74, collected: 0.33 },
  'Envision Healthcare':  { liq: 1.48, contact: 1.24, collected: 0.47 },
  'LifePoint Health':     { liq: 1.63, contact: 1.34, collected: 0.31 },
};

export default function Performance({ onNavigate }) {
  const [activeTab,        setActiveTab]        = React.useState('overview');
  const [viewMode,         setViewMode]         = React.useState('accounts');
  const [period,           setPeriod]           = React.useState('All Time');
  const [granularity,      setGranularity]      = React.useState('Monthly');
  const [selectedCreditor, setSelectedCreditor] = React.useState('All Creditors');

  // When switching to All Time, force Monthly (weekly/daily don't make sense)
  const handlePeriodChange = (p) => {
    setPeriod(p);
    if (p === 'All Time') setGranularity('Monthly');
  };

  const filters = { period, granularity, selectedCreditor, viewMode };

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
          <div className="flex items-center gap-4 flex-wrap">

            {/* Period */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">Period</span>
              <div className="flex bg-gray-100 rounded-lg p-0.5">
                {PERIODS.map(p => (
                  <button key={p} onClick={() => handlePeriodChange(p)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${period === p ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                  >{p}</button>
                ))}
              </div>
            </div>

            {/* Granularity — disabled on All Time */}
            <div className="flex items-center gap-2">
              <span className={`text-[11px] font-semibold uppercase tracking-wider ${period === 'All Time' ? 'text-gray-300' : 'text-gray-400'}`}>Granularity</span>
              <div className={`flex bg-gray-100 rounded-lg p-0.5 ${period === 'All Time' ? 'opacity-40 pointer-events-none' : ''}`}>
                {GRANULARS.map(g => (
                  <button key={g} onClick={() => setGranularity(g)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${granularity === g ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                  >{g}</button>
                ))}
              </div>
            </div>

            {/* Creditor */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">Creditor</span>
              <select value={selectedCreditor} onChange={e => setSelectedCreditor(e.target.value)}
                className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-blue-400"
              >
                {CREDITORS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* $ / Accounts */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">View</span>
              <div className="flex bg-gray-100 rounded-lg p-0.5">
                <button onClick={() => setViewMode('accounts')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${viewMode === 'accounts' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                ># Accounts</button>
                <button onClick={() => setViewMode('dollars')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${viewMode === 'dollars' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >$ Value</button>
              </div>
            </div>
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
              style={{ background: 'linear-gradient(135deg, rgba(33,150,175,0.12), rgba(97,171,94,0.12))', color: '#2196af', border: '1px solid rgba(33,150,175,0.3)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#61ab5e' }} />
              Above activation target
            </span>
          </div>
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
      {activeTab === 'overview'   && <OverviewTab onNavigate={onNavigate} filters={filters} />}
      {activeTab === 'inbound'    && <InboundTab viewMode={viewMode} />}
      {activeTab === 'promises'   && <PromisesTab viewMode={viewMode} />}
      {activeTab === 'cohorts'    && <CohortsTab onNavigate={onNavigate} viewMode={viewMode} />}

    </div>
  );
}
