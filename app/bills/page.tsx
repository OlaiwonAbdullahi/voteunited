/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  Calendar,
  Eye,
  Loader2,
  AlertCircle,
  ExternalLink,
  Building2,
  FileText,
} from "lucide-react";

// --- Congress.gov API Configuration ---
const CONGRESS_API_KEY = "ZOhszC52WhvJkzfzVnRNitIUBkTg7JLP9eLXoYWb";
const CONGRESS_API_ENDPOINT = "https://api.congress.gov/v3/bill";

interface CongressBill {
  id: string;
  congress: number;
  number: string;
  type: string;
  title: string;
  originChamber: string;
  originChamberCode: string;
  latestAction: {
    actionDate: string;
    text: string;
  };
  updateDate: string;
  updateDateIncludingText: string;
  url: string;
  views: number;
  category: "House" | "Senate" | "Joint" | "Concurrent";
}

export default function CongressionalBills() {
  const [bills, setBills] = useState<CongressBill[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterCategory, setFilterCategory] = useState<string>("All");

  useEffect(() => {
    fetchCongressionalBills();
  }, []);

  const fetchCongressionalBills = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${CONGRESS_API_ENDPOINT}?api_key=${CONGRESS_API_KEY}&format=json&limit=50`
      );

      if (!response.ok) {
        throw new Error(
          `API Error: ${response.status} - ${response.statusText}`
        );
      }

      const data = await response.json();

      if (!data.bills || data.bills.length === 0) {
        throw new Error("No bills returned from API.");
      }

      // Transform Congress API data to our bill format
      const transformedBills: CongressBill[] = data.bills.map(
        (bill: any, index: number) => {
          // Determine category based on bill type
          let category: CongressBill["category"] = "House";
          if (bill.originChamber === "Senate") {
            category = "Senate";
          } else if (bill.type?.includes("JRES")) {
            category = "Joint";
          } else if (bill.type?.includes("CONRES")) {
            category = "Concurrent";
          }

          return {
            id: bill.url || `bill-${index}`,
            congress: bill.congress || 119,
            number: bill.number || "Unknown",
            type: bill.type || "Unknown",
            title: bill.title || "No title available",
            originChamber: bill.originChamber || "Unknown",
            originChamberCode: bill.originChamberCode || "?",
            latestAction: {
              actionDate:
                bill.latestAction?.actionDate ||
                new Date().toISOString().split("T")[0],
              text: bill.latestAction?.text || "No action recorded",
            },
            updateDate:
              bill.updateDate || new Date().toISOString().split("T")[0],
            updateDateIncludingText:
              bill.updateDateIncludingText ||
              new Date().toISOString().split("T")[0],
            url: bill.url || "#",
            views: Math.floor(Math.random() * 10000 + 1000),
            category: category,
          };
        }
      );

      setBills(transformedBills);
      console.log(transformedBills);
    } catch (err: any) {
      console.error("Error fetching bills:", err);
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const filteredBills = bills
    .filter((bill) => {
      const matchesSearch =
        bill.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bill.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bill.type.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        filterCategory === "All" || bill.category === filterCategory;

      return matchesSearch && matchesCategory;
    })
    .sort(
      (a, b) =>
        new Date(b.updateDate).getTime() - new Date(a.updateDate).getTime()
    );

  const categories = ["All", "House", "Senate", "Joint", "Concurrent"];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "House":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "Senate":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      case "Joint":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
      case "Concurrent":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getBillTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      HCONRES: "House Concurrent Resolution",
      SCONRES: "Senate Concurrent Resolution",
      HJRES: "House Joint Resolution",
      SJRES: "Senate Joint Resolution",
      HR: "House Bill",
      S: "Senate Bill",
      HRES: "House Resolution",
      SRES: "Senate Resolution",
    };
    return types[type] || type;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
            <p className="mt-4 text-slate-600 dark:text-slate-400">
              Loading congressional bills...
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
                Error Loading Bills
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                {error}
              </p>
              <Button
                onClick={fetchCongressionalBills}
                className="mt-4 rounded-none"
              >
                Try Again
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background fontroboto">
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="md:max-w-7xl max-w-full mx-auto text-center p-10">
          <h2 className="text-4xl md:text-5xl font-mont font-bold text-primary font-mont dark:text-white mb-4">
            Congressional Bills
          </h2>
          <p className="text-lg text-slate-600 fontroboto dark:text-slate-400 max-w-2xl mx-auto">
            Track legislation, resolutions, and bills from the U.S. Congress
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground rounded-none shadow-none" />
            <Input
              type="text"
              placeholder="Search bills by title, number, or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-none shadow-none fontroboto"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-8 fontroboto">
          <p className="text-sm font-medium text-foreground mb-2">
            Filter by Origin
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
                {category} (
                {category === "All"
                  ? bills.length
                  : bills.filter((b) => b.category === category).length}
                )
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Bill */}
        {filteredBills.length > 0 && (
          <div className="mb-12">
            {(() => {
              const featured = filteredBills[0];
              return (
                <Card className="overflow-hidden py-0 rounded-none shadow-none fontroboto hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Building2 className="text-primary" size={24} />
                      <Badge
                        className={`${getCategoryColor(
                          featured.category
                        )} rounded-none`}
                      >
                        {featured.category}
                      </Badge>
                      <Badge variant="outline" className="text-xs rounded-none">
                        {getBillTypeLabel(featured.type)}
                      </Badge>
                    </div>

                    <div className="mb-3">
                      <span className="text-sm font-semibold text-primary">
                        {featured.type} {featured.number}
                      </span>
                      <span className="text-sm text-muted-foreground ml-2">
                        • {featured.congress}th Congress
                      </span>
                    </div>

                    <h2 className="text-2xl font-bold text-foreground mb-4 fontmont">
                      {featured.title}
                    </h2>

                    <div className="bg-amber-50 dark:bg-amber-950/30 border rounded-none border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-4">
                      <div className="flex items-start gap-2">
                        <FileText
                          className="text-amber-600 dark:text-amber-400 mt-1 flex-shrink-0"
                          size={18}
                        />
                        <div className="flex-1">
                          <p className="text-amber-900 dark:text-amber-200 font-semibold text-sm mb-1">
                            Latest Action
                          </p>
                          <p className="text-amber-800 dark:text-amber-300 text-sm mb-1">
                            {featured.latestAction.text}
                          </p>
                          <p className="text-amber-600 dark:text-amber-400 text-xs">
                            {formatDate(featured.latestAction.actionDate)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        Updated: {formatDate(featured.updateDate)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye size={14} />
                        {featured.views.toLocaleString()} views
                      </span>
                    </div>

                    <Button asChild className="rounded-none">
                      <a
                        href={`https://voteunited.vercel.app/bill?congress=${featured.congress}&billType=${featured.type}&billNumber=${featured.number}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="gap-2"
                      >
                        View Full Bill Details <ExternalLink size={16} />
                      </a>
                    </Button>
                  </div>
                </Card>
              );
            })()}
          </div>
        )}

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {filteredBills.length} of {bills.length} bills
          </p>
        </div>

        {/* Bills Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredBills.map((bill, idx) => (
            <div key={bill.id || idx}>
              <Card className="h-full rounded-none py-0 fontroboto overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                {/* Header */}
                <div className="bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 px-4 py-3 border-b">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Building2 className="text-primary" size={16} />
                      <span className="text-sm font-bold text-primary">
                        {bill.type} {bill.number}
                      </span>
                    </div>
                    <Badge
                      className={`${getCategoryColor(
                        bill.category
                      )} text-xs rounded-none`}
                    >
                      {bill.originChamberCode}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {bill.congress}th Congress • {getBillTypeLabel(bill.type)}
                  </p>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-bold fonmont text-foreground mb-3 line-clamp-3 text-sm">
                    {bill.title}
                  </h3>

                  <div className="bg-blue-50 dark:bg-blue-950/30 rounded-none border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-4 flex-1">
                    <p className="text-xs text-blue-900 dark:text-blue-200 font-semibold mb-1">
                      Latest Action:
                    </p>
                    <p className="text-xs text-blue-800 dark:text-blue-300 line-clamp-2">
                      {bill.latestAction.text}
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                      {formatDate(bill.latestAction.actionDate)}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {formatDate(bill.updateDate)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye size={12} />
                      {bill.views.toLocaleString()}
                    </span>
                  </div>

                  <Button
                    asChild
                    className="w-full rounded-none"
                    size="sm"
                    variant="outline"
                  >
                    <a
                      href={`https://voteunited.vercel.app/bill?congress=${bill.congress}&billType=${bill.type}&billNumber=${bill.number}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gap-2"
                    >
                      View Details <ExternalLink size={14} />
                    </a>
                  </Button>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {filteredBills.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No bills found matching your search.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
