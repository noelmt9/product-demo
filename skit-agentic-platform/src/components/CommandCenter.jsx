import React from 'react';


const allSuggestions = [
  { q: "What drove the liquidation rate increase this week?", agents: ['Analyst', 'Collector'] },
  { q: "Show me accounts most likely to settle", agents: ['Analyst', 'Manager'] },
  { q: "Where are we losing money?", agents: ['Analyst', 'Scrubber'] },
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

const answers = {
  0: "Liquidation rate rose from 2.3% to 2.7% this week, driven by three factors:\n\n**1. Settlement SMS campaign (Day 17)**\n620 accounts targeted with a 15% discount offer. 8% conversion so far, adding $48K to Week 3 collections. This is above the 5-7% benchmark for first-week settlement campaigns.\n\n**2. Voice AI frequency increase on High Prop/High Bal (Day 12)**\nContact rate jumped from 44% to 52% after increasing attempts from 3x to 5x/week. This cohort now accounts for ~60% of the week's collections, with 34 new settlements.\n\n**3. Objection handling fix deployed by Coach**\nThe \"I already paid\" drop-off reduced from 34% to 18%, recovering ~$4,200/week in conversations that previously ended.\n\nThe High Prop/High Bal cohort is the biggest driver at +40% week-over-week.\n\n**Next step:** Medium Propensity cohort is plateauing at 36% contact rate. A morning SMS nudge before voice attempts could improve pickup rates by 8-12%.",
  1: "Here are the top account segments most likely to settle, ranked by confidence:\n\n**Tier 1: Act now (247 accounts)**\nRecent SMS engagers who opened the last 3 messages but didn't convert. These are warm leads and time-sensitive. A targeted 15% settlement offer could recover up to $180K.\n\n**Tier 2: Strong signals (1,800 accounts)**\nHigh Prop / High Bal cohort at 52% contact rate and 18% PTP rate. These accounts show strong engagement and respond well to settlement offers. Increase human agent priority here.\n\n**Tier 3: Re-engage (89 accounts)**\nFirst-miss broken promises. These have a 42% re-engagement rate within 7 days with the right offer. Low effort, high conversion potential.\n\n**Tier 4: Monitor (340 accounts)**\nRecently re-scored from Low to Medium propensity based on engagement signals. Early stage, worth a low-cost digital nudge to qualify intent.",
  2: "Three revenue leakage vectors identified, totaling **$172K**:\n\n**$142K at risk (critical)**\n89 payment plans with missed installments entering the drop-off window. Estimated 60% recoverable with immediate outreach + hardship offer. This is time-sensitive.\n\n**$18K in abandoned intent**\n47 SMS abandons + 23 Voice AI unresolved sessions where consumers showed willingness to pay but disengaged. Re-engagement within 48 hours historically recovers ~70% of this group.\n\n**$12K recoverable**\n14 installment inquiries with no bot path, plus 8 callbacks never scheduled. A single new IVR flow would capture this segment systematically going forward.\n\n**Recommendation:** Prioritize the $142K at-risk segment first. Manager has a proposed escalation strategy in Approvals.",
  3: "Compliance summary for this month:\n\n**4 violations flagged**, all resolved within 24 hours:\n- 3x FDCPA: Mini-Miranda not stated within 30 seconds\n- 1x TCPA: Call placed at 8:47 PM EST to NY consumer (after 8 PM rule)\n\n**Compliance score: 99.86%** (target: 99.5%)\n\n**Pattern analysis:** 3 of 4 flags are Mini-Miranda related, involving Agents 4 and 6. This is a coaching issue, not systemic. Friday's calibration session is the right intervention.\n\nThe TCPA flag was a timezone mapping error, now corrected. No further risk expected.\n\n**Projection:** Month-end compliance score on track for 99.88%.",
  4: "Enrichment pipeline performance this week:\n\n**Funnel:** 1,847 unreachable accounts entered skip-trace. 1,312 enriched (71% rate, vs 55-65% industry benchmark). 487 contacted, 89 converted.\n\n**Revenue: $127K** from previously unreachable accounts. That's 44% of this week's total collections.\n\n**Conversion quality:** Enriched accounts are converting at 6.8% vs 4.2% for the non-enriched cohort. That's a 62% lift. The data quality gap was masking real propensity in the Low Prop / High Bal segment.\n\n**ROI:** Current return on enrichment is ~$8.40 per $1 spent. Recommend expanding the skip-trace budget.",
  5: "**Week 3 Client Report: Apex Recovery Partners**\n\n**Performance vs Targets**\n- Liquidation Rate: **2.7%** (target: 2.5%) - Above\n- Total Collected: **$287,400**\n- Contact Rate: **38%** (target: 40%) - Near\n- RPC Rate: **28%** (target: 30%) - Near\n- PTP Adherence: **68%** (target: 70%) - Near\n- Compliance Score: **99.86%** (target: 99.5%) - Above\n\n**Key Wins**\nSettlement SMS campaign drove $48K in new collections. Spanish-language outreach added 8% response lift in TX/FL. Enrichment pipeline contributed $127K from previously unreachable accounts.\n\n**Looking Ahead**\nMedium Propensity cohort is the next unlock. Strategy adjustment in progress. Recommend expanding settlement authority to 20% for this cohort, which could add $35-55K in Week 4.",
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

export default function CommandCenter({ onNavigate }) {
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
    const answer = answers[chatQuestion] || answers[0];

    return (
      <div className="min-h-screen" style={{background: '#e8f4f1'}}>
        {/* Chat Header */}
        <div className="sticky top-0 z-10 backdrop-blur-md px-8 py-3 flex items-center gap-4" style={{background: 'rgba(232,244,241,0.92)', borderBottom: '1px solid #d4eae5'}}>
          <button
            onClick={handleBackFromChat}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            Back to Insights
          </button>
        </div>

        <div className="p-8 max-w-3xl mx-auto">
          {/* User question */}
          <div className="flex items-start gap-3 mb-8">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5" style={{background: 'linear-gradient(135deg, #2196af, #61ab5e)'}}>
              AR
            </div>
            <div className="text-sm font-medium text-gray-900 pt-1.5">{question}</div>
          </div>

          {/* Agent processing steps */}
          {!showAnswer && (
            <div className="flex items-start gap-3 mb-6">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{background: '#e8f4f1'}}>
                <span className="material-symbols-outlined text-base" style={{color: '#2196af'}}>auto_awesome</span>
              </div>
              <div className="flex-1">
                <div className="space-y-2.5 pt-1">
                  {mockAnswer.steps.map((step, idx) => (
                    <div key={idx} className={`flex items-center gap-2.5 transition-all duration-500 ${idx < animStep ? 'opacity-100' : 'opacity-25'}`}>
                      {idx < animStep
                        ? <span className="material-symbols-outlined text-emerald-500 text-sm">check_circle</span>
                        : <span className="w-3.5 h-3.5 rounded-full border-2 border-gray-300 border-t-teal-500 animate-spin" style={{animationDuration: '1s'}} />
                      }
                      <span className="text-xs text-gray-500">{step.agent}: {step.action}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Response */}
          {showAnswer && (
            <div className="flex items-start gap-3 animate-fadeIn">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{background: '#e8f4f1'}}>
                <span className="material-symbols-outlined text-base" style={{color: '#2196af'}}>auto_awesome</span>
              </div>
              <div className="flex-1 min-w-0">
                {/* Sources pill */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] font-semibold text-gray-400">Sources:</span>
                  {mockAnswer.steps.map((step, idx) => (
                    <span key={idx} className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{background: '#e8f4f1', color: '#2196af', border: '1px solid #d4eae5'}}>{step.agent}</span>
                  ))}
                </div>
                {/* Answer body */}
                <div
                  className="text-[14px] text-gray-700 leading-[1.8] whitespace-pre-line"
                  dangerouslySetInnerHTML={{__html: answer.replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900">$1</strong>')}}
                />
                {/* Follow-up input */}
                <div className="mt-8 pt-5" style={{borderTop: '1px solid #d4eae5'}}>
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl" style={{background: '#ffffff', border: '1px solid #d4eae5'}}>
                    <input
                      type="text"
                      placeholder="Ask a follow-up..."
                      className="flex-1 text-sm bg-transparent border-none outline-none text-gray-700 placeholder-gray-400"
                    />
                    <button className="w-8 h-8 rounded-xl flex items-center justify-center text-white flex-shrink-0" style={{background: 'linear-gradient(135deg, #2196af, #61ab5e)'}}>
                      <span className="material-symbols-outlined text-base">arrow_upward</span>
                    </button>
                  </div>
                </div>
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
