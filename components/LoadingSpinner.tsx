import React, { useState, useEffect } from 'react';

const loadingMessages = [
  "Analyzing your project requirements...",
  "Consulting the library knowledge base...",
  "Cross-referencing with best practices...",
  "Identifying top candidates...",
  "Finalizing recommendations...",
];

export const LoadingSpinner: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
    }, 2000); // Change message every 2 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  return (
    <div className="flex justify-center items-center py-10">
      <div className="flex flex-col items-center">
        <svg
          className="animate-spin -ml-1 mr-3 h-10 w-10 text-cyan-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <p className="mt-4 text-gray-400 text-center transition-opacity duration-500 ease-in-out">
          {loadingMessages[messageIndex]}
        </p>
      </div>
    </div>
  );
};
