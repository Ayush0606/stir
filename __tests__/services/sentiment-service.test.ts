import { analyzeSentimentFallback } from '@/services/sentiment-service';
import type { Review } from '@/types/movie';

describe('analyzeSentimentFallback', () => {
  it('should classify as Positive for high ratings and positive keywords', () => {
    const reviews: Review[] = [
      { author: 'User1', content: 'This is an amazing and excellent film!', rating: 9 },
      { author: 'User2', content: 'Loved it! Fantastic performances.', rating: 8 },
      { author: 'User3', content: 'Great movie with brilliant storytelling.', rating: 9 },
    ];

    const result = analyzeSentimentFallback(reviews);

    expect(result.classification).toBe('Positive');
    expect(result.summary).toContain('3 reviews');
  });

  it('should classify as Negative for low ratings and negative keywords', () => {
    const reviews: Review[] = [
      { author: 'User1', content: 'Terrible movie, waste of time.', rating: 2 },
      { author: 'User2', content: 'Awful and disappointing.', rating: 3 },
      { author: 'User3', content: 'Bad acting and boring plot.', rating: 2 },
    ];

    const result = analyzeSentimentFallback(reviews);

    expect(result.classification).toBe('Negative');
    expect(result.summary).toContain('3 reviews');
  });

  it('should classify as Mixed for average ratings', () => {
    const reviews: Review[] = [
      { author: 'User1', content: 'Good movie but has flaws.', rating: 6 },
      { author: 'User2', content: 'Decent film overall.', rating: 5 },
      { author: 'User3', content: 'Some great parts, some bad parts.', rating: 6 },
    ];

    const result = analyzeSentimentFallback(reviews);

    expect(result.classification).toBe('Mixed');
    expect(result.summary).toContain('3 reviews');
  });

  it('should handle reviews without ratings', () => {
    const reviews: Review[] = [
      { author: 'User1', content: 'Great movie!' },
      { author: 'User2', content: 'Amazing film!' },
    ];

    const result = analyzeSentimentFallback(reviews);

    expect(result.classification).toMatch(/Positive|Mixed|Negative/);
    expect(result.summary).toContain('2 reviews');
  });

  it('should return default message for empty reviews', () => {
    const reviews: Review[] = [];

    const result = analyzeSentimentFallback(reviews);

    expect(result.classification).toBe('Mixed');
    expect(result.summary).toContain('No reviews available');
  });

  it('should calculate average rating correctly', () => {
    const reviews: Review[] = [
      { author: 'User1', content: 'Review 1', rating: 8 },
      { author: 'User2', content: 'Review 2', rating: 6 },
      { author: 'User3', content: 'Review 3', rating: 7 },
    ];

    const result = analyzeSentimentFallback(reviews);

    // Average should be 7.0
    expect(result.summary).toContain('7.0');
  });
});
