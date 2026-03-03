import { POST, GET } from '@/app/api/movie-insights/route';
import { NextRequest } from 'next/server';
import * as movieClient from '@/lib/movie-client';
import * as sentimentService from '@/services/sentiment-service';
import * as omdbApi from '@/lib/omdb-api';

// Mock dependencies
jest.mock('@/lib/movie-client');
jest.mock('@/services/sentiment-service');
jest.mock('@/lib/omdb-api');

describe('POST /api/movie-insights', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return movie insights for valid IMDb ID', async () => {
    // Mock data
    const mockMovieData = {
      title: 'The Matrix',
      poster: 'https://example.com/poster.jpg',
      cast: ['Keanu Reeves', 'Laurence Fishburne'],
      year: '1999',
      imdbRating: '8.7',
      plot: 'A computer hacker learns about the true nature of reality.',
      imdbId: 'tt0133093',
    };

    const mockReviews = [
      { author: 'User1', content: 'Great movie!', rating: 9 },
    ];

    const mockSentiment = {
      summary: 'Audiences love this groundbreaking sci-fi film.',
      classification: 'Positive' as const,
    };

    // Setup mocks
    (omdbApi.isValidImdbId as jest.Mock).mockReturnValue(true);
    (movieClient.fetchMovieData as jest.Mock).mockResolvedValue({
      movie: mockMovieData,
      reviews: mockReviews,
    });
    (sentimentService.analyzeSentiment as jest.Mock).mockResolvedValue(mockSentiment);

    // Create request
    const request = new NextRequest('http://localhost:3000/api/movie-insights', {
      method: 'POST',
      body: JSON.stringify({ imdbId: 'tt0133093' }),
    });

    // Call API
    const response = await POST(request);
    const data = await response.json();

    // Assertions
    expect(response.status).toBe(200);
    expect(data).toEqual({
      movie: mockMovieData,
      sentiment: mockSentiment,
    });
    expect(movieClient.fetchMovieData).toHaveBeenCalledWith('tt0133093');
    expect(sentimentService.analyzeSentiment).toHaveBeenCalledWith(
      mockReviews,
      'The Matrix'
    );
  });

  it('should return 400 for missing IMDb ID', async () => {
    const request = new NextRequest('http://localhost:3000/api/movie-insights', {
      method: 'POST',
      body: JSON.stringify({}),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('INVALID_INPUT');
  });

  it('should return 400 for invalid IMDb ID format', async () => {
    (omdbApi.isValidImdbId as jest.Mock).mockReturnValue(false);

    const request = new NextRequest('http://localhost:3000/api/movie-insights', {
      method: 'POST',
      body: JSON.stringify({ imdbId: 'invalid' }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('INVALID_IMDB_ID');
  });

  it('should return 404 when movie is not found', async () => {
    (omdbApi.isValidImdbId as jest.Mock).mockReturnValue(true);
    (movieClient.fetchMovieData as jest.Mock).mockRejectedValue(
      new Error('Movie not found')
    );

    const request = new NextRequest('http://localhost:3000/api/movie-insights', {
      method: 'POST',
      body: JSON.stringify({ imdbId: 'tt9999999' }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(404);
    expect(data.error).toBe('MOVIE_NOT_FOUND');
  });

  it('should use fallback sentiment analysis when AI fails', async () => {
    const mockMovieData = {
      title: 'Test Movie',
      poster: 'poster.jpg',
      cast: ['Actor 1'],
      year: '2020',
      imdbRating: '7.0',
      plot: 'A test plot',
      imdbId: 'tt0000001',
    };

    const mockReviews = [
      { author: 'User1', content: 'Great!', rating: 8 },
    ];

    const mockFallbackSentiment = {
      summary: 'Fallback sentiment analysis.',
      classification: 'Mixed' as const,
    };

    (omdbApi.isValidImdbId as jest.Mock).mockReturnValue(true);
    (movieClient.fetchMovieData as jest.Mock).mockResolvedValue({
      movie: mockMovieData,
      reviews: mockReviews,
    });
    (sentimentService.analyzeSentiment as jest.Mock).mockRejectedValue(
      new sentimentService.SentimentServiceError('AI service unavailable')
    );
    (sentimentService.analyzeSentimentFallback as jest.Mock).mockReturnValue(
      mockFallbackSentiment
    );

    const request = new NextRequest('http://localhost:3000/api/movie-insights', {
      method: 'POST',
      body: JSON.stringify({ imdbId: 'tt0000001' }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.sentiment).toEqual(mockFallbackSentiment);
    expect(sentimentService.analyzeSentimentFallback).toHaveBeenCalled();
  });
});

describe('GET /api/movie-insights', () => {
  it('should return 405 for GET requests', async () => {
    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(405);
    expect(data.error).toBe('METHOD_NOT_ALLOWED');
  });
});
