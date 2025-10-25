import React from 'react';

const ToolsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-600">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17 7.383 19.207a1.5 1.5 0 0 1-2.121 0l-1.06-1.06a1.5 1.5 0 0 1 0-2.121L8.12 12.12m3.3 3.05 3.75-3.75a1.5 1.5 0 0 0-2.122-2.122l-3.75 3.75M11.42 15.17 8.925 17.665" />
    </svg>
);

const ArrowDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-blue-900/50">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l-6.75-6.75M12 19.5l6.75-6.75" />
  </svg>
);


export const WelcomeMessage: React.FC = () => {
    return (
        <div className="mt-16">
            <div className="flex justify-center space-x-64 -mb-5 relative z-0">
                <ArrowDownIcon />
                <ArrowDownIcon />
            </div>
            <div className="text-center p-8 border-2 border-dashed border-gray-700 rounded-lg relative z-1 bg-gray-900">
                <div className="flex justify-center mb-4">
                    <ToolsIcon />
                </div>
                <h2 className="text-2xl font-semibold text-gray-300">Let's find the right tools for your job</h2>
                <p className="mt-2 text-gray-500 max-w-md mx-auto">
                    Simply type in your project idea or technical challenge above, and I'll suggest the best libraries to help you build it.
                </p>
            </div>
        </div>
    );
};