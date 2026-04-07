import { useState, useEffect, useRef } from 'react';
import CommandCenter from './components/CommandCenter';
import Portfolio from './components/Portfolio';
import Campaigns from './components/Campaigns';
import Quality from './components/Quality';
import Approvals from './components/Approvals';
import Performance from './components/Performance';
import Payments from './components/Payments';
import Conversations from './components/Conversations';
import AgentPanel from './components/AgentPanel';
import ChatPanel from './components/ChatPanel';
import { agents } from './data';

const navGroups = [
  {
    items: [
      { id: 'insights', label: 'Insights' },
      { id: 'approvals', label: 'Approvals' },
    ]
  },
  {
    items: [
      { id: 'portfolio', label: 'Portfolio' },
      { id: 'performance', label: 'Performance' },
      { id: 'payments', label: 'Payments' },
    ]
  },
  {
    items: [
      { id: 'campaigns', label: 'Campaigns' },
      { id: 'conversations', label: 'Conversations' },
      { id: 'quality', label: 'Quality' },
    ]
  }
];

const agentColorMap = {
  blue: '#3b82f6',
  purple: '#8b5cf6',
  red: '#ef4444',
  teal: '#06b6d4',
  amber: '#f59e0b'
};

function App() {
  const [activeScreen, setActiveScreen] = useState('insights');
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [expandedAgent, setExpandedAgent] = useState(null);
  const [qualityTab, setQualityTab] = useState('overview');
  const mainContentRef = useRef(null);

  // Scroll to top when changing screens
  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTop = 0;
    }
  }, [activeScreen]);

  const handleCoachActivityClick = () => {
    setActiveScreen('quality');
    setQualityTab('improvements');
  };

  const handleNavigate = (screen) => {
    setActiveScreen(screen);
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case 'insights':
        return <CommandCenter onAgentClick={setSelectedAgent} onCoachActivityClick={handleCoachActivityClick} onNavigate={handleNavigate} />;
      case 'approvals':
        return <Approvals onAgentClick={setSelectedAgent} />;
      case 'portfolio':
        return <Portfolio />;
      case 'performance':
        return <Performance onNavigate={handleNavigate} />;
      case 'payments':
        return <Payments />;
      case 'campaigns':
        return <Campaigns />;
      case 'conversations':
        return <Conversations />;
      case 'quality':
        return <Quality initialTab={qualityTab} onTabChange={setQualityTab} />;
      default:
        return <CommandCenter onAgentClick={setSelectedAgent} onCoachActivityClick={handleCoachActivityClick} onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-slate-800 flex flex-col">
        <div className="px-5 py-6 border-b border-slate-700">
          <h1 className="text-base font-semibold text-white">Skit.ai</h1>
          <p className="text-xs text-slate-400 mt-0.5">Agentic Platform</p>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          {/* Navigation Groups */}
          {navGroups.map((group, groupIdx) => (
            <div key={groupIdx} className={groupIdx > 0 ? 'mt-5' : ''}>
              {group.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveScreen(item.id)}
                  className={`w-full text-left px-5 py-2 text-sm transition-colors relative ${
                    activeScreen === item.id
                      ? 'text-white bg-white/10'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {activeScreen === item.id && (
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-400" />
                  )}
                  {item.label}
                </button>
              ))}
            </div>
          ))}

          {/* Agents Section */}
          <div className="mt-5 pt-4 border-t border-slate-700">
            <div className="px-5 mb-2">
              <p className="text-xs uppercase tracking-wide text-slate-500">Agents</p>
            </div>
            {agents.map((agent) => (
              <div key={agent.name}>
                <button
                  onClick={() => setExpandedAgent(expandedAgent === agent.name ? null : agent.name)}
                  className="w-full text-left px-5 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-block w-2 h-2 rounded-full"
                      style={{ backgroundColor: agentColorMap[agent.color] }}
                    />
                    <span>{agent.name}</span>
                  </div>
                  <svg
                    className={`w-4 h-4 transition-transform ${expandedAgent === agent.name ? 'rotate-90' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                {expandedAgent === agent.name && (
                  <div className="bg-slate-900/50 py-1">
                    <button
                      onClick={() => setSelectedAgent(agent.name)}
                      className="w-full text-left px-10 py-1.5 text-xs text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-colors"
                    >
                      Overview
                    </button>
                    <button
                      onClick={() => setSelectedAgent(agent.name)}
                      className="w-full text-left px-10 py-1.5 text-xs text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-colors"
                    >
                      Recent Activity
                    </button>
                    <button
                      onClick={() => setSelectedAgent(agent.name)}
                      className="w-full text-left px-10 py-1.5 text-xs text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-colors"
                    >
                      Configuration
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>

        <div className="px-5 py-4 border-t border-slate-700 text-xs text-slate-500">
          v0.1 Internal Prototype
        </div>
      </div>

      {/* Main Content */}
      <div ref={mainContentRef} className="flex-1 overflow-y-auto bg-white relative">
        {renderScreen()}

        {/* Agent Detail Panel */}
        {selectedAgent && (
          <AgentPanel agent={selectedAgent} onClose={() => setSelectedAgent(null)} />
        )}

        {/* Chat FAB Button */}
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center z-30 group"
        >
          <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </button>

        {/* Chat Panel */}
        <ChatPanel isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      </div>
    </div>
  );
}

export default App;
