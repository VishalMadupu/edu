import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Clock, User, PlayCircle, BookOpen } from "lucide-react";
import { Badge } from "./ui/badge";

interface CourseCardProps {
  id: string | number;
  title: string;
  thumbnail?: string;
  teacherName: string;
  rating?: number;
  studentCount?: number;
  duration?: string;
  price?: number;
  isFree?: boolean;
  category?: string;
  previewVideoUrl?: string;
}

export default function CourseCard({
  id,
  title,
  thumbnail,
  teacherName,
  rating = 4.8,
  studentCount = 1240,
  duration = "12h 30m",
  price = 49.99,
  isFree = false,
  category = "Development",
  previewVideoUrl
}: CourseCardProps) {
  return (
    <div className="group bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 transition-all hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1">
      {/* Thumbnail Area */}
      <div className="relative aspect-video overflow-hidden">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
            <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-700" />
          </div>
        )}
        
        {/* Hover Preview Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <PlayCircle className="w-12 h-12 text-white" />
        </div>

        {/* Category Badge */}
        <Badge className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white hover:bg-white/90">
          {category}
        </Badge>
      </div>

      {/* Content Area */}
      <div className="p-5">
        <h3 className="font-bold text-lg leading-tight text-slate-900 dark:text-white line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
          <Link href={`/courses/${id}`}>{title}</Link>
        </h3>
        
        <div className="flex items-center gap-2 mb-3 text-sm text-slate-500 dark:text-slate-400">
          <User className="w-4 h-4" />
          <span>{teacherName}</span>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1 text-yellow-500 font-bold text-sm">
            <Star className="w-4 h-4 fill-current" />
            {rating.toFixed(1)}
          </div>
          <div className="text-xs text-slate-400">
            ({studentCount.toLocaleString()} students)
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Clock className="w-4 h-4" />
            {duration}
          </div>
          <div className="font-bold text-lg text-slate-900 dark:text-white">
            {isFree ? (
              <span className="text-green-600 dark:text-green-400">Free</span>
            ) : (
              `$${price.toFixed(2)}`
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
