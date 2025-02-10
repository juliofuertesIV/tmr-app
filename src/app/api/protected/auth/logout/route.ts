// src/app/api/auth/logout/route.ts
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
    
    const response = new NextResponse(
        JSON.stringify({ success: true }),
        {
        status: 200,
        headers: { "Content-Type": "application/json" },
        }
    );

    // Clear the session cookie
    response.cookies.set("session", "", {
        path: "/",
        maxAge: 0, // Expire immediately
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    });

    return response;
}
