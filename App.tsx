import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { LibraryCard } from './components/LibraryCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { Footer } from './components/Footer';
import { WelcomeMessage } from './components/WelcomeMessage';
import { SearchHistory } from './components/SearchHistory';
import { findLibraries } from './services/geminiService';
import type { LibrarySuggestion } from './types';

const HISTORY_KEY = 'devlib-search-history';

const frontendCategories = ['frontend', 'ui', 'ux', 'styling', 'visualization', 'cross-platform'];
const isFrontend = (suggestion: LibrarySuggestion) => {
    const category = suggestion.category.toLowerCase();
    return frontendCategories.some(cat => category.includes(cat));
};

export default function App() {
  const [prompt, setPrompt] = useState<string>('');
  const [suggestions, setSuggestions] = useState<LibrarySuggestion[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem(HISTORY_KEY);
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (e) {
      console.error("Failed to parse search history from localStorage", e);
      setHistory([]);
    }
  }, []);

  const handleFindLibraries = useCallback(async () => {
    if (!prompt.trim()) {
      setError('Please enter a project description.');
      return;
    }

    setIsLoading(true);
    setSuggestions(null);
    setError(null);

    try {
      const result = await findLibraries(prompt);
      setSuggestions(result);

      const newHistory = [prompt, ...history.filter(p => p !== prompt)].slice(0, 10);
      setHistory(newHistory);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));

    } catch (err) {
      console.error(err);
      setError('Failed to fetch library suggestions. Please check the console for more details.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt, history]);

  const handleHistorySelect = (selectedPrompt: string) => {
    setPrompt(selectedPrompt);
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }
    if (error) {
      return <p className="text-center text-red-400 mt-8">{error}</p>;
    }
    if (suggestions) {
      const frontendSuggestions = suggestions.filter(isFrontend);
      const backendSuggestions = suggestions.filter(suggestion => !isFrontend(suggestion));
      const hasFrontend = frontendSuggestions.length > 0;
      const hasBackend = backendSuggestions.length > 0;

      if (!hasFrontend && !hasBackend) {
        return <p className="text-center text-gray-400 mt-8">No specific library suggestions found. Try rephrasing your request.</p>;
      }

      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* Frontend Column */}
          <div className="flex flex-col space-y-4">
            <h2 className="text-2xl font-bold text-center text-cyan-400">Frontend</h2>
            <div className="flex flex-col gap-6">
              {hasFrontend ? (
                frontendSuggestions.map((suggestion, index) => (
                  <LibraryCard key={`fe-${index}`} suggestion={suggestion} />
                ))
              ) : (
                <div className="text-center p-8 border-2 border-dashed border-gray-700 rounded-lg h-full flex items-center justify-center min-h-[150px]">
                  <p className="text-gray-500">No frontend suggestions for this project.</p>
                </div>
              )}
            </div>
          </div>

          {/* Backend Column */}
          <div className="flex flex-col space-y-4">
            <h2 className="text-2xl font-bold text-center text-gray-300">Backend & Tools</h2>
            <div className="flex flex-col gap-6">
              {hasBackend ? (
                backendSuggestions.map((suggestion, index) => (
                  <LibraryCard key={`be-${index}`} suggestion={suggestion} />
                ))
              ) : (
                <div className="text-center p-8 border-2 border-dashed border-gray-700 rounded-lg h-full flex items-center justify-center min-h-[150px]">
                  <p className="text-gray-500">No backend or tool suggestions for this project.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }
    return <WelcomeMessage />;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100 font-sans">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative overflow-hidden">
        <span
          className="absolute top-8 left-8 text-6xl font-black text-gray-500 opacity-10 select-none pointer-events-none"
          aria-hidden="true"
        >
          front end
        </span>
        <span
          className="absolute top-8 right-8 text-6xl font-black text-gray-500 opacity-10 select-none pointer-events-none"
          aria-hidden="true"
        >
          back end
        </span>
        <div className="max-w-7xl mx-auto relative z-[1]">
          <SearchBar
            prompt={prompt}
            setPrompt={setPrompt}
            onSubmit={handleFindLibraries}
            isLoading={isLoading}
          />
           <SearchHistory
            history={history}
            onSelect={handleHistorySelect}
            onClear={handleClearHistory}
          />
          <div className="mt-8">
            {renderContent()}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}