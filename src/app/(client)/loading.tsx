import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function loading() {
  return (
    <section className="text-white rounded-lg bg-background-variant-color h-full w-full px-3 py-4">
      {Array.from({ length: 2 }, (_, index) => (
        <section key={index} className="flex flex-col mt-3">
          <Skeleton className="w-52 h-4 rounded-lg" />

          <div className="hidden md:flex gap-2 mt-3">
            {Array.from({ length: 4 }, (_, index) => (
              <div
                key={index}
                className="flex flex-col relative w-36 md:w-48 h-52"
              >
                <Skeleton className="absolute rounded-lg bg-background-color w-full h-full" />
                <div className="flex flex-col justify-between space-y-4 p-3">
                  <Skeleton className="w-full h-28 rounded-lg" />
                  <div className="space-y-2.5">
                    <Skeleton className="w-full h-3 md:h-4 rounded-lg" />
                    <Skeleton className="w-11/12 h-3 md:h-4 rounded-lg" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex md:hidden gap-3 mt-3">
            {Array.from({ length: 2 }, (_, index) => (
              <div
                key={index}
                className="flex flex-col relative w-36 md:w-48 h-52"
              >
                <Skeleton className="absolute rounded-lg bg-background-color w-full h-full" />
                <div className="flex flex-col justify-between space-y-4 p-3">
                  <Skeleton className="w-full h-28 rounded-lg" />
                  <div className="space-y-2.5">
                    <Skeleton className="w-full h-3 md:h-4 rounded-lg" />
                    <Skeleton className="w-11/12 h-3 md:h-4 rounded-lg" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </section>
  );
}
