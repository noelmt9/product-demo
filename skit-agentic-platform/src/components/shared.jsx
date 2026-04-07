export const StatusDot = ({ status }) => {
  const colors = {
    above: 'bg-green-500',
    below: 'bg-amber-500',
    expected: 'bg-gray-400',
    resolved: 'bg-green-500',
    running: 'bg-green-500'
  };
  return <span className={`inline-block w-2 h-2 rounded-full ${colors[status] || 'bg-gray-400'}`} />;
};

export const AgentHeader = ({ color, name, role, description }) => (
  <div className="mb-6 pb-6 border-b border-gray-200">
    <div className="flex items-center gap-3 mb-2">
      <span className={`inline-block w-2 h-2 rounded-full bg-${color}-500`} style={{ backgroundColor: color }} />
      <div>
        <h1 className="text-xl font-semibold text-gray-900">{name}</h1>
        <p className="text-sm text-gray-600">{role}</p>
      </div>
    </div>
    <p className="text-sm text-gray-700 mt-4 leading-relaxed">{description}</p>
  </div>
);

export const Section = ({ title, children, className = "" }) => (
  <div className={`bg-white border border-gray-200 rounded-lg p-6 ${className}`}>
    <h2 className="text-base font-semibold text-gray-900 mb-4">{title}</h2>
    {children}
  </div>
);

export const DataTable = ({ headers, rows, alignments = [] }) => (
  <table className="w-full text-sm">
    <thead>
      <tr className="border-b border-gray-200 bg-gray-50">
        {headers.map((header, idx) => (
          <th
            key={idx}
            className={`py-2 px-3 text-xs font-semibold uppercase tracking-wide text-gray-600 ${
              alignments[idx] === 'right' ? 'text-right' : 'text-left'
            }`}
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {rows.map((row, idx) => (
        <tr key={idx} className="border-b border-gray-100 last:border-0">
          {row.map((cell, cellIdx) => (
            <td
              key={cellIdx}
              className={`py-2 px-3 ${
                cellIdx === 0 ? 'font-medium text-gray-900' : 'text-gray-700'
              } ${alignments[cellIdx] === 'right' ? 'text-right text-numeric' : ''}`}
            >
              {cell}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);
