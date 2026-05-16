"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout";
import { PlayCircle, CheckCircle2, Clock, ChevronRight, FileText, Loader2, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { API_URLS } from "@/services/urls";

export default function CourseViewerPage() {
  const params = useParams();
  const router = useRouter();
  const [course, setCourse] = useState<any>(null);
  const [selectedVideo, setSelectedCourseVideo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && params.id) {
      fetchCourseData(token, params.id as string);
    }
  }, [params.id]);

  const fetchCourseData = async (token: string, id: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(API_URLS.PLATFORM.COURSES.DETAILS(id), {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setCourse(data);
        if (data.videos && data.videos.length > 0) {
          setSelectedCourseVideo(data.videos[0]);
        }
      }
    } catch (error) {
      console.error("Course fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return (
    <DashboardLayout role="student">
       <div className="flex justify-center items-center h-[60vh]">
          <Loader2 className="animate-spin text-blue-600 w-10 h-10" />
       </div>
    </DashboardLayout>
  );

  if (!course) return (
    <DashboardLayout role="student">
       <div className="text-center py-20">Course not found.</div>
    </DashboardLayout>
  );

  return (
    <DashboardLayout role="student">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Video Player Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="aspect-video bg-black rounded-[32px] overflow-hidden shadow-2xl relative group">
             {selectedVideo?.youtube_url ? (
               <iframe 
                 className="w-full h-full"
                 src={`https://www.youtube.com/embed/${getYouTubeID(selectedVideo.youtube_url)}`}
                 title={selectedVideo.title}
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                 allowFullScreen
               ></iframe>
             ) : (
               <div className="w-full h-full flex items-center justify-center text-white flex-col gap-4">
                  <PlayCircle size={64} className="opacity-20" />
                  <p className="text-slate-500 font-medium">Select a lesson to start learning</p>
               </div>
             )}
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-[32px] p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h1 className="text-2xl font-bold mb-4">{selectedVideo?.title || course.title}</h1>
            <div className="flex items-center gap-6 text-sm text-slate-500 mb-6">
               <div className="flex items-center gap-2"><Clock size={16} /> 45 mins</div>
               <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> Completed</div>
            </div>
            <div className="h-px bg-slate-100 dark:bg-slate-800 mb-6" />
            <h3 className="font-bold mb-3">About this lesson</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
               {course.description || "No description available for this course."}
            </p>
          </div>
        </div>

        {/* Sidebar / Course Content */}
        <div className="space-y-6">
           <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="p-6 border-b bg-slate-50/50 dark:bg-slate-800/50">
                 <h2 className="font-bold">Course Content</h2>
                 <p className="text-xs text-slate-500 mt-1">{course.videos?.length || 0} Lessons • 12h total</p>
              </div>
              <div className="divide-y divide-slate-50 dark:divide-slate-800">
                 {course.videos?.map((video: any, index: number) => (
                   <button 
                     key={video.id}
                     onClick={() => setSelectedCourseVideo(video)}
                     className={`w-full p-5 text-left flex items-start gap-4 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 ${selectedVideo?.id === video.id ? 'bg-blue-50/50 dark:bg-blue-900/20' : ''}`}
                   >
                      <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs ${selectedVideo?.id === video.id ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                         {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                         <h4 className={`text-sm font-bold truncate ${selectedVideo?.id === video.id ? 'text-blue-600' : 'text-slate-900 dark:text-white'}`}>{video.title}</h4>
                         <p className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
                            <Play size={10} /> 12:45
                         </p>
                      </div>
                      {index === 0 && <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-1" />}
                   </button>
                 ))}
                 
                 {(!course.videos || course.videos.length === 0) && (
                   <div className="p-10 text-center text-slate-400 text-sm italic">
                      No lessons uploaded yet.
                   </div>
                 )}
              </div>
           </div>

           <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[32px] p-8 text-white shadow-lg">
              <h3 className="font-bold mb-2">Need Help?</h3>
              <p className="text-xs text-blue-100 mb-6 leading-relaxed">Our AI assistant is available 24/7 to help you with course material.</p>
              <Button className="w-full bg-white text-blue-600 hover:bg-blue-50 rounded-xl font-bold">Ask AI Assistant</Button>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function getYouTubeID(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}
