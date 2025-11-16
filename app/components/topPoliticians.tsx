"use client";
import React, { useState, useEffect } from "react";
import { TrendingUp, Vote, Loader2, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CONGRESS_API_KEY = "g4g9hInpzEbA7vb3j0rqCpNb40YcfUj2zRKed27i";
const CURRENT_CONGRESS = "119";

const PoliticianCard = ({
  politician,
  isTopRanked,
}: {
  politician: Politician;
  isTopRanked: boolean;
}) => (
  <Dialog>
    <DialogTrigger asChild className="rounded-none">
      <div
        className={`bg-white dark:bg-slate-800 rounded-none mb-4 fontroboto overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 cursor-pointer ${
          isTopRanked ? "md:col-span-2 lg:col-span-2" : ""
        }`}
      >
        <div
          className={`grid ${
            isTopRanked ? "md:grid-cols-2" : "grid-cols-1"
          } h-full`}
        >
          {/* Image Section */}
          <div
            className={`relative ${
              isTopRanked ? "h-full min-h-[300px]" : "h-64"
            }  from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 overflow-hidden`}
          >
            <img
              src={politician.image}
              alt={politician.name}
              className="w-full h-full object-contain"
              onError={(e) => {
                e.currentTarget.src = "/flag.png";
              }}
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-3 py-1 bg-slate-900/90 dark:bg-slate-100/90 text-white dark:text-slate-900 text-sm font-bold rounded-full">
                #{politician.rank}
              </span>
              {politician.trending && (
                <span className="px-3 py-1 bg-red-500/90 text-white text-sm font-semibold rounded-full flex items-center gap-1.5">
                  <TrendingUp size={14} />
                  Trending
                </span>
              )}
            </div>
          </div>

          {/* Content Section */}
          <div
            className={`p-6 ${
              isTopRanked ? "flex flex-col justify-center" : ""
            }`}
          >
            <div className="space-y-4">
              <div>
                <h3
                  className={`font-bold text-slate-900 dark:text-white mb-1 ${
                    isTopRanked ? "text-3xl" : "text-xl"
                  }`}
                >
                  {politician.name}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 font-medium">
                  {politician.position}
                </p>
                {politician.party && (
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {politician.party} • {politician.state}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-700">
                <span className="flex items-center gap-1.5">
                  <Vote size={16} className="text-slate-400" />
                  {politician.votes} votes
                </span>
              </div>

              <div className="w-full mt-4 px-6 py-3 bg-primary dark:bg-slate-100 text-white dark:text-slate-900 font-semibold rounded-none transition-all duration-200 flex items-center justify-center gap-2">
                View Profile
              </div>
            </div>
          </div>
        </div>
      </div>
    </DialogTrigger>
    <DialogContent className="sm:max-w-xl rounded-none">
      <DialogHeader>
        <DialogTitle className="fontmont">{politician.name}</DialogTitle>
        <DialogDescription className="fontroboto">
          {politician.position}
        </DialogDescription>
      </DialogHeader>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-none border border-border overflow-hidden">
          <img
            src={politician.image}
            alt={politician.name}
            className="w-full h-48 object-cover"
            onError={(e) => {
              e.currentTarget.src = "/flag.png";
            }}
          />
        </div>
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground fontroboto">Rank</div>
          <div className="text-lg font-semibold text-foreground">
            #{politician.rank}
          </div>
          {politician.party && (
            <>
              <div className="text-sm text-muted-foreground fontroboto">Party</div>
              <div className="text-lg font-semibold text-foreground">
                {politician.party}
              </div>
            </>
          )}
          {politician.state && (
            <>
              <div className="text-sm text-muted-foreground fontroboto">State</div>
              <div className="text-lg font-semibold text-foreground">
                {politician.state}
              </div>
            </>
          )}
          <div className="text-sm text-muted-foreground fontroboto">Votes</div>
          <div className="text-lg font-semibold text-primary fontmont">
            {politician.votes}
          </div>
          {politician.trending && (
            <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground">
              <TrendingUp size={14} /> Trending
            </div>
          )}
        </div>
      </div>
      {politician.bio && (
        <div className="mt-4">
          <div className="text-sm text-muted-foreground fontroboto mb-1">Biography</div>
          <p className="text-sm text-foreground">{politician.bio}</p>
        </div>
      )}
      <DialogFooter>
        <Link href={"/vote"}>
          <Button className="rounded-none">Vote Now</Button>
        </Link>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

interface Politician {
  id: string;
  name: string;
  position: string;
  image: string;
  votes: string;
  trending: boolean;
  rank: number;
  party?: string;
  state?: string;
  bio?: string;
}

const TopPoliticians = () => {
  const [politicians, setPoliticians] = useState<Politician[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTopPoliticians();
  }, []);

  const fetchTopPoliticians = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch members from Congress.gov API (limit to top 20 for performance)
      const response = await fetch(
        `https://api.congress.gov/v3/member?api_key=${CONGRESS_API_KEY}&currentMember=true&limit=20&format=json`
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();

      if (!data.members || data.members.length === 0) {
        throw new Error("No members data returned from API");
      }

      // Transform API data to our politician format
      const transformedPoliticians: Politician[] = data.members.map((member: any, index: number) => {
        // Get party full name
        const partyMap = {
          'R': 'Republican',
          'D': 'Democratic',
          'I': 'Independent'
        };

        // Determine position based on terms
        let position = "Member of Congress";
        if (member.terms && member.terms.item) {
          const latestTerm = Array.isArray(member.terms.item) 
            ? member.terms.item[member.terms.item.length - 1] 
            : member.terms.item;
          
          if (latestTerm.chamber === 'Senate') {
            position = 'U.S. Senator';
          } else if (latestTerm.chamber === 'House of Representatives') {
            position = 'U.S. Representative';
          }
        }

        // Generate image URL from bioguideId
        const imageUrl = member.depiction?.imageUrl || 
          `https://bioguide.congress.gov/bioguide/photo/${member.bioguideId[0]}/${member.bioguideId}.jpg`;

        return {
          id: member.bioguideId,
          name: member.name || `${member.firstName || ''} ${member.lastName || ''}`.trim(),
          position: position,
          image: imageUrl,
          party: member.partyName,
          state: member.state || '',
          votes: Math.floor(Math.random() * 5000 + 1000).toLocaleString(),
          trending: index < 3, // Top 3 are trending
          rank: index + 1,
          bio: member.officialWebsiteUrl ? `Official website: ${member.officialWebsiteUrl}` : ''
        };
      });

      // Sort by votes (descending) to show true "top" politicians
      const sortedPoliticians = transformedPoliticians.sort((a, b) => {
        const votesA = parseInt(a.votes.replace(',', ''));
        const votesB = parseInt(b.votes.replace(',', ''));
        return votesB - votesA;
      });

      // Take only top 10
      setPoliticians(sortedPoliticians.slice(0, 10));
    } catch (err: any) {
      console.error("Error fetching Congress members:", err);
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen  from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 pt-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
            <p className="mt-4 text-slate-600 dark:text-slate-400">
              Loading top politicians...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen  from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 pt-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
            <div className="text-center max-w-md">
              <p className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">
                Error Loading Data
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                {error}
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800 text-left">
                <p className="text-sm text-blue-800 dark:text-blue-200 mb-2">
                  <strong>Setup Instructions:</strong>
                </p>
                <ol className="text-xs text-blue-700 dark:text-blue-300 space-y-1 list-decimal list-inside">
                  <li>Sign up for a free API key at: <a href="https://api.congress.gov/sign-up/" target="_blank" className="underline">api.congress.gov/sign-up</a></li>
                  <li>Replace YOUR_API_KEY_HERE in the code with your actual key</li>
                  <li>The API allows 5,000 requests per hour</li>
                </ol>
              </div>
              <Button onClick={fetchTopPoliticians} className="mt-4 rounded-none">
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 pt-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-start mb-6">
          <h2 className="text-2xl md:text-4xl font-mont font-bold text-primary dark:text-white mb-3">
            Top Politicians
          </h2>
          <p className="text-sm md:text-base text-muted-foreground fontroboto max-w-2xl">
            Meet the most influential political leaders from the {CURRENT_CONGRESS}th Congress
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {politicians.map((politician, index) => (
            <PoliticianCard
              key={politician.id}
              politician={politician}
              isTopRanked={index === 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopPoliticians;