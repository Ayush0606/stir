'use client';

import { useState } from 'react';
import type { MovieInsights } from '@/types/movie';
import MovieSearch from '@/components/MovieSearch';
import MovieCard from '@/components/MovieCard';
import SentimentCard from '@/components/SentimentCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';

export default function HomePage() {
  const [insights, setInsights] = useState<MovieInsights | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (imdbId: string) => {
    setIsLoading(true);
    setError(null);
    setInsights(null);

    try {
      const response = await fetch('/api/movie-insights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imdbId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch movie insights');
      }

      setInsights(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    setError(null);
    setInsights(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="text-2xl sm:text-3xl flex-shrink-0">🎬</div>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 truncate">
                AI Movie Insight Builder
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 hidden xs:block">
                Discover movies with AI-powered sentiment analysis
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Search Section */}
        <section className="mb-6 sm:mb-8 lg:mb-10">
          <MovieSearch onSearch={handleSearch} isLoading={isLoading} />
        </section>

        {/* Results Section */}
        <section className="space-y-4 sm:space-y-6">
          {isLoading && <LoadingSpinner />}

          {error && <ErrorMessage message={error} onRetry={handleRetry} />}

          {insights && (
            <>
              <MovieCard movie={insights.movie} />
              <SentimentCard sentiment={insights.sentiment} />
            </>
          )}

          {!isLoading && !error && !insights && (
            <div className="text-center py-8 sm:py-12 px-4 text-gray-500">
              <div className="text-5xl sm:text-6xl mb-4">🎥</div>
              <p className="text-base sm:text-lg font-medium">Enter an IMDb ID to get started</p>
              <p className="text-xs sm:text-sm mt-2 max-w-md mx-auto">
                Example: tt0133093 (The Matrix), tt0111161 (The Shawshank Redemption)
              </p>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-8 sm:mt-12 lg:mt-16 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <p className="text-xs sm:text-sm text-gray-600 text-center">
            Built with Next.js, TypeScript, and OpenAI •{' '}
            <a
              href="https://github.com/Ayush0606/stir"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline focus:underline"
            >
              View Source
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
