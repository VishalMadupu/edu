"use client";

import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { BookOpen, Clock, Star, TrendingUp, PlayCircle, Award, CheckCircle2, Loader2 } from "lucide-react";
import CourseCard from "@/components/CourseCard";
import { Button } from "@/components/ui/button";
import { API_URLS } from "@/services/urls";

export default function StudentDashboard() {
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token") || localStorage.getItem("admin_token");
    if (token) {
      fetchData(token);
    }
  }, []);

  const fetchData = async (token: string) => {
    setIsLoading(true);
    try {
      const profileRes = await fetch(API_URLS.USER.PROFILE, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (profileRes.ok) {
        const profileData = await profileRes.json();
        setUserProfile(profileData);
        
        const enrollRes = await fetch(API_URLS.PLATFORM.ENROLLMENTS.STUDENT(profileData.id), {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (enrollRes.ok) {
          const enrollData = await enrollRes.json();
          // For now, let's fetch details for each enrolled course if the API returns only IDs
          // Or if it returns objects, we set them.
          setEnrolledCourses(enrollData);
        }
      }
    } catch (error) {
      console.error("Student Dashboard fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout role="student">
      <div className="space-y-10 pb-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white uppercase tracking-wider font-semibold">
              Happy Learning{userProfile?.first_name ? `, ${userProfile.first_name}` : ""}! 👋
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">You&apos;ve completed 85% of your goal this week. Keep it up!</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 h-11 px-6 shadow-lg shadow-blue-600/20">
            <PlayCircle className="w-4 h-4 mr-2" />
            Continue Last Lesson
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="Courses Enrolled" 
            value={enrolledCourses.length.toString()} 
            icon={<BookOpen className="h-5 w-5 text-blue-500" />} 
          />
          <StatCard 
            title="Hours Learned" 
            value="48.5" 
            icon={<Clock className="h-5 w-5 text-green-500" />} 
          />
          <StatCard 
            title="Certificates" 
            value="4" 
            icon={<Award className="h-5 w-5 text-yellow-500" />} 
          />
          <StatCard 
            title="Skills Mastered" 
            value="8" 
            icon={<TrendingUp className="h-5 w-5 text-purple-500" />} 
          />
        </div>

        {/* Continue Watching Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <PlayCircle className="w-6 h-6 text-blue-600" />
              My Learning
            </h2>
            <Button variant="ghost" className="text-blue-600" onClick={() => fetchData(localStorage.getItem("token") || "")}>
              Refresh
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Real Enrolled Courses */}
            {enrolledCourses.map((enrollment) => (
              <CourseCard 
                key={enrollment.id}
                id={enrollment.course_id}
                title={enrollment.course?.title || "Course Title"}
                teacherName={enrollment.course?.teacher?.username || "Expert Tutor"}
                category={enrollment.course?.category || "Education"}
                duration="Self-paced"
                rating={4.8}
                studentCount={100}
                isFree={enrollment.course?.is_free}
                href={`/student/courses/${enrollment.course_id}`}
              />
            ))}

            {/* Static Placeholder Cards (Kept as per request for design) */}
            <CourseCard 
              id={1}
              title="Advanced React Patterns & Web Performance"
              teacherName="Sarah Drasner"
              category="Web Development"
              duration="18h 45m"
              rating={4.9}
              studentCount={15420}
              price={89.99}
            />
            <CourseCard 
              id={2}
              title="Full Stack AI-Enhanced Platform Architecture"
              teacherName="Guillermo Rauch"
              category="Software Architecture"
              duration="10h 20m"
              rating={5.0}
              studentCount={8230}
              price={129.99}
            />

            {isLoading && enrolledCourses.length === 0 && (
              <div className="col-span-full flex justify-center py-12">
                <Loader2 className="animate-spin text-blue-600 w-8 h-8" />
              </div>
            )}
          </div>
        </section>

        {/* Recommended for You */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-500" />
              Recommended for You
            </h2>
            <Button variant="ghost" className="text-blue-600">Explore Interests</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             <CourseCard 
              id={4}
              title="Introduction to Machine Learning with Python"
              teacherName="Andrew Ng"
              category="Data Science"
              duration="24h 00m"
              rating={4.9}
              studentCount={450000}
              isFree={true}
            />
            <CourseCard 
              id={5}
              title="Digital Marketing Masterclass 2026"
              teacherName="Neil Patel"
              category="Marketing"
              duration="15h 30m"
              rating={4.7}
              studentCount={12400}
              price={44.99}
            />
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[32px] p-8 flex flex-col justify-center text-white relative overflow-hidden group shadow-lg">
               <div className="absolute top-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-white/10 blur-[60px] group-hover:bg-white/20 transition-all duration-500" />
               <h3 className="text-2xl font-bold mb-4 relative z-10">AI Career Path</h3>
               <p className="text-blue-100 mb-6 relative z-10">Based on your interests, we recommend the AI Engineering path.</p>
               <Button className="bg-white text-blue-600 hover:bg-blue-50 w-fit relative z-10 rounded-xl font-bold">Start Roadmap</Button>
            </div>
          </div>
        </section>

        {/* Recent Activity List */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[32px] p-8 shadow-sm">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            Recently Completed Lessons
          </h2>
          <div className="space-y-4">
            {[
              { title: "Authentication Flow with JWT", course: "Advanced React Patterns", time: "2 hours ago", duration: "45m" },
              { title: "Database Schema Design", course: "Platform Architecture", time: "Yesterday", duration: "1.2h" },
              { title: "Flexbox vs Grid Deep Dive", course: "UI/UX Design Systems", time: "2 days ago", duration: "30m" },
            ].map((activity, i) => (
              <div key={i} className="flex items-center justify-between p-4 border border-slate-100 dark:border-slate-800 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                    {activity.course.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">{activity.title}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{activity.course} • {activity.time}</p>
                  </div>
                </div>
                <div className="text-sm font-medium text-slate-600 dark:text-slate-400">{activity.duration}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatCard({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col gap-2 hover:border-blue-500/50 transition-colors text-slate-900 dark:text-white">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</span>
        <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">{icon}</div>
      </div>
      <div className="text-3xl font-bold">{value}</div>
    </div>
  );
}
