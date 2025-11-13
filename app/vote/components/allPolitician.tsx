import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThumbsDown, ThumbsUp } from "lucide-react";

const AllPolitician = () => {
  const politicians = [
    {
      id: 1,
      name: "John Doe",
      position: "House of Representatives",
      image: "/flag.png",
      votes: "2,000",
      trending: true,
      rank: 1,
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "Senate",
      image: "/flag.png",
      votes: "1,850",
      trending: false,
      rank: 2,
    },
    {
      id: 3,
      name: "Robert Johnson",
      position: "Governor",
      image: "/flag.png",
      votes: "1,720",
      trending: true,
      rank: 3,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <div className="text-start mb-6">
          <h2 className="text-2xl md:text-4xl font-mont font-bold text-primary dark:text-white mb-3">
            All Politicians
          </h2>
          <p className="text-sm md:text-base text-muted-foreground fontroboto max-w-2xl">
            Check out all politicians for this week.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {politicians.map((politician) => (
          <Card
            key={politician.id}
            className="relative overflow-hidden rounded-none h-[280px] border-border hover:shadow-lg transition-shadow duration-300 hover:border-primary/30"
          >
            <CardContent className="p-0 h-full">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${politician.image})` }}
              />
              <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />

              <div className="relative h-full flex flex-col justify-between px-4 py-3">
                <div className="flex items-center justify-between">
                  <Badge className="rounded-full px-3 py-1 text-xs bg-secondary text-white">
                    #{politician.rank}
                  </Badge>
                  <div className="text-white/90 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full text-xs">
                    {politician.votes} votes
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-end text-white">
                  <div>
                    <h3 className="text-lg font-bold text-white fontmont">
                      {politician.name}
                    </h3>
                    <p className="text-sm text-white/90 fontroboto mb-3">
                      {politician.position}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pb-2">
                    <div className="flex items-end gap-2">
                      <span className="text-lg font-bold text-white fontmont">
                        {politician.votes}
                      </span>
                      <span className="text-xs text-white/80 fontroboto">
                        Votes
                      </span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <Button
                        className="text-primary hover:bg-primary/90 border border-primary bg-transparent rounded-none"
                        variant="outline"
                      >
                        <ThumbsUp className="w-6 h-6" />
                      </Button>
                      <Button
                        className="text-primary hover:bg-primary/90 border border-primary rounded-none bg-transparent"
                        variant="outline"
                      >
                        <ThumbsDown className="w-6 h-6" />
                      </Button>
                    </div>
                  </div>
                </div>

                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none w-full">
                  View Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllPolitician;
