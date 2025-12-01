"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Target, TrendingUp, Cog } from "lucide-react";

const Manifesto = () => {
  const pillars = [
    {
      icon: Target,
      title: "Fiscal Responsibility & Accountability",
      description:
        "We advocate for policies that end wasteful spending, reduce unnecessary bureaucracy, and ensure every taxpayer dollar is used effectively. We demand transparency—from healthcare prices to government budgets—to hold powerful institutions accountable to the people they serve.",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      icon: Cog,
      title: "Efficient and Humane Systems",
      description:
        "We believe systems must work efficiently. Whether it's processing an immigration claim, delivering emergency aid, or updating our national infrastructure, we promote reforms that replace paralyzing backlogs and outdated technology with modern, streamlined efficiency. A government that works well serves everyone better.",
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
    },
    {
      icon: TrendingUp,
      title: "Investing in the Future",
      description:
        "Our focus is on the solutions that prepare America for the next generation. This means investing strategically in the infrastructure that powers our economy—from high-speed broadband in rural communities to modernized energy grids—ensuring our nation remains globally competitive and locally strong.",
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-900/30",
    },
  ];

  return (
    <div className="fontroboto bg-background">
      <main className="mx-auto max-w-6xl px-4  sm:px-6 lg:px-8 space-y-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-mont font-bold text-primary dark:text-white mb-4">
              The Pillars of Common Sense Governance
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our approach to every issue is guided by three core pillars that
              demand a unified national focus:
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <Card
                  key={index}
                  className="p-6 rounded-none hover:shadow-lg shadow-none transition-all duration-300 group border hover:border-primary/30"
                >
                  <div
                    className={`${pillar.bgColor} ${pillar.color} w-14 h-14 rounded-none flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon size={28} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-mont font-bold text-foreground mb-3">
                    {index + 1}. {pillar.title}
                  </h3>
                  <p className="text-sm text-muted-foreground fontroboto leading-relaxed">
                    {pillar.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* People's Voice Section */}
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-linear-to-br from-green-50 to-white dark:from-green-950/30 dark:to-slate-900 rounded-none border-l-4 border-green-600">
            <h2 className="text-2xl md:text-3xl font-mont font-bold text-foreground mb-4">
              The People&apos;s Voice
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                <strong>Vote United</strong> is a platform for the{" "}
                <strong>people&apos;s voice</strong>. We don&apos;t preach party
                dogma; we present factual analysis and common-sense policy
                proposals. We invite you to read, engage, and lend your voice to
                the policies that will finally put the interests of the American
                public—and the future of our nation—ahead of partisan politics.
              </p>
            </div>
          </div>
        </div>
        <div className="text-center fontroboto italic text-neutral-500 mb-4">
          ...Together, we can build a more informed, engaged, and united
          society.
        </div>
      </main>
    </div>
  );
};

export default Manifesto;
