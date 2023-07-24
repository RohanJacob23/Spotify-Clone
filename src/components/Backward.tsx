"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function Backward() {
  const router = useRouter();
  return (
    <div
      className="flex justify-center items-center w-8 h-8 bg-black rounded-full"
      onClick={() => router.back()}
    >
      <ChevronLeft className="w-6 h-6" />
    </div>
  );
}
