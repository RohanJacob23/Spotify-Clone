import Backward from "@/components/Backward";
import Forward from "@/components/Forward";
import SearchResults from "@/components/SearchResults";
import { Home, Search } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <section className="h-full w-full overflow-y-scroll bg-background-variant-color rounded-lg px-1.5 md:px-3 py-4">
      <div className="md:hidden flex items-center justify-between mb-3">
        {/* home and search navigation */}
        <div className="flex items-center space-x-2">
          <Link
            href="/"
            className="flex justify-center items-center w-9 h-9 bg-black rounded-full"
          >
            <Home className="w-5 h-5" />
          </Link>
          <Link
            href="/search"
            className="flex justify-center items-center w-9 h-9 bg-black rounded-full"
          >
            <Search className="w-5 h-5" />
          </Link>
        </div>

        {/* forward and backward navigation */}
        <div className="flex items-center space-x-2">
          <Backward />
          <Forward />
        </div>
      </div>
      <SearchResults />
    </section>
  );
}
