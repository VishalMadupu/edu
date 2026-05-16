"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { DollarSign, Users, Video, Star, Plus, BarChart3, BookOpen, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import CourseCard from "@/components/CourseCard";
import CreateCourseModal from "@/components/CreateCourseModal";

export default function TutorDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <DashboardLayout role="tutor">
      <div className="space-y-10 pb-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Teacher Portal</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your courses, track student progress, and view analytics.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="h-11 px-6">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </Button>
            <Button 
              onClick={() => setIsModalOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-700 h-11 px-6 shadow-lg shadow-indigo-600/20"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create New Course
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="Total Revenue" 
            value="$4,280.50" 
            icon={<DollarSign className="h-5 w-5 text-green-500" />} 
          />
          <StatCard 
            title="Total Students" 
            value="856" 
            icon={<Users className="h-5 w-5 text-blue-500" />} 
          />
          <StatCard 
            title="Active Courses" 
            value="5" 
            icon={<BookOpen className="h-5 w-5 text-purple-500" />} 
          />
          <StatCard 
            title="Avg. Course Rating" 
            value="4.9" 
            icon={<Star className="h-5 w-5 text-yellow-500" />} 
          />
        </div>

        {/* Active Courses */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Video className="w-6 h-6 text-indigo-600" />
              My Published Courses
            </h2>
            <Button variant="ghost" className="text-indigo-600">Manage All</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CourseCard 
              id={101}
              title="Next.js 16 Masterclass: From Zero to Production"
              teacherName="Me (Vishal)"
              category="Development"
              duration="22h 30m"
              rating={4.9}
              studentCount={420}
              price={99.99}
            />
            <CourseCard 
              id={102}
              title="Advanced TypeScript for Enterprise Scale"
              teacherName="Me (Vishal)"
              category="Development"
              duration="12h 15m"
              rating={4.8}
              studentCount={215}
              price={79.99}
            />
            <div 
              onClick={() => setIsModalOpen(true)}
              className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:border-indigo-400 transition-colors group cursor-pointer"
            >
               <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/30 transition-colors">
                  <Plus className="w-6 h-6 text-slate-400 group-hover:text-indigo-600" />
               </div>
               <h3 className="font-bold text-slate-900 dark:text-white mb-2">Create a New Course</h3>
               <p className="text-sm text-slate-500 dark:text-slate-400">Share your knowledge and start earning.</p>
            </div>
          </div>
        </section>

        {/* Recent Student Enrollment */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
          <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              Recent Enrollments
            </h2>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <div className="divide-y divide-slate-50 dark:divide-slate-800">
            {[
              { name: "Alex Rivera", course: "Next.js 16 Masterclass", date: "15 mins ago", amount: "$99.99" },
              { name: "Sarah Chen", course: "Advanced TypeScript", date: "2 hours ago", amount: "$79.99" },
              { name: "Michael Scott", course: "Next.js 16 Masterclass", date: "5 hours ago", amount: "$99.99" },
              { name: "Emma Watson", course: "Advanced TypeScript", date: "Yesterday", amount: "$79.99" },
            ].map((enrollment, i) => (
              <div key={i} className="p-6 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-lg">
                    {enrollment.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">{enrollment.name}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Enrolled in: {enrollment.course}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-slate-900 dark:text-white">{enrollment.amount}</div>
                  <div className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {enrollment.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CreateCourseModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={() => {
          // Trigger refresh logic here if needed
          console.log("Course created!");
        }}
      />
    </DashboardLayout>
  );
}

function StatCard({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col gap-2 hover:border-indigo-500/50 transition-colors">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</span>
        <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">{icon}</div>
      </div>
      <div className="text-3xl font-bold text-slate-900 dark:text-white">{value}</div>
    </div>
  );
}
