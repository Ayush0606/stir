// Movie data from OMDb/TMDb
export interface MovieData {
  title: string;
  poster: string;
  cast: string[];
  year: string;
  imdbRating: string;
  plot: string;
  imdbId: string;
}

// Review data
export interface Review {
  author: string;
  content: string;
  rating?: number;
}

// Sentiment classification
export type SentimentType = 'Positive' | 'Mixed' | 'Negative';

// AI-generated insights
export interface SentimentAnalysis {
  summary: string;
  classification: SentimentType;
}

// Complete movie insights response
export interface MovieInsights {
  movie: MovieData;
  sentiment: SentimentAnalysis;
}

// API error response
export interface ApiError {
  error: string;
  message: string;
}

// OMDb API response
export interface OmdbResponse {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
  Error?: string;
}

// TMDb API response types
export interface TmdbMovieResponse {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  overview: string;
  vote_average: number;
  imdb_id: string;
}

export interface TmdbCreditsResponse {
  id: number;
  cast: Array<{
    name: string;
    character: string;
    order: number;
  }>;
}

export interface TmdbReviewsResponse {
  id: number;
  results: Array<{
    author: string;
    author_details: {
      rating: number | null;
    };
    content: string;
    created_at: string;
  }>;
}
