"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PRACTICE_AREAS = [
  "All",
  "Corporate",
  "Criminal Defense",
  "Family Law",
  "Immigration",
  "Intellectual Property",
  "Litigation",
  "Real Estate",
  "Tax",
  "Employment",
  "Environmental",
  "Bankruptcy",
] as const;

const MOCK_LAWYERS = [
  {
    id: "1",
    displayName: "Alexandra Chen",
    title: "Senior Partner",
    firm: "Chen & Associates LLP",
    bio: "Former federal prosecutor with 18 years of experience in complex commercial litigation and white-collar criminal defense. Recognized by Super Lawyers 2023-2025.",
    practiceAreas: ["Litigation", "Criminal Defense"],
    jurisdiction: "New York, NY",
    barAdmissions: ["NY", "CT", "SDNY"],
    yearsOfExperience: "18",
  },
  {
    id: "2",
    displayName: "Marcus Williams",
    title: "Managing Attorney",
    firm: "Williams Legal Group",
    bio: "Dedicated immigration attorney helping families and businesses navigate the complex U.S. immigration system. Fluent in Spanish and Portuguese.",
    practiceAreas: ["Immigration"],
    jurisdiction: "Miami, FL",
    barAdmissions: ["FL", "DC"],
    yearsOfExperience: "12",
  },
  {
    id: "3",
    displayName: "Sarah Goldberg",
    title: "Partner",
    firm: "Goldberg, Patel & Moore",
    bio: "Intellectual property strategist specializing in patent prosecution, trade secrets, and technology licensing for Fortune 500 companies and startups alike.",
    practiceAreas: ["Intellectual Property", "Corporate"],
    jurisdiction: "San Francisco, CA",
    barAdmissions: ["CA", "USPTO"],
    yearsOfExperience: "15",
  },
  {
    id: "4",
    displayName: "David Okonkwo",
    title: "Of Counsel",
    firm: "Barrett & Sterling",
    bio: "Tax law specialist advising high-net-worth individuals and multinational corporations on cross-border transactions, estate planning, and IRS disputes.",
    practiceAreas: ["Tax", "Corporate"],
    jurisdiction: "Chicago, IL",
    barAdmissions: ["IL", "NY", "Tax Court"],
    yearsOfExperience: "22",
  },
  {
    id: "5",
    displayName: "Rachel Matsuda",
    title: "Associate",
    firm: "Keating Morrison LLP",
    bio: "Rising employment law attorney focused on workplace discrimination, wage disputes, and executive severance negotiations. Former law clerk, 9th Circuit.",
    practiceAreas: ["Employment", "Litigation"],
    jurisdiction: "Los Angeles, CA",
    barAdmissions: ["CA"],
    yearsOfExperience: "5",
  },
  {
    id: "6",
    displayName: "James Harrington III",
    title: "Founding Partner",
    firm: "Harrington Real Estate Law",
    bio: "Premier real estate attorney handling commercial acquisitions, land use, zoning disputes, and development projects across the tri-state area.",
    practiceAreas: ["Real Estate"],
    jurisdiction: "Boston, MA",
    barAdmissions: ["MA", "NH", "RI"],
    yearsOfExperience: "20",
  },
  {
    id: "7",
    displayName: "Priya Sharma",
    title: "Partner",
    firm: "Sharma Family Law",
    bio: "Compassionate family law attorney specializing in high-asset divorces, custody disputes, and prenuptial agreements. Certified mediator.",
    practiceAreas: ["Family Law"],
    jurisdiction: "Houston, TX",
    barAdmissions: ["TX"],
    yearsOfExperience: "14",
  },
  {
    id: "8",
    displayName: "Robert Callahan",
    title: "Senior Associate",
    firm: "Greenfield Environmental",
    bio: "Environmental law advocate handling EPA compliance, Superfund litigation, and clean energy regulatory matters. Former EPA counsel.",
    practiceAreas: ["Environmental", "Litigation"],
    jurisdiction: "Washington, DC",
    barAdmissions: ["DC", "VA", "MD"],
    yearsOfExperience: "10",
  },
  {
    id: "9",
    displayName: "Elena Vasquez",
    title: "Solo Practitioner",
    firm: "Vasquez Law Office",
    bio: "Bankruptcy attorney guiding individuals and small businesses through Chapter 7 and Chapter 13 proceedings with empathy and precision.",
    practiceAreas: ["Bankruptcy"],
    jurisdiction: "Phoenix, AZ",
    barAdmissions: ["AZ"],
    yearsOfExperience: "8",
  },
];

const AREA_COLORS: Record<string, string> = {
  Corporate:
    "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800",
  "Criminal Defense":
    "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800",
  "Family Law":
    "bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-950/40 dark:text-pink-300 dark:border-pink-800",
  Immigration:
    "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800",
  "Intellectual Property":
    "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/40 dark:text-violet-300 dark:border-violet-800",
  Litigation:
    "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-950/40 dark:text-slate-300 dark:border-slate-700",
  "Real Estate":
    "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800",
  Tax: "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/40 dark:text-orange-300 dark:border-orange-800",
  Employment:
    "bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/40 dark:text-cyan-300 dark:border-cyan-800",
  Environmental:
    "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/40 dark:text-green-300 dark:border-green-800",
  Bankruptcy:
    "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-950/40 dark:text-gray-300 dark:border-gray-700",
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function DirectoryPage() {
  const [search, setSearch] = useState("");
  const [activeArea, setActiveArea] = useState<string>("All");

  const filtered = useMemo(() => {
    return MOCK_LAWYERS.filter((lawyer) => {
      const matchesSearch =
        search === "" ||
        lawyer.displayName.toLowerCase().includes(search.toLowerCase()) ||
        lawyer.firm.toLowerCase().includes(search.toLowerCase()) ||
        lawyer.jurisdiction.toLowerCase().includes(search.toLowerCase()) ||
        lawyer.practiceAreas.some((a) =>
          a.toLowerCase().includes(search.toLowerCase())
        );

      const matchesArea =
        activeArea === "All" || lawyer.practiceAreas.includes(activeArea);

      return matchesSearch && matchesArea;
    });
  }, [search, activeArea]);

  return (
    <div className="flex min-h-dvh flex-col">
      {/* Header */}
      <div className="border-b bg-background/80 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <svg
                className="size-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Chat
            </Link>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="relative overflow-hidden border-b">
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-indigo-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 top-12 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-purple-400/8 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4 pb-8 pt-12 sm:px-6 sm:pb-10 sm:pt-16">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-200/60 bg-white/80 px-3 py-1 text-xs font-medium text-indigo-700 backdrop-blur dark:border-indigo-400/30 dark:bg-indigo-400/10 dark:text-indigo-300">
              <svg
                className="size-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              LAWYER DIRECTORY
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Find the Right Lawyer
            </h1>
            <p className="mt-3 text-base text-muted-foreground sm:text-lg">
              Connect with verified attorneys across every practice area and
              jurisdiction.
            </p>

            {/* Search */}
            <div className="relative mt-8">
              <svg
                className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" x2="16.65" y1="21" y2="16.65" />
              </svg>
              <Input
                className="h-12 rounded-xl border-border/60 bg-background pl-12 pr-4 text-base shadow-sm transition-shadow focus:shadow-md"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, firm, practice area, or location..."
                type="text"
                value={search}
              />
            </div>
          </div>

          {/* Filter Chips */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {PRACTICE_AREAS.map((area) => (
              <button
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                  activeArea === area
                    ? "bg-foreground text-background shadow-sm"
                    : "border border-border bg-background text-muted-foreground hover:border-foreground/20 hover:text-foreground"
                }`}
                key={area}
                onClick={() => setActiveArea(area)}
                type="button"
              >
                {area}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">
                {filtered.length}
              </span>{" "}
              {filtered.length === 1 ? "attorney" : "attorneys"} found
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-4 rounded-full bg-muted p-4">
                <svg
                  className="size-8 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-foreground">
                No attorneys found
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Try adjusting your search or filters.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((lawyer) => (
                <div
                  className="group relative overflow-hidden rounded-2xl border border-border/60 bg-background p-5 shadow-sm transition-all duration-300 hover:border-border hover:shadow-md"
                  key={lawyer.id}
                >
                  {/* Card Top */}
                  <div className="flex items-start gap-3.5">
                    <div className="relative flex size-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 text-sm font-semibold text-indigo-700 dark:from-indigo-900/50 dark:to-purple-900/50 dark:text-indigo-300">
                      {getInitials(lawyer.displayName)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-[0.95rem] font-semibold text-foreground">
                        {lawyer.displayName}
                      </h3>
                      <p className="truncate text-xs text-muted-foreground">
                        {lawyer.title}
                        {lawyer.firm && (
                          <>
                            {" "}
                            <span className="text-border">|</span>{" "}
                            {lawyer.firm}
                          </>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="mt-3 line-clamp-3 text-[0.8rem] leading-relaxed text-muted-foreground">
                    {lawyer.bio}
                  </p>

                  {/* Practice Areas */}
                  <div className="mt-3.5 flex flex-wrap gap-1.5">
                    {lawyer.practiceAreas.map((area) => (
                      <span
                        className={`rounded-md border px-2 py-0.5 text-[0.65rem] font-medium ${AREA_COLORS[area] || "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700"}`}
                        key={area}
                      >
                        {area}
                      </span>
                    ))}
                  </div>

                  {/* Meta */}
                  <div className="mt-4 flex items-center gap-3 border-t border-border/40 pt-3.5 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <svg
                        className="size-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                        />
                      </svg>
                      {lawyer.jurisdiction}
                    </span>
                    <span className="text-border">|</span>
                    <span>{lawyer.yearsOfExperience}+ years</span>
                    <span className="text-border">|</span>
                    <span>
                      {lawyer.barAdmissions.join(", ")}
                    </span>
                  </div>

                  {/* Action */}
                  <Button
                    className="mt-4 h-9 w-full rounded-lg text-xs font-medium"
                    variant="outline"
                  >
                    View Profile
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
