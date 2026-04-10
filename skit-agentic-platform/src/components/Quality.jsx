import { useState } from 'react';

// ── Agent color map ──────────────────────────────────────────────────────────
const agentColors = { Collector: '#f59e0b', Auditor: '#ef4444', Manager: '#8b5cf6' };

// ── 10 scoring dimensions (from real audit form) ─────────────────────────────
const DIMENSIONS = [
  { key: 'opening',     label: 'Opening & First Impression' },
  { key: 'empathy',     label: 'Empathy & Emotional Intelligence' },
  { key: 'listening',   label: 'Active Listening' },
  { key: 'control',     label: 'Call Control' },
  { key: 'language',    label: 'Professional Language' },
  { key: 'objection',   label: 'Objection Handling' },
  { key: 'rapport',     label: 'Trust & Rapport' },
  { key: 'confidence',  label: 'Product Confidence' },
  { key: 'closing',     label: 'Closing & Ownership' },
  { key: 'sentence',    label: 'Sentence Construction' },
];

// ── Agent scorecards — scores per dimension (1–5) ────────────────────────────
// Based on patterns from real audit data: delayed opening, empathy gaps, active
// listening failures, missing recap/closing are the most common issues.
const agentScoreCards = [
  {
    name: 'Mark',
    process: 'Tate & Kirlin',
    callsScored: 12,
    compliancePass: true,
    trend: 'up',
    scores: { opening: 5, empathy: 4, listening: 4, control: 5, language: 5, objection: 5, rapport: 5, confidence: 4, closing: 5, sentence: 5 },
    topStrength: 'Call control & rapport',
    coachingNeed: null,
    auditorNote: 'Strong performer. Consistent assumptive opening. Could improve PTP confirmation hygiene.',
  },
  {
    name: 'Sushmitha',
    process: 'Tate & Kirlin',
    callsScored: 14,
    compliancePass: true,
    trend: 'up',
    scores: { opening: 3, empathy: 4, listening: 3, control: 4, language: 5, objection: 3, rapport: 4, confidence: 4, closing: 4, sentence: 4 },
    topStrength: 'Professional language',
    coachingNeed: 'Assumptive opening; active listening (interrupting)',
    auditorNote: 'Opening delayed on multiple calls. Tape disclosure missing or placed post-authentication. Objection handling goes blank — repeats balance instead of rebuttal.',
  },
  {
    name: 'Faraz',
    process: 'Autofinance USA',
    callsScored: 10,
    compliancePass: true,
    trend: 'stable',
    scores: { opening: 3, empathy: 3, listening: 3, control: 4, language: 4, objection: 4, rapport: 3, confidence: 3, closing: 3, sentence: 4 },
    topStrength: 'Objection handling',
    coachingNeed: 'Delayed opening; empathy acknowledgments; recap / PTP confirmation',
    auditorNote: 'ROS too high in opening. Dead air during system navigation — should engage consumer. "I appreciate" overused; "I understand" preferred. Missing recap on several calls.',
  },
  {
    name: 'Raichal',
    process: 'Autofinance USA',
    callsScored: 11,
    compliancePass: false,
    trend: 'down',
    scores: { opening: 2, empathy: 3, listening: 3, control: 3, language: 4, objection: 4, rapport: 4, confidence: 3, closing: 2, sentence: 3 },
    topStrength: 'Rapport building',
    coachingNeed: 'Opening (starts with "Hello"); Krisp not enabled; closing & recap missing; hold procedure',
    auditorNote: 'FLAG: One call — disclosed account info before authentication (compliance). Offline conversation recorded. Opening "Hello" vs assumptive standard. Closing consistently weak — no recap, no next steps.',
  },
  {
    name: 'Dikshetha',
    process: 'Autofinance USA / Global Finance',
    callsScored: 9,
    compliancePass: true,
    trend: 'up',
    scores: { opening: 4, empathy: 5, listening: 4, control: 5, language: 5, objection: 5, rapport: 5, confidence: 4, closing: 4, sentence: 5 },
    topStrength: 'Empathy & product knowledge',
    coachingNeed: 'Assumptive opening on new placements; recap on inbound calls',
    auditorNote: 'Handled non-payment calls well. Needs assumptive opening — said "I am not sure why you got the call" on one call. Long hold on Global Finance without engaging consumer.',
  },
  {
    name: 'Anil',
    process: 'Lane Health',
    callsScored: 8,
    compliancePass: true,
    trend: 'stable',
    scores: { opening: 3, empathy: 3, listening: 3, control: 4, language: 4, objection: 3, rapport: 3, confidence: 3, closing: 3, sentence: 3 },
    topStrength: 'Call structure',
    coachingNeed: 'Acknowledgements; probing; paraphrasing; intonation',
    auditorNote: 'Frequent "Okay" when consumer expresses frustration — should paraphrase and empathise. Missed partial payment opportunity. False promise on one call. Active listening inconsistent.',
  },
];

// ── Error taxonomy — from real audit error consequence table ─────────────────
const errorTaxonomy = [
  { error: 'Failure to use assumptive opening',     consequence: 'RPC Conversion',        count: 11, agents: ['Sushmitha', 'Faraz', 'Raichal', 'Anil'] },
  { error: 'No recap / PTP confirmation',           consequence: 'Broken PTP',             count: 9,  agents: ['Faraz', 'Raichal', 'Anil', 'Mark'] },
  { error: 'Active listening failure',              consequence: 'Negative Rapport',       count: 8,  agents: ['Sushmitha', 'Faraz', 'Anil'] },
  { error: 'Mini-Miranda missing / late',           consequence: 'Compliance',             count: 5,  agents: ['Raichal', 'Mark'] },
  { error: 'No acknowledgment on negative emotion', consequence: 'Negative Rapport',       count: 7,  agents: ['Anil', 'Faraz', 'Sushmitha'] },
  { error: 'Missed settlement / payment plan pitch',consequence: 'Lost Payment Conversion',count: 6,  agents: ['Anil', 'Sushmitha', 'Faraz'] },
  { error: 'Incorrect choice of words',             consequence: 'Loss of Confidence',     count: 8,  agents: ['Faraz', 'Sushmitha'] },
  { error: 'No objection rebuttal (goes blank)',    consequence: 'Lost Payment Conversion',count: 5,  agents: ['Sushmitha', 'Raichal'] },
  { error: 'Debt info disclosed before auth',       consequence: 'Compliance',             count: 2,  agents: ['Raichal', 'Sharonin'] },
  { error: 'Dead air / hold without informing',     consequence: 'Hang-Up',                count: 6,  agents: ['Faraz', 'Dikshetha', 'Anil'] },
  { error: 'Tape disclosure missing / wrong order', consequence: 'Compliance',             count: 4,  agents: ['Sushmitha', 'Anil'] },
  { error: 'No callback hygiene / door left open',  consequence: 'Lost Future Opportunity',count: 5,  agents: ['Raichal', 'Anil'] },
];

const consequenceColor = {
  'Compliance':             { bg: 'bg-red-50',    text: 'text-red-700',    border: 'border-red-200' },
  'RPC Conversion':         { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
  'Broken PTP':             { bg: 'bg-amber-50',  text: 'text-amber-700',  border: 'border-amber-200' },
  'Lost Payment Conversion':{ bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' },
  'Negative Rapport':       { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  'Hang-Up':                { bg: 'bg-gray-100',  text: 'text-gray-600',   border: 'border-gray-200' },
  'Loss of Confidence':     { bg: 'bg-blue-50',   text: 'text-blue-700',   border: 'border-blue-200' },
  'Lost Future Opportunity':{ bg: 'bg-teal-50',   text: 'text-teal-700',   border: 'border-teal-200' },
};

// ── Compliance flags (human agent) ───────────────────────────────────────────
const complianceFlags = [
  { id: 1, type: 'FDCPA', desc: 'Mini-Miranda not stated within 30 seconds', channel: 'Voice', agentType: 'Human', agent: 'Mark', status: 'Resolved', action: 'Agent retrained, call script updated' },
  { id: 2, type: 'FDCPA', desc: 'Mini-Miranda not stated within 30 seconds — second occurrence', channel: 'Voice', agentType: 'Human', agent: 'Mark', status: 'Resolved', action: 'Formal warning issued' },
  { id: 3, type: 'FDCPA', desc: 'Account info disclosed before consumer authentication', channel: 'Voice', agentType: 'Human', agent: 'Raichal', status: 'Resolved', action: 'Compliance refresher, PDR reviewed' },
  { id: 4, type: 'FDCPA', desc: 'Incorrect balance quoted to consumer', channel: 'Voice', agentType: 'Human', agent: 'Raichal', status: 'Resolved', action: 'Data sync issue identified, fix deployed' },
  { id: 5, type: 'TCPA', desc: 'Call placed at 8:47 PM EST to NY consumer (after 8 PM NY rule)', channel: 'Voice', agentType: 'AI Bot', agent: 'Bot', status: 'Resolved', action: 'Timezone mapping corrected for NY accounts' },
];

// ── Bot issues — categorized from real bot issues log ────────────────────────
const botIssues = {
  technical: [
    { date: '04/08', issue: 'Latency disrupting conversation flow', severity: 'high', status: 'open' },
    { date: '04/08', issue: 'ASR/TTS errors — bot fails to understand customer input, leads to repetition', severity: 'high', status: 'open' },
    { date: '03/31', issue: 'RPC bot calls have no call duration and Live Status data', severity: 'medium', status: 'open' },
    { date: '03/31', issue: 'System prompt leaking into transcript — bot reads instructions aloud', severity: 'high', status: 'open' },
    { date: '03/24', issue: 'Bot silence / dead air (~2 minutes)', severity: 'high', status: 'resolved' },
    { date: '03/24', issue: 'Incorrect voicemail / IVR detection — unnecessary wait time', severity: 'medium', status: 'resolved' },
    { date: '03/24', issue: 'Call duration vs audio mismatch (data inconsistency)', severity: 'medium', status: 'resolved' },
    { date: '01/28', issue: 'Bot asking for mailing address — hallucination', severity: 'high', status: 'resolved' },
    { date: '01/23', issue: 'Wrong name recognition — bot changed customer name to "Logan"', severity: 'medium', status: 'resolved' },
  ],
  flow: [
    { date: '04/08', issue: 'Repeated questioning after customer already provided correct contact details', severity: 'high', status: 'open' },
    { date: '03/24', issue: 'Conversation looping in long calls — no proactive exit for unproductive calls', severity: 'high', status: 'open' },
    { date: '03/24', issue: 'DOB asked before name authentication (sequencing error)', severity: 'high', status: 'open' },
    { date: '02/03', issue: 'PTP date logic error — dates >7 days set as PTP instead of scheduled callback', severity: 'medium', status: 'resolved' },
    { date: '01/28', issue: 'Settlement offered too early — should only offer if customer explicitly cannot pay full', severity: 'medium', status: 'resolved' },
    { date: '01/23', issue: 'Balance disclosed to consumer before verification', severity: 'high', status: 'resolved' },
    { date: '01/23', issue: 'Wrong creditor name displayed ("Roger Wireless")', severity: 'medium', status: 'resolved' },
    { date: '01/23', issue: 'Skipping months in pay-later scenarios (date logic)', severity: 'medium', status: 'resolved' },
  ],
  compliance: [
    { date: '03/24', issue: 'Bot capturing payment details despite only portal/IVR allowed', severity: 'critical', status: 'resolved' },
    { date: '03/24', issue: 'Bot mentioning "$" without associated value', severity: 'medium', status: 'resolved' },
    { date: '01/23', issue: 'Mini-Miranda timing — not stated within first 30 seconds on some calls', severity: 'high', status: 'resolved' },
  ],
  collection: [
    { date: '04/08', issue: 'No gentle nudges or persuasive prompts — reduces likelihood of immediate payment', severity: 'high', status: 'open' },
    { date: '04/08', issue: 'Alternative payment options not offered at appropriate time', severity: 'high', status: 'open' },
    { date: '04/08', issue: 'Bot acknowledged non-payment reason but failed to drive toward resolution', severity: 'high', status: 'open' },
    { date: '03/24', issue: 'Missed opportunity to encourage on-call payment via online banking / app', severity: 'medium', status: 'open' },
    { date: '01/28', issue: 'Looping settlement → negotiation → settlement with no resolution', severity: 'high', status: 'resolved' },
    { date: '01/23', issue: '60% settlement calculation showing as $0 — customers confused', severity: 'high', status: 'resolved' },
  ],
};

// ── Improvement cases (Active Improvements tab) ──────────────────────────────
const improvementCases = [
  {
    id: 'objection-handling',
    title: 'Objection Handling — "I already paid this"',
    status: 'Fix deployed', statusColor: 'bg-emerald-600',
    source: '12 scored calls this week. Sushmitha and Raichal consistently failing on this objection — going silent for 4–5 seconds, then repeating the balance amount.',
    diagnosis: 'Agents go blank after the objection instead of acknowledging → verifying → resolving. Drop-off rate at this moment: 34%. Root cause: no scripted rebuttal path, agents falling back to balance recitation.',
    proposedFix: 'New response flow — acknowledge first ("I hear you, let me pull that up"), verify payment record, then resolve based on outcome: confirmed → disposition; not found → explain, offer portal.',
    deployment: [
      { agent: 'Collector', action: 'Voice AI objection handling branch updated on all 3 bot variants. Live since Day 16.' },
      { agent: 'Collector', action: 'Updated script pushed to human agent queue. Calibration session scheduled Friday for Sushmitha, Raichal.' }
    ],
    projectedImpact: '+12% RPC retention on accounts where this objection is raised.',
    earlySignal: 'Voice AI calls hitting this objection now show 18% drop-off vs 34% pre-fix.'
  },
  {
    id: 'medical-empathy',
    title: 'Medical Debt Empathy Gap',
    status: 'In review', statusColor: 'bg-amber-500',
    source: '480 AI bot conversations scored this week. Medical debt cohort showing 40% consumer drop-off at hardship mention. Human agent Anil also flagged for jumping to payment plan without empathy step.',
    diagnosis: 'Current bot flow and agent script jump directly to payment plan after hardship mention. Consumers perceive this as tone-deaf and disengage. Empathy & Emotional Intelligence dimension averaging 3/5 on medical calls.',
    proposedFix: 'Insert empathy acknowledgment step before any solution. New Voice AI conversation branch required. Human agents get coaching brief — "I hear you" before any payment discussion.',
    deployment: [
      { agent: 'Auditor', action: 'Updated empathetic bot script submitted for compliance review. Awaiting approval.' },
      { agent: 'Collector', action: 'Human agent coaching brief drafted. Covered in Monday medical debt sensitivity refresher (all agents).' }
    ],
    projectedImpact: 'Estimated -15% drop-off on hardship mentions. Projected +$8K in medical cohort collections.',
    earlySignal: null
  },
  {
    id: 'settlement-disconnect',
    title: 'Settlement Offer Cross-Channel Disconnect',
    status: 'Diagnosing', statusColor: 'bg-blue-600',
    source: 'Analysis of settlement offer campaign (SMS then Voice follow-up). 620 accounts targeted since Day 17. SMS → email converts 8%, SMS → voice only 2%.',
    diagnosis: 'Voice call script re-explains the offer from scratch instead of referencing the SMS the consumer already received. Bot has no awareness of prior SMS engagement before calling.',
    proposedFix: 'Update voice call script to open with reference to prior SMS. Update bot next-best-action to detect SMS engagement signal before voice follow-up attempt.',
    deployment: [
      { agent: 'Manager', action: 'Script update being drafted. Awaiting finalization.' },
      { agent: null, action: 'Pending: Voice AI bot update + human agent briefing once script approved by Compliance.' }
    ],
    projectedImpact: 'If voice follow-up conversion matches email (8%), estimated additional $18,000 in collections from this cohort.',
    earlySignal: null
  }
];

// ── Helpers ──────────────────────────────────────────────────────────────────
function dimScore(score) {
  if (score >= 5) return { bg: 'bg-emerald-100', text: 'text-emerald-700' };
  if (score >= 4) return { bg: 'bg-blue-50',     text: 'text-blue-700' };
  if (score >= 3) return { bg: 'bg-amber-50',    text: 'text-amber-700' };
  return { bg: 'bg-red-50', text: 'text-red-700' };
}

function avgScore(scores) {
  const vals = Object.values(scores);
  return (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1);
}

function avgToColor(avg) {
  const n = parseFloat(avg);
  if (n >= 4.5) return 'text-emerald-600';
  if (n >= 3.5) return 'text-amber-600';
  return 'text-red-600';
}

function severityBadge(sev) {
  if (sev === 'critical') return 'bg-red-100 text-red-700 border border-red-200';
  if (sev === 'high')     return 'bg-orange-50 text-orange-700 border border-orange-200';
  if (sev === 'medium')   return 'bg-amber-50 text-amber-700 border border-amber-200';
  return 'bg-gray-100 text-gray-500';
}

function statusDot(s) {
  return s === 'open'
    ? <span className="inline-flex items-center gap-1 text-xs font-medium text-orange-600"><span className="w-1.5 h-1.5 rounded-full bg-orange-500 inline-block" />Open</span>
    : <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />Resolved</span>;
}

// ── Main component ───────────────────────────────────────────────────────────
export default function Quality({ initialTab = 'overview', onTabChange }) {
  const [activeTab, setActiveTab]           = useState(initialTab);
  const [selectedAgent, setSelectedAgent]   = useState(null);
  const [botCategory, setBotCategory]       = useState('technical');
  const [botFilter, setBotFilter]           = useState('all'); // 'all' | 'open' | 'resolved'

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (onTabChange) onTabChange(tab);
  };

  const totalIssues   = errorTaxonomy.reduce((s, e) => s + e.count, 0);
  const complianceIssues = errorTaxonomy.filter(e => e.consequence === 'Compliance').reduce((s, e) => s + e.count, 0);
  const conversionIssues = errorTaxonomy.filter(e => ['Lost Payment Conversion','Broken PTP','RPC Conversion'].includes(e.consequence)).reduce((s, e) => s + e.count, 0);

  const openBotIssues = Object.values(botIssues).flat().filter(i => i.status === 'open').length;

  const selectedCard = agentScoreCards.find(a => a.name === selectedAgent);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-xl font-bold text-gray-900">Quality</h1>
        <p className="text-sm text-gray-500 mt-0.5">Agent scorecards, bot health, compliance flags, and active coaching cases</p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 mb-6" style={{ borderBottom: '1px solid #e5e7eb' }}>
        {[
          { id: 'overview',     label: 'Overview' },
          { id: 'agents',       label: 'Agent Scorecards' },
          { id: 'bot',          label: 'Bot Health' },
          { id: 'improvements', label: 'Active Improvements' },
        ].map(tab => (
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

      {/* ── OVERVIEW TAB ──────────────────────────────────────────────────────── */}
      {activeTab === 'overview' && (
        <div className="space-y-6">

          {/* Hero cards */}
          <div className="grid grid-cols-4 gap-4">
            {[
              {
                label: 'Quality Issues This Week',
                value: totalIssues,
                sub: `Across ${agentScoreCards.length} agents, ${agentScoreCards.reduce((s,a)=>s+a.callsScored,0)} calls scored`,
                badge: `${complianceIssues} compliance`,
                badgeStyle: { background: 'rgba(239,68,68,0.08)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)' },
              },
              {
                label: 'Compliance Flags',
                value: complianceFlags.length,
                sub: `${complianceFlags.filter(f=>f.status==='Resolved').length}/${complianceFlags.length} resolved · avg 18 hrs`,
                badge: '99.86% score',
                badgeStyle: { background: 'rgba(33,150,175,0.08)', color: '#2196af', border: '1px solid rgba(33,150,175,0.2)' },
              },
              {
                label: 'Conversion-Impact Issues',
                value: conversionIssues,
                sub: 'Lost Payment, Broken PTP, RPC failures',
                badge: 'Top: no recap',
                badgeStyle: { background: 'rgba(245,158,11,0.08)', color: '#d97706', border: '1px solid rgba(245,158,11,0.2)' },
              },
              {
                label: 'Open Bot Issues',
                value: openBotIssues,
                sub: 'Across Technical, Flow, and Collection gaps',
                badge: '3 critical/high',
                badgeStyle: { background: 'rgba(239,68,68,0.08)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)' },
              },
            ].map((c, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-5">
                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">{c.label}</div>
                <div className="text-3xl font-bold text-gray-900 mb-1" style={{ fontVariantNumeric: 'tabular-nums' }}>{c.value}</div>
                <div className="text-xs text-gray-500 mb-3">{c.sub}</div>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold" style={c.badgeStyle}>{c.badge}</span>
              </div>
            ))}
          </div>

          {/* Error taxonomy — ranked by frequency */}
          <div className="bg-white border border-gray-200 rounded-xl">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-gray-900">Top Quality Issues This Week</h2>
                <p className="text-xs text-gray-500 mt-0.5">Ranked by frequency · mapped to business consequence</p>
              </div>
              <span className="text-xs text-gray-400">{totalIssues} total instances</span>
            </div>
            <div className="divide-y divide-gray-50">
              {[...errorTaxonomy].sort((a,b) => b.count - a.count).map((e, i) => {
                const c = consequenceColor[e.consequence] || consequenceColor['Hang-Up'];
                const pct = Math.round((e.count / errorTaxonomy[0].count) * 100);
                return (
                  <div key={i} className="px-5 py-3 flex items-center gap-4">
                    <span className="text-xs text-gray-400 w-4 text-right flex-shrink-0">{i+1}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-gray-800 mb-1">{e.error}</div>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-1.5 rounded-full bg-gray-100 flex-shrink-0">
                          <div className="h-1.5 rounded-full" style={{ width: `${pct}%`, background: '#2196af', opacity: 0.6 }} />
                        </div>
                        <span className="text-[11px] text-gray-400">{e.agents.slice(0,3).join(', ')}{e.agents.length > 3 ? ` +${e.agents.length-3}` : ''}</span>
                      </div>
                    </div>
                    <span className={`flex-shrink-0 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${c.bg} ${c.text} ${c.border}`}>{e.consequence}</span>
                    <span className="text-sm font-bold text-gray-700 w-6 text-right flex-shrink-0" style={{ fontVariantNumeric: 'tabular-nums' }}>{e.count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Compliance flags summary */}
          <div className="bg-white border border-gray-200 rounded-xl">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-gray-900">Compliance Flags</h2>
              <p className="text-xs text-gray-500 mt-0.5">2,847 conversations audited this week · 5 flags raised · all resolved</p>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  {['#', 'Type', 'Description', 'Agent', 'Channel', 'Status', 'Action'].map(h => (
                    <th key={h} className={`py-2.5 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-left`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {complianceFlags.map(f => (
                  <tr key={f.id}>
                    <td className="py-2.5 px-4 text-gray-400 text-xs">{f.id}</td>
                    <td className="py-2.5 px-4">
                      <span className={`inline-flex px-2 py-0.5 text-[10px] font-semibold rounded border ${f.type === 'FDCPA' ? 'bg-orange-50 text-orange-700 border-orange-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>{f.type}</span>
                    </td>
                    <td className="py-2.5 px-4 text-gray-700 text-xs max-w-xs">{f.desc}</td>
                    <td className="py-2.5 px-4 text-gray-600 text-xs font-medium">{f.agent}</td>
                    <td className="py-2.5 px-4 text-gray-500 text-xs">{f.channel} · {f.agentType}</td>
                    <td className="py-2.5 px-4">
                      <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />{f.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-gray-500 text-xs">{f.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* ── AGENT SCORECARDS TAB ──────────────────────────────────────────────── */}
      {activeTab === 'agents' && (
        <div className="space-y-5">
          <p className="text-xs text-gray-500">Scores per dimension reflect the real 10-parameter audit rubric. 5 = 0 errors, 4 = 1–2 minor errors, 3 = 2–3 errors, below 3 = significant gaps.</p>

          {/* Agent list */}
          <div className="grid grid-cols-3 gap-4">
            {agentScoreCards.map(agent => {
              const avg = avgScore(agent.scores);
              const isSelected = selectedAgent === agent.name;
              return (
                <button
                  key={agent.name}
                  onClick={() => setSelectedAgent(isSelected ? null : agent.name)}
                  className="bg-white border rounded-xl p-4 text-left transition-all hover:border-gray-300"
                  style={isSelected ? { borderColor: '#2196af', boxShadow: '0 0 0 2px rgba(33,150,175,0.12)' } : { borderColor: '#e5e7eb' }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{agent.name}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{agent.process} · {agent.callsScored} calls</div>
                    </div>
                    <div className="text-right">
                      <div className={`text-xl font-bold ${avgToColor(avg)}`}>{avg}<span className="text-xs font-normal text-gray-400"> / 5</span></div>
                      <div className="flex items-center gap-1 justify-end mt-0.5">
                        {agent.trend === 'up'     && <span className="text-emerald-500 text-xs font-bold">↑</span>}
                        {agent.trend === 'down'   && <span className="text-red-500 text-xs font-bold">↓</span>}
                        {agent.trend === 'stable' && <span className="text-gray-400 text-xs">→</span>}
                        {!agent.compliancePass && <span className="ml-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-100 text-red-700">COMP FLAG</span>}
                      </div>
                    </div>
                  </div>

                  {/* Mini dimension heatmap */}
                  <div className="grid grid-cols-5 gap-1 mb-3">
                    {DIMENSIONS.slice(0,10).map(dim => {
                      const sc = agent.scores[dim.key];
                      const { bg, text } = dimScore(sc);
                      return (
                        <div key={dim.key} className={`rounded px-1 py-1 text-center ${bg}`} title={dim.label}>
                          <div className={`text-[11px] font-bold ${text}`}>{sc}</div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="grid grid-cols-5 gap-1 mb-3">
                    {DIMENSIONS.slice(0,10).map(dim => (
                      <div key={dim.key} className="text-[9px] text-gray-400 text-center leading-tight truncate">{dim.label.split(' ')[0]}</div>
                    ))}
                  </div>

                  {agent.coachingNeed && (
                    <div className="rounded-lg p-2 mt-1" style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)' }}>
                      <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wide">Coaching: </span>
                      <span className="text-[10px] text-amber-700">{agent.coachingNeed}</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Expanded agent detail */}
          {selectedCard && (
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-start justify-between mb-5">
                <div>
                  <h2 className="text-base font-semibold text-gray-900">{selectedCard.name} — Detailed Scorecard</h2>
                  <p className="text-xs text-gray-500 mt-0.5">{selectedCard.process} · {selectedCard.callsScored} calls scored this week</p>
                </div>
                <button onClick={() => setSelectedAgent(null)} className="text-gray-400 hover:text-gray-600 text-lg font-light">✕</button>
              </div>

              {/* Full dimension table */}
              <div className="overflow-hidden rounded-xl border border-gray-100 mb-5">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="py-2.5 px-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider">Dimension</th>
                      <th className="py-2.5 px-4 text-right text-[10px] font-bold text-gray-400 uppercase tracking-wider">Score</th>
                      <th className="py-2.5 px-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider">Signal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {DIMENSIONS.map(dim => {
                      const sc = selectedCard.scores[dim.key];
                      const { bg, text } = dimScore(sc);
                      const signals = {
                        5: 'No errors observed',
                        4: '1–2 minor errors',
                        3: '2–3 errors — needs coaching',
                      };
                      return (
                        <tr key={dim.key}>
                          <td className="py-2.5 px-4 text-gray-800 font-medium">{dim.label}</td>
                          <td className="py-2.5 px-4 text-right">
                            <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-sm font-bold ${bg} ${text}`}>{sc}</span>
                          </td>
                          <td className="py-2.5 px-4 text-xs text-gray-500">{signals[sc] || 'Significant gaps — mandatory coaching'}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Auditor note */}
              <div className="rounded-xl p-4" style={{ background: '#f8fafc', border: '1px solid #e5e7eb' }}>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Auditor Observations</p>
                <p className="text-sm text-gray-700 leading-relaxed">{selectedCard.auditorNote}</p>
              </div>

              {!selectedCard.compliancePass && (
                <div className="mt-3 rounded-xl p-4" style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)' }}>
                  <p className="text-[10px] font-bold text-red-700 uppercase tracking-wider mb-1">Compliance Flag</p>
                  <p className="text-sm text-red-700">This agent has a compliance flag this period. See Compliance Flags table on Overview tab for details.</p>
                </div>
              )}
            </div>
          )}

          {/* Dimension legend */}
          <div className="bg-white border border-gray-100 rounded-xl p-4">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Scoring Legend</p>
            <div className="flex gap-4 flex-wrap">
              {[
                { label: '5  Clean call', bg: 'bg-emerald-100', text: 'text-emerald-700' },
                { label: '4  Minor slips', bg: 'bg-blue-50', text: 'text-blue-700' },
                { label: '3  Needs work', bg: 'bg-amber-50', text: 'text-amber-700' },
                { label: '1-2  Flag for coaching', bg: 'bg-red-50', text: 'text-red-700' },
              ].map(l => (
                <div key={l.label} className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${l.bg}`}>
                  <span className={`text-xs font-medium ${l.text}`}>{l.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── BOT HEALTH TAB ────────────────────────────────────────────────────── */}
      {activeTab === 'bot' && (
        <div className="space-y-5">

          {/* Category summary cards */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { key: 'technical',  label: 'Technical',         color: '#ef4444', bg: 'rgba(239,68,68,0.07)' },
              { key: 'flow',       label: 'Flow & Logic',      color: '#f59e0b', bg: 'rgba(245,158,11,0.07)' },
              { key: 'compliance', label: 'Compliance',        color: '#8b5cf6', bg: 'rgba(139,92,246,0.07)' },
              { key: 'collection', label: 'Collection Gaps',   color: '#2196af', bg: 'rgba(33,150,175,0.07)' },
            ].map(cat => {
              const issues = botIssues[cat.key];
              const openCount = issues.filter(i => i.status === 'open').length;
              return (
                <button
                  key={cat.key}
                  onClick={() => setBotCategory(cat.key)}
                  className="bg-white border rounded-xl p-4 text-left transition-all"
                  style={botCategory === cat.key
                    ? { borderColor: cat.color, boxShadow: `0 0 0 2px ${cat.bg}` }
                    : { borderColor: '#e5e7eb' }}
                >
                  <div className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: cat.color }}>{cat.label}</div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{issues.length}</div>
                  <div className="text-xs text-gray-500">{openCount} open · {issues.length - openCount} resolved</div>
                </button>
              );
            })}
          </div>

          {/* Filter */}
          <div className="flex items-center gap-2">
            {['all','open','resolved'].map(f => (
              <button
                key={f}
                onClick={() => setBotFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${botFilter === f ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
              >
                {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* Issue list for selected category */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-gray-900">
                {({ technical: 'Technical Issues', flow: 'Flow & Logic Issues', compliance: 'Compliance Issues', collection: 'Collection Effectiveness Gaps' })[botCategory]}
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">From live bot monitoring and weekly upgrade review logs</p>
            </div>
            <div className="divide-y divide-gray-50">
              {botIssues[botCategory]
                .filter(i => botFilter === 'all' || i.status === botFilter)
                .map((issue, idx) => (
                  <div key={idx} className="px-5 py-3.5 flex items-start gap-4">
                    <span className="text-[11px] text-gray-400 flex-shrink-0 pt-0.5 w-14">{issue.date}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-800">{issue.issue}</p>
                    </div>
                    <span className={`flex-shrink-0 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${severityBadge(issue.severity)}`}>{issue.severity}</span>
                    <div className="flex-shrink-0">{statusDot(issue.status)}</div>
                  </div>
                ))}
            </div>
          </div>

          {/* Bot quality summary */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Voice AI Avg Quality', value: '92 / 100', sub: '480 conversations scored this week', color: 'text-emerald-600' },
              { label: 'Open High/Critical Issues', value: String(Object.values(botIssues).flat().filter(i => i.status === 'open' && ['high','critical'].includes(i.severity)).length), sub: 'Requiring immediate attention', color: 'text-red-600' },
              { label: 'Issues Resolved This Period', value: String(Object.values(botIssues).flat().filter(i => i.status === 'resolved').length), sub: 'From bot upgrade review sessions', color: 'text-gray-900' },
            ].map((m,i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">{m.label}</div>
                <div className={`text-2xl font-bold ${m.color} mb-1`}>{m.value}</div>
                <div className="text-xs text-gray-500">{m.sub}</div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ── ACTIVE IMPROVEMENTS TAB ──────────────────────────────────────────── */}
      {activeTab === 'improvements' && (
        <div className="space-y-6">
          {improvementCases.map((caseItem) => (
            <div key={caseItem.id} className="bg-white border border-gray-200 rounded-xl p-6">
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
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(33,150,175,0.1)' }}>
                        <span className="text-xs font-semibold" style={{ color: '#2196af' }}>{step.num}</span>
                      </div>
                      <div className="w-0.5 flex-1 mt-2" style={{ background: '#e5e7eb' }} />
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="text-xs uppercase tracking-wide text-gray-400 mb-1 font-bold">{step.label}</p>
                      <p className="text-sm text-gray-700 leading-relaxed">{step.text}</p>
                    </div>
                  </div>
                ))}
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(33,150,175,0.1)' }}>
                    <span className="text-xs font-semibold" style={{ color: '#2196af' }}>4</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-wide text-gray-400 mb-3 font-bold">Deployment</p>
                    <div className="space-y-2">
                      {caseItem.deployment.map((deploy, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="text-gray-300 mt-0.5">→</span>
                          {deploy.agent && <span className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: agentColors[deploy.agent] || '#9ca3af' }} />}
                          {deploy.agent && <span className="text-sm font-medium text-gray-800">{deploy.agent}:</span>}
                          <p className="text-sm text-gray-600">{deploy.action}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-5" style={{ borderTop: '1px solid #f3f4f6' }}>
                <div className="rounded-xl p-4" style={{ background: 'rgba(33,150,175,0.05)', border: '1px solid rgba(33,150,175,0.15)' }}>
                  <p className="text-xs uppercase tracking-wide font-bold mb-2" style={{ color: '#2196af' }}>Projected Impact</p>
                  <p className="text-sm text-gray-700 mb-2">{caseItem.projectedImpact}</p>
                  {caseItem.earlySignal && (
                    <div className="mt-3 pt-3" style={{ borderTop: '1px solid rgba(33,150,175,0.15)' }}>
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
