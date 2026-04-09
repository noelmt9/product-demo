import React from 'react';
import { agents } from '../data';

const agentColors = {
  Analyst: '#3b82f6', Manager: '#8b5cf6', Auditor: '#ef4444',
  Coach: '#06b6d4', Collector: '#f59e0b', 'Upsell Opportunity': '#10b981', Tracer: '#6366f1'
};

const allSuggestions = [
  { q: "What drove the liquidation rate increase this week?", agents: ['Analyst', 'Collector'] },
  { q: "Show me accounts most likely to settle", agents: ['Analyst', 'Manager'] },
  { q: "Where are we losing money?", agents: ['Analyst', 'Upsell Opportunity'] },
  { q: "Summarize compliance issues this month", agents: ['Auditor', 'Coach'] },
  { q: "How are enriched accounts performing?", agents: ['Tracer', 'Analyst'] },
  { q: "Draft this week's client report", agents: ['Analyst', 'Auditor', 'Coach'] },
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


// News items — two sets that rotate
const newsSetA = [
  { headline: 'RPC rate crossed 28%', body: 'Up from 25% last week. High Prop/High Bal cohort is leading the lift at 38%, driven by the increased voice AI cadence.', time: '2h ago', agent: 'Analyst', agentColor: '#3b82f6', icon: 'trending_up' },
  { headline: 'Inbound volume up 12%', body: '85 inbound calls today with 78% IVR completion, above the 75% target. Payment bot handled 68 calls autonomously.', time: '3h ago', agent: 'Collector', agentColor: '#f59e0b', icon: 'call_received' },
  { headline: 'Objection handling fix deployed', body: 'Coach updated the "I already paid" script. Abandoned rate dropped from 22% to 18% on that scenario, recovering ~$4.2K/week.', time: '5h ago', agent: 'Coach', agentColor: '#06b6d4', icon: 'school' },
  { headline: '340 accounts re-scored', body: 'Moved from Low to Medium propensity based on recent SMS clicks and email opens. These accounts now qualify for the multi-channel blitz.', time: '6h ago', agent: 'Analyst', agentColor: '#3b82f6', icon: 'swap_vert' },
];

const newsSetB = [
  { headline: 'Settlement SMS showing early results', body: '620 accounts targeted with 15% discount offer. 8% conversion in the first 48 hours, adding $48K to Week 3 collections.', time: '1h ago', agent: 'Manager', agentColor: '#8b5cf6', icon: 'campaign' },
  { headline: 'Skip trace batch complete', body: '78 new phone numbers appended overnight. Enrichment rate now at 71%, well above the 60% industry benchmark for secondary placements.', time: '4h ago', agent: 'Tracer', agentColor: '#6366f1', icon: 'database' },
  { headline: 'Compliance score holding at 99.86%', body: '412 conversations audited today. 1 low-risk timezone flag on a NY account, already resolved. No critical violations.', time: '4h ago', agent: 'Auditor', agentColor: '#ef4444', icon: 'verified_user' },
  { headline: 'Spanish SMS outperforming English', body: '8% higher response rate in TX/FL for Spanish-preference accounts. 180 accounts contacted in first batch with strong early engagement.', time: '8h ago', agent: 'Collector', agentColor: '#f59e0b', icon: 'translate' },
];

// Actionable items — require decisions (manager persona)
const actionItems = [
  { title: 'Increase attempt limits', text: 'Compliance allows 7, currently at 5. Projected +$35K/week for Medium Propensity.', icon: 'speed' },
  { title: '89 PTP-breakers need escalation', text: 'Collector proposes 15% settlement SMS for repeat broken promises.', icon: 'warning' },
  { title: 'New IVR flow for installments', text: '14 consumers asked about installments with no bot path. $4.2K/week missed.', icon: 'call_split' },
  { title: 'Expand Spanish SMS to all cohorts', text: '8% higher response in TX/FL. Manager recommends expanding to all Spanish-preference accounts.', icon: 'translate' },
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

function getGreeting() {
  const hour = new Date().getHours();
  const greetings = hour < 12
    ? ['Good morning, Alex', 'Morning, Alex. Here\'s your brief', 'Rise and grind, Alex']
    : hour < 17
    ? ['Good afternoon, Alex', 'Afternoon, Alex. What can I dig into?', 'Hey Alex, how can I help?']
    : ['Good evening, Alex', 'Evening, Alex. Wrapping up?', 'Hey Alex, still at it?'];
  return greetings[Math.floor(Math.random() * greetings.length)];
}

function getSubtext() {
  const lines = [
    'Your agents have been busy. Here\'s what needs your eyes.',
    '4 actions pending your review. Agents handled the rest.',
    'Portfolio is trending up. A few things need your call.',
    'Agents worked overnight. Here\'s the summary.',
    'Collections are on track. See what changed since yesterday.',
  ];
  return lines[Math.floor(Math.random() * lines.length)];
}

export default function CommandCenter({ onAgentClick, onCoachActivityClick, onNavigate }) {
  const [chatQuestion, setChatQuestion] = React.useState(null);
  const [showAnswer, setShowAnswer] = React.useState(false);
  const [animStep, setAnimStep] = React.useState(0);
  const [suggestions, setSuggestions] = React.useState(() => pickTwo(allSuggestions));
  const [greeting] = React.useState(getGreeting);
  const [subtext] = React.useState(getSubtext);
  const [newsSet, setNewsSet] = React.useState(true); // true = A, false = B

  // Rotate news every 20s
  React.useEffect(() => {
    const interval = setInterval(() => setNewsSet(prev => !prev), 20000);
    return () => clearInterval(interval);
  }, []);

  // Rotate suggestions every 15s
  React.useEffect(() => {
    const interval = setInterval(() => {
      setSuggestions(pickTwo(allSuggestions));
    }, 7000);
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
      <div className="min-h-screen" style={{background: '#e8f4f1'}}>
        {/* Chat Header */}
        <div className="sticky top-0 z-10 backdrop-blur-md px-8 py-4 flex items-center gap-4" style={{background: 'rgba(232,244,241,0.92)', borderBottom: '1px solid #d4eae5'}}>
          <button
            onClick={handleBackFromChat}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            Back to Insights
          </button>
          <div className="h-5 w-px bg-gray-300" />
          <p className="text-sm font-medium text-gray-700 truncate flex-1">"{question}"</p>
        </div>

        <div className="p-8 max-w-6xl mx-auto">
          {/* Question bubble */}
          <div className="flex justify-end mb-8">
            <div className="max-w-xl px-5 py-3 rounded-2xl rounded-tr-sm text-white text-sm leading-relaxed shadow-md" style={{background: 'linear-gradient(135deg, #2196af, #61ab5e)'}}>
              {question}
            </div>
          </div>

          {/* Agent processing steps */}
          <div className="card p-4 mb-6">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Agents working on this...</p>
            <div className="space-y-2">
              {mockAnswer.steps.map((step, idx) => (
                <div key={idx} className={`flex items-center gap-3 transition-all duration-500 ${idx < animStep ? 'opacity-100' : 'opacity-30'}`}>
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{backgroundColor: agentColors[step.agent]}} />
                  <span className="text-xs font-semibold" style={{color: agentColors[step.agent]}}>{step.agent}</span>
                  <span className="text-xs text-gray-500 flex-1">{step.action}</span>
                  {idx < animStep && <span className="material-symbols-outlined text-emerald-500 text-sm">check_circle</span>}
                  {idx >= animStep && <span className="w-3 h-3 rounded-full border-2 border-gray-300 border-t-teal-500 animate-spin" style={{animationDuration: '1s'}} />}
                </div>
              ))}
            </div>
          </div>

          {/* Dual AI responses */}
          {showAnswer && (
            <div className="grid grid-cols-2 gap-6 animate-fadeIn">
              {/* Claude */}
              <div className="card overflow-hidden">
                <div className="px-5 py-4 flex items-center gap-3" style={{background: 'linear-gradient(135deg, #f5f3ff, #ede9fe)', borderBottom: '1px solid #ddd6fe'}}>
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold" style={{background: 'linear-gradient(135deg, #7c3aed, #a78bfa)'}}>C</div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Claude</p>
                    <p className="text-[10px] text-gray-500">Anthropic · claude-opus-4-6</p>
                  </div>
                  <span className="ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{background: 'rgba(139,92,246,0.12)', color: '#7c3aed'}}>Skit Context</span>
                </div>
                <div className="p-5">
                  <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line" dangerouslySetInnerHTML={{__html: claudeAnswer.replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900">$1</strong>')}} />
                </div>
              </div>

              {/* GPT */}
              <div className="card overflow-hidden">
                <div className="px-5 py-4 flex items-center gap-3" style={{background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', borderBottom: '1px solid #bbf7d0'}}>
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold" style={{background: 'linear-gradient(135deg, #059669, #34d399)'}}>G</div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">GPT-4o</p>
                    <p className="text-[10px] text-gray-500">OpenAI · gpt-4o-2024-11</p>
                  </div>
                  <span className="ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{background: 'rgba(5,150,105,0.10)', color: '#059669'}}>Skit Context</span>
                </div>
                <div className="p-5">
                  <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line" dangerouslySetInnerHTML={{__html: gptAnswer.replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900">$1</strong>')}} />
                </div>
              </div>
            </div>
          )}

          {/* Ask a follow-up */}
          {showAnswer && (
            <div className="mt-8 animate-fadeIn">
              <div className="relative card flex items-center gap-3 px-5 py-3">
                <span className="material-symbols-outlined text-gray-400 text-lg">chat</span>
                <input
                  type="text"
                  placeholder="Ask a follow-up question..."
                  className="flex-1 text-sm bg-transparent border-none outline-none text-gray-700 placeholder-gray-400"
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
          <div className="orb-1 absolute w-72 h-72 rounded-full -top-16 -left-16" style={{background: 'radial-gradient(circle, rgba(33,150,175,0.20) 0%, transparent 70%)', filter: 'blur(20px)'}} />
          <div className="orb-2 absolute w-96 h-96 rounded-full -top-24 right-0" style={{background: 'radial-gradient(circle, rgba(97,171,94,0.15) 0%, transparent 70%)', filter: 'blur(28px)'}} />
          <div className="orb-3 absolute w-64 h-64 rounded-full bottom-0 left-1/3" style={{background: 'radial-gradient(circle, rgba(33,150,175,0.12) 0%, transparent 70%)', filter: 'blur(24px)'}} />
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4" style={{background: 'linear-gradient(135deg, #2196af, #61ab5e)'}}>
            <span className="material-symbols-outlined text-white text-2xl" style={{fontVariationSettings: "'FILL' 1"}}>auto_awesome</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">{greeting}</h1>
          <p className="text-sm text-gray-500">{subtext}</p>
        </div>
      </div>

      {/* Search box — textarea style with file upload */}
      <div className="mb-4">
        <div className="card px-5 py-4">
          <textarea
            rows={3}
            placeholder="Ask about collection performance, cohort trends, or strategy yields..."
            className="w-full text-sm bg-transparent border-none outline-none text-gray-800 placeholder-gray-400 resize-none leading-relaxed"
          />
          <div className="flex items-center justify-between pt-3 mt-1" style={{borderTop: '1px solid #ecf6f3'}}>
            <label className="flex items-center gap-1.5 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors">
              <span className="material-symbols-outlined text-lg">attach_file</span>
              <span className="text-[11px] font-medium">Upload file</span>
              <input type="file" className="hidden" />
            </label>
            <button className="w-8 h-8 rounded-xl flex items-center justify-center text-white flex-shrink-0" style={{background: 'linear-gradient(135deg, #2196af, #61ab5e)'}}>
              <span className="material-symbols-outlined text-base">arrow_upward</span>
            </button>
          </div>
        </div>
      </div>

      {/* Suggestion chips — below search */}
      <div className="flex justify-center gap-3 mb-8">
        {suggestions.map((s) => (
          <button
            key={s.q}
            onClick={() => handleQuestionClick(s.q)}
            className="group flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs transition-all animate-fadeIn"
            style={{background: '#ffffff', border: '1px solid #d4eae5'}}
          >
            <span className="material-symbols-outlined text-sm text-gray-300 group-hover:text-teal-500 transition-colors" style={{fontVariationSettings: "'FILL' 1"}}>auto_awesome</span>
            <span className="text-gray-500 group-hover:text-gray-800 transition-colors max-w-[200px] truncate leading-tight text-left">{s.q}</span>
          </button>
        ))}
      </div>

      {/* ─── Unified feed: FYI + Actions ─── */}
      <div className="grid grid-cols-5 gap-6 mb-6">

        {/* FYI — takes 3 cols */}
        <div className="col-span-3 flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <span className="material-symbols-outlined text-base" style={{color: '#2196af'}}>newspaper</span>
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">What's happening</h2>
          </div>
          <div className="card flex-1 flex flex-col" style={{borderColor: '#d4eae5'}}>
            {(newsSet ? newsSetA : newsSetB).map((item, idx) => (
              <div key={item.headline} className="px-4 py-3.5 flex items-start gap-3 flex-1 animate-fadeIn" style={{borderTop: idx > 0 ? '1px solid #ecf6f3' : 'none'}}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{background: '#e8f4f1'}}>
                  <span className="material-symbols-outlined text-base" style={{color: '#2196af'}}>{item.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-[13px] font-semibold text-gray-800">{item.headline}</p>
                    <span className="text-[10px] text-gray-400 flex-shrink-0">{item.time}</span>
                  </div>
                  <p className="text-[12px] text-gray-500 leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions — takes 2 cols, stretches to match */}
        <div className="col-span-2 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-base" style={{color: '#61ab5e'}}>bolt</span>
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Needs attention</h2>
            </div>
            <button
              onClick={() => onNavigate('approvals')}
              className="flex items-center gap-1 text-[11px] font-semibold transition-colors"
              style={{color: '#2196af'}}
            >
              View all
              <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </button>
          </div>
          <div className="card flex-1 flex flex-col" style={{borderColor: '#d4eae5'}}>
            {actionItems.map((item, idx) => (
              <div key={idx} className="px-4 py-3.5 flex items-start gap-3 flex-1" style={{borderTop: idx > 0 ? '1px solid #ecf6f3' : 'none'}}>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{background: '#fef3c7'}}>
                  <span className="material-symbols-outlined text-sm" style={{color: '#d97706'}}>{item.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-gray-800 mb-0.5">{item.title}</p>
                  <p className="text-[12px] text-gray-500 leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
