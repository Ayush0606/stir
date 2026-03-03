'use client';

import Image from 'next/image';
import type { MovieData } from '@/types/movie';

interface MovieCardProps {
  movie: MovieData;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="bg-white rounded-lg sm:rounded-xl shadow-lg overflow-hidden animate-fade-in">
      <div className="flex flex-col md:flex-row">
        {/* Poster */}
        <div className="md:flex-shrink-0 md:w-56 lg:w-64 bg-gray-200">
          <div className="relative h-64 sm:h-80 md:h-full w-full">
            <Image
              src={movie.poster}
              alt={`${movie.title} poster`}
              fill
              className="object-cover"
              priority
              unoptimized={movie.poster.startsWith('http')}
              sizes="(max-width: 768px) 100vw, 256px"
            />
          </div>
        </div>

        {/* Movie details */}
        <div className="p-4 sm:p-6 lg:p-8 flex-1">
          <div className="space-y-3 sm:space-y-4">
            {/* Title and Year */}
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 break-words">
                {movie.title}
              </h2>
              <p className="text-base sm:text-lg text-gray-600">{movie.year}</p>
            </div>

            {/* IMDb Rating */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs sm:text-sm font-medium text-gray-600">IMDb Rating:</span>
              <div className="flex items-center bg-yellow-400 text-gray-900 px-2 sm:px-3 py-1 rounded-md font-bold text-sm sm:text-base">
                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {movie.imdbRating}
              </div>
            </div>

            {/* Plot */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Plot</h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{movie.plot}</p>
            </div>

            {/* Cast */}
            {movie.cast.length > 0 && (
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Cast</h3>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {movie.cast.map((actor, index) => (
                    <span
                      key={index}
                      className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs sm:text-sm"
                    >
                      {actor}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
