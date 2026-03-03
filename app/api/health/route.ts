import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Health check endpoint
 * GET /api/health
 *
 * Returns server status and configuration check
 */
export async function GET() {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    checks: {
      omdbApiConfigured: !!process.env.OMDB_API_KEY,
      tmdbApiConfigured: !!process.env.TMDB_API_KEY,
      openaiApiConfigured: !!process.env.OPENAI_API_KEY,
    },
    version: '1.0.0',
  };

  // Return 503 if critical services are not configured
  if (!health.checks.omdbApiConfigured) {
    return NextResponse.json(
      {
        ...health,
        status: 'degraded',
        message: 'OMDB_API_KEY not configured',
      },
      { status: 503 }
    );
  }

  return NextResponse.json(health, { status: 200 });
}
