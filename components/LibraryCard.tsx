import React, { useState } from 'react';
import type { LibrarySuggestion } from '../types';

interface LibraryCardProps {
  suggestion: LibrarySuggestion;
}

type CopiedField = 'name' | 'reasoning' | 'safetyTip' | null;

const TagIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mr-1.5 text-cyan-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="m9.568 3.34 3.268 3.268m0 0-3.268 3.268m3.268-3.268L12.836 9.5l-3.268-3.268m0 0L6.3 3.34m3.268 3.268L6.3 9.5l3.268 3.268m0 0-3.268 3.268m3.268-3.268 3.268 3.268m0 0 3.268-3.268m-3.268 3.268-3.268-3.268" />
    </svg>
);

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 text-green-400 flex-shrink-0">
        <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
    </svg>
);

const ShieldExclamationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-yellow-400 flex-shrink-0">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
    </svg>
);

const CopyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

const CopiedIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
    </svg>
);


export const LibraryCard: React.FC<LibraryCardProps> = ({ suggestion }) => {
    const [copiedField, setCopiedField] = useState<CopiedField>(null);

    const handleCopy = (text: string, field: 'name' | 'reasoning' | 'safetyTip') => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedField(field);
            setTimeout(() => setCopiedField(null), 2500);
        }).catch(err => {
            console.error("Failed to copy text:", err);
        });
    };

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-5 flex flex-col transition-transform transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/10">
      <div className="flex-grow">
        <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-cyan-400">{suggestion.name}</h3>
            {suggestion.category && (
                <span className="flex items-center text-xs font-medium bg-gray-700 text-cyan-300 px-2.5 py-1 rounded-full whitespace-nowrap">
                    <TagIcon />
                    {suggestion.category}
                </span>
            )}
        </div>
        <p className="mt-2 text-gray-300 text-sm">{suggestion.description}</p>
        <div className="mt-4 pt-4 border-t border-gray-700">
            <h4 className="font-semibold text-gray-200 mb-2">Why it's a good fit:</h4>
            <div className="flex items-start">
                <CheckIcon />
                <p className="text-gray-400 text-sm ml-0.5">{suggestion.reasoning}</p>
            </div>
        </div>
         {suggestion.safetyTip && (
            <div className="mt-4 pt-4 border-t border-yellow-500/20">
                <div className="flex items-start">
                    <ShieldExclamationIcon />
                    <div>
                        <h4 className="font-semibold text-yellow-300">Pro Tip / Safety Note</h4>
                        <p className="text-yellow-200/80 text-sm mt-1">{suggestion.safetyTip}</p>
                    </div>
                </div>
            </div>
        )}
      </div>
       <div className="mt-4 pt-4 border-t border-gray-700/50 flex items-center justify-end flex-wrap gap-2">
         <button
            onClick={() => handleCopy(suggestion.safetyTip, 'safetyTip')}
            className={`flex items-center space-x-2 px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-200 ${
            copiedField === 'safetyTip'
                ? 'bg-green-600/20 text-green-400'
                : 'bg-gray-700/50 hover:bg-gray-600/50 text-gray-300'
            }`}
            aria-label={`Copy safety tip for ${suggestion.name} to clipboard`}
        >
            {copiedField === 'safetyTip' ? <CopiedIcon /> : <CopyIcon />}
            <span>{copiedField === 'safetyTip' ? 'Copied!' : 'Copy Tip'}</span>
        </button>
        <button
            onClick={() => handleCopy(suggestion.reasoning, 'reasoning')}
            className={`flex items-center space-x-2 px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-200 ${
            copiedField === 'reasoning'
                ? 'bg-green-600/20 text-green-400'
                : 'bg-gray-700/50 hover:bg-gray-600/50 text-gray-300'
            }`}
            aria-label={`Copy reasoning for ${suggestion.name} to clipboard`}
        >
            {copiedField === 'reasoning' ? <CopiedIcon /> : <CopyIcon />}
            <span>{copiedField === 'reasoning' ? 'Copied!' : 'Copy Reasoning'}</span>
        </button>
        <button
          onClick={() => handleCopy(suggestion.name, 'name')}
          className={`flex items-center space-x-2 px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-200 ${
            copiedField === 'name'
              ? 'bg-green-600/20 text-green-400'
              : 'bg-gray-700/50 hover:bg-gray-600/50 text-gray-300'
          }`}
          aria-label={`Copy ${suggestion.name} to clipboard`}
        >
          {copiedField === 'name' ? <CopiedIcon /> : <CopyIcon />}
          <span>{copiedField === 'name' ? 'Copied!' : 'Copy Name'}</span>
        </button>
      </div>
    </div>
  );
};