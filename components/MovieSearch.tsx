'use client';

import { useState } from 'react';

interface MovieSearchProps {
  onSearch: (imdbId: string) => void;
  isLoading: boolean;
}

export default function MovieSearch({ onSearch, isLoading }: MovieSearchProps) {
  const [imdbId, setImdbId] = useState('');
  const [error, setError] = useState('');

  const validateImdbId = (id: string): boolean => {
    const imdbIdRegex = /^tt\d{7,}$/;
    return imdbIdRegex.test(id);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const trimmedId = imdbId.trim();

    if (!trimmedId) {
      setError('Please enter an IMDb ID');
      return;
    }

    if (!validateImdbId(trimmedId)) {
      setError(
        'Invalid IMDb ID format. Must start with "tt" followed by numbers (e.g., tt0133093)'
      );
      return;
    }

    onSearch(trimmedId);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImdbId(e.target.value);
    if (error) setError('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        <div>
          <label htmlFor="imdbId" className="block text-sm font-medium text-gray-700 mb-2">
            Enter IMDb ID
          </label>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <input
              type="text"
              id="imdbId"
              value={imdbId}
              onChange={handleInputChange}
              placeholder="e.g., tt0133093"
              disabled={isLoading}
              className={`flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-base ${
                error ? 'border-red-500' : 'border-gray-300'
              } ${isLoading ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
            />
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-lg transition-all ${
                isLoading
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-blue-700 hover:shadow-lg active:scale-95'
              }`}
            >
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </div>
          {error && <p className="mt-2 text-xs sm:text-sm text-red-600 animate-fade-in">{error}</p>}
        </div>
        <div className="text-xs sm:text-sm text-gray-500">
          <p>
            Don't know the IMDb ID? Visit{' '}
            <a
              href="https://www.imdb.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              IMDb.com
            </a>{' '}
            and find it in the movie URL
          </p>
        </div>
      </form>
    </div>
  );
}
