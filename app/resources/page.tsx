"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, TrendingUp, Calendar, Eye, Loader2, AlertCircle, ExternalLink } from "lucide-react";

// --- GNews.io Configuration ---
// NOTE: Ensure your key is valid for gnews.io. The key format matches GNews (32 hex characters).
const NEWS_API_KEY = "8c084f518b8b23d615fc2925e8269cf6"; 
const NEWS_API_ENDPOINT = "https://gnews.io/api/v4/search";

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
  url?: string;
  source?: string;
}

export default function Resources() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterCategory, setFilterCategory] = useState<string>("All");

  useEffect(() => {
    fetchPoliticalNews();
  }, []);

  const fetchPoliticalNews = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch US political news from GNews.io
      const topics = [
        "US election 2024",
        "US politics",
        "Congress legislation",
        "voting rights",
        "presidential election"
      ];
      
      const randomTopic = topics[Math.floor(Math.random() * topics.length)];
      
      // Use GNews.io endpoint
      const response = await fetch(
        `${NEWS_API_ENDPOINT}?q=${encodeURIComponent(randomTopic)}&language=en&country=us&max=50&apikey=${NEWS_API_KEY}`
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();

      if (data.status === "error") {
        // GNews errors include "errors" property or a message string
        throw new Error(data.message || data.errors?.[0] || "Failed to fetch news from GNews");
      }

      // GNews returns "articles" property
      if (!data.articles || data.articles.length === 0) {
        throw new Error("No articles returned from API. The query might be too specific or the API limit reached.");
      }

      // Transform GNews data to our article format
      const transformedArticles: NewsArticle[] = data.articles.map((article: any, index: number) => {
        // Determine category based on content
        let category: NewsArticle['category'] = "Politics";
        const titleLower = (article.title || '').toLowerCase();
        const descLower = (article.description || '').toLowerCase();
        
        if (titleLower.includes('election') || titleLower.includes('vote') || titleLower.includes('ballot')) {
          category = "Elections";
        } else if (titleLower.includes('bill') || titleLower.includes('legislation') || titleLower.includes('congress')) {
          category = "Legislation";
        } else if (titleLower.includes('policy') || descLower.includes('policy')) {
          category = "Policy";
        } else if (titleLower.includes('opinion') || article.source?.name?.toLowerCase().includes('opinion')) {
          category = "Opinion";
        }

        return {
          id: article.url || `article-${index}`,
          title: article.title || "Untitled Article",
          // GNews.io uses 'description' for a summary
          summary: article.description || "No description available", 
          content: article.description || "Full content not available. Visit source link to read more.", // Use description as content fallback
          category: category,
          // GNews.io uses 'publishedAt'
          date: article.publishedAt?.split('T')[0] || new Date().toISOString().split('T')[0],
          // GNews.io uses 'source.name' and 'source.url'
          author: article.source?.name || "Unknown Author", 
          views: Math.floor(Math.random() * 50000 + 5000),
          trending: index < 8, // First 8 are trending (most recent)
          relatedPoliticians: [],
          // GNews.io uses 'image'
          image: article.image || "/flag.png",
          url: article.url,
          source: article.source?.name
        };
      });

      setArticles(transformedArticles);
    } catch (err: any) {
      console.error("Error fetching news:", err);
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const filteredNews = articles.filter((article) => {
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
      case "Policy":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "Elections":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
      case "Opinion":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
            <p className="mt-4 text-slate-600 dark:text-slate-400">
              Loading political news...
            </p>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
            <div className="text-center max-w-md">
              <p className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">
                Error Loading News
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                {error}
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800 text-left">
                <p className="text-sm text-blue-800 dark:text-blue-200 mb-2">
                  <strong>Setup Instructions for GNews.io:</strong>
                </p>
                <ol className="text-xs text-blue-700 dark:text-blue-300 space-y-1 list-decimal list-inside">
                  <li>Sign up for a free API key at: <a href="https://gnews.io/" target="_blank" className="underline">gnews.io</a></li>
                  <li>Replace YOUR_GNEWS_API_KEY_HERE with your actual key in the `NEWS_API_KEY` constant.</li>
                  <li>Free tier: 100 requests/day.</li>
                </ol>
              </div>
              <Button onClick={fetchPoliticalNews} className="mt-4 rounded-none">
                Try Again
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="md:max-w-7xl max-w-full mx-auto text-center p-10">
          <h2 className="text-4xl md:text-5xl font-mont font-bold text-primary font-mont dark:text-white mb-4">
            Resources
          </h2>
          <p className="text-lg text-slate-600 fontroboto dark:text-slate-400 max-w-2xl mx-auto">
            Stay informed about politics, legislation, and elections - Live news updates
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
                {category} ({category === "All" ? articles.length : articles.filter(a => a.category === category).length})
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Trending Article */}
        {filteredNews.some((a) => a.trending) && (
          <div className="mb-12">
            {(() => {
              // Ensure the featured article exists in the filtered list
              const featured = filteredNews.find((a) => a.trending);
              if (!featured) return null;
              return (
                <Card className="overflow-hidden py-0 rounded-none shadow-none fontroboto hover:shadow-lg transition-shadow">
                  <div className="grid md:grid-cols-2">
                    <div className="aspect-video md:aspect-auto bg-muted overflow-hidden">
                      <img
                        src={featured.image}
                        alt={featured.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/flag.png";
                        }}
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
                      <p className="text-foreground mb-4 text-balance line-clamp-3">
                        {featured.summary}
                      </p>
                      {featured.source && (
                        <p className="text-sm text-muted-foreground mb-4">
                          Source: {featured.source}
                        </p>
                      )}
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
                      {featured.url && (
                        <Button asChild className="rounded-none">
                          <a href={featured.url} target="_blank" rel="noopener noreferrer" className="gap-2">
                            Read Full Story <ExternalLink size={16} />
                          </a>
                        </Button>
                      )}
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
            Showing {filteredNews.length} of {articles.length} articles
          </p>
        </div>

        {/* News Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredNews.map((article, idx) => (
            <div key={article.id || idx}>
              <Card className="h-full rounded-none py-0 fontroboto overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                {/* Image */}
                <div className="aspect-video bg-muted overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/flag.png";
                    }}
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

                  {article.source && (
                    <p className="text-xs text-muted-foreground mb-3">
                      Source: {article.source}
                    </p>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(article.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye size={12} />
                      {article.views.toLocaleString()}
                    </span>
                  </div>

                  {article.url && (
                    <Button asChild className="w-full rounded-none" size="sm" variant="outline">
                      <a href={article.url} target="_blank" rel="noopener noreferrer" className="gap-2">
                        Read Article <ExternalLink size={14} />
                      </a>
                    </Button>
                  )}
                </div>
              </Card>
            </div>
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