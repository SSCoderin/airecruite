"use client";
import { useUser } from "@clerk/nextjs";

export default function Welcomeblock() {
  const { user } = useUser();

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm max-w-6xl mx-auto mt-4 border border-gray-200 ">
      <h1 className="text-lg md:text-xl font-medium text-gray-900">
        Welcome back, <span className="text-indigo-600">{user?.fullName || "Guest"}</span>
      </h1>
      <p className="text-sm text-gray-500 mt-1">
        AI-Driven Interviews. Hassle-Free Hiring.
      </p>
    </div>
  );
}
