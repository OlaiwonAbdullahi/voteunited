"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Share2, Calendar, Eye, ArrowLeft } from "lucide-react";

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  date: string;
  author: string;
  views: number;
  trending: boolean;
  relatedPoliticians: string[];
  image: string;
}

const NEWS_ARTICLES: Record<string, NewsArticle> = {
  "1": {
    id: "1",
    title: "Senate Passes Healthcare Reform Bill in Historic Vote",
    summary:
      "The Senate voted 62-38 to pass the comprehensive Healthcare Access and Affordability Act, marking a major policy victory.",
    content: `The Senate voted 62-38 today to pass the Healthcare Access and Affordability Act, marking a significant milestone in healthcare reform efforts. The bill now moves to the House for consideration, where leadership has indicated it will be a priority.

Key provisions of the bill include:
- Expansion of Medicaid coverage to 2 million additional Americans
- Reduction of prescription drug costs through price negotiation
- Increased funding for rural healthcare infrastructure
- Enhanced mental health services coverage

Senator Sarah Johnson, a lead sponsor of the bill, called the vote "a watershed moment for healthcare in America." She emphasized that the bill strikes a balance between affordability and quality care.

Opposition centered on concerns about implementation costs and potential impacts on healthcare providers. Senator Michael Chen noted that "while we support expanding coverage, we have concerns about the financial sustainability of these programs."

The bill is expected to advance to committee hearings in the House next week. Healthcare advocates have praised the Senate's action, noting it represents a rare moment of bipartisan cooperation on a contentious issue.

Industry analysts predict the bill could significantly impact healthcare markets and insurance companies. Insurance stocks fell 2-3% in afternoon trading following the vote.

The next steps involve House committee review, potential amendments, and a full House vote. The timeline for House action remains uncertain, with some analysts predicting a vote before year-end while others expect the process to extend into 2025.`,
    category: "Legislation",
    date: "2024-11-09",
    author: "Sarah Johnson",
    views: 15420,
    trending: true,
    relatedPoliticians: [
      "Climate Investment Bill Gains Bipartisan Support",
      "New Election Voting Sites Open Ahead of 2024 Election",
      "Education Funding Debate Heats Up on Capitol Hill",
    ],
    image: "/flag.png",
  },
  "2": {
    id: "2",
    title: "Climate Investment Bill Gains Bipartisan Support",
    summary:
      "Environmental advocates celebrate as both parties express support for $50B clean energy initiative.",
    content: `The Climate and Clean Energy Investment Act continues to gain momentum with unexpected bipartisan support, signaling a potential breakthrough on environmental policy.

The bill, which allocates $50 billion to renewable energy infrastructure and climate adaptation programs, has garnered praise from both environmental organizations and business groups.

"This represents a once-in-a-generation opportunity to invest in clean energy while creating jobs," said Representative Elizabeth Brown, the bill's primary sponsor.

Major provisions include:
- $30 billion for solar and wind energy projects
- $10 billion for grid modernization and energy storage
- $10 billion for climate resilience and adaptation in vulnerable communities

Environmental groups have called the funding levels "groundbreaking," though some activists argue that even more aggressive investment is needed to meet climate goals.

The business community has been notably supportive, with technology companies, renewable energy firms, and even some traditional energy providers backing the initiative. They cite job creation potential and long-term economic benefits.

Conservative lawmakers have raised concerns about federal spending levels but have expressed openness to the bill's core provisions. This bipartisan interest is unusual for climate legislation and reflects growing recognition that climate action offers economic opportunities.

The bill is expected to move to committee hearings next month, with a full vote anticipated in the coming months. Political observers see it as a test case for whether major legislation can advance on contentious issues when properly framed around shared interests.`,
    category: "Environment",
    date: "2024-11-08",
    author: "Michael Chen",
    views: 12890,
    trending: true,
    relatedPoliticians: [
      "Senate Passes Healthcare Reform Bill in Historic Vote",
      "New Election Voting Sites Open Ahead of 2024 Election",
    ],
    image: "/flag.png",
  },
};

export default function NewsArticlePage() {
  const params = useParams();
  const articleId = params.id as string;
  const article = NEWS_ARTICLES[articleId];

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <main className="mx-auto max-w-3xl px-4 py-12">
          <p className="text-center text-muted-foreground">
            Article not found.
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background fontroboto">
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <Button variant="ghost" asChild className="mb-6 -ml-2" size="sm">
          <Link href="/resources" className="gap-2">
            <ArrowLeft size={16} />
            Back to News
          </Link>
        </Button>

        {/* Hero Image */}
        <div className="mb-8 rounded-none overflow-hidden bg-muted aspect-video">
          <img
            src={article.image || "/placeholder.svg"}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Header */}
        <article className="space-y-6">
          {/* Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="secondary">{article.category}</Badge>
            {article.trending && (
              <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                Trending
              </Badge>
            )}
          </div>

          {/* Title */}
          <div>
            <h1 className="text-4xl fontmont font-bold text-foreground mb-4 text-balance">
              {article.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              {article.summary}
            </p>
          </div>

          {/* Meta Information */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground border-b border-t border-border py-4">
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {new Date(article.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1">
              <Eye size={14} />
              {article.views.toLocaleString()} views
            </span>
            <Button variant="ghost" size="sm" className="ml-auto gap-2">
              <Share2 size={14} />
              Share
            </Button>
          </div>

          {/* Content */}
          <div className="prose prose-sm dark:prose-invert max-w-none">
            {article.content.split("\n\n").map((paragraph, index) => (
              <p key={index} className="text-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Related Politicians */}
          {article.relatedPoliticians.length > 0 && (
            <Card className="p-6 rounded-none shadow-none border-primary/20">
              <h3 className="font-bold text-foreground mb-2">
                Related Resources
              </h3>
              <div className="flex flex-wrap gap-2">
                {article.relatedPoliticians.map((politician, index) => (
                  <Link key={index} href="/politicians">
                    <Button
                      variant="outline"
                      size="sm"
                      className=" rounded-none"
                    >
                      {politician.slice(0, 35)}...
                    </Button>
                  </Link>
                ))}
              </div>
            </Card>
          )}
        </article>
      </main>
    </div>
  );
}
