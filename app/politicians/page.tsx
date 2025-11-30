/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  TrendingUp,
  Vote,
  Loader2,
  AlertCircle,
  Trophy,
  Flag,
  MapPin,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";

const CURRENT_CONGRESS = "119";
const CONGRESS_API_KEY = "g4g9hInpzEbA7vb3j0rqCpNb40YcfUj2zRKed27i";

interface Politician {
  id: string;
  memberId: number;
  name: string;
  position: string;
  image: string;
  votes: string;
  votesCount: number;
  trending: boolean;
  rank: number;
  party?: string;
  state?: string;
  bio?: string;
  bioguideId?: string;
}

interface MemberDetails {
  bioguideId: string;
  birthYear?: string;
  officialWebsiteUrl?: string;
  partyHistory?: Array<{
    partyName: string;
    partyAbbreviation: string;
    startYear: number;
  }>;
  terms?: Array<{
    chamber: string;
    congress: number;
    district?: number;
    memberType: string;
    startYear: number;
    stateCode: string;
    stateName: string;
  }>;
  depiction?: {
    imageUrl: string;
    attribution?: string;
  };
}

interface VoteState {
  [memberId: string]: "upvote" | "downvote" | null;
}

// Helper functions for localStorage
const getVoteState = (): VoteState => {
  if (typeof window === "undefined") return {};
  const stored = localStorage.getItem("user_votes");
  return stored ? JSON.parse(stored) : {};
};

const saveVoteState = (state: VoteState) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("user_votes", JSON.stringify(state));
};

const getClientIP = async (): Promise<string> => {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error("Error fetching IP:", error);
    return "127.0.0.1";
  }
};

const PoliticianCard = ({
  politician,
  isTopRanked,
  onOpenDialog,
  onVote,
  userVote,
}: {
  politician: Politician;
  isTopRanked: boolean;
  onOpenDialog: (bioguideId: string) => void;
  onVote: (memberId: string, voteType: "upvote" | "downvote") => void;
  userVote: "upvote" | "downvote" | null;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVoting, setIsVoting] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open && politician.bioguideId) {
      onOpenDialog(politician.bioguideId);
    }
  };

  const handleVote = async (
    e: React.MouseEvent,
    voteType: "upvote" | "downvote"
  ) => {
    e.stopPropagation();
    setIsVoting(true);
    await onVote(politician.id, voteType);
    setIsVoting(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <div
          className={
            "bg-white dark:bg-slate-800 rounded-none mb-4 fontroboto overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 cursor-pointer"
          }
        >
          <div
            className={
              "relative from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 overflow-hidden h-64"
            }
          >
            <img
              src={politician.image}
              alt={politician.name}
              className="w-full md:h-full h-[300px] object-fill"
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

          <div
            className={`p-6 ${
              isTopRanked ? "flex flex-col justify-center" : ""
            }`}
          >
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-1 text-xl">
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

              <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-700">
                <span className="flex items-center gap-1.5">
                  <Vote size={16} className="text-slate-400" />
                  {politician.votes} votes
                </span>

                {/* Vote Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handleVote(e, "upvote")}
                    disabled={isVoting}
                    className={`p-2 rounded-lg transition-all ${
                      userVote === "upvote"
                        ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-slate-100 text-slate-600 hover:bg-green-50 hover:text-green-600 dark:bg-slate-700 dark:text-slate-400"
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <ThumbsUp size={16} />
                  </button>
                  <button
                    onClick={(e) => handleVote(e, "downvote")}
                    disabled={isVoting}
                    className={`p-2 rounded-lg transition-all ${
                      userVote === "downvote"
                        ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                        : "bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-600 dark:bg-slate-700 dark:text-slate-400"
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <ThumbsDown size={16} />
                  </button>
                </div>
              </div>

              <div className="w-full mt-4 px-6 py-3 bg-primary dark:bg-slate-100 text-white dark:text-slate-900 rounded-none font-semibold transition-all duration-200 flex items-center justify-center gap-2">
                View Profile
              </div>
            </div>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl overflow-auto h-[90vh] rounded-none">
        <DialogHeader>
          <DialogTitle className="fontmont">{politician.name}</DialogTitle>
          <DialogDescription className="fontroboto">
            {politician.position}
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 fontroboto">
          <div className="rounded-none border border-border overflow-hidden">
            <img
              src={politician.image}
              alt={politician.name}
              className="w-full md:h-full h-[300px] object-fill"
              onError={(e) => {
                e.currentTarget.src = "/flag.png";
              }}
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="grid md:grid-cols-1 grid-cols-2 gap-3">
              {/* Rank Card */}
              <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-700 flex items-center gap-3">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-full text-yellow-600 dark:text-yellow-400">
                  <Trophy size={18} />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground fontroboto uppercase tracking-wider">
                    Rank
                  </div>
                  <div className="text-lg font-bold text-foreground">
                    #{politician.rank}
                  </div>
                </div>
              </div>

              {/* Votes Card */}
              <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-700 flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400">
                  <Vote size={18} />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground fontroboto uppercase tracking-wider">
                    Votes
                  </div>
                  <div className="text-lg font-bold text-foreground">
                    {politician.votes}
                  </div>
                </div>
              </div>

              {/* Party Card */}
              {politician.party && (
                <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-700 flex items-center gap-3">
                  <div
                    className={`p-2 rounded-full ${
                      politician.party === "Democratic"
                        ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                        : politician.party === "Republican"
                        ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                        : "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                    }`}
                  >
                    <Flag size={18} />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground fontroboto uppercase tracking-wider">
                      Party
                    </div>
                    <div className="text-sm font-bold text-foreground">
                      {politician.party}
                    </div>
                  </div>
                </div>
              )}

              {/* State Card */}
              {politician.state && (
                <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-700 flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600 dark:text-green-400">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground fontroboto uppercase tracking-wider">
                      State
                    </div>
                    <div className="text-lg font-bold text-foreground">
                      {politician.state}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Trending Badge */}
            {politician.trending && (
              <div className="w-full bg-gradient-to-r from-red-100 to-red-50 dark:from-red-900/20 dark:to-red-900/10 border border-red-200 dark:border-red-800/30 p-3 rounded-lg flex items-center justify-center gap-2 text-red-700 dark:text-red-400 font-medium">
                <TrendingUp size={16} />
                <span>Currently Trending in Polls</span>
              </div>
            )}
          </div>
        </div>
        {politician.bio && (
          <div className="mt-4">
            <div className="text-sm text-muted-foreground fontroboto mb-1">
              Biography
            </div>
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
};

const Politicians = () => {
  const [politicians, setPoliticians] = useState<Politician[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [selectedMemberDetails, setSelectedMemberDetails] =
    useState<MemberDetails | null>(null);
  const [loadingDetails, setLoadingDetails] = useState<boolean>(false);
  const [userVotes, setUserVotes] = useState<VoteState>({});

  useEffect(() => {
    fetchCongressMembers();
    setUserVotes(getVoteState());
  }, []);

  const fetchCongressMembers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("https://voteunited.buyjet.ng/api/members");

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const members = data?.members || [];

      if (!Array.isArray(members)) {
        throw new Error("Members data is not an array");
      }

      const transformedPoliticians: Politician[] = members.map(
        (member: any, index: number) => {
          const latestTerm = member.terms?.[0];

          let position = "Member of Congress";
          if (latestTerm?.chamber === "Senate") {
            position = "U.S. Senator";
          } else if (latestTerm?.chamber === "House of Representatives") {
            position = "U.S. Representative";
          }

          const votesCount = member.votes_count || 0;

          return {
            id: member.external_id,
            memberId: member.id,
            name: member.name,
            position,
            image: member.image_url,
            party: member.party,
            state: member.state,
            district: member.district,
            votes: votesCount.toLocaleString(),
            votesCount: votesCount,
            trending: Math.random() > 0.7,
            rank: index + 1,
            bio: member.source_url ? `Source: ${member.source_url}` : "",
            bioguideId: member.external_id,
          };
        }
      );

      setPoliticians(transformedPoliticians);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchMemberDetails = async (bioguideId: string) => {
    try {
      setLoadingDetails(true);
      const response = await fetch(
        `https://api.congress.gov/v3/member/${bioguideId}?format=json&api_key=${CONGRESS_API_KEY}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch member details: ${response.status}`);
      }

      const data = await response.json();

      if (data.member) {
        setSelectedMemberDetails(data.member);

        setPoliticians((prev) =>
          prev.map((p) => {
            if (p.bioguideId === bioguideId) {
              const member = data.member;
              const partyInfo = member.partyHistory?.[0];
              const termInfo = member.terms?.[0];

              let bioText = `${member.firstName || ""} ${
                member.middleName || ""
              } ${member.lastName || ""}`;

              if (member.birthYear) {
                bioText += ` was born in ${member.birthYear}.`;
              }

              if (partyInfo) {
                bioText += ` Member of the ${partyInfo.partyName} party since ${partyInfo.startYear}.`;
              }

              if (termInfo) {
                bioText += ` Currently serving in the ${termInfo.chamber}`;
                if (termInfo.district) {
                  bioText += `, representing District ${termInfo.district} of ${termInfo.stateName}`;
                } else {
                  bioText += ` representing ${termInfo.stateName}`;
                }
                bioText += `.`;
              }

              if (member.officialWebsiteUrl) {
                bioText += ` Official website: ${member.officialWebsiteUrl}`;
              }

              return { ...p, bio: bioText };
            }
            return p;
          })
        );
      }
    } catch (err: any) {
      console.error("Error fetching member details:", err);
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleVote = async (
    memberId: string,
    voteType: "upvote" | "downvote"
  ) => {
    const currentVote = userVotes[memberId];

    // Prevent duplicate votes
    if (currentVote === voteType) {
      toast.error(`You already ${voteType}d this member`);
      return;
    }

    // Find the politician to get their numeric memberId
    const politician = politicians.find((p) => p.id === memberId);
    if (!politician) {
      toast.error("Member not found");
      return;
    }

    try {
      const ip = await getClientIP();

      // Optimistic UI update
      setPoliticians((prev) =>
        prev.map((p) => {
          if (p.id === memberId) {
            let newVotesCount = p.votesCount;

            // Remove previous vote effect
            if (currentVote === "upvote") {
              newVotesCount -= 1;
            } else if (currentVote === "downvote") {
              newVotesCount += 1;
            }

            // Apply new vote effect
            if (voteType === "upvote") {
              newVotesCount += 1;
            } else if (voteType === "downvote") {
              newVotesCount -= 1;
            }

            return {
              ...p,
              votesCount: Math.max(0, newVotesCount),
              votes: Math.max(0, newVotesCount).toLocaleString(),
            };
          }
          return p;
        })
      );

      // Update local storage
      const newVoteState = { ...userVotes, [memberId]: voteType };
      setUserVotes(newVoteState);
      saveVoteState(newVoteState);

      // Make API call
      const endpoint = voteType === "upvote" ? "/api/upvote" : "/api/downvote";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          member_id: politician.memberId,
          ip: ip,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${voteType}`);
      }

      const data = await response.json();
      toast.success(data.message || `Successfully ${voteType}d!`);
    } catch (err: any) {
      console.error(`Error ${voteType}ing:`, err);
      toast.error(`Failed to ${voteType}. Please try again.`);

      // Revert optimistic update on error
      setPoliticians((prev) =>
        prev.map((p) => {
          if (p.id === memberId) {
            let revertedCount = p.votesCount;

            // Revert the vote change
            if (voteType === "upvote") {
              revertedCount -= 1;
            } else if (voteType === "downvote") {
              revertedCount += 1;
            }

            // Restore previous vote if existed
            if (currentVote === "upvote") {
              revertedCount += 1;
            } else if (currentVote === "downvote") {
              revertedCount -= 1;
            }

            return {
              ...p,
              votesCount: Math.max(0, revertedCount),
              votes: Math.max(0, revertedCount).toLocaleString(),
            };
          }
          return p;
        })
      );

      // Revert vote state
      setUserVotes(userVotes);
      saveVoteState(userVotes);
    }
  };

  const filteredPoliticians = politicians.filter((p: Politician) => {
    if (filter === "all") return true;
    if (filter === "trending") return p.trending;
    if (filter === "republican") return p.party === "Republican";
    if (filter === "democratic") return p.party === "Democratic";
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 pt-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
            <p className="mt-4 text-slate-600 dark:text-slate-400">
              Loading members of Congress...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 pt-16 px-4 sm:px-6 lg:px-8">
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
              <Button
                onClick={fetchCongressMembers}
                className="mt-4 rounded-none"
              >
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen fontroboto from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 pt-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-start mb-6">
          <h2 className="text-2xl md:text-4xl font-mont font-bold text-primary dark:text-white mb-3">
            Current Members of Congress
          </h2>
          <p className="text-sm md:text-base text-muted-foreground fontroboto max-w-2xl">
            {CURRENT_CONGRESS}th Congress (2025-2027) - Live data from
            Congress.gov
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-none text-sm font-medium transition-colors ${
              filter === "all"
                ? "bg-primary text-white"
                : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
            }`}
          >
            All ({politicians.length})
          </button>
          <button
            onClick={() => setFilter("trending")}
            className={`px-4 py-2 rounded-none text-sm font-medium transition-colors ${
              filter === "trending"
                ? "bg-primary text-white"
                : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
            }`}
          >
            Trending ({politicians.filter((p: Politician) => p.trending).length}
            )
          </button>
          <button
            onClick={() => setFilter("republican")}
            className={`px-4 py-2 rounded-none text-sm font-medium transition-colors ${
              filter === "republican"
                ? "bg-primary text-white"
                : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
            }`}
          >
            Republican (
            {
              politicians.filter((p: Politician) => p.party === "Republican")
                .length
            }
            )
          </button>
          <button
            onClick={() => setFilter("democratic")}
            className={`px-4 py-2 rounded-none text-sm font-medium transition-colors ${
              filter === "democratic"
                ? "bg-primary text-white"
                : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
            }`}
          >
            Democratic (
            {
              politicians.filter((p: Politician) => p.party === "Democratic")
                .length
            }
            )
          </button>
        </div>

        {filteredPoliticians.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-600 dark:text-slate-400">
              No politicians found
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {filteredPoliticians.map(
              (politician: Politician, index: number) => (
                <PoliticianCard
                  key={politician.id}
                  politician={politician}
                  isTopRanked={index === 0}
                  onOpenDialog={fetchMemberDetails}
                  onVote={handleVote}
                  userVote={userVotes[politician.id] || null}
                />
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Politicians;