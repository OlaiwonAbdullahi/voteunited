"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  MapPin,
  Clock,
  Navigation,
  Loader2,
  AlertCircle,
  Search,
} from "lucide-react";

interface PollingLocation {
  address: {
    locationName?: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    zip: string;
  };
  pollingHours?: string;
  notes?: string;
}

interface EarlyVoteSite {
  address: {
    locationName?: string;
    line1: string;
    city: string;
    state: string;
    zip: string;
  };
  pollingHours?: string;
}

interface PollingData {
  pollingLocations?: PollingLocation[];
  earlyVoteSites?: EarlyVoteSite[];
  electionName?: string;
  electionDay?: string;
}

const Page = () => {
  const [zipCode, setZipCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pollingData, setPollingData] = useState<PollingData | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate ZIP code
    if (!zipCode || zipCode.length !== 5 || !/^\d{5}$/.test(zipCode)) {
      setError("Please enter a valid 5-digit ZIP code");
      return;
    }

    setLoading(true);
    setError(null);
    setPollingData(null);

    try {
      const response = await fetch(`/api/polling-location?zipCode=${zipCode}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch polling location");
      }

      setPollingData(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(
        err.message ||
          "Unable to find polling location. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getGoogleMapsUrl = (address: any) => {
    const fullAddress = `${address.line1}, ${address.city}, ${address.state} ${address.zip}`;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      fullAddress
    )}`;
  };

  return (
    <div className="fontroboto">
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-mont font-bold text-primary dark:text-white mb-4">
            Find Your Polling Station
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Enter your ZIP code to find your polling location, voting hours, and
            early voting sites.
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-2xl mx-auto mb-12">
          <Card className="p-6 rounded-none shadow-sm">
            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <label
                  htmlFor="zipCode"
                  className="block text-sm font-mont font-semibold text-foreground mb-2"
                >
                  ZIP Code
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    id="zipCode"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="Enter your 5-digit ZIP code"
                    maxLength={5}
                    className="flex-1 px-4 py-3 border border-input bg-background text-foreground rounded-none focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button
                    type="submit"
                    disabled={loading}
                    className="rounded-none px-6"
                    size="lg"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Searching...
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-4 w-4" />
                        Search
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </Card>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8">
            <Card className="p-6 rounded-none bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
                <div>
                  <h3 className="font-mont font-semibold text-red-800 dark:text-red-300 mb-1">
                    Error
                  </h3>
                  <p className="text-sm text-red-700 dark:text-red-400">
                    {error}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Results */}
        {pollingData && (
          <div className="space-y-8">
            {/* Election Info */}
            {pollingData.electionName && (
              <div className="text-center">
                <h2 className="text-2xl font-mont font-bold text-primary dark:text-white mb-2">
                  {pollingData.electionName}
                </h2>
                {pollingData.electionDay && (
                  <p className="text-slate-600 dark:text-slate-400">
                    Election Day:{" "}
                    {new Date(pollingData.electionDay).toLocaleDateString()}
                  </p>
                )}
              </div>
            )}

            {/* Polling Locations */}
            {pollingData.pollingLocations &&
              pollingData.pollingLocations.length > 0 && (
                <div>
                  <h2 className="text-2xl font-mont font-bold text-primary dark:text-white mb-6">
                    Your Polling Location
                  </h2>
                  <div className="grid gap-6 md:grid-cols-1">
                    {pollingData.pollingLocations.map((location, index) => (
                      <Card
                        key={index}
                        className="p-6 rounded-none hover:shadow-md transition-shadow"
                      >
                        <div className="space-y-4">
                          {/* Location Name */}
                          {location.address.locationName && (
                            <h3 className="text-xl font-mont font-bold text-foreground">
                              {location.address.locationName}
                            </h3>
                          )}

                          {/* Address */}
                          <div className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 text-primary mt-0.5" />
                            <div>
                              <p className="text-slate-600 dark:text-slate-400">
                                {location.address.line1}
                                {location.address.line2 && (
                                  <>, {location.address.line2}</>
                                )}
                              </p>
                              <p className="text-slate-600 dark:text-slate-400">
                                {location.address.city},{" "}
                                {location.address.state} {location.address.zip}
                              </p>
                            </div>
                          </div>

                          {/* Hours */}
                          {location.pollingHours && (
                            <div className="flex items-start gap-3">
                              <Clock className="h-5 w-5 text-primary mt-0.5" />
                              <div>
                                <p className="text-sm font-semibold text-foreground mb-1">
                                  Voting Hours
                                </p>
                                <p className="text-slate-600 dark:text-slate-400">
                                  {location.pollingHours}
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Notes */}
                          {location.notes && (
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded border border-blue-200 dark:border-blue-800">
                              <p className="text-sm text-blue-800 dark:text-blue-200">
                                {location.notes}
                              </p>
                            </div>
                          )}

                          {/* Directions Button */}
                          <Button
                            asChild
                            variant="outline"
                            className="w-full rounded-none"
                          >
                            <a
                              href={getGoogleMapsUrl(location.address)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="gap-2"
                            >
                              <Navigation size={16} />
                              Get Directions
                            </a>
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

            {/* Early Vote Sites */}
            {pollingData.earlyVoteSites &&
              pollingData.earlyVoteSites.length > 0 && (
                <div>
                  <h2 className="text-2xl font-mont font-bold text-primary dark:text-white mb-6">
                    Early Voting Locations
                  </h2>
                  <div className="grid gap-6 md:grid-cols-2">
                    {pollingData.earlyVoteSites.map((site, index) => (
                      <Card
                        key={index}
                        className="p-6 rounded-none hover:shadow-md transition-shadow"
                      >
                        <div className="space-y-4">
                          {site.address.locationName && (
                            <h3 className="text-lg font-mont font-bold text-foreground">
                              {site.address.locationName}
                            </h3>
                          )}

                          <div className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 text-primary mt-0.5" />
                            <div>
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                {site.address.line1}
                              </p>
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                {site.address.city}, {site.address.state}{" "}
                                {site.address.zip}
                              </p>
                            </div>
                          </div>

                          {site.pollingHours && (
                            <div className="flex items-start gap-3">
                              <Clock className="h-5 w-5 text-primary mt-0.5" />
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                {site.pollingHours}
                              </p>
                            </div>
                          )}

                          <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="w-full rounded-none"
                          >
                            <a
                              href={getGoogleMapsUrl(site.address)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="gap-2"
                            >
                              <Navigation size={14} />
                              Get Directions
                            </a>
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

            {/* No Results */}
            {!pollingData.pollingLocations?.length &&
              !pollingData.earlyVoteSites?.length && (
                <Card className="p-8 rounded-none text-center">
                  <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-mont font-bold text-foreground mb-2">
                    No Polling Data Available
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    Polling location data is typically available closer to
                    election dates.
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-500">
                    Please check back closer to the election or contact your
                    local election office.
                  </p>
                </Card>
              )}
          </div>
        )}

        {/* Info Section */}
        {!pollingData && !loading && (
          <div className="mt-12 max-w-3xl mx-auto">
            <Card className="p-8 rounded-none bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <h3 className="text-xl font-mont font-bold text-primary dark:text-white mb-4">
                Important Information
              </h3>
              <ul className="space-y-3 text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    Polling location data is updated closer to election dates
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    Bring a valid photo ID to vote (requirements vary by state)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    Check your voter registration status before election day
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Early voting may be available in your area</span>
                </li>
              </ul>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default Page;
