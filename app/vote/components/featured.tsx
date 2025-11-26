import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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
import { useState } from "react";
import { upvoteMember } from "@/lib/api";
import toast from "react-hot-toast";

const CONGRESS_API_KEY = "g4g9hInpzEbA7vb3j0rqCpNb40YcfUj2zRKed27i";

// Type definitions
interface Politician {
  id: string | number;
  name: string;
  position: string;
  image: string;
  rank: number;
  votes: number;
  trending?: boolean;
  external_id: string;
  bio?: string;
  bioguideId?: string;
}

interface MemberDetails {
  bioguideId: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
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

interface FeaturedProps {
  politicians: Politician[];
}

const Featured = ({ politicians }: FeaturedProps) => {
  const [items, setItems] = useState(politicians);
  const [loadingId, setLoadingId] = useState<string | number | null>(null);
  const [selectedPolitician, setSelectedPolitician] =
    useState<Politician | null>(null);
  const [loadingDetails, setLoadingDetails] = useState<boolean>(false);
  const [selectedMemberDetails, setSelectedMemberDetails] =
    useState<MemberDetails | null>(null);
  const [dialogOpen, setDialogOpen] = useState<string | null>(null);

  const handleUpvote = async (id: string | number) => {
    try {
      setLoadingId(id);

      const res = await upvoteMember(id);

      if (res?.success) {
        setItems((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, votes: item.votes + 1 } : item
          )
        );

        toast.success("Vote successful! 🎉");
      } else {
        toast.error(res?.message || "You already voted ❌");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong ❌");
    } finally {
      setLoadingId(null);
    }
  };

  const fetchMemberDetails = async (detailId: string) => {
    try {
      setLoadingDetails(true);
      const response = await fetch(
        `https://api.congress.gov/v3/member/${detailId}?format=json&api_key=${CONGRESS_API_KEY}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch member details: ${response.status}`);
      }

      const data = await response.json();
      console.log("Member Details:", data);

      if (data.member) {
        setSelectedMemberDetails(data.member);

        // Update the politician's bio in the list
        setItems((prev) =>
          prev.map((p) => {
            if (p.external_id === detailId) {
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Error fetching member details:", err);
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleOpenDialog = (politician: Politician) => {
    setSelectedPolitician(politician);
    setDialogOpen(politician.id.toString());
    if (politician.external_id) {
      fetchMemberDetails(politician.external_id);
    }
  };
  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto px-4 pt-16 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="text-start mb-6">
            <h2 className="text-2xl md:text-4xl font-mont font-bold text-primary dark:text-white mb-3">
              Featured Politicians
            </h2>
            <p className="text-sm md:text-base text-muted-foreground fontroboto max-w-2xl">
              Check out the featured politicians for this week.
            </p>
          </div>
          <Badge className="bg-secondary text-white gap-1 rounded-full px-3 py-1">
            <TrendingUp size={14} /> Trending
          </Badge>
        </div>

        <div className="mb-20">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent className="-ml-2">
              {politicians.map((politician) => (
                <CarouselItem
                  key={politician.id}
                  className="md:basis-1/2 lg:basis-1/3 pl-2"
                >
                  <div className="p-1">
                    <Card className="relative rounded-none overflow-hidden h-[280px] border-border hover:shadow-lg transition-shadow duration-300 hover:border-primary/30">
                      <CardContent className="p-0 h-full">
                        <div
                          className="absolute inset-0 bg-cover bg-center"
                          style={{
                            backgroundImage: `url(${politician.image})`,
                          }}
                        />
                        <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />
                        <div className="relative h-full flex flex-col justify-between px-4">
                          <div className="flex items-center justify-between pt-3">
                            <Badge className="rounded-full px-3 py-1 text-xs bg-red-600 text-white">
                              #{politician.rank}
                            </Badge>
                            {/* <div className="text-white/90 bg-primary backdrop-blur-sm px-3 py-1 rounded-full text-xs">
                              {politician.votes} votes
                            </div> */}
                          </div>

                          <div className="flex-1 p-4 flex flex-col justify-between text-white">
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="text-lg font-bold text-white fontmont">
                                  {politician.name}
                                </h3>
                              </div>
                              <p className="text-sm text-white fontroboto mb-3">
                                {politician.position}
                              </p>
                            </div>
                            <div className="flex items-center justify-between pb-2">
                              {/* <div>
                                <p className="text-lg font-bold text-white flex gap-1 items-center fontmont">
                                  {politician.votes}
                                  <span className="text-xs text-white fontroboto">
                                    Votes
                                  </span>
                                </p>
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
                                  <ThumbsDown className="w-10 h-10" />
                                </Button>
                              </div>
                            </div>
                          </div>

                          <Dialog
                            open={dialogOpen === politician.id.toString()}
                            onOpenChange={(open) => {
                              if (!open) {
                                setDialogOpen(null);
                                setSelectedPolitician(null);
                                setSelectedMemberDetails(null);
                              }
                            }}
                          >
                            <DialogTrigger asChild>
                              <Button
                                onClick={() => handleOpenDialog(politician)}
                                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none w-full"
                              >
                                View Profile
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-xl">
                              <DialogHeader>
                                <DialogTitle className="fontmont">
                                  {selectedPolitician?.name ?? politician.name}
                                </DialogTitle>
                                <DialogDescription className="fontroboto">
                                  {selectedPolitician?.position ??
                                    politician.position}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="rounded-md border border-border overflow-hidden">
                                  <img
                                    src={
                                      selectedPolitician?.image ??
                                      politician.image
                                    }
                                    alt={
                                      selectedPolitician?.name ??
                                      politician.name
                                    }
                                    className="w-full h-40 object-cover"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <div className="text-sm text-muted-foreground fontroboto">
                                    Rank
                                  </div>
                                  <div className="text-lg font-semibold text-foreground">
                                    #
                                    {selectedPolitician?.rank ??
                                      politician.rank}
                                  </div>
                                  {/* <div className="text-sm text-muted-foreground fontroboto">
                                    Votes
                                  </div>
                                  <div className="text-lg font-semibold text-primary fontmont">
                                    {politician.votes}
                                  </div> */}
                                  {(selectedPolitician?.trending ??
                                    politician.trending) && (
                                    <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground">
                                      <TrendingUp size={14} /> Trending
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Biography Section */}
                              {loadingDetails && (
                                <div className="flex items-center justify-center py-4">
                                  <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" />
                                  <span className="ml-2 text-sm text-muted-foreground">
                                    Loading details...
                                  </span>
                                </div>
                              )}

                              {!loadingDetails &&
                                (selectedPolitician?.bio || politician.bio) && (
                                  <div className="mt-4">
                                    <div className="text-sm text-muted-foreground fontroboto mb-2">
                                      Biography
                                    </div>
                                    <p className="text-sm text-foreground fontroboto leading-relaxed">
                                      {selectedPolitician?.bio ||
                                        politician.bio}
                                    </p>
                                  </div>
                                )}
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
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="border-primary text-primary hover:bg-primary hover:text-primary-foreground" />
            <CarouselNext className="border-primary text-primary hover:bg-primary hover:text-primary-foreground" />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Featured;
