import React from 'react';

interface SearchHistoryProps {
  history: string[];
  onSelect: (prompt: string) => void;
  onClear: () => void;
}

const HistoryIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-gray-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.033-2.134h-3.868c-1.123 0-2.033.954-2.033 2.134v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>
);


export const SearchHistory: React.FC<SearchHistoryProps> = ({ history, onSelect, onClear }) => {
  if (history.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 p-4 bg-gray-800/30 border border-gray-700/50 rounded-lg">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-semibold text-gray-300 flex items-center">
          <HistoryIcon />
          Recent Searches
        </h3>
        <button
            onClick={onClear}
            className="text-xs text-gray-500 hover:text-red-400 transition-colors flex items-center"
            aria-label="Clear search history"
        >
            <TrashIcon />
            Clear
        </button>
      </div>
      <ul className="space-y-2">
        {history.map((item, index) => (
          <li key={index}>
            <button
              onClick={() => onSelect(item)}
              className="w-full text-left text-sm text-gray-400 hover:text-cyan-400 p-2 rounded-md bg-gray-700/30 hover:bg-gray-700/60 transition-colors truncate"
              title={item}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};