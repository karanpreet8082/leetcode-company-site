export function Progress({ value = 0, className = '' }) {
    return (
      <div className={`w-full h-3 bg-gray-200 rounded ${className}`}>
        <div
          className="h-3 bg-green-500 rounded"
          style={{ width: `${value}%` }}
        />
      </div>
    );
  }
  