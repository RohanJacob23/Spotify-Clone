"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";

export default function UserAvatar({ name }: { name: string }) {
  const pathname = usePathname().replace("/", "");
  return (
    <div
      className={`${
        pathname === "search" ? "hidden" : "flex"
      } items-center space-x-3`}
    >
      <h1 className="text-xl md:text-3xl font-semibold">Welcome {name}</h1>
      <Avatar className="h-8 w-8">
        {/* temp profile */}
        <AvatarImage src={""} />
        <AvatarFallback>{name[0]}</AvatarFallback>
      </Avatar>
    </div>
  );
}
