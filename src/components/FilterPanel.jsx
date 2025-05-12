export default function FilterPanel({ filters, onAdd, onRemove, allTypes }) {
    const available = allTypes.filter(t => !filters.includes(t));
  
    return (
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          {filters.map(type => (
            <span
              key={type}
              className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm cursor-pointer"
              onClick={() => onRemove(type)}
              title="Click to remove"
            >
              {type} ✕
            </span>
          ))}
        </div>
        <select
          className="border border-gray-300 rounded px-2 py-1"
          onChange={e => onAdd(e.target.value)}
          value=""
        >
          <option value="" disabled>Add filter...</option>
          {available.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
    );
  }
  