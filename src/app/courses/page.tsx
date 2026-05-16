"use client";

import React, { useState, useEffect } from "react";
import MarketingNavbar from "@/components/MarketingNavbar";
import Footer from "@/components/Footer";
import CourseCard from "@/components/CourseCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, BookOpen, Loader2 } from "lucide-react";
import { API_URLS } from "@/services/urls";

export default function CoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_URLS.PLATFORM.COURSES.LIST);
      if (response.ok) {
        const data = await response.json();
        setCourses(data);
      }
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (course.category && course.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <MarketingNavbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <div className="max-w-xl">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4 uppercase tracking-wider">
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
          {filteredCourses.map((course) => (
            <CourseCard 
              key={course.id} 
              id={course.id}
              title={course.title}
              teacherName="Expert Tutor"
              category={course.category || "Development"}
              price={course.price}
              isFree={course.is_free}
            />
          ))}

          {/* Static Design Preservation */}
          {filteredCourses.length === 0 && !isLoading && (
            <div className="col-span-full text-center py-20 text-slate-400 font-bold">
               No courses match your search. Explore our featured content below.
            </div>
          )}

          {isLoading && (
            <div className="col-span-full flex justify-center py-12">
               <Loader2 className="animate-spin text-blue-600 w-10 h-10" />
            </div>
          )}
        </div>

        {/* Featured Section if Empty or at Bottom */}
        <div className="mt-24 text-center border-t border-slate-200 dark:border-slate-800 pt-16">
          <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Want to see more?
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8">
            Join our platform to unlock premium courses and tutorials.
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700 h-11 px-8 rounded-xl font-bold shadow-lg">
            Join Edtech Now
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
