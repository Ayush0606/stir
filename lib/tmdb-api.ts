import type { TmdbMovieResponse, TmdbCreditsResponse, TmdbReviewsResponse, Review } from '@/types/movie';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export class TmdbApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TmdbApiError';
  }
}

/**
 * Fetches movie data from TMDb using IMDb ID
 * @param imdbId - IMDb ID (e.g., "tt0133093")
 * @returns Movie data from TMDb
 */
export async function fetchMovieFromTmdb(imdbId: string): Promise<TmdbMovieResponse> {
  const apiKey = process.env.TMDB_API_KEY;

  if (!apiKey) {
    throw new TmdbApiError('TMDB_API_KEY is not configured');
  }

  try {
    const url = `${TMDB_BASE_URL}/find/${imdbId}?api_key=${apiKey}&external_source=imdb_id`;
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new TmdbApiError(`TMDb API request failed: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.movie_results || data.movie_results.length === 0) {
      throw new TmdbApiError('Movie not found in TMDb');
    }

    return data.movie_results[0];
  } catch (error) {
    if (error instanceof TmdbApiError) {
      throw error;
    }
    throw new TmdbApiError(`Failed to fetch movie data: ${(error as Error).message}`);
  }
}

/**
 * Fetches movie credits (cast) from TMDb
 * @param movieId - TMDb movie ID
 * @returns Credits data
 */
export async function fetchMovieCredits(movieId: number): Promise<TmdbCreditsResponse> {
  const apiKey = process.env.TMDB_API_KEY;

  if (!apiKey) {
    throw new TmdbApiError('TMDB_API_KEY is not configured');
  }

  try {
    const url = `${TMDB_BASE_URL}/movie/${movieId}/credits?api_key=${apiKey}`;
    const response = await fetch(url, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new TmdbApiError(`TMDb credits request failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof TmdbApiError) {
      throw error;
    }
    throw new TmdbApiError(`Failed to fetch credits: ${(error as Error).message}`);
  }
}

/**
 * Fetches movie reviews from TMDb
 * @param movieId - TMDb movie ID
 * @returns Reviews data
 */
export async function fetchMovieReviews(movieId: number): Promise<Review[]> {
  const apiKey = process.env.TMDB_API_KEY;

  if (!apiKey) {
    throw new TmdbApiError('TMDB_API_KEY is not configured');
  }

  try {
    const url = `${TMDB_BASE_URL}/movie/${movieId}/reviews?api_key=${apiKey}`;
    const response = await fetch(url, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new TmdbApiError(`TMDb reviews request failed: ${response.statusText}`);
    }

    const data: TmdbReviewsResponse = await response.json();

    return data.results.map((review) => ({
      author: review.author,
      content: review.content,
      rating: review.author_details.rating ?? undefined,
    }));
  } catch (error) {
    if (error instanceof TmdbApiError) {
      throw error;
    }
    throw new TmdbApiError(`Failed to fetch reviews: ${(error as Error).message}`);
  }
}

/**
 * Helper function to generate TMDb poster URL
 * @param posterPath - Poster path from TMDb
 * @param size - Image size (default: w500)
 * @returns Full poster URL
 */
export function getTmdbPosterUrl(posterPath: string | null, size: string = 'w500'): string {
  if (!posterPath) {
    return '/placeholder-poster.png';
  }
  return `https://image.tmdb.org/t/p/${size}${posterPath}`;
}
