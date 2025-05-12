export default function CalculatorCard({ title, type }) {
  return (
    <div className="bg-white shadow rounded-lg p-4 border-l-4 border-blue-500">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm text-gray-500 mt-1">Type: {type}</p>
      {/* Placeholder: Replace with actual calculator logic */}
      <div className="mt-3 text-sm text-gray-400 italic">[Calculator UI here]</div>
    </div>
  );
}
