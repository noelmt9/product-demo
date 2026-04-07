import { useState } from 'react';
import { portfolioData } from '../data';
import { Section } from './shared';

const cohortAllocationData = [
  {
    name: "High propensity / Low balance",
    total: 2400,
    remaining: 1680,
    resolved: 720,
    penetration: 30,
    remainingValue: "$2.0M",
    strategy: "Digital-only (SMS + Email)",
    runway: "~8 weeks",
    status: "healthy"
  },
  {
    name: "High propensity / High balance",
    total: 1800,
    remaining: 684,
    resolved: 1116,
    penetration: 62,
    remainingValue: "$3.1M",
    strategy: "Settlement SMS + Voice follow-up",
    runway: "~2 weeks",
    status: "depleting",
    alert: "Best-performing cohort nearing depletion"
  },
  {
    name: "Medium propensity / All balances",
    total: 4200,
    remaining: 2730,
    resolved: 1470,
    penetration: 35,
    remainingValue: "$7.1M",
    strategy: "Multi-channel blitz",
    runway: "~6 weeks",
    status: "healthy"
  },
  {
    name: "Low propensity / Low balance",
    total: 2100,
    remaining: 1260,
    resolved: 840,
    penetration: 40,
    remainingValue: "$1.1M",
    strategy: "Low-touch digital",
    runway: "~12 weeks",
    status: "healthy"
  },
  {
    name: "Low propensity / High balance",
    total: 1500,
    remaining: 975,
    resolved: 525,
    penetration: 35,
    remainingValue: "$5.1M",
    strategy: "Human agent priority",
    runway: "~5 weeks",
    status: "healthy"
  }
];

export default function Portfolio() {
  const [uploadStep, setUploadStep] = useState(null); // null, 'upload', 'uploading', 'processing', 'complete'
  const [selectedFile, setSelectedFile] = useState(null);
  const [processingSteps, setProcessingSteps] = useState({
    validation: 'pending',
    cohorts: 'pending',
    compliance: 'pending',
    campaign: 'pending'
  });
  const [reasoningLines, setReasoningLines] = useState([]);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    setUploadStep('uploading');

    // Simulate upload
    setTimeout(() => {
      setUploadStep('processing');

      // Analyst Validation - Progressive reasoning
      setTimeout(() => {
        setProcessingSteps(prev => ({ ...prev, validation: 'processing' }));
        setReasoningLines([]);

        const validationLines = [
          'Validating 3,000 accounts...',
          '2,847 clean. 153 flagged — 89 missing phone, 42 missing email, 22 duplicate account numbers.',
          'Skip tracing initiated for 131 recoverable accounts via TLO.',
          'Portfolio composition: Credit Card 58%, Personal Loan 30%, Medical 12%.',
          'Balance distribution: 24% under $1K, 38% $1-3K, 25% $3-5K, 13% $5K+. Skews higher than current Apex portfolio.',
          'Average age since charge-off: 11 months. Newer than current batch (14 months).'
        ];

        validationLines.forEach((line, idx) => {
          setTimeout(() => {
            setReasoningLines(prev => [...prev, line]);
          }, idx * 800);
        });

        setTimeout(() => {
          setProcessingSteps(prev => ({ ...prev, validation: 'complete', cohorts: 'processing' }));
          setReasoningLines([]);

          // Analyst Cohorts - Progressive reasoning
          const cohortLines = [
            'Creating cohorts... applying learnings from existing Apex portfolio...',
            'INTELLIGENCE_TRANSFER',
            '4 cohorts created:'
          ];

          cohortLines.forEach((line, idx) => {
            setTimeout(() => {
              setReasoningLines(prev => [...prev, line]);
            }, idx * 1200);
          });

          setTimeout(() => {
            setProcessingSteps(prev => ({ ...prev, cohorts: 'complete', compliance: 'processing' }));
            setReasoningLines([]);

            // Compliance - Progressive reasoning
            const complianceLines = [
              'Scanning state distribution for 3,000 accounts...',
              '820 accounts in NY — NY calling hour restrictions and state-specific rules auto-configured.',
              '540 accounts in CA — California RFDCPA rules applied.',
              '45 accounts flagged with prior litigation — excluded from outbound voice per FDCPA best practice.',
              '12 accounts in cease-and-desist status — excluded from all contact channels.',
              'Guardrails configured for 8 states: NY, TX, CA, FL, IL, PA, OH, GA.'
            ];

            complianceLines.forEach((line, idx) => {
              setTimeout(() => {
                setReasoningLines(prev => [...prev, line]);
              }, idx * 700);
            });

            setTimeout(() => {
              setProcessingSteps(prev => ({ ...prev, compliance: 'complete', campaign: 'processing' }));
              setReasoningLines([]);

              // Manager Campaign - Progressive reasoning
              const campaignLines = [
                'Proposing campaign plan for new placement...',
                'Replicating successful strategy from current Apex portfolio with adjustments for new batch composition.',
                'High Prop / High Bal (580 accounts): Settlement SMS Day 1, Voice AI follow-up Day 3, Human agent escalation on engagement. Proven approach — current portfolio showing 40% improvement with this strategy.',
                'High Prop / Low Bal (720 accounts): SMS 3x/week, Email 2x/week. Low balance doesn\'t justify voice AI cost.',
                'Medium Prop (1,200 accounts): Multi-channel — Voice AI 3x/week, SMS 2x/week, Email 1x/week.',
                'Low Prop / High Bal (347 accounts): Human agent 5x/week, skip-traced accounts prioritized.',
                'Estimated first-month liquidation: 1.8-2.2% based on comparable portfolio performance.'
              ];

              campaignLines.forEach((line, idx) => {
                setTimeout(() => {
                  setReasoningLines(prev => [...prev, line]);
                }, idx * 900);
              });

              setTimeout(() => {
                setProcessingSteps(prev => ({ ...prev, campaign: 'complete' }));
                setUploadStep('complete');
              }, campaignLines.length * 900 + 1000);
            }, complianceLines.length * 700 + 1000);
          }, cohortLines.length * 1200 + 1000);
        }, validationLines.length * 800 + 1000);
      }, 500);
    }, 1000);
  };

  return (
    <div className="p-8 bg-gray-50">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Portfolio</h1>
        <p className="text-sm text-gray-600 mt-1">Current allocation, runway, and account upload</p>
      </div>

      {/* Portfolio Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-5 bg-white border border-gray-200 rounded-lg">
          <div className="text-xs uppercase tracking-wide text-gray-500 mb-2">Total Accounts</div>
          <div className="text-3xl font-semibold text-gray-900 mb-1">12,000</div>
          <div className="text-xs text-gray-600">11,257 active, 743 resolved</div>
        </div>
        <div className="p-5 bg-white border border-gray-200 rounded-lg">
          <div className="text-xs uppercase tracking-wide text-gray-500 mb-2">Portfolio Value</div>
          <div className="text-3xl font-semibold text-gray-900 mb-1">$33.6M</div>
          <div className="text-xs text-gray-600">$31.5M remaining</div>
        </div>
        <div className="p-5 bg-white border border-gray-200 rounded-lg">
          <div className="text-xs uppercase tracking-wide text-gray-500 mb-2">Avg Balance</div>
          <div className="text-3xl font-semibold text-gray-900 mb-1">$2,800</div>
          <div className="text-xs text-gray-600">Across all cohorts</div>
        </div>
        <div className="p-5 bg-white border border-gray-200 rounded-lg">
          <div className="text-xs uppercase tracking-wide text-gray-500 mb-2">Days Active</div>
          <div className="text-3xl font-semibold text-gray-900 mb-1">18</div>
          <div className="text-xs text-gray-600">Hypercare — Week 3</div>
        </div>
      </div>

      {/* Upload Action - Primary CTA */}
      {!uploadStep && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-base font-semibold text-gray-900 mb-1">Upload New Placement</h3>
              <p className="text-sm text-gray-600">
                Upload a new batch of accounts. Analyst will validate, model, and prepare a campaign plan.
              </p>
            </div>
            <button
              onClick={() => setUploadStep('upload')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm ml-6 flex-shrink-0"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              New Placement
            </button>
          </div>
        </div>
      )}

      {/* File Upload Modal */}
      {uploadStep === 'upload' && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Upload Placement File</h2>
                  <p className="text-sm text-gray-600 mt-1">Select a CSV or Excel file containing account data</p>
                </div>
                <button
                  onClick={() => {
                    setUploadStep(null);
                    setSelectedFile(null);
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              {!selectedFile ? (
                <label className="block cursor-pointer">
                  <input
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-400 hover:bg-blue-50/50 transition-all">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-base font-medium text-gray-900 mb-2">Drop your file here or click to browse</p>
                    <p className="text-sm text-gray-600">Supported formats: CSV, Excel (.xlsx, .xls)</p>
                  </div>
                </label>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                    <svg className="w-12 h-12 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{selectedFile.name}</p>
                      <p className="text-xs text-gray-600 mt-0.5">{(selectedFile.size / 1024).toFixed(1)} KB</p>
                    </div>
                    <button
                      onClick={() => setSelectedFile(null)}
                      className="text-gray-400 hover:text-gray-600 flex-shrink-0"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-xs font-semibold text-gray-900 mb-3">What happens next:</p>
                    <ol className="space-y-2 text-xs text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-semibold flex-shrink-0 text-xs">1</span>
                        <span><strong>Analyst</strong> validates data quality and contact info completeness</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-semibold flex-shrink-0 text-xs">2</span>
                        <span><strong>Analyst</strong> creates cohorts and applies learnings from current portfolio</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-100 text-red-700 font-semibold flex-shrink-0 text-xs">3</span>
                        <span><strong>Compliance</strong> scans for state-specific rules and account restrictions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-purple-100 text-purple-700 font-semibold flex-shrink-0 text-xs">4</span>
                        <span><strong>Manager</strong> designs campaign strategy and channel allocation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-100 text-green-700 font-semibold flex-shrink-0 text-xs">5</span>
                        <span>You review and approve the plan in <strong>Approvals</strong> before go-live</span>
                      </li>
                    </ol>
                  </div>

                  <button
                    onClick={handleUpload}
                    className="w-full px-6 py-3 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Process File
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Uploading State */}
      {uploadStep === 'uploading' && (
        <div className="bg-white border border-gray-200 rounded-lg p-8 mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Uploading file...</p>
              <p className="text-xs text-gray-600 mt-0.5">Preparing file for agent processing</p>
            </div>
          </div>
        </div>
      )}

      {/* Cohort Allocation View */}
      <Section title="Cohort Allocation & Runway" className="mb-6">
          <div className="space-y-4">
            {cohortAllocationData.map((cohort, idx) => (
            <div key={idx} className="p-4 bg-white border border-gray-200 rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">{cohort.name}</h3>
                  <p className="text-xs text-gray-600">{cohort.strategy}</p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500 mb-0.5">Runway</div>
                  <div className={`text-sm font-semibold ${cohort.status === 'depleting' ? 'text-amber-600' : 'text-gray-900'}`}>
                    {cohort.runway}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                  <span>Penetration: {cohort.penetration}%</span>
                  <span>{cohort.remaining.toLocaleString()} remaining of {cohort.total.toLocaleString()}</span>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      cohort.status === 'depleting' ? 'bg-amber-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${cohort.penetration}%` }}
                  />
                </div>
              </div>

              {/* Metrics Row */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-4">
                  <div>
                    <span className="text-gray-500">Resolved: </span>
                    <span className="font-medium text-gray-900">{cohort.resolved.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Remaining value: </span>
                    <span className="font-medium text-gray-900">{cohort.remainingValue}</span>
                  </div>
                </div>
                {cohort.alert && (
                  <div className="text-xs font-medium text-amber-600 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    {cohort.alert}
                  </div>
                )}
              </div>
            </div>
            ))}
          </div>
      </Section>

      {/* Contact Info Coverage */}
      <Section title="Contact Info Coverage">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-2 px-3 text-xs font-semibold uppercase tracking-wide text-gray-600">Channel</th>
                <th className="text-left py-2 px-3 text-xs font-semibold uppercase tracking-wide text-gray-600">Coverage</th>
                <th className="text-left py-2 px-3 text-xs font-semibold uppercase tracking-wide text-gray-600">Notes</th>
              </tr>
            </thead>
            <tbody>
              {portfolioData.contactCoverage.map((item, idx) => (
                <tr key={idx} className="border-b border-gray-100 last:border-0">
                  <td className="py-2 px-3 font-medium text-gray-900">{item.channel}</td>
                  <td className="py-2 px-3">
                    <span className="text-lg font-semibold text-gray-900 text-numeric">{item.coverage}</span>
                  </td>
                  <td className="py-2 px-3 text-gray-600">{item.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
      </Section>

      {/* Processing Modal - Agent Work */}
      {(uploadStep === 'uploading' || uploadStep === 'processing' || uploadStep === 'complete') && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center p-8 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full my-8">
            <div className="sticky top-0 bg-white border-b border-gray-200 rounded-t-xl p-6 z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Processing New Placement</h2>
                  <p className="text-sm text-gray-600 mt-1">Agents are analyzing and preparing your batch</p>
                </div>
                {uploadStep === 'complete' && (
                  <button
                    onClick={() => setUploadStep(null)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            <div className="p-6 space-y-6">
              {uploadStep === 'uploading' && (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-sm font-semibold text-gray-900">Uploading file...</p>
                    <p className="text-xs text-gray-600 mt-1">Preparing apex_recovery_batch2_feb26.csv</p>
                  </div>
                </div>
              )}

              {(uploadStep === 'processing' || uploadStep === 'complete') && (
                <div className="space-y-6">

          {/* Currently Processing Agent - Always show at top */}
          {processingSteps.validation === 'processing' && (
            <div className="bg-white border border-blue-300 rounded-lg p-5 shadow-md">
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-sm font-semibold text-gray-900">Analyst</span>
                <span className="text-xs text-gray-500">— Validation & Cleaning</span>
                <div className="w-4 h-4 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin ml-auto" />
              </div>
              <div className="space-y-1 text-xs text-gray-600 leading-relaxed min-h-[80px]">
                {reasoningLines.map((line, idx) => (
                  <p key={idx} className="animate-fadeIn">{line}</p>
                ))}
              </div>
            </div>
          )}

          {processingSteps.cohorts === 'processing' && (
            <div className="bg-white border border-blue-300 rounded-lg p-5 shadow-md">
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-sm font-semibold text-gray-900">Analyst</span>
                <span className="text-xs text-gray-500">— Cohort Creation</span>
                <div className="w-4 h-4 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin ml-auto" />
              </div>
              <div className="space-y-1 text-xs text-gray-600 leading-relaxed mb-4 min-h-[80px]">
                {reasoningLines.map((line, idx) => (
                  line === 'INTELLIGENCE_TRANSFER' ? (
                    <p key={idx} className="bg-green-50 border-l-2 border-green-500 pl-2 py-1 font-medium text-gray-700 animate-fadeIn">
                      Identified 580 accounts matching High Prop / High Bal profile from current portfolio. Similar balance range, contact completeness, and state distribution. Recommending settlement + voice strategy for this segment — based on 40% improvement seen on matching cohort in current placement.
                    </p>
                  ) : (
                    <p key={idx} className="animate-fadeIn">{line}</p>
                  )
                ))}
              </div>
              <table className="w-full text-xs border border-gray-200 rounded">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Cohort</th>
                    <th className="text-right py-2 px-3 font-semibold text-gray-700">Accounts</th>
                    <th className="text-right py-2 px-3 font-semibold text-gray-700">Avg Balance</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Recommended Strategy</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 bg-green-50/30">
                    <td className="py-2 px-3 text-gray-900">High Prop / High Bal</td>
                    <td className="py-2 px-3 text-right text-gray-900">580</td>
                    <td className="py-2 px-3 text-right text-gray-900">$4,800</td>
                    <td className="py-2 px-3 text-gray-700">Settlement SMS + Voice (proven on current portfolio)</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-3 text-gray-900">High Prop / Low Bal</td>
                    <td className="py-2 px-3 text-right text-gray-900">720</td>
                    <td className="py-2 px-3 text-right text-gray-900">$1,100</td>
                    <td className="py-2 px-3 text-gray-700">Digital-only SMS + Email</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-3 text-gray-900">Medium Prop</td>
                    <td className="py-2 px-3 text-right text-gray-900">1,200</td>
                    <td className="py-2 px-3 text-right text-gray-900">$2,900</td>
                    <td className="py-2 px-3 text-gray-700">Multi-channel blitz</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-gray-900">Low Prop / High Bal</td>
                    <td className="py-2 px-3 text-right text-gray-900">347</td>
                    <td className="py-2 px-3 text-right text-gray-900">$5,400</td>
                    <td className="py-2 px-3 text-gray-700">Human agent priority</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {processingSteps.compliance === 'processing' && (
            <div className="bg-white border border-red-300 rounded-lg p-5 shadow-md">
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-block w-2 h-2 rounded-full bg-red-500" />
                <span className="text-sm font-semibold text-gray-900">Compliance</span>
                <span className="text-xs text-gray-500">— Pre-scan</span>
                <div className="w-4 h-4 border-2 border-red-200 border-t-red-600 rounded-full animate-spin ml-auto" />
              </div>
              <div className="space-y-1 text-xs text-gray-600 leading-relaxed min-h-[80px]">
                {reasoningLines.map((line, idx) => (
                  <p key={idx} className="animate-fadeIn">{line}</p>
                ))}
              </div>
            </div>
          )}

          {processingSteps.campaign === 'processing' && (
            <div className="bg-white border border-purple-300 rounded-lg p-5 shadow-md">
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-block w-2 h-2 rounded-full bg-purple-500" />
                <span className="text-sm font-semibold text-gray-900">Manager</span>
                <span className="text-xs text-gray-500">— Campaign Plan</span>
                <div className="w-4 h-4 border-2 border-purple-200 border-t-purple-600 rounded-full animate-spin ml-auto" />
              </div>
              <div className="space-y-1 text-xs text-gray-600 leading-relaxed mb-4 min-h-[80px]">
                {reasoningLines.map((line, idx) => (
                  <p key={idx} className="animate-fadeIn">{line}</p>
                ))}
              </div>
              <table className="w-full text-xs border border-gray-200 rounded">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Cohort</th>
                    <th className="text-center py-2 px-3 font-semibold text-gray-700">Voice AI</th>
                    <th className="text-center py-2 px-3 font-semibold text-gray-700">Human Agent</th>
                    <th className="text-center py-2 px-3 font-semibold text-gray-700">SMS</th>
                    <th className="text-center py-2 px-3 font-semibold text-gray-700">Email</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-3 text-gray-900">High Prop / High Bal</td>
                    <td className="py-2 px-3 text-center text-gray-700">5x/week</td>
                    <td className="py-2 px-3 text-center text-gray-700">On escalation</td>
                    <td className="py-2 px-3 text-center text-gray-700">3x/week</td>
                    <td className="py-2 px-3 text-center text-gray-700">1x/week</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-3 text-gray-900">High Prop / Low Bal</td>
                    <td className="py-2 px-3 text-center text-gray-700">—</td>
                    <td className="py-2 px-3 text-center text-gray-700">—</td>
                    <td className="py-2 px-3 text-center text-gray-700">3x/week</td>
                    <td className="py-2 px-3 text-center text-gray-700">2x/week</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-3 text-gray-900">Medium Prop</td>
                    <td className="py-2 px-3 text-center text-gray-700">3x/week</td>
                    <td className="py-2 px-3 text-center text-gray-700">2x/week</td>
                    <td className="py-2 px-3 text-center text-gray-700">2x/week</td>
                    <td className="py-2 px-3 text-center text-gray-700">1x/week</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-gray-900">Low Prop / High Bal</td>
                    <td className="py-2 px-3 text-center text-gray-700">1x/week</td>
                    <td className="py-2 px-3 text-center text-gray-700">5x/week</td>
                    <td className="py-2 px-3 text-center text-gray-700">1x/week</td>
                    <td className="py-2 px-3 text-center text-gray-700">1x/week</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Summary - Show first when complete */}
          {uploadStep === 'complete' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-5">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-semibold text-green-900">Processing Complete</span>
              </div>
              <p className="text-sm text-green-800 mb-4">
                New placement processed. 3,000 accounts validated, 4 cohorts created, campaign plan ready.
              </p>

              <div className="bg-white border border-green-200 rounded p-4">
                <div className="text-xs font-semibold text-gray-900 mb-2">3 items sent to Approvals for your review before go-live:</div>
                <ul className="space-y-2 text-xs text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="inline-block w-1 h-1 rounded-full bg-purple-500 mt-1.5 flex-shrink-0" />
                    <span><span className="font-medium">Campaign plan for Batch 2</span> — approve campaign calendar and channel allocation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="inline-block w-1 h-1 rounded-full bg-purple-500 mt-1.5 flex-shrink-0" />
                    <span><span className="font-medium">Settlement offer terms</span> — 15% discount, matching current portfolio terms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="inline-block w-1 h-1 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                    <span><span className="font-medium">Compliance guardrail configuration</span> — 57 accounts excluded, state rules applied</span>
                  </li>
                </ul>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 w-full">
                  Go to Approvals →
                </button>
              </div>
            </div>
          )}

                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
