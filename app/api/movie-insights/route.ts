import { NextRequest, NextResponse } from 'next/server';
import type { MovieInsights, ApiError } from '@/types/movie';
import { fetchMovieData } from '@/lib/movie-client';
import { isValidImdbId } from '@/lib/omdb-api';
import { analyzeSentiment, analyzeSentimentFallback, SentimentServiceError } from '@/services/sentiment-service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/movie-insights
 * 
 * Fetches movie data and generates AI-powered sentiment analysis
 * 
 * Request body:
 * {
 *   "imdbId": "tt0133093"
 * }
 * 
 * Response:
 * {
 *   "movie": { ... },
 *   "sentiment": {
 *     "summary": "...",
 *     "classification": "Positive" | "Mixed" | "Negative"
 *   }
 * }
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { imdbId } = body;

    // Validate IMDb ID
    if (!imdbId || typeof imdbId !== 'string') {
      return NextResponse.json<ApiError>(
        {
          error: 'INVALID_INPUT',
          message: 'IMDb ID is required and must be a string',
        },
        { status: 400 }
      );
    }

    if (!isValidImdbId(imdbId)) {
      return NextResponse.json<ApiError>(
        {
          error: 'INVALID_IMDB_ID',
          message: 'Invalid IMDb ID format. Must start with "tt" followed by numbers (e.g., tt0133093)',
        },
        { status: 400 }
      );
    }

    // Fetch movie data and reviews
    let movieData;
    let reviews;

    try {
      const result = await fetchMovieData(imdbId);
      movieData = result.movie;
      reviews = result.reviews;
    } catch (error) {
      return NextResponse.json<ApiError>(
        {
          error: 'MOVIE_NOT_FOUND',
          message: `Failed to fetch movie data: ${(error as Error).message}`,
        },
        { status: 404 }
      );
    }

    // Analyze sentiment using AI
    let sentimentAnalysis;

    try {
      sentimentAnalysis = await analyzeSentiment(reviews, movieData.title);
    } catch (error) {
      // Fall back to heuristic analysis if AI service fails
      console.warn('AI sentiment analysis failed, using fallback:', error);
      
      if (error instanceof SentimentServiceError) {
        // Use fallback for AI-specific errors
        sentimentAnalysis = analyzeSentimentFallback(reviews);
      } else {
        // Re-throw unexpected errors
        throw error;
      }
    }

    // Return combined insights
    const insights: MovieInsights = {
      movie: movieData,
      sentiment: sentimentAnalysis,
    };

    return NextResponse.json<MovieInsights>(insights, { status: 200 });
  } catch (error) {
    console.error('Unexpected error in movie-insights API:', error);

    return NextResponse.json<ApiError>(
      {
        error: 'INTERNAL_ERROR',
        message: 'An unexpected error occurred while processing your request',
      },
      { status: 500 }
    );
  }
}

// Explicitly disable GET method
export async function GET() {
  return NextResponse.json<ApiError>(
    {
      error: 'METHOD_NOT_ALLOWED',
      message: 'This endpoint only accepts POST requests',
    },
    { status: 405 }
  );
}
