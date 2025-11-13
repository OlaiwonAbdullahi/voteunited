import React from "react";
import Link from "next/link"; // Ensure this import matches your router—update for React Router if needed
import { Calendar, Eye, TrendingUp } from "lucide-react"; // Adjust according to your icon library
import { Badge } from "@/components/ui/badge"; // Update this import path if you use a different Badge component
import { Card } from "@/components/ui/card"; // Update for your Card implementation

type CategoryType =
  | "Politics"
  | "Legislation"
  | "Elections"
  | "Opinion"
  | "Policy";

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: CategoryType;
  date: string;
  author: string;
  views: number;
  trending: boolean;
  relatedPoliticians: string[];
  image: string;
}

// Helper to get category color
function getCategoryColor(category: CategoryType) {
  switch (category) {
    case "Politics":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
    case "Legislation":
      return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
    case "Elections":
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
    case "Opinion":
      return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
    case "Policy":
      return "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400";
    default:
      return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
  }
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
];

const FeaturedResources: React.FC = () => (
  <div className="max-w-7xl mx-auto py-16 px-8">
    <div className="text-start mb-6">
      <h2 className="text-2xl md:text-4xl font-mont font-bold text-primary dark:text-white mb-3">
        Featured Resources
      </h2>
      <p className="text-sm md:text-base fontroboto text-muted-foreground font-roboto max-w-2xl">
        Explore our curated collection of articles, videos, and tools to help
        you understand and vote with confidence
      </p>
    </div>
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {SAMPLE_NEWS.map((article) => (
        <Link key={article.id} href={`/resources/${article.id}`} passHref>
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
                  className={`${getCategoryColor(article.category)} text-xs`}
                >
                  {article.category}
                </Badge>
                {article.trending && (
                  <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 text-xs gap-1 flex items-center">
                    <TrendingUp size={12} />
                    Trending
                  </Badge>
                )}
              </div>
              <h3 className="font-bold fontmont text-foreground mb-2 line-clamp-2">
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
  </div>
);

export default FeaturedResources;
