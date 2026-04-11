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


const navItems = [
  { id: 'insights', label: 'Insights', icon: 'insights' },
  { id: 'performance', label: 'Performance', icon: 'speed' },
  { id: 'portfolio', label: 'Portfolio', icon: 'analytics' },
  { id: 'agents', label: 'Agents', icon: 'smart_toy' },
  { id: 'approvals', label: 'Approvals', icon: 'fact_check' },
  { id: 'conversations', label: 'Conversations', icon: 'forum' },
  { id: 'quality', label: 'Quality', icon: 'rule' },
];


function App() {
  const [activeScreen, setActiveScreen] = useState('insights');
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedClient, setSelectedClient] = useState('Apex Recovery Partners');
  const [clientDropdownOpen, setClientDropdownOpen] = useState(false);
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
        return <CommandCenter onNavigate={handleNavigate} />;
      case 'approvals':
        return <Approvals onAgentClick={setSelectedAgent} />;
      case 'portfolio':
        return <Portfolio />;
      case 'performance':
        return <Performance />;
      case 'payments':
        return <Payments />;
      case 'agents':
        return <Agents />;
      case 'campaigns':
        return <Campaigns />;
      case 'conversations':
        return <Conversations />;
      case 'quality':
        return <Quality initialTab={qualityTab} onTabChange={setQualityTab} />;
      default:
        return <CommandCenter onNavigate={handleNavigate} />;
    }
  };

  return (
    <div
      className="flex h-screen gap-3 p-4 relative overflow-hidden"
      style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.5), rgba(255,255,255,0.5)), radial-gradient(ellipse at center, #ffffff, #eaf3ff)' }}
    >
      {/* ── Sidebar ── */}
      <aside
        className={`${sidebarCollapsed ? 'w-[72px]' : 'w-[250px]'} shrink-0 h-full flex flex-col justify-between rounded-2xl border border-[#dee2e6] backdrop-blur-[67px] transition-all duration-300 relative z-50`}
        style={{
          background: 'rgba(255,255,255,0.5)',
          boxShadow: '0px 1px 24px 0px rgba(76,110,245,0.1)',
          padding: sidebarCollapsed ? 8 : 17,
        }}
      >
        {/* Top: Logo + Client + Nav */}
        <div>
          {/* Logo row */}
          <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'gap-2'} pb-3`}>
            <div className={`flex items-center gap-2 ${sidebarCollapsed ? '' : 'flex-1'} min-w-0`}>
              <svg className="w-7 h-7 flex-shrink-0" viewBox="0 0 253 253" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                <span className="text-[18px] font-bold text-[#212529] tracking-tight">skit.ai</span>
              )}
            </div>
            {!sidebarCollapsed && (
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="text-[#848fa8] hover:text-[#212529] transition-colors flex-shrink-0"
              >
                <span className="material-symbols-outlined text-[20px]">chevron_left</span>
              </button>
            )}
          </div>

          {/* Client selector */}
          {!sidebarCollapsed && (
            <div className="pb-6">
              <button
                onClick={() => setClientDropdownOpen(!clientDropdownOpen)}
                className="w-full flex items-center gap-2 px-3 py-2 border border-[#dee2e6] rounded-lg hover:border-[#adb5bd] transition-colors"
              >
                <span className="text-[14px] text-[#848fa8] flex-1 truncate text-left">{selectedClient}</span>
                <span className={`material-symbols-outlined text-[#848fa8] flex-shrink-0 transition-transform ${clientDropdownOpen ? 'rotate-180' : ''}`} style={{fontSize: 12}}>expand_more</span>
              </button>
            </div>
          )}

          {/* Client dropdown */}
          {clientDropdownOpen && !sidebarCollapsed && (
            <>
              <div className="fixed inset-0 z-[60]" onClick={() => setClientDropdownOpen(false)} />
              <div
                className="absolute left-[17px] top-[90px] rounded-xl shadow-lg z-[70] py-1 border border-[#dee2e6]"
                style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)', width: 'calc(100% - 34px)' }}
              >
                {['Apex Recovery Partners', 'Summit Financial Solutions', 'Clearview Collections', 'Heritage Debt Group'].map(client => (
                  <button
                    key={client}
                    onClick={() => { setSelectedClient(client); setClientDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-2.5 text-[13px] transition-colors ${
                      selectedClient === client
                        ? 'text-[#4c6ef5] font-semibold bg-[rgba(76,110,245,0.05)]'
                        : 'text-[#848fa8] hover:text-[#212529] hover:bg-[#f8f9fa]'
                    }`}
                  >
                    {client}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Nav */}
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveScreen(item.id)}
                title={sidebarCollapsed ? item.label : undefined}
                className={`w-full text-left flex items-center ${sidebarCollapsed ? 'justify-center' : ''} gap-3 px-3 py-2.5 rounded-[6px] transition-all text-[14px] font-medium border-l-2 ${
                  activeScreen === item.id
                    ? 'bg-[rgba(76,110,245,0.1)] border-[#4c6ef5] text-[#212529]'
                    : 'border-transparent text-[#848fa8] hover:bg-black/[0.03]'
                }`}
              >
                <span className={`material-symbols-outlined text-lg ${activeScreen === item.id ? 'text-[#4c6ef5]' : ''}`}>{item.icon}</span>
                {!sidebarCollapsed && <span>{item.label}</span>}
              </button>
            ))}
          </nav>
        </div>

        {/* Bottom: Settings + Profile */}
        <div className="border-t border-[#dee2e6] pt-4 pb-3 flex flex-col gap-4">
          {!sidebarCollapsed && (
            <button className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-[6px] text-[#868e96] hover:bg-black/[0.03] transition-all text-[14px] font-medium">
              <span className="material-symbols-outlined text-lg">settings</span>
              <span>Settings</span>
            </button>
          )}
          {sidebarCollapsed && (
            <button
              onClick={() => setSidebarCollapsed(false)}
              className="w-full flex items-center justify-center py-2 text-[#848fa8] hover:text-[#212529] transition-colors"
              title="Expand sidebar"
            >
              <span className="material-symbols-outlined text-lg">chevron_right</span>
            </button>
          )}
          <div className={`flex items-center gap-3 ${sidebarCollapsed ? 'justify-center' : 'px-3'}`}>
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[14px] font-semibold flex-shrink-0"
              style={{ background: '#4c6ef5', fontFamily: 'Inter, sans-serif' }}
            >
              AR
            </div>
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0 overflow-hidden">
                <p className="text-[13px] font-medium text-[#212529] truncate" style={{ fontFamily: 'Inter, sans-serif' }}>Alex Rivera</p>
                <p className="text-[11px] text-[#848fa8] truncate">Operations Lead</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <div
        ref={mainContentRef}
        className="flex-1 h-full overflow-y-auto relative transition-all duration-300"
      >
        {renderScreen()}

        {selectedAgent && (
          <AgentPanel agent={selectedAgent} onClose={() => setSelectedAgent(null)} />
        )}
      </div>
    </div>
  );
}

export default App;
