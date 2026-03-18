import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const key = typeof body?.key === "string" ? body.key.trim() : "";

    if (!key) {
      return NextResponse.json({ valid: false }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("api_keys")
      .select("id")
      .eq("value", key)
      .maybeSingle();

    if (error) {
      console.error("validate-key error:", error);
      return NextResponse.json({ valid: false }, { status: 500 });
    }

    return NextResponse.json({ valid: !!data });
  } catch {
    return NextResponse.json({ valid: false }, { status: 500 });
  }
}
