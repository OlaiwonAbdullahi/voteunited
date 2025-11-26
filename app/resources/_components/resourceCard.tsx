"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface ResourceCardProps {
  title: string;
  description: string;
  url: string;
  category: string;
  icon: React.ReactNode;
  color: string;
}

const ResourceCard = ({
  title,
  description,
  url,
  category,
  icon,
  color,
}: ResourceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="rounded-none p-6 fontroboto overflow-hidden hover:shadow-xl transition-all duration-300 border-border group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Background Gradient */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 ${color}`}
      />

      {/* Icon */}
      <div
        className={`inline-flex p-3 w-fit rounded-none ${color} mb-4 relative z-10 transition-transform duration-300 ${
          isHovered ? "scale-110" : ""
        }`}
      >
        {icon}
      </div>

      {/* Category Badge */}
      <Badge className={`${color} text-xs mb-3 rounded-full`}>{category}</Badge>

      {/* Title */}
      <h3 className="text-xl font-bold fontmont text-foreground mb-3 group-hover:text-primary transition-colors duration-200">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        {description}
      </p>

      {/* Link */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold text-sm transition-all duration-200 group/link"
      >
        Visit Resource
        <ExternalLink
          size={16}
          className="transition-transform duration-200 group-hover/link:translate-x-1"
        />
      </a>

      {/* Verified Badge */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
          <CheckCircle2 size={14} />
          <span className="font-medium">Verified</span>
        </div>
      </div>
    </Card>
  );
};

export default ResourceCard;
