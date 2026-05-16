"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import MarketingNavbar from "@/components/MarketingNavbar";
import Footer from "@/components/Footer";
import { PlayCircle, Clock, Star, User, BookOpen, CheckCircle2, Loader2, Play, Lock, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { API_URLS } from "@/services/urls";

export default function PublicCoursePage() {
  const params = useParams();
  const router = useRouter();
  const [course, setCourse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token") || localStorage.getItem("admin_token");
    setIsLoggedIn(!!token);
    
    if (params.id) {
      fetchCourseData(params.id as string);
    }
  }, [params.id]);

  const fetchCourseData = async (id: string) => {
    setIsLoading(true);
    try {
      // Fetch public course details (no token required if backend allows, or use dummy/public endpoint)
      // Since we don't have a specific public endpoint, we try fetching without token or handle it
      const response = await fetch(API_URLS.PLATFORM.COURSES.DETAILS(id));
      if (response.ok) {
        const data = await response.json();
        setCourse(data);
      }
    } catch (error) {
      console.error("Public course fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartLearning = () => {
    if (isLoggedIn) {
      router.push(`/student/courses/${params.id}`);
    } else {
      router.push(`/student/login?redirect=/courses/${params.id}`);
    }
  };

  if (isLoading) return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
       <MarketingNavbar />
       <div className="flex-1 flex items-center justify-center">
          <Loader2 className="animate-spin text-blue-600 w-10 h-10" />
       </div>
       <Footer />
    </div>
  );

  if (!course) return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
       <MarketingNavbar />
       <div className="flex-1 text-center py-20 font-bold text-slate-500">Course not found.</div>
       <Footer />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <MarketingNavbar />
      
      <main className="flex-1">
        {/* Course Hero */}
        <div className="bg-slate-900 text-white py-16 lg:py-24 px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-blue-600 text-white border-none">{course.category || "Best Seller"}</Badge>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">{course.title}</h1>
              <p className="text-xl text-slate-300 leading-relaxed max-w-xl">
                {course.description || "Master the essentials of this subject with our comprehensive curriculum and expert instruction."}
              </p>
              
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center gap-1.5 text-yellow-400 font-bold">
                  <Star className="w-5 h-5 fill-current" />
                  4.9 (12,450 ratings)
                </div>
                <div className="text-slate-400">150,230 students enrolled</div>
                <div className="text-slate-400">Created by <span className="text-blue-400 font-semibold underline underline-offset-4">Expert Tutor</span></div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                 <Button onClick={handleStartLearning} className="bg-blue-600 hover:bg-blue-700 h-14 px-10 rounded-2xl text-lg font-bold shadow-xl shadow-blue-600/20">
                    {isLoggedIn ? "Continue Learning" : "Enroll Now for Free"}
                 </Button>
                 <Button variant="outline" className="h-14 px-8 rounded-2xl text-lg font-bold border-slate-700 text-white hover:bg-slate-800">
                    View Curriculum
                 </Button>
              </div>
            </div>

            {/* Video Preview Card */}
            <div className="relative group aspect-video bg-slate-800 rounded-[32px] overflow-hidden shadow-2xl border-4 border-slate-800/50">
               {course.videos && course.videos.length > 0 && course.videos[0].youtube_url ? (
                 <iframe 
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${getYouTubeID(course.videos[0].youtube_url)}?autoplay=0&controls=1`}
                    title="Course Preview"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
               ) : (
                 <div className="w-full h-full flex items-center justify-center flex-col gap-4">
                    <PlayCircle size={64} className="text-blue-600 opacity-50" />
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Preview Not Available</p>
                 </div>
               )}
            </div>
          </div>
        </div>

        {/* Course Details Content */}
        <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-3 gap-12">
           <div className="lg:col-span-2 space-y-12">
              <section className="bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm">
                 <h2 className="text-2xl font-bold mb-6">What you&apos;ll learn</h2>
                 <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      "Comprehensive understanding of the core concepts.",
                      "Hands-on projects to build your portfolio.",
                      "Industry best practices and advanced techniques.",
                      "Access to a global community of learners.",
                      "Personalized feedback from expert instructors.",
                      "Professional certification upon completion."
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                         <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                         <span className="text-slate-600 dark:text-slate-400 text-sm leading-tight">{item}</span>
                      </div>
                    ))}
                 </div>
              </section>

              <section className="space-y-6">
                 <h2 className="text-2xl font-bold">Course Content</h2>
                 <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                    <div className="p-6 border-b bg-slate-50/50 dark:bg-slate-800/50 flex justify-between items-center">
                       <span className="font-bold">{course.videos?.length || 0} Lessons</span>
                       <span className="text-sm text-slate-500 font-medium">12h 45m total length</span>
                    </div>
                    <div className="divide-y divide-slate-50 dark:divide-slate-800">
                       {course.videos?.map((video: any, index: number) => (
                         <div key={video.id} className="p-5 flex items-center justify-between group hover:bg-slate-50/50 transition-colors">
                            <div className="flex items-center gap-4">
                               <div className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 text-xs font-bold">
                                  {index + 1}
                               </div>
                               <div>
                                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{video.title}</h4>
                                  <p className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1"><Clock size={10} /> 12:45</p>
                               </div>
                            </div>
                            {index === 0 ? (
                               <span className="text-blue-600 text-xs font-bold underline cursor-pointer">Preview</span>
                            ) : (
                               <Lock className="w-4 h-4 text-slate-300" />
                            )}
                         </div>
                       ))}
                    </div>
                 </div>
              </section>
           </div>

           {/* Sidebar Info Card */}
           <div className="space-y-6">
              <div className="bg-white dark:bg-slate-900 p-8 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-xl sticky top-28">
                 <div className="text-3xl font-black mb-6 text-slate-900 dark:text-white">
                    {course.is_free ? "Free" : `$${course.price?.toFixed(2) || "49.99"}`}
                 </div>
                 <Button onClick={handleStartLearning} className="w-full bg-blue-600 hover:bg-blue-700 h-14 rounded-2xl text-lg font-bold mb-4">
                    {isLoggedIn ? "Go to Dashboard" : "Enroll Now"}
                 </Button>
                 <p className="text-center text-xs text-slate-500 mb-8 italic">30-Day Money-Back Guarantee</p>
                 
                 <div className="space-y-4">
                    <p className="font-bold text-sm">This course includes:</p>
                    <div className="space-y-3">
                       <InfoItem icon={<Video size={16} />} text="12.5 hours on-demand video" />
                       <InfoItem icon={<BookOpen size={16} />} text="12 articles & resources" />
                       <InfoItem icon={<Clock size={16} />} text="Full lifetime access" />
                       <InfoItem icon={<PlayCircle size={16} />} text="Access on mobile and TV" />
                       <InfoItem icon={<CheckCircle2 size={16} />} text="Certificate of completion" />
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function InfoItem({ icon, text }: { icon: React.ReactNode, text: string }) {
  return (
    <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
       <div className="text-blue-600">{icon}</div>
       <span>{text}</span>
    </div>
  );
}

function getYouTubeID(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}
