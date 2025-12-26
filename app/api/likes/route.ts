import Redis from 'ioredis';
import { NextRequest, NextResponse } from 'next/server';

const redis = new Redis(process.env.REDIS_URL!);

// ユーザー識別用のキーを生成（IPアドレス + User-Agent）
function getUserKey(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';
  const userAgent = request.headers.get('user-agent') || 'unknown';

  // IPとUser-Agentの簡易ハッシュを生成
  const hash = Buffer.from(`${ip}-${userAgent}`).toString('base64').slice(0, 32);
  return hash;
}

// いいね数を取得
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page');

    if (!page) {
      return NextResponse.json({ error: 'Page parameter required' }, { status: 400 });
    }

    const userKey = getUserKey(request);
    const likesKey = `likes:${page}`;
    const userLikesKey = `user-likes:${page}`;

    // いいね数を取得
    const likesStr = await redis.get(likesKey);
    const likes = likesStr ? parseInt(likesStr, 10) : 0;

    // ユーザーがいいねしているかチェック
    const isLiked = await redis.sismember(userLikesKey, userKey);

    return NextResponse.json({ likes, isLiked: isLiked === 1 });
  } catch (error) {
    console.error('Error getting likes:', error);
    return NextResponse.json({ likes: 0, isLiked: false });
  }
}

// いいねを追加/削除
export async function POST(request: NextRequest) {
  try {
    const { page } = await request.json();

    if (!page) {
      return NextResponse.json({ error: 'Page parameter required' }, { status: 400 });
    }

    const userKey = getUserKey(request);
    const likesKey = `likes:${page}`;
    const userLikesKey = `user-likes:${page}`;

    // ユーザーが既にいいねしているかチェック
    const isAlreadyLiked = await redis.sismember(userLikesKey, userKey);

    let likes: number;
    let isLiked: boolean;

    if (isAlreadyLiked) {
      // いいねを取り消す
      await redis.srem(userLikesKey, userKey);
      likes = await redis.decr(likesKey);
      // カウントが負にならないようにする
      if (likes < 0) {
        await redis.set(likesKey, 0);
        likes = 0;
      }
      isLiked = false;
    } else {
      // いいねを追加
      await redis.sadd(userLikesKey, userKey);
      likes = await redis.incr(likesKey);
      isLiked = true;
    }

    return NextResponse.json({ likes, isLiked });
  } catch (error) {
    console.error('Error toggling like:', error);
    return NextResponse.json({ error: 'Failed to toggle like' }, { status: 500 });
  }
}
