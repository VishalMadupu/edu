"use client";

import MarketingNavbar from "@/components/MarketingNavbar";
import Footer from "@/components/Footer";
import CourseCard from "@/components/CourseCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const COURSES = [
  {
    id: 1,
    title: "Advanced React Patterns & Web Performance",
    teacherName: "Sarah Drasner",
    category: "Development",
    duration: "18h 45m",
    rating: 4.9,
    studentCount: 15420,
    price: 89.99,
  },
  {
    id: 2,
    title: "Full Stack AI-Enhanced Platform Architecture",
    teacherName: "Guillermo Rauch",
    category: "Software Architecture",
    duration: "10h 20m",
    rating: 5.0,
    studentCount: 8230,
    price: 129.99,
  },
  {
    id: 3,
    title: "UI/UX Design Systems with Figma & Tailwind",
    teacherName: "Adam Wathan",
    category: "Design",
    duration: "14h 15m",
    rating: 4.8,
    studentCount: 24100,
    price: 59.99,
  },
  {
    id: 4,
    title: "Introduction to Machine Learning with Python",
    teacherName: "Andrew Ng",
    category: "Data Science",
    duration: "24h 00m",
    rating: 4.9,
    studentCount: 450000,
    isFree: true,
  },
  {
    id: 5,
    title: "Digital Marketing Masterclass 2026",
    teacherName: "Neil Patel",
    category: "Marketing",
    duration: "15h 30m",
    rating: 4.7,
    studentCount: 12400,
    price: 44.99,
  },
  {
    id: 6,
    title: "iOS App Development with Swift & SwiftUI",
    teacherName: "Angela Yu",
    category: "Mobile",
    duration: "32h 10m",
    rating: 4.9,
    studentCount: 65200,
    price: 79.99,
  },
];

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <MarketingNavbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <div className="max-w-xl">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
              Explore Our Courses
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Discover world-class educational content designed to help you
              master new skills and advance your career.
            </p>
          </div>

          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
            <Input
              placeholder="Search for courses, skills, or tutors..."
              className="pl-10 h-12 rounded-xl border-slate-200 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Categories / Filters */}
        <div className="flex flex-wrap gap-3 mb-10 overflow-x-auto pb-2 scrollbar-hide">
          <Button
            variant="default"
            className="rounded-full bg-blue-600 hover:bg-blue-700"
          >
            All Courses
          </Button>
          {[
            "Development",
            "Design",
            "Data Science",
            "Marketing",
            "Business",
            "Photography",
            "Music",
          ].map((cat) => (
            <Button
              key={cat}
              variant="outline"
              className="rounded-full border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {cat}
            </Button>
          ))}
          <Button
            variant="ghost"
            className="rounded-full flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            More Filters
          </Button>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COURSES.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>

        {/* Empty State / Pagination Placeholder */}
        <div className="mt-16 text-center border-t border-slate-200 dark:border-slate-800 pt-16">
          <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Want to see more?
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8">
            Join our platform to unlock 500+ premium courses and tutorials.
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700 h-11 px-8">
            Join Edtechtech
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
