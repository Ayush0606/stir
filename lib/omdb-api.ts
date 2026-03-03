import type { OmdbResponse } from '@/types/movie';

const OMDB_BASE_URL = 'https://www.omdbapi.com';

export class OmdbApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'OmdbApiError';
  }
}

/**
 * Fetches movie data from OMDb API
 * @param imdbId - IMDb ID (e.g., "tt0133093")
 * @returns Movie data from OMDb
 */
export async function fetchMovieFromOmdb(imdbId: string): Promise<OmdbResponse> {
  const apiKey = process.env.OMDB_API_KEY;

  if (!apiKey) {
    throw new OmdbApiError('OMDB_API_KEY is not configured');
  }

  // Validate IMDb ID format
  if (!isValidImdbId(imdbId)) {
    throw new OmdbApiError('Invalid IMDb ID format. Must start with "tt" followed by numbers.');
  }

  try {
    const url = `${OMDB_BASE_URL}/?i=${imdbId}&apikey=${apiKey}&plot=short`;
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new OmdbApiError(`OMDb API request failed: ${response.statusText}`);
    }

    const data: OmdbResponse = await response.json();

    if (data.Response === 'False') {
      throw new OmdbApiError(data.Error || 'Movie not found');
    }

    return data;
  } catch (error) {
    if (error instanceof OmdbApiError) {
      throw error;
    }
    throw new OmdbApiError(`Failed to fetch movie data: ${(error as Error).message}`);
  }
}

/**
 * Validates IMDb ID format
 * @param imdbId - IMDb ID to validate
 * @returns true if valid, false otherwise
 */
export function isValidImdbId(imdbId: string): boolean {
  const imdbIdRegex = /^tt\d{7,}$/;
  return imdbIdRegex.test(imdbId);
}

/**
 * Normalizes OMDb response to our MovieData format
 */
export function normalizeOmdbResponse(data: OmdbResponse) {
  const cast = data.Actors.split(', ').filter(Boolean);

  return {
    title: data.Title,
    poster: data.Poster !== 'N/A' ? data.Poster : '/placeholder-poster.png',
    cast: cast.slice(0, 5), // Top 5 actors
    year: data.Year,
    imdbRating: data.imdbRating !== 'N/A' ? data.imdbRating : 'N/A',
    plot: data.Plot !== 'N/A' ? data.Plot : 'No plot available.',
    imdbId: data.imdbID,
  };
}
