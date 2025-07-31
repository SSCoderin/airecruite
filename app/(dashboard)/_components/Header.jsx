// components/Header.jsx
"use client";

import Link from "next/link";

const headerLinks = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    name: "Schedule Interview",
    path: "/scheduleinterview",
  },
  {
    name: "All Interviews",
    path: "/allinterview",
  },
];

export default function Header() {
  return (
    <header className="bg-white py-4 border-b border-gray-400">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="text-3xl font-bold text-indigo-700">AIrecruit</div>

        <nav>
          <ul className="flex space-x-6 sm:space-x-8">
            {headerLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.path}
                  className={`text-gray-700 text-lg hover:underline hover:text-indigo-800   transition-colors duration-200 font-bold ${
                    link.path === window.location.pathname
                      ? "text-indigo-800"
                      : ""
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
