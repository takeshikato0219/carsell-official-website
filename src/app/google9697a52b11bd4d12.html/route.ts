import { NextResponse } from 'next/server';

export async function GET() {
  return new NextResponse('google-site-verification: google9697a52b11bd4d12.html', {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}

