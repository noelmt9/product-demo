import React from 'react';
import { agents } from '../data';

const agentColors = {
  Analyst: '#3b82f6', Manager: '#8b5cf6', Compliance: '#ef4444',
  Coach: '#06b6d4', Collector: '#f59e0b', 'Upsell Opportunity': '#10b981', 'Data Enrichment': '#6366f1'
};

const presetQuestions = [
  { q: "What drove the liquidation rate increase this week?", agents: ['Analyst', 'Collector'] },
  { q: "Show me accounts most likely to settle", agents: ['Analyst', 'Manager'] },
  { q: "Where are we losing money?", agents: ['Analyst', 'Upsell Opportunity'] },
  { q: "Summarize compliance issues this month", agents: ['Compliance', 'Coach'] },
  { q: "How are enriched accounts performing?", agents: ['Data Enrichment', 'Analyst'] },
  { q: "Draft this week's client report", agents: ['Analyst', 'Compliance', 'Coach'] },
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

const briefItems = [
  { text: 'High-prop segment burning through runway — manager proposes expanding strategy', action: 'Approve', actionStyle: 'gradient' },
  { text: '620 broken-promise accounts — follow-up SMS staged', action: 'Review', actionStyle: 'outline' },
  { text: '14 consumers asked about installments but bot had no path — ~$4,200 missed', action: 'See accounts', actionStyle: 'outline' },
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

export default function CommandCenter({ onAgentClick, onCoachActivityClick, onNavigate }) {
  const [chatQuestion, setChatQuestion] = React.useState(null);
  const [showAnswer, setShowAnswer] = React.useState(false);
  const [animStep, setAnimStep] = React.useState(0);
  const [expandedSection, setExpandedSection] = React.useState(null);

  const handleQuestionClick = (idx) => {
    setChatQuestion(idx);
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
    const question = presetQuestions[chatQuestion].q;
    const claudeAnswer = claudeAnswers[chatQuestion] || claudeAnswers[0];
    const gptAnswer = gptAnswers[chatQuestion] || gptAnswers[0];

    return (
      <div className="min-h-screen bg-[#f8f9ff]">
        {/* Chat Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-100 shadow-sm px-8 py-4 flex items-center gap-4">
          <button
            onClick={handleBackFromChat}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            Back to Insights
          </button>
          <div className="h-5 w-px bg-gray-200" />
          <p className="text-sm font-medium text-gray-700 truncate flex-1">"{question}"</p>
        </div>

        <div className="p-8 max-w-6xl mx-auto">
          {/* Question bubble */}
          <div className="flex justify-end mb-8">
            <div className="max-w-xl px-5 py-3 rounded-2xl rounded-tr-sm text-white text-sm leading-relaxed shadow-md" style={{background: 'linear-gradient(135deg, #162A44, #1e3a5f)'}}>
              {question}
            </div>
          </div>

          {/* Agent processing steps */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-6">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Agents working on this...</p>
            <div className="space-y-2">
              {mockAnswer.steps.map((step, idx) => (
                <div key={idx} className={`flex items-center gap-3 transition-all duration-500 ${idx < animStep ? 'opacity-100' : 'opacity-30'}`}>
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{backgroundColor: agentColors[step.agent]}} />
                  <span className="text-xs font-semibold" style={{color: agentColors[step.agent]}}>{step.agent}</span>
                  <span className="text-xs text-gray-500 flex-1">{step.action}</span>
                  {idx < animStep && <span className="material-symbols-outlined text-green-500 text-sm">check_circle</span>}
                  {idx >= animStep && <span className="w-3 h-3 rounded-full border-2 border-gray-300 border-t-blue-400 animate-spin" style={{animationDuration: '1s'}} />}
                </div>
              ))}
            </div>
          </div>

          {/* Dual AI responses */}
          {showAnswer && (
            <div className="grid grid-cols-2 gap-6 animate-fadeIn">
              {/* Claude */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-3" style={{background: 'linear-gradient(135deg, #f5f3ff, #ede9fe)'}}>
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold" style={{background: 'linear-gradient(135deg, #7c3aed, #a78bfa)'}}>C</div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Claude</p>
                    <p className="text-[10px] text-gray-500">Anthropic · claude-opus-4-6</p>
                  </div>
                  <span className="ml-auto text-[10px] font-semibold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full">Skit Context</span>
                </div>
                <div className="p-5">
                  <div className="text-sm text-gray-800 leading-relaxed whitespace-pre-line" dangerouslySetInnerHTML={{__html: claudeAnswer.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}} />
                </div>
              </div>

              {/* GPT */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-3" style={{background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)'}}>
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold" style={{background: 'linear-gradient(135deg, #059669, #34d399)'}}>G</div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">GPT-4o</p>
                    <p className="text-[10px] text-gray-500">OpenAI · gpt-4o-2024-11</p>
                  </div>
                  <span className="ml-auto text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Skit Context</span>
                </div>
                <div className="p-5">
                  <div className="text-sm text-gray-800 leading-relaxed whitespace-pre-line" dangerouslySetInnerHTML={{__html: gptAnswer.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}} />
                </div>
              </div>
            </div>
          )}

          {/* Ask a follow-up */}
          {showAnswer && (
            <div className="mt-8 animate-fadeIn">
              <div className="relative bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3 px-5 py-3">
                <span className="material-symbols-outlined text-gray-300 text-lg">chat</span>
                <input
                  type="text"
                  placeholder="Ask a follow-up question..."
                  className="flex-1 text-sm bg-transparent border-none outline-none text-gray-700 placeholder-gray-400"
                />
                <button className="w-8 h-8 rounded-xl flex items-center justify-center text-white flex-shrink-0" style={{background: 'linear-gradient(135deg, #3BA7F6, #5FCFC4)'}}>
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
      {/* AI Search — Hero with animated background */}
      <div className="relative text-center mb-8 pt-8 pb-6 rounded-3xl overflow-hidden">
        {/* Animated orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="orb-1 absolute w-72 h-72 rounded-full -top-16 -left-16" style={{background: 'radial-gradient(circle, rgba(59,167,246,0.18) 0%, transparent 70%)', filter: 'blur(20px)'}} />
          <div className="orb-2 absolute w-96 h-96 rounded-full -top-24 right-0" style={{background: 'radial-gradient(circle, rgba(95,207,196,0.15) 0%, transparent 70%)', filter: 'blur(28px)'}} />
          <div className="orb-3 absolute w-64 h-64 rounded-full bottom-0 left-1/3" style={{background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)', filter: 'blur(24px)'}} />
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4" style={{background: 'linear-gradient(135deg, #3BA7F6, #5FCFC4)'}}>
            <span className="material-symbols-outlined text-white text-2xl" style={{fontVariationSettings: "'FILL' 1"}}>auto_awesome</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">How can I help you today?</h1>
          <p className="text-sm text-gray-500">Powered by 7 agents working across your portfolio</p>
        </div>
      </div>

      {/* Search Input — compact single line */}
      <div className="mb-6">
        <div className="relative bg-white rounded-2xl shadow-lg border border-gray-100 flex items-center gap-3 px-5 py-3.5">
          <span className="material-symbols-outlined text-gray-300 text-xl">search</span>
          <input
            type="text"
            placeholder="Ask about collection performance, cohort trends, or strategy yields..."
            className="flex-1 text-sm bg-transparent border-none outline-none text-gray-900 placeholder-gray-400"
          />
          <button className="w-9 h-9 rounded-xl flex items-center justify-center text-white flex-shrink-0" style={{background: 'linear-gradient(135deg, #3BA7F6, #5FCFC4)'}}>
            <span className="material-symbols-outlined text-lg">arrow_upward</span>
          </button>
        </div>
        <p className="text-center text-[11px] text-gray-400 mt-2">Skit AI is powered by agentic intelligence and may refine strategies based on historical data.</p>
      </div>

      {/* Preset Questions */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {presetQuestions.map((pq, idx) => (
          <button
            key={idx}
            onClick={() => handleQuestionClick(idx)}
            className="px-4 py-2 rounded-full text-sm font-medium transition-all border bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:shadow-sm hover:text-blue-700"
          >
            {pq.q}
          </button>
        ))}
      </div>

      {/* KPI Cards — Compact */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Collected', value: '$4.28M', change: '+8%', icon: 'payments' },
          { label: 'Liquidation Rate', value: '24.8%', change: '+3%', icon: 'trending_up' },
          { label: 'Contact Rate', value: '42.1%', change: '+1.8%', icon: 'call' },
          { label: 'RPC Rate', value: '18.2%', change: '+0.5%', icon: 'record_voice_over' },
        ].map((card, i) => (
          <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer" onClick={() => onNavigate('performance')}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{card.label}</p>
              <span className="material-symbols-outlined text-gray-300 text-lg">{card.icon}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-gray-900">{card.value}</span>
              <span className="text-xs font-semibold text-emerald-600">{card.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Today's Brief — Expandable */}
      <div className="mb-8">
        <button
          onClick={() => setExpandedSection(expandedSection === 'brief' ? null : 'brief')}
          className="w-full flex items-center justify-between bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-10 rounded-full" style={{background: 'linear-gradient(180deg, #3BA7F6, #5FCFC4)'}} />
            <div className="text-left">
              <h2 className="text-base font-bold text-gray-900">Today's Brief</h2>
              <p className="text-sm text-gray-500">Portfolio at 2.7% liquidation. 3 items need attention.</p>
            </div>
          </div>
          <span className={`material-symbols-outlined text-gray-400 transition-transform ${expandedSection === 'brief' ? 'rotate-180' : ''}`}>expand_more</span>
        </button>
        {expandedSection === 'brief' && (
          <div className="bg-white rounded-b-xl border border-t-0 border-gray-100 shadow-sm p-5 space-y-3 -mt-1">
            {briefItems.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full text-white text-xs flex items-center justify-center font-bold" style={{background: '#162A44'}}>{idx + 1}</span>
                  <p className="text-sm text-gray-800">{item.text}</p>
                </div>
                <button
                  onClick={() => onNavigate('approvals')}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold flex-shrink-0 ml-4 transition-all ${
                    item.actionStyle === 'gradient'
                      ? 'text-white shadow-sm'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  style={item.actionStyle === 'gradient' ? {background: 'linear-gradient(135deg, #3BA7F6, #5FCFC4)'} : {}}
                >{item.action}</button>
              </div>
            ))}
            <div className="pt-3 border-t border-gray-100 space-y-2">
              <div className="flex items-center gap-2 text-xs">
                <span className="material-symbols-outlined text-sm" style={{color: '#6366f1'}}>zoom_in</span>
                <span className="text-gray-600">Enrichment: 340 accounts recovered, 6 converted ($18,400)</span>
                <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-[10px] font-bold">+$18.4K</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm" style={{color: '#10b981'}}>rocket_launch</span>
                  <span className="text-gray-600">Auto-finance &lt;$3K at 4.1%, 1.6x above benchmark</span>
                </div>
                <button className="text-xs font-bold hover:underline" style={{color: '#3BA7F6'}}>Draft upsell case</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Leakage Analysis — Expandable */}
      <div className="mb-8">
        <button
          onClick={() => setExpandedSection(expandedSection === 'leakage' ? null : 'leakage')}
          className="w-full flex items-center justify-between bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-red-400">leak_remove</span>
            <div className="text-left">
              <h2 className="text-base font-bold text-gray-900">Leakage Analysis</h2>
              <p className="text-sm text-gray-500">$172K identified across 3 categories</p>
            </div>
          </div>
          <span className={`material-symbols-outlined text-gray-400 transition-transform ${expandedSection === 'leakage' ? 'rotate-180' : ''}`}>expand_more</span>
        </button>
        {expandedSection === 'leakage' && (
          <div className="bg-white rounded-b-xl border border-t-0 border-gray-100 shadow-sm p-5 -mt-1">
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold text-amber-700 uppercase tracking-widest">Hot</h4>
                  <span className="material-symbols-outlined text-amber-500 text-lg">local_fire_department</span>
                </div>
                <div className="text-xs text-gray-600 space-y-1 mb-3">
                  <div className="flex justify-between"><span>SMS abandons</span><span className="font-bold text-gray-900">47</span></div>
                  <div className="flex justify-between"><span>Voice AI unresolved</span><span className="font-bold text-gray-900">23</span></div>
                </div>
                <div className="text-lg font-extrabold text-amber-600">$18K</div>
              </div>
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold text-blue-600 uppercase tracking-widest">Recoverable</h4>
                  <span className="material-symbols-outlined text-blue-500 text-lg">refresh</span>
                </div>
                <div className="text-xs text-gray-600 space-y-1 mb-3">
                  <div className="flex justify-between"><span>Installment asks</span><span className="font-bold text-gray-900">14</span></div>
                  <div className="flex justify-between"><span>Callbacks needed</span><span className="font-bold text-gray-900">8</span></div>
                </div>
                <div className="text-lg font-extrabold text-blue-600">$12K</div>
              </div>
              <div className="p-4 rounded-xl bg-red-50 border border-red-100">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold text-red-600 uppercase tracking-widest">At Risk</h4>
                  <span className="material-symbols-outlined text-red-500 text-lg">warning</span>
                </div>
                <div className="text-xs text-gray-600 space-y-1 mb-3">
                  <div className="flex justify-between"><span>Missed plans</span><span className="font-bold text-gray-900">89</span></div>
                  <div className="flex justify-between"><span>Impending drop-off</span><span className="font-bold text-red-500 italic">urgent</span></div>
                </div>
                <div className="text-lg font-extrabold text-red-600">$142K</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Agent Highlights */}
      <div className="mb-8">
        <h2 className="text-base font-bold text-gray-900 mb-4">Agent Highlights</h2>
        <div className="grid grid-cols-2 gap-4">
          {agents.slice(0, 4).map((agent) => (
            <button
              key={agent.name}
              onClick={() => onAgentClick(agent.name)}
              className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all text-left group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{backgroundColor: `${agentColors[agent.name]}15`}}>
                  <span className="w-3 h-3 rounded-full" style={{backgroundColor: agentColors[agent.name]}} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{agent.name}</h3>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">{agent.role}</p>
                </div>
              </div>
              <p className="text-xs text-gray-600 mb-2">{agent.lastAction}</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase">{agent.keyMetric}</p>
            </button>
          ))}
        </div>
        {/* New agents row */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          {agents.filter(a => a.name === 'Upsell Opportunity' || a.name === 'Data Enrichment').map((agent) => (
            <button
              key={agent.name}
              onClick={() => onAgentClick(agent.name)}
              className="rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all text-left text-white"
              style={{background: 'linear-gradient(135deg, #162A44, #1e3a5f)'}}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{backgroundColor: `${agentColors[agent.name]}30`}}>
                  <span className="w-3 h-3 rounded-full" style={{backgroundColor: agentColors[agent.name]}} />
                </div>
                <div>
                  <h3 className="text-sm font-bold">{agent.name}</h3>
                  <p className="text-[10px] uppercase tracking-wider" style={{color: '#5FCFC4'}}>{agent.role}</p>
                </div>
              </div>
              <p className="text-xs text-slate-300">{agent.lastAction}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Agent Activity Timeline — Expandable */}
      <div className="mb-8">
        <button
          onClick={() => setExpandedSection(expandedSection === 'timeline' ? null : 'timeline')}
          className="w-full flex items-center justify-between bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-gray-400">schedule</span>
            <div className="text-left">
              <h2 className="text-base font-bold text-gray-900">Overnight Activity</h2>
              <p className="text-sm text-gray-500">{overnightTimeline.length} agent actions while you were away</p>
            </div>
          </div>
          <span className={`material-symbols-outlined text-gray-400 transition-transform ${expandedSection === 'timeline' ? 'rotate-180' : ''}`}>expand_more</span>
        </button>
        {expandedSection === 'timeline' && (
          <div className="bg-white rounded-b-xl border border-t-0 border-gray-100 shadow-sm p-5 -mt-1">
            <div className="relative pl-6 border-l-2 border-gray-200 space-y-6">
              {overnightTimeline.map((entry, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[21px] top-0 w-2.5 h-2.5 rounded-full border-2 border-white" style={{backgroundColor: entry.color}} />
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-gray-400">{entry.time}</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded" style={{backgroundColor: `${entry.color}10`, color: entry.color}}>{entry.agent}</span>
                  </div>
                  <p className="text-sm text-gray-700">{entry.summary}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
