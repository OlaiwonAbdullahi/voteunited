import { Marquee } from "@/components/ui/marquee";
import Image from "next/image";

const logos = [
  { src: "/flag.png", name: "Vercel" },
  { src: "/flag.png", name: "Next.js" },
  { src: "/flag.png", name: "Global News" },
  { src: "/flag.png", name: "OpenGov" },
  { src: "/flag.png", name: "Civic Docs" },
];

const Partners = () => {
  return (
    <section className=" bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="text-start">
            <h2 className="text-2xl md:text-3xl font-mont font-bold text-primary dark:text-white">
              Our Partners
            </h2>
            <p className="text-sm md:text-base text-muted-foreground fontroboto">
              Organizations working with us to empower voters
            </p>
          </div>
        </div>
        <Marquee pauseOnHover className="[--duration:20s]">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {logos.map((logo) => (
              <div
                key={logo.name}
                className="group flex items-center justify-center rounded-md  p-6 transition-colors "
              >
                <Image
                  src={logo.src}
                  alt={`${logo.name} logo`}
                  width={120}
                  height={40}
                  className="h-10 w-auto opacity-70 transition-opacity group-hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </Marquee>
      </div>
    </section>
  );
};

export default Partners;
