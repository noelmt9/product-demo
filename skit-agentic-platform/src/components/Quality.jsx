import { useState } from 'react';
import { complianceData, coachData } from '../data';

// ── Improvement cases (Active Improvements tab — unchanged) ──────────────────

const agentColors = { Collector: '#f59e0b', Auditor: '#ef4444', Manager: '#8b5cf6' };

const improvementCases = [
  {
    id: 'objection-handling',
    title: 'Objection Handling — "I already paid this"',
    status: 'Fix deployed', statusColor: 'bg-emerald-600',
    source: '142 scored calls this week. 3 agents (Agent 4, 5, 6) failing on this objection consistently.',
    diagnosis: 'Agents go silent for 4-5 seconds after the objection, then repeat the balance amount. Consumer perceives this as dismissive and hangs up. Drop-off rate at this moment: 34%.',
    proposedFix: 'New response flow — acknowledge first, then verify, then resolve pathway based on verification outcome.',
    deployment: [
      { agent: 'Collector', action: 'Voice AI objection handling branch updated on all 3 bot variants. Live since Day 16.' },
      { agent: 'Collector', action: 'Updated script pushed to human agent queue. Calibration session scheduled Friday for Agents 4, 5, 6.' }
    ],
    projectedImpact: '+12% RPC retention on accounts where this objection is raised.',
    earlySignal: 'Voice AI calls hitting this objection now show 18% drop-off vs 34% pre-fix.'
  },
  {
    id: 'medical-empathy',
    title: 'Medical Debt Empathy Gap',
    status: 'In review', statusColor: 'bg-amber-500',
    source: '480 AI bot conversations scored this week. Medical debt cohort showing 40% consumer drop-off at hardship mention.',
    diagnosis: 'Current bot flow jumps directly to payment plan after hardship mention. Consumers perceive this as tone-deaf and disengage.',
    proposedFix: 'Insert empathy acknowledgment step before any solution. New Voice AI conversation branch required. Human agents get a coaching brief.',
    deployment: [
      { agent: 'Auditor', action: 'Updated empathetic bot script submitted for review. Waiting approval.' },
      { agent: 'Collector', action: 'Human agent coaching brief drafted. Will be covered in Monday\'s medical debt sensitivity refresher.' }
    ],
    projectedImpact: 'Estimated -15% drop-off on hardship mentions.',
    earlySignal: null
  },
  {
    id: 'settlement-disconnect',
    title: 'Settlement Offer Cross-Channel Disconnect',
    status: 'Diagnosing', statusColor: 'bg-blue-600',
    source: 'Analysis of settlement offer campaign (SMS then Voice follow-up). 620 accounts targeted since Day 17.',
    diagnosis: 'Voice call script re-explains the offer from scratch instead of referencing the SMS. SMS to email converts at 8%, SMS to voice only 2%.',
    proposedFix: 'Update voice call script to reference prior SMS. Update bot next-best-action to detect SMS engagement before voice follow-up.',
    deployment: [
      { agent: 'Manager', action: 'Script update being drafted.' },
      { agent: null, action: 'Pending: Voice AI bot update + human agent briefing once script is finalized.' }
    ],
    projectedImpact: 'If voice follow-up conversion matches email (8%), estimated additional $18,000 in collections.',
    earlySignal: null
  }
];

// ── $Lost drawer data ────────────────────────────────────────────────────────

const lostBreakdown = [
  { label: 'Bot Drop-offs / Abandonment', amount: 6200, desc: 'Conversations where bot hung up before resolution (22% abandonment rate)', pct: 50.4 },
  { label: 'Human Agent Leakage', amount: 3800, desc: 'Low-quality human calls that did not result in resolution or payment commitment', pct: 30.9 },
  { label: 'Promise Breaches', amount: 1500, desc: 'Commitments made during calls that were not fulfilled', pct: 12.2 },
  { label: 'Others', amount: 800, desc: 'Miscellaneous quality leakage not categorised above', pct: 6.5 },
];

// ── Flagged issues table ─────────────────────────────────────────────────────

const flaggedIssues = [
  { id: 1, type: 'FDCPA', desc: 'Mini-Miranda not stated within 30 seconds', channel: 'Voice', agentType: 'Human', status: 'Resolved', action: 'Agent retrained, call script updated' },
  { id: 2, type: 'FDCPA', desc: 'Mini-Miranda not stated within 30 seconds', channel: 'Voice', agentType: 'Human', status: 'Resolved', action: 'Same agent, second occurrence. Formal warning issued' },
  { id: 3, type: 'FDCPA', desc: 'Incorrect balance quoted to consumer', channel: 'Voice', agentType: 'Human', status: 'Resolved', action: 'Data sync issue identified, fix deployed' },
  { id: 4, type: 'TCPA', desc: 'Call placed at 8:47 PM EST to NY consumer (after 8 PM NY rule)', channel: 'Voice', agentType: 'AI', status: 'Resolved', action: 'Timezone mapping corrected for NY accounts' },
];

// ── Agent scoreboard ─────────────────────────────────────────────────────────

const scoreboard = [
  { agent: 'Agent 1', score: 91, trend: 'up', strength: 'Empathy & rapport', need: null },
  { agent: 'Agent 2', score: 89, trend: 'stable', strength: 'Payment plan negotiation', need: 'Call pacing (rushes close)' },
  { agent: 'Agent 3', score: 88, trend: 'up', strength: 'Objection handling', need: null },
  { agent: 'Agent 4', score: 86, trend: 'down', strength: 'Technical accuracy', need: "'Already paid' objection" },
];


// ── Main Component ───────────────────────────────────────────────────────────

export default function Quality({ initialTab = 'overview', onTabChange }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [expandedSection, setExpandedSection] = useState(null); // 'saved' | 'lost' | 'quality' | null

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (onTabChange) onTabChange(tab);
  };

  const toggleInline = (section) => {
    setExpandedSection(prev => prev === section ? null : section);
  };

  const scoreColor = (s) => s >= 90 ? 'text-emerald-600' : s >= 80 ? 'text-amber-600' : 'text-red-600';

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-xl font-bold text-gray-900">Quality</h1>
        <p className="text-sm text-gray-500 mt-0.5">Compliance health, financial impact, and agent performance</p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 mb-6" style={{ borderBottom: '1px solid #d4eae5' }}>
        {[{ id: 'overview', label: 'Overview' }, { id: 'improvements', label: 'Active Improvements' }].map(tab => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`pb-3 text-sm font-medium transition-all relative ${activeTab === tab.id ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
          >
            {tab.label}
            {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full" style={{ background: '#2196af' }} />}
          </button>
        ))}
      </div>

      {/* ── OVERVIEW TAB ─────────────────────────────────────────────────────── */}
      {activeTab === 'overview' && (
        <div>
          {/* Three headline cards */}
          <div className="grid grid-cols-3 gap-4 mb-4">

            {/* $Saved */}
            <button
              onClick={() => toggleInline('saved')}
              className={`card p-5 text-left transition-all ${expandedSection === 'saved' ? 'ring-2' : ''}`}
              style={expandedSection === 'saved' ? { borderColor: '#2196af', boxShadow: '0 0 0 2px rgba(33,150,175,0.15)' } : {}}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">$Saved</span>
                <span className={`material-symbols-outlined text-sm text-gray-400 transition-transform ${expandedSection === 'saved' ? 'rotate-180' : ''}`}>expand_more</span>
              </div>
              <div className="text-2xl font-bold text-emerald-600 mb-1">$64,500</div>
              <div className="text-[12px] text-gray-500">43 violations prevented today</div>
            </button>

            {/* $Lost */}
            <button
              onClick={() => toggleInline('lost')}
              className={`card p-5 text-left transition-all ${expandedSection === 'lost' ? 'ring-2' : ''}`}
              style={expandedSection === 'lost' ? { borderColor: '#ef4444', boxShadow: '0 0 0 2px rgba(239,68,68,0.12)' } : {}}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">$Lost</span>
                <span className={`material-symbols-outlined text-sm text-gray-400 transition-transform ${expandedSection === 'lost' ? 'rotate-180' : ''}`}>expand_more</span>
              </div>
              <div className="text-2xl font-bold text-red-600 mb-1">$12,300</div>
              <div className="text-[12px] text-gray-500">Across bot, human & promise breach</div>
            </button>

            {/* Quality Score */}
            <button
              onClick={() => toggleInline('quality')}
              className={`card p-5 text-left transition-all ${expandedSection === 'quality' ? 'ring-2' : ''}`}
              style={expandedSection === 'quality' ? { borderColor: '#2196af', boxShadow: '0 0 0 2px rgba(33,150,175,0.15)' } : {}}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Quality Score</span>
                <span className={`material-symbols-outlined text-sm text-gray-400 transition-transform ${expandedSection === 'quality' ? 'rotate-180' : ''}`}>expand_more</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">99.86%</div>
              <div className="text-[12px] text-gray-500">~$8,200 potentially affected</div>
            </button>
          </div>

          {/* ── $Saved Inline Expansion ───────────────────────────────────────── */}
          {expandedSection === 'saved' && (
            <div className="card p-5 mb-4 animate-fadeIn">
              {/* Violation breakdown tiles */}
              <div className="grid grid-cols-4 gap-3 mb-5">
                <div className="rounded-xl p-3" style={{ background: '#f0f8f6' }}>
                  <div className="text-lg font-bold text-gray-900">2,847</div>
                  <div className="text-[11px] text-gray-400">Conversations audited this week</div>
                </div>
                <div className="rounded-xl p-3" style={{ background: '#f0f8f6' }}>
                  <div className="text-lg font-bold text-gray-900">4 / 4</div>
                  <div className="text-[11px] text-gray-400">Flags resolved (avg 18 hrs)</div>
                </div>
                <div className="rounded-xl p-3" style={{ background: '#fef2f2' }}>
                  <div className="text-lg font-bold text-red-600">3</div>
                  <div className="text-[11px] text-gray-400">FDCPA violations. All resolved</div>
                </div>
                <div className="rounded-xl p-3" style={{ background: '#fefce8' }}>
                  <div className="text-lg font-bold text-amber-600">1</div>
                  <div className="text-[11px] text-gray-400">TCPA violation. All resolved</div>
                </div>
              </div>

              {/* Flagged Issues Table */}
              <div className="mb-2">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Flagged Issues</h3>
                <p className="text-[11px] text-gray-400 mb-3">All caught violations that contributed to $Saved</p>
              </div>
              <div className="overflow-hidden rounded-xl" style={{ border: '1px solid #d4eae5' }}>
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: '#f0f8f6' }}>
                      {['#', 'Type', 'Description', 'Channel', 'Agent', 'Status', 'Corrective Action'].map(h => (
                        <th key={h} className="text-left py-2.5 px-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {flaggedIssues.map((f) => (
                      <tr key={f.id} style={{ borderTop: '1px solid #ecf6f3' }}>
                        <td className="py-2.5 px-3 text-gray-600">{f.id}</td>
                        <td className="py-2.5 px-3">
                          <span className={`inline-flex px-2 py-0.5 text-[10px] font-semibold rounded ${f.type === 'FDCPA' ? 'bg-orange-50 text-orange-700 border border-orange-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>{f.type}</span>
                        </td>
                        <td className="py-2.5 px-3 text-gray-700 text-xs">{f.desc}</td>
                        <td className="py-2.5 px-3 text-gray-600 text-xs">{f.channel}</td>
                        <td className="py-2.5 px-3 text-gray-600 text-xs">{f.agentType}</td>
                        <td className="py-2.5 px-3">
                          <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />{f.status}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-gray-600 text-xs">{f.action}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── $Lost Inline Expansion ──────────────────────────────────────── */}
          {expandedSection === 'lost' && (
            <div className="card p-5 mb-4 animate-fadeIn">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Revenue & Quality Leakage</h3>
                  <p className="text-[11px] text-gray-400">Breakdown of $Lost this week</p>
                </div>
                <div className="text-2xl font-bold text-red-600">$12,300</div>
              </div>

              <div className="grid grid-cols-4 gap-3 mb-5">
                {lostBreakdown.map((item, i) => (
                  <div key={i} className="rounded-xl p-3" style={{ background: '#fef2f2' }}>
                    <div className="text-lg font-bold text-red-600" style={{ fontVariantNumeric: 'tabular-nums' }}>${item.amount.toLocaleString()}</div>
                    <div className="text-[11px] font-semibold text-gray-700 mb-0.5">{item.label}</div>
                    <div className="text-[10px] text-gray-400 leading-relaxed">{item.desc}</div>
                    <div className="mt-2 w-full h-1.5 rounded-full" style={{ background: '#fecaca' }}>
                      <div className="h-1.5 rounded-full bg-red-400" style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-xl p-4 grid grid-cols-2 gap-4" style={{ background: '#fef2f2', border: '1px solid #fecaca' }}>
                <div>
                  <div className="text-xs font-bold text-red-700 uppercase tracking-widest mb-1">Bot Abandonment Rate</div>
                  <div className="text-lg font-bold text-red-600">22%</div>
                  <div className="text-[11px] text-gray-500">480 conversations, 106 abandoned</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-red-700 uppercase tracking-widest mb-1">Below Threshold</div>
                  <div className="text-lg font-bold text-red-600">3</div>
                  <div className="text-[11px] text-gray-500">Agents below quality threshold</div>
                </div>
              </div>
            </div>
          )}

          {/* ── Quality Score Inline Expansion ────────────────────────────────── */}
          {expandedSection === 'quality' && (
            <div className="card p-5 mb-4 animate-fadeIn">
              {/* Adherence Metrics */}
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Adherence & Compliance Rates</h3>
              <div className="grid grid-cols-4 gap-3 mb-6">
                {[
                  { label: 'Mini-Miranda Adherence', value: '96.8%', bench: 'Disclosure within 30 sec', pct: 96.8 },
                  { label: 'Call Opening Adherence', value: '98.2%', bench: 'Approved opening script', pct: 98.2 },
                  { label: 'Call Closing Adherence', value: '97.4%', bench: 'Approved closing script', pct: 97.4 },
                  { label: 'Training Compliance', value: '100%', bench: '6 / 6 agents certified on Q1 refresher', pct: 100 },
                ].map((m, i) => (
                  <div key={i} className="rounded-xl p-3" style={{ background: '#f0f8f6' }}>
                    <div className={`text-lg font-bold ${m.pct >= 98 ? 'text-emerald-600' : m.pct >= 96 ? 'text-amber-600' : 'text-red-600'}`}>{m.value}</div>
                    <div className="text-[11px] font-semibold text-gray-700 mb-0.5">{m.label}</div>
                    <div className="text-[10px] text-gray-400">{m.bench}</div>
                    <div className="mt-2 w-full h-1.5 rounded-full" style={{ background: '#d4eae5' }}>
                      <div className={`h-1.5 rounded-full ${m.pct >= 98 ? 'bg-emerald-500' : m.pct >= 96 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${m.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Agent Scoreboard */}
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Agent Scoreboard</h3>
              <p className="text-[11px] text-gray-400 mb-3">622 total calls scored this week. 142 human, 480 AI</p>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="rounded-xl p-3 text-center" style={{ background: '#f0f8f6' }}>
                  <div className="text-lg font-bold text-gray-900">87 / 100</div>
                  <div className="text-[11px] text-gray-400">Human Avg Quality</div>
                </div>
                <div className="rounded-xl p-3 text-center" style={{ background: '#f0f8f6' }}>
                  <div className="text-lg font-bold text-gray-900">92 / 100</div>
                  <div className="text-[11px] text-gray-400">AI Bot Avg Quality</div>
                </div>
              </div>

              <div className="overflow-hidden rounded-xl" style={{ border: '1px solid #d4eae5' }}>
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: '#f0f8f6' }}>
                      {['Agent', 'Quality Score', 'Trend', 'Top Strength', 'Coaching Need'].map(h => (
                        <th key={h} className={`py-2.5 px-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider ${h === 'Quality Score' ? 'text-right' : 'text-left'}`}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {scoreboard.map((a, i) => (
                      <tr key={i} style={{ borderTop: '1px solid #ecf6f3' }}>
                        <td className="py-2.5 px-3 font-medium text-gray-800">{a.agent}</td>
                        <td className="py-2.5 px-3 text-right">
                          <span className={`font-bold ${scoreColor(a.score)}`} style={{ fontVariantNumeric: 'tabular-nums' }}>{a.score} / 100</span>
                        </td>
                        <td className="py-2.5 px-3">
                          {a.trend === 'up' && <span className="text-emerald-600 font-bold">↑</span>}
                          {a.trend === 'down' && <span className="text-red-600 font-bold">↓</span>}
                          {a.trend === 'stable' && <span className="text-gray-400">→</span>}
                        </td>
                        <td className="py-2.5 px-3 text-gray-600 text-xs">{a.strength}</td>
                        <td className="py-2.5 px-3 text-gray-600 text-xs">{a.need || <span className="text-gray-300">None</span>}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── ACTIVE IMPROVEMENTS TAB ──────────────────────────────────────────── */}
      {activeTab === 'improvements' && (
        <div className="space-y-6">
          {improvementCases.map((caseItem) => (
            <div key={caseItem.id} className="card p-6">
              <div className="flex items-start justify-between mb-6">
                <h3 className="text-base font-semibold text-gray-900">{caseItem.title}</h3>
                <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold text-white rounded ${caseItem.statusColor}`}>{caseItem.status}</span>
              </div>
              <div className="space-y-5">
                {[
                  { num: '1', label: 'Source', text: caseItem.source },
                  { num: '2', label: 'Diagnosis', text: caseItem.diagnosis },
                  { num: '3', label: 'Proposed Fix', text: caseItem.proposedFix },
                ].map(step => (
                  <div key={step.num} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#e8f4f1' }}>
                        <span className="text-xs font-semibold" style={{ color: '#2196af' }}>{step.num}</span>
                      </div>
                      <div className="w-0.5 h-full mt-2" style={{ background: '#d4eae5' }} />
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="text-xs uppercase tracking-wide text-gray-400 mb-1 font-bold">{step.label}</p>
                      <p className="text-sm text-gray-700">{step.text}</p>
                    </div>
                  </div>
                ))}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#e8f4f1' }}>
                      <span className="text-xs font-semibold" style={{ color: '#2196af' }}>4</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-wide text-gray-400 mb-3 font-bold">Deployment</p>
                    <div className="space-y-2">
                      {caseItem.deployment.map((deploy, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="text-gray-400">→</span>
                          {deploy.agent && <span className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: agentColors[deploy.agent] }} />}
                          {deploy.agent && <span className="text-sm font-medium text-gray-800">{deploy.agent}:</span>}
                          <p className="text-sm text-gray-600">{deploy.action}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-5" style={{ borderTop: '1px solid #ecf6f3' }}>
                <div className="rounded-xl p-4" style={{ background: '#f0f8f6', border: '1px solid #d4eae5' }}>
                  <p className="text-xs uppercase tracking-wide font-bold mb-2" style={{ color: '#2196af' }}>Projected Impact</p>
                  <p className="text-sm text-gray-700 mb-2">{caseItem.projectedImpact}</p>
                  {caseItem.earlySignal && (
                    <div className="mt-3 pt-3" style={{ borderTop: '1px solid #d4eae5' }}>
                      <p className="text-xs uppercase tracking-wide font-bold mb-1" style={{ color: '#2196af' }}>Early Signal</p>
                      <p className="text-sm text-gray-700">{caseItem.earlySignal}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
