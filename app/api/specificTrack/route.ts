import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {createRouteHandlerClient} from "@supabase/auth-helpers-nextjs";

export async function GET (request: Request, response: Response) {
    const supabase = createRouteHandlerClient({ cookies });


    // return NextResponse.redirect(url.origin);
}