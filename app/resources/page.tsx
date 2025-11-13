"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, TrendingUp, Calendar, Eye } from "lucide-react";

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: "Politics" | "Legislation" | "Elections" | "Opinion" | "Policy";
  date: string;
  author: string;
  views: number;
  trending: boolean;
  relatedPoliticians: string[];
  image: string;
}

const SAMPLE_NEWS: NewsArticle[] = [
  {
    id: "1",
    title: "Senate Passes Healthcare Reform Bill in Historic Vote",
    summary:
      "The Senate voted 62-38 to pass the comprehensive Healthcare Access and Affordability Act, marking a major policy victory.",
    content:
      "The Senate voted 62-38 today to pass the Healthcare Access and Affordability Act. The bill now moves to the House for consideration. Key provisions include expanded Medicaid coverage and reduced prescription drug costs.",
    category: "Legislation",
    date: "2024-11-09",
    author: "Sarah Johnson",
    views: 15420,
    trending: true,
    relatedPoliticians: ["Sarah Johnson", "Patricia Martinez"],
    image: "/flag.png",
  },
  {
    id: "2",
    title: "Climate Investment Bill Gains Bipartisan Support",
    summary:
      "Environmental advocates celebrate as both parties express support for $50B clean energy initiative.",
    content:
      "The Climate and Clean Energy Investment Act continues to gain momentum with unexpected bipartisan support. Environmental groups and industry leaders alike have praised the bill's provisions.",
    category: "Legislation",
    date: "2024-11-08",
    author: "Michael Chen",
    views: 12890,
    trending: true,
    relatedPoliticians: ["Elizabeth Brown", "Patricia Martinez"],
    image: "/flag.png",
  },
  {
    id: "3",
    title: "New Election Voting Sites Open Ahead of 2024 Election",
    summary:
      "Five new voting locations now available in major metropolitan areas to increase accessibility.",
    content:
      "Election officials announced the opening of five new voting locations in partnership with community organizations. The expansion aims to increase accessibility and reduce wait times.",
    category: "Elections",
    date: "2024-11-07",
    author: "Electoral Commission",
    views: 8934,
    trending: false,
    relatedPoliticians: [],
    image: "/flag.png",
  },
  {
    id: "4",
    title: "Education Funding Debate Heats Up on Capitol Hill",
    summary:
      "Lawmakers clash over proposed changes to federal education spending formulas.",
    content:
      "Education funding remains a contentious issue as lawmakers debate the merits of updating federal formulas. Critics argue the changes don't go far enough while others worry about fiscal impact.",
    category: "Policy",
    date: "2024-11-06",
    author: "Policy Analyst",
    views: 6234,
    trending: false,
    relatedPoliticians: ["Patricia Martinez"],
    image: "/flag.png",
  },
  {
    id: "5",
    title: "Infrastructure Projects Begin in Three States",
    summary:
      "First phase of bipartisan infrastructure plan kicks off with projects in Texas, Florida, and California.",
    content:
      "Construction has begun on the first phase of infrastructure improvements funded by the recently enacted Infrastructure and Jobs Act. Projects span roads, bridges, and broadband expansion.",
    category: "Legislation",
    date: "2024-11-05",
    author: "James Wilson",
    views: 9876,
    trending: false,
    relatedPoliticians: ["James Wilson", "Michael Chen"],
    image: "/flag.png",
  },
];

export default function Resources() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("All");

  const filteredNews = SAMPLE_NEWS.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      filterCategory === "All" || article.category === filterCategory;

    return matchesSearch && matchesCategory;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const categories = [
    "All",
    "Politics",
    "Legislation",
    "Elections",
    "Opinion",
    "Policy",
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Politics":
        return "bg-primary/10 text-primary";
      case "Legislation":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "Elections":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
      case "Opinion":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400";
      case "Policy":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Page Header */}

        <div className="md:max-w-7xl max-w-full mx-auto text-center p-10">
          <h2 className="text-4xl md:text-5xl font-mont font-bold text-primary font-mont dark:text-white mb-4">
            Resources
          </h2>
          <p className="text-lg text-slate-600 fontroboto dark:text-slate-400 max-w-2xl mx-auto">
            Stay informed about politics, legislation, and elections
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground rounded-none shadow-none" />
            <Input
              type="text"
              placeholder="Search news..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-none shadow-none fontroboto"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-8 fontroboto">
          <p className="text-sm font-medium text-foreground mb-2">
            Filter by Category
          </p>
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                variant={filterCategory === category ? "default" : "outline"}
                onClick={() => setFilterCategory(category)}
                className="rounded-none shadow-none fontroboto"
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Trending Article */}
        {filteredNews.some((a) => a.trending) && (
          <div className="mb-12">
            {(() => {
              const featured = filteredNews.find((a) => a.trending);
              if (!featured) return null;
              return (
                <Card className="overflow-hidden py-0 rounded-none shadow-none fontroboto hover:shadow-lg transition-shadow">
                  <div className="grid md:grid-cols-2">
                    <div className="aspect-video md:aspect-auto bg-muted overflow-hidden">
                      <img
                        src={featured.image || "/placeholder.svg"}
                        alt={featured.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge
                          className={`${getCategoryColor(featured.category)}`}
                        >
                          {featured.category}
                        </Badge>
                        <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 gap-1">
                          <TrendingUp size={12} />
                          Trending
                        </Badge>
                      </div>
                      <h2 className="text-3xl font-bold text-foreground mb-3 fontmont">
                        {featured.title}
                      </h2>
                      <p className="text-foreground mb-6 text-balance">
                        {featured.summary}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {new Date(featured.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye size={14} />
                          {featured.views.toLocaleString()} views
                        </span>
                      </div>
                      <Button asChild className=" rounded-none">
                        <Link href={`/resources/${featured.id}`}>
                          Read Full Story
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })()}
          </div>
        )}

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {filteredNews.length} of {SAMPLE_NEWS.length} articles
          </p>
        </div>

        {/* News Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredNews.map((article) => (
            <Link key={article.id} href={`/resources/${article.id}`}>
              <Card className="h-full rounded-none py-0 fontroboto overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                {/* Image */}
                <div className="aspect-video bg-muted overflow-hidden">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge
                      className={`${getCategoryColor(
                        article.category
                      )} text-xs`}
                    >
                      {article.category}
                    </Badge>
                    {article.trending && (
                      <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 text-xs gap-1">
                        <TrendingUp size={12} />
                        Trending
                      </Badge>
                    )}
                  </div>

                  <h3 className="font-bold fonmont text-foreground mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
                    {article.summary}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(article.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye size={12} />
                      {article.views.toLocaleString()}
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No news articles found matching your search.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
