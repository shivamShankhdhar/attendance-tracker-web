import { NextRequest, NextResponse } from "next/server";
import { fetchWorkspacePreview, extractCodeFromInput } from "@/lib/api";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const rawQuery =
    searchParams.get("code") ||
    searchParams.get("token") ||
    searchParams.get("teamCode") ||
    searchParams.get("team") ||
    searchParams.get("invite") ||
    searchParams.get("q") ||
    "";

  if (!rawQuery) {
    return NextResponse.json({ success: false, error: "Missing token or code parameter" }, { status: 400 });
  }

  const workspace = await fetchWorkspacePreview(rawQuery);
  if (!workspace) {
    return NextResponse.json({ success: false, error: "Workplace or invitation not found" }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    data: workspace,
    cleanToken: extractCodeFromInput(rawQuery),
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const rawInput = body.token || body.code || body.teamCode || "";
    if (!rawInput) {
      return NextResponse.json({ success: false, error: "Missing token or code" }, { status: 400 });
    }

    const workspace = await fetchWorkspacePreview(rawInput);
    if (!workspace) {
      return NextResponse.json({ success: false, error: "Workplace or invitation not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: workspace,
      cleanToken: extractCodeFromInput(rawInput),
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid request payload" }, { status: 400 });
  }
}
