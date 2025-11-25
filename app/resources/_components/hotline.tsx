import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Globe, Lightbulb } from "lucide-react";

const Hotline = () => {
  const hotlines = [
    {
      title: "Election Protection (Voter Help)",
      phone: "866-OUR-VOTE",
      phoneNumber: "866-687-8683",
      language: "English",
      icon: Phone,
      color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    },
    {
      title: "Election Protection (Spanish)",
      phone: "888-VE-Y-VOTA",
      phoneNumber: "888-839-8682",
      language: "Spanish",
      icon: Phone,
      color:
        "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    },
    {
      title: "Election Protection Website",
      phone: "866ourvote.org",
      phoneNumber: null,
      language: "All Languages",
      icon: Globe,
      color: "bg-primary/10 text-primary",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto py-16 px-8">
      {/* Header */}
      <div className="text-start mb-6">
        <h2 className="text-2xl md:text-4xl font-mont font-bold text-primary dark:text-white mb-3">
          Emergency Hotlines
        </h2>
        <p className="text-sm md:text-base fontroboto text-muted-foreground max-w-2xl">
          Get immediate help with voting questions and issues. These hotlines
          provide free, confidential assistance.
        </p>
      </div>

      {/* Hotline Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotlines.map((hotline, index) => (
          <Card
            key={index}
            className="rounded-none p-6 fontroboto overflow-hidden hover:shadow-md transition-shadow border-border"
          >
            {/* Icon */}
            <div
              className={`inline-flex p-3 w-fit rounded-none ${hotline.color} mb-4`}
            >
              <hotline.icon size={24} />
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold fontmont text-foreground mb-3">
              {hotline.title}
            </h3>

            {/* Phone Number */}
            <div className="mb-4">
              <a
                href={
                  hotline.phoneNumber
                    ? `tel:${hotline.phoneNumber}`
                    : `https://${hotline.phone}`
                }
                className="block text-xl font-bold text-primary hover:underline transition-all"
              >
                {hotline.phone}
              </a>
              {hotline.phoneNumber && (
                <p className="text-sm text-muted-foreground mt-1">
                  ({hotline.phoneNumber})
                </p>
              )}
            </div>

            {/* Language Badge */}
            <Badge className={`${hotline.color} text-xs`}>
              {hotline.language}
            </Badge>
          </Card>
        ))}
      </div>

      {/* Additional Info */}
      <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-none border border-blue-200 dark:border-blue-800">
        <p className="text-sm text-blue-800 flex items-center dark:text-blue-200 fontroboto">
          <span className="font-bold flex flex-row items-center gap-2">
            <Lightbulb className="text-yellow-500" /> Tip:
          </span>{" "}
          These hotlines provide free, confidential assistance with voter
          registration, polling locations, and reporting voting problems.
          Available during election periods.
        </p>
      </div>
    </div>
  );
};

export default Hotline;
