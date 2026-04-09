import { useState } from 'react';

// ── Mock data: Original Creditors ─────────────────────────────────────────────

const originalCreditors = [
  {
    name: 'Chase Bank',
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
    name: 'Synchrony Financial',
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
    name: 'Avant LLC',
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
    name: 'LendingClub',
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
    name: 'Envision Healthcare',
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
    name: 'LifePoint Health',
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

      {/* ── TOP: Search + Upload ─────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-200 px-8 py-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Portfolio</h1>
            <p className="text-sm text-gray-500 mt-0.5">Placement file view · Read-only · Apex Recovery Partners</p>
          </div>
          <button
            onClick={() => setUploadStep('modal')}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-lg shadow-sm transition-colors"
            style={{ background: 'linear-gradient(135deg, #2196af, #1a7a96)' }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Upload New Placement
          </button>
        </div>

        {/* Current placement file banner */}
        <div className="flex items-center gap-4 px-4 py-3 rounded-lg" style={{ backgroundColor: '#f0faf8', border: '1px solid #d4eae5' }}>
          <svg className="w-8 h-8 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-gray-900">{placementMeta.fileName}</div>
            <div className="text-xs text-gray-500 mt-0.5">Uploaded {placementMeta.uploadedAt} · {placementMeta.uploadedBy}</div>
          </div>
          <div className="flex items-center gap-5 text-xs text-gray-600">
            <div><span className="text-gray-400">Total rows</span><br /><span className="font-bold text-gray-900">{placementMeta.totalRows.toLocaleString()}</span></div>
            <div><span className="text-gray-400">Clean</span><br /><span className="font-bold text-green-700">{placementMeta.cleanRows.toLocaleString()}</span></div>
            <div><span className="text-gray-400">Flagged</span><br /><span className="font-bold text-amber-600">{placementMeta.flaggedRows}</span></div>
            <div><span className="text-gray-400">Total balance</span><br /><span className="font-bold text-gray-900">${(placementMeta.totalBalance / 1000000).toFixed(1)}M</span></div>
            <div><span className="text-gray-400">Avg balance</span><br /><span className="font-bold text-gray-900">${placementMeta.avgBalance.toLocaleString()}</span></div>
            <div><span className="text-gray-400">Avg CO age</span><br /><span className="font-bold text-gray-900">{placementMeta.avgChargeoffAge} mo</span></div>
          </div>
        </div>
      </div>

      <div className="px-8 py-6 space-y-6">

        {/* ── ORIGINAL CREDITOR BREAKDOWN — horizontal bar view ────────────── */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-6 pt-5 pb-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Original Creditor Breakdown</h2>
                <p className="text-xs text-gray-400 mt-0.5">Accounts and collections by original creditor — from placement file</p>
              </div>
              <div className="flex items-center gap-3">
                {/* Legend */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5"><span className="w-3 h-2.5 rounded-sm inline-block" style={{ backgroundColor: '#2196af' }} /><span className="text-xs text-gray-500">Accounts</span></div>
                  <div className="flex items-center gap-1.5"><span className="w-3 h-2.5 rounded-sm inline-block" style={{ backgroundColor: '#f59e0b' }} /><span className="text-xs text-gray-500">Collected</span></div>
                </div>
                {/* Search */}
                <div className="relative">
                  <svg className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search creditor..."
                    className="pl-9 pr-4 py-1.5 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none w-44"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Column headers */}
          <div className="grid px-6 py-2 border-b border-gray-100" style={{ gridTemplateColumns: '180px 90px 1fr 90px' }}>
            <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Creditor</div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Debt Type</div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 pl-1">Accounts · Collected</div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 text-right">Liq Rate · Status</div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-gray-50">
            {(() => {
              const maxAccounts = Math.max(...originalCreditors.map(c => c.accounts));
              const maxCollected = Math.max(...originalCreditors.map(c => c.collected));
              return filtered.map((c, i) => {
                const accPct = (c.accounts / maxAccounts) * 100;
                const colPct = (c.collected / maxCollected) * 100;
                return (
                  <div key={i} className="grid items-center px-6 py-3.5 hover:bg-gray-50 transition-colors" style={{ gridTemplateColumns: '180px 90px 1fr 90px' }}>
                    {/* A: Creditor name */}
                    <div className="pr-3">
                      <div className="text-sm font-semibold text-gray-900 leading-tight truncate">{c.name}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5 tabular-nums">{c.totalBalance >= 1000000 ? `$${(c.totalBalance/1000000).toFixed(1)}M` : `$${(c.totalBalance/1000).toFixed(0)}K`} total balance</div>
                    </div>

                    {/* B: Debt type badge */}
                    <div>
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full whitespace-nowrap ${
                        c.debtType === 'Credit Card' ? 'bg-blue-100 text-blue-700' :
                        c.debtType === 'Medical' ? 'bg-red-100 text-red-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>{c.debtType}</span>
                    </div>

                    {/* C + G: Horizontal bars for accounts and collected */}
                    <div className="px-1 space-y-1.5">
                      {/* Accounts bar */}
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-5 rounded" style={{ backgroundColor: '#e8f4f8' }}>
                          <div
                            className="h-5 rounded flex items-center px-2"
                            style={{ width: `${accPct}%`, backgroundColor: '#2196af', minWidth: '32px' }}
                          >
                            <span className="text-[10px] font-semibold text-white whitespace-nowrap">{c.accounts.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      {/* Collected bar */}
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-5 rounded" style={{ backgroundColor: '#fef3cd' }}>
                          <div
                            className="h-5 rounded flex items-center px-2"
                            style={{ width: `${colPct}%`, backgroundColor: '#f59e0b', minWidth: '52px' }}
                          >
                            <span className="text-[10px] font-semibold text-white whitespace-nowrap">${c.collected.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* H + K: Liq rate + status */}
                    <div className="pl-3 text-right">
                      <div className={`text-lg font-extrabold tabular-nums leading-tight ${
                        c.liquidationRate >= 3 ? 'text-green-600' :
                        c.liquidationRate >= 2 ? 'text-blue-600' :
                        'text-amber-600'
                      }`}>{c.liquidationRate}%</div>
                      <div className="text-[9px] text-gray-400 mb-1">liq rate</div>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                        c.status === 'above' ? 'bg-green-100 text-green-700' :
                        c.status === 'on-target' ? 'bg-blue-100 text-blue-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {c.status === 'above' ? '↑ Above' : c.status === 'on-target' ? '✓ On target' : '↓ Below'}
                      </span>
                    </div>
                  </div>
                );
              });
            })()}
          </div>

          {/* Totals footer */}
          <div className="grid px-6 py-3 border-t-2" style={{ gridTemplateColumns: '180px 90px 1fr 90px', borderColor: '#d4eae5', backgroundColor: '#f8fcfb' }}>
            <div className="text-xs font-bold text-gray-900">Total · 6 creditors</div>
            <div />
            <div className="px-1 space-y-1">
              <div className="text-xs text-gray-500 tabular-nums"><span className="font-bold text-gray-900">{originalCreditors.reduce((s,c)=>s+c.accounts,0).toLocaleString()}</span> accounts</div>
              <div className="text-xs text-gray-500 tabular-nums"><span className="font-bold text-gray-900">${originalCreditors.reduce((s,c)=>s+c.collected,0).toLocaleString()}</span> collected</div>
            </div>
            <div className="pl-3 text-right">
              <div className="text-lg font-extrabold tabular-nums" style={{ color: '#2196af' }}>2.7%</div>
              <div className="text-[9px] text-gray-400">portfolio avg</div>
            </div>
          </div>
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
                    <div className="h-2 rounded-full" style={{ width: `${d.pct}%`, backgroundColor: ['#2196af','#ef4444','#8b5cf6'][i] }} />
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
                    <div className="h-2 rounded-full" style={{ width: `${s.pct}%`, backgroundColor: i === 5 ? '#9ca3af' : '#2196af' }} />
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
                    <div className="h-2 rounded-full" style={{ width: `${p.pct}%`, backgroundColor: ['#61ab5e','#f59e0b','#ef4444'][i] }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t border-gray-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Data Quality</h3>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-lg p-2" style={{ backgroundColor: '#f0faf8' }}>
                  <div className="text-lg font-bold text-green-700">{placementMeta.cleanRows.toLocaleString()}</div>
                  <div className="text-[10px] text-gray-500">Clean</div>
                </div>
                <div className="rounded-lg p-2 bg-amber-50">
                  <div className="text-lg font-bold text-amber-700">{placementMeta.flaggedRows}</div>
                  <div className="text-[10px] text-gray-500">Flagged</div>
                </div>
                <div className="rounded-lg p-2 bg-blue-50">
                  <div className="text-lg font-bold text-blue-700">878</div>
                  <div className="text-[10px] text-gray-500">Enriched</div>
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
                    <div className="text-[10px] mb-0.5" style={{ color: '#2196af' }}>Now ({c.after}%)</div>
                    <div className="w-full h-2 rounded-full" style={{ backgroundColor: '#e5e7eb' }}>
                      <div className="h-2 rounded-full" style={{ width: `${c.after}%`, backgroundColor: '#2196af' }} />
                    </div>
                  </div>
                  <div className="text-xs font-bold text-green-600 w-12 text-right">+{c.after - c.before}pts</div>
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
                <h2 className="text-lg font-semibold text-gray-900">Upload New Placement File</h2>
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
                  <button onClick={handleUpload} className="w-full px-6 py-3 text-white text-sm font-semibold rounded-lg" style={{ background: 'linear-gradient(135deg, #2196af, #1a7a96)' }}>
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
                      <button className="w-full px-4 py-2.5 text-white text-sm font-semibold rounded-lg" style={{ background: 'linear-gradient(135deg, #2196af, #1a7a96)' }}>
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
