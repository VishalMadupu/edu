"use client";

import React, { useState } from "react";
import { X, Video, PlayCircle, Plus, Loader2, Sparkles, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { API_URLS } from "@/services/urls";

interface CreateCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateCourseModal({ isOpen, onClose, onSuccess }: CreateCourseModalProps) {
  const [step, setStep] = useState(1); // 1: Details, 2: Content (URL/Video)
  const [isLoading, setIsLoading] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    category: "Development",
    price: 0,
    is_free: true,
    thumbnail: ""
  });

  const [videoData, setVideoData] = useState({
    title: "",
    youtube_url: "",
    video_url: "",
    duration: ""
  });

  if (!isOpen) return null;

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(API_URLS.PLATFORM.COURSES.CREATE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(courseData)
      });

      const data = await response.json();
      if (response.ok) {
        setCourseData({ ...courseData, id: data.id } as any);
        setStep(2);
      } else {
        setError(data.detail || "Failed to create course");
      }
    } catch (err) {
      setError("Connection error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(API_URLS.PLATFORM.VIDEOS.YOUTUBE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          ...videoData,
          course_id: (courseData as any).id
        })
      });

      if (response.ok) {
        onSuccess();
        onClose();
      } else {
        const data = await response.json();
        setError(data.detail || "Failed to add video content");
      }
    } catch (err) {
      setError("Failed to connect to server.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAiOptimize = async () => {
    if (!courseData.description) return;
    setIsAiLoading(true);
    try {
      const response = await fetch("/api/ai/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: "Enhance this course description to be highly compelling for students.",
          context: `Title: ${courseData.title}\nDescription: ${courseData.description}\nCategory: ${courseData.category}`
        })
      });
      const data = await response.json();
      if (data.result) {
        setCourseData({ ...courseData, description: data.result });
      }
    } catch (err) {
      console.error("AI Error:", err);
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              {step === 1 ? "Create New Course" : "Add Course Content"}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {step === 1 ? "Step 1: Basic Information" : "Step 2: Upload Video or YouTube URL"}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors">
            <X size={24} className="text-slate-500" />
          </button>
        </div>

        <div className="p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl flex items-center gap-3 text-sm">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          {step === 1 ? (
            <form onSubmit={handleCreateCourse} className="space-y-6">
              <div className="grid gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Course Title</label>
                  <Input 
                    placeholder="e.g. Master React in 30 Days" 
                    value={courseData.title}
                    onChange={(e) => setCourseData({...courseData, title: e.target.value})}
                    required
                    className="h-12 rounded-xl"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Category</label>
                    <select 
                      className="w-full h-12 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none"
                      value={courseData.category}
                      onChange={(e) => setCourseData({...courseData, category: e.target.value})}
                    >
                      <option>Development</option>
                      <option>Design</option>
                      <option>Business</option>
                      <option>Marketing</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Price ($)</label>
                    <Input 
                      type="number"
                      placeholder="0.00"
                      value={courseData.price}
                      onChange={(e) => setCourseData({...courseData, price: parseFloat(e.target.value) || 0})}
                      disabled={courseData.is_free}
                      className="h-12 rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                   <div className="flex items-center justify-between">
                     <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Description</label>
                     <Button 
                       type="button" 
                       variant="ghost" 
                       size="sm" 
                       onClick={handleAiOptimize}
                       disabled={isAiLoading || !courseData.description}
                       className="text-blue-600 hover:bg-blue-50 h-8 px-3 rounded-full text-xs font-bold"
                     >
                       {isAiLoading ? <Loader2 size={14} className="animate-spin mr-1" /> : <Sparkles size={14} className="mr-1" />}
                       AI Optimize
                     </Button>
                   </div>
                   <textarea 
                     className="w-full min-h-[120px] rounded-2xl border border-slate-200 dark:border-slate-800 bg-transparent p-4 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none"
                     placeholder="What will students learn in this course?"
                     value={courseData.description}
                     onChange={(e) => setCourseData({...courseData, description: e.target.value})}
                     required
                   />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
                <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 rounded-xl px-8 h-12">
                  {isLoading ? <Loader2 className="animate-spin" /> : "Continue to Content"}
                </Button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleAddVideo} className="space-y-8">
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-[24px] p-6 border-2 border-dashed border-slate-200 dark:border-slate-800">
                 <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center">
                       <PlayCircle className="text-red-600" />
                    </div>
                    <div>
                       <h3 className="font-bold text-slate-900 dark:text-white">YouTube Integration</h3>
                       <p className="text-xs text-slate-500">Paste a YouTube link to import video lesson.</p>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Video Title</label>
                       <Input 
                         placeholder="e.g. Introduction to Next.js"
                         value={videoData.title}
                         onChange={(e) => setVideoData({...videoData, title: e.target.value})}
                         required
                         className="h-11 rounded-xl bg-white dark:bg-slate-900"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">YouTube URL</label>
                       <Input 
                         placeholder="https://www.youtube.com/watch?v=..."
                         value={videoData.youtube_url}
                         onChange={(e) => setVideoData({...videoData, youtube_url: e.target.value})}
                         required
                         className="h-11 rounded-xl bg-white dark:bg-slate-900"
                       />
                    </div>
                 </div>
              </div>

              <div className="flex flex-col gap-4">
                 <div className="flex items-center gap-2 text-slate-400">
                    <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">OR</span>
                    <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
                 </div>
                 
                 <Button type="button" variant="outline" className="h-14 rounded-2xl border-slate-200 hover:bg-slate-50 flex items-center justify-center gap-3">
                    <Video className="text-blue-600" />
                    <span className="font-bold">Upload Local Video File (.mp4, .mov)</span>
                 </Button>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-800">
                <Button type="button" variant="ghost" onClick={() => setStep(1)}>Back to Details</Button>
                <div className="flex gap-3">
                  <Button type="button" variant="ghost" onClick={onClose}>Finish Later</Button>
                  <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 rounded-xl px-10 h-12 shadow-lg shadow-blue-600/20">
                    {isLoading ? <Loader2 className="animate-spin" /> : "Publish Lesson"}
                  </Button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
