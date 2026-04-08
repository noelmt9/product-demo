import { useState } from 'react';
import { Section } from './shared';

const conversations = [
  {
    accountId: '#APX-4821',
    journey: ['SMS', 'SMS', 'Payment Bot'],
    outcome: 'Settled',
    amount: '$3,400',
    qualityScore: null,
    compliance: 'clean',
    timestamp: '1 day ago',
    note: 'Received settlement SMS Day 17. Clicked link. Called payment bot next day. Settled at 15% discount.'
  },
  {
    accountId: '#APX-3107',
    journey: ['Voice AI', 'SMS', 'Voice AI', 'Human Agent'],
    outcome: 'Settled',
    amount: '$5,100',
    qualityScore: 91,
    compliance: 'clean',
    timestamp: '2 days ago',
    note: 'Initial voice AI no answer. Settlement SMS sent. Second voice AI connected, consumer asked questions. Transferred to human agent. Settled at 15%.'
  },
  {
    accountId: '#APX-2894',
    journey: ['SMS', 'Voice AI'],
    outcome: 'PTP',
    amount: null,
    qualityScore: 88,
    compliance: 'clean',
    timestamp: '2 days ago',
    note: 'SMS opened. Voice AI follow-up connected. Consumer promised to pay Friday. PTP tracked.'
  },
  {
    accountId: '#APX-5523',
    journey: ['Voice AI'],
    outcome: 'Settled',
    amount: '$4,200',
    qualityScore: 93,
    compliance: 'clean',
    timestamp: '3 days ago',
    note: 'Voice AI connected first attempt. Consumer agreed to settlement on call. Processed via payment bot.'
  },
  {
    accountId: '#APX-1876',
    journey: ['SMS', 'SMS'],
    outcome: 'No Answer',
    amount: null,
    qualityScore: null,
    compliance: 'clean',
    timestamp: '3 days ago',
    note: 'Two SMS sent. No opens. No engagement.'
  },
  {
    accountId: '#APX-4410',
    journey: ['Voice AI', 'Human Agent'],
    outcome: 'Dispute',
    amount: null,
    qualityScore: 85,
    compliance: 'clean',
    timestamp: '4 days ago',
    note: 'Voice AI connected. Consumer disputed debt. Transferred to human agent. Dispute logged, account flagged.'
  },
  {
    accountId: '#APX-3298',
    journey: ['Email', 'SMS', 'Payment Bot'],
    outcome: 'Settled',
    amount: '$2,800',
    qualityScore: null,
    compliance: 'clean',
    timestamp: '4 days ago',
    note: 'Email opened. Settlement SMS follow-up clicked. Consumer completed payment via bot.'
  },
  {
    accountId: '#APX-6012',
    journey: ['Voice AI', 'Voice AI', 'SMS'],
    outcome: 'PTP',
    amount: null,
    qualityScore: 90,
    compliance: 'clean',
    timestamp: '5 days ago',
    note: 'Two voice AI attempts, first no answer, second connected. SMS reinforcement sent. Consumer promised payment next week.'
  },
  {
    accountId: '#APX-7234',
    journey: ['SMS', 'Voice AI', 'Human Agent'],
    outcome: 'Settled',
    amount: '$3,900',
    qualityScore: 89,
    compliance: 'clean',
    timestamp: '5 days ago',
    note: 'Settlement SMS clicked. Voice AI follow-up connected. Escalated to agent for payment plan setup. Settled.'
  },
  {
    accountId: '#APX-5641',
    journey: ['Voice AI', 'SMS'],
    outcome: 'Callback',
    amount: null,
    qualityScore: 87,
    compliance: 'clean',
    timestamp: '6 days ago',
    note: 'Voice AI left message. SMS follow-up sent. Consumer requested callback. Scheduled for Monday.'
  }
];

const channelContributions = [
  { pattern: 'SMS → Voice follow-up', conversions: 22, percentage: 46 },
  { pattern: 'Voice AI direct', conversions: 12, percentage: 25 },
  { pattern: 'SMS → Payment Bot', conversions: 8, percentage: 17 },
  { pattern: 'Email → SMS → Payment Bot', conversions: 6, percentage: 12 }
];

// Journey icon component
const JourneyIcon = ({ channel }) => {
  const colors = {
    'SMS': 'bg-green-100 text-green-700',
    'Voice AI': 'bg-blue-100 text-blue-700',
    'Human Agent': 'bg-purple-100 text-purple-700',
    'Email': 'bg-amber-100 text-amber-700',
    'Payment Bot': 'bg-indigo-100 text-indigo-700'
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded ${colors[channel] || 'bg-gray-100 text-gray-700'}`}>
      {channel}
    </span>
  );
};

// Conversation Detail Panel Component
const ConversationDetailPanel = ({ conversation, onClose }) => {
  if (!conversation) return null;

  // Mock detailed timeline data
  const timeline = [
    { time: '2024-02-24 10:15 AM', channel: 'SMS', content: 'Settlement offer available: Pay $2,550 (15% discount) to resolve $3,000 debt. Click here to review terms: [link]', status: 'Opened' },
    { time: '2024-02-24 2:30 PM', channel: 'SMS', content: '[Consumer clicked link, viewed settlement terms]', status: 'Clicked' },
    { time: '2024-02-25 9:45 AM', channel: 'Payment Bot', type: 'inbound', content: 'Consumer called payment hotline. Navigated payment bot menu. Selected "Accept settlement offer". Entered payment details. Transaction processed successfully.', status: 'Completed', amount: '$2,550' }
  ];

  const qualityBreakdown = conversation.qualityScore ? [
    { dimension: 'Empathy & Rapport', score: 92 },
    { dimension: 'Technical Accuracy', score: 95 },
    { dimension: 'Resolution Effectiveness', score: 88 },
    { dimension: 'Compliance Adherence', score: 100 },
    { dimension: 'Call Control & Pacing', score: 85 }
  ] : null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/20 z-40" onClick={onClose} />

      {/* Panel */}
      <div className="fixed top-0 right-0 bottom-0 w-[600px] bg-white shadow-2xl z-50 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{conversation.accountId}</h2>
            <p className="text-xs text-gray-600 mt-0.5">Conversation details</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Account Info */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Account Information</h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-gray-600">Balance:</span>
                <span className="ml-2 font-medium text-gray-900">{conversation.amount || '$3,400'}</span>
              </div>
              <div>
                <span className="text-gray-600">Cohort:</span>
                <span className="ml-2 font-medium text-gray-900">High Prop / High Bal</span>
              </div>
              <div>
                <span className="text-gray-600">Propensity Score:</span>
                <span className="ml-2 font-medium text-gray-900">High (8.2/10)</span>
              </div>
              <div>
                <span className="text-gray-600">State:</span>
                <span className="ml-2 font-medium text-gray-900">TX</span>
              </div>
            </div>
          </div>

          {/* Journey Timeline */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Journey Timeline</h3>
            <div className="space-y-4">
              {timeline.map((touch, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="flex-shrink-0 w-20 pt-1">
                    <div className="text-xs text-gray-500">{touch.time.split(' ').slice(1).join(' ')}</div>
                    <div className="text-xs text-gray-400">{touch.time.split(' ')[0].slice(5)}</div>
                  </div>
                  <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <JourneyIcon channel={touch.channel} />
                      {touch.status && (
                        <span className="text-xs text-gray-600">• {touch.status}</span>
                      )}
                      {touch.amount && (
                        <span className="text-xs font-semibold text-green-600 ml-auto">{touch.amount}</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed">{touch.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quality Breakdown */}
          {qualityBreakdown && (
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Quality Score Breakdown</h3>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-gray-600">Overall Quality</span>
                  <span className="text-lg font-bold text-green-600">{conversation.qualityScore}/100</span>
                </div>
                <div className="space-y-2">
                  {qualityBreakdown.map((dim, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-gray-700">{dim.dimension}</span>
                        <span className="font-semibold text-gray-900">{dim.score}</span>
                      </div>
                      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: `${dim.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Compliance Status */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Compliance Status</h3>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
                <span className="text-sm font-medium text-green-900">Passed</span>
              </div>
              <p className="text-xs text-green-700 mt-2">All regulatory requirements met. No flags detected.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default function Conversations() {
  const [activeTab, setActiveTab] = useState('conversations');
  const [selectedConversation, setSelectedConversation] = useState(null);
  const outcomeFilters = ['All', 'Settled', 'PTP', 'Payment', 'No Answer', 'Dispute'];
  const settledConversations = conversations.filter(c => c.outcome === 'Settled' || c.outcome === 'Payment');

  return (
    <div className="p-8 bg-gray-50">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Conversations</h1>
        <p className="text-sm text-gray-600 mt-1">Multi-channel consumer journeys, replay, and outcomes</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-1">Total Interactions</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-gray-900">14,282</span>
            <span className="text-xs font-medium text-teal-600">+8.2%</span>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-1">Avg Sentiment</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-green-600">Positive</span>
            <span className="text-xs font-medium text-green-600">82/100</span>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-1">Resolution Rate</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-gray-900">2.4%</span>
            <span className="text-xs font-medium text-teal-600">+0.3%</span>
          </div>
        </div>
      </div>

      {/* Consumer Journey Replay - Featured */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-gray-700">route</span>
          <h2 className="text-base font-semibold text-gray-900">Consumer Journey Replay — #APX-3107</h2>
        </div>
        <div className="relative pl-8 border-l-2 border-gray-200 space-y-6">
          {[
            { day: 'Day 1', channel: 'Voice AI', outcome: 'No answer', sentiment: 'neutral', color: '#3b82f6', reason: 'First contact attempt — voice selected due to high-balance profile.' },
            { day: 'Day 3', channel: 'SMS', outcome: 'Opened, no click', sentiment: 'neutral', color: '#10b981', reason: 'SMS fallback — consumer opened but didn\'t engage with link.' },
            { day: 'Day 5', channel: 'Voice AI', outcome: 'Connected → "Can\'t pay that much" → Settlement offered → PTP set', sentiment: 'engaged', color: '#3b82f6', reason: 'Consumer engaged. AI offered settlement within client params. PTP set for Day 10.' },
            { day: 'Day 10', channel: 'PTP SMS → Payment Bot', outcome: '$5,100 settled ✓', sentiment: 'satisfied', color: '#10b981', reason: 'Consumer clicked PTP link, completed payment via bot. 15% settlement.' },
          ].map((step, idx) => (
            <div key={idx} className="relative">
              <div className="absolute -left-[25px] top-0 w-3 h-3 rounded-full border-2 border-white shadow-sm" style={{backgroundColor: step.color}} />
              <div className="flex items-center gap-3 mb-1">
                <span className="text-xs font-bold text-gray-500">{step.day}</span>
                <JourneyIcon channel={step.channel} />
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                  step.sentiment === 'satisfied' ? 'bg-green-100 text-green-700' :
                  step.sentiment === 'engaged' ? 'bg-blue-100 text-blue-700' :
                  'bg-gray-100 text-gray-500'
                }`}>{step.sentiment}</span>
              </div>
              <p className="text-sm font-medium text-gray-900">{step.outcome}</p>
              <p className="text-xs text-gray-500 italic mt-0.5">{step.reason}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="mb-6 flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-600">Cohort:</span>
          <div className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded text-xs font-medium text-blue-700">
            High propensity / High balance
            <button className="ml-1 text-blue-400 hover:text-blue-600">×</button>
          </div>
        </div>
        <div className="h-6 w-px bg-gray-200" />
        <div className="flex items-center gap-3">
          <select className="px-3 py-1.5 text-xs font-medium bg-white border border-gray-200 rounded text-gray-700">
            <option>All channels</option>
          </select>
          <div className="flex gap-1">
            {outcomeFilters.map((filter) => (
              <button
                key={filter}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                  filter === 'All'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          <select className="px-3 py-1.5 text-xs font-medium bg-white border border-gray-200 rounded text-gray-700">
            <option>Last 7 days</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white border border-gray-200 rounded-lg">
          <div className="text-xs uppercase tracking-wide text-gray-500 mb-1">Total Conversations</div>
          <div className="text-2xl font-semibold text-gray-900">342</div>
          <div className="text-xs text-gray-600 mt-1">High Prop / High Bal, last 7 days</div>
        </div>
        <div className="p-4 bg-white border border-gray-200 rounded-lg">
          <div className="text-xs uppercase tracking-wide text-gray-500 mb-1">Converted</div>
          <div className="text-2xl font-semibold text-green-600">48</div>
          <div className="text-xs text-gray-600 mt-1">Settled or paid</div>
        </div>
        <div className="p-4 bg-white border border-gray-200 rounded-lg">
          <div className="text-xs uppercase tracking-wide text-gray-500 mb-1">Conversion Rate</div>
          <div className="text-2xl font-semibold text-green-600">14%</div>
          <div className="text-xs text-gray-600 mt-1">48 / 342 conversations</div>
        </div>
        <div className="p-4 bg-white border border-gray-200 rounded-lg">
          <div className="text-xs uppercase tracking-wide text-gray-500 mb-1">Avg Touches to Convert</div>
          <div className="text-2xl font-semibold text-gray-900">3.2</div>
          <div className="text-xs text-gray-600 mt-1">Multi-channel coordination</div>
        </div>
      </div>

      {/* Tabbed Section: Conversations & Channel Analysis */}
      <div className="bg-white border border-gray-200 rounded-lg">
        {/* Tab Headers */}
        <div className="flex items-center border-b border-gray-200 px-6 pt-5 pb-0">
          <button
            onClick={() => setActiveTab('conversations')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px ${
              activeTab === 'conversations'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Conversations
          </button>
          <button
            onClick={() => setActiveTab('channels')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px ${
              activeTab === 'channels'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Conversion Drivers
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'conversations' && (
            <>
              <div className="space-y-3">
                {conversations.map((conv, idx) => {
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedConversation(conv)}
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 hover:border-gray-300 transition-colors cursor-pointer text-left"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-4 flex-1">
                          <span className="text-sm font-semibold text-gray-900 text-numeric">{conv.accountId}</span>

                          {/* Journey visualization */}
                          <div className="flex items-center gap-1">
                            {conv.journey.map((channel, channelIdx) => (
                              <div key={channelIdx} className="flex items-center">
                                <JourneyIcon channel={channel} />
                                {channelIdx < conv.journey.length - 1 && (
                                  <svg className="w-3 h-3 text-gray-400 mx-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                )}
                              </div>
                            ))}
                          </div>

                          {/* Outcome badge */}
                          <span className={`inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded ${
                            conv.outcome === 'Settled' || conv.outcome === 'Payment' ? 'bg-green-100 text-green-700' :
                            conv.outcome === 'PTP' ? 'bg-blue-100 text-blue-700' :
                            conv.outcome === 'Dispute' ? 'bg-red-100 text-red-700' :
                            conv.outcome === 'Callback' ? 'bg-amber-100 text-amber-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {conv.outcome}
                          </span>

                          {conv.amount && (
                            <span className="text-sm font-semibold text-gray-900 text-numeric">{conv.amount}</span>
                          )}
                        </div>

                        <div className="flex items-center gap-4 flex-shrink-0">
                          {conv.qualityScore && (
                            <div className="text-xs text-gray-500">
                              Quality: <span className={`font-semibold ${
                                conv.qualityScore >= 90 ? 'text-green-600' :
                                conv.qualityScore >= 80 ? 'text-amber-600' :
                                'text-red-600'
                              }`}>{conv.qualityScore}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <span className={`inline-block w-1.5 h-1.5 rounded-full ${
                              conv.compliance === 'clean' ? 'bg-green-500' : 'bg-red-500'
                            }`} />
                          </div>
                          <span className="text-xs text-gray-500">{conv.timestamp}</span>
                        </div>
                      </div>

                      {/* Journey note */}
                      <p className="text-xs text-gray-600 leading-relaxed">{conv.note}</p>
                    </button>
                  );
                })}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-gray-200">
                <button className="px-3 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded hover:bg-gray-50">
                  Previous
                </button>
                <span className="px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded">1</span>
                <span className="px-3 py-1 text-xs font-medium text-gray-700">2</span>
                <span className="px-3 py-1 text-xs font-medium text-gray-700">3</span>
                <button className="px-3 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded hover:bg-gray-50">
                  Next
                </button>
              </div>
            </>
          )}

          {activeTab === 'channels' && (
            <div className="space-y-2">
              {channelContributions.map((contrib, idx) => (
                <div key={idx} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-sm font-medium text-gray-900">{contrib.pattern}</span>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden max-w-xs">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${contrib.percentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-sm text-gray-600">{contrib.conversions} conversions</span>
                    <span className="text-sm font-semibold text-blue-600">{contrib.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Conversation Detail Panel */}
      {selectedConversation && (
        <ConversationDetailPanel
          conversation={selectedConversation}
          onClose={() => setSelectedConversation(null)}
        />
      )}
    </div>
  );
}
