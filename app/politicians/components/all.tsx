"use client";
import { TrendingUp, Vote } from "lucide-react";
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

const politicians = [
  {
    id: 1,
    name: "John Doe",
    position: "House of Representatives",
    image: "/flag.png",
    votes: "2,000",
    trending: true,
    rank: 1,
  },
  {
    id: 2,
    name: "Jane Smith",
    position: "Senate",
    image: "/flag.png",
    votes: "1,850",
    trending: false,
    rank: 2,
  },
  {
    id: 3,
    name: "Robert Johnson",
    position: "Governor",
    image: "/flag.png",
    votes: "1,720",
    trending: true,
    rank: 3,
  },
];

const PoliticianCard = ({
  politician,
  isTopRanked,
}: {
  politician: {
    id: number;
    name: string;
    position: string;
    image: string;
    votes: string;
    trending: boolean;
    rank: number;
  };
  isTopRanked: boolean;
}) => (
  <Dialog>
    <DialogTrigger asChild>
      <div
        className={
          "bg-white dark:bg-slate-800 rounded-none mb-4 fontroboto overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 cursor-pointer"
        }
      >
        <div
          className={
            "relative bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 overflow-hidden"
          }
        >
          <img
            src={politician.image}
            alt={politician.name}
            className="w-full h-full object-cover"
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
          className={`p-6 ${isTopRanked ? "flex flex-col justify-center" : ""}`}
        >
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-1 text-3xl">
                {politician.name}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 font-medium">
                {politician.position}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-700">
              <span className="flex items-center gap-1.5">
                <Vote size={16} className="text-slate-400" />
                {politician.votes} votes
              </span>
            </div>

            <div className="w-full mt-4 px-6 py-3 bg-primary dark:bg-slate-100 text-white dark:text-slate-900 rounded-none font-semibold transition-all duration-200 flex items-center justify-center gap-2">
              View Profile
            </div>
          </div>
        </div>
      </div>
    </DialogTrigger>

    <DialogContent className="sm:max-w-xl">
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
            className="w-full h-40 object-cover"
          />
        </div>
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground fontroboto">Rank</div>
          <div className="text-lg font-semibold text-foreground">
            #{politician.rank}
          </div>
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
      <DialogFooter>
        <Link href={"/vote"}>
          <Button className="rounded-none">Vote Now</Button>
        </Link>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

const Politicians = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 pt-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-start mb-6">
          <h2 className="text-2xl md:text-4xl font-mont font-bold text-primary dark:text-white mb-3">
            All Politicians
          </h2>
          <p className="text-sm md:text-base text-muted-foreground fontroboto max-w-2xl">
            Meet the political leaders shaping our future
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

export default Politicians;
