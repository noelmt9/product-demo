import React from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
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

const cohortTrendData = {
  "High propensity / Low balance":    [3.3, 3.8, 4.1],
  "High propensity / High balance":   [2.7, 3.2, 3.8],
  "Medium propensity / All balances": [1.8, 2.0, 2.2],
  "Low propensity / Low balance":     [0.3, 0.35, 0.4],
  "Low propensity / High balance":    [1.8, 1.85, 1.9],
};

const cohortMetrics = [
  { name: "High prop / Low bal",    liquidation: 4.1, contact: 48, rpc: 35, ptp: 15, collections: 49800,  change: "+24%", cost: 8100,  margin: 41700, costPerDollar: 0.16 },
  { name: "High prop / High bal",   liquidation: 3.8, contact: 52, rpc: 38, ptp: 18, collections: 94200,  change: "+40%", cost: 14200, margin: 80000, costPerDollar: 0.15, highlight: true },
  { name: "Medium prop / All bal",  liquidation: 2.2, contact: 36, rpc: 26, ptp: 11, collections: 57600,  change: "+18%", cost: 18400, margin: 39200, costPerDollar: 0.32 },
  { name: "Low prop / Low bal",     liquidation: 0.4, contact: 12, rpc: 8,  ptp: 3,  collections: 8400,   change: "+12%", cost: 9200,  margin: -800,  costPerDollar: 1.10, negativeMargin: true },
  { name: "Low prop / High bal",    liquidation: 1.9, contact: 28, rpc: 22, ptp: 8,  collections: 77400,  change: "+8%",  cost: 22100, margin: 55300, costPerDollar: 0.29 },
];

const agencyBenchmark = [
  { agency: "Agency A", liquidation: 1.9 },
  { agency: "Agency B", liquidation: 2.1 },
  { agency: "Agency C", liquidation: 2.4 },
  { agency: "Skit.ai",  liquidation: 2.7, isSkit: true },
];

const moreBenchmarkMetrics = [
  { label: "Contact Rate",           skit: "38%",    agencyA: "29%",   agencyB: "33%",   agencyC: "36%"   },
  { label: "RPC Rate",               skit: "28%",    agencyA: "19%",   agencyB: "22%",   agencyC: "25%"   },
  { label: "PTP Adherence",          skit: "68%",    agencyA: "54%",   agencyB: "59%",   agencyC: "63%"   },
  { label: "Compliance Score",       skit: "99.86%", agencyA: "98.1%", agencyB: "98.7%", agencyC: "99.2%" },
  { label: "Cost per $1 Collected",  skit: "$0.24",  agencyA: "$0.41", agencyB: "$0.37", agencyC: "$0.29" },
];

const analystRecs = [
  { message: "High Prop / High Bal settlement + voice strategy is working. Recommend expanding to Medium Propensity cohort — similar balance profile, currently under-penetrated on settlement offers.", agents: ["Analyst"] },
  { message: "Medium Propensity contact rate plateauing at 36%. Adding morning SMS nudge before voice attempt could improve pickup. Manager has a proposed change in Approvals.", agents: ["Analyst", "Manager"] },
  { message: "Week 3 liquidation crossed activation target (2.7% vs 2.5%). Recommend scheduling Activation Review with client.", agents: ["Analyst"] },
];

const sentimentData = {
  overall: 72, positive: 41, neutral: 34, negative: 25,
  byChannel: [
    { channel: "Voice AI",     positive: 38, neutral: 36, negative: 26 },
    { channel: "Human Agent",  positive: 54, neutral: 30, negative: 16 },
    { channel: "SMS",          positive: 35, neutral: 42, negative: 23 },
    { channel: "Email",        positive: 28, neutral: 48, negative: 24 },
  ],
  callingReasons: [
    { reason: "Payment / Arrangement",       count: 312, pct: 36, sentiment: "positive", resolution: "82% resolved on first contact" },
    { reason: "Dispute — Account Validity",  count: 148, pct: 17, sentiment: "negative", resolution: "Routed to senior agent, 64% resolved within 48h" },
    { reason: "Hardship / Cannot Pay",       count: 134, pct: 15, sentiment: "negative", resolution: "89% offered payment plan or deferral" },
    { reason: "Balance Inquiry",             count: 121, pct: 14, sentiment: "neutral",  resolution: "97% resolved by bot" },
    { reason: "Installment Plan Request",    count: 96,  pct: 11, sentiment: "neutral",  resolution: "74% converted to active plan" },
    { reason: "Talk to Spouse / Callback",   count: 52,  pct: 6,  sentiment: "neutral",  resolution: "38% followed up, 22% converted" },
    { reason: "Validation Request (Written)",count: 9,   pct: 1,  sentiment: "negative", resolution: "Pending — 6 unresolved" },
  ],
};

// ── Sub-components ────────────────────────────────────────────────────────────

const Sparkline = ({ data, dataKey, color = "#10b981" }) => (
  <ResponsiveContainer width="100%" height={36}>
    <LineChart data={data}>
      <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} dot={false} />
    </LineChart>
  </ResponsiveContainer>
);

const MiniBar = ({ data, color = "#3b82f6" }) => {
  const d = data.map((v, i) => ({ w: i + 1, v }));
  return (
    <ResponsiveContainer width="100%" height={64}>
      <BarChart data={d} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
        <Bar dataKey="v" fill={color} radius={[2, 2, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

const sentColor = s => s === "positive" ? "text-green-600" : s === "negative" ? "text-red-500" : "text-gray-500";
const sentDot   = s => s === "positive" ? "bg-green-500"  : s === "negative" ? "bg-red-500"   : "bg-gray-400";

// Funnel step component
const FunnelStep = ({ label, value, sub, pct, color, isLast }) => (
  <div className="flex items-center flex-1 min-w-0">
    <div className="flex flex-col items-center flex-1 min-w-0">
      <div className={`w-full rounded-lg px-3 py-3 text-center border-2 ${color}`}>
        <div className="text-[10px] font-bold uppercase tracking-wider text-white/70 mb-1">{label}</div>
        <div className="text-2xl font-extrabold text-white">{value}</div>
        {sub && <div className="text-[11px] text-white/60 mt-0.5">{sub}</div>}
      </div>
      {pct && (
        <div className="mt-1.5 text-xs font-semibold text-white/50">{pct}</div>
      )}
    </div>
    {!isLast && (
      <div className="flex flex-col items-center px-1 flex-shrink-0 mt-[-14px]">
        <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
          <path d="M0 8 H18 M12 2 L20 8 L12 14" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    )}
  </div>
);

// ── Main Component ────────────────────────────────────────────────────────────

export default function Performance({ onNavigate }) {
  const [expandedRec, setExpandedRec] = React.useState(null);
  const [showMoreBenchmark, setShowMoreBenchmark] = React.useState(false);

  return (
    <div className="bg-gray-50 min-h-full">

      {/* ── HERO STRIP ─────────────────────────────────────────────────────── */}
      <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0f2744 100%)' }} className="px-8 pt-8 pb-6">

        {/* Title row */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-white">Performance</h1>
            <p className="text-sm text-slate-400 mt-0.5">Apex Recovery Partners · Hypercare Week 3 · Day 18</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: 'rgba(16,185,129,0.15)', color: '#34d399', border: '1px solid rgba(16,185,129,0.3)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Above activation target
            </span>
          </div>
        </div>

        {/* 3 headline numbers */}
        <div className="grid grid-cols-3 gap-5 mb-2">
          {/* Total Collected */}
          <div className="rounded-xl p-5" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Total Collected</div>
            <div className="text-4xl font-extrabold text-white mb-1">$287,400</div>
            <div className="text-xs text-slate-400 mb-3">Day 1 – Day 18 cumulative</div>
            <Sparkline data={dailyData} dataKey="cumulativeCollections" color="#34d399" />
            <div className="mt-2 flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <span>↑ $25,200 yesterday</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">Avg $15,967/day</span>
            </div>
          </div>

          {/* Liquidation Rate */}
          <div className="rounded-xl p-5" style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.3)' }}>
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-300 mb-1">Liquidation Rate</div>
            <div className="flex items-end gap-3 mb-1">
              <div className="text-4xl font-extrabold text-white">2.7%</div>
              <div className="mb-1.5 text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">↑ +0.2% vs target</div>
            </div>
            <div className="text-xs text-slate-400 mb-3">Target: 2.5% · 6-mo avg: 2.1%</div>
            <Sparkline data={dailyData} dataKey="liquidation" color="#60a5fa" />
            <div className="mt-2 flex items-center gap-2 text-xs font-medium">
              <span className="text-blue-300">Week 1: 1.8%</span>
              <span className="text-slate-600">→</span>
              <span className="text-blue-300">Week 2: 2.3%</span>
              <span className="text-slate-600">→</span>
              <span className="text-emerald-400 font-bold">Week 3: 2.7%</span>
            </div>
          </div>

          {/* Agency Ranking */}
          <div className="rounded-xl p-5" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Agency Ranking</div>
            <div className="flex items-end gap-3 mb-3">
              <div className="text-4xl font-extrabold text-white">#1</div>
              <div className="mb-1.5 text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">of 4 agencies</div>
            </div>
            <div className="text-xs text-slate-400 mb-4">Liquidation rate · same portfolio type · Hypercare Wk 3</div>
            <div className="space-y-2">
              {[
                { label: "Skit.ai",  val: 2.7, isSkit: true },
                { label: "Agency C", val: 2.4 },
                { label: "Agency B", val: 2.1 },
                { label: "Agency A", val: 1.9 },
              ].map((a, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className={`text-[11px] w-16 flex-shrink-0 ${a.isSkit ? 'text-emerald-400 font-bold' : 'text-slate-500'}`}>{a.label}</div>
                  <div className="flex-1 bg-slate-700 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full ${a.isSkit ? 'bg-emerald-400' : 'bg-slate-500'}`}
                      style={{ width: `${(a.val / 3) * 100}%` }}
                    />
                  </div>
                  <div className={`text-[11px] w-8 text-right flex-shrink-0 tabular-nums ${a.isSkit ? 'text-emerald-400 font-bold' : 'text-slate-500'}`}>{a.val}%</div>
                </div>
              ))}
            </div>
            <div className="mt-3 text-xs text-emerald-400 font-medium">12.5% above next best agency</div>
          </div>
        </div>
      </div>

      <div className="px-8 py-6 space-y-6">

        {/* ── CONVERSION FUNNEL ──────────────────────────────────────────────── */}
        <div className="rounded-xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}>
          <div className="px-6 pt-5 pb-2">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">Collections Funnel</h2>
              <span className="text-xs text-slate-500">Week 3 · All channels</span>
            </div>
            <p className="text-xs text-slate-500 mb-5">End-to-end conversion from placement to resolution</p>
            <div className="flex items-start gap-1">
              <FunnelStep label="Accounts" value="12,000" sub="Total placement" color="border-slate-600 bg-slate-700/50" />
              <FunnelStep label="Contacted" value="4,560" sub="38% contact rate" pct="38% of placement" color="border-blue-700 bg-blue-900/50" />
              <FunnelStep label="RPC" value="3,360" sub="Right party contact" pct="28% of placement" color="border-indigo-600 bg-indigo-900/50" />
              <FunnelStep label="PTP" value="403" sub="Promise to pay" pct="12% of RPC" color="border-violet-600 bg-violet-900/50" />
              <FunnelStep label="Kept PTP" value="274" sub="68% adherence" pct="68% of PTP" color="border-teal-600 bg-teal-900/50" />
              <FunnelStep label="Resolved" value="743" sub="Cumulative" pct="6.2% of placement" color="border-emerald-600 bg-emerald-900/60" isLast />
            </div>
          </div>
          {/* Drop-off callouts */}
          <div className="grid grid-cols-5 gap-px mt-4 border-t border-slate-700/60">
            {[
              { label: "Unreached", value: "7,440", note: "Skip trace / re-attempt in progress" },
              { label: "No RPC", value: "1,200", note: "Connected but not right party" },
              { label: "No PTP", value: "2,957", note: "Engaged but no commitment" },
              { label: "Broken PTP", value: "129", note: "620 total broken this placement" },
              { label: "In progress", value: "469", note: "Active payment plans running" },
            ].map((d, i) => (
              <div key={i} className="px-4 py-3 bg-slate-800/40">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Drop-off: {d.label}</div>
                <div className="text-sm font-bold text-red-400">{d.value}</div>
                <div className="text-[10px] text-slate-600 mt-0.5">{d.note}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── ANALYST RECOMMENDATIONS ────────────────────────────────────────── */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">Analyst Recommendations</span>
            <span className="text-xs text-gray-400">• {analystRecs.length} active</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {analystRecs.map((rec, idx) => (
              <button
                key={idx}
                onClick={() => setExpandedRec(expandedRec === idx ? null : idx)}
                className="p-3 bg-white border border-gray-200 rounded-lg text-left hover:border-blue-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-start gap-2">
                  <div className="flex gap-1 mt-1 flex-shrink-0">
                    {rec.agents.map((a, ai) => (
                      <span key={ai} className={`w-1.5 h-1.5 rounded-full ${a === 'Analyst' ? 'bg-blue-500' : 'bg-purple-500'}`} />
                    ))}
                  </div>
                  <p className={`text-xs text-gray-900 ${expandedRec === idx ? '' : 'line-clamp-2'}`}>{rec.message}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ── AGENCY BENCHMARK ───────────────────────────────────────────────── */}
        <Section title="Agency Benchmark — Liquidation Rate">
          <div className="flex items-end gap-4 mb-4" style={{ height: 130 }}>
            {agencyBenchmark.map((a, i) => (
              <div key={i} className="flex-1 flex flex-col items-center justify-end h-full gap-1">
                <div className={`text-xs font-bold mb-1 ${a.isSkit ? 'text-blue-600' : 'text-gray-400'}`}>{a.liquidation}%</div>
                <div
                  className="w-full rounded-t transition-all"
                  style={{ height: `${(a.liquidation / 3) * 100}px`, backgroundColor: a.isSkit ? '#3b82f6' : '#cbd5e1' }}
                />
                <div className={`text-xs mt-1 ${a.isSkit ? 'text-blue-600 font-bold' : 'text-gray-400'}`}>{a.agency}</div>
              </div>
            ))}
            <div className="flex flex-col justify-center pb-6 pl-6 border-l border-gray-200 text-xs text-gray-400 space-y-1 flex-shrink-0">
              <div>Same portfolio type</div>
              <div>Post charge-off, mixed debt</div>
              <div>Hypercare Week 3</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 border border-blue-200 rounded text-xs font-semibold text-blue-700">
              Skit.ai ranks #1 — 12.5% above next best agency
            </span>
            <button onClick={() => setShowMoreBenchmark(!showMoreBenchmark)} className="text-xs text-blue-600 hover:text-blue-700 font-medium">
              {showMoreBenchmark ? 'Hide comparisons ↑' : 'View more comparisons →'}
            </button>
          </div>
          {showMoreBenchmark && (
            <div className="mt-3 border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-2 px-3 text-xs font-semibold text-gray-600 uppercase tracking-wide">Metric</th>
                    {["Agency A","Agency B","Agency C"].map(a => (
                      <th key={a} className="text-center py-2 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">{a}</th>
                    ))}
                    <th className="text-center py-2 px-3 text-xs font-semibold text-blue-600 uppercase tracking-wide">Skit.ai</th>
                  </tr>
                </thead>
                <tbody>
                  {moreBenchmarkMetrics.map((row, i) => (
                    <tr key={i} className="border-b border-gray-100 last:border-0">
                      <td className="py-2 px-3 text-gray-700 font-medium">{row.label}</td>
                      <td className="py-2 px-3 text-center text-gray-400">{row.agencyA}</td>
                      <td className="py-2 px-3 text-center text-gray-400">{row.agencyB}</td>
                      <td className="py-2 px-3 text-center text-gray-400">{row.agencyC}</td>
                      <td className="py-2 px-3 text-center font-bold text-blue-600">{row.skit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Section>

        {/* ── COLLECTIONS OVER TIME ──────────────────────────────────────────── */}
        <Section title="Collections Over Time">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={dailyData}>
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" label={{ value: 'Day', position: 'insideBottom', offset: -5 }} stroke="#9ca3af" />
              <YAxis yAxisId="left"  label={{ value: 'Daily ($)',      angle: -90, position: 'insideLeft' }}  stroke="#9ca3af" />
              <YAxis yAxisId="right" orientation="right" label={{ value: 'Cumulative ($)', angle: 90, position: 'insideRight' }} stroke="#9ca3af" />
              <Tooltip />
              <Area  yAxisId="left"  type="monotone" dataKey="dailyCollections"      stroke="#3b82f6" fill="url(#grad)" />
              <Line  yAxisId="right" type="monotone" dataKey="cumulativeCollections" stroke="#10b981" strokeWidth={2} dot={false} />
              <ReferenceLine yAxisId="left" x={3}  stroke="#6366f1" strokeDasharray="3 3" label={{ value: "Day 3: SMS-first",    position: "top", fill: "#6366f1", fontSize: 11 }} />
              <ReferenceLine yAxisId="left" x={12} stroke="#6366f1" strokeDasharray="3 3" label={{ value: "Day 12: Voice 5×/wk", position: "top", fill: "#6366f1", fontSize: 11 }} />
              <ReferenceLine yAxisId="left" x={17} stroke="#6366f1" strokeDasharray="3 3" label={{ value: "Day 17: Settlements",  position: "top", fill: "#6366f1", fontSize: 11 }} />
            </AreaChart>
          </ResponsiveContainer>
        </Section>

        {/* ── PTP PIPELINE ───────────────────────────────────────────────────── */}
        <Section title="PTP Pipeline & Delivery">
          <div className="grid grid-cols-4 gap-4">
            <div className="p-4 bg-white border border-gray-200 rounded-lg">
              <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Warm PTP</div>
              <div className="text-2xl font-bold text-gray-900">312</div>
              <div className="text-xs text-gray-400 mt-1">Via voice / human direct contact</div>
              <div className="mt-2 pt-2 border-t border-gray-100 text-xs text-gray-500">
                Cold PTP <span className="font-semibold text-gray-700 ml-1">308</span> <span className="text-gray-400">via SMS/email</span>
              </div>
            </div>
            <div className="p-4 bg-white border border-gray-200 rounded-lg">
              <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">PTP Adherence</div>
              <div className="text-2xl font-bold text-amber-600">68%</div>
              <div className="text-xs text-gray-400 mt-1">vs 70% target</div>
              <div className="mt-2 pt-2 border-t border-gray-100">
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div className="h-1.5 rounded-full bg-amber-400" style={{ width: '68%' }} />
                </div>
                <div className="text-xs text-gray-400 mt-1">274 kept · 129 broken this week</div>
              </div>
            </div>
            <div className="p-4 bg-white border border-red-100 rounded-lg">
              <div className="text-xs font-semibold uppercase tracking-wide text-red-500 mb-2">At-Risk PTP Value</div>
              <div className="text-2xl font-bold text-red-600">$142,000</div>
              <div className="text-xs text-gray-400 mt-1">PTPs at risk of being broken</div>
              <div className="mt-2 pt-2 border-t border-gray-100 text-xs text-gray-500">
                89 accounts · missed 1st installment
              </div>
            </div>
            <div className="p-4 bg-white border border-gray-200 rounded-lg">
              <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Bot Abandonment</div>
              <div className="text-2xl font-bold text-amber-600">22%</div>
              <div className="text-xs text-gray-400 mt-1">Hung up before resolution</div>
              <div className="mt-2 pt-2 border-t border-gray-100 text-xs text-gray-500">
                Bot transfer rate <span className="font-semibold text-gray-700 ml-1">18%</span> <span className="text-gray-400">to live agent</span>
              </div>
            </div>
          </div>
        </Section>

        {/* ── COHORT PERFORMANCE ─────────────────────────────────────────────── */}
        <Section title="Cohort Performance">
          <div className="grid grid-cols-5 gap-3">
            {cohortMetrics.map((c, i) => (
              <div key={i} className={`p-3 bg-white rounded-lg ${c.highlight ? 'border-2 border-green-500 shadow-md shadow-green-100' : 'border border-gray-200'}`}>
                <div className="flex items-start justify-between mb-2">
                  <div className="text-xs font-semibold text-gray-900 leading-tight flex-1 pr-1">{c.name}</div>
                  <span className="text-xs font-bold text-green-700 bg-green-50 px-1.5 py-0.5 rounded flex-shrink-0">{c.change}</span>
                </div>
                <MiniBar data={cohortTrendData[Object.keys(cohortTrendData).find(k => k.toLowerCase().includes(c.name.split('/')[0].trim().toLowerCase()))]} color={c.highlight ? '#10b981' : '#3b82f6'} />
                <div className="grid grid-cols-2 gap-x-2 gap-y-1 mt-2 pt-2 border-t border-gray-100 text-xs">
                  <div><span className="text-gray-400">Liq</span> <span className="font-semibold text-gray-900">{c.liquidation}%</span></div>
                  <div><span className="text-gray-400">RPC</span> <span className="font-semibold text-gray-900">{c.rpc}%</span></div>
                  <div><span className="text-gray-400">Cont</span> <span className="font-semibold text-gray-900">{c.contact}%</span></div>
                  <div><span className="text-gray-400">PTP</span> <span className="font-semibold text-gray-900">{c.ptp}%</span></div>
                </div>
                <div className={`mt-2 pt-2 border-t text-xs ${c.negativeMargin ? 'border-red-100' : 'border-gray-100'}`}>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Collected</span>
                    <span className="font-semibold text-gray-900">${(c.collections/1000).toFixed(0)}k</span>
                  </div>
                  <div className="flex justify-between mt-0.5">
                    <span className="text-gray-400">Margin</span>
                    <span className={`font-semibold ${c.negativeMargin ? 'text-red-600' : 'text-green-600'}`}>{c.negativeMargin ? '' : '+'}{(c.margin/1000).toFixed(1)}k</span>
                  </div>
                  <div className="flex justify-between mt-0.5">
                    <span className="text-gray-400">$/dollar</span>
                    <span className={`font-semibold ${c.negativeMargin ? 'text-red-600' : 'text-gray-700'}`}>${c.costPerDollar.toFixed(2)}</span>
                  </div>
                </div>
                {c.negativeMargin && (
                  <div className="mt-1.5 text-[10px] text-red-600 font-medium">⚠ Negative margin</div>
                )}
                {c.highlight && (
                  <button onClick={() => onNavigate && onNavigate('conversations')} className="mt-2 text-xs text-blue-600 font-medium">View conversations →</button>
                )}
              </div>
            ))}
          </div>
        </Section>

        {/* ── CUSTOMER SENTIMENT ─────────────────────────────────────────────── */}
        <Section title="Customer Sentiment">
          {/* Score cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-white border border-gray-200 rounded-lg text-center">
              <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Sentiment Score</div>
              <div className="text-3xl font-bold text-gray-900">{sentimentData.overall}<span className="text-base text-gray-400">/100</span></div>
              <div className="text-xs text-gray-400 mt-1">All channels</div>
            </div>
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
              <div className="text-xs font-semibold uppercase tracking-wide text-green-700 mb-2">Positive</div>
              <div className="text-3xl font-bold text-green-700">{sentimentData.positive}%</div>
              <div className="text-xs text-green-500 mt-1">of interactions</div>
            </div>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
              <div className="text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">Neutral</div>
              <div className="text-3xl font-bold text-gray-700">{sentimentData.neutral}%</div>
              <div className="text-xs text-gray-400 mt-1">of interactions</div>
            </div>
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-center">
              <div className="text-xs font-semibold uppercase tracking-wide text-red-700 mb-2">Negative</div>
              <div className="text-3xl font-bold text-red-600">{sentimentData.negative}%</div>
              <div className="text-xs text-red-400 mt-1">of interactions</div>
            </div>
          </div>

          {/* By channel */}
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">By Channel</p>
            <div className="space-y-2.5">
              {sentimentData.byChannel.map((ch, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-28 text-xs text-gray-600 font-medium flex-shrink-0">{ch.channel}</div>
                  <div className="flex-1 flex h-5 rounded overflow-hidden">
                    <div className="bg-green-400 flex items-center justify-center" style={{ width: `${ch.positive}%` }}>
                      {ch.positive > 12 && <span className="text-[10px] text-white font-semibold">{ch.positive}%</span>}
                    </div>
                    <div className="bg-gray-200 flex items-center justify-center" style={{ width: `${ch.neutral}%` }}>
                      {ch.neutral > 12 && <span className="text-[10px] text-gray-500 font-semibold">{ch.neutral}%</span>}
                    </div>
                    <div className="bg-red-400 flex items-center justify-center" style={{ width: `${ch.negative}%` }}>
                      {ch.negative > 12 && <span className="text-[10px] text-white font-semibold">{ch.negative}%</span>}
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-5 mt-2">
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-green-400" /><span className="text-xs text-gray-500">Positive</span></div>
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-gray-200" /><span className="text-xs text-gray-500">Neutral</span></div>
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-red-400" /><span className="text-xs text-gray-500">Negative</span></div>
              </div>
            </div>
          </div>

          {/* Calling reason table */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">Calling Reason Breakdown</p>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    {["Reason","Count","Share","Sentiment","Resolution"].map(h => (
                      <th key={h} className={`py-2 px-3 text-xs font-semibold text-gray-600 uppercase tracking-wide ${h === 'Reason' || h === 'Resolution' ? 'text-left' : 'text-center'}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sentimentData.callingReasons.map((row, i) => (
                    <tr key={i} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                      <td className="py-2.5 px-3 font-medium text-gray-900">{row.reason}</td>
                      <td className="py-2.5 px-3 text-center text-gray-700 tabular-nums">{row.count}</td>
                      <td className="py-2.5 px-3 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <div className="w-14 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-400 rounded-full" style={{ width: `${row.pct * 2.7}%` }} />
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
        </Section>

        {/* ── UPSELL SIGNALS ─────────────────────────────────────────────────── */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-gray-700">rocket_launch</span>
            <h2 className="text-base font-semibold text-gray-900">Intelligence: Upsell Signals</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border-2 border-teal-200 rounded-lg p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded text-white" style={{ background: 'linear-gradient(135deg,#3BA7F6,#5FCFC4)' }}>Outperforming</span>
                <span className="text-sm font-bold text-gray-900">Auto-Finance &lt;$3K Portfolio</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">Outperforming at 4.1%, 1.6× above the aggregate benchmark. Client has 22,000 similar accounts in-house.</p>
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                <span>Confidence: <strong className="text-teal-600">High</strong></span>
                <span>|</span>
                <span>Projected: <strong>$205K over 60 days</strong></span>
              </div>
              <button className="px-4 py-2 rounded-lg text-white text-xs font-bold" style={{ background: 'linear-gradient(135deg,#3BA7F6,#5FCFC4)' }}>Draft Upsell Case</button>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-5">
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
              <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-xs font-bold hover:bg-gray-200 transition-colors">Review Economic Draft</button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
