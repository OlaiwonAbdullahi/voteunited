"use client";
import Countdown from "react-countdown";
import { Card, CardContent } from "@/components/ui/card";

export default function Timer() {
  const targetDate = new Date("2025-12-31T23:59:59");

  return (
    <div className="max-w-7xl mx-auto px-4 pt-16 sm:px-6 lg:px-8">
      <Card className="border-border p-0 py-4 rounded-none">
        <CardContent className="px-4 pb-2">
          <h3 className="text-3xl md:text-4xl fontmont font-semibold  mb-4 text-center text-primary">
            Voting closes in
          </h3>

          <Countdown
            date={targetDate}
            renderer={({ days, hours, minutes, seconds, completed }) => {
              if (completed) {
                return <span className="text-red-500">Voting closed</span>;
              } else {
                return (
                  <div className="grid grid-cols-4 gap-2">
                    <div className="rounded-none border border-border bg-card p-3 text-center">
                      <div className="text-2xl font-bold text-primary">
                        {days}
                      </div>
                      <div className="text-[11px] uppercase text-muted-foreground">
                        Days
                      </div>
                    </div>
                    <div className="rounded-none border border-border bg-card p-3 text-center">
                      <div className="text-2xl font-bold text-primary">
                        {hours}
                      </div>
                      <div className="text-[11px] uppercase text-muted-foreground">
                        Hours
                      </div>
                    </div>
                    <div className="rounded-none border border-border bg-card p-3 text-center">
                      <div className="text-2xl font-bold text-primary">
                        {minutes}
                      </div>
                      <div className="text-[11px] uppercase text-muted-foreground">
                        Minutes
                      </div>
                    </div>
                    <div className="rounded-none border border-border bg-card p-3 text-center">
                      <div className="text-2xl font-bold text-primary">
                        {seconds}
                      </div>
                      <div className="text-[11px] uppercase text-muted-foreground">
                        Seconds
                      </div>
                    </div>
                  </div>
                );
              }
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
