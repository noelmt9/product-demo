import { useState, useEffect, useRef } from 'react';
import CommandCenter from './components/CommandCenter';
import Portfolio from './components/Portfolio';
import Campaigns from './components/Campaigns';
import Quality from './components/Quality';
import Approvals from './components/Approvals';
import Performance from './components/Performance';
import Payments from './components/Payments';
import Conversations from './components/Conversations';
import Agents from './components/Agents';
import AgentPanel from './components/AgentPanel';
import ChatPanel from './components/ChatPanel';


const navItems = [
  { id: 'insights', label: 'Insights', icon: 'insights' },
  { id: 'performance', label: 'Performance', icon: 'speed' },
  { id: 'portfolio', label: 'Portfolio', icon: 'analytics' },
  { id: 'agents', label: 'Agents', icon: 'smart_toy' },
  { id: 'approvals', label: 'Approvals', icon: 'fact_check' },
  { id: 'conversations', label: 'Conversations', icon: 'forum' },
  { id: 'quality', label: 'Quality/Compliance', icon: 'rule' },
];


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
      case 'agents':
        return <Agents onAgentClick={setSelectedAgent} />;
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
    <div className="flex h-screen" style={{background: '#e8f4f1'}}>
      {/* Sidebar */}
      <div className={`${sideW} fixed left-0 top-0 h-screen flex flex-col z-50 transition-all duration-300`} style={{background: '#162a44', borderRight: '1px solid #1e3654'}}>
        {/* Logo + Collapse */}
        <div className={`flex items-center ${sidebarCollapsed ? 'justify-center px-2' : 'px-5'} py-6`}>
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            {/* Icon only — the round gradient mark */}
            <svg className="w-8 h-8 flex-shrink-0" viewBox="0 0 253 253" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="skit-grad" x1="34" y1="240" x2="236" y2="18" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#0a508b"/>
                  <stop offset=".31" stopColor="#2d83c5"/>
                  <stop offset=".6" stopColor="#43bded"/>
                  <stop offset="1" stopColor="#80c267"/>
                </linearGradient>
              </defs>
              <path d="M237.98,125.74c0-63.48-51.46-114.94-114.94-114.94S8.1,62.26,8.1,125.74s51.46,114.94,114.94,114.94c17.94,0,34.91-4.11,50.03-11.44h0c5.04-2.25,12.5-4.71,21.64-4.75,24.09-.1,40.03,16.73,43.27,20.31v-114.82l-.11.17c.06-1.46.11-2.93.11-4.41Z" fill="url(#skit-grad)"/>
              <path d="M122.59,138.74c-5.2,0-8.55,16.05-16.28,16.05-8.53,0-12.01-16.05-17.62-16.05-7.88,0-15.41,19.51-23.28,19.51-9.88,0-18.4-30.44-33.59-30.44,15.19,0,23.71-30.44,33.59-30.44,7.87,0,15.4,19.51,23.28,19.51,5.61,0,9.09-16.05,17.62-16.05,7.73,0,11.08,16.05,16.28,16.05,15.2,0,18.52-71.19,33.97-71.19,17.61,0,13.83,82.12,53.68,82.12-39.85,0-36.07,82.12-53.68,82.12-15.45,0-18.77-71.19-33.97-71.19" fill="white"/>
            </svg>
            {!sidebarCollapsed && (
              <span className="text-[22px] font-bold text-white tracking-tight leading-none truncate">skit.ai</span>
            )}
          </div>
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className={`text-blue-200/50 hover:text-white transition-colors flex-shrink-0 ${sidebarCollapsed ? '' : 'ml-2'}`}
          >
            <span className="material-symbols-outlined text-lg">{sidebarCollapsed ? 'chevron_right' : 'chevron_left'}</span>
          </button>
        </div>

        {/* Nav */}
        <nav className={`flex-1 ${sidebarCollapsed ? 'px-2' : 'px-3'} space-y-1 overflow-y-auto`}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveScreen(item.id)}
              title={sidebarCollapsed ? item.label : undefined}
              className={`w-full text-left flex items-center ${sidebarCollapsed ? 'justify-center' : ''} gap-3 py-2.5 px-3 rounded-xl transition-all text-sm font-medium ${
                activeScreen === item.id
                  ? 'text-white shadow-sm'
                  : 'text-blue-200/60 hover:text-white hover:bg-white/10'
              }`}
          style={activeScreen === item.id ? {background: 'rgba(33,150,175,0.30)', color: '#ffffff'} : {}}
            >
              <span className="material-symbols-outlined text-lg">{item.icon}</span>
              {!sidebarCollapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div className={`${sidebarCollapsed ? 'px-2' : 'px-3'} pb-5 pt-3`}>
          {!sidebarCollapsed && (
            <button className="w-full text-left flex items-center gap-3 py-2.5 px-3 rounded-xl text-blue-200/60 hover:text-white hover:bg-white/10 transition-all text-sm font-medium">
              <span className="material-symbols-outlined text-lg">settings</span>
              <span>Settings</span>
            </button>
          )}
          <div className={`flex items-center gap-3 ${sidebarCollapsed ? 'justify-center' : 'px-3'} pt-4 ${sidebarCollapsed ? '' : 'mt-3 border-t border-white/10'}`}>
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{background: 'linear-gradient(135deg, #2196af, #61ab5e)'}}>
              AR
            </div>
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white truncate">Alex Rivera</p>
                <p className="text-[10px] text-blue-200/50 truncate">Operations Lead</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div ref={mainContentRef} className={`flex-1 ${mainML} overflow-y-auto relative transition-all duration-300`} style={{background: '#e8f4f1'}}>
        {renderScreen()}

        {selectedAgent && (
          <AgentPanel agent={selectedAgent} onClose={() => setSelectedAgent(null)} />
        )}

        {/* Chat FAB — hidden on Insights since it has its own search */}
        {activeScreen !== 'insights' && (
          <button
            onClick={() => setIsChatOpen(true)}
            className="fixed bottom-6 right-6 w-14 h-14 text-white rounded-2xl hover:scale-105 transition-all flex items-center justify-center z-30 group"
            style={{background: 'linear-gradient(135deg, #2196af, #61ab5e)', boxShadow: '0 8px 24px rgba(33,150,175,0.35)'}}
          >
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </button>
        )}

        <ChatPanel isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      </div>
    </div>
  );
}

export default App;
