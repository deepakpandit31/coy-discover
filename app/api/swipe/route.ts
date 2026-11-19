
import { NextRequest, NextResponse } from "next/server";
import db from "@/data/db";

// export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const profileId = Number(body.profileId);
    const action = body.action;

    if (
      !Number.isInteger(profileId) ||
      !["like", "pass"].includes(action)
    ) {
      return NextResponse.json(
        { error: "Invalid swipe data" },
        { status: 400 }
      );
    }

    const profile = db.prepare(`
      SELECT id, has_liked_user
      FROM profiles
      WHERE id = ?
    `).get(profileId) as
      | { id: number; has_liked_user: number }
      | undefined;

    if (!profile) {
      return NextResponse.json(
        { error: "Profile not found" },
        { status: 404 }
      );
    }

    const alreadySwiped = db.prepare(`
      SELECT id FROM swipes
      WHERE user_id = ? AND profile_id = ?
    `).get("demo-user", profileId);

    if (alreadySwiped) {
      return NextResponse.json(
        { error: "Profile already swiped" },
        { status: 409 }
      );
    }

    const saveSwipe = db.prepare(`
      INSERT INTO swipes (user_id, profile_id, action)
      VALUES (?, ?, ?)
    `);

    saveSwipe.run("demo-user", profileId, action);

    const isMatch =
      action === "like" && profile.has_liked_user === 1;

    return NextResponse.json({
      success: true,
      match: isMatch,
      message: isMatch ? "It's a match!" : "Swipe recorded",
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to record swipe" },
      { status: 500 }
    );
  }
}
