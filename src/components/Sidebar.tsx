"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Briefcase
} from "lucide-react";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  role: "student" | "tutor";
}

export default function Sidebar({ sidebarOpen, setSidebarOpen, role }: SidebarProps) {
  const pathname = usePathname();

  const navItems = role === "student" ? [
    { name: "My Learning", href: "/student/dashboard", icon: LayoutDashboard },
    { name: "Browse Courses", href: "/courses", icon: BookOpen },
    { name: "Find Tutors", href: "/courses", icon: Users },
  ] : [
    { name: "Overview", href: "/tutor/dashboard", icon: LayoutDashboard },
    { name: "My Courses", href: "/tutor/dashboard", icon: BookOpen },
    { name: "Student List", href: "#", icon: Users },
    { name: "Revenue", href: "#", icon: Briefcase },
  ];

  return (
    <div
      className={`
      fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transform transition-transform duration-300 ease-in-out md:translate-x-0
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
    `}
    >
      <div className="h-full flex flex-col">
        <div className="p-8 hidden md:block">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold text-2xl tracking-tighter text-slate-900 dark:text-white">
              Ed<span className="text-blue-600">techtech</span>
            </span>
          </Link>
          <div className="mt-1 text-[10px] text-slate-400 uppercase tracking-[0.2em] font-bold">
            {role === "student" ? "Learner Portal" : "Teacher Portal"}
          </div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-2xl transition-all text-sm font-bold
                  ${isActive 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                    : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                  }
                `}
              >
                <Icon className={`h-5 w-5 ${isActive ? "text-white" : "text-slate-400"}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-slate-100 dark:border-slate-800">
           <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 flex flex-col gap-3">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Help & Support</p>
              <Link href="/about" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Documentation</Link>
              <Link href="#" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Community Forum</Link>
           </div>
        </div>
      </div>
    </div>
  );
}
