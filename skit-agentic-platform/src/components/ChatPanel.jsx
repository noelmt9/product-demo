const mockMessages = [
  {
    id: 1,
    type: 'user',
    content: 'Can you email me a summary of what improvements we\'ve made on the Apex portfolio in the last two weeks?'
  },
  {
    id: 2,
    type: 'agent',
    agent: 'Analyst',
    color: '#3b82f6',
    content: 'I can put that together. Just want to confirm — do you want me to include:\n\n• Strategy changes and their measured impact\n• Cohort re-scoring updates\n• KPI movement (Week 1 → Week 3)\n• Compliance and quality highlights\n\nAnd should this go to your email, or the client stakeholder group as well?'
  },
  {
    id: 3,
    type: 'user',
    content: 'All of those. Just me for now.'
  },
  {
    id: 4,
    type: 'agent',
    agent: 'Analyst',
    color: '#3b82f6',
    content: 'Done. I\'ve sent the two-week improvement summary to your email. Covers 5 strategy changes, 340 accounts re-scored, liquidation improvement from 1.8% to 2.7%, and compliance/quality highlights. Let me know if you want me to adjust anything before sharing with the client.'
  }
];

export default function ChatPanel({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/20 z-40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Chat Panel */}
      <div className="fixed bottom-6 right-6 w-[420px] h-[560px] bg-white shadow-2xl rounded-2xl z-50 flex flex-col border border-gray-200/50 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-slate-50 to-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Ask Agent</h3>
              <p className="text-xs text-gray-500">AI-powered assistance</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gradient-to-b from-gray-50/30 to-white">
          {mockMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.type === 'agent' && (
                <div className="flex gap-3 max-w-[85%]">
                  <div className="flex-shrink-0">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${message.color}15` }}
                    >
                      <span
                        className="inline-block w-2 h-2 rounded-full"
                        style={{ backgroundColor: message.color }}
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-600 mb-1.5">{message.agent}</p>
                    <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                      <p className="text-sm text-gray-900 leading-relaxed whitespace-pre-line">{message.content}</p>
                    </div>
                  </div>
                </div>
              )}

              {message.type === 'user' && (
                <div className="max-w-[85%]">
                  <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl rounded-br-sm px-4 py-3 shadow-sm">
                    <p className="text-sm text-white leading-relaxed">{message.content}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="border-t border-gray-100 p-4 bg-white">
          <div className="flex gap-2 items-center">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Ask anything..."
                className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
                disabled
              />
            </div>
            <button
              className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              disabled
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
