"use client";

import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function Forward() {
  const router = useRouter();
  return (
    <div
      className="flex justify-center items-center w-8 h-8 bg-black rounded-full"
      onClick={() => router.forward()}
    >
      <ChevronRight className="w-6 h-6" />
    </div>
  );
}
