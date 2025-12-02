"use client";

import { useState } from "react";
import { MapPin, Search, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const US_STATES = [
  {
    name: "Alabama",
    abbr: "AL",
    voteUrl: "https://www.sos.alabama.gov/alabama-votes",
  },
  { name: "Alaska", abbr: "AK", voteUrl: "https://www.elections.alaska.gov/" },
  { name: "Arizona", abbr: "AZ", voteUrl: "https://azsos.gov/elections" },
  {
    name: "Arkansas",
    abbr: "AR",
    voteUrl: "https://www.sos.arkansas.gov/elections",
  },
  {
    name: "California",
    abbr: "CA",
    voteUrl: "https://www.sos.ca.gov/elections",
  },
  {
    name: "Colorado",
    abbr: "CO",
    voteUrl: "https://www.sos.state.co.us/pubs/elections/main.html",
  },
  {
    name: "Connecticut",
    abbr: "CT",
    voteUrl:
      "https://portal.ct.gov/SOTS/Election-Services/V5-Side-Navigation/ELE---Election-Information",
  },
  { name: "Delaware", abbr: "DE", voteUrl: "https://elections.delaware.gov/" },
  {
    name: "Florida",
    abbr: "FL",
    voteUrl: "https://dos.myflorida.com/elections/",
  },
  { name: "Georgia", abbr: "GA", voteUrl: "https://sos.ga.gov/elections" },
  { name: "Hawaii", abbr: "HI", voteUrl: "https://elections.hawaii.gov/" },
  { name: "Idaho", abbr: "ID", voteUrl: "https://sos.idaho.gov/elections/" },
  { name: "Illinois", abbr: "IL", voteUrl: "https://www.elections.il.gov/" },
  { name: "Indiana", abbr: "IN", voteUrl: "https://www.in.gov/sos/elections/" },
  { name: "Iowa", abbr: "IA", voteUrl: "https://sos.iowa.gov/elections/" },
  { name: "Kansas", abbr: "KS", voteUrl: "https://sos.ks.gov/elections/" },
  { name: "Kentucky", abbr: "KY", voteUrl: "https://elect.ky.gov/" },
  {
    name: "Louisiana",
    abbr: "LA",
    voteUrl: "https://www.sos.la.gov/ElectionsAndVoting/",
  },
  { name: "Maine", abbr: "ME", voteUrl: "https://www.maine.gov/sos/cec/elec/" },
  { name: "Maryland", abbr: "MD", voteUrl: "https://elections.maryland.gov/" },
  {
    name: "Massachusetts",
    abbr: "MA",
    voteUrl: "https://www.sec.state.ma.us/ele/",
  },
  {
    name: "Michigan",
    abbr: "MI",
    voteUrl: "https://www.michigan.gov/sos/elections",
  },
  {
    name: "Minnesota",
    abbr: "MN",
    voteUrl: "https://www.sos.state.mn.us/elections-voting/",
  },
  {
    name: "Mississippi",
    abbr: "MS",
    voteUrl: "https://www.sos.ms.gov/elections-voting",
  },
  { name: "Missouri", abbr: "MO", voteUrl: "https://www.sos.mo.gov/elections" },
  { name: "Montana", abbr: "MT", voteUrl: "https://sosmt.gov/elections/" },
  {
    name: "Nebraska",
    abbr: "NE",
    voteUrl: "https://sos.nebraska.gov/elections",
  },
  {
    name: "Nevada",
    abbr: "NV",
    voteUrl: "https://www.nvsos.gov/sos/elections",
  },
  {
    name: "New Hampshire",
    abbr: "NH",
    voteUrl: "https://sos.nh.gov/elections/",
  },
  {
    name: "New Jersey",
    abbr: "NJ",
    voteUrl: "https://www.state.nj.us/state/elections/",
  },
  {
    name: "New Mexico",
    abbr: "NM",
    voteUrl: "https://www.sos.state.nm.us/voting-and-elections/",
  },
  { name: "New York", abbr: "NY", voteUrl: "https://www.elections.ny.gov/" },
  { name: "North Carolina", abbr: "NC", voteUrl: "https://www.ncsbe.gov/" },
  { name: "North Dakota", abbr: "ND", voteUrl: "https://vip.sos.nd.gov/" },
  { name: "Ohio", abbr: "OH", voteUrl: "https://www.ohiosos.gov/elections/" },
  { name: "Oklahoma", abbr: "OK", voteUrl: "https://www.ok.gov/elections/" },
  { name: "Oregon", abbr: "OR", voteUrl: "https://sos.oregon.gov/voting/" },
  { name: "Pennsylvania", abbr: "PA", voteUrl: "https://www.votespa.com/" },
  { name: "Rhode Island", abbr: "RI", voteUrl: "https://vote.sos.ri.gov/" },
  { name: "South Carolina", abbr: "SC", voteUrl: "https://www.scvotes.gov/" },
  {
    name: "South Dakota",
    abbr: "SD",
    voteUrl: "https://sdsos.gov/elections-voting/",
  },
  { name: "Tennessee", abbr: "TN", voteUrl: "https://sos.tn.gov/elections" },
  {
    name: "Texas",
    abbr: "TX",
    voteUrl: "https://goelect.txelections.civixapps.com/ivis-mvp-ui/#/login",
  },
  { name: "Utah", abbr: "UT", voteUrl: "https://elections.utah.gov/" },
  {
    name: "Vermont",
    abbr: "VT",
    voteUrl: "https://sos.vermont.gov/elections/",
  },
  {
    name: "Virginia",
    abbr: "VA",
    voteUrl: "https://www.elections.virginia.gov/",
  },
  {
    name: "Washington",
    abbr: "WA",
    voteUrl: "https://www.sos.wa.gov/elections/",
  },
  {
    name: "West Virginia",
    abbr: "WV",
    voteUrl: "https://sos.wv.gov/elections/",
  },
  { name: "Wisconsin", abbr: "WI", voteUrl: "https://elections.wi.gov/" },
  { name: "Wyoming", abbr: "WY", voteUrl: "https://sos.wyo.gov/Elections/" },
  {
    name: "District of Columbia",
    abbr: "DC",
    voteUrl: "https://www.dcboe.org/",
  },
];

const StateSelector = () => {
  const [selectedState, setSelectedState] = useState<string>("");

  const handleStateChange = (value: string) => {
    setSelectedState(value);
  };

  const handleGoToVotingSite = () => {
    const state = US_STATES.find((s) => s.abbr === selectedState);
    if (state) {
      window.open(state.voteUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-16 px-8">
      {/* Header */}
      <div className="text-start mb-8">
        <h2 className="text-2xl md:text-4xl font-mont font-bold text-primary dark:text-white mb-3">
          Find Your State Voting Information
        </h2>
        <p className="text-sm md:text-base fontroboto text-muted-foreground max-w-2xl">
          Select your state to access official voting resources, registration
          information, and polling locations.
        </p>
      </div>

      {/* State Selector Card */}
      <div className="relative overflow-hidden rounded-none border border-border bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 p-8 shadow-lg">
        {/* Decorative Background Pattern */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -z-10" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-primary/10 text-primary rounded-none">
              <MapPin size={24} />
            </div>
            <h3 className="text-xl font-bold fontmont text-foreground">
              Select Your State
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* State Dropdown */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground fontroboto">
                Choose your state
              </label>
              <Select onValueChange={handleStateChange} value={selectedState}>
                <SelectTrigger className="w-full rounded-none h-12 text-base fontroboto border-2 hover:border-primary transition-colors">
                  <SelectValue placeholder="Select a state..." />
                </SelectTrigger>
                <SelectContent className="rounded-none max-h-[300px]">
                  {US_STATES.map((state) => (
                    <SelectItem
                      key={state.abbr}
                      value={state.abbr}
                      className="fontroboto cursor-pointer"
                    >
                      {state.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Action Button */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground fontroboto opacity-0 md:opacity-100">
                Action
              </label>
              <Button
                onClick={handleGoToVotingSite}
                disabled={!selectedState}
                className="w-full h-8 rounded-none text-base fontroboto shadow-none hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <Search size={18} className="mr-2" />
                Go to Voting Site
                <ExternalLink
                  size={16}
                  className="ml-2 transition-transform duration-200 group-hover:translate-x-1"
                />
              </Button>
            </div>
          </div>

          {/* Selected State Info */}
          {selectedState && (
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-none border border-blue-200 dark:border-blue-800 animate-fade-in">
              <p className="text-sm text-blue-800 dark:text-blue-200 fontroboto">
                <span className="font-bold">
                  {US_STATES.find((s) => s.abbr === selectedState)?.name}
                </span>{" "}
                - You&apos;ll be directed to your state&apos;s official election
                website where you can register to vote, find your polling
                location, and access important voting information.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="p-6 bg-white dark:bg-slate-800 border border-border rounded-none hover:shadow-md transition-shadow">
          <div className="text-3xl font-bold text-primary fontmont mb-2">
            50+
          </div>
          <div className="text-sm text-muted-foreground fontroboto">
            States & Territories Covered
          </div>
        </div>
        <div className="p-6 bg-white dark:bg-slate-800 border border-border rounded-none hover:shadow-md transition-shadow">
          <div className="text-3xl font-bold text-primary fontmont mb-2">
            100%
          </div>
          <div className="text-sm text-muted-foreground fontroboto">
            Official Government Sources
          </div>
        </div>
        <div className="p-6 bg-white dark:bg-slate-800 border border-border rounded-none hover:shadow-md transition-shadow">
          <div className="text-3xl font-bold text-primary fontmont mb-2">
            24/7
          </div>
          <div className="text-sm text-muted-foreground fontroboto">
            Access to Voting Information
          </div>
        </div>
      </div>
    </div>
  );
};

export default StateSelector;
