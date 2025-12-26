import { kv } from '@vercel/kv';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page');

    if (!page) {
      return NextResponse.json({ error: 'Page parameter required' }, { status: 400 });
    }

    const key = `views:${page}`;
    const views = (await kv.get<number>(key)) || 0;

    return NextResponse.json({ views });
  } catch (error) {
    console.error('Error getting views:', error);
    return NextResponse.json({ views: 0 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { page } = await request.json();

    if (!page) {
      return NextResponse.json({ error: 'Page parameter required' }, { status: 400 });
    }

    const key = `views:${page}`;
    const views = await kv.incr(key);

    return NextResponse.json({ views });
  } catch (error) {
    console.error('Error incrementing views:', error);
    return NextResponse.json({ error: 'Failed to increment views' }, { status: 500 });
  }
}
