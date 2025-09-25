import { NextResponse } from 'next/server';
import { buildProjectsPayload } from '@/app/lib/github';

// Ajuste o username aqui ou use variável de ambiente GITHUB_USERNAME
const USERNAME = process.env.GITHUB_USERNAME || 'persiopg';

export const revalidate = 3600; // 1h cache em edge/server

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limitParam = searchParams.get('limit');
  const topic = searchParams.get('topic') || undefined;
  const limit = limitParam ? Math.min(24, Math.max(1, parseInt(limitParam, 10))) : 6;
  const payload = await buildProjectsPayload(USERNAME, { limit, topic });
  return NextResponse.json(payload, { status: 200 });
}
