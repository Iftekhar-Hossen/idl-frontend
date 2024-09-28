import { NextResponse } from 'next/server';

export function middleware(req) {
  const res = NextResponse.next();

  // Set CORS headers
  res.headers.set('Access-Control-Allow-Origin', '*'); // Adjust according to your needs
  res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  // allow iframes from all domains
  res.headers.set('Content-Security-Policy', 'frame-ancestors *');

  // index.B9Ati0hC.entry.js:2077 Refused to frame 'http://localhost:3000/' because it violates the following Content Security Policy directive: "child-src 'self' blob:". Note that 'frame-src' was not explicitly set, so 'child-src' is used as a fallback.
  // slolve this
  res.headers.set('Content-Security-Policy', "frame-ancestors 'self' http://api");
  
  return res;
}

