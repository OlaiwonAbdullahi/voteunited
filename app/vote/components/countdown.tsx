import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThumbsDown, ThumbsUp, TrendingUp } from "lucide-react";

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

const Featured = () => {
  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-start mb-6">
          <h2 className="text-2xl md:text-4xl font-mont font-bold text-primary dark:text-white mb-3">
            Featured Politicians
          </h2>
          <p className="text-sm md:text-base text-muted-foreground fontroboto max-w-2xl">
            Check out the featured politicians for this week. Stay informed
            about the most trending candidates.
          </p>
        </div>

        <div className="mb-20">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent className="-ml-2">
              {politicians.map((politician) => (
                <CarouselItem
                  key={politician.id}
                  className="md:basis-1/2 lg:basis-1/3 pl-2"
                >
                  <div className="p-1">
                    <Card className="h-[320px] p-0 border-border hover:shadow-lg transition-shadow duration-300 hover:border-primary/30">
                      <CardContent className="flex flex-col h-full p-0">
                        <div
                          className="relative h-full bg-gradient-to-br from-primary/10 to-secondary/10 bg-cover bg-center bg-no-repeat rounded-t-lg"
                          style={{
                            backgroundImage: `url(${politician.image})`,
                          }}
                        >
                          {politician.trending && (
                            <Badge className="absolute top-2 right-2 bg-red-500/90 text-white text-sm font-semibold rounded-full flex items-center gap-1.5">
                              <TrendingUp size={14} />
                              Trending
                            </Badge>
                          )}

                          <div className="flex-1 p-4 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="text-lg font-semibold text-foreground fontmont">
                                  {politician.name}
                                </h3>
                                <Badge
                                  variant="outline"
                                  className="text-primary border-primary"
                                >
                                  #{politician.rank}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground fontroboto mb-3">
                                {politician.position}
                              </p>
                            </div>
                            <div className="flex items-center justify-between pb-2">
                              <div>
                                <p className="text-xs text-muted-foreground fontroboto">
                                  Votes
                                </p>
                                <p className="text-lg font-bold text-primary fontmont">
                                  {politician.votes}
                                </p>
                              </div>
                              <div className=" flex gap-2 items-center">
                                <Button
                                  className=" text-primary hover:bg-primary/90 border border-primary/20 rounded-none"
                                  variant={"outline"}
                                >
                                  <ThumbsUp className="w-5 h-5 " />
                                </Button>
                                <Button
                                  className=" text-primary hover:bg-primary/90 border border-primary/20 rounded-none"
                                  variant={"outline"}
                                >
                                  <ThumbsDown className="w-5 h-5 " />
                                </Button>
                              </div>
                            </div>
                            <div className=" pt-2.5  border-t border-t-primary/30">
                              <Button className="bg-primary w-full text-primary-foreground hover:bg-primary/90 rounded-none">
                                View Profile
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="border-primary text-primary hover:bg-primary hover:text-primary-foreground" />
            <CarouselNext className="border-primary text-primary hover:bg-primary hover:text-primary-foreground" />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Featured;
