import { useState } from 'react';

// ── Mock data: Original Creditors ─────────────────────────────────────────────

const originalCreditors = [
  {
    name: 'Meridian Bank',
    debtType: 'Credit Card',
    accounts: 2840,
    totalBalance: 8200000,
    avgBalance: 2887,
    avgChargeoffAge: 11,
    collected: 221400,
    liquidationRate: 2.7,
    contactRate: 41,
    ptpRate: 13,
    states: ['TX', 'FL', 'NY', 'CA'],
    status: 'above',
  },
  {
    name: 'Pinnacle Financial',
    debtType: 'Credit Card',
    accounts: 2180,
    totalBalance: 5960000,
    avgBalance: 2734,
    avgChargeoffAge: 13,
    collected: 143400,
    liquidationRate: 2.4,
    contactRate: 38,
    ptpRate: 11,
    states: ['TX', 'GA', 'IL'],
    status: 'on-target',
  },
  {
    name: 'Crestline Lending',
    debtType: 'Personal Loan',
    accounts: 1920,
    totalBalance: 6720000,
    avgBalance: 3500,
    avgChargeoffAge: 16,
    collected: 120960,
    liquidationRate: 1.8,
    contactRate: 31,
    ptpRate: 9,
    states: ['CA', 'NY', 'FL'],
    status: 'below',
  },
  {
    name: 'Harbor Finance',
    debtType: 'Personal Loan',
    accounts: 1440,
    totalBalance: 5040000,
    avgBalance: 3500,
    avgChargeoffAge: 18,
    collected: 95760,
    liquidationRate: 1.9,
    contactRate: 28,
    ptpRate: 8,
    states: ['TX', 'OH', 'PA'],
    status: 'below',
  },
  {
    name: 'Clearview Medical Group',
    debtType: 'Medical',
    accounts: 2040,
    totalBalance: 3570000,
    avgBalance: 1750,
    avgChargeoffAge: 10,
    collected: 135660,
    liquidationRate: 3.8,
    contactRate: 47,
    ptpRate: 16,
    states: ['FL', 'TX', 'GA', 'IL'],
    status: 'above',
  },
  {
    name: 'Summit Health Systems',
    debtType: 'Medical',
    accounts: 1580,
    totalBalance: 2133000,
    avgBalance: 1350,
    avgChargeoffAge: 9,
    collected: 90000,
    liquidationRate: 4.2,
    contactRate: 51,
    ptpRate: 18,
    states: ['TX', 'CA', 'NY'],
    status: 'above',
  },
];

// ── Cohorts & campaigns per client ──────────────────────────────────────────

const clientCohorts = {
  'Meridian Bank': [
    { cohort: 'High Prop / High Bal', accounts: 620, collected: 84200, avgBal: 4200, debtAge: '8 mo', debtType: 'Credit Card', strategy: 'Voice AI + Human escalation', channels: ['Voice', 'SMS', 'Human'], liqRate: 3.4 },
    { cohort: 'High Prop / Low Bal', accounts: 480, collected: 38400, avgBal: 1100, debtAge: '9 mo', debtType: 'Credit Card', strategy: 'Digital only', channels: ['SMS', 'Email'], liqRate: 2.9 },
    { cohort: 'Medium Prop / All Bal', accounts: 740, collected: 48100, avgBal: 2800, debtAge: '12 mo', debtType: 'Credit Card', strategy: 'Multi-channel blitz', channels: ['Voice', 'SMS', 'Email'], liqRate: 2.4 },
    { cohort: 'Low Prop / High Bal', accounts: 340, collected: 22100, avgBal: 5100, debtAge: '18 mo', debtType: 'Credit Card', strategy: 'Human agent priority', channels: ['Human', 'SMS'], liqRate: 1.6 },
    { cohort: 'Low Prop / Low Bal', accounts: 280, collected: 4200, avgBal: 900, debtAge: '22 mo', debtType: 'Credit Card', strategy: 'Email only, monthly', channels: ['Email'], liqRate: 0.5 },
    { cohort: 'Medical Subset', accounts: 180, collected: 12400, avgBal: 1800, debtAge: '7 mo', debtType: 'Medical', strategy: 'Empathetic voice', channels: ['Voice'], liqRate: 3.1 },
    { cohort: 'Spanish Preference', accounts: 120, collected: 8200, avgBal: 2400, debtAge: '10 mo', debtType: 'Credit Card', strategy: 'Spanish SMS + Voice', channels: ['Voice', 'SMS'], liqRate: 2.8 },
    { cohort: 'Tertiary Placement', accounts: 80, collected: 3800, avgBal: 3200, debtAge: '30 mo', debtType: 'Credit Card', strategy: 'Email nurture only', channels: ['Email'], liqRate: 0.3 },
  ],
  'Pinnacle Financial': [
    { cohort: 'High Prop / All Bal', accounts: 540, collected: 52200, avgBal: 3200, debtAge: '10 mo', debtType: 'Credit Card', strategy: 'Voice AI first', channels: ['Voice', 'SMS'], liqRate: 3.0 },
    { cohort: 'Medium Prop', accounts: 780, collected: 48600, avgBal: 2400, debtAge: '14 mo', debtType: 'Credit Card', strategy: 'SMS + Email', channels: ['SMS', 'Email'], liqRate: 2.2 },
    { cohort: 'Low Prop / High Bal', accounts: 420, collected: 28400, avgBal: 4800, debtAge: '19 mo', debtType: 'Credit Card', strategy: 'Human agent', channels: ['Human'], liqRate: 1.4 },
    { cohort: 'Low Prop / Low Bal', accounts: 440, collected: 14200, avgBal: 1100, debtAge: '20 mo', debtType: 'Credit Card', strategy: 'Email only', channels: ['Email'], liqRate: 0.4 },
  ],
  'Crestline Lending': [
    { cohort: 'High Prop', accounts: 380, collected: 42800, avgBal: 3800, debtAge: '12 mo', debtType: 'Personal Loan', strategy: 'Voice AI + settlement SMS', channels: ['Voice', 'SMS'], liqRate: 2.6 },
    { cohort: 'Medium Prop', accounts: 640, collected: 44200, avgBal: 3200, debtAge: '17 mo', debtType: 'Personal Loan', strategy: 'Multi-channel', channels: ['Voice', 'SMS', 'Email'], liqRate: 1.7 },
    { cohort: 'Low Prop', accounts: 900, collected: 33960, avgBal: 3600, debtAge: '22 mo', debtType: 'Personal Loan', strategy: 'Email nurture', channels: ['Email'], liqRate: 0.6 },
  ],
  'Harbor Finance': [
    { cohort: 'High Prop', accounts: 320, collected: 36400, avgBal: 4100, debtAge: '14 mo', debtType: 'Personal Loan', strategy: 'Voice AI priority', channels: ['Voice', 'SMS'], liqRate: 2.8 },
    { cohort: 'Medium Prop', accounts: 520, collected: 34200, avgBal: 3200, debtAge: '19 mo', debtType: 'Personal Loan', strategy: 'SMS + Human', channels: ['SMS', 'Human'], liqRate: 1.8 },
    { cohort: 'Low Prop', accounts: 600, collected: 25160, avgBal: 3400, debtAge: '24 mo', debtType: 'Personal Loan', strategy: 'Digital only', channels: ['Email', 'SMS'], liqRate: 0.5 },
  ],
  'Clearview Medical Group': [
    { cohort: 'High Prop / Empathetic', accounts: 680, collected: 58400, avgBal: 1900, debtAge: '6 mo', debtType: 'Medical', strategy: 'Empathetic Voice AI', channels: ['Voice'], liqRate: 4.6 },
    { cohort: 'Medium Prop', accounts: 820, collected: 52800, avgBal: 1700, debtAge: '11 mo', debtType: 'Medical', strategy: 'SMS + Email', channels: ['SMS', 'Email'], liqRate: 3.2 },
    { cohort: 'Low Prop', accounts: 540, collected: 24460, avgBal: 1400, debtAge: '16 mo', debtType: 'Medical', strategy: 'Email only', channels: ['Email'], liqRate: 1.4 },
  ],
  'Summit Health Systems': [
    { cohort: 'High Prop', accounts: 520, collected: 38200, avgBal: 1500, debtAge: '5 mo', debtType: 'Medical', strategy: 'Empathetic Voice + SMS', channels: ['Voice', 'SMS'], liqRate: 5.1 },
    { cohort: 'Medium Prop', accounts: 640, collected: 34800, avgBal: 1300, debtAge: '10 mo', debtType: 'Medical', strategy: 'SMS campaign', channels: ['SMS', 'Email'], liqRate: 3.6 },
    { cohort: 'Low Prop', accounts: 420, collected: 17000, avgBal: 1200, debtAge: '14 mo', debtType: 'Medical', strategy: 'Email nurture', channels: ['Email'], liqRate: 1.8 },
  ],
};

// ── Ageing buckets ──────────────────────────────────────────────────────────

const ageingBuckets = [
  { label: '0-6 months', accounts: 2160, balance: 5940000, liqRate: 3.8, contactRate: 48, note: 'Freshest accounts, highest propensity' },
  { label: '6-12 months', accounts: 3840, balance: 10750000, liqRate: 2.9, contactRate: 41, note: 'Primary placement bulk' },
  { label: '12-18 months', accounts: 3120, balance: 8740000, liqRate: 2.2, contactRate: 35, note: 'Secondary placement, moderate returns' },
  { label: '18-24 months', accounts: 1680, balance: 4700000, liqRate: 1.4, contactRate: 26, note: 'Tertiary, stale contact info' },
  { label: '24+ months', accounts: 1200, balance: 3500000, liqRate: 0.6, contactRate: 14, note: 'Low yield, enrichment dependent' },
];

// ── Portfolio placement metadata (read-only from placement file) ──────────────

const placementMeta = {
  fileName: 'apex_recovery_batch1_hypercare.csv',
  uploadedAt: 'Jan 21, 2026 · 09:14 AM',
  uploadedBy: 'Apex Recovery Partners (via SFTP)',
  totalRows: 12153,
  cleanRows: 12000,
  flaggedRows: 153,
  totalBalance: 33626000,
  avgBalance: 2802,
  avgChargeoffAge: 14,
  debtTypes: [
    { type: 'Credit Card', pct: 42 },
    { type: 'Medical', pct: 30 },
    { type: 'Personal Loan', pct: 28 },
  ],
  topStates: [
    { state: 'TX', pct: 18 },
    { state: 'FL', pct: 15 },
    { state: 'CA', pct: 14 },
    { state: 'NY', pct: 12 },
    { state: 'IL', pct: 8 },
    { state: 'Other', pct: 33 },
  ],
  priorPlacement: [
    { label: 'Primary (1st placement)', pct: 45 },
    { label: 'Secondary', pct: 35 },
    { label: 'Tertiary', pct: 20 },
  ],
};

const contactCoverage = [
  { channel: 'Phone (Cell)',          coverage: '72%', before: 64, after: 72, note: '+8pts via skip tracing — primary voice AI channel' },
  { channel: 'Phone (Landline)',      coverage: '41%', before: 38, after: 41, note: '+3pts — used for human agents only' },
  { channel: 'Email',                 coverage: '58%', before: 46, after: 58, note: '+12pts via skip tracing since Day 1' },
  { channel: 'SMS-eligible (consent)',coverage: '68%', before: 61, after: 68, note: 'TCPA-consented subset of cell phones' },
];

// ── Upload flow state machine ─────────────────────────────────────────────────

export default function Portfolio() {
  const [uploadStep, setUploadStep] = useState(null); // null | 'modal' | 'uploading' | 'processing' | 'complete'
  const [selectedFile, setSelectedFile] = useState(null);
  const [processingSteps, setProcessingSteps] = useState({ validation: 'pending', cohorts: 'pending', compliance: 'pending', campaign: 'pending' });
  const [reasoningLines, setReasoningLines] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('accounts');
  const [sortDir, setSortDir] = useState('desc');
  const [expandedCreditor, setExpandedCreditor] = useState(null);
  const [viewBy, setViewBy] = useState('client');
  const [viewDropdownOpen, setViewDropdownOpen] = useState(false);
  const [hoveredCohort, setHoveredCohort] = useState(null);
  const [cohortView, setCohortView] = useState('table'); // 'table' | 'chart'

  const handleFileSelect = (e) => { const f = e.target.files[0]; if (f) setSelectedFile(f); };

  const handleUpload = () => {
    setUploadStep('uploading');
    setTimeout(() => {
      setUploadStep('processing');
      setTimeout(() => {
        setProcessingSteps(p => ({ ...p, validation: 'processing' }));
        setReasoningLines([]);
        const v = ['Validating 3,000 accounts...', '2,847 clean. 153 flagged — 89 missing phone, 42 missing email, 22 duplicate account numbers.', 'Skip tracing initiated for 131 recoverable accounts via TLO.', 'Portfolio composition: Credit Card 58%, Personal Loan 30%, Medical 12%.', 'Average age since charge-off: 11 months. Newer than current batch (14 months).'];
        v.forEach((l, i) => setTimeout(() => setReasoningLines(p => [...p, l]), i * 700));
        setTimeout(() => {
          setProcessingSteps(p => ({ ...p, validation: 'complete', cohorts: 'processing' }));
          setReasoningLines([]);
          const c = ['Creating cohorts...', 'INTELLIGENCE_TRANSFER', '4 cohorts created:'];
          c.forEach((l, i) => setTimeout(() => setReasoningLines(p => [...p, l]), i * 1000));
          setTimeout(() => {
            setProcessingSteps(p => ({ ...p, cohorts: 'complete', compliance: 'processing' }));
            setReasoningLines([]);
            const comp = ['Scanning 3,000 accounts for state-specific rules...', '820 in NY — calling hour restrictions applied.', '540 in CA — California RFDCPA rules applied.', '45 flagged with prior litigation — excluded from voice.', '12 cease-and-desist — excluded from all channels.'];
            comp.forEach((l, i) => setTimeout(() => setReasoningLines(p => [...p, l]), i * 600));
            setTimeout(() => {
              setProcessingSteps(p => ({ ...p, compliance: 'complete', campaign: 'processing' }));
              setReasoningLines([]);
              const cam = ['Proposing campaign plan...', 'Replicating proven strategy from current Apex portfolio.', 'High Prop / High Bal: Settlement SMS Day 1, Voice AI Day 3, Human escalation on engagement.', 'Estimated first-month liquidation: 1.8–2.2%'];
              cam.forEach((l, i) => setTimeout(() => setReasoningLines(p => [...p, l]), i * 800));
              setTimeout(() => { setProcessingSteps(p => ({ ...p, campaign: 'complete' })); setUploadStep('complete'); }, cam.length * 800 + 800);
            }, comp.length * 600 + 800);
          }, c.length * 1000 + 800);
        }, v.length * 700 + 800);
      }, 400);
    }, 900);
  };

  const toggleSort = (col) => {
    if (sortBy === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortBy(col); setSortDir('desc'); }
  };

  const filtered = originalCreditors
    .filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.debtType.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      const va = a[sortBy], vb = b[sortBy];
      return sortDir === 'desc' ? (vb > va ? 1 : -1) : (va > vb ? 1 : -1);
    });

  const SortTh = ({ col, label, align = 'right' }) => (
    <th
      onClick={() => toggleSort(col)}
      className={`py-2.5 px-3 text-xs font-semibold text-gray-600 uppercase tracking-wide cursor-pointer select-none hover:text-gray-900 ${align === 'right' ? 'text-right' : 'text-left'}`}
    >
      {label} {sortBy === col ? (sortDir === 'desc' ? '↓' : '↑') : <span className="text-gray-300">↕</span>}
    </th>
  );

  return (
    <div className="min-h-full bg-gray-50">

      {/* ── TOP: Title + Upload CTA ───────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-200 px-8 py-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Portfolio</h1>
            <p className="text-sm text-gray-500 mt-0.5">Placement file view · Read-only · Apex Recovery Partners</p>
          </div>
          <button
            onClick={() => setUploadStep('modal')}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-lg shadow-sm transition-colors"
            style={{ background: '#4c6ef5' }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Upload Accounts
          </button>
        </div>
      </div>

      <div className="px-8 py-6 space-y-6">

        {/* ── PLACEMENT SUMMARY CARDS ──────────────────────────────────────── */}
        <div className="grid grid-cols-6 gap-4">
          {[
            { label: 'Total Accounts', value: placementMeta.totalRows.toLocaleString(), sub: `From ${placementMeta.uploadedAt.split('·')[0].trim()}`, badge: null },
            { label: 'Clean Accounts', value: placementMeta.cleanRows.toLocaleString(), sub: `${((placementMeta.cleanRows/placementMeta.totalRows)*100).toFixed(1)}% of total`, badge: { className: 'bg-green-50 text-green-700', text: 'Clean' } },
            { label: 'Flagged', value: placementMeta.flaggedRows.toString(), sub: 'Missing contact / duplicate', badge: { className: 'bg-amber-50 text-amber-700', text: 'Review' } },
            { label: 'Total Balance', value: `$${(placementMeta.totalBalance/1000000).toFixed(1)}M`, sub: 'Face value at placement', badge: null },
            { label: 'Avg Balance', value: `$${placementMeta.avgBalance.toLocaleString()}`, sub: 'Across all accounts', badge: null },
            { label: 'Avg CO Age', value: `${placementMeta.avgChargeoffAge} mo`, sub: 'Since charge-off date', badge: null },
          ].map((card, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">{card.label}</div>
              <div className="flex items-baseline gap-1.5">
                <div className="text-2xl font-extrabold text-gray-900">{card.value}</div>
                {card.badge && <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${card.badge.className}`}>{card.badge.text}</span>}
              </div>
              <div className="text-xs text-gray-400 mt-0.5">{card.sub}</div>
            </div>
          ))}
        </div>

        {/* ── BREAKDOWN VIEW ────────────────────────────────────────────────── */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-6 pt-5 pb-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Portfolio Breakdown</h2>
                {/* View By dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setViewDropdownOpen(!viewDropdownOpen)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600 transition-all"
                    style={{ background: '#f8f9fa', border: '1px solid #dee2e6' }}
                  >
                    View by: {viewBy === 'client' ? 'Client' : viewBy === 'debtType' ? 'Debt Type' : 'Ageing'}
                    <span className={`material-symbols-outlined text-xs transition-transform ${viewDropdownOpen ? 'rotate-180' : ''}`} style={{ fontSize: 14 }}>expand_more</span>
                  </button>
                  {viewDropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setViewDropdownOpen(false)} />
                      <div className="absolute top-9 left-0 w-40 rounded-xl shadow-lg z-20 py-1" style={{ background: '#ffffff', border: '1px solid #dee2e6' }}>
                        {[{ id: 'client', label: 'Client' }, { id: 'debtType', label: 'Debt Type' }, { id: 'ageing', label: 'Ageing' }].map(opt => (
                          <button
                            key={opt.id}
                            onClick={() => { setViewBy(opt.id); setViewDropdownOpen(false); setExpandedCreditor(null); }}
                            className={`w-full text-left px-3 py-2 text-xs transition-colors ${viewBy === opt.id ? 'font-semibold text-gray-900' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'}`}
                            style={viewBy === opt.id ? { background: '#f8f9fa' } : {}}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <svg className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="pl-9 pr-4 py-1.5 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none w-36"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── CLIENT VIEW ─────────────────────────────────────────────────── */}
          {viewBy === 'client' && (<>
            {/* Column headers */}
            <div className="grid px-6 py-2.5 border-b border-gray-100" style={{ gridTemplateColumns: '1fr 90px 100px 100px 80px' }}>
              <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Creditor</div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 text-right">Accounts</div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 text-right">Balance</div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 text-right">Collected</div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 text-right">Liq Rate</div>
            </div>
            <div className="divide-y divide-gray-50">
              {filtered.map((c, i) => {
                const isExpanded = expandedCreditor === c.name;
                const cohorts = clientCohorts[c.name] || [];
                return (
                  <div key={i}>
                    {/* Creditor row */}
                    <div
                      onClick={() => { setExpandedCreditor(isExpanded ? null : c.name); setHoveredCohort(null); }}
                      className={`grid items-center px-6 py-3 cursor-pointer transition-colors ${isExpanded ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
                      style={{ gridTemplateColumns: '1fr 90px 100px 100px 80px' }}
                    >
                      <div className="flex items-center gap-2 pr-3 min-w-0">
                        <span className={`material-symbols-outlined text-gray-400 transition-transform flex-shrink-0 ${isExpanded ? 'rotate-90' : ''}`} style={{ fontSize: 14 }}>chevron_right</span>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-gray-900 truncate">{c.name}</span>
                            <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full whitespace-nowrap flex-shrink-0 ${
                              c.debtType === 'Credit Card' ? 'bg-blue-50 text-blue-700' :
                              c.debtType === 'Medical' ? 'bg-red-50 text-red-700' :
                              'bg-purple-50 text-purple-700'
                            }`}>{c.debtType}</span>
                          </div>
                          <div className="text-[10px] text-gray-400 mt-0.5">avg {c.avgChargeoffAge} mo since charge-off</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-gray-900 tabular-nums">{c.accounts.toLocaleString()}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-gray-900 tabular-nums">{c.totalBalance >= 1000000 ? `$${(c.totalBalance/1000000).toFixed(1)}M` : `$${(c.totalBalance/1000).toFixed(0)}K`}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-gray-900 tabular-nums">${c.collected.toLocaleString()}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-gray-900 tabular-nums">{c.liquidationRate}%</div>
                        <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${
                          c.status === 'above' ? 'bg-emerald-50 text-emerald-700' :
                          c.status === 'on-target' ? 'bg-blue-50 text-blue-700' :
                          'bg-amber-50 text-amber-700'
                        }`}>
                          {c.status === 'above' ? '↑ Above' : c.status === 'on-target' ? 'On target' : '↓ Below'}
                        </span>
                      </div>
                    </div>

                    {/* Expanded: cohort breakdown */}
                    {isExpanded && cohorts.length > 0 && (() => {
                      const totalCollected = cohorts.reduce((s, ch) => s + ch.collected, 0);
                      const maxCohortCollected = Math.max(...cohorts.map(ch => ch.collected));
                      return (
                      <div className="animate-fadeIn" style={{ background: '#f8f9fa' }}>
                        {/* Toggle: Table / Chart */}
                        <div className="flex items-center justify-between px-6 py-2 ml-6" style={{ borderBottom: '1px solid #f3f4f6' }}>
                          <div className="text-[9px] font-bold uppercase tracking-wider text-gray-400">{cohorts.length} cohorts</div>
                          <div className="flex items-center rounded-lg overflow-hidden" style={{ border: '1px solid #dee2e6' }}>
                            <button
                              onClick={(e) => { e.stopPropagation(); setCohortView('table'); }}
                              className={`px-2.5 py-1 text-[10px] font-medium transition-all ${cohortView === 'table' ? 'text-white' : 'text-gray-500'}`}
                              style={cohortView === 'table' ? { background: '#4c6ef5' } : {}}
                            >
                              <span className="material-symbols-outlined" style={{ fontSize: 12 }}>table_rows</span>
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); setCohortView('chart'); }}
                              className={`px-2.5 py-1 text-[10px] font-medium transition-all ${cohortView === 'chart' ? 'text-white' : 'text-gray-500'}`}
                              style={cohortView === 'chart' ? { background: '#4c6ef5' } : {}}
                            >
                              <span className="material-symbols-outlined" style={{ fontSize: 12 }}>bar_chart</span>
                            </button>
                          </div>
                        </div>

                        {cohortView === 'table' ? (
                          <>
                            {/* Table sub-header */}
                            <div className="grid px-6 py-1.5 ml-6" style={{ gridTemplateColumns: '1fr 80px 80px 70px 60px 80px', borderBottom: '1px solid #f3f4f6' }}>
                              <div className="text-[9px] font-bold uppercase tracking-wider text-gray-400">Cohort</div>
                              <div className="text-[9px] font-bold uppercase tracking-wider text-gray-400 text-right">Collected</div>
                              <div className="text-[9px] font-bold uppercase tracking-wider text-gray-400 text-right">% Share</div>
                              <div className="text-[9px] font-bold uppercase tracking-wider text-gray-400 text-right">Liq Rate</div>
                              <div className="text-[9px] font-bold uppercase tracking-wider text-gray-400 text-right">Age</div>
                              <div className="text-[9px] font-bold uppercase tracking-wider text-gray-400 text-center">Channels</div>
                            </div>
                            {cohorts.map((ch, j) => {
                              const collPct = Math.round((ch.collected / totalCollected) * 100);
                              const isHovered = hoveredCohort === `${c.name}-${j}`;
                              const someHovered = hoveredCohort && hoveredCohort.startsWith(c.name);
                              const dimmed = someHovered && !isHovered;
                              return (
                                <div
                                  key={j}
                                  onMouseEnter={() => setHoveredCohort(`${c.name}-${j}`)}
                                  onMouseLeave={() => setHoveredCohort(null)}
                                  className={`grid items-center px-6 py-2 ml-6 transition-all ${isHovered ? 'bg-white' : ''}`}
                                  style={{ gridTemplateColumns: '1fr 80px 80px 70px 60px 80px', opacity: dimmed ? 0.25 : 1, borderBottom: '1px solid #f3f4f6' }}
                                >
                                  <div className="min-w-0">
                                    <div className="flex items-center gap-2">
                                      <span className={`text-xs font-medium ${isHovered ? 'text-gray-900' : 'text-gray-700'}`}>{ch.cohort}</span>
                                      <span className={`text-[8px] font-semibold px-1 py-0.5 rounded flex-shrink-0 ${
                                        ch.debtType === 'Credit Card' ? 'bg-blue-50 text-blue-600' :
                                        ch.debtType === 'Medical' ? 'bg-red-50 text-red-600' :
                                        'bg-purple-50 text-purple-600'
                                      }`}>{ch.debtType}</span>
                                    </div>
                                    <div className="text-[10px] text-gray-400">{ch.accounts.toLocaleString()} accounts · ${ch.avgBal.toLocaleString()} avg</div>
                                  </div>
                                  <div className="text-right">
                                    <span className={`text-xs font-bold tabular-nums ${isHovered ? 'text-gray-900' : 'text-gray-600'}`}>${(ch.collected/1000).toFixed(0)}K</span>
                                  </div>
                                  <div className="text-right">
                                    <span className={`text-[11px] font-bold tabular-nums ${isHovered ? 'text-gray-900' : 'text-gray-500'}`}>{collPct}%</span>
                                  </div>
                                  <div className="text-right">
                                    <span className={`text-xs font-bold tabular-nums ${isHovered ? 'text-gray-900' : 'text-gray-600'}`}>{ch.liqRate}%</span>
                                  </div>
                                  <div className="text-right">
                                    <span className="text-xs text-gray-500 tabular-nums">{ch.debtAge}</span>
                                  </div>
                                  <div className="flex gap-0.5 justify-center">
                                    {ch.channels.map(chan => (
                                      <span key={chan} className={`text-[7px] font-semibold px-1 py-0.5 rounded ${
                                        chan === 'Voice' ? 'bg-emerald-50 text-emerald-700' :
                                        chan === 'SMS' ? 'bg-blue-50 text-blue-700' :
                                        chan === 'Email' ? 'bg-purple-50 text-purple-700' :
                                        'bg-amber-50 text-amber-700'
                                      }`}>{chan}</span>
                                    ))}
                                  </div>
                                </div>
                              );
                            })}
                          </>
                        ) : (
                          /* Chart view: dual bars — collected + liq rate */
                          <div className="px-6 py-3 ml-6">
                            <div className="flex items-center gap-4 mb-3">
                              <div className="flex items-center gap-1.5"><span className="w-3 h-2 rounded-sm" style={{ background: '#4c6ef5' }} /><span className="text-[9px] text-gray-400">Collected ($)</span></div>
                              <div className="flex items-center gap-1.5"><span className="w-3 h-2 rounded-sm" style={{ background: '#868e96' }} /><span className="text-[9px] text-gray-400">Liq Rate (%)</span></div>
                            </div>
                            {cohorts.map((ch, j) => {
                              const collPct = (ch.collected / totalCollected) * 100;
                              const maxLiq = Math.max(...cohorts.map(x => x.liqRate));
                              const liqBarPct = (ch.liqRate / maxLiq) * 100;
                              const isHovered = hoveredCohort === `${c.name}-${j}`;
                              const someHovered = hoveredCohort && hoveredCohort.startsWith(c.name);
                              const dimmed = someHovered && !isHovered;
                              return (
                                <div
                                  key={j}
                                  onMouseEnter={() => setHoveredCohort(`${c.name}-${j}`)}
                                  onMouseLeave={() => setHoveredCohort(null)}
                                  className="transition-all cursor-pointer py-1.5"
                                  style={{ opacity: dimmed ? 0.25 : 1, borderTop: j > 0 ? '1px solid #f3f4f6' : 'none' }}
                                >
                                  <div className="flex items-center justify-between mb-1.5">
                                    <div className="flex items-center gap-2">
                                      <span className={`text-[11px] font-semibold ${isHovered ? 'text-gray-900' : 'text-gray-700'}`}>{ch.cohort}</span>
                                      <span className={`text-[8px] font-semibold px-1 py-0.5 rounded flex-shrink-0 ${
                                        ch.debtType === 'Credit Card' ? 'bg-blue-50 text-blue-600' :
                                        ch.debtType === 'Medical' ? 'bg-red-50 text-red-600' :
                                        'bg-purple-50 text-purple-600'
                                      }`}>{ch.debtType}</span>
                                      <span className="text-[10px] text-gray-400">{ch.debtAge}</span>
                                    </div>
                                  </div>
                                  {/* Collected bar */}
                                  <div className="flex items-center gap-2 mb-1">
                                    <div className="flex-1 h-3 rounded" style={{ background: '#edf2ff' }}>
                                      <div className="h-3 rounded" style={{ width: `${collPct}%`, background: isHovered ? '#4c6ef5' : '#4c6ef580', minWidth: '4px' }} />
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-700 tabular-nums w-12 text-right">${(ch.collected/1000).toFixed(0)}K</span>
                                  </div>
                                  {/* Liq rate bar */}
                                  <div className="flex items-center gap-2">
                                    <div className="flex-1 h-3 rounded" style={{ background: '#e9ecef' }}>
                                      <div className="h-3 rounded" style={{ width: `${liqBarPct}%`, background: isHovered ? '#868e96' : '#868e9680', minWidth: '4px' }} />
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-700 tabular-nums w-12 text-right">{ch.liqRate}%</span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                      );
                    })()}
                  </div>
                );
              })}
            </div>
            {/* Footer */}
            <div className="grid px-6 py-3 border-t-2" style={{ gridTemplateColumns: '1fr 90px 100px 100px 80px', borderColor: '#dee2e6', backgroundColor: '#f8f9fa' }}>
              <div className="text-xs font-bold text-gray-900 pl-5">Total · {filtered.length} creditors</div>
              <div className="text-right text-xs font-bold text-gray-900 tabular-nums">{originalCreditors.reduce((s,c)=>s+c.accounts,0).toLocaleString()}</div>
              <div className="text-right text-xs font-bold text-gray-900 tabular-nums">${(originalCreditors.reduce((s,c)=>s+c.totalBalance,0)/1000000).toFixed(1)}M</div>
              <div className="text-right text-xs font-bold text-gray-900 tabular-nums">${originalCreditors.reduce((s,c)=>s+c.collected,0).toLocaleString()}</div>
              <div className="text-right text-xs font-bold text-gray-900 tabular-nums">2.7%</div>
            </div>
          </>)}

          {/* ── DEBT TYPE VIEW ────────────────────────────────────────────────── */}
          {viewBy === 'debtType' && (<>
            <div className="divide-y divide-gray-50">
              {['Credit Card', 'Personal Loan', 'Medical'].map(dt => {
                const creditors = originalCreditors.filter(c => c.debtType === dt);
                const totalAccounts = creditors.reduce((s,c) => s+c.accounts, 0);
                const totalCollected = creditors.reduce((s,c) => s+c.collected, 0);
                const totalBalance = creditors.reduce((s,c) => s+c.totalBalance, 0);
                const avgLiq = creditors.reduce((s,c) => s+c.liquidationRate*c.accounts, 0) / totalAccounts;
                const isExpanded = expandedCreditor === dt;
                return (
                  <div key={dt}>
                    <div
                      onClick={() => setExpandedCreditor(isExpanded ? null : dt)}
                      className={`flex items-center px-6 py-4 cursor-pointer transition-colors ${isExpanded ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
                    >
                      <span className={`material-symbols-outlined text-gray-400 transition-transform mr-3 ${isExpanded ? 'rotate-90' : ''}`} style={{ fontSize: 14 }}>chevron_right</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-sm font-bold text-gray-900">{dt}</span>
                          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                            dt === 'Credit Card' ? 'bg-blue-100 text-blue-700' :
                            dt === 'Medical' ? 'bg-red-100 text-red-700' :
                            'bg-purple-100 text-purple-700'
                          }`}>{creditors.length} creditors</span>
                        </div>
                        <div className="text-xs text-gray-400">{totalAccounts.toLocaleString()} accounts · ${(totalBalance/1000000).toFixed(1)}M balance</div>
                      </div>
                      <div className="flex items-center gap-6 flex-shrink-0">
                        <div className="text-right">
                          <div className="text-sm font-bold text-gray-900 tabular-nums">${totalCollected.toLocaleString()}</div>
                          <div className="text-[10px] text-gray-400">collected</div>
                        </div>
                        <div className="text-right w-16">
                          <div className="text-lg font-bold text-gray-900 tabular-nums">{avgLiq.toFixed(1)}%</div>
                          <div className="text-[10px] text-gray-400">avg liq</div>
                        </div>
                      </div>
                    </div>
                    {isExpanded && (
                      <div className="px-6 pb-4 animate-fadeIn" style={{ background: '#f8f9fa' }}>
                        <div className="ml-5 pl-4 space-y-0" style={{ borderLeft: '2px solid #dee2e6' }}>
                          {creditors.map((cr, j) => (
                            <div key={j} className="flex items-center gap-4 py-2.5" style={{ borderTop: j > 0 ? '1px solid #f3f4f6' : 'none' }}>
                              <div className="w-40"><div className="text-xs font-medium text-gray-800">{cr.name}</div><div className="text-[10px] text-gray-400">{cr.accounts.toLocaleString()} accounts</div></div>
                              <div className="flex-1 text-xs text-gray-500">Contact {cr.contactRate}% · PTP {cr.ptpRate}%</div>
                              <div className="text-right w-20"><div className="text-sm font-bold text-gray-900 tabular-nums">{cr.liquidationRate}%</div></div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>)}

          {/* ── AGEING VIEW ──────────────────────────────────────────────────── */}
          {viewBy === 'ageing' && (<>
            <div className="grid px-6 py-2 border-b border-gray-100" style={{ gridTemplateColumns: '140px 1fr 80px 80px 80px' }}>
              <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Age Bucket</div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Accounts · Balance</div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 text-right">Liq Rate</div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 text-right">Contact</div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 text-right">Notes</div>
            </div>
            <div className="divide-y divide-gray-50">
              {ageingBuckets.map((b, i) => {
                const pct = (b.accounts / 12000) * 100;
                return (
                  <div key={i} className="grid items-center px-6 py-3.5 hover:bg-gray-50" style={{ gridTemplateColumns: '140px 1fr 80px 80px 80px' }}>
                    <div className="text-sm font-semibold text-gray-900">{b.label}</div>
                    <div className="px-1">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-5 rounded" style={{ backgroundColor: '#edf2ff' }}>
                          <div className="h-5 rounded flex items-center px-2" style={{ width: `${pct}%`, backgroundColor: '#4c6ef5', minWidth: '40px' }}>
                            <span className="text-[10px] font-semibold text-white whitespace-nowrap">{b.accounts.toLocaleString()}</span>
                          </div>
                        </div>
                        <span className="text-xs text-gray-400 tabular-nums flex-shrink-0 w-14 text-right">${(b.balance/1000000).toFixed(1)}M</span>
                      </div>
                    </div>
                    <div className="text-right"><div className="text-sm font-bold text-gray-900 tabular-nums">{b.liqRate}%</div></div>
                    <div className="text-right"><div className="text-sm text-gray-600 tabular-nums">{b.contactRate}%</div></div>
                    <div className="text-right"><div className="text-[10px] text-gray-400">{b.note.split(',')[0]}</div></div>
                  </div>
                );
              })}
            </div>
          </>)}
        </div>

        {/* ── PORTFOLIO COMPOSITION ────────────────────────────────────────── */}
        <div className="grid grid-cols-3 gap-5">
          {/* Debt type */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">Debt Type Mix</h3>
            <div className="space-y-3">
              {placementMeta.debtTypes.map((d, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-700">{d.type}</span>
                    <span className="font-bold text-gray-900">{d.pct}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full" style={{ backgroundColor: '#e5e7eb' }}>
                    <div className="h-2 rounded-full" style={{ width: `${d.pct}%`, backgroundColor: ['#4c6ef5','#ef4444','#8b5cf6'][i] }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* State distribution */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">State Distribution</h3>
            <div className="space-y-3">
              {placementMeta.topStates.map((s, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-700">{s.state}</span>
                    <span className="font-bold text-gray-900">{s.pct}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full" style={{ backgroundColor: '#e5e7eb' }}>
                    <div className="h-2 rounded-full" style={{ width: `${s.pct}%`, backgroundColor: i === 5 ? '#9ca3af' : '#4c6ef5' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prior placements + data quality */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">Prior Placement History</h3>
            <div className="space-y-3 mb-5">
              {placementMeta.priorPlacement.map((p, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-700">{p.label}</span>
                    <span className="font-bold text-gray-900">{p.pct}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full" style={{ backgroundColor: '#e5e7eb' }}>
                    <div className="h-2 rounded-full" style={{ width: `${p.pct}%`, backgroundColor: ['#10b981','#f59e0b','#ef4444'][i] }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t border-gray-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Data Quality</h3>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-lg p-2" style={{ backgroundColor: '#f8f9fa' }}>
                  <div className="text-lg font-bold text-gray-900">{placementMeta.cleanRows.toLocaleString()}</div>
                  <div className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-green-50 text-green-700 inline-block">Clean</div>
                </div>
                <div className="rounded-lg p-2 bg-amber-50">
                  <div className="text-lg font-bold text-gray-900">{placementMeta.flaggedRows}</div>
                  <div className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-700 inline-block">Flagged</div>
                </div>
                <div className="rounded-lg p-2 bg-blue-50">
                  <div className="text-lg font-bold text-gray-900">878</div>
                  <div className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-700 inline-block">Enriched</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── CONTACT COVERAGE ─────────────────────────────────────────────── */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Contact Info Coverage</h2>
          <div className="space-y-4">
            {contactCoverage.map((c, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-gray-800">{c.channel}</span>
                  <span className="text-xs text-gray-400">{c.note}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="text-[10px] text-gray-400 mb-0.5">At placement ({c.before}%)</div>
                    <div className="w-full h-2 rounded-full" style={{ backgroundColor: '#e5e7eb' }}>
                      <div className="h-2 rounded-full bg-gray-300" style={{ width: `${c.before}%` }} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] mb-0.5" style={{ color: '#4c6ef5' }}>Now ({c.after}%)</div>
                    <div className="w-full h-2 rounded-full" style={{ backgroundColor: '#e5e7eb' }}>
                      <div className="h-2 rounded-full" style={{ width: `${c.after}%`, backgroundColor: '#4c6ef5' }} />
                    </div>
                  </div>
                  <div className="w-16 text-right"><span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-green-50 text-green-700">+{c.after - c.before}pts</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── UPLOAD MODAL ─────────────────────────────────────────────────────── */}
      {uploadStep === 'modal' && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Upload Accounts File</h2>
                <p className="text-sm text-gray-600 mt-1">CSV or Excel · Analyst will validate, model, and plan automatically</p>
              </div>
              <button onClick={() => { setUploadStep(null); setSelectedFile(null); }} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-6">
              {!selectedFile ? (
                <label className="block cursor-pointer">
                  <input type="file" accept=".csv,.xlsx,.xls" onChange={handleFileSelect} className="hidden" />
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-400 hover:bg-blue-50/50 transition-all">
                    <svg className="w-14 h-14 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-base font-medium text-gray-900 mb-1">Drop file here or click to browse</p>
                    <p className="text-sm text-gray-500">CSV, Excel (.xlsx, .xls)</p>
                  </div>
                </label>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                    <svg className="w-10 h-10 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{selectedFile.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{(selectedFile.size / 1024).toFixed(1)} KB</p>
                    </div>
                    <button onClick={() => setSelectedFile(null)} className="text-gray-400 hover:text-gray-600">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                    <p className="text-xs font-semibold text-gray-900 mb-3">What happens next:</p>
                    <ol className="space-y-2 text-xs text-gray-700">
                      {[['blue','Analyst','validates data quality, contact completeness, runs skip tracing'],
                        ['blue','Analyst','creates cohorts using learnings from current Apex portfolio'],
                        ['red','Auditor','scans for state-specific rules and account restrictions'],
                        ['purple','Manager','designs campaign strategy and channel allocation'],
                        ['green','You','review and approve in Approvals before go-live']].map(([color,agent,action],j) => (
                        <li key={j} className="flex items-start gap-2">
                          <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full bg-${color}-100 text-${color}-700 font-semibold flex-shrink-0 text-xs`}>{j+1}</span>
                          <span><strong>{agent}</strong> {action}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                  <button onClick={handleUpload} className="w-full px-6 py-3 text-white text-sm font-semibold rounded-lg" style={{ background: '#4c6ef5' }}>
                    Process File
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── PROCESSING MODAL ─────────────────────────────────────────────────── */}
      {(uploadStep === 'uploading' || uploadStep === 'processing' || uploadStep === 'complete') && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center p-8 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full my-8">
            <div className="sticky top-0 bg-white border-b border-gray-200 rounded-t-xl p-6 z-10 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Processing New Placement</h2>
                <p className="text-sm text-gray-600 mt-1">Agents are analyzing your file</p>
              </div>
              {uploadStep === 'complete' && (
                <button onClick={() => setUploadStep(null)} className="text-gray-400 hover:text-gray-600">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              )}
            </div>

            <div className="p-6 space-y-5">
              {uploadStep === 'uploading' && (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="w-14 h-14 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-sm font-semibold text-gray-900">Uploading file...</p>
                  </div>
                </div>
              )}

              {(uploadStep === 'processing' || uploadStep === 'complete') && (
                <>
                  {['validation','cohorts','compliance','campaign'].map((step, si) => {
                    const s = processingSteps[step];
                    const labels = { validation: ['Analyst','Validation & Cleaning','blue'], cohorts: ['Analyst','Cohort Creation','blue'], compliance: ['Auditor','Pre-scan','red'], campaign: ['Manager','Campaign Plan','purple'] };
                    const [agent, desc, color] = labels[step];
                    if (s === 'pending') return null;
                    return (
                      <div key={step} className={`rounded-lg p-5 border ${s === 'complete' ? 'border-gray-200 bg-gray-50' : `border-${color}-300 bg-white shadow-md`}`}>
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`inline-block w-2 h-2 rounded-full bg-${color}-500`} />
                          <span className="text-sm font-semibold text-gray-900">{agent}</span>
                          <span className="text-xs text-gray-500">— {desc}</span>
                          {s === 'complete'
                            ? <svg className="w-4 h-4 text-green-500 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
                            : <div className={`w-4 h-4 border-2 border-${color}-200 border-t-${color}-600 rounded-full animate-spin ml-auto`} />}
                        </div>
                        {s === 'processing' && (
                          <div className="space-y-1 text-xs text-gray-600 leading-relaxed min-h-[60px]">
                            {reasoningLines.map((line, ri) => (
                              line === 'INTELLIGENCE_TRANSFER'
                                ? <p key={ri} className="bg-green-50 border-l-2 border-green-500 pl-2 py-1 font-medium text-gray-700">Identified 580 accounts matching High Prop / High Bal from current portfolio — replicating proven strategy.</p>
                                : <p key={ri}>{line}</p>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {uploadStep === 'complete' && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span className="text-sm font-semibold text-green-900">Processing Complete</span>
                      </div>
                      <p className="text-sm text-green-800 mb-4">3,000 accounts validated, 4 cohorts created, campaign plan ready. 3 items sent to Approvals for your review before go-live.</p>
                      <button className="w-full px-4 py-2.5 text-white text-sm font-semibold rounded-lg" style={{ background: '#4c6ef5' }}>
                        Go to Approvals →
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
