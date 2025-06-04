"use client";
import { useState, useEffect } from "react";

export default function Loading() {
  const [show, setShow] = useState(true);

  // Hide loading after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {setShow(false);}, 1000);

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  if (!show) return null; // Hide loading when timer ends

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-green-600/80 transition-opacity duration-500">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-zinc-600 border-t-transparent mb-4"></div>
      <p className="text-lg text-zinc-600 font-medium">Loading ...</p>
    </div>
  );
}
