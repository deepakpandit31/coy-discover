import { NextResponse } from "next/server";
import db from "@/data/db";

export async function GET() {
  try {
    const matches = db.prepare(`
      SELECT p.id, p.name, p.age, p.photo, p.bio,
             p.location, p.interests
      FROM profiles p
      INNER JOIN swipes s ON s.profile_id = p.id
      WHERE s.user_id = ?
        AND s.action = 'like'
        AND p.has_liked_user = 1
      ORDER BY s.created_at DESC
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
      matches.map((profile) => ({
        ...profile,
        interests: JSON.parse(profile.interests),
      }))
    );
  } catch (error) {
    console.error("Matches API error:", error);

    return NextResponse.json(
      { error: "Unable to load matches" },
      { status: 500 }
    );
  }
}