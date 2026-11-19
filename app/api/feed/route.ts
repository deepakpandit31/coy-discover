
import { NextResponse } from "next/server";
import db from "@/data/db";

// export const runtime = "nodejs";

export async function GET() {
  try {
    const feed = db.prepare(`
      SELECT
        p.id,
        p.name,
        p.age,
        p.photo,
        p.bio,
        p.location,
        p.interests
      FROM profiles p
      WHERE NOT EXISTS (
        SELECT 1
        FROM swipes s
        WHERE s.user_id = ? AND s.profile_id = p.id
      )
      ORDER BY p.id ASC
    `).all("demo-user") as Array<{
      id: number;
      name: string;
      age: number;
      photo: string;
      bio: string;
      location: string;
      interests: string;
    }>;

    return NextResponse.json(
      feed.map((profile) => ({
        ...profile,
        interests: JSON.parse(profile.interests),
      }))
    );
  } catch {
    return NextResponse.json(
      { error: "Unable to load feed" },
      { status: 500 }
    );
  }
}
