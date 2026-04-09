import React from 'react';
import { agents } from '../data';

const agentColors = {
  Analyst: '#3b82f6', Manager: '#8b5cf6', Compliance: '#ef4444',
  Coach: '#06b6d4', Collector: '#f59e0b', 'Upsell Opportunity': '#10b981', 'Data Enrichment': '#6366f1'
};

const allSuggestions = [
  { q: "What drove the liquidation rate increase this week?", agents: ['Analyst', 'Collector'] },
  { q: "Show me accounts most likely to settle", agents: ['Analyst', 'Manager'] },
  { q: "Where are we losing money?", agents: ['Analyst', 'Upsell Opportunity'] },
  { q: "Summarize compliance issues this month", agents: ['Compliance', 'Coach'] },
  { q: "How are enriched accounts performing?", agents: ['Data Enrichment', 'Analyst'] },
  { q: "Draft this week's client report", agents: ['Analyst', 'Compliance', 'Coach'] },
  { q: "Which cohorts have the highest abandoned rate?", agents: ['Collector', 'Analyst'] },
  { q: "What's the RPC → PTP conversion by channel?", agents: ['Collector', 'Analyst'] },
];

const mockAnswer = {
  question: "What drove the liquidation rate increase this week?",
  agentsUsed: ['Analyst', 'Manager', 'Collector'],
  steps: [
    { agent: 'Analyst', action: 'Pulling Week 3 performance data across all cohorts...' },
    { agent: 'Manager', action: 'Cross-referencing strategy changes from Day 12-18...' },
    { agent: 'Collector', action: 'Checking campaign delivery metrics and conversion rates...' },
  ],
  answer: "Liquidation rate rose from 2.3% to 2.7% this week, driven by three factors:\n\n1. **Settlement SMS campaign** (Day 17) — 620 accounts targeted, 8% conversion so far. This alone added $48K.\n\n2. **Voice AI frequency increase** on High Prop/High Bal (Day 12) — contact rate jumped from 44% to 52%, adding 34 new settlements.\n\n3. **Coach fix on 'I already paid' objection** — drop-off reduced from 34% to 18%, recovering ~$4,200/week in conversations that previously ended.\n\nThe High Prop/High Bal cohort is the biggest driver at +40% week-over-week. Medium Propensity is plateauing — Analyst recommends expanding settlement strategy there."
};

const overnightTimeline = [
  { time: '08:15 AM', agent: 'Compliance', color: '#06b6d4', summary: 'Scanned 412 recordings. 0 critical violations. 2 low-risk deviations flagged.' },
  { time: '07:00 AM', agent: 'Manager', color: '#8b5cf6', summary: 'Optimized outbound frequency for Early-Arrears segment.' },
  { time: '06:30 AM', agent: 'Data Enrichment', color: '#6366f1', summary: 'Skip trace batch complete. 78 new phone numbers appended.' },
  { time: '06:15 AM', agent: 'Analyst', color: '#3b82f6', summary: 'Identified $42K leakage in automated installment flows.' },
];

// FYI items — read to get up to speed
const fyiItems = [
  { text: 'RPC rate crossed 28% this week — up from 25% last week. High Prop/High Bal cohort driving the lift at 38%.', icon: 'trending_up' },
  { text: 'Inbound volume up 12% — 85 IB calls today. IVR completion at 78%, above 75% target.', icon: 'call_received' },
  { text: 'Coach deployed objection handling fix — abandoned rate dropped from 22% to 18% on "I already paid" scenarios.', icon: 'school' },
  { text: '340 accounts re-scored from Low → Medium propensity based on SMS + email engagement signals.', icon: 'swap_vert' },
];

// Actionable items — require decisions (manager persona)
const actionItems = [
  { text: 'Attempt limits at 5/account — compliance allows 7. Analyst recommends requesting client approval to increase to 6 for Medium Propensity cohort. Projected +$35K/week.', action: 'Request Approval', actionStyle: 'gradient', nav: 'approvals' },
  { text: '89 repeat PTP-breakers need escalation strategy. Collector proposes settlement SMS at 15% discount for accounts with 2+ broken promises.', action: 'Review Plan', actionStyle: 'gradient', nav: 'approvals' },
  { text: '14 consumers asked about installments but bot had no path — ~$4,200/week missed. Manager has drafted a new IVR flow.', action: 'Approve Flow', actionStyle: 'outline', nav: 'approvals' },
  { text: 'Spanish-language SMS showing 8% higher response in TX/FL. Manager recommends expanding to all Spanish-preference accounts across cohorts.', action: 'Review', actionStyle: 'outline', nav: 'approvals' },
];

const claudeAnswers = {
  0: "Liquidation rate rose from 2.3% to 2.7% this week, driven by three factors:\n\n**1. Settlement SMS campaign (Day 17)** — 620 accounts targeted, 8% conversion so far. This alone added $48K.\n\n**2. Voice AI frequency increase** on High Prop/High Bal (Day 12) — contact rate jumped from 44% to 52%, adding 34 new settlements.\n\n**3. Coach fix on 'I already paid' objection** — drop-off reduced from 34% to 18%, recovering ~$4,200/week in conversations that previously ended.\n\nThe High Prop/High Bal cohort is the biggest driver at +40% week-over-week. Medium Propensity is plateauing — recommend expanding settlement strategy there.",
  1: "Based on behavioral signals and payment history, here are the top account segments most likely to settle:\n\n**High Prop / High Bal (1,800 accounts)** — 38% RPC rate, 18% PTP rate. These accounts show strong engagement and respond well to settlement offers.\n\n**Recent SMS engagers** — 247 accounts opened the last 3 SMS but didn't convert. High intent signal. A targeted 15% settlement offer could recover $180K.\n\n**Broken-promise accounts with 1 miss** — 89 accounts. First-miss broken promises have a 42% re-engagement rate within 7 days with the right offer.",
  2: "Three primary revenue leakage vectors identified:\n\n**$142K at risk** — 89 payment plans with missed installments entering drop-off territory. Immediate outreach needed.\n\n**$18K hot leakage** — 47 SMS abandons + 23 Voice AI unresolved sessions where consumers showed intent but disengaged.\n\n**$12K recoverable** — 14 installment inquiries with no follow-up path in the bot, plus 8 callbacks that were never scheduled.\n\nTotal identified: **$172K**. Recommend prioritizing the at-risk segment — it's time-sensitive.",
  3: "Compliance summary for this month:\n\n**4 violations flagged**, all resolved within 24 hours:\n- 3× FDCPA (Mini-Miranda not stated within 30 seconds)\n- 1× TCPA (call placed at 8:47 PM EST to NY consumer)\n\n**Compliance score: 99.86%** — above the 99.5% target.\n\nCoach has scheduled a calibration session Friday to address the Mini-Miranda timing pattern. Root cause: agents rushing the opening on high-balance accounts.",
  4: "Enrichment pipeline update:\n\n**1,847 unreachable accounts** entered the skip-trace pipeline. Of these, **1,312 were enriched** with updated contact info. **487 successfully contacted**, yielding **89 conversions worth $127K**.\n\nKey insight: Enriched accounts are converting at 6.8% vs 4.2% for the non-enriched cohort — a **62% lift**. The data quality gap was masking real propensity in the Low Prop / High Bal segment.",
  5: "Client report draft for Apex Recovery Partners — Week 3:\n\n**Portfolio Performance Summary**\n- Liquidation Rate: 2.7% ✅ (target: 2.5%)\n- Total Collected: $287,400\n- Contact Rate: 38% (target: 40%)\n- RPC Rate: 28%\n- Kept-PTP: 68%\n\n**Key Wins This Week**\nSettlement SMS campaign drove $48K in new collections. Spanish-language outreach added 8% response lift in TX/FL. Compliance score maintained at 99.86%.\n\n**Looking Ahead**\nMedium Propensity cohort is the next unlock. Strategy adjustment in progress — expect Week 4 liquidation to cross 3%.",
};

const gptAnswers = {
  0: "The liquidation rate uptick from 2.3% → 2.7% this week is a composite of campaign and operational improvements:\n\n• **Settlement offer introduction** showed early 8% conversion on 620 targeted accounts — above the 5–7% benchmark for first-week settlement campaigns.\n\n• **Increased dialing cadence** on High Prop/High Bal drove contact rate from 44% to 52% — this cohort now accounts for ~60% of week's collections.\n\n• **Bot objection handling fix** (deployed by Coach) reduced conversation abandonment by 16 points on the 'already paid' scenario.\n\nSuggestion: The Medium Propensity cohort at 36% contact rate has room to grow. A morning SMS nudge before voice attempts could improve pickup rates by an estimated 8–12%.",
  1: "Settlement likelihood scoring across active cohorts:\n\n**Tier 1 — High confidence (act now)**\n247 recent SMS engagers who didn't complete — warm leads, time-sensitive. 15% settlement offer recommended.\n\n**Tier 2 — Strong signals**\nHigh Prop / High Bal cohort at 52% contact rate. PTP rate (18%) above all other cohorts. Increase human agent priority on this segment.\n\n**Tier 3 — Monitor**\n340 recently re-scored accounts (Low → Medium propensity) based on engagement signals. Early stage, worth a low-cost digital nudge to qualify intent.",
  2: "Revenue leakage breakdown with recovery priority:\n\n🔴 **Critical ($142K)** — 89 broken payment plans entering final drop-off window. Estimated 60% recoverable with immediate outreach + hardship offer.\n\n🟡 **High ($18K)** — Abandoned intent signals (SMS clicks, partial IVR sessions). These consumers showed willingness — re-engagement within 48 hours recovers ~70% of this group historically.\n\n🔵 **Recoverable ($12K)** — Installment inquiries with no bot path. A single new conversation flow would capture this segment systematically going forward.",
  3: "Compliance health assessment:\n\n**This month's stats:** 4 flags across 2,847 audited conversations = 0.14% flag rate.\n\n**Pattern analysis:** 3 of 4 flags are Mini-Miranda related and involve the same 2 agents (Agents 4 and 6). This is a coaching issue, not a systemic one. Friday's calibration session is the right intervention.\n\n**TCPA flag** (NY timezone) was a system error — timezone mapping has been corrected. No further risk expected.\n\n**Projection:** At current trajectory, month-end compliance score will be 99.88% — well above client SLA of 99.5%.",
  4: "Enrichment performance analysis:\n\n**Funnel efficiency:** 1,847 → 1,312 enriched (71% enrichment rate) is strong. Industry benchmark is 55–65% for secondary/tertiary placements.\n\n**Conversion quality:** 89 conversions from 487 contacts = 18.3% conversion rate on enriched accounts. This is 2.1× the portfolio average.\n\n**Revenue attribution:** $127K from previously unreachable accounts represents 44% of this week's total collections — enrichment is now your top revenue driver per dollar invested.\n\n**Recommendation:** Expand skip-trace budget. Current ROI on enrichment is ~$8.40 per $1 spent.",
  5: "Week 3 Client Report — Apex Recovery Partners\n\n**Executive Summary**\nWeek 3 performance has crossed the 2.5% liquidation target, with current rate at 2.7%. Portfolio momentum is strong heading into Week 4.\n\n**Metrics vs Targets**\n| Metric | W3 Actual | Target | Status |\n|--------|-----------|--------|--------|\n| Liquidation Rate | 2.7% | 2.5% | ✅ Above |\n| Contact Rate | 38% | 40% | ⚠️ Near |\n| RPC Rate | 28% | 30% | ⚠️ Near |\n| Compliance | 99.86% | 99.5% | ✅ Above |\n\n**Recommendation for Client**\nConsider expanding settlement authority to 20% for Medium Propensity cohort. Model shows this could add $35–55K in Week 4 collections.",
};

function pickTwo(arr) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return [shuffled[0], shuffled[1]];
}

export default function CommandCenter({ onAgentClick, onCoachActivityClick, onNavigate }) {
  const [chatQuestion, setChatQuestion] = React.useState(null);
  const [showAnswer, setShowAnswer] = React.useState(false);
  const [animStep, setAnimStep] = React.useState(0);
  const [expandedSection, setExpandedSection] = React.useState(null);
  const [suggestions, setSuggestions] = React.useState(() => pickTwo(allSuggestions));

  // Rotate suggestions every 30s
  React.useEffect(() => {
    const interval = setInterval(() => {
      setSuggestions(pickTwo(allSuggestions));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleQuestionClick = (q) => {
    const idx = allSuggestions.findIndex(s => s.q === q);
    setChatQuestion(idx >= 0 ? idx : 0);
    setShowAnswer(false);
    setAnimStep(0);
    mockAnswer.steps.forEach((_, i) => {
      setTimeout(() => setAnimStep(i + 1), (i + 1) * 700);
    });
    setTimeout(() => setShowAnswer(true), mockAnswer.steps.length * 700 + 500);
  };

  const handleBackFromChat = () => {
    setChatQuestion(null);
    setShowAnswer(false);
    setAnimStep(0);
  };

  // --- CHAT VIEW ---
  if (chatQuestion !== null) {
    const question = allSuggestions[chatQuestion]?.q || allSuggestions[0].q;
    const claudeAnswer = claudeAnswers[chatQuestion] || claudeAnswers[0];
    const gptAnswer = gptAnswers[chatQuestion] || gptAnswers[0];

    return (
      <div className="min-h-screen" style={{background: '#0f1117'}}>
        {/* Chat Header */}
        <div className="sticky top-0 z-10 backdrop-blur-md px-8 py-4 flex items-center gap-4" style={{background: 'rgba(15,17,23,0.85)', borderBottom: '1px solid #1e2535'}}>
          <button
            onClick={handleBackFromChat}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-100 transition-colors"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            Back to Insights
          </button>
          <div className="h-5 w-px bg-slate-700" />
          <p className="text-sm font-medium text-slate-300 truncate flex-1">"{question}"</p>
        </div>

        <div className="p-8 max-w-6xl mx-auto">
          {/* Question bubble */}
          <div className="flex justify-end mb-8">
            <div className="max-w-xl px-5 py-3 rounded-2xl rounded-tr-sm text-white text-sm leading-relaxed shadow-md" style={{background: 'linear-gradient(135deg, #1e3a5f, #1a2f4a)'}}>
              {question}
            </div>
          </div>

          {/* Agent processing steps */}
          <div className="card p-4 mb-6">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Agents working on this...</p>
            <div className="space-y-2">
              {mockAnswer.steps.map((step, idx) => (
                <div key={idx} className={`flex items-center gap-3 transition-all duration-500 ${idx < animStep ? 'opacity-100' : 'opacity-30'}`}>
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{backgroundColor: agentColors[step.agent]}} />
                  <span className="text-xs font-semibold" style={{color: agentColors[step.agent]}}>{step.agent}</span>
                  <span className="text-xs text-slate-400 flex-1">{step.action}</span>
                  {idx < animStep && <span className="material-symbols-outlined text-emerald-400 text-sm">check_circle</span>}
                  {idx >= animStep && <span className="w-3 h-3 rounded-full border-2 border-slate-600 border-t-blue-400 animate-spin" style={{animationDuration: '1s'}} />}
                </div>
              ))}
            </div>
          </div>

          {/* Dual AI responses */}
          {showAnswer && (
            <div className="grid grid-cols-2 gap-6 animate-fadeIn">
              {/* Claude */}
              <div className="card overflow-hidden">
                <div className="px-5 py-4 flex items-center gap-3" style={{background: 'linear-gradient(135deg, #1e1a35, #261d42)', borderBottom: '1px solid #2a2245'}}>
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold" style={{background: 'linear-gradient(135deg, #7c3aed, #a78bfa)'}}>C</div>
                  <div>
                    <p className="text-sm font-bold text-slate-100">Claude</p>
                    <p className="text-[10px] text-slate-400">Anthropic · claude-opus-4-6</p>
                  </div>
                  <span className="ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{background: 'rgba(139,92,246,0.15)', color: '#a78bfa'}}>Skit Context</span>
                </div>
                <div className="p-5">
                  <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-line" dangerouslySetInnerHTML={{__html: claudeAnswer.replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-100">$1</strong>')}} />
                </div>
              </div>

              {/* GPT */}
              <div className="card overflow-hidden">
                <div className="px-5 py-4 flex items-center gap-3" style={{background: 'linear-gradient(135deg, #0f2e1e, #132b1e)', borderBottom: '1px solid #1a3a28'}}>
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold" style={{background: 'linear-gradient(135deg, #059669, #34d399)'}}>G</div>
                  <div>
                    <p className="text-sm font-bold text-slate-100">GPT-4o</p>
                    <p className="text-[10px] text-slate-400">OpenAI · gpt-4o-2024-11</p>
                  </div>
                  <span className="ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{background: 'rgba(16,185,129,0.15)', color: '#34d399'}}>Skit Context</span>
                </div>
                <div className="p-5">
                  <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-line" dangerouslySetInnerHTML={{__html: gptAnswer.replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-100">$1</strong>')}} />
                </div>
              </div>
            </div>
          )}

          {/* Ask a follow-up */}
          {showAnswer && (
            <div className="mt-8 animate-fadeIn">
              <div className="relative card flex items-center gap-3 px-5 py-3">
                <span className="material-symbols-outlined text-slate-600 text-lg">chat</span>
                <input
                  type="text"
                  placeholder="Ask a follow-up question..."
                  className="flex-1 text-sm bg-transparent border-none outline-none text-slate-200 placeholder-slate-600"
                />
                <button className="w-8 h-8 rounded-xl flex items-center justify-center text-white flex-shrink-0" style={{background: 'linear-gradient(135deg, #2196af, #61ab5e)'}}>
                  <span className="material-symbols-outlined text-base">arrow_upward</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // --- MAIN INSIGHTS VIEW ---
  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* AI Search — Hero */}
      <div className="relative text-center mb-6 pt-8 pb-6 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="orb-1 absolute w-72 h-72 rounded-full -top-16 -left-16" style={{background: 'radial-gradient(circle, rgba(59,167,246,0.12) 0%, transparent 70%)', filter: 'blur(20px)'}} />
          <div className="orb-2 absolute w-96 h-96 rounded-full -top-24 right-0" style={{background: 'radial-gradient(circle, rgba(95,207,196,0.10) 0%, transparent 70%)', filter: 'blur(28px)'}} />
          <div className="orb-3 absolute w-64 h-64 rounded-full bottom-0 left-1/3" style={{background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)', filter: 'blur(24px)'}} />
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4" style={{background: 'linear-gradient(135deg, #2196af, #61ab5e)'}}>
            <span className="material-symbols-outlined text-white text-2xl" style={{fontVariationSettings: "'FILL' 1"}}>auto_awesome</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-100 mb-1">How can I help you today?</h1>
          <p className="text-sm text-slate-500">Powered by 7 agents working across your portfolio</p>
        </div>
      </div>

      {/* Search + 2 rotating suggestions */}
      <div className="mb-4">
        <div className="card flex items-center gap-3 px-5 py-3.5">
          <span className="material-symbols-outlined text-slate-600 text-xl">search</span>
          <input
            type="text"
            placeholder="Ask about collection performance, cohort trends, or strategy yields..."
            className="flex-1 text-sm bg-transparent border-none outline-none text-slate-200 placeholder-slate-600"
          />
          <button className="w-9 h-9 rounded-xl flex items-center justify-center text-white flex-shrink-0" style={{background: 'linear-gradient(135deg, #2196af, #61ab5e)'}}>
            <span className="material-symbols-outlined text-lg">arrow_upward</span>
          </button>
        </div>
      </div>
      <div className="flex justify-center gap-2 mb-8">
        {suggestions.map((s) => (
          <button
            key={s.q}
            onClick={() => handleQuestionClick(s.q)}
            className="px-4 py-2 rounded-full text-sm font-medium transition-all max-w-xs truncate text-slate-400 hover:text-slate-200"
            style={{background: '#0d1e2e', border: '1px solid #1c2f45'}}
          >
            {s.q}
          </button>
        ))}
      </div>

      {/* Today's Brief */}
      <div className="card p-5 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-8 rounded-full" style={{background: 'linear-gradient(180deg, #3BA7F6, #5FCFC4)'}} />
          <div>
            <h2 className="text-sm font-semibold text-slate-100">Today's Brief</h2>
            <p className="text-xs text-slate-500">Inbound & collection performance summary — {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</p>
          </div>
        </div>
        <div className="space-y-2 text-sm text-slate-400 leading-relaxed">
          <p>RPC rate at <strong className="text-slate-200">28%</strong> (+3% WoW) — High Prop/High Bal cohort leading at 38%. Inbound volume up 12% with <strong className="text-slate-200">85 IB calls</strong> and 78% IVR completion. Abandoned rate is down to <strong className="text-slate-200">18%</strong> from 22% after Coach's objection fix.</p>
          <p>RPC → PTP conversion holding at <strong className="text-slate-200">12%</strong> with 620 active promises. PTP adherence at 68% (target 70%). Resolution rate at <strong className="text-slate-200">8.4%</strong> (1,008 accounts — includes 265 who paid without giving PTP).</p>
          <p className="text-xs text-slate-600 pt-1">Analyst re-scored 340 accounts from Low → Medium propensity. Enrichment pipeline added 78 new phone numbers overnight.</p>
        </div>
      </div>

      {/* ─── FYI vs ACTIONABLE split ─── */}
      <div className="grid grid-cols-2 gap-6 mb-6">

        {/* FYI — Insights & News */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="material-symbols-outlined text-slate-500 text-base">info</span>
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Insights & News</h2>
          </div>
          <div className="space-y-3">
            {fyiItems.map((item, idx) => (
              <div key={idx} className="card p-4 flex items-start gap-3">
                <span className="material-symbols-outlined text-slate-600 text-lg mt-0.5">{item.icon}</span>
                <p className="text-sm text-slate-400 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Actionable — Recommended Actions */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="material-symbols-outlined text-slate-500 text-base">bolt</span>
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Recommended Actions</h2>
          </div>
          <div className="space-y-3">
            {actionItems.map((item, idx) => (
              <div key={idx} className="card p-4">
                <p className="text-sm text-slate-400 leading-relaxed mb-3">{item.text}</p>
                <button
                  onClick={() => onNavigate(item.nav)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    item.actionStyle === 'gradient'
                      ? 'text-white shadow-sm'
                      : 'text-slate-300 hover:text-white'
                  }`}
                  style={item.actionStyle === 'gradient'
                    ? {background: 'linear-gradient(135deg, #2196af, #61ab5e)'}
                    : {background: '#0d1e2e', border: '1px solid #1c2f45'}}
                >{item.action}</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Overnight Activity — Expandable */}
      <div className="mb-6">
        <button
          onClick={() => setExpandedSection(expandedSection === 'timeline' ? null : 'timeline')}
          className="w-full flex items-center justify-between card p-4 transition-all"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-slate-500 text-lg">schedule</span>
            <div className="text-left">
              <h2 className="text-sm font-semibold text-slate-200">Overnight Activity</h2>
              <p className="text-xs text-slate-500">{overnightTimeline.length} agent actions while you were away</p>
            </div>
          </div>
          <span className={`material-symbols-outlined text-slate-500 transition-transform text-lg ${expandedSection === 'timeline' ? 'rotate-180' : ''}`}>expand_more</span>
        </button>
        {expandedSection === 'timeline' && (
          <div className="rounded-b-2xl p-4 -mt-2 animate-fadeIn" style={{background: '#0d1e2e', border: '1px solid #1c2f45', borderTop: 'none'}}>
            <div className="relative pl-5 space-y-5" style={{borderLeft: '2px solid #1e2535'}}>
              {overnightTimeline.map((entry, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[17px] top-0.5 w-2 h-2 rounded-full" style={{backgroundColor: entry.color}} />
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-semibold text-slate-600">{entry.time}</span>
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded" style={{backgroundColor: `${entry.color}18`, color: entry.color}}>{entry.agent}</span>
                  </div>
                  <p className="text-sm text-slate-400">{entry.summary}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
