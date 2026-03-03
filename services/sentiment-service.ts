import OpenAI from 'openai';
import type { Review, SentimentAnalysis, SentimentType } from '@/types/movie';

export class SentimentServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SentimentServiceError';
  }
}

/**
 * Analyzes movie reviews and generates sentiment insights using OpenAI
 * @param reviews - Array of movie reviews
 * @param movieTitle - Title of the movie for context
 * @returns Sentiment analysis with summary and classification
 */
export async function analyzeSentiment(
  reviews: Review[],
  movieTitle: string
): Promise<SentimentAnalysis> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new SentimentServiceError('OPENAI_API_KEY is not configured');
  }

  if (!reviews || reviews.length === 0) {
    throw new SentimentServiceError('No reviews provided for analysis');
  }

  try {
    const openai = new OpenAI({ apiKey });

    // Prepare review text for analysis
    const reviewTexts = reviews
      .slice(0, 10) // Limit to 10 reviews to stay within token limits
      .map((review, idx) => {
        const rating = review.rating ? `(Rating: ${review.rating}/10)` : '';
        return `Review ${idx + 1} ${rating}: ${review.content}`;
      })
      .join('\n\n');

    const prompt = `Analyze the following audience reviews for the movie "${movieTitle}".

Reviews:
${reviewTexts}

Please provide:
1. A concise 3-5 sentence summary of the overall audience sentiment, highlighting key themes and opinions.
2. An overall sentiment classification: "Positive", "Mixed", or "Negative"

Guidelines:
- "Positive": Predominantly favorable reviews with high ratings and praise
- "Mixed": Balanced opinions with both positive and negative aspects
- "Negative": Mostly unfavorable reviews with criticism and low ratings

Respond in JSON format:
{
  "summary": "Your 3-5 sentence summary here",
  "classification": "Positive" | "Mixed" | "Negative"
}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a film critic and sentiment analysis expert. Provide objective, insightful analysis of movie reviews.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 300,
      response_format: { type: 'json_object' },
    });

    const response = completion.choices[0]?.message?.content;

    if (!response) {
      throw new SentimentServiceError('No response from OpenAI');
    }

    const parsed = JSON.parse(response) as {
      summary: string;
      classification: string;
    };

    // Validate classification
    const validClassifications: SentimentType[] = ['Positive', 'Mixed', 'Negative'];
    const classification = parsed.classification as SentimentType;

    if (!validClassifications.includes(classification)) {
      throw new SentimentServiceError('Invalid sentiment classification returned');
    }

    return {
      summary: parsed.summary,
      classification,
    };
  } catch (error) {
    if (error instanceof SentimentServiceError) {
      throw error;
    }

    // Handle OpenAI-specific errors
    if (error instanceof OpenAI.APIError) {
      throw new SentimentServiceError(`OpenAI API error: ${error.message}`);
    }

    throw new SentimentServiceError(`Failed to analyze sentiment: ${(error as Error).message}`);
  }
}

/**
 * Fallback sentiment analysis using simple heuristics
 * Used when AI service is unavailable
 * @param reviews - Array of movie reviews
 * @returns Basic sentiment analysis
 */
export function analyzeSentimentFallback(reviews: Review[]): SentimentAnalysis {
  if (!reviews || reviews.length === 0) {
    return {
      summary: 'No reviews available for sentiment analysis.',
      classification: 'Mixed',
    };
  }

  // Calculate average rating
  const ratingsWithValues = reviews.filter((r) => r.rating !== undefined);
  const averageRating = ratingsWithValues.length > 0
    ? ratingsWithValues.reduce((sum, r) => sum + (r.rating || 0), 0) / ratingsWithValues.length
    : 5;

  // Count positive/negative keywords in reviews
  const positiveKeywords = ['great', 'excellent', 'amazing', 'love', 'fantastic', 'brilliant', 'outstanding', 'masterpiece'];
  const negativeKeywords = ['bad', 'terrible', 'awful', 'hate', 'worst', 'disappointing', 'boring', 'waste'];

  let positiveCount = 0;
  let negativeCount = 0;

  reviews.forEach((review) => {
    const content = review.content.toLowerCase();
    positiveKeywords.forEach((keyword) => {
      if (content.includes(keyword)) positiveCount++;
    });
    negativeKeywords.forEach((keyword) => {
      if (content.includes(keyword)) negativeCount++;
    });
  });

  // Determine classification
  let classification: SentimentType;
  if (averageRating >= 7 && positiveCount > negativeCount) {
    classification = 'Positive';
  } else if (averageRating <= 4 && negativeCount > positiveCount) {
    classification = 'Negative';
  } else {
    classification = 'Mixed';
  }

  // Generate summary
  const summary = `Based on ${reviews.length} reviews, audiences have ${classification.toLowerCase()} opinions about this film. The average rating is ${averageRating.toFixed(1)}/10. ` +
    `Viewers ${positiveCount > negativeCount ? 'appreciate' : negativeCount > positiveCount ? 'criticize' : 'have mixed feelings about'} various aspects of the movie. ` +
    `Common themes include ${positiveCount > 0 ? 'strong performances and engaging storytelling' : negativeCount > 0 ? 'pacing issues and predictable plot elements' : 'both strengths and weaknesses'}.`;

  return {
    summary,
    classification,
  };
}
