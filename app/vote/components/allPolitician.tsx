"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThumbsDown, ThumbsUp, TrendingUp } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { upvoteMember } from "@/lib/api";

// Type definitions
interface Politician {
  id: string | number;
  name: string;
  position: string;
  image: string;
  rank: number;
  votes: number;
  trending?: boolean;
}

interface AllPoliticianProps {
  politicians?: Politician[];
}

interface IpResponse {
  ip: string;
}

interface VoteResponse {
  votes?: number;
  message?: string;
}

type VoteType = "up" | "down";

const AllPolitician = ({ politicians = [] }: AllPoliticianProps) => {
  const [items, setItems] = useState(politicians);
  const [ip, setIp] = useState<string | null>(null);
  const [selectedPolitician, setSelectedPolitician] =
    useState<Politician | null>(null);
  const [list, setList] = useState<Politician[]>(politicians);
  const [loadingId, setLoadingId] = useState<string | number | null>(null);

  // keep local list in sync if the prop changes
  useEffect(() => {
    setList(politicians);
  }, [politicians]);

  // fetch IP on mount
  useEffect(() => {
    const fetchIp = async (): Promise<void> => {
      try {
        const res = await fetch("https://api.ipify.org?format=json");
        if (!res.ok) throw new Error("Failed to fetch IP");
        const data: IpResponse = await res.json();
        setIp(data.ip);
      } catch (err) {
        console.error("Error fetching IP address:", err);
      }
    };
    fetchIp();
  }, []);

  // central vote handler
  const handleUpvote = async (id: string | number) => {
    try {
      setLoadingId(id);

      const res = await upvoteMember(id);

      // Assuming API returns success
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, votes: item.votes + 1 } : item
        )
      );
    } catch (err) {
      console.error("Vote failed:", err);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <div className="text-start mb-6">
          <h2 className="text-2xl md:text-4xl font-mont font-bold text-primary dark:text-white mb-3">
            All Politicians
          </h2>
          <p className="text-sm md:text-base text-muted-foreground fontroboto max-w-2xl">
            Check out all politicians for this week.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((politician) => (
          <Card
            key={politician.id}
            className="relative overflow-hidden rounded-none h-[280px] border-border hover:shadow-lg transition-shadow duration-300 hover:border-primary/30"
          >
            <CardContent className="p-0 h-full">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${politician.image})` }}
              />
              <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />

              <div className="relative h-full flex flex-col justify-between px-4 py-3">
                <div className="flex items-center justify-between">
                  <Badge className="rounded-full px-3 py-1 text-xs bg-secondary text-white">
                    #{politician.rank}
                  </Badge>
                  {/* <div className="text-white/90 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full text-xs">
                    {politician.votes} votes
                  </div> */}
                </div>

                <div className="flex-1 flex flex-col justify-end text-white">
                  <div>
                    <h3 className="text-lg font-bold text-white fontmont">
                      {politician.name}
                    </h3>
                    <p className="text-sm text-white/90 fontroboto mb-3">
                      {politician.position}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pb-2">
                    {/* <div className="flex items-end gap-2">
                      <span className="text-lg font-bold text-white fontmont">
                        {politician.votes}
                      </span>
                      <span className="text-xs text-white/80 fontroboto">
                        Votes
                      </span>
                    </div> */}
                    <div className="flex gap-2 items-center">
                      <Button
                        aria-label={`Upvote ${politician.name}`}
                        className="text-primary hover:bg-primary/90 border border-primary bg-white rounded-none"
                        variant="outline"
                        disabled={loadingId === politician.id}
                        onClick={() => handleUpvote(politician.id)}
                      >
                        {loadingId === politician.id ? (
                          <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" />
                        ) : (
                          <ThumbsUp className="w-10 h-10" />
                        )}
                      </Button>
                      <Button
                        aria-label={`Downvote ${politician.name}`}

                        className="text-primary hover:bg-primary/90 border border-primary rounded-none bg-red-100"
                        variant="outline"
                      >
                        <ThumbsDown className="w-6 h-6" />
                      </Button>
                    </div>
                  </div>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => setSelectedPolitician(politician)}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none w-full"
                    >
                      View Profile
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-xl rounded-none">
                    <DialogHeader>
                      <DialogTitle className="fontmont">
                        {selectedPolitician?.name ?? politician.name}
                      </DialogTitle>
                      <DialogDescription className="fontroboto">
                        {selectedPolitician?.position ?? politician.position}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="rounded-md border border-border overflow-hidden">
                        <img
                          src={selectedPolitician?.image ?? politician.image}
                          alt={selectedPolitician?.name ?? politician.name}
                          className="w-full h-40 object-cover"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground fontroboto">
                          Rank
                        </div>
                        <div className="text-lg font-semibold text-foreground">
                          #{selectedPolitician?.rank ?? politician.rank}
                        </div>
                        {/* <div className="text-sm text-muted-foreground fontroboto">
                          Votes
                        </div>
                        <div className="text-lg font-semibold text-primary fontmont">
                          {selectedPolitician?.votes ?? politician.votes}
                        </div> */}
                        {(selectedPolitician?.trending ??
                          politician.trending) && (
                            <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground">
                              <TrendingUp size={14} /> Trending
                            </div>
                          )}
                      </div>
                    </div>
                    <DialogFooter>
                      <div className="flex gap-2 items-center">
                        <Button
                          aria-label={`Upvote ${politician.name}`}
                          className="text-primary hover:bg-primary/90 border border-primary bg-transparent rounded-none"
                          variant="outline"
                          disabled={loadingId === politician.id}
                          onClick={() => handleUpvote(politician.id)}
                        >
                          {loadingId === politician.id ? (
                            <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" />
                          ) : (
                            <ThumbsUp className="w-10 h-10" />
                          )}
                        </Button>
                        <Button
                          aria-label={`Downvote ${politician.name} from modal`}
                         
                          className="text-primary hover:bg-primary/90 border border-primary rounded-none bg-transparent"
                          variant="outline"
                        >
                          <ThumbsDown className="w-6 h-6" />
                        </Button>
                      </div>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllPolitician;
