const mockMessages = [
  {
    id: 1,
    type: 'user',
    content: 'Generate this week\'s client report'
  },
  {
    id: 2,
    type: 'agent',
    agent: 'Report Generator',
    color: '#3BA7F6',
    content: 'INTELLIGENCE LAYER\n\nEXECUTIVE SUMMARY\nPerformance metrics indicate a 3% stabilization in high-intent conversion paths. Agent interventions have successfully mitigated compliance drift noticed in Q1.\n\nKPI MOVEMENT\n• Recovery Rate: 2.7% (+0.4%)\n• Contact Rate: 38% (-2% vs target)\n• Avg Latency: 4.2 days\n\nSTRATEGY CHANGES\n• Day 12: Voice AI increased to 5x/week on high-prop\n• Day 17: Settlement SMS launched for broken-PTP\n\nCOMPLIANCE STATUS\n• 43 violations prevented, $64.5K exposure avoided\n• Score: 99.86%\n\nENRICHMENT\n• $127K from previously unreachable accounts\n\nRECOMMENDED NEXT STEPS\n• Expand settlement strategy to medium-propensity\n• Schedule activation review with client'
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
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background: 'linear-gradient(135deg, #3BA7F6, #5FCFC4)'}}>
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Report Generator</h3>
              <p className="text-xs text-gray-500">Agentic Briefing Mode</p>
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
                placeholder="Ask for further details or adjustments..."
                className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
                disabled
              />
            </div>
            <button
              className="w-10 h-10 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              style={{background: 'linear-gradient(135deg, #3BA7F6, #5FCFC4)'}}
              disabled
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
          <div className="flex gap-2 mt-2">
            <button className="px-3 py-1.5 text-xs font-medium bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors">Compare with last month</button>
            <button className="px-3 py-1.5 text-xs font-medium bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors">Add to dashboard</button>
          </div>
        </div>
      </div>
    </>
  );
}
