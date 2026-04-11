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
      <span className={`inline-block w-2 h-2 rounded-full`} style={{ backgroundColor: color }} />
      <div>
        <h1 className="text-xl font-semibold text-gray-900">{name}</h1>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
    </div>
    <p className="text-sm text-gray-600 mt-4 leading-relaxed">{description}</p>
  </div>
);

export const Section = ({ title, children, className = "" }) => (
  <div className={`card p-5 ${className}`}>
    <h2 className="text-sm font-semibold text-gray-800 mb-4">{title}</h2>
    {children}
  </div>
);

export const DataTable = ({ headers, rows, alignments = [] }) => (
  <table className="w-full text-sm">
    <thead>
      <tr style={{borderBottom: '1px solid #dee2e6'}}>
        {headers.map((header, idx) => (
          <th
            key={idx}
            className={`py-2 px-3 text-[10px] font-bold uppercase tracking-wider text-gray-400 ${
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
        <tr key={idx} style={{borderBottom: '1px solid #f3f4f6'}}>
          {row.map((cell, cellIdx) => (
            <td
              key={cellIdx}
              className={`py-2 px-3 text-xs ${
                cellIdx === 0 ? 'font-medium text-gray-800' : 'text-gray-600'
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
