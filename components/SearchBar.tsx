
import React from 'react';

interface SearchBarProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clipRule="evenodd" />
  </svg>
);


export const SearchBar: React.FC<SearchBarProps> = ({ prompt, setPrompt, onSubmit, isLoading }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      if(!isLoading) onSubmit();
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-center text-lg text-gray-300">
        Describe your project or the problem you're solving.
      </p>
      <div className="relative">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g., 'I'm building a real-time chat application with user authentication and a modern UI on the web.'"
          className="w-full h-32 p-4 pr-12 text-base bg-gray-800 border-2 border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors duration-200 resize-none text-gray-200 placeholder-gray-500"
          disabled={isLoading}
        />
      </div>
      <div className="flex flex-col items-center">
        <button
          onClick={onSubmit}
          disabled={isLoading || !prompt.trim()}
          className="flex items-center justify-center w-full sm:w-auto px-6 py-3 font-semibold text-white bg-cyan-600 rounded-md hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500 transition-all duration-200 ease-in-out transform hover:scale-105 disabled:scale-100"
        >
          {isLoading ? (
            'Analyzing...'
          ) : (
            <>
              <SearchIcon />
              <span className="ml-2">Find Libraries</span>
            </>
          )}
        </button>
        <p className="text-xs text-gray-500 mt-2">
            Tip: Press Ctrl+Enter or Cmd+Enter to submit.
        </p>
      </div>
    </div>
  );
};
