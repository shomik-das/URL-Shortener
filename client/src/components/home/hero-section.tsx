import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export default function HeroSection() {
  return (
    <>
      <section className="relative min-h-screen overflow-hidden bg-black">
        {/* Content */}
        <div className="relative z-20 mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-6 pb-10 lg:justify-center lg:pb-0 lg:px-12">
          <div className="max-w-3xl text-left text-white">
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl xl:text-6xl">
              AI Employees:
              <br />
              Your Helpers
              <br />
              That Never Sleep
            </h1>

            <p className="mt-4 max-w-xl text-sm text-white/80 md:text-lg">
              Build, grow, and scale your business with a team of AI employees.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Button asChild size="lg" className=" font-semibold ">
                <Link href="#link">
                  Get Sintra <ChevronRight className="ml-1" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
              >
                <Link href="#link">Request a demo</Link>
              </Button>
            </div>
          </div>
        </div>

        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 z-0 h-full w-full object-cover opacity-60 dark:opacity-45 -scale-x-100"
          src="https://ik.imagekit.io/lrigu76hy/tailark/dna-video.mp4?updatedAt=1745736251477"
          // src ="https://d1oil5daeuar1j.cloudfront.net/vizzy_waving.webm"
        />
        {/* Mobile bottom Shadow */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[65%] bg-linear-to-t from-background via-black/95 to-transparent lg:hidden" />

        {/* Desktop Shadow */}
        <div className="pointer-events-none absolute inset-0 z-10 hidden lg:block linear-gradient(#000 2%, #0000 21%), linear-gradient(#0000 64%, #000 98%), linear-gradient(225deg, #0000 33%, #000c 65%, #000 82%);" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 hidden lg:block h-72 bg-linear-to-t from-background via-background/80 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden lg:block w-72 bg-linear-to-r from-background via-background/70 to-transparent" />

      </section>
    </>
  );
}
