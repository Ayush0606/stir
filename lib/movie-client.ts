import type { MovieData, Review } from '@/types/movie';
import { fetchMovieFromOmdb, normalizeOmdbResponse, OmdbApiError } from './omdb-api';
import { 
  fetchMovieFromTmdb, 
  fetchMovieCredits, 
  fetchMovieReviews, 
  getTmdbPosterUrl,
  TmdbApiError 
} from './tmdb-api';

/**
 * Fetches movie data and reviews using a hybrid approach
 * Prioritizes OMDb for movie data, falls back to TMDb
 * Uses TMDb for reviews
 * 
 * @param imdbId - IMDb ID (e.g., "tt0133093")
 * @returns Movie data and reviews
 */
export async function fetchMovieData(imdbId: string): Promise<{
  movie: MovieData;
  reviews: Review[];
}> {
  let movieData: MovieData;
  let reviews: Review[] = [];

  // Try OMDb first for movie data (more reliable for IMDb ratings)
  try {
    const omdbData = await fetchMovieFromOmdb(imdbId);
    movieData = normalizeOmdbResponse(omdbData);
  } catch (error) {
    if (error instanceof OmdbApiError) {
      // Fall back to TMDb if OMDb fails
      try {
        const tmdbMovie = await fetchMovieFromTmdb(imdbId);
        const tmdbCredits = await fetchMovieCredits(tmdbMovie.id);
        
        movieData = {
          title: tmdbMovie.title,
          poster: getTmdbPosterUrl(tmdbMovie.poster_path),
          cast: tmdbCredits.cast
            .sort((a, b) => a.order - b.order)
            .slice(0, 5)
            .map(actor => actor.name),
          year: tmdbMovie.release_date.split('-')[0],
          imdbRating: tmdbMovie.vote_average.toFixed(1),
          plot: tmdbMovie.overview || 'No plot available.',
          imdbId: tmdbMovie.imdb_id,
        };
      } catch (tmdbError) {
        throw new Error(`Failed to fetch movie data: ${(tmdbError as Error).message}`);
      }
    } else {
      throw error;
    }
  }

  // Try to fetch reviews from TMDb
  try {
    const tmdbMovie = await fetchMovieFromTmdb(imdbId);
    reviews = await fetchMovieReviews(tmdbMovie.id);
    
    // If no reviews, use mock reviews for demonstration
    if (reviews.length === 0) {
      reviews = generateMockReviews(movieData.title);
    }
  } catch (error) {
    // If TMDb reviews fail, use mock reviews
    console.warn('Failed to fetch TMDb reviews, using mock data:', error);
    reviews = generateMockReviews(movieData.title);
  }

  return { movie: movieData, reviews };
}

/**
 * Generates mock reviews for demonstration when real reviews are unavailable
 * @param movieTitle - Title of the movie
 * @returns Array of mock reviews
 */
function generateMockReviews(movieTitle: string): Review[] {
  return [
    {
      author: 'MovieBuff2024',
      content: `${movieTitle} exceeded all my expectations! The cinematography was breathtaking, and the performances were outstanding. Every scene was crafted with such attention to detail. Highly recommend this masterpiece!`,
      rating: 9,
    },
    {
      author: 'CriticCorner',
      content: `While ${movieTitle} has its moments, I felt the pacing was inconsistent. Some plot points felt rushed while others dragged on. The acting was solid, but the script could have used more polish. Worth watching but not without flaws.`,
      rating: 6,
    },
    {
      author: 'FilmFanatic',
      content: `Absolutely loved ${movieTitle}! The story kept me engaged from start to finish. The character development was excellent and the ending was both surprising and satisfying. One of the best films I've seen this year.`,
      rating: 10,
    },
    {
      author: 'ReelTalk',
      content: `${movieTitle} delivers a powerful message with great emotional depth. The soundtrack perfectly complements the visuals. While some may find it slow, I appreciated the thoughtful approach to storytelling.`,
      rating: 8,
    },
    {
      author: 'PopcornReviewer',
      content: `Mixed feelings about ${movieTitle}. The concept was interesting but the execution fell short. Some great moments were overshadowed by predictable plot devices. It's entertaining but forgettable.`,
      rating: 5,
    },
  ];
}
