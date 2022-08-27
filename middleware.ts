import { NextFetchEvent, NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  // if (req.cookies) {
  //   const url = req.nextUrl.clone()
  //   url.pathname = '/enter'
  //   return NextResponse.rewrite(url)
  // }

  // if (!req.url.includes('/api')) {
  //   if (!req.url.includes('/enter') && !req.cookies.applemarket) {
  //     return NextResponse.redirect('/enter')
  //   }
  // }

  // return NextResponse.json({ ok: true })

  if (req.nextUrl.pathname.startsWith('/profile')) {
    console.log('it works! This is Profile')
  }
  if (req.nextUrl.pathname.startsWith('/chat')) {
    console.log('it works! This is chat')
  }
}
