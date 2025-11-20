"use client";
import AllPolitician from "./components/allPolitician";
import Featured from "./components/featured";
import Countdown from "./components/countdown";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

// Optionally, define a type/interface for politicians
// interface PoliticianType {
//   id: number;
//   name: string;
//   image: string;
//   votes: number;
//   rank: number;
//   trending: boolean;
//   position: string;
// }
const normalizePolitician = (
  raw: {
    id: string;
    name: string;
    image_url: string;
    votes: string;
    party: string;
    district: string;
    state: string;
  },
  index: number
) => ({
  id: raw.id,
  name: raw.name,
  image: raw.image_url ?? "https://placehold.co/600x400?text=No+Image",
  votes: raw.votes ?? 0,
  rank: index + 1,
  trending: true,
  position: `${raw.party} - District ${raw.district}, ${raw.state}`,
});

const Page = () => {
  const [politicians, setPoliticians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCongressMembers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("https://voteunited.buyjet.ng/api/members");

      if (!response.ok) {
        throw new Error(
          `API Error: ${response.status} - ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log("API RESPONSE:", data);

      // 🛠 FIX: members is a direct array, not nested under data
      const members = data?.members || [];

      if (!Array.isArray(members)) {
        throw new Error("Members data is not an array");
      }

      const processedData = data.members.map(normalizePolitician);
      setPoliticians(processedData);
    } catch (err) {
      console.error("Error fetching Congress members:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCongressMembers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary mb-2">Loading...</div>
          <p className="text-muted-foreground">Fetching politicians data</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-2xl font-bold text-red-600 mb-2">Error</div>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={fetchCongressMembers}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="md:max-w-7xl max-w-full mx-auto text-center p-10">
        <h2 className="text-4xl md:text-5xl font-mont font-bold text-primary dark:text-white mb-4">
          Vote Your Candidate
        </h2>
        <p className="text-lg text-slate-600 fontroboto dark:text-slate-400 max-w-2xl mx-auto">
          Cast your vote for the candidate you believe in shaping the future of
          our country.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 mb-8">
        <Countdown />
      </div>

      <div className="max-w-7xl mx-auto">
        <Featured politicians={politicians} />
      </div>

      <div className="max-w-7xl mx-auto">
        <AllPolitician politicians={politicians} />
      </div>
    </div>
  );
};

export default Page;
