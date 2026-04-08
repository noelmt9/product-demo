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
import skitIcon from './assets/skit-icon.png';

const navItems = [
  { id: 'insights', label: 'Insights', icon: 'insights' },
  { id: 'performance', label: 'Performance', icon: 'speed' },
  { id: 'portfolio', label: 'Portfolio', icon: 'analytics' },
  { id: 'approvals', label: 'Approvals', icon: 'fact_check' },
  { id: 'conversations', label: 'Conversations', icon: 'forum' },
  { id: 'quality', label: 'Quality/Compliance', icon: 'rule' },
];

const agentColorMap = {
  blue: '#3b82f6',
  purple: '#8b5cf6',
  red: '#ef4444',
  teal: '#06b6d4',
  amber: '#f59e0b',
  emerald: '#10b981',
  indigo: '#6366f1'
};

function App() {
  const [activeScreen, setActiveScreen] = useState('insights');
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [qualityTab, setQualityTab] = useState('overview');
  const mainContentRef = useRef(null);

  useEffect(() => {
    if (mainContentRef.current) mainContentRef.current.scrollTop = 0;
  }, [activeScreen]);

  const handleCoachActivityClick = () => {
    setActiveScreen('quality');
    setQualityTab('improvements');
  };

  const handleNavigate = (screen) => setActiveScreen(screen);

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

  const sideW = sidebarCollapsed ? 'w-[72px]' : 'w-64';
  const mainML = sidebarCollapsed ? 'ml-[72px]' : 'ml-64';

  return (
    <div className="flex h-screen bg-[#f8f9ff]">
      {/* Sidebar */}
      <div className={`${sideW} fixed left-0 top-0 h-screen flex flex-col z-50 transition-all duration-300`} style={{ background: '#162A44' }}>
        {/* Logo + Collapse */}
        <div className={`flex items-center ${sidebarCollapsed ? 'justify-center px-2' : 'px-5'} py-5`}>
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <img src={skitIcon} alt="Skit AI" className="w-8 h-8 flex-shrink-0 object-contain" />
            {!sidebarCollapsed && (
              <div className="min-w-0">
                <h1 className="text-sm font-bold text-white tracking-tight leading-tight truncate">Skit AI</h1>
                <p className="text-[9px] font-medium tracking-widest uppercase truncate" style={{color: '#5FCFC4'}}>Intelligent Layer</p>
              </div>
            )}
          </div>
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className={`text-slate-400 hover:text-white transition-colors flex-shrink-0 ${sidebarCollapsed ? '' : 'ml-2'}`}
          >
            <span className="material-symbols-outlined text-lg">{sidebarCollapsed ? 'chevron_right' : 'chevron_left'}</span>
          </button>
        </div>

        {/* Nav */}
        <nav className={`flex-1 ${sidebarCollapsed ? 'px-2' : 'px-3'} space-y-0.5 overflow-y-auto`}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveScreen(item.id)}
              title={sidebarCollapsed ? item.label : undefined}
              className={`w-full text-left flex items-center ${sidebarCollapsed ? 'justify-center' : ''} gap-3 py-2.5 px-3 rounded-lg transition-colors text-sm font-medium ${
                activeScreen === item.id
                  ? 'bg-white/10 text-[#5FCFC4]'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="material-symbols-outlined text-lg">{item.icon}</span>
              {!sidebarCollapsed && <span>{item.label}</span>}
            </button>
          ))}

          {/* Agents Section */}
          <div className="mt-4 pt-4 border-t border-white/10">
            {!sidebarCollapsed && <p className="text-[10px] uppercase tracking-widest text-slate-500 px-3 mb-2">Agents</p>}
            {agents.map((agent) => (
              <button
                key={agent.name}
                onClick={() => setSelectedAgent(agent.name)}
                title={sidebarCollapsed ? agent.name : undefined}
                className={`w-full text-left ${sidebarCollapsed ? 'justify-center' : ''} px-3 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2 rounded-lg`}
              >
                <span className="inline-block w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: agentColorMap[agent.color] || '#6b7280' }} />
                {!sidebarCollapsed && <span className="truncate">{agent.name}</span>}
              </button>
            ))}
          </div>
        </nav>

        {/* Bottom */}
        <div className={`${sidebarCollapsed ? 'px-2' : 'px-3'} pb-4 border-t border-white/10 pt-3`}>
          {!sidebarCollapsed && (
            <button className="w-full text-left flex items-center gap-3 py-2 px-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors text-sm font-medium">
              <span className="material-symbols-outlined text-lg">settings</span>
              <span>Settings</span>
            </button>
          )}
          <div className={`flex items-center gap-3 ${sidebarCollapsed ? 'justify-center' : 'px-3'} pt-3 ${sidebarCollapsed ? '' : 'mt-2 border-t border-white/10'}`}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{background: 'linear-gradient(135deg, #3BA7F6, #5FCFC4)'}}>
              AR
            </div>
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-white truncate">Alex Rivera</p>
                <p className="text-[10px] text-slate-400 truncate">Operations Lead</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div ref={mainContentRef} className={`flex-1 ${mainML} overflow-y-auto bg-[#f8f9ff] relative transition-all duration-300`}>
        {renderScreen()}

        {selectedAgent && (
          <AgentPanel agent={selectedAgent} onClose={() => setSelectedAgent(null)} />
        )}

        {/* Chat FAB */}
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 text-white rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center z-30 group"
          style={{background: 'linear-gradient(135deg, #3BA7F6, #5FCFC4)'}}
        >
          <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </button>

        <ChatPanel isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      </div>
    </div>
  );
}

export default App;
