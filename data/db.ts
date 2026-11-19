
import Database from "better-sqlite3";
import path from "path";
import { profiles } from "./profiles";

const dbPath = path.join(process.cwd(), "data", "coy.sqlite");

const db = new Database(dbPath);

db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS profiles (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    age INTEGER NOT NULL,
    photo TEXT NOT NULL,
    bio TEXT NOT NULL,
    location TEXT NOT NULL,
    interests TEXT NOT NULL,
    has_liked_user INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS swipes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    profile_id INTEGER NOT NULL,
    action TEXT NOT NULL CHECK(action IN ('like', 'pass')),
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, profile_id),
    FOREIGN KEY(profile_id) REFERENCES profiles(id)
  );
`);

// Seed profiles only when the database is empty.
const count = db
  .prepare("SELECT COUNT(*) AS total FROM profiles")
  .get() as { total: number };

if (count.total === 0) {
  const insert = db.prepare(`
    INSERT INTO profiles
    (id, name, age, photo, bio, location, interests, has_liked_user)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const seed = db.transaction(() => {
    for (const profile of profiles) {
      insert.run(
        profile.id,
        profile.name,
        profile.age,
        profile.photo,
        profile.bio,
        profile.location,
        JSON.stringify(profile.interests),
        profile.likedYou ? 1 : 0
      );
    }
  });

  seed();
}

export default db;
