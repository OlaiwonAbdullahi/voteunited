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

        {/* SBSFA Section */}
        <div className="mt-16">
          <div className="text-start mb-8">
            <h2 className="text-2xl md:text-4xl font-mont font-bold text-primary dark:text-white mb-3">
              The Secure Borders, Stable Families Act (SBSFA)
            </h2>
            <p className="text-sm md:text-base fontroboto text-muted-foreground max-w-4xl">
              A comprehensive legislative proposal to modernize the United
              States immigration system through three core pillars: Legal Order,
              Economic Stability, and National Security.
            </p>
          </div>

          {/* Preamble */}
          <div className="mb-8 p-6 bg-linear-to-br from-blue-50 to-white dark:from-blue-950/30 dark:to-slate-900 rounded-none border-l-4 border-blue-600">
            <h3 className="text-xl font-bold text-foreground fontmont mb-3">
              Preamble and Legislative Intent
            </h3>
            <p className="text-sm fontroboto text-muted-foreground leading-relaxed">
              The purpose of this Act is to{" "}
              <strong>modernize the United States immigration system</strong> by
              establishing legal integrity at the border, enforcing a strict
              zero-tolerance policy for criminal non-citizens, and providing a
              defined, earned pathway to legal certainty for long-term,
              non-violent residents to promote{" "}
              <strong>
                National Economic Stability and Community Welfare.
              </strong>
            </p>
            <p className="text-sm fontroboto text-muted-foreground leading-relaxed mt-3">
              This bill focuses on three core pillars:{" "}
              <strong>
                Legal Order, Economic Stability, and National Security.
              </strong>
            </p>
          </div>

          {/* Title I */}
          <div className="mb-6 bg-white dark:bg-slate-900 rounded-none border border-border overflow-hidden">
            <div className="p-6 bg-linear-to-r from-primary/5 to-transparent border-b border-border">
              <h3 className="text-xl font-bold text-primary fontmont">
                TITLE I: DEFINITIVE CITIZENSHIP AND NATIONAL INTEGRITY
              </h3>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-foreground fontmont mb-2">
                  Sec. 101. DACA Path to Citizenship
                </h4>
                <p className="text-sm fontroboto text-muted-foreground leading-relaxed">
                  Grants{" "}
                  <strong>
                    immediate Conditional Permanent Resident (CPR) status
                  </strong>{" "}
                  to all DACA-eligible individuals, leading to full{" "}
                  <strong>U.S. Citizenship</strong> after a period of five (5)
                  years of continuous residency, maintenance of a clean criminal
                  record, and consistent tax compliance.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-foreground fontmont mb-2">
                  Sec. 102. Restriction of Birthright Citizenship
                </h4>
                <p className="text-sm fontroboto text-muted-foreground leading-relaxed">
                  Only children born in the United States to at least{" "}
                  <strong>
                    one parent who is a U.S. Citizen or a Lawful Permanent
                    Resident
                  </strong>{" "}
                  shall be granted citizenship at birth.{" "}
                  <em>
                    (This measure is intended to test the current judicial
                    interpretation of the Fourteenth Amendment.)
                  </em>
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-foreground fontmont mb-2">
                  Sec. 103. Exclusive Voter Eligibility
                </h4>
                <p className="text-sm fontroboto text-muted-foreground leading-relaxed">
                  <strong>Only U.S. Citizens</strong> shall be eligible to vote
                  in all federal, state, and local elections nationwide.
                </p>
              </div>
            </div>
          </div>

          {/* Title II */}
          <div className="mb-6 bg-white dark:bg-slate-900 rounded-none border border-border overflow-hidden">
            <div className="p-6 bg-linear-to-r from-purple/5 to-transparent border-b border-border">
              <h3 className="text-xl font-bold text-primary fontmont">
                TITLE II: UNIVERSAL IDENTIFICATION AND STATUS MANAGEMENT
              </h3>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-foreground fontmont mb-2">
                  Sec. 201. Mandatory National Residency Database
                </h4>
                <p className="text-sm fontroboto text-muted-foreground leading-relaxed">
                  Mandates the creation of a{" "}
                  <strong>secure, national biometric ID system</strong>. All
                  persons residing in the U.S., regardless of legal status, must
                  register for an ID card within three (3) years of this Act's
                  enactment.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-foreground fontmont mb-2">
                  Sec. 202. Temporary Visitor (TV) Status
                </h4>
                <p className="text-sm fontroboto text-muted-foreground leading-relaxed">
                  Converts the status of long-term unauthorized residents
                  (defined as residing since before the bill's enactment) to{" "}
                  <strong>Temporary Visitor (TV) status</strong>, which grants
                  immediate work authorization for an initial period of two (2)
                  years.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-foreground fontmont mb-2">
                  Sec. 203. TV Status Cap and Certainty
                </h4>
                <p className="text-sm fontroboto text-muted-foreground leading-relaxed">
                  TV status is capped at a maximum aggregate period of{" "}
                  <strong>ten (10) years</strong>. At the conclusion of this
                  10-year period, the individual must successfully transition
                  into a permanent visa category or face mandatory, expedited
                  removal proceedings.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-foreground fontmont mb-2">
                  Sec. 204. Exclusion of Criminal Non-Citizens
                </h4>
                <p className="text-sm fontroboto text-muted-foreground leading-relaxed">
                  <strong>NO INDIVIDUAL</strong> with a felony conviction or
                  three (3) or more misdemeanors (excluding minor traffic
                  violations) is eligible for Temporary Visitor (TV) status or
                  the DACA pathway established in Sec. 101. These individuals
                  shall be placed into immediate, mandatory removal proceedings.
                  This program is{" "}
                  <strong>
                    exclusively for non-violent, law-abiding residents.
                  </strong>
                </p>
              </div>
            </div>
          </div>

          {/* Title III */}
          <div className="mb-6 bg-white dark:bg-slate-900 rounded-none border border-border overflow-hidden">
            <div className="p-6 bg-linear-to-r from-orange/5 to-transparent border-b border-border">
              <h3 className="text-xl font-bold text-primary fontmont">
                TITLE III: ECONOMIC AND LABOR REFORM
              </h3>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-foreground fontmont mb-2">
                  Sec. 301. Citizen Sponsorship for Visas
                </h4>
                <p className="text-sm fontroboto text-muted-foreground leading-relaxed">
                  Creates a new, streamlined worker visa category requiring the
                  foreign worker to be{" "}
                  <strong>
                    personally and legally guaranteed by a U.S. Citizen sponsor
                  </strong>{" "}
                  (who must be an owner or principal officer of the employing
                  entity).
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-foreground fontmont mb-2">
                  Sec. 302. Sponsor Financial and Behavioral Liability
                </h4>
                <p className="text-sm fontroboto text-muted-foreground leading-relaxed">
                  The U.S. Citizen sponsor shall be{" "}
                  <strong>financially liable</strong> for the worker's public
                  charges for a period of five (5) years. The sponsor is also
                  legally required to notify the Department of Homeland Security
                  (DHS) immediately upon any criminal charges against the worker
                  or termination of employment. Failure to comply results in
                  substantial fines (scaling with company size) and a five-year
                  sponsorship ban.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-foreground fontmont mb-2">
                  Sec. 303. Worker Protection and Mobility
                </h4>
                <p className="text-sm fontroboto text-muted-foreground leading-relaxed">
                  If employment is terminated, the sponsored worker receives a{" "}
                  <strong>60-day grace period</strong> to find a new certified
                  employer and sponsor without losing status. A{" "}
                  <strong>confidential DHS system</strong> is established for
                  workers to report sponsor exploitation without fear of
                  deportation.
                </p>
              </div>
            </div>
          </div>

          {/* Title IV */}
          <div className="mb-6 bg-white dark:bg-slate-900 rounded-none border border-border overflow-hidden">
            <div className="p-6 bg-linear-to-r from-green/5 to-transparent border-b border-border">
              <h3 className="text-xl font-bold text-primary fontmont">
                TITLE IV: EXPEDITED ADJUDICATION AND LEGAL CERTAINTY
              </h3>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-foreground fontmont mb-2">
                  Sec. 401. Dedicated Adjudication Force
                </h4>
                <p className="text-sm fontroboto text-muted-foreground leading-relaxed">
                  Mandates the hiring and fast-tracked security clearance for{" "}
                  <strong>five hundred (500) new Immigration Judges</strong> and{" "}
                  <strong>one thousand (1,000) Asylum Officers</strong> to
                  immediately address the current immigration court backlog.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-foreground fontmont mb-2">
                  Sec. 402. Immigration Status Review Boards (ISRB)
                </h4>
                <p className="text-sm fontroboto text-muted-foreground leading-relaxed">
                  Creates three-member, dedicated{" "}
                  <strong>Immigration Status Review Boards (ISRB)</strong>{" "}
                  within DHS field offices. These boards are vested with the
                  authority to render{" "}
                  <strong>final administrative decisions</strong> on Temporary
                  Visitor (TV) Status extensions and final green card approvals
                  for all legalization applicants under this Act.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-foreground fontmont mb-2">
                  Sec. 403. Due Process Oversight
                </h4>
                <p className="text-sm fontroboto text-muted-foreground leading-relaxed">
                  ISRB decisions shall remain subject to a mandatory, but
                  limited, review by a sitting U.S. Federal Court upon credible
                  allegation of a <strong>due process violation</strong>,
                  thereby ensuring accountability.
                </p>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-none border-l-4 border-yellow-600">
            <p className="text-xs fontroboto text-muted-foreground italic">
              <strong>Note:</strong> This is a legislative proposal and is not
              currently enacted law. The content above represents the proposed
              text of the Secure Borders, Stable Families Act (SBSFA). For
              questions about current immigration law and policy, please refer
              to official government resources.
            </p>
          </div>
        </div>

        {/* Healthcare Price Transparency Section */}
        <div className="mt-16">
          <div className="text-start mb-8">
            <h2 className="text-2xl md:text-4xl font-mont font-bold text-primary dark:text-white mb-3">
              Healthcare Price Transparency
            </h2>
            <h3 className="text-xl md:text-2xl fontmont font-semibold text-foreground mb-4">
              The Common-Sense Cure: Why Price Transparency is the Bipartisan
              Fix to Sky-High Healthcare Bills
            </h3>
            <p className="text-sm fontroboto text-muted-foreground italic">
              By The Vote United Team
            </p>
          </div>

          {/* Introduction */}
          <div className="mb-8 p-6 bg-white dark:bg-slate-900 rounded-none border border-border">
            <p className="text-sm fontroboto text-muted-foreground leading-relaxed mb-4">
              Try to buy a gallon of milk without seeing the price, or book a
              flight without knowing the fare. It&apos;s impossible. Yet, this
              is the absurd, expensive reality of American healthcare, where the{" "}
              <strong>cost of a procedure remains a secret</strong> until the
              bill arrives, often weeks later, threatening a family&apos;s
              financial stability. At <strong>VoteUnited.com</strong>, we see
              this not as an ideological battle, but as a crisis of common
              sense:{" "}
              <strong>
                when consumers can&apos;t compare prices, the market can&apos;t
                function.
              </strong>{" "}
              The bipartisan solution is simple:{" "}
              <strong>full, accessible price transparency</strong> to put power
              back into the hands of patients and force prices down.
            </p>
          </div>

          {/* The Problem */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-foreground fontmont mb-4">
              The Problem: A System Built on Secret Prices
            </h3>
            <div className="p-6 bg-linear-to-br from-red-50 to-white dark:from-red-950/30 dark:to-slate-900 rounded-none border-l-4 border-red-600">
              <p className="text-sm fontroboto text-muted-foreground leading-relaxed mb-4">
                The price of healthcare services in America varies wildly—not
                just between different cities, but between hospitals across the
                street from one another.<sup>1</sup> This disparity is often
                massive and totally arbitrary. A simple MRI can cost{" "}
                <strong>$500</strong> at an independent imaging center and{" "}
                <strong>$5,000</strong> at a major hospital system, often for
                the exact same service.
              </p>
              <p className="text-sm fontroboto text-muted-foreground leading-relaxed">
                Why does this happen? Because the prices are hidden. Large
                healthcare conglomerates and insurance companies negotiate rates
                in secret, binding contracts, ensuring that the consumer—the one
                paying the bill—is the last to know the cost. This lack of
                information destroys any possibility of a competitive market.
                When price is opaque, providers have no incentive to compete on
                cost, allowing prices to inflate unchecked.
              </p>
            </div>
          </div>

          {/* Bipartisan Call */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-foreground fontmont mb-4">
              The Bipartisan Call for Accountability
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-white dark:bg-slate-900 rounded-none border border-border">
                <h4 className="text-lg font-semibold text-primary fontmont mb-3">
                  For Fiscal Conservatives and Free-Market Advocates
                </h4>
                <p className="text-sm fontroboto text-muted-foreground leading-relaxed">
                  Transparency is the key to creating a true market. It empowers
                  the consumer to shop around, rewarding efficient, lower-cost
                  providers and penalizing those who overcharge. This is the{" "}
                  <strong>free-market cure</strong> to healthcare inflation.
                </p>
              </div>
              <div className="p-6 bg-white dark:bg-slate-900 rounded-none border border-border">
                <h4 className="text-lg font-semibold text-primary fontmont mb-3">
                  For Populists and Patient Advocates
                </h4>
                <p className="text-sm fontroboto text-muted-foreground leading-relaxed">
                  Transparency exposes corporate price gouging and unfair
                  billing practices.<sup>2</sup> It&apos;s an essential tool for{" "}
                  <strong>accountability</strong> that protects the average
                  family from financial ruin caused by surprise bills and
                  arbitrary cost hikes.
                </p>
              </div>
            </div>
          </div>

          {/* The Solution */}
          <div className="mb-6 bg-linear-to-br from-blue-50 to-white dark:from-blue-950/30 dark:to-slate-900 rounded-none border-l-4 border-blue-600 p-6">
            <h3 className="text-xl font-bold text-foreground fontmont mb-4">
              The Vote United Solution: Making Cost Clear
            </h3>
            <p className="text-sm fontroboto text-muted-foreground leading-relaxed mb-4">
              Our proposed solution is straightforward and powerful:{" "}
              <strong>
                Mandate full, easily accessible price transparency for all
                medical services and procedures before a patient receives care.
              </strong>
            </p>
            <p className="text-sm fontroboto text-muted-foreground leading-relaxed mb-3">
              This mandate must go beyond complicated, downloadable spreadsheet
              files. Prices must be:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-sm fontroboto text-muted-foreground">
              <li>
                <strong>Consumer-Friendly:</strong> Posted in a clear,
                searchable, and intuitive format (like a menu) on a provider's
                public website.
              </li>
              <li>
                <strong>Comprehensive:</strong> Include not just the "list
                price," but the negotiated rates with major insurers and the
                cash price for the uninsured.
              </li>
              <li>
                <strong>Actionable:</strong> Allow a patient to easily compare
                the costs of bundled services (e.g., a knee replacement) across
                multiple local providers.
              </li>
            </ol>
          </div>

          {/* The Results */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-foreground fontmont mb-4">
              The Results: Lower Costs and Restored Trust
            </h3>
            <div className="p-6 bg-white dark:bg-slate-900 rounded-none border border-border">
              <p className="text-sm fontroboto text-muted-foreground leading-relaxed">
                When patients, employers, and government payers can see the true
                cost, they gain immediate leverage. Imagine an employer
                purchasing healthcare for thousands of staff, suddenly being
                able to choose the high-quality, lower-cost provider nearby. The
                sheer threat of losing business will force every facility to
                reassess their pricing models.
              </p>
              <p className="text-sm fontroboto text-muted-foreground leading-relaxed mt-4">
                <strong>Truth above all</strong> means giving the patient the
                fundamental truth about the cost of their care so they can make
                an informed, confident decision. Price transparency is not a
                philosophical cure for healthcare; it is the{" "}
                <strong>common-sense mechanism</strong> that restores market
                competition, drives down costs for everyone, and ensures that
                financial anxiety is not part of the recovery process.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="p-6 bg-gradient-to-br from-green-50 to-white dark:from-green-950/30 dark:to-slate-900 rounded-none border-2 border-green-600">
            <h3 className="text-lg font-bold text-foreground fontmont mb-3 flex items-center gap-2">
              📞 Call Your Congressional Representatives
            </h3>
            <div className="border-l-4 border-green-600 pl-4 py-2">
              <h4 className="text-base font-semibold text-foreground fontmont mb-2">
                Voice Your Opinion!
              </h4>
              <p className="text-sm fontroboto text-muted-foreground leading-relaxed">
                Does the cost of healthcare keep you up at night? Have you been
                hit with a surprise bill? <strong>VoteUnited.com</strong> is
                about the people's voice.
              </p>
            </div>
          </div>
        </div>

        {/* Immigration Judicial Reform Section */}
        <div className="mt-16">
          <div className="text-start mb-8">
            <h2 className="text-2xl md:text-4xl font-mont font-bold text-primary dark:text-white mb-3">
              Immigration Judicial Reform (Expanded)
            </h2>
            <h3 className="text-xl md:text-2xl fontmont font-semibold text-foreground mb-4">
              From 7 Years to 7 Months: The Common-Sense Fix for Our Broken
              Immigration Courts
            </h3>
          </div>

          {/* Introduction */}
          <div className="mb-8 p-6 bg-linear-to-br from-purple-50 to-white dark:from-purple-950/30 dark:to-slate-900 rounded-none border-l-4 border-purple-600">
            <p className="text-sm fontroboto text-muted-foreground leading-relaxed">
              The single biggest bottleneck undermining both the{" "}
              <strong>rule of law</strong> and{" "}
              <strong>humanitarian fairness</strong> in our immigration system
              isn't found at the border; it's found in the staggering,
              dysfunctional <strong>Immigration Court backlog.</strong> With
              millions of cases pending, those who should be deported remain in
              the country for years, and those who deserve asylum wait a decade
              for justice. This is a system failing everyone. Our common-sense
              fix is clear: stop treating the courts as an afterthought and{" "}
              <strong>
                invest massively in judges, asylum officers, and resources
              </strong>{" "}
              to ensure that every case—whether for removal or protection—is
              processed quickly, fairly, and decisively.
            </p>
          </div>

          {/* The Problem */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-foreground fontmont mb-4">
              The Problem: Justice Delayed is Justice Denied
            </h3>
            <div className="p-6 bg-white dark:bg-slate-900 rounded-none border border-border">
              <p className="text-sm fontroboto text-muted-foreground leading-relaxed mb-4">
                Currently, the backlog of cases in U.S. immigration courts
                exceeds two million, and the average wait time for an individual
                case can span five to seven years. This is not just a
                statistical headache; it's a national security and humanitarian
                crisis.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-4">
                <div>
                  <h4 className="text-base font-semibold text-foreground fontmont mb-2">
                    For Enforcement:
                  </h4>
                  <p className="text-sm fontroboto text-muted-foreground leading-relaxed">
                    When a removal order takes a decade to execute, it renders
                    the concept of timely enforcement meaningless and encourages
                    more unlawful crossings. The cost to taxpayers to track and
                    manage these individuals is astronomical.
                  </p>
                </div>
                <div>
                  <h4 className="text-base font-semibold text-foreground fontmont mb-2">
                    For Asylum Seekers:
                  </h4>
                  <p className="text-sm fontroboto text-muted-foreground leading-relaxed">
                    Those with legitimate claims, often fleeing violence and
                    persecution, are left in agonizing limbo for years, unable
                    to establish stable lives or reunite with family. This
                    failure compromises America's promise of due process and
                    humanitarian protection.
                  </p>
                </div>
              </div>
              <p className="text-sm fontroboto text-muted-foreground leading-relaxed mt-4">
                The core issue is a radical imbalance: when border funding is
                increased (a frequent bipartisan priority), it rightly leads to
                more border personnel and more apprehensions. However, the
                subsequent step—funding the courts that must hear those cases—is
                routinely ignored. We are operating a 21st-century enforcement
                apparatus with a 20th-century court system.
              </p>
            </div>
          </div>

          {/* The Solution */}
          <div className="mb-6 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/30 dark:to-slate-900 rounded-none border-l-4 border-blue-600 p-6">
            <h3 className="text-xl font-bold text-foreground fontmont mb-4">
              The Bipartisan Solution: Treat the Courts as Essential
              Infrastructure
            </h3>
            <p className="text-sm fontroboto text-muted-foreground leading-relaxed mb-4">
              The solution is not complex, nor is it partisan. It is a
              fundamental <strong>resourcing problem</strong>. The{" "}
              <strong>Vote United</strong> approach demands full, systemic
              funding:
            </p>
            <ol className="list-decimal list-inside space-y-3 text-sm fontroboto text-muted-foreground">
              <li>
                <strong>Massive Judge and Staff Recruitment:</strong> Hire
                thousands of new immigration judges, along with the support
                staff and courtrooms necessary to handle the current case volume
                efficiently.
              </li>
              <li>
                <strong>Increased Asylum Officers:</strong> Empower and increase
                the number of asylum officers, who can resolve many legitimate
                claims administratively outside of the formal court system,
                saving valuable court time.
              </li>
              <li>
                <strong>Invest in Technology:</strong> Implement modern IT
                infrastructure, digital filing, and remote hearing capabilities
                to streamline the process, eliminating the logistical
                bottlenecks that plague old systems.
              </li>
            </ol>
          </div>

          {/* The Results */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-foreground fontmont mb-4">
              The Results: Restoring Rule of Law and Fairness
            </h3>
            <div className="p-6 bg-white dark:bg-slate-900 rounded-none border border-border">
              <p className="text-sm fontroboto text-muted-foreground leading-relaxed mb-3">
                A properly funded and efficient court system achieves the core
                goals of all parties:
              </p>
              <ul className="space-y-3 text-sm fontroboto text-muted-foreground">
                <li>
                  <strong>Timely Enforcement:</strong> For cases where removal
                  is ordered, the decision can be executed quickly, restoring
                  the integrity of the border and the rule of law.
                </li>
                <li>
                  <strong>Prompt Protection:</strong> Legitimate asylum seekers
                  receive the protection they need in months, not years,
                  fulfilling our humanitarian commitment and allowing them to
                  immediately contribute to their communities.
                </li>
                <li>
                  <strong>Fiscal Sanity:</strong> The cost of years-long
                  monitoring and managing a giant backlog is far greater than
                  the cost of hiring the personnel required to resolve the cases
                  quickly and decisively.
                </li>
              </ul>
              <p className="text-sm fontroboto text-muted-foreground leading-relaxed mt-4">
                Investing in judicial capacity is the most common-sense,
                truth-based approach to fixing the foundation of our broken
                immigration process.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="p-6 bg-gradient-to-br from-green-50 to-white dark:from-green-950/30 dark:to-slate-900 rounded-none border-2 border-green-600">
            <h3 className="text-lg font-bold text-foreground fontmont mb-3 flex items-center gap-2">
              📞 Call Your Representatives
            </h3>
            <div className="border-l-4 border-green-600 pl-4 py-2">
              <h4 className="text-base font-semibold text-foreground fontmont mb-2">
                Voice Your Opinion!
              </h4>
              <p className="text-sm fontroboto text-muted-foreground leading-relaxed mb-3">
                <strong>VoteUnited.com</strong> is about the{" "}
                <strong>people's voice</strong> and{" "}
                <strong>common-sense action.</strong> We don't believe these
                solutions are Democrat or Republican; they are simply{" "}
                <em>American</em>.
              </p>
              <p className="text-sm fontroboto text-muted-foreground leading-relaxed">
                <strong>What do YOU think?</strong> Do these solutions align
                with your common sense? Share your thoughts, your concerns, and
                your experiences. Let your voice drive the conversation.
              </p>
            </div>
          </div>
        </div>

        {/* Rural Broadband Access Section */}
        <div className="mt-16">
          <div className="text-start mb-8">
            <h2 className="text-2xl md:text-4xl font-mont font-bold text-primary dark:text-white mb-3">
              Rural Broadband Access
            </h2>
            <h3 className="text-xl md:text-2xl fontmont font-semibold text-foreground mb-4">
              Broadband is the New Electrification: Why High-Speed Internet is a
              Non-Negotiable American Necessity
            </h3>
          </div>

          {/* Introduction */}
          <div className="mb-8 p-6 bg-linear-to-br from-orange-50 to-white dark:from-orange-950/30 dark:to-slate-900 rounded-none border-l-4 border-orange-600">
            <p className="text-sm fontroboto text-muted-foreground leading-relaxed">
              Just over a century ago, America mobilized to bring electricity to
              every farm and homestead, transforming the nation's economy.
              Today, we face a similar fundamental infrastructure challenge: the{" "}
              <strong>digital divide</strong>. Millions of citizens,
              particularly those in rural communities, lack the high-speed
              internet necessary to participate in modern telemedicine,
              education, and e-commerce. This isn't just about convenience; it's
              an <strong>economic and equity barrier</strong> that holds back
              entire regions. Our solution is pragmatic and unites all parties:
              treat broadband like the essential utility it is and{" "}
              <strong>strategically fund the "last mile" connections</strong>{" "}
              necessary to ensure universal access and unlock America's full
              economic potential.
            </p>
          </div>

          {/* The Problem */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-foreground fontmont mb-4">
              The Problem: The Digital Divide is an Economic Handicap
            </h3>
            <div className="p-6 bg-white dark:bg-slate-900 rounded-none border border-border">
              <p className="text-sm fontroboto text-muted-foreground leading-relaxed mb-4">
                In the 21st century, access to reliable, high-speed internet is
                no longer a luxury; it is the{" "}
                <strong>lifeline of commerce, education, and healthcare</strong>
                . Where broadband is slow or nonexistent, communities suffer a
                cascade of consequences:
              </p>
              <ul className="space-y-3 text-sm fontroboto text-muted-foreground">
                <li>
                  <strong>Healthcare:</strong> Telemedicine, a critical service
                  for elderly and remote populations, becomes impossible,
                  forcing costly and time-consuming travel for basic care.
                </li>
                <li>
                  <strong>Education:</strong> Students cannot complete homework
                  or access online learning resources, deepening the educational
                  gap between rural and urban districts.
                </li>
                <li>
                  <strong>Economy:</strong> Small businesses cannot use
                  e-commerce, and farmers are blocked from implementing
                  data-driven <strong>precision agriculture</strong>, severely
                  limiting local economic growth and productivity.
                </li>
              </ul>
              <p className="text-sm fontroboto text-muted-foreground leading-relaxed mt-4">
                The digital divide is not a problem created by government; it is
                a problem that requires coordinated government action because
                the private market will not—and cannot—profitably string fiber
                optics across vast, sparsely populated areas.
              </p>
            </div>
          </div>

          {/* Bipartisan Call */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-foreground fontmont mb-4">
              The Bipartisan Call for Modern Infrastructure
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-white dark:bg-slate-900 rounded-none border border-border">
                <h4 className="text-lg font-semibold text-primary fontmont mb-3">
                  For Rural Conservatives
                </h4>
                <p className="text-sm fontroboto text-muted-foreground leading-relaxed">
                  This is a vital economic investment that supports{" "}
                  <strong>Main Street businesses</strong>, strengthens the{" "}
                  <strong>agricultural sector</strong>, and enables rural areas
                  to attract modern industries and remote workers. It's about
                  ensuring all communities can compete.
                </p>
              </div>
              <div className="p-6 bg-white dark:bg-slate-900 rounded-none border border-border">
                <h4 className="text-lg font-semibold text-primary fontmont mb-3">
                  For Progressives and Equity Advocates
                </h4>
                <p className="text-sm fontroboto text-muted-foreground leading-relaxed">
                  This is an essential step toward{" "}
                  <strong>social equity</strong> and{" "}
                  <strong>universal access</strong> to critical services.
                  Broadband closes the educational and healthcare gaps that
                  leave underserved populations behind.
                </p>
              </div>
            </div>
          </div>

          {/* The Solution */}
          <div className="mb-6 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/30 dark:to-slate-900 rounded-none border-l-4 border-blue-600 p-6">
            <h3 className="text-xl font-bold text-foreground fontmont mb-4">
              The Vote United Solution: Strategic Investment in the Last Mile
            </h3>
            <p className="text-sm fontroboto text-muted-foreground leading-relaxed mb-4">
              Our approach is to treat broadband deployment as an investment in
              national competitiveness, requiring targeted, fiscally responsible
              spending:
            </p>
            <ol className="list-decimal list-inside space-y-3 text-sm fontroboto text-muted-foreground">
              <li>
                <strong>Fund "Last Mile" Connections:</strong> Target federal
                and state funding—through grants and loans—specifically at the
                final, most expensive leg of the network: running fiber directly
                to homes, businesses, and farms in low-density areas.
              </li>
              <li>
                <strong>Prioritize Fiber-Optic Technology:</strong> Demand that
                public funds prioritize future-proof, high-speed technologies
                like fiber-optic cables, rather than settling for outdated,
                slower solutions.
              </li>
              <li>
                <strong>Ensure Affordability and Competition:</strong> Require
                that recipients of public funds adhere to reasonable pricing
                structures and allow for multiple service providers to use the
                publicly-funded infrastructure (open-access), ensuring
                competition keeps costs low for the consumer.
              </li>
            </ol>
            <p className="text-sm fontroboto text-muted-foreground leading-relaxed mt-4">
              This is an investment in{" "}
              <strong>American unity and long-term productivity</strong>.
              Connecting every citizen is the clearest, most common-sense path
              to securing future prosperity for all regions of the country.
            </p>
          </div>

          {/* Call to Action */}
          <div className="p-6 bg-gradient-to-br from-green-50 to-white dark:from-green-950/30 dark:to-slate-900 rounded-none border-2 border-green-600">
            <h3 className="text-lg font-bold text-foreground fontmont mb-3 flex items-center gap-2">
              📞 Call Your Representative
            </h3>
            <div className="border-l-4 border-green-600 pl-4 py-2">
              <h4 className="text-base font-semibold text-foreground fontmont mb-2">
                Voice Your Opinion!
              </h4>
              <p className="text-sm fontroboto text-muted-foreground leading-relaxed mb-3">
                <strong>VoteUnited.com</strong> is about the{" "}
                <strong>people's voice</strong> and{" "}
                <strong>common-sense action.</strong> We don't believe these
                solutions are Democrat or Republican; they are simply{" "}
                <em>American</em>.
              </p>
              <p className="text-sm fontroboto text-muted-foreground leading-relaxed">
                <strong>What do YOU think?</strong> Do these solutions align
                with your common sense? Share your thoughts, your concerns, and
                your experiences. Let your voice drive the conversation.
              </p>
            </div>
          </div>
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
