import { NextFetchEvent, NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import * as jose from 'jose'

export async function middleware(req: NextRequest, ev: NextFetchEvent) {

    if (req.nextUrl.pathname.startsWith("/checkout")) {
   
        const token = req.cookies.get("token");

        try {
            await jose.jwtVerify(
                token || "",
                new TextEncoder().encode(process.env.JWT_SECRET_SEED || "")
              );
            return NextResponse.next();
        } catch (error) {
            console.error(`JWT no valido `, { error });
            const { protocol, host, pathname } = req.nextUrl;
            return NextResponse.redirect(
              `${protocol}//${host}/auth/login?p=${pathname}`
            );
        }

    }

}

export const config = {
    matcher: ["/checkout/:path*"],
};