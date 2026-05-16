"use client";

import React, { useState } from "react";
import { X, PlayCircle, Loader2, AlertCircle, Video } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { API_URLS } from "@/services/urls";

interface AddVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: number | string;
  onSuccess: () => void;
}

export default function AddVideoModal({ isOpen, onClose, courseId, onSuccess }: AddVideoModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [videoData, setVideoData] = useState({
    title: "",
    youtube_url: "",
    duration: ""
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
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
          course_id: courseId
        })
      });

      if (response.ok) {
        onSuccess();
        onClose();
        setVideoData({ title: "", youtube_url: "", duration: "" });
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

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-xl font-bold">Add Video Lesson</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-2 text-sm">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-bold ml-1">Video Title</label>
              <Input 
                placeholder="e.g. Setting up the Environment"
                value={videoData.title}
                onChange={(e) => setVideoData({...videoData, title: e.target.value})}
                required
                className="h-11 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold ml-1">YouTube URL</label>
              <div className="relative">
                <PlayCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500 w-5 h-5" />
                <Input 
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={videoData.youtube_url}
                  onChange={(e) => setVideoData({...videoData, youtube_url: e.target.value})}
                  required
                  className="h-11 rounded-xl pl-10"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 rounded-xl px-8 h-11">
              {isLoading ? <Loader2 className="animate-spin" /> : "Add Lesson"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
