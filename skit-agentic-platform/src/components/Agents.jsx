import { useState } from 'react';
import { agents } from '../data';

const overnightTimeline = [
  { time: '08:15 AM', agent: 'Compliance', color: '#06b6d4', summary: 'Scanned 412 recordings. 0 critical violations. 2 low-risk deviations flagged.' },
  { time: '07:00 AM', agent: 'Manager', color: '#8b5cf6', summary: 'Optimized outbound frequency for Early-Arrears segment.' },
  { time: '06:30 AM', agent: 'Data Enrichment', color: '#6366f1', summary: 'Skip trace batch complete. 78 new phone numbers appended.' },
  { time: '06:15 AM', agent: 'Analyst', color: '#3b82f6', summary: 'Identified $42K leakage in automated installment flows.' },
];

const agentColors = {
  Analyst: '#3b82f6', Manager: '#8b5cf6', Compliance: '#ef4444',
  Coach: '#06b6d4', Collector: '#f59e0b', 'Upsell Opportunity': '#10b981', 'Data Enrichment': '#6366f1'
};

const agentIcons = {
  Analyst: 'query_stats', Manager: 'campaign', Compliance: 'shield',
  Coach: 'school', Collector: 'call', 'Upsell Opportunity': 'trending_up', 'Data Enrichment': 'database'
};

const agentLatestStatus = {
  Analyst: 'Re-scored 340 accounts',
  Manager: 'SMS cadence → 3x/week',
  Compliance: '412 audits, 1 flag',
  Coach: '3 agents need coaching',
  Collector: '2,870 touchpoints today',
  'Upsell Opportunity': '$205K signals active',
  'Data Enrichment': '78 numbers appended',
};

const agentDetails = {
  Analyst: {
    skills: ['Portfolio intake & data cleaning', 'Cohort creation & segmentation', 'Propensity scoring', 'KPI tracking & benchmarking', 'Re-scoring on engagement signals', 'Underperformance alerting'],
    recentActions: [
      { time: '2h ago', action: 'Re-scored 340 accounts from Low → Medium propensity based on SMS + email engagement.' },
      { time: '6h ago', action: 'Week 3 liquidation hit 2.7%, crossing 2.5% activation target.' },
      { time: '1d ago', action: 'Published cohort-level breakdown. High Prop/High Bal driving 60% of collections.' },
    ],
    metrics: [
      { label: 'Liquidation Rate', value: '2.7%', target: '2.5%', status: 'above' },
      { label: 'Contact Rate', value: '38%', target: '40%', status: 'below' },
      { label: 'Accounts Re-scored', value: '340', target: '—', status: 'neutral' },
    ]
  },
  Manager: {
    skills: ['Campaign calendar design', 'Content & A/B variant creation', 'Offer & scheme design', 'Cadence optimization', 'Strategy change recommendation', 'Cross-channel coordination'],
    recentActions: [
      { time: '2h ago', action: 'Recommended increasing SMS cadence on Medium Propensity to 3x/week.' },
      { time: '1d ago', action: 'Introduced settlement offer SMS for 620 accounts with 2+ failed PTP.' },
      { time: '3d ago', action: 'Increased voice AI on High Prop/High Bal from 3x to 5x/week.' },
    ],
    metrics: [
      { label: 'Strategy Changes', value: '5', target: '—', status: 'neutral' },
      { label: 'Active Campaigns', value: '9', target: '—', status: 'neutral' },
      { label: 'Content Variants', value: '8', target: '—', status: 'neutral' },
    ]
  },
  Compliance: {
    skills: ['Pre-launch content review', 'Conversation audit (all channels)', 'FDCPA/TCPA compliance check', 'State-specific rule enforcement', 'Compliance report generation', 'Corrective action tracking'],
    recentActions: [
      { time: '4h ago', action: 'Audited 412 conversations. 1 flag: potential timezone violation on NY account.' },
      { time: '1d ago', action: 'Cleared settlement offer SMS template for FDCPA compliance.' },
      { time: '2d ago', action: 'Updated timezone mapping for NY accounts after TCPA flag.' },
    ],
    metrics: [
      { label: 'Compliance Score', value: '99.86%', target: '99.5%', status: 'above' },
      { label: 'Flags This Week', value: '4', target: '<5', status: 'above' },
      { label: 'Avg Resolution', value: '18h', target: '24h', status: 'above' },
    ]
  },
  Coach: {
    skills: ['Conversation quality scoring', 'Agent performance profiling', 'Coaching opportunity identification', 'Calibration session design', 'Training content creation', 'AI bot quality audit'],
    recentActions: [
      { time: '8h ago', action: '3 agents below threshold on "I already paid" objection. Calibration scheduled Friday.' },
      { time: '1d ago', action: 'Scored 18 human agent calls. Average quality: 87/100.' },
      { time: '3d ago', action: 'Deployed fix for objection handling — drop-off reduced 34% → 18%.' },
    ],
    metrics: [
      { label: 'Human Avg Quality', value: '87/100', target: '80', status: 'above' },
      { label: 'AI Bot Quality', value: '92/100', target: '85', status: 'above' },
      { label: 'Coaching Flags', value: '3', target: '—', status: 'neutral' },
    ]
  },
  Collector: {
    skills: ['Campaign launch & scheduling', 'Multi-channel delivery management', 'Bot & agent queue management', 'Inbound handling (IVR, live transfers)', 'Real-time delivery tracking', 'PTP adherence monitoring & automated follow-up'],
    recentActions: [
      { time: '1h ago', action: 'Triggered PTP reminder SMS to 620 accounts with payment due within 24h. 34 confirmed so far.' },
      { time: '3h ago', action: 'Voice AI follow-up on 198 missed PTPs — 47 re-committed to new payment date.' },
      { time: '4h ago', action: 'Escalated 89 repeat PTP-breakers to human agent queue. 12 settled, 8 on hardship plans.' },
      { time: '6h ago', action: 'Launched Spanish SMS campaign for TX/FL cohort — 180 accounts targeted.' },
    ],
    metrics: [
      { label: 'RPC Rate', value: '28%', target: '30%', status: 'below' },
      { label: 'PTP Rate', value: '12%', target: '12%', status: 'above' },
      { label: 'PTP Adherence', value: '68%', target: '70%', status: 'below' },
      { label: 'IB Calls Today', value: '85', target: '—', status: 'neutral' },
      { label: 'IB Completion', value: '78%', target: '75%', status: 'above' },
      { label: 'IB Conversion', value: '42%', target: '—', status: 'neutral' },
      { label: 'Drop-off Rate', value: '18%', target: '<22%', status: 'above' },
      { label: 'Daily Touchpoints', value: '2,870', target: '—', status: 'neutral' },
    ],
    ptpActions: [
      { action: 'PTP reminder SMS 24h before due', accounts: 620, outcome: '34 confirmed payment', status: 'done' },
      { action: 'Voice AI follow-up Day 1 missed PTP', accounts: 198, outcome: '47 re-committed', status: 'done' },
      { action: 'Repeat breakers → human agent queue', accounts: 89, outcome: '12 settled, 8 hardship', status: 'active' },
      { action: 'Settlement SMS for 2+ broken PTPs', accounts: 62, outcome: '8% conversion projected', status: 'pending' },
    ],
  },
  'Upsell Opportunity': {
    skills: ['Benchmark comparison across cohorts', 'Upsell signal detection', 'Client expansion case drafting', 'Revenue opportunity quantification', 'Cross-portfolio pattern matching'],
    recentActions: [
      { time: '3h ago', action: 'Auto-finance <$3K cohort crossed 4% liquidation. Upsell brief drafted.' },
      { time: '1d ago', action: 'Identified 3 active upsell signals worth $205K projected.' },
      { time: '2d ago', action: 'Benchmark analysis: Apex outperforming peer portfolios by 1.6x on low-balance.' },
    ],
    metrics: [
      { label: 'Active Signals', value: '3', target: '—', status: 'neutral' },
      { label: 'Projected Value', value: '$205K', target: '—', status: 'neutral' },
      { label: 'Benchmark Multiple', value: '1.6x', target: '1.0x', status: 'above' },
    ]
  },
  'Data Enrichment': {
    skills: ['Skip tracing (phone, email, address)', 'Contact data refresh', 'Enrichment pipeline management', 'Recovery attribution tracking', 'Vendor coordination (TLO, LexisNexis)'],
    recentActions: [
      { time: '6h ago', action: 'Skip trace batch complete. 78 new phone numbers appended.' },
      { time: '1d ago', action: '340 of 1,200 unreachable accounts now have fresh contact info.' },
      { time: '2d ago', action: '6 enriched accounts converted — $18,400 collected from previously unreachable.' },
    ],
    metrics: [
      { label: 'Enrichment Rate', value: '71%', target: '60%', status: 'above' },
      { label: 'Revenue Recovered', value: '$127K', target: '—', status: 'neutral' },
      { label: 'Accounts Enriched', value: '1,312', target: '—', status: 'neutral' },
    ]
  },
};

const ORB_RADIUS = 170;
const CENTER = 220;

function getPos(idx, total) {
  const angle = (idx / total) * 2 * Math.PI - Math.PI / 2;
  return {
    x: CENTER + Math.cos(angle) * ORB_RADIUS,
    y: CENTER + Math.sin(angle) * ORB_RADIUS,
  };
}

export default function Agents({ onAgentClick }) {
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [hoveredAgent, setHoveredAgent] = useState(null);

  const selected = selectedAgent ? agents.find(a => a.name === selectedAgent) : null;
  const details = selectedAgent ? agentDetails[selectedAgent] : null;
  const hasSelection = selectedAgent !== null;
  const activeHighlight = hoveredAgent || selectedAgent;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Search bar — same style as Insights */}
      <div className="mb-8">
        <div className="card flex items-center gap-3 px-5 py-3.5">
          <span className="material-symbols-outlined text-gray-300 text-xl">search</span>
          <input
            type="text"
            placeholder="Ask an agent about performance, strategies, compliance..."
            className="flex-1 text-sm bg-transparent border-none outline-none text-gray-900 placeholder-gray-400"
          />
          <button className="w-9 h-9 rounded-xl flex items-center justify-center text-white flex-shrink-0" style={{background: 'linear-gradient(135deg, #6366f1, #818cf8)'}}>
            <span className="material-symbols-outlined text-lg">arrow_upward</span>
          </button>
        </div>
      </div>

      {/* Orbital Agent Selector */}
      <div className="flex justify-center mb-4">
        <div className="relative" style={{ width: CENTER * 2, height: CENTER * 2 }}>

          {/* Animated orbital rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="orbit-ring absolute rounded-full" style={{ width: ORB_RADIUS * 2 + 40, height: ORB_RADIUS * 2 + 40, border: '1px solid rgba(99,102,241,0.08)' }} />
            <div className="orbit-ring-2 absolute rounded-full" style={{ width: ORB_RADIUS * 2 - 20, height: ORB_RADIUS * 2 - 20, border: '1px dashed rgba(99,102,241,0.06)' }} />
            {/* Tiny orbiting dots */}
            <div className="absolute" style={{ width: ORB_RADIUS * 2 + 40, height: ORB_RADIUS * 2 + 40, animation: 'orbitSpin 20s linear infinite' }}>
              <div className="absolute w-1.5 h-1.5 rounded-full bg-indigo-300/40" style={{ top: 0, left: '50%', marginLeft: -3 }} />
            </div>
            <div className="absolute" style={{ width: ORB_RADIUS * 2 - 20, height: ORB_RADIUS * 2 - 20, animation: 'orbitSpinReverse 28s linear infinite' }}>
              <div className="absolute w-1 h-1 rounded-full bg-violet-300/30" style={{ bottom: 0, left: '50%', marginLeft: -2 }} />
            </div>
          </div>

          {/* Hover / selection glow backdrop */}
          {activeHighlight && (
            <div
              className="absolute rounded-full pointer-events-none transition-all duration-500"
              style={{
                width: 160, height: 160,
                left: CENTER - 80, top: CENTER - 80,
                background: `radial-gradient(circle, ${agentColors[activeHighlight]}15 0%, transparent 70%)`,
                filter: 'blur(20px)',
              }}
            />
          )}

          {/* Center hub */}
          <div
            className={`absolute rounded-full flex items-center justify-center z-10 transition-all duration-500 ${!selectedAgent ? 'center-glow' : 'selected-glow'}`}
            style={{
              width: 76, height: 76,
              left: CENTER - 38, top: CENTER - 38,
              background: selectedAgent ? agentColors[selectedAgent] : 'linear-gradient(135deg, #6366f1, #818cf8)',
              '--glow-color': selectedAgent ? `${agentColors[selectedAgent]}40` : 'rgba(99,102,241,0.25)',
            }}
          >
            <span className="material-symbols-outlined text-white text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              {selectedAgent ? agentIcons[selectedAgent] : 'hub'}
            </span>
          </div>

          {/* Agent nodes */}
          {agents.map((agent, idx) => {
            const pos = getPos(idx, agents.length);
            const isSelected = selectedAgent === agent.name;
            const isHovered = hoveredAgent === agent.name;
            const isFaded = hasSelection && !isSelected;
            const floatDelay = `${idx * 0.4}s`;

            return (
              <button
                key={agent.name}
                onClick={() => setSelectedAgent(isSelected ? null : agent.name)}
                onMouseEnter={() => setHoveredAgent(agent.name)}
                onMouseLeave={() => setHoveredAgent(null)}
                className="absolute flex flex-col items-center transition-all duration-400 agent-float"
                style={{
                  left: pos.x - 48,
                  top: pos.y - 48,
                  width: 96,
                  opacity: isFaded ? 0.25 : 1,
                  transform: isSelected ? 'scale(1.18)' : isHovered ? 'scale(1.1)' : isFaded ? 'scale(0.85)' : 'scale(1)',
                  filter: isFaded ? 'grayscale(0.6)' : 'none',
                  zIndex: isSelected ? 20 : isHovered ? 15 : 5,
                  animationDelay: floatDelay,
                }}
              >
                {/* Glow ring on hover/select */}
                {(isHovered || isSelected) && (
                  <div
                    className="absolute rounded-full pointer-events-none"
                    style={{
                      width: 64, height: 64,
                      top: -4, left: 16,
                      background: `radial-gradient(circle, ${agentColors[agent.name]}20 0%, transparent 70%)`,
                      filter: 'blur(8px)',
                      animation: 'pulseGlow 2s ease-in-out infinite',
                    }}
                  />
                )}

                {/* Node circle */}
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 relative"
                  style={{
                    background: isSelected ? agentColors[agent.name] : isHovered ? `${agentColors[agent.name]}12` : '#fff',
                    border: isSelected ? 'none' : `2px solid ${isHovered ? agentColors[agent.name] : agentColors[agent.name] + '40'}`,
                    boxShadow: isSelected
                      ? `0 8px 28px ${agentColors[agent.name]}35`
                      : isHovered
                        ? `0 4px 20px ${agentColors[agent.name]}20`
                        : '0 2px 8px rgba(0,0,0,0.04)',
                  }}
                >
                  <span
                    className="material-symbols-outlined text-xl"
                    style={{ color: isSelected ? '#fff' : agentColors[agent.name], fontVariationSettings: "'FILL' 1" }}
                  >
                    {agentIcons[agent.name]}
                  </span>
                  {/* Active indicator dot */}
                  <div
                    className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white"
                    style={{ background: '#10b981' }}
                  />
                </div>

                {/* Name */}
                <span className={`text-[10px] font-semibold text-center leading-tight mt-1.5 transition-colors ${isSelected ? 'text-gray-900' : isHovered ? 'text-gray-800' : 'text-gray-400'}`}>
                  {agent.name}
                </span>
                {/* Latest status */}
                <span
                  className="text-[9px] text-center leading-tight max-w-[96px] truncate transition-all duration-300"
                  style={{
                    color: agentColors[agent.name],
                    opacity: isFaded ? 0 : (isHovered || isSelected || !hasSelection) ? 0.7 : 0.4,
                  }}
                >
                  {agentLatestStatus[agent.name]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Talk to Agent — below the orb */}
      {selected && (
        <div className="flex justify-center mb-8 animate-fadeIn">
          <button
            className="flex items-center gap-2.5 px-6 py-3 rounded-2xl text-sm font-semibold text-white transition-all hover:scale-105"
            style={{
              background: agentColors[selected.name],
              boxShadow: `0 6px 24px ${agentColors[selected.name]}30`,
            }}
          >
            <span className="material-symbols-outlined text-lg">chat</span>
            Talk to {selected.name}
          </button>
        </div>
      )}

      {/* Selected Agent Detail */}
      {selected && details && (
        <div className="animate-fadeIn">
          {/* Agent Header */}
          <div className="card p-6 mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: agentColors[selected.name] }}>
                <span className="material-symbols-outlined text-white text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>{agentIcons[selected.name]}</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">{selected.name}</h2>
                <p className="text-sm text-gray-500">{selected.role}</p>
              </div>
              <span className="ml-auto px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full">Active</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{selected.description}</p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Metrics */}
            <div className="col-span-1 space-y-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Key Metrics</h3>
              {details.metrics.map((m, i) => (
                <div key={i} className="card p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">{m.label}</span>
                    {m.status === 'above' && <span className="w-2 h-2 rounded-full bg-emerald-400" />}
                    {m.status === 'below' && <span className="w-2 h-2 rounded-full bg-amber-400" />}
                    {m.status === 'neutral' && <span className="w-2 h-2 rounded-full bg-gray-300" />}
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-gray-900">{m.value}</span>
                    {m.target !== '—' && <span className="text-xs text-gray-400">target: {m.target}</span>}
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="col-span-1">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {details.recentActions.map((a, i) => (
                  <div key={i} className="card p-4">
                    <p className="text-[10px] font-semibold text-gray-400 mb-1">{a.time}</p>
                    <p className="text-sm text-gray-700 leading-relaxed">{a.action}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="col-span-1">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Capabilities</h3>
              <div className="card p-4">
                <div className="space-y-2">
                  {details.skills.map((skill, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: agentColors[selected.name] }} />
                      <span className="text-sm text-gray-700">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Collector PTP Adherence Actions */}
      {selected && selected.name === 'Collector' && details.ptpActions && (
        <div className="mt-6 animate-fadeIn">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">PTP Adherence Actions & Outcomes</h3>
          <div className="card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left py-2.5 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Action</th>
                  <th className="text-right py-2.5 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Accounts</th>
                  <th className="text-left py-2.5 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Outcome</th>
                  <th className="text-center py-2.5 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {details.ptpActions.map((row, i) => (
                  <tr key={i} className="border-b border-gray-50 last:border-0">
                    <td className="py-2.5 px-4 text-xs text-gray-700">{row.action}</td>
                    <td className="py-2.5 px-4 text-xs text-gray-900 font-semibold text-right">{row.accounts}</td>
                    <td className="py-2.5 px-4 text-xs text-gray-600">{row.outcome}</td>
                    <td className="py-2.5 px-4 text-center">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        row.status === 'done' ? 'bg-emerald-50 text-emerald-700' :
                        row.status === 'active' ? 'bg-blue-50 text-blue-700' :
                        'bg-gray-100 text-gray-500'
                      }`}>{row.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Overnight Activity — always visible when no agent selected, collapsible otherwise */}
      {!selected && (
        <div className="mt-2">
          <div className="flex items-center gap-2 mb-3">
            <span className="material-symbols-outlined text-gray-400 text-base">schedule</span>
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Overnight Activity</h2>
            <span className="text-[10px] text-gray-400 ml-1">· {overnightTimeline.length} agent actions while you were away</span>
          </div>
          <div className="card p-5">
            <div className="relative pl-5 space-y-5" style={{borderLeft: '2px solid #d4eae5'}}>
              {overnightTimeline.map((entry, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[17px] top-0.5 w-2 h-2 rounded-full" style={{backgroundColor: entry.color}} />
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-semibold text-gray-400">{entry.time}</span>
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded" style={{backgroundColor: `${entry.color}15`, color: entry.color}}>{entry.agent}</span>
                  </div>
                  <p className="text-sm text-gray-600">{entry.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
