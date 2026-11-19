
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  X,
  Home,
  Compass,
  Users,
  MapPin,
  Sparkles,
  RotateCcw,
} from "lucide-react";

type Profile = {
  id: number;
  name: string;
  age: number;
  photo: string;
  bio: string;
  location: string;
  interests: string[];
};

type Tab = "home" | "discover" | "matches";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<Tab>("discover");
  const [feed, setFeed] = useState<Profile[]>([]);
  const [matches, setMatches] = useState<Profile[]>([]);
  const [showMatch, setShowMatch] = useState<Profile | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSwiping, setIsSwiping] = useState(false);
  const [error, setError] = useState("");

  // Load feed and matches from the SQLite APIs.
  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const [feedResponse, matchResponse] = await Promise.all([
        fetch("/api/feed"),
        fetch("/api/matches"),
      ]);

      if (!feedResponse.ok || !matchResponse.ok) {
        throw new Error("Unable to load profiles");
      }

      const feedData: Profile[] = await feedResponse.json();
      const matchData: Profile[] = await matchResponse.json();

      setFeed(feedData);
      setMatches(matchData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const currentProfile = feed[0];

  // Save a like or pass to the backend.
  const handleSwipe = async (action: "like" | "pass") => {
    if (!currentProfile || isSwiping) return;

    try {
      setIsSwiping(true);
      setError("");

      const response = await fetch("/api/swipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profileId: currentProfile.id,
          action,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Swipe failed");
      }

      // Remove the swiped profile from the current feed.
      setFeed((previous) =>
        previous.filter((profile) => profile.id !== currentProfile.id)
      );

      // Show a match only when both users have liked each other.
      if (result.match) {
        setShowMatch(currentProfile);

        const matchResponse = await fetch("/api/matches");

        if (matchResponse.ok) {
          const matchData: Profile[] = await matchResponse.json();
          setMatches(matchData);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save swipe");
    } finally {
      setIsSwiping(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#fff8fa] text-gray-900 pb-24">
      {/* Header */}
      <header className="max-w-5xl mx-auto px-5 py-5 flex justify-between items-center">
        <h1 className="text-3xl font-black text-pink-600">
          coy<span className="text-gray-900">.</span>
        </h1>

        <div className="flex items-center gap-2 text-pink-600">
          <Sparkles size={19} />
          <span className="text-sm font-semibold hidden sm:block">
            Find your connection
          </span>
        </div>
      </header>

      <section className="max-w-md mx-auto px-4">
        {/* HOME: Intentionally blank */}
        {activeTab === "home" && <div className="min-h-[500px]" />}

        {/* DISCOVER */}
        {activeTab === "discover" && (
          <>
            <div className="flex justify-between items-end mb-5">
              <div>
                <p className="text-pink-500 text-sm font-semibold">
                  YOUR NEXT CONNECTION
                </p>

                <h2 className="text-3xl font-bold mt-1">Discover</h2>

                <p className="text-sm text-gray-500 mt-1">
                  Someone interesting might be waiting for you.
                </p>
              </div>

              <button
                onClick={loadData}
                title="Refresh feed"
                aria-label="Refresh feed"
                className="p-3 bg-white rounded-full shadow-sm text-pink-600"
              >
                <RotateCcw size={19} />
              </button>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-4 text-sm">
                {error}
              </div>
            )}

            {loading ? (
              <div className="bg-white rounded-3xl p-10 text-center">
                <p className="text-gray-500">Loading profiles...</p>
              </div>
            ) : currentProfile ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentProfile.id}
                  initial={{ opacity: 0, x: 70 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.8}
                  onDragEnd={(_, info) => {
                    if (info.offset.x > 100) handleSwipe("like");
                    if (info.offset.x < -100) handleSwipe("pass");
                  }}
                  className="bg-white rounded-[28px] overflow-hidden shadow-xl border border-pink-100 cursor-grab active:cursor-grabbing select-none"
                >
                  {/* Profile photo */}
                  <div className="relative h-[430px] sm:h-[480px]">
                    <Image
                      src={currentProfile.photo}
                      alt={currentProfile.name}
                      fill
                      unoptimized
                      draggable={false}
                      className="object-cover pointer-events-none"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />

                    <div className="absolute top-5 left-5">
                      <span className="bg-white/90 text-pink-600 text-xs font-bold px-3 py-2 rounded-full">
                        ✨ Discover
                      </span>
                    </div>

                    <div className="absolute bottom-5 left-5 right-5 text-white pointer-events-none">
                      <h2 className="text-3xl font-bold">
                        {currentProfile.name}, {currentProfile.age}
                      </h2>

                      <p className="flex items-center gap-1 text-sm mt-2">
                        <MapPin size={15} />
                        {currentProfile.location}
                      </p>
                    </div>
                  </div>

                  {/* Profile details */}
                  <div className="p-5">
                    <h3 className="font-bold text-lg mb-2">About me</h3>

                    <p className="text-sm text-gray-600 leading-relaxed">
                      {currentProfile.bio}
                    </p>

                    <h3 className="font-bold mt-5 mb-3">Interests</h3>

                    <div className="flex flex-wrap gap-2">
                      {currentProfile.interests.map((interest) => (
                        <span
                          key={interest}
                          className="bg-pink-50 text-pink-700 text-xs font-semibold px-3 py-2 rounded-full"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="bg-white rounded-3xl p-10 text-center shadow-sm min-h-[400px] flex flex-col items-center justify-center">
                <Heart size={45} className="text-pink-500 mb-4" />

                <h2 className="text-2xl font-bold">You've seen everyone!</h2>

                <p className="text-sm text-gray-500 mt-3">
                  There are no more profiles to discover.
                </p>
              </div>
            )}

            {/* Like and pass buttons */}
            {currentProfile && !loading && (
              <div className="flex justify-center gap-8 mt-7">
                <button
                  disabled={isSwiping}
                  onClick={() => handleSwipe("pass")}
                  aria-label="Pass profile"
                  className="w-16 h-16 rounded-full bg-white shadow-lg border flex items-center justify-center text-red-500 hover:bg-red-50 disabled:opacity-50"
                >
                  <X size={30} />
                </button>

                <button
                  disabled={isSwiping}
                  onClick={() => handleSwipe("like")}
                  aria-label="Like profile"
                  className="w-16 h-16 rounded-full bg-pink-600 shadow-lg flex items-center justify-center text-white hover:bg-pink-700 disabled:opacity-50"
                >
                  <Heart size={29} fill="white" />
                </button>
              </div>
            )}

            <p className="text-center text-xs text-gray-400 mt-5">
              Swipe right to like • Swipe left to pass
            </p>
          </>
        )}

        {/* MATCHES */}
        {activeTab === "matches" && (
          <div>
            <p className="text-pink-500 text-sm font-semibold">
              YOUR CONNECTIONS
            </p>

            <h2 className="text-3xl font-bold mt-1 mb-6">Matches ❤️</h2>

            {matches.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 text-center shadow-sm">
                <Heart
                  size={45}
                  className="mx-auto text-pink-400 mb-4"
                />

                <h3 className="font-bold text-lg">No matches yet</h3>

                <p className="text-gray-500 text-sm mt-2">
                  Keep discovering to find your connection.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {matches.map((match) => (
                  <button
                    key={match.id}
                    type="button"
                    onClick={() => setSelectedMatch(match)}
                    className="w-full text-left bg-white rounded-2xl p-3 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-pink-300"
                  >
                    <img
                      src={match.photo}
                      alt={match.name}
                      className="w-16 h-16 rounded-xl object-cover"
                      loading="lazy"
                    />

                    <div className="min-w-0">
                      <h3 className="font-bold">
                        {match.name}, {match.age}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {match.location}
                      </p>

                      <p className="text-xs text-pink-600 font-semibold mt-1">
                        It's a mutual match! ❤️
                      </p>
                    </div>

                    <Heart
                      className="ml-auto shrink-0 text-pink-500"
                      fill="#ec4899"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-pink-100 z-40">
        <div className="max-w-md mx-auto flex justify-around py-3">
          <button
            onClick={() => setActiveTab("home")}
            className={`flex flex-col items-center gap-1 ${
              activeTab === "home" ? "text-pink-600" : "text-gray-400"
            }`}
          >
            <Home size={23} />
            <span className="text-xs font-semibold">Home</span>
          </button>

          <button
            onClick={() => setActiveTab("discover")}
            className={`flex flex-col items-center gap-1 ${
              activeTab === "discover" ? "text-pink-600" : "text-gray-400"
            }`}
          >
            <Compass size={23} />
            <span className="text-xs font-semibold">Discover</span>
          </button>

          <button
            onClick={() => setActiveTab("matches")}
            className={`flex flex-col items-center gap-1 ${
              activeTab === "matches" ? "text-pink-600" : "text-gray-400"
            }`}
          >
            <Users size={23} />
            <span className="text-xs font-semibold">
              Matches ({matches.length})
            </span>
          </button>
        </div>
      </nav>

      {/* FULL MATCH PROFILE POPUP */}
      <AnimatePresence>
        {selectedMatch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMatch(null)}
            className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(event) => event.stopPropagation()}
              className="bg-white rounded-3xl w-full max-w-md max-h-[85vh] overflow-y-auto shadow-2xl"
            >
              <div className="flex justify-end p-3">
                <button
                  onClick={() => setSelectedMatch(null)}
                  className="p-2 rounded-full bg-pink-50 text-pink-600 hover:bg-pink-100"
                  aria-label="Close profile"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Selected match photo */}
              <div className="relative h-[350px] mx-4 rounded-2xl overflow-hidden">
                <Image
                  src={selectedMatch.photo}
                  alt={selectedMatch.name}
                  fill
                  unoptimized
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                <div className="absolute bottom-5 left-5 text-white">
                  <h2 className="text-3xl font-bold">
                    {selectedMatch.name}, {selectedMatch.age}
                  </h2>

                  <p className="flex items-center gap-1 mt-2 text-sm">
                    <MapPin size={16} />
                    {selectedMatch.location}
                  </p>
                </div>
              </div>

              {/* Selected match details */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-5">
                  <Heart
                    size={20}
                    fill="#ec4899"
                    className="text-pink-500"
                  />
                  <p className="text-pink-600 font-semibold text-sm">
                    It's a mutual match!
                  </p>
                </div>

                <h3 className="font-bold text-lg mb-2">About me</h3>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {selectedMatch.bio}
                </p>

                <h3 className="font-bold text-lg mt-6 mb-3">Interests</h3>

                <div className="flex flex-wrap gap-2">
                  {selectedMatch.interests.map((interest) => (
                    <span
                      key={interest}
                      className="bg-pink-50 text-pink-700 text-xs font-semibold px-4 py-2 rounded-full"
                    >
                      {interest}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedMatch(null)}
                  className="w-full bg-pink-600 text-white rounded-full py-3 mt-7 font-bold hover:bg-pink-700 transition"
                >
                  Close Profile
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NEW MATCH POPUP */}
      <AnimatePresence>
        {showMatch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-5"
          >
            <motion.div
              initial={{ scale: 0.7, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.7 }}
              className="bg-white rounded-[30px] p-7 max-w-sm w-full text-center"
            >
              <div className="text-5xl mb-4">💖</div>

              <p className="text-pink-600 font-bold tracking-widest text-sm">
                IT'S A MATCH!
              </p>

              <h2 className="text-3xl font-black mt-3">
                You both like each other!
              </h2>

              <div className="relative w-32 h-32 rounded-full overflow-hidden mx-auto mt-6 border-4 border-pink-200">
                <Image
                  src={showMatch.photo}
                  alt={showMatch.name}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>

              <h3 className="font-bold text-xl mt-4">
                {showMatch.name}, {showMatch.age}
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                A mutual connection just happened.
              </p>

              <button
                onClick={() => {
                  setShowMatch(null);
                  setActiveTab("matches");
                }}
                className="w-full bg-pink-600 text-white rounded-full py-4 mt-7 font-bold"
              >
                View your matches
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
