import { Section } from './shared';

const recentPayments = [
  { accountId: 'AP-4782', amount: '$4,500', type: 'Full payment', channel: 'SMS → Payment Bot', date: 'Feb 24, 2026', status: 'Cleared' },
  { accountId: 'AP-3291', amount: '$1,675', type: 'Settlement (15%)', channel: 'Human Agent', date: 'Feb 24, 2026', status: 'Cleared' },
  { accountId: 'AP-5104', amount: '$290', type: 'Payment plan (1/6)', channel: 'Email link', date: 'Feb 23, 2026', status: 'Cleared' },
  { accountId: 'AP-2847', amount: '$3,200', type: 'Settlement (20%)', channel: 'Human Agent', date: 'Feb 23, 2026', status: 'Pending' },
  { accountId: 'AP-6193', amount: '$1,200', type: 'Full payment', channel: 'Voice AI → Payment Bot', date: 'Feb 23, 2026', status: 'Cleared' },
  { accountId: 'AP-4521', amount: '$420', type: 'Payment plan (2/8)', channel: 'SMS → Payment Bot', date: 'Feb 22, 2026', status: 'Cleared' },
  { accountId: 'AP-3788', amount: '$2,100', type: 'Settlement (15%)', channel: 'Human Agent', date: 'Feb 22, 2026', status: 'Failed' },
  { accountId: 'AP-5902', amount: '$850', type: 'Full payment', channel: 'Email link', date: 'Feb 21, 2026', status: 'Cleared' },
  { accountId: 'AP-2134', amount: '$1,950', type: 'Settlement (10%)', channel: 'Human Agent', date: 'Feb 21, 2026', status: 'Cleared' },
  { accountId: 'AP-7245', amount: '$310', type: 'Payment plan (3/12)', channel: 'Voice AI → Payment Bot', date: 'Feb 21, 2026', status: 'Cleared' },
];

const settlementBreakdown = [
  { discountLevel: '10%', count: 28, totalRecovered: '$52,360' },
  { discountLevel: '15%', count: 89, totalRecovered: '$165,515' },
  { discountLevel: '20%', count: 25, totalRecovered: '$80,000' },
];

export default function Payments() {
  return (
    <div className="p-8 bg-gray-50">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Payments</h1>
        <p className="text-sm text-gray-600 mt-1">Collections, settlements, and payment plan tracking</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Total Collected (This Month)</p>
          <p className="text-3xl font-semibold text-gray-900 text-numeric">$287,400</p>
          <p className="text-xs text-gray-500 mt-1">Feb 1-24, 2026</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Settlements Processed</p>
          <p className="text-3xl font-semibold text-gray-900 text-numeric">142</p>
          <p className="text-xs text-gray-500 mt-1">Avg: $1,860 per settlement</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Active Payment Plans</p>
          <p className="text-3xl font-semibold text-gray-900 text-numeric">89</p>
          <p className="text-xs text-gray-500 mt-1">78% on-time payment rate</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Avg Settlement</p>
          <p className="text-3xl font-semibold text-gray-900 text-numeric">$1,860</p>
          <p className="text-xs text-gray-500 mt-1">14.2% avg discount given</p>
        </div>
      </div>

      {/* Recent Payments */}
      <Section title="Recent Payments" className="mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left py-2 px-3 text-xs font-semibold uppercase tracking-wide text-gray-600">Account ID</th>
              <th className="text-right py-2 px-3 text-xs font-semibold uppercase tracking-wide text-gray-600">Amount</th>
              <th className="text-left py-2 px-3 text-xs font-semibold uppercase tracking-wide text-gray-600">Type</th>
              <th className="text-left py-2 px-3 text-xs font-semibold uppercase tracking-wide text-gray-600">Channel</th>
              <th className="text-left py-2 px-3 text-xs font-semibold uppercase tracking-wide text-gray-600">Date</th>
              <th className="text-left py-2 px-3 text-xs font-semibold uppercase tracking-wide text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentPayments.map((payment, idx) => (
              <tr key={idx} className="border-b border-gray-100 last:border-0">
                <td className="py-2 px-3 font-medium text-gray-900 text-numeric">{payment.accountId}</td>
                <td className="py-2 px-3 text-right font-semibold text-gray-900 text-numeric">{payment.amount}</td>
                <td className="py-2 px-3 text-gray-700">{payment.type}</td>
                <td className="py-2 px-3 text-gray-700 text-xs">{payment.channel}</td>
                <td className="py-2 px-3 text-gray-700 text-xs">{payment.date}</td>
                <td className="py-2 px-3">
                  <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded ${
                    payment.status === 'Cleared' ? 'bg-green-100 text-green-700' :
                    payment.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {payment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      {/* Settlement Breakdown */}
      <Section title="Settlement Breakdown">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left py-2 px-3 text-xs font-semibold uppercase tracking-wide text-gray-600">Discount Level</th>
              <th className="text-right py-2 px-3 text-xs font-semibold uppercase tracking-wide text-gray-600">Count</th>
              <th className="text-right py-2 px-3 text-xs font-semibold uppercase tracking-wide text-gray-600">Total Recovered</th>
              <th className="text-right py-2 px-3 text-xs font-semibold uppercase tracking-wide text-gray-600">Avg per Settlement</th>
            </tr>
          </thead>
          <tbody>
            {settlementBreakdown.map((item, idx) => {
              const count = item.count;
              const totalRecovered = parseFloat(item.totalRecovered.replace(/[$,]/g, ''));
              const avgPerSettlement = (totalRecovered / count).toFixed(0);

              return (
                <tr key={idx} className="border-b border-gray-100 last:border-0">
                  <td className="py-2 px-3 font-medium text-gray-900">{item.discountLevel} discount</td>
                  <td className="py-2 px-3 text-right text-gray-700 text-numeric">{count}</td>
                  <td className="py-2 px-3 text-right font-semibold text-gray-900 text-numeric">{item.totalRecovered}</td>
                  <td className="py-2 px-3 text-right text-gray-700 text-numeric">${avgPerSettlement.toLocaleString()}</td>
                </tr>
              );
            })}
            <tr className="border-t-2 border-gray-200 bg-gray-50">
              <td className="py-2 px-3 font-semibold text-gray-900">Total</td>
              <td className="py-2 px-3 text-right font-semibold text-gray-900 text-numeric">142</td>
              <td className="py-2 px-3 text-right font-semibold text-gray-900 text-numeric">$297,875 <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-green-50 text-green-700">Total</span></td>
              <td className="py-2 px-3 text-right font-semibold text-gray-900 text-numeric">$2,097</td>
            </tr>
          </tbody>
        </table>
      </Section>
    </div>
  );
}
