/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Clock,
  Navigation,
  Loader2,
  AlertCircle,
  Search,
  Users,
  FileText,
  Phone,
  Mail,
  ExternalLink,
  Info,
  Building,
  Calendar,
} from "lucide-react";

interface Address {
  locationName?: string;
  line1?: string;
  line2?: string;
  line3?: string;
  city?: string;
  state?: string;
  zip?: string;
}

interface PollingLocation {
  address: Address;
  pollingHours?: string;
  notes?: string;
  startDate?: string;
  endDate?: string;
}

interface Candidate {
  name: string;
  party?: string;
  candidateUrl?: string;
  phone?: string;
  email?: string;
  photoUrl?: string;
  orderOnBallot?: number;
}

interface Contest {
  type: string;
  office?: string;
  district?: {
    name: string;
    scope: string;
  };
  level?: string[];
  roles?: string[];
  candidates?: Candidate[];
  referendumTitle?: string;
  referendumSubtitle?: string;
  referendumText?: string;
  referendumUrl?: string;
}

interface ElectionOfficial {
  type: string;
  name: string;
  electionInfoUrl?: string;
  electionRegistrationUrl?: string;
  electionRegistrationConfirmationUrl?: string;
  absenteeVotingInfoUrl?: string;
  votingLocationFinderUrl?: string;
  ballotInfoUrl?: string;
  correspondenceAddress?: Address;
  physicalAddress?: Address;
  electionOfficials?: Array<{
    name?: string;
    title?: string;
    officePhoneNumber?: string;
    faxNumber?: string;
    emailAddress?: string;
  }>;
  hoursOfOperation?: string;
}

interface PollingData {
  election?: {
    id: string;
    name: string;
    electionDay: string;
    ocdDivisionId?: string;
  };
  pollingLocations?: PollingLocation[];
  earlyVoteSites?: PollingLocation[];
  dropOffLocations?: PollingLocation[];
  contests?: Contest[];
  electionOfficials?: ElectionOfficial[];
  normalizedInput?: Address;
}

const PollingStationPage = () => {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pollingData, setPollingData] = useState<PollingData | null>(null);
  const [activeTab, setActiveTab] = useState<
    "locations" | "contests" | "officials"
  >("locations");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!address.trim()) {
      setError("Please enter a ZIP code or address");
      return;
    }

    setLoading(true);
    setError(null);
    setPollingData(null);

    try {
      const response = await fetch(
        `/api/polling-location?address=${encodeURIComponent(address)}`
      );
      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch polling information");
      }

      setPollingData(data);
    } catch (err: any) {
      setError(
        err.message ||
          "Unable to find polling information. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const getGoogleMapsUrl = (addr: Address) => {
    const fullAddress = `${addr.line1 || ""}, ${addr.city || ""}, ${
      addr.state || ""
    } ${addr.zip || ""}`;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      fullAddress
    )}`;
  };

  const formatAddress = (addr: Address) => {
    if (!addr) return "";
    return `${addr.line1 || ""}${addr.line2 ? ", " + addr.line2 : ""}, ${
      addr.city || ""
    }, ${addr.state || ""} ${addr.zip || ""}`;
  };

  const getPartyColor = (party?: string) => {
    if (!party)
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    const partyLower = party.toLowerCase();
    if (partyLower.includes("republican"))
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
    if (partyLower.includes("democratic") || partyLower.includes("democrat"))
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
    if (partyLower.includes("independent"))
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
    if (partyLower.includes("green"))
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
    if (partyLower.includes("libertarian"))
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
    return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
  };

  return (
    <div className="fontroboto min-h-screen ">
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-start mb-6">
          <h2 className="text-2xl md:text-4xl font-mont font-bold text-primary dark:text-white mb-3">
            Find Your Polling Information
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl ">
            Enter your ZIP code or address to find polling locations, view
            candidates, and get election official contact information.
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-none shadow-none border border-slate-200 dark:border-slate-700">
            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-mont font-semibold text-slate-900 dark:text-white mb-2"
                >
                  ZIP Code or Address
                </label>
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter ZIP code or full address"
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-none focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="px-6 rounded-none h-12"
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
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-6 rounded-none">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-mont font-semibold text-red-800 dark:text-red-300 mb-1">
                    Error
                  </h3>
                  <p className="text-sm text-red-700 dark:text-red-400">
                    {error}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {pollingData && (
          <div className="space-y-8">
            {/* Election Info Banner */}
            {pollingData.election && (
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 p-6 rounded-none border border-primary/20">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-mont font-bold text-slate-900 dark:text-white">
                    {pollingData.election.name}
                  </h2>
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  Election Day:{" "}
                  {new Date(
                    pollingData.election.electionDay
                  ).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            )}

            {/* Tabs */}
            <div className="border-b border-slate-200 dark:border-slate-700">
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveTab("locations")}
                  className={`px-4 py-3 font-semibold border-b-2 transition-colors ${
                    activeTab === "locations"
                      ? "border-primary text-primary"
                      : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Polling Locations
                </button>
                <button
                  onClick={() => setActiveTab("contests")}
                  className={`px-4 py-3 font-semibold border-b-2 transition-colors ${
                    activeTab === "contests"
                      ? "border-primary text-primary"
                      : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <Users className="w-4 h-4 inline mr-2" />
                  Contests & Candidates
                  {pollingData.contests && pollingData.contests.length > 0 && (
                    <span className="ml-2 px-2 py-0.5 bg-primary text-white text-xs rounded-full">
                      {pollingData.contests.length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("officials")}
                  className={`px-4 py-3 font-semibold border-b-2 transition-colors ${
                    activeTab === "officials"
                      ? "border-primary text-primary"
                      : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <Building className="w-4 h-4 inline mr-2" />
                  Election Officials
                </button>
              </div>
            </div>

            {/* Locations Tab */}
            {activeTab === "locations" && (
              <div className="space-y-8">
                {/* Polling Locations */}
                {pollingData.pollingLocations &&
                  pollingData.pollingLocations.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-mont font-bold text-slate-900 dark:text-white mb-6">
                        Your Polling Location
                      </h2>
                      <div className="grid gap-6">
                        {pollingData.pollingLocations.map((location, index) => (
                          <div
                            key={index}
                            className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow"
                          >
                            <div className="space-y-4">
                              {location.address.locationName && (
                                <h3 className="text-xl font-mont font-bold text-slate-900 dark:text-white">
                                  {location.address.locationName}
                                </h3>
                              )}

                              <div className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                <div>
                                  <p className="text-slate-600 dark:text-slate-400">
                                    {formatAddress(location.address)}
                                  </p>
                                </div>
                              </div>

                              {location.pollingHours && (
                                <div className="flex items-start gap-3">
                                  <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                  <div>
                                    <p className="text-sm font-semibold text-slate-900 dark:text-white mb-1">
                                      Voting Hours
                                    </p>
                                    <p className="text-slate-600 dark:text-slate-400">
                                      {location.pollingHours}
                                    </p>
                                  </div>
                                </div>
                              )}

                              {location.notes && (
                                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded border border-blue-200 dark:border-blue-800">
                                  <p className="text-sm text-blue-800 dark:text-blue-200">
                                    {location.notes}
                                  </p>
                                </div>
                              )}

                              <Button
                                asChild
                                variant="outline"
                                className="w-full rounded-lg"
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
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Early Vote Sites */}
                {pollingData.earlyVoteSites &&
                  pollingData.earlyVoteSites.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-mont font-bold text-slate-900 dark:text-white mb-6">
                        Early Voting Locations
                      </h2>
                      <div className="grid gap-6 md:grid-cols-2">
                        {pollingData.earlyVoteSites.map((site, index) => (
                          <div
                            key={index}
                            className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow"
                          >
                            <div className="space-y-4">
                              {site.address.locationName && (
                                <h3 className="text-lg font-mont font-bold text-slate-900 dark:text-white">
                                  {site.address.locationName}
                                </h3>
                              )}

                              <div className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                  {formatAddress(site.address)}
                                </p>
                              </div>

                              {site.pollingHours && (
                                <div className="flex items-start gap-3">
                                  <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                  <p className="text-sm text-slate-600 dark:text-slate-400">
                                    {site.pollingHours}
                                  </p>
                                </div>
                              )}

                              <Button
                                asChild
                                variant="outline"
                                size="sm"
                                className="w-full rounded-lg"
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
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Drop-off Locations */}
                {pollingData.dropOffLocations &&
                  pollingData.dropOffLocations.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-mont font-bold text-slate-900 dark:text-white mb-6">
                        Ballot Drop-off Locations
                      </h2>
                      <div className="grid gap-6 md:grid-cols-2">
                        {pollingData.dropOffLocations.map((location, index) => (
                          <div
                            key={index}
                            className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow"
                          >
                            <div className="space-y-4">
                              {location.address.locationName && (
                                <h3 className="text-lg font-mont font-bold text-slate-900 dark:text-white">
                                  {location.address.locationName}
                                </h3>
                              )}

                              <div className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                  {formatAddress(location.address)}
                                </p>
                              </div>

                              <Button
                                asChild
                                variant="outline"
                                size="sm"
                                className="w-full rounded-lg"
                              >
                                <a
                                  href={getGoogleMapsUrl(location.address)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="gap-2"
                                >
                                  <Navigation size={14} />
                                  Get Directions
                                </a>
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                {/* No Locations */}
                {!pollingData.pollingLocations?.length &&
                  !pollingData.earlyVoteSites?.length &&
                  !pollingData.dropOffLocations?.length && (
                    <div className="bg-white dark:bg-slate-800 p-8 rounded-none  border border-slate-200 dark:border-slate-700 text-center">
                      <AlertCircle className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                      <h3 className="text-xl font-mont font-bold text-slate-900 dark:text-white mb-2">
                        No Polling Locations Available
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400">
                        Polling location data is typically available closer to
                        election dates.
                      </p>
                    </div>
                  )}
              </div>
            )}

            {/* Contests Tab */}
            {activeTab === "contests" && (
              <div className="space-y-6">
                {pollingData.contests && pollingData.contests.length > 0 ? (
                  pollingData.contests.map((contest, index) => (
                    <div
                      key={index}
                      className="bg-white dark:bg-slate-800 p-6 rounded-none border border-slate-200 dark:border-slate-700"
                    >
                      {/* Contest Header */}
                      <div className="mb-6">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-mont font-bold text-slate-900 dark:text-white">
                            {contest.office ||
                              contest.referendumTitle ||
                              "Contest"}
                          </h3>
                          {contest.type && (
                            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-full">
                              {contest.type}
                            </span>
                          )}
                        </div>
                        {contest.district && (
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {contest.district.name}
                          </p>
                        )}
                        {contest.referendumSubtitle && (
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                            {contest.referendumSubtitle}
                          </p>
                        )}
                        {contest.referendumText && (
                          <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700">
                            <p className="text-sm text-slate-700 dark:text-slate-300">
                              {contest.referendumText}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Candidates */}
                      {contest.candidates && contest.candidates.length > 0 && (
                        <div className="space-y-4">
                          <h4 className="font-semibold text-slate-900 dark:text-white">
                            Candidates:
                          </h4>
                          <div className="grid gap-4 md:grid-cols-2">
                            {contest.candidates.map((candidate, candIndex) => (
                              <div
                                key={candIndex}
                                className="p-4 bg-slate-50 dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700"
                              >
                                <div className="flex items-start gap-3">
                                  {candidate.photoUrl && (
                                    <img
                                      src={candidate.photoUrl}
                                      alt={candidate.name}
                                      className="w-12 h-12 rounded-full object-cover"
                                    />
                                  )}
                                  <div className="flex-1 min-w-0">
                                    <h5 className="font-semibold text-slate-900 dark:text-white">
                                      {candidate.name}
                                    </h5>
                                    {candidate.party && (
                                      <span
                                        className={`inline-block mt-1 px-2 py-0.5 text-xs font-semibold rounded-full ${getPartyColor(
                                          candidate.party
                                        )}`}
                                      >
                                        {candidate.party}
                                      </span>
                                    )}
                                    {candidate.candidateUrl && (
                                      <a
                                        href={candidate.candidateUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1 text-sm text-primary hover:underline mt-2"
                                      >
                                        <ExternalLink size={12} />
                                        Website
                                      </a>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {contest.referendumUrl && (
                        <div className="mt-4">
                          <a
                            href={contest.referendumUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-primary hover:underline"
                          >
                            <FileText size={16} />
                            More Information
                          </a>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="bg-white dark:bg-slate-800 p-8 rounded-none border border-slate-200 dark:border-slate-700 text-center">
                    <Info className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-xl font-mont font-bold text-slate-900 dark:text-white mb-2">
                      No Contest Information Available
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      Contest and candidate information will be available closer
                      to the election.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Officials Tab */}
            {activeTab === "officials" && (
              <div className="space-y-6">
                {pollingData.electionOfficials &&
                pollingData.electionOfficials.length > 0 ? (
                  pollingData.electionOfficials.map((official, index) => (
                    <div
                      key={index}
                      className="bg-white dark:bg-slate-800 p-6 rounded-none border border-slate-200 dark:border-slate-700"
                    >
                      <div className="flex items-start gap-3 mb-4">
                        <Building className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                        <div className="flex-1">
                          <h3 className="text-xl font-mont font-bold text-slate-900 dark:text-white mb-1">
                            {official.name}
                          </h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {official.type}
                          </p>
                        </div>
                      </div>

                      {/* Contact Information */}
                      {official.electionOfficials &&
                        official.electionOfficials.length > 0 && (
                          <div className="mb-4 space-y-3">
                            {official.electionOfficials.map(
                              (person, pIndex) => (
                                <div
                                  key={pIndex}
                                  className="p-3 bg-slate-50 dark:bg-slate-900 rounded"
                                >
                                  {person.name && (
                                    <p className="font-semibold text-slate-900 dark:text-white">
                                      {person.name}
                                      {person.title && (
                                        <span className="text-sm text-slate-600 dark:text-slate-400 ml-2">
                                          ({person.title})
                                        </span>
                                      )}
                                    </p>
                                  )}
                                  {person.officePhoneNumber && (
                                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mt-1">
                                      <Phone size={14} />
                                      <a
                                        href={`tel:${person.officePhoneNumber}`}
                                        className="hover:text-primary"
                                      >
                                        {person.officePhoneNumber}
                                      </a>
                                    </div>
                                  )}
                                  {person.emailAddress && (
                                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mt-1">
                                      <Mail size={14} />
                                      <a
                                        href={`mailto:${person.emailAddress}`}
                                        className="hover:text-primary"
                                      >
                                        {person.emailAddress}
                                      </a>
                                    </div>
                                  )}
                                </div>
                              )
                            )}
                          </div>
                        )}

                      {/* Addresses */}
                      {official.physicalAddress && (
                        <div className="mb-4">
                          <p className="text-sm font-semibold text-slate-900 dark:text-white mb-1">
                            Physical Address:
                          </p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {formatAddress(official.physicalAddress)}
                          </p>
                        </div>
                      )}

                      {official.hoursOfOperation && (
                        <div className="mb-4">
                          <p className="text-sm font-semibold text-slate-900 dark:text-white mb-1">
                            Hours of Operation:
                          </p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {official.hoursOfOperation}
                          </p>
                        </div>
                      )}

                      {/* Useful Links */}
                      <div className="space-y-2">
                        {official.electionInfoUrl && (
                          <a
                            href={official.electionInfoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-primary hover:underline"
                          >
                            <ExternalLink size={14} />
                            Election Information
                          </a>
                        )}
                        {official.electionRegistrationUrl && (
                          <a
                            href={official.electionRegistrationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-primary hover:underline"
                          >
                            <ExternalLink size={14} />
                            Voter Registration
                          </a>
                        )}
                        {official.absenteeVotingInfoUrl && (
                          <a
                            href={official.absenteeVotingInfoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-primary hover:underline"
                          >
                            <ExternalLink size={14} />
                            Absentee Voting Information
                          </a>
                        )}
                        {official.ballotInfoUrl && (
                          <a
                            href={official.ballotInfoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-primary hover:underline"
                          >
                            <ExternalLink size={14} />
                            Ballot Information
                          </a>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-white dark:bg-slate-800 p-8 rounded-none border border-slate-200 dark:border-slate-700 text-center">
                    <Building className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-xl font-mont font-bold text-slate-900 dark:text-white mb-2">
                      No Election Official Information Available
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      Election official contact information will be available
                      closer to the election.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Info Section */}
        {!pollingData && !loading && (
          <div className="mt-12 max-w-3xl mx-auto">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-8 rounded-none">
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
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default PollingStationPage;
