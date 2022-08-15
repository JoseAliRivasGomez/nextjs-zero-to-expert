import { NextFetchEvent, NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import * as jose from 'jose'
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest, ev: NextFetchEvent) {

    if (req.nextUrl.pathname.startsWith("/checkout")) {

        const session = await getToken({req, secret: process.env.NEXTAUTH_SECRET});

        //console.log({session});
        
        if(!session){
            const { protocol, host, pathname } = req.nextUrl;
            return NextResponse.redirect(
              `${protocol}//${host}/auth/login?p=${pathname}`
            );
        }

        return NextResponse.next();


   
        // const token = req.cookies.get("token");

        // try {
        //     await jose.jwtVerify(
        //         token || "",
        //         new TextEncoder().encode(process.env.JWT_SECRET_SEED || "")
        //       );
        //     return NextResponse.next();
        // } catch (error) {
        //     console.error(`JWT no valido `, { error });
        //     const { protocol, host, pathname } = req.nextUrl;
        //     return NextResponse.redirect(
        //       `${protocol}//${host}/auth/login?p=${pathname}`
        //     );
        // }

    }
    
    if (req.nextUrl.pathname.startsWith("/admin")) {

        const session: any = await getToken({req, secret: process.env.NEXTAUTH_SECRET});
        
        if(!session){
            const { protocol, host, pathname } = req.nextUrl;
            return NextResponse.redirect(
              `${protocol}//${host}/auth/login?p=${pathname}`
            );
        }

        const validRoles = ['admin', 'super-user', 'SEO'];

        if(!validRoles.includes(session.user.role)){
            const { protocol, host } = req.nextUrl;
            return NextResponse.redirect(
              `${protocol}//${host}/`
            );
        }

        return NextResponse.next();

    }

    if (req.nextUrl.pathname.startsWith("/api/admin")) {

        const session: any = await getToken({req, secret: process.env.NEXTAUTH_SECRET});
        
        if(!session){
            const { protocol, host, pathname } = req.nextUrl;
            return NextResponse.redirect(
              `${protocol}//${host}/auth/login?p=${pathname}`
            );
        }

        const validRoles = ['admin', 'super-user', 'SEO'];

        if(!validRoles.includes(session.user.role)){
            const { protocol, host } = req.nextUrl;
            return NextResponse.redirect(
              `${protocol}//${host}/`
            );
        }

        return NextResponse.next();

    }

}

export const config = {
    matcher: ["/checkout/:path*", "/admin/:path*", "/api/admin/:path*"],
};