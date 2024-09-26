import { NextResponse } from 'next/server';

export function middleware(req) {
  const res = NextResponse.next();

  // Set CORS headers
  res.headers.set('Access-Control-Allow-Origin', '*'); // Adjust according to your needs
  res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  return res;
}

