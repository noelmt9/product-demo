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

// ── Shared sub-components ─────────────────────────────────────────────────────

const Sparkline = ({ data, dataKey, color = '#61ab5e' }) => (
  <ResponsiveContainer width="100%" height={36}>
    <LineChart data={data}>
      <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} dot={false} />
    </LineChart>
  </ResponsiveContainer>
);


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

// Funnel base data per period
const FUNNEL_BASE = {
  'All Time': { accounts: 12000, contacted: 4560, rpc: 3360, ptp: 403, keptPtp: 274, resolved: 743 },
  Jan:        { accounts: 12000, contacted: 3360, rpc: 2280, ptp: 216, keptPtp: 125, resolved: 144 },
  Feb:        { accounts: 12000, contacted: 3840, rpc: 2760, ptp: 312, keptPtp: 197, resolved: 336 },
  Mar:        { accounts: 12000, contacted: 4320, rpc: 3120, ptp: 372, keptPtp: 245, resolved: 552 },
  Apr:        { accounts: 12000, contacted: 4560, rpc: 3360, ptp: 403, keptPtp: 274, resolved: 743 },
};

function getFunnelData(period, selectedClient, selectedCohort) {
  const m = getFilteredMetrics(selectedClient, selectedCohort);
  const periodScale = { 'All Time': 1.0, Jan: 0.55, Feb: 0.72, Mar: 0.88, Apr: 1.0 }[period] || 1.0;
  const accounts  = m.accounts;
  const contacted = Math.round(accounts * (m.contactRate / 100) * periodScale);
  const rpc       = Math.round(accounts * (m.rpcRate / 100) * periodScale);
  const ptp       = Math.round(accounts * (m.ptpRate / 100) * periodScale);
  const keptPtp   = Math.round(ptp * 0.68);
  const resolved  = Math.round(accounts * (m.liqRate / 100) * periodScale * 2.3);
  return { accounts, contacted, rpc, ptp, keptPtp, resolved };
}

// Bar-chart style funnel (like Google Analytics screenshot)
const BarFunnel = ({ viewMode, period, selectedCreditor, selectedCohort }) => {
  const f = getFunnelData(period, selectedCreditor, selectedCohort);
  const avgBal = 2800; // avg balance for dollar conversion

  const accountSteps = [
    { label: 'Accounts',  accounts: f.accounts,  dollars: f.accounts  * avgBal, convPct: null,                                                     dropPct: null },
    { label: 'Contacted', accounts: f.contacted,  dollars: f.contacted * avgBal, convPct: `${Math.round(f.contacted / f.accounts * 100)}%`,         dropPct: `${100 - Math.round(f.contacted / f.accounts * 100)}%` },
    { label: 'RPC',       accounts: f.rpc,        dollars: f.rpc       * avgBal, convPct: `${Math.round(f.rpc / f.contacted * 100)}%`,              dropPct: `${100 - Math.round(f.rpc / f.contacted * 100)}%` },
    { label: 'PTP',       accounts: f.ptp,        dollars: f.ptp       * avgBal, convPct: `${Math.round(f.ptp / f.rpc * 100)}%`,                   dropPct: `${100 - Math.round(f.ptp / f.rpc * 100)}%` },
    { label: 'Kept PTP',  accounts: f.keptPtp,    dollars: f.keptPtp   * avgBal, convPct: `${Math.round(f.keptPtp / f.ptp * 100)}%`,               dropPct: `${100 - Math.round(f.keptPtp / f.ptp * 100)}%` },
    { label: 'Resolved',  accounts: f.resolved,   dollars: f.resolved  * avgBal, convPct: null,                                                     dropPct: null },
  ];

  const fmtVal = (step) => viewMode === 'accounts'
    ? step.accounts.toLocaleString()
    : `$${(step.dollars / 1000000).toFixed(1)}M`;

  const maxAccounts = accountSteps[0].accounts;
  const FUNNEL_H = 200;
  const STEP_GAP = 2;

  const LABEL_AREA = 30; // space above for value + badge
  const BOTTOM_AREA = 24; // space below for label
  const totalH = LABEL_AREA + FUNNEL_H + BOTTOM_AREA;

  return (
    <div className="w-full">
      <svg width="100%" viewBox={`0 0 900 ${totalH}`} preserveAspectRatio="xMidYMid meet">
        {accountSteps.map((step, i) => {
          const stepW = 900 / accountSteps.length;
          const x = i * stepW;
          const ratio = step.accounts / maxAccounts;
          const nextRatio = i < accountSteps.length - 1 ? accountSteps[i+1].accounts / maxAccounts : ratio;
          const barH = Math.max(ratio * FUNNEL_H, 12);
          const nextBarH = Math.max(nextRatio * FUNNEL_H, 12);
          const yTop = (FUNNEL_H - barH) / 2 + LABEL_AREA;
          const yBot = yTop + barH;
          const nextYTop = (FUNNEL_H - nextBarH) / 2 + LABEL_AREA;
          const nextYBot = nextYTop + nextBarH;
          const isLast = i === accountSteps.length - 1;

          // Center of this step's trapezoid top edge
          const centerX = x + stepW / 2;

          return (
            <React.Fragment key={step.label}>
              {/* Trapezoid shape */}
              {!isLast ? (
                <polygon
                  points={`${x + STEP_GAP},${yTop} ${x + stepW - STEP_GAP},${nextYTop} ${x + stepW - STEP_GAP},${nextYBot} ${x + STEP_GAP},${yBot}`}
                  fill="#4c6ef5"
                  opacity={0.85 - i * 0.08}
                />
              ) : (
                <rect x={x + STEP_GAP} y={nextYTop} width={stepW - STEP_GAP * 2} height={nextBarH} fill="#4c6ef5" opacity={0.5} rx="2" />
              )}
              {/* Value + conversion badge — stacked above the bar */}
              {step.convPct ? (
                <>
                  <text x={centerX} y={yTop - 16} textAnchor="middle" className="fill-gray-900" style={{ fontSize: 13, fontWeight: 700 }}>{fmtVal(step)}</text>
                  <rect x={centerX - 16} y={yTop - 13} width={32} height={14} rx={7} fill="rgba(76,110,245,0.12)" />
                  <text x={centerX} y={yTop - 4} textAnchor="middle" style={{ fontSize: 9, fontWeight: 600, fill: '#4c6ef5' }}>{step.convPct}</text>
                </>
              ) : (
                <text x={centerX} y={yTop - 8} textAnchor="middle" className="fill-gray-900" style={{ fontSize: 13, fontWeight: 700 }}>{fmtVal(step)}</text>
              )}
              {/* Label below */}
              <text x={centerX} y={LABEL_AREA + FUNNEL_H + 16} textAnchor="middle" className="fill-gray-500" style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{step.label}</text>
            </React.Fragment>
          );
        })}
      </svg>
    </div>
  );
};

// Base KPI values per period (All Clients baseline)
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

// Collections over time data per period — realistic curves with mid-week peaks, weekend dips, noise
const _janDaily = [
  1800,1950,2100,2180,2050,1920,1850,
  1980,2120,2240,2300,2150,2020,1940,
  2080,2220,2350,2420,2280,2140,2060,
  2200,2340,2480,2380,2260,2180,2100,
  2320,2440,2380
];
const _febDaily = [
  2300,2450,2580,2680,2520,2380,2300,
  2500,2660,2780,2860,2700,2540,2460,
  2620,2780,2900,2820,2680,2560,2480,
  2740,2900,3020,3100,2940,2780,2700
];
const _marDaily = [
  2800,2960,3100,3200,3040,2880,2800,
  3000,3160,3300,3400,3220,3060,2960,
  3120,3280,3420,3340,3200,3080,3000,
  3240,3400,3540,3620,3460,3300,3200,
  3380,3500,3440
];
const _aprDaily = [
  3200,3360,3500,3580,3420,3280,3200,
  3400,3560,3700,3640,3500,3420
];

function _buildCum(dailyArr, startCum) {
  let cum = startCum || 0;
  return dailyArr.map((d, i) => { cum += d; return { label: `${i+1}`, daily: d, cumulative: cum }; });
}

const COLLECTIONS_DATA = {
  'All Time': [
    { label: 'Jan', daily: _janDaily.reduce((a,b)=>a+b,0),  cumulative: _janDaily.reduce((a,b)=>a+b,0) },
    { label: 'Feb', daily: _febDaily.reduce((a,b)=>a+b,0),  cumulative: _janDaily.reduce((a,b)=>a+b,0) + _febDaily.reduce((a,b)=>a+b,0) },
    { label: 'Mar', daily: _marDaily.reduce((a,b)=>a+b,0),  cumulative: _janDaily.reduce((a,b)=>a+b,0) + _febDaily.reduce((a,b)=>a+b,0) + _marDaily.reduce((a,b)=>a+b,0) },
    { label: 'Apr', daily: _aprDaily.reduce((a,b)=>a+b,0),  cumulative: _janDaily.reduce((a,b)=>a+b,0) + _febDaily.reduce((a,b)=>a+b,0) + _marDaily.reduce((a,b)=>a+b,0) + _aprDaily.reduce((a,b)=>a+b,0) },
  ],
  Jan: _buildCum(_janDaily, 0),
  Feb: _buildCum(_febDaily, _janDaily.reduce((a,b)=>a+b,0)),
  Mar: _buildCum(_marDaily, _janDaily.reduce((a,b)=>a+b,0) + _febDaily.reduce((a,b)=>a+b,0)),
  Apr: _buildCum(_aprDaily, _janDaily.reduce((a,b)=>a+b,0) + _febDaily.reduce((a,b)=>a+b,0) + _marDaily.reduce((a,b)=>a+b,0)),
};

// Apply creditor + cohort multipliers to a data point
function applyFilters(point, creditor, cohort) {
  const cm = CREDITOR_MULTIPLIERS[creditor] || CREDITOR_MULTIPLIERS['All Clients'];
  const co = COHORT_MULTIPLIERS[cohort]     || COHORT_MULTIPLIERS['All Cohorts'];
  const liqM     = cm.liq * co.liq;
  const contactM = cm.contact * co.contact;
  const collM    = cm.collected * co.collected;
  return {
    ...point,
    liq:     +(point.liq     * liqM).toFixed(2),
    contact: Math.round(point.contact * contactM),
    rpc:     Math.round((point.rpc || 0) * contactM),
    ptp:     Math.round((point.ptp || 0) * liqM),
    kptp:    Math.round((point.kptp || 0) * ((liqM + 1) / 2)),
    res:     +((point.res || 0) * liqM).toFixed(1),
    daily:        point.daily        ? Math.round(point.daily        * collM) : undefined,
    cumulative:   point.cumulative   ? Math.round(point.cumulative   * collM) : undefined,
  };
}

// ── Client/Cohort data from Portfolio (shared source of truth) ───────────────

const PORTFOLIO_CLIENTS = {
  'Meridian Bank':         { accounts: 2840, balance: 8200000, collected: 221400, liqRate: 2.7, contactRate: 41, ptpRate: 13 },
  'Pinnacle Financial':    { accounts: 2180, balance: 5960000, collected: 143400, liqRate: 2.4, contactRate: 38, ptpRate: 11 },
  'Crestline Lending':     { accounts: 1920, balance: 6720000, collected: 120960, liqRate: 1.8, contactRate: 31, ptpRate: 9 },
  'Harbor Finance':        { accounts: 1440, balance: 5040000, collected: 95760,  liqRate: 1.9, contactRate: 28, ptpRate: 8 },
  'Clearview Medical Group': { accounts: 2040, balance: 3570000, collected: 135660, liqRate: 3.8, contactRate: 47, ptpRate: 16 },
  'Summit Health Systems': { accounts: 1580, balance: 2133000, collected: 90000,  liqRate: 4.2, contactRate: 51, ptpRate: 18 },
};

const PORTFOLIO_COHORTS = {
  'Meridian Bank': [
    { name: 'High Prop / High Bal', accounts: 620, collected: 84200, liqRate: 3.4, contactRate: 52, ptpRate: 18 },
    { name: 'High Prop / Low Bal',  accounts: 480, collected: 38400, liqRate: 2.9, contactRate: 48, ptpRate: 15 },
    { name: 'Medium Prop / All Bal',accounts: 740, collected: 48100, liqRate: 2.4, contactRate: 36, ptpRate: 11 },
    { name: 'Low Prop / High Bal',  accounts: 340, collected: 22100, liqRate: 1.6, contactRate: 28, ptpRate: 8 },
    { name: 'Low Prop / Low Bal',   accounts: 280, collected: 4200,  liqRate: 0.5, contactRate: 12, ptpRate: 3 },
  ],
  'Pinnacle Financial': [
    { name: 'High Prop / All Bal',  accounts: 540, collected: 52200, liqRate: 3.0, contactRate: 44, ptpRate: 14 },
    { name: 'Medium Prop',          accounts: 780, collected: 48600, liqRate: 2.2, contactRate: 36, ptpRate: 10 },
    { name: 'Low Prop / High Bal',  accounts: 420, collected: 28400, liqRate: 1.4, contactRate: 26, ptpRate: 7 },
    { name: 'Low Prop / Low Bal',   accounts: 440, collected: 14200, liqRate: 0.4, contactRate: 14, ptpRate: 3 },
  ],
  'Crestline Lending': [
    { name: 'High Prop',   accounts: 380, collected: 42800, liqRate: 2.6, contactRate: 38, ptpRate: 12 },
    { name: 'Medium Prop', accounts: 640, collected: 44200, liqRate: 1.7, contactRate: 30, ptpRate: 8 },
    { name: 'Low Prop',    accounts: 900, collected: 33960, liqRate: 0.6, contactRate: 18, ptpRate: 4 },
  ],
  'Harbor Finance': [
    { name: 'High Prop',   accounts: 320, collected: 36400, liqRate: 2.8, contactRate: 36, ptpRate: 11 },
    { name: 'Medium Prop', accounts: 520, collected: 34200, liqRate: 1.8, contactRate: 28, ptpRate: 8 },
    { name: 'Low Prop',    accounts: 600, collected: 25160, liqRate: 0.5, contactRate: 18, ptpRate: 4 },
  ],
  'Clearview Medical Group': [
    { name: 'High Prop / Empathetic', accounts: 680, collected: 58400, liqRate: 4.6, contactRate: 55, ptpRate: 20 },
    { name: 'Medium Prop',            accounts: 820, collected: 52800, liqRate: 3.2, contactRate: 42, ptpRate: 14 },
    { name: 'Low Prop',               accounts: 540, collected: 24460, liqRate: 1.4, contactRate: 22, ptpRate: 6 },
  ],
  'Summit Health Systems': [
    { name: 'High Prop',   accounts: 520, collected: 38200, liqRate: 5.1, contactRate: 58, ptpRate: 22 },
    { name: 'Medium Prop', accounts: 640, collected: 34800, liqRate: 3.6, contactRate: 46, ptpRate: 16 },
    { name: 'Low Prop',    accounts: 420, collected: 17000, liqRate: 1.8, contactRate: 28, ptpRate: 8 },
  ],
};

const ALL_CLIENTS = ['All Clients', ...Object.keys(PORTFOLIO_CLIENTS)];

function getFilteredMetrics(client, cohort) {
  if (client === 'All Clients') return { accounts: 12000, balance: 33600000, collected: 287400, liqRate: 2.7, contactRate: 38, rpcRate: 28, ptpRate: 12 };
  const cl = PORTFOLIO_CLIENTS[client];
  if (!cl) return { accounts: 12000, balance: 33600000, collected: 287400, liqRate: 2.7, contactRate: 38, rpcRate: 28, ptpRate: 12 };
  if (cohort === 'All Cohorts') return { accounts: cl.accounts, balance: cl.balance, collected: cl.collected, liqRate: cl.liqRate, contactRate: cl.contactRate, rpcRate: Math.round(cl.contactRate * 0.72), ptpRate: cl.ptpRate };
  const co = (PORTFOLIO_COHORTS[client] || []).find(c => c.name === cohort);
  if (!co) return { accounts: cl.accounts, balance: cl.balance, collected: cl.collected, liqRate: cl.liqRate, contactRate: cl.contactRate, rpcRate: Math.round(cl.contactRate * 0.72), ptpRate: cl.ptpRate };
  return { accounts: co.accounts, balance: co.accounts * 2800, collected: co.collected, liqRate: co.liqRate, contactRate: co.contactRate, rpcRate: Math.round(co.contactRate * 0.72), ptpRate: co.ptpRate };
}

function buildWeeklyData(baseVal, isMoney, period) {
  if (period === 'All Time') {
    if (isMoney) {
      // 4 month-groups; weights sum to 1.0 so bars sum to baseVal
      const weights = [0.175, 0.23, 0.28, 0.315];
      return weights.map((w, i) => ({ label: `Wk ${i*4+1}–${(i+1)*4}`, value: Math.round(baseVal * w) }));
    }
    // Rate metrics ramp up across 4 month-groups to the final value
    const ramp = [0.55, 0.72, 0.88, 1.0];
    return ramp.map((r, i) => ({ label: `Wk ${i*4+1}–${(i+1)*4}`, value: +(baseVal * r).toFixed(1) }));
  }
  // Single month
  const monthScale = { Jan: 0.55, Feb: 0.72, Mar: 0.88, Apr: 1.0 }[period] || 1.0;
  if (isMoney) {
    const monthTotal = baseVal * monthScale;
    const weights = [0.18, 0.24, 0.28, 0.30];
    return weights.map((w, i) => ({ label: `Wk ${i+1}`, value: Math.round(monthTotal * w) }));
  }
  // Rate metrics ramp within the month
  const ramp = [0.78, 0.88, 0.95, 1.0];
  return ramp.map((r, i) => ({ label: `Wk ${i+1}`, value: +(baseVal * monthScale * r).toFixed(1) }));
}

function OverviewTab() {
  const [period,   setPeriod]   = React.useState('All Time');
  const [client,   setClient]   = React.useState('All Clients');
  const [cohort,   setCohort]   = React.useState('All Cohorts');
  const [viewMode, setViewMode] = React.useState('accounts');

  const handleClientChange = (c) => { setClient(c); setCohort('All Cohorts'); };
  const cohortOptions = client !== 'All Clients' ? ['All Cohorts', ...(PORTFOLIO_COHORTS[client] || []).map(c => c.name)] : [];
  const metrics = getFilteredMetrics(client, cohort);
  const filterSub = [client !== 'All Clients' ? client : null, cohort !== 'All Cohorts' ? cohort : null].filter(Boolean).join(' · ');

  const convMetrics = [
    { key: 'contact', label: 'Contact',  value: metrics.contactRate, target: 40, color: '#2196af' },
    { key: 'rpc',     label: 'RPC',       value: metrics.rpcRate,     target: 30, color: '#6366f1' },
    { key: 'ptp',     label: 'PTP',       value: metrics.ptpRate,     target: 12, color: '#f59e0b' },
  ];

  const chartDefs = [
    { key: 'collected',  label: 'Collections',     baseVal: metrics.collected, color: '#2196af', unit: '$', isMoney: true,  gradId: 'mc-coll' },
    { key: 'cumulative', label: 'Cumulative',       baseVal: metrics.collected, color: '#61ab5e', unit: '$', isMoney: true,  gradId: 'mc-cum', cumulative: true },
    { key: 'liq',        label: 'Liquidation Rate', baseVal: metrics.liqRate,   color: '#2196af', unit: '%', isMoney: false, target: 2.5, gradId: 'mc-liq' },
    { key: 'contact',    label: 'Contact Rate',     baseVal: metrics.contactRate,color: '#6366f1', unit: '%', isMoney: false, target: 40,  gradId: 'mc-con' },
    { key: 'rpc',        label: 'RPC Rate',         baseVal: metrics.rpcRate,    color: '#f59e0b', unit: '%', isMoney: false, target: 30,  gradId: 'mc-rpc' },
    { key: 'ptp',        label: 'PTP Rate',         baseVal: metrics.ptpRate,    color: '#61ab5e', unit: '%', isMoney: false, target: 12,  gradId: 'mc-ptp' },
  ];

  return (
    <div className="px-8 py-6 space-y-6">

      {/* ── Top filter bar ─────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex bg-gray-100 rounded-lg p-0.5">
          {PERIODS.map(p => (
            <button key={p} onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${period === p ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >{p}</button>
          ))}
        </div>
        <select value={client} onChange={e => handleClientChange(e.target.value)}
          className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-blue-400"
        >{ALL_CLIENTS.map(c => <option key={c} value={c}>{c}</option>)}</select>
        {cohortOptions.length > 0 && (
          <select value={cohort} onChange={e => setCohort(e.target.value)}
            className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-blue-400"
          >{cohortOptions.map(c => <option key={c} value={c}>{c}</option>)}</select>
        )}
        <div className="flex bg-gray-100 rounded-lg p-0.5">
          <button onClick={() => setViewMode('accounts')} className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${viewMode === 'accounts' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}># Accounts</button>
          <button onClick={() => setViewMode('dollars')} className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${viewMode === 'dollars' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>$ Value</button>
        </div>
      </div>

      {/* ══ Collections Funnel ═══════════════════════════════════════════ */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-6 pt-5 pb-4">
          <div className="flex items-center justify-between mb-1">
            <div>
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Collections Funnel</h2>
              <p className="text-xs text-gray-400 mt-0.5">{period === 'All Time' ? 'All Time' : period}{filterSub ? ` · ${filterSub}` : ''} · End-to-end conversion</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-extrabold text-gray-900" style={{ fontVariantNumeric: 'tabular-nums' }}>{metrics.accounts.toLocaleString()}</div>
              <div className="text-[10px] text-gray-400">Total accounts</div>
            </div>
          </div>
          <div className="mt-4 px-2">
            <BarFunnel viewMode={viewMode} period={period} selectedCreditor={client} selectedCohort={cohort} />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-px" style={{ borderTop: '1px solid #d4eae5', backgroundColor: '#e5e7eb' }}>
          {convMetrics.map((m) => (
            <div key={m.key} className="bg-white px-5 py-4">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: m.color }} />
                <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">{m.label}</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-gray-900" style={{ fontVariantNumeric: 'tabular-nums' }}>{m.value}%</span>
                <span className={`text-[10px] font-semibold ${m.value >= m.target ? 'text-green-600' : 'text-amber-600'}`}>
                  {m.value >= m.target ? '↑' : '↓'} Target: {m.target}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ Metric Charts — bar + line combo, 2-col grid ═══════════════ */}
      <div className="grid grid-cols-2 gap-5">
        {chartDefs.map(cd => <MetricChartCard key={cd.key} config={cd} period={period} />)}
      </div>
    </div>
  );
}

// ── MetricChartCard — bar + line combo (reference screenshot style) ───────────

function MetricChartCard({ config, period }) {
  const { label, baseVal, color, unit, isMoney, target, gradId, cumulative } = config;

  const data = buildWeeklyData(baseVal, isMoney, period);
  if (cumulative && isMoney) { let cum = 0; data.forEach(d => { cum += d.value; d.value = cum; }); }

  const latestVal = data[data.length - 1]?.value || 0;
  const prevVal   = data.length > 1 ? data[data.length - 2]?.value || 0 : 0;
  const wowChange = latestVal - prevVal;
  const fmtVal = (v) => isMoney ? `$${(v / 1000).toFixed(0)}K` : `${v}${unit}`;
  const fmtShort = (v) => isMoney ? `${(v / 1000).toFixed(0)}K` : `${v}`;

  const renderLabel = (props) => {
    const { x, y, value } = props;
    return <text x={x} y={y - 10} textAnchor="middle" fill={color} fontSize={10} fontWeight={700} style={{ fontVariantNumeric: 'tabular-nums' }}>{fmtShort(value)}</text>;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="px-5 pt-4 pb-2 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">{label}</h3>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-gray-900" style={{ fontVariantNumeric: 'tabular-nums' }}>{fmtVal(latestVal)}</span>
            {wowChange !== 0 && (
              <span className={`text-xs font-bold ${wowChange > 0 ? 'text-green-600' : 'text-red-500'}`}>
                {wowChange > 0 ? '+' : ''}{fmtVal(wowChange)} WoW
              </span>
            )}
          </div>
          {target && <div className="text-[10px] text-gray-400 mt-0.5">Target: {target}{unit}</div>}
        </div>
        <div className="text-[10px] font-semibold text-gray-400 bg-gray-100 px-2.5 py-1 rounded-md">Weekly</div>
      </div>
      <div className="px-3 pb-4">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data} barSize={36}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis dataKey="label" tick={{ fontSize: 10, fill: '#6b7280' }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={v => isMoney ? `$${(v/1000).toFixed(0)}K` : `${v}%`} stroke="#d1d5db" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} width={isMoney ? 50 : 35} domain={[0, 'auto']} />
            <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #e5e7eb', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', fontSize: 11 }} formatter={v => [isMoney ? `$${v.toLocaleString()}` : `${v}%`, label]} />
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.2} />
                <stop offset="100%" stopColor={color} stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <Bar dataKey="value" fill={`url(#${gradId})`} radius={[4, 4, 0, 0]} />
            <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2.5} dot={{ r: 4, fill: '#fff', stroke: color, strokeWidth: 2 }} label={renderLabel} />
            {target && <ReferenceLine y={target} stroke={color} strokeDasharray="4 4" strokeOpacity={0.3} />}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ── TAB: Inbound ──────────────────────────────────────────────────────────────

function InboundTab() {
  const [selectedCreditor, setSelectedCreditor] = React.useState('All Clients');
  const [selectedCohort,   setSelectedCohort]   = React.useState('All Cohorts');

  const cm = CREDITOR_MULTIPLIERS[selectedCreditor] || CREDITOR_MULTIPLIERS['All Clients'];
  const co = COHORT_MULTIPLIERS[selectedCohort]     || COHORT_MULTIPLIERS['All Cohorts'];
  const scale = cm.contact * co.contact;

  // Scale calling reason data
  const reasonRows = sentimentData.callingReasons.map(r => ({ ...r, count: Math.round(r.count * scale) }));
  const reasonTotal = reasonRows.reduce((s, r) => s + r.count, 0);
  const reasons = reasonRows.map(r => ({ ...r, pct: reasonTotal > 0 ? Math.round((r.count / reasonTotal) * 100) : 0 }));
  const maxCount = Math.max(...reasons.map(r => r.count));

  const filterLabel = [
    selectedCreditor !== 'All Clients' ? selectedCreditor : null,
    selectedCohort !== 'All Cohorts' ? selectedCohort : null,
  ].filter(Boolean).join(' · ');

  return (
    <div className="px-8 py-6 space-y-6">
      {/* ── Filter bar ──────────────────────────────────────────────────── */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">Client</span>
          <select value={selectedCreditor} onChange={e => setSelectedCreditor(e.target.value)}
            className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-blue-400"
          >{ALL_CLIENTS.map(c => <option key={c} value={c}>{c}</option>)}</select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">Cohort</span>
          <select value={selectedCohort} onChange={e => setSelectedCohort(e.target.value)}
            className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-blue-400"
          >{['All Cohorts', ...(PORTFOLIO_COHORTS[selectedCreditor] || []).map(c => c.name)].map(c => <option key={c} value={c}>{c}</option>)}</select>
        </div>
      </div>

      {/* Highlights */}
      <div className="grid grid-cols-4 gap-4">
        <HL label="Inbound Calls Today" value="85" sub="Avg 4 min / call" />
        <HL label="Payment Bot Completion" value="78%" sub="Full IVR resolution" color="text-green-600" />
        <HL label="Live Transfers" value="20" sub="12 disputes · 8 hardship" />
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
          </AreaChart>
        </ResponsiveContainer>
        <div className="flex items-center gap-5 mt-3">
          {[['#61ab5e','Payment calls'], ['#ef4444','Disputes'], ['#f59e0b','Hardship']].map(([c, l]) => (
            <div key={l} className="flex items-center gap-1.5">
              <span className="w-3 h-2 rounded-sm" style={{ backgroundColor: c }} />
              <span className="text-xs text-gray-500">{l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Calling Reason Breakdown — card-based, filter-responsive */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-6 pt-5 pb-4 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Calling Reasons</h2>
            <p className="text-xs text-gray-400 mt-0.5">{reasonTotal.toLocaleString()} total inbound interactions{filterLabel ? ` · ${filterLabel}` : ''}</p>
          </div>
          <div className="flex items-center gap-3">
            {[
              { label: 'Positive', color: '#61ab5e' },
              { label: 'Neutral',  color: '#9ca3af' },
              { label: 'Negative', color: '#ef4444' },
            ].map(s => (
              <div key={s.label} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                <span className="text-[10px] text-gray-500">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="divide-y divide-gray-50">
          {reasons.map((row, i) => {
            const sentBg = row.sentiment === 'positive' ? '#61ab5e' : row.sentiment === 'negative' ? '#ef4444' : '#9ca3af';
            return (
              <div key={i} className="px-6 py-4 flex items-center gap-5 hover:bg-gray-50/50 transition-colors">
                {/* Sentiment accent */}
                <div className="w-1 h-10 rounded-full flex-shrink-0" style={{ backgroundColor: sentBg }} />
                {/* Reason + resolution */}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-gray-900">{row.reason}</div>
                  <div className="text-[11px] text-gray-400 mt-0.5">{row.resolution}</div>
                </div>
                {/* Bar */}
                <div className="w-40 flex-shrink-0">
                  <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#f3f4f6' }}>
                    <div className="h-2 rounded-full transition-all" style={{ width: `${(row.count / maxCount) * 100}%`, backgroundColor: sentBg, opacity: 0.7 }} />
                  </div>
                </div>
                {/* Count + pct */}
                <div className="w-16 flex-shrink-0 text-right">
                  <div className="text-sm font-bold text-gray-900" style={{ fontVariantNumeric: 'tabular-nums' }}>{row.count}</div>
                  <div className="text-[10px] text-gray-400" style={{ fontVariantNumeric: 'tabular-nums' }}>{row.pct}%</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Inbound routing breakdown */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">Bot Routing Outcomes</h3>
          <div className="space-y-3">
            {[
              { label: 'Payment completed via bot', count: 66,  pct: 78, color: '#61ab5e' },
              { label: 'Transferred to live agent', count: 15,  pct: 18, color: '#4c6ef5' },
              { label: 'Abandoned / hung up',        count: 4,   pct: 5,  color: '#f59e0b' },
            ].map((r, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-700">{r.label}</span>
                  <span className="font-bold text-gray-900">{r.count} <span className="text-gray-400 font-normal">({r.pct}%)</span></span>
                </div>
                <div className="w-full h-1.5 rounded-full" style={{ backgroundColor: '#dee2e6' }}>
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

    </div>
  );
}

// ── TAB: Promises & Plans ─────────────────────────────────────────────────────

function PromisesTab() {
  const [subTab, setSubTab] = React.useState('promises');

  // ── PROMISES DATA ──────────────────────────────────────────────────
  const ptpWeekly = [
    { week: 'Wk 1', made: 144, kept: 89,  broken: 55,  partial: 12, value: 64800,  avgAmt: 450, avgDays: 4.2 },
    { week: 'Wk 2', made: 162, kept: 105, broken: 57,  partial: 18, value: 72900,  avgAmt: 450, avgDays: 3.8 },
    { week: 'Wk 3', made: 97,  kept: 80,  broken: 17,  partial: 8,  value: 43700,  avgAmt: 451, avgDays: 3.1 },
  ];
  const totalMade    = ptpWeekly.reduce((s,w) => s+w.made, 0);
  const totalKept    = ptpWeekly.reduce((s,w) => s+w.kept, 0);
  const totalBroken  = ptpWeekly.reduce((s,w) => s+w.broken, 0);
  const totalPartial = ptpWeekly.reduce((s,w) => s+w.partial, 0);
  const totalValue   = ptpWeekly.reduce((s,w) => s+w.value, 0);
  const uniqueAccts  = Math.round(totalMade * 0.82);
  const adherenceRate = Math.round((totalKept / totalMade) * 100);
  const avgPromiseAmt = Math.round(totalValue / totalKept);
  const avgDaysToFulfill = 3.7;
  const repeatRate = 14;

  // Adherence trend (weekly)
  const adhTrend = ptpWeekly.map(w => ({ label: w.week, rate: Math.round((w.kept / w.made) * 100), made: w.made }));

  // Future promises
  const futurePtps = [
    { date: 'Apr 14', count: 18, value: 42600, probability: 72 },
    { date: 'Apr 18', count: 24, value: 58200, probability: 68 },
    { date: 'Apr 21', count: 12, value: 31400, probability: 74 },
    { date: 'Apr 25', count: 31, value: 74800, probability: 65 },
    { date: 'Apr 28', count: 8,  value: 19600, probability: 61 },
  ];
  const futureTotal = futurePtps.reduce((s,p) => s+p.count, 0);
  const futureValue = futurePtps.reduce((s,p) => s+p.value, 0);
  const futureAvgProb = Math.round(futurePtps.reduce((s,p) => s + p.probability * p.count, 0) / futureTotal);

  // Risk segmentation
  const riskSegments = [
    { label: 'High probability (>70%)', count: 42, value: 98400, color: '#61ab5e' },
    { label: 'Medium probability (50-70%)', count: 38, value: 84200, color: '#f59e0b' },
    { label: 'Low probability (<50%)', count: 13, value: 43600, color: '#ef4444' },
  ];

  // ── PLANS DATA ─────────────────────────────────────────────────────
  const totalAccounts = 12000;
  const accountsOnPlans = 94;
  const planConversion = +((accountsOnPlans / totalAccounts) * 100).toFixed(2);

  const planBuckets = [
    { tenure: '< 1 Year', accounts: 62, balance: 142600, avgBal: 2300, collected: 68400, collRate: 48, avgInstallment: 482, onTime: 89, prepay: 8 },
    { tenure: '1–2 Years', accounts: 24, balance: 168000, avgBal: 7000, collected: 42000, collRate: 25, avgInstallment: 310, onTime: 75, prepay: 4 },
    { tenure: '> 2 Years', accounts: 8,  balance: 124800, avgBal: 15600, collected: 12480, collRate: 10, avgInstallment: 186, onTime: 63, prepay: 0 },
  ];
  const planTotalBal    = planBuckets.reduce((s,b) => s+b.balance, 0);
  const planTotalColl   = planBuckets.reduce((s,b) => s+b.collected, 0);
  const activePlans     = 77;
  const completedPlans  = 8;
  const brokenPlans     = 9;
  const avgPlanDuration = 14; // months
  const overallOnTime   = Math.round(planBuckets.reduce((s,b) => s + b.onTime * b.accounts, 0) / accountsOnPlans);
  const dropOffRate     = 9.6;

  const TB = 'tabular-nums';

  return (
    <div className="px-8 py-6 space-y-6">
      {/* Sub-tab toggle */}
      <div className="flex items-center gap-6" style={{ borderBottom: '1px solid #e5e7eb' }}>
        {[{ id: 'promises', label: 'Promises' }, { id: 'plans', label: 'Plans' }].map(t => (
          <button key={t.id} onClick={() => setSubTab(t.id)}
            className={`pb-3 text-sm font-medium transition-all relative ${subTab === t.id ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}>
            {t.label}
            {subTab === t.id && <div className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full" style={{ background: '#2196af' }} />}
          </button>
        ))}
      </div>

      {/* ══════════════ PROMISES SUB-TAB ══════════════ */}
      {subTab === 'promises' && (
        <div className="space-y-6 animate-fadeIn">
          {/* KPI row */}
          <div className="grid grid-cols-5 gap-4">
            {[
              { label: 'Total Promises', val: totalMade, sub: `${uniqueAccts} unique accounts`, color: '#2196af' },
              { label: 'Adherence Rate', val: `${adherenceRate}%`, sub: `${totalKept} kept of ${totalMade} (due ≤ yesterday)`, color: adherenceRate >= 70 ? '#61ab5e' : '#f59e0b' },
              { label: 'Kept', val: totalKept, sub: `${Math.round((totalKept/totalMade)*100)}% of total`, color: '#61ab5e' },
              { label: 'Broken', val: totalBroken, sub: `${Math.round((totalBroken/totalMade)*100)}% of total`, color: '#ef4444' },
              { label: 'Partial Payments', val: totalPartial, sub: `${Math.round((totalPartial/totalMade)*100)}% of total`, color: '#8b5cf6' },
            ].map((c, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: c.color }} />
                <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">{c.label}</div>
                <div className="text-2xl font-extrabold text-gray-900" style={{ fontVariantNumeric: TB }}>{c.val}</div>
                <div className="text-[10px] text-gray-400 mt-0.5">{c.sub}</div>
              </div>
            ))}
          </div>

          {/* Adherence breakdown bar + trend chart */}
          <div className="grid grid-cols-2 gap-5">
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4">Adherence Breakdown</h3>
              <div className="h-3 rounded-full overflow-hidden flex mb-4" style={{ backgroundColor: '#f3f4f6' }}>
                <div style={{ width: `${Math.round((totalKept/totalMade)*100)}%`, backgroundColor: '#61ab5e' }} />
                <div style={{ width: `${Math.round((totalPartial/totalMade)*100)}%`, backgroundColor: '#8b5cf6' }} />
                <div style={{ width: `${Math.round((totalBroken/totalMade)*100)}%`, backgroundColor: '#ef4444' }} />
              </div>
              <div className="space-y-2">
                {[
                  { label: 'Kept', count: totalKept, pct: Math.round((totalKept/totalMade)*100), color: '#61ab5e' },
                  { label: 'Partial', count: totalPartial, pct: Math.round((totalPartial/totalMade)*100), color: '#8b5cf6' },
                  { label: 'Broken', count: totalBroken, pct: Math.round((totalBroken/totalMade)*100), color: '#ef4444' },
                ].map((r, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: r.color }} /><span className="text-gray-700">{r.label}</span></div>
                    <div><span className="font-bold text-gray-900" style={{ fontVariantNumeric: TB }}>{r.count}</span> <span className="text-gray-400 text-xs">({r.pct}%)</span></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4">Trends</h3>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={adhTrend} barSize={28}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis dataKey="label" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tickFormatter={v => `${v}%`} tick={{ fontSize: 9 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                  <Tooltip formatter={(v, name) => [name === 'rate' ? `${v}%` : v, name === 'rate' ? 'Adherence' : 'Created']} />
                  <Bar dataKey="made" name="Created" fill="#2196af" opacity={0.2} radius={[3,3,0,0]} />
                  <Line type="monotone" dataKey="rate" name="Adherence" stroke="#61ab5e" strokeWidth={2.5} dot={{ r: 4, fill: '#fff', stroke: '#61ab5e', strokeWidth: 2 }} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Future promises */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Future Promises — April</h3>
                <p className="text-xs text-gray-400 mt-0.5">{futureTotal} promises · ${(futureValue/1000).toFixed(0)}K expected · {futureAvgProb}% predicted adherence</p>
              </div>
            </div>
            <div className="grid grid-cols-5 gap-3">
              {futurePtps.map((p, i) => (
                <div key={i} className="border border-gray-100 rounded-xl p-4 text-center">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">{p.date}</div>
                  <div className="text-xl font-extrabold text-gray-900" style={{ fontVariantNumeric: TB }}>{p.count}</div>
                  <div className="text-xs text-gray-500 mt-0.5" style={{ fontVariantNumeric: TB }}>${(p.value/1000).toFixed(1)}K</div>
                  <div className="mt-2 h-1 rounded-full overflow-hidden" style={{ backgroundColor: '#f3f4f6' }}>
                    <div className="h-1 rounded-full" style={{ width: `${p.probability}%`, backgroundColor: p.probability >= 70 ? '#61ab5e' : p.probability >= 50 ? '#f59e0b' : '#ef4444' }} />
                  </div>
                  <div className="text-[10px] text-gray-400 mt-1">{p.probability}% prob</div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional metrics */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: 'Avg Promise Amount', val: `$${avgPromiseAmt}` },
              { label: 'Avg Days to Fulfill', val: `${avgDaysToFulfill}` },
              { label: 'Repeat Promise Rate', val: `${repeatRate}%` },
              { label: 'Total Value Collected', val: `$${(totalValue/1000).toFixed(0)}K` },
            ].map((c, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">{c.label}</div>
                <div className="text-xl font-extrabold text-gray-900" style={{ fontVariantNumeric: TB }}>{c.val}</div>
              </div>
            ))}
          </div>

          {/* Risk segmentation */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4">Risk Segmentation</h3>
            <div className="space-y-3">
              {riskSegments.map((r, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: r.color }} />
                  <span className="text-sm text-gray-700 flex-1">{r.label}</span>
                  <span className="text-sm font-bold text-gray-900 w-10 text-right" style={{ fontVariantNumeric: TB }}>{r.count}</span>
                  <div className="w-32 h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#f3f4f6' }}>
                    <div className="h-2 rounded-full" style={{ width: `${(r.count / futureTotal) * 100}%`, backgroundColor: r.color }} />
                  </div>
                  <span className="text-sm font-semibold text-gray-900 w-16 text-right" style={{ fontVariantNumeric: TB }}>${(r.value/1000).toFixed(0)}K</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════ PLANS SUB-TAB ══════════════ */}
      {subTab === 'plans' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Funnel: Total → Plans → Conversion */}
          <div className="grid grid-cols-3 gap-5">
            <div className="bg-white border border-gray-200 rounded-xl p-5 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: '#2196af' }} />
              <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Total Accounts</div>
              <div className="text-3xl font-extrabold text-gray-900" style={{ fontVariantNumeric: TB }}>{totalAccounts.toLocaleString()}</div>
              <div className="text-[10px] text-gray-400 mt-1">Full placement</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: '#61ab5e' }} />
              <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">On Payment Plans</div>
              <div className="text-3xl font-extrabold text-gray-900" style={{ fontVariantNumeric: TB }}>{accountsOnPlans}</div>
              <div className="text-[10px] text-gray-400 mt-1">${(planTotalBal/1000).toFixed(0)}K total balance</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: '#8b5cf6' }} />
              <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Conversion Rate</div>
              <div className="text-3xl font-extrabold text-gray-900" style={{ fontVariantNumeric: TB }}>{planConversion}%</div>
              <div className="text-[10px] text-gray-400 mt-1">Accounts → Active plans</div>
            </div>
          </div>

          {/* Plan health */}
          <div className="grid grid-cols-5 gap-4">
            {[
              { label: 'Active Plans', val: activePlans, color: '#61ab5e' },
              { label: 'Completed', val: completedPlans, color: '#2196af' },
              { label: 'Broken', val: brokenPlans, color: '#ef4444' },
              { label: 'On-Time Payment', val: `${overallOnTime}%`, color: overallOnTime >= 80 ? '#61ab5e' : '#f59e0b' },
              { label: 'Drop-off Rate', val: `${dropOffRate}%`, color: '#ef4444' },
            ].map((c, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: c.color }} />
                <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">{c.label}</div>
                <div className="text-2xl font-extrabold text-gray-900" style={{ fontVariantNumeric: TB }}>{c.val}</div>
              </div>
            ))}
          </div>

          {/* Tenure segmentation + collections */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="p-6 pb-3">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Segmentation by Plan Tenure</h3>
              <p className="text-xs text-gray-400 mt-0.5">{accountsOnPlans} plans · ${(planTotalBal/1000).toFixed(0)}K total balance · ${(planTotalColl/1000).toFixed(0)}K collected</p>
            </div>
            <div className="border-t border-gray-100">
              <div className="grid px-6 py-2.5" style={{ gridTemplateColumns: '1fr 80px 90px 90px 90px 80px 80px 70px 60px', backgroundColor: '#f8f9fa', borderBottom: '1px solid #f3f4f6' }}>
                {['Tenure', 'Accounts', 'Balance', 'Avg Bal', 'Collected', 'Coll Rate', 'Avg Inst.', 'On-Time', 'Prepay'].map(h => (
                  <div key={h} className={`text-[9px] font-bold uppercase tracking-wider text-gray-400 ${h === 'Tenure' ? '' : 'text-right'}`}>{h}</div>
                ))}
              </div>
              {planBuckets.map((row, i) => (
                <div key={i} className="grid items-center px-6 py-3" style={{ gridTemplateColumns: '1fr 80px 90px 90px 90px 80px 80px 70px 60px', borderBottom: '1px solid #f3f4f6' }}>
                  <div className="text-sm font-semibold text-gray-900">{row.tenure}</div>
                  <div className="text-sm font-bold text-gray-900 text-right" style={{ fontVariantNumeric: TB }}>{row.accounts}</div>
                  <div className="text-sm text-gray-700 text-right" style={{ fontVariantNumeric: TB }}>${(row.balance/1000).toFixed(0)}K</div>
                  <div className="text-sm text-gray-700 text-right" style={{ fontVariantNumeric: TB }}>${row.avgBal.toLocaleString()}</div>
                  <div className="text-sm font-semibold text-gray-900 text-right" style={{ fontVariantNumeric: TB }}>${(row.collected/1000).toFixed(0)}K</div>
                  <div className="text-right">
                    <span className={`text-sm font-bold ${row.collRate >= 40 ? 'text-green-600' : row.collRate >= 20 ? 'text-amber-600' : 'text-red-500'}`} style={{ fontVariantNumeric: TB }}>{row.collRate}%</span>
                  </div>
                  <div className="text-right"><span className="text-sm font-bold" style={{ fontVariantNumeric: TB, color: '#2196af' }}>${row.avgInstallment}</span><span className="text-[10px] text-gray-400">/mo</span></div>
                  <div className="text-sm text-right" style={{ fontVariantNumeric: TB }}>{row.onTime}%</div>
                  <div className="text-sm text-right" style={{ fontVariantNumeric: TB }}>{row.prepay > 0 ? `${row.prepay}%` : '—'}</div>
                </div>
              ))}
              <div className="grid px-6 py-3" style={{ gridTemplateColumns: '1fr 80px 90px 90px 90px 80px 80px 70px 60px', backgroundColor: '#f8f9fa', borderTop: '2px solid #dee2e6' }}>
                <div className="text-xs font-bold text-gray-900">Total</div>
                <div className="text-xs font-bold text-gray-900 text-right" style={{ fontVariantNumeric: TB }}>{accountsOnPlans}</div>
                <div className="text-xs font-bold text-gray-900 text-right" style={{ fontVariantNumeric: TB }}>${(planTotalBal/1000).toFixed(0)}K</div>
                <div className="text-xs font-bold text-gray-900 text-right" style={{ fontVariantNumeric: TB }}>${Math.round(planTotalBal/accountsOnPlans).toLocaleString()}</div>
                <div className="text-xs font-bold text-gray-900 text-right" style={{ fontVariantNumeric: TB }}>${(planTotalColl/1000).toFixed(0)}K</div>
                <div className="text-xs font-bold text-gray-900 text-right" style={{ fontVariantNumeric: TB }}>{Math.round((planTotalColl/planTotalBal)*100)}%</div>
                <div className="text-xs font-bold text-right" style={{ fontVariantNumeric: TB, color: '#2196af' }}>${Math.round(planBuckets.reduce((s,b) => s+b.avgInstallment*b.accounts,0)/accountsOnPlans)}/mo</div>
                <div className="text-xs font-bold text-gray-900 text-right" style={{ fontVariantNumeric: TB }}>{overallOnTime}%</div>
                <div className="text-xs text-gray-400 text-right">—</div>
              </div>
            </div>
          </div>

          {/* Additional plan metrics */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: 'Avg Installment', val: `$${Math.round(planBuckets.reduce((s,b)=>s+b.avgInstallment*b.accounts,0)/accountsOnPlans)}` },
              { label: 'Avg Plan Duration', val: `${avgPlanDuration} mo` },
              { label: 'Recovery Rate', val: `${Math.round((planTotalColl/planTotalBal)*100)}%` },
              { label: 'Total Collected', val: `$${(planTotalColl/1000).toFixed(0)}K` },
            ].map((c, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">{c.label}</div>
                <div className="text-xl font-extrabold text-gray-900" style={{ fontVariantNumeric: TB }}>{c.val}</div>
              </div>
            ))}
          </div>
        </div>
      )}
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
        <div className="rounded-lg overflow-hidden" style={{ border: '1px solid #dee2e6' }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #dee2e6' }}>
                {['Agent', 'Daily Calls', 'RPC', 'PTP', 'Collections', 'Quality', 'Trend', 'Top Strength', 'Coaching Need'].map(h => (
                  <th key={h} className={`py-2.5 px-3 text-xs font-semibold text-gray-600 uppercase tracking-wide ${['Agent','Top Strength','Coaching Need'].includes(h) ? 'text-left' : 'text-center'}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {agentPerfData.map((a, i) => (
                <tr key={i} className="last:border-0" style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td className="py-2.5 px-3 font-semibold text-gray-900">{a.name}</td>
                  <td className="py-2.5 px-3 text-center tabular-nums text-gray-700">{a.calls}</td>
                  <td className="py-2.5 px-3 text-center tabular-nums text-gray-700">{a.rpc}</td>
                  <td className="py-2.5 px-3 text-center tabular-nums font-semibold" style={{ color: '#4c6ef5' }}>{a.ptp}</td>
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
                <div><span className="text-gray-400">Connect rate</span><br /><span className="font-bold" style={{ color: '#4c6ef5' }}>{b.connect}</span></div>
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
                  <div className="w-full h-1.5 rounded-full" style={{ backgroundColor: '#dee2e6' }}>
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
                          <span className={a.isSkit ? 'font-bold' : 'text-gray-400'} style={a.isSkit ? { color: '#4c6ef5' } : {}}>
                            {a.label}
                          </span>
                          <span className={a.isSkit ? 'font-bold' : 'text-gray-500'} style={a.isSkit ? { color: '#4c6ef5' } : {}}>
                            {formatVal(a.val)}
                          </span>
                        </div>
                        <div className="w-full h-1.5 rounded-full" style={{ backgroundColor: '#e5e7eb' }}>
                          <div className="h-1.5 rounded-full" style={{ width: `${cappedPct}%`, backgroundColor: a.isSkit ? '#4c6ef5' : '#9ca3af' }} />
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
          <div className="border-2 rounded-xl p-5" style={{ borderColor: '#4c6ef540' }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded text-white" style={{ background: '#4c6ef5' }}>Outperforming</span>
              <span className="text-sm font-bold text-gray-900">Auto-Finance &lt;$3K Portfolio</span>
            </div>
            <p className="text-sm text-gray-600 mb-3">Outperforming at 4.1%, 1.6x above aggregate benchmark. Client has 22,000 similar accounts in-house.</p>
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
              <span>Confidence: <strong style={{ color: '#4c6ef5' }}>High</strong></span>
              <span>|</span>
              <span>Projected: <strong>$205K over 60 days</strong></span>
            </div>
            <button className="px-4 py-2 rounded-lg text-white text-xs font-bold" style={{ background: '#4c6ef5' }}>Draft Upsell Case</button>
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
            <button className="px-4 py-2 rounded-lg text-gray-700 text-xs font-bold" style={{ backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}>Review Economic Draft</button>
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
                  <div className="text-[10px] mb-0.5" style={{ color: '#4c6ef5' }}>Now ({c.after}%)</div>
                  <div className="w-full h-2 rounded-full" style={{ backgroundColor: '#e5e7eb' }}>
                    <div className="h-2 rounded-full" style={{ width: `${c.after}%`, backgroundColor: '#4c6ef5' }} />
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
                <div className="w-full h-1.5 rounded-full" style={{ backgroundColor: '#dee2e6' }}>
                  <div className="h-1.5 rounded-full" style={{ width: `${s.pct}%`, backgroundColor: s.source === 'Failed' ? '#ef4444' : '#4c6ef5' }} />
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
              { label: 'Debt Type: Credit Card',    pct: 42, color: '#4c6ef5' },
              { label: 'Debt Type: Medical',        pct: 30, color: '#ef4444' },
              { label: 'Debt Type: Personal Loan',  pct: 28, color: '#8b5cf6' },
              { label: 'State: TX + FL',            pct: 33, color: '#f59e0b' },
              { label: 'State: CA + NY',            pct: 26, color: '#61ab5e' },
              { label: 'Prior Placements: Primary', pct: 45, color: '#4c6ef5' },
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
        <div className="rounded-lg overflow-hidden" style={{ border: '1px solid #dee2e6' }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #dee2e6' }}>
                {['Signal', 'Weight', 'Accounts Affected', 'Action Triggered'].map(h => (
                  <th key={h} className={`py-2.5 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wide ${h === 'Signal' || h === 'Action Triggered' ? 'text-left' : 'text-center'}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {enrichmentData.propensitySignals.map((row, i) => (
                <tr key={i} className="last:border-0" style={{ borderBottom: '1px solid #f3f4f6' }}>
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


// ── TABS config ───────────────────────────────────────────────────────────────

const TABS = [
  { id: 'overview',   label: 'Overview' },
  { id: 'inbound',    label: 'Inbound' },
  { id: 'promises',   label: 'Promises & Plans' },
];

// ── Main Component ────────────────────────────────────────────────────────────

const PERIODS = ['All Time', 'Jan', 'Feb', 'Mar', 'Apr'];

// Per-creditor multipliers so charts shift when creditor changes
const CREDITOR_MULTIPLIERS = {
  'All Clients':        { liq: 1.00, contact: 1.00, collected: 1.00 },
  'Chase Bank':           { liq: 1.12, contact: 1.08, collected: 0.77 },
  'Synchrony Financial':  { liq: 0.94, contact: 1.00, collected: 0.50 },
  'Avant LLC':            { liq: 0.70, contact: 0.82, collected: 0.42 },
  'LendingClub':          { liq: 0.74, contact: 0.74, collected: 0.33 },
  'Envision Healthcare':  { liq: 1.48, contact: 1.24, collected: 0.47 },
  'LifePoint Health':     { liq: 1.63, contact: 1.34, collected: 0.31 },
};

// Per-cohort multipliers — derived from cohortMetrics ratios vs portfolio average
const COHORT_MULTIPLIERS = {
  'All Cohorts':          { liq: 1.00, contact: 1.00, collected: 1.00 },
  'High Prop / High Bal': { liq: 1.41, contact: 1.37, collected: 1.64 },
  'High Prop / Low Bal':  { liq: 1.52, contact: 1.26, collected: 0.87 },
  'Medium Prop':          { liq: 0.81, contact: 0.95, collected: 1.00 },
  'Low Prop / High Bal':  { liq: 0.70, contact: 0.74, collected: 1.35 },
  'Low Prop / Low Bal':   { liq: 0.15, contact: 0.32, collected: 0.15 },
};

export default function Performance() {
  const [activeTab, setActiveTab] = React.useState('overview');

  return (
    <div className="min-h-full bg-gray-50">

      {/* ── PAGE HEADER ──────────────────────────────────────────────────── */}
      <div className="px-8 pt-8 pb-0 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Performance</h1>
            <p className="text-sm text-gray-500 mt-0.5">Apex Recovery Partners · Hypercare Week 3 · Day 18</p>
          </div>
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
            style={{ background: 'rgba(76,110,245,0.08)', color: '#4c6ef5', border: '1px solid rgba(76,110,245,0.25)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#61ab5e' }} />
            Above activation target
          </span>
        </div>
        <div className="grid grid-cols-3 gap-5 pb-6">
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
          <div className="bg-white border border-gray-200 rounded-xl p-5" style={{ borderColor: '#4c6ef540' }}>
            <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#4c6ef5' }}>Liquidation Rate</div>
            <div className="flex items-end gap-3 mb-1">
              <div className="text-4xl font-extrabold text-gray-900">2.7%</div>
              <div className="mb-1.5 text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(97,171,94,0.1)', color: '#61ab5e', border: '1px solid rgba(97,171,94,0.25)' }}>↑ +0.2% vs target</div>
            </div>
            <div className="text-xs text-gray-400 mb-3">Target: 2.5% · 6-mo avg: 2.1%</div>
            <Sparkline data={dailyData} dataKey="liquidation" color="#4c6ef5" />
            <div className="mt-2 flex items-center gap-2 text-xs font-medium">
              <span style={{ color: '#4c6ef5' }}>Week 1: 1.8%</span>
              <span className="text-gray-300">→</span>
              <span style={{ color: '#4c6ef5' }}>Week 2: 2.3%</span>
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
                  <div className={`text-[11px] w-16 flex-shrink-0 ${a.isSkit ? 'font-bold' : 'text-gray-400'}`} style={a.isSkit ? { color: '#4c6ef5' } : {}}>
                    {a.label}
                  </div>
                  <div className="flex-1 rounded-full h-1.5" style={{ backgroundColor: '#dee2e6' }}>
                    <div className="h-1.5 rounded-full" style={{ width: `${(a.val / 3) * 100}%`, backgroundColor: a.isSkit ? '#4c6ef5' : '#9ca3af' }} />
                  </div>
                  <div className={`text-[11px] w-8 text-right flex-shrink-0 tabular-nums ${a.isSkit ? 'font-bold' : 'text-gray-400'}`} style={a.isSkit ? { color: '#4c6ef5' } : {}}>
                    {a.val}%
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 text-xs font-medium" style={{ color: '#4c6ef5' }}>12.5% above next best agency</div>
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
      {activeTab === 'overview'   && <OverviewTab />}
      {activeTab === 'inbound'    && <InboundTab />}
      {activeTab === 'promises'   && <PromisesTab />}

    </div>
  );
}
