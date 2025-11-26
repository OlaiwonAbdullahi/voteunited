"use client";

import Hotline from "./_components/hotline";
import StateSelector from "./_components/stateSelector";
import ResourceCard from "./_components/resourceCard";
import {
  Vote,
  FileText,
  Search,
  BookOpen,
  Shield,
  Sparkles,
} from "lucide-react";

const Page = () => {
  const resources = [
    {
      title: "VOTE411",
      description:
        "Comprehensive voter information from the League of Women Voters. Get personalized ballot information, candidate details, and voting guides.",
      url: "https://www.vote411.org/",
      category: "Registration",
      icon: <Vote size={24} />,
      color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    },
    {
      title: "Vote.gov",
      description:
        "Official U.S. government voting resource. Register to vote, check registration status, and find your polling place all in one place.",
      url: "https://www.vote.gov/",
      category: "Official Gov. Source",
      icon: <Shield size={24} />,
      color:
        "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    },
    {
      title: "Vote Smart",
      description:
        "Non-partisan facts on candidates and elected officials. Research voting records, campaign finance, and issue positions.",
      url: "https://www.votesmart.org/",
      category: "Candidate Research",
      icon: <Search size={24} />,
      color:
        "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    },
    {
      title: "BallotReady",
      description:
        "Your personalized ballot guide. See who and what is on your ballot with detailed information about every race and measure.",
      url: "https://www.ballotready.org/",
      category: "Ballot Research",
      icon: <FileText size={24} />,
      color:
        "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    },
    {
      title: "Ballotpedia",
      description:
        "The encyclopedia of American politics. Comprehensive information on elections, candidates, ballot measures, and political news.",
      url: "https://www.ballotpedia.org/",
      category: "Election Encyclopedia",
      icon: <BookOpen size={24} />,
      color: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-linear-to-br from-primary/5 via-background to-secondary/5 border-b border-border">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-8 py-16 md:py-24 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full mb-6 fontroboto text-sm font-medium">
            <Sparkles size={16} />
            <span>Official Non-Partisan Resources</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-primary dark:text-white mb-6 fontmont">
            Voter Resources
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto fontroboto leading-relaxed">
            Access trusted, non-partisan resources to help you register,
            research candidates, understand your ballot, and make informed
            decisions.
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
            <div className="p-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-none border border-border">
              <div className="text-2xl md:text-3xl font-bold text-primary fontmont">
                5
              </div>
              <div className="text-xs md:text-sm text-muted-foreground fontroboto mt-1">
                Trusted Resources
              </div>
            </div>
            <div className="p-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-none border border-border">
              <div className="text-2xl md:text-3xl font-bold text-primary fontmont">
                50+
              </div>
              <div className="text-xs md:text-sm text-muted-foreground fontroboto mt-1">
                States Covered
              </div>
            </div>
            <div className="p-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-none border border-border">
              <div className="text-2xl md:text-3xl font-bold text-primary fontmont">
                100%
              </div>
              <div className="text-xs md:text-sm text-muted-foreground fontroboto mt-1">
                Non-Partisan
              </div>
            </div>
            <div className="p-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-none border border-border">
              <div className="text-2xl md:text-3xl font-bold text-primary fontmont">
                24/7
              </div>
              <div className="text-xs md:text-sm text-muted-foreground fontroboto mt-1">
                Available
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* State Selector Section */}
      <StateSelector />

      {/* Resources Section */}
      <div className="max-w-7xl mx-auto py-16 px-8">
        <div className="text-start mb-8">
          <h2 className="text-2xl md:text-4xl font-mont font-bold text-primary dark:text-white mb-3">
            Essential Voting Resources
          </h2>
          <p className="text-sm md:text-base fontroboto text-muted-foreground max-w-2xl">
            Explore these official, non-partisan resources to help you navigate
            every step of the voting process.
          </p>
        </div>

        {/* Resource Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <ResourceCard
              key={index}
              title={resource.title}
              description={resource.description}
              url={resource.url}
              category={resource.category}
              icon={resource.icon}
              color={resource.color}
            />
          ))}
        </div>

        {/* Additional Info Card */}
        <div className="mt-12 p-8 bg-linear-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 rounded-none border-2 border-primary/20 relative overflow-hidden">
          {/* Decorative corner accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full" />

          <div className="relative z-10">
            <h3 className="text-xl md:text-2xl font-bold text-foreground fontmont mb-4">
              Why These Resources?
            </h3>
            <div className="grid md:grid-cols-2 gap-6 fontroboto text-muted-foreground">
              <div>
                <h4 className="font-semibold text-foreground mb-2">
                  ✓ Non-Partisan & Trusted
                </h4>
                <p className="text-sm leading-relaxed">
                  All resources are from verified, non-partisan organizations
                  dedicated to providing accurate voting information.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">
                  ✓ Comprehensive Coverage
                </h4>
                <p className="text-sm leading-relaxed">
                  From registration to researching candidates and understanding
                  ballot measures, these tools cover every aspect of voting.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">
                  ✓ Official Sources
                </h4>
                <p className="text-sm leading-relaxed">
                  Direct links to government websites and established civic
                  organizations ensure you get accurate information.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">
                  ✓ Always Up-to-Date
                </h4>
                <p className="text-sm leading-relaxed">
                  These platforms are continuously updated with the latest
                  election information and deadlines.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hotline Section */}
      <Hotline />
    </div>
  );
};

export default Page;
