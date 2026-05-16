"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  User,
  LogOut,
  Menu,
  ChevronDown,
  Lock,
  Bell
} from "lucide-react";
import { Button } from "./ui/button";
import { API_URLS } from "@/services/urls";
import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: "student" | "tutor";
}

export default function DashboardLayout({
  children,
  role,
}: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = localStorage.getItem("token") || localStorage.getItem("admin_token");
    const storedRole = localStorage.getItem("user_role");

    if (!token) {
      router.push(`/${role === "student" ? "student" : "tutor"}/login`);
      return;
    }

    // Compatibility mapping
    const mappedStoredRole = storedRole === "client" ? "student" : (storedRole === "provider" ? "tutor" : storedRole);

    if (mappedStoredRole !== role) {
      if (mappedStoredRole === "student" || storedRole === "client") router.push("/student/dashboard");
      else if (mappedStoredRole === "tutor" || storedRole === "provider") router.push("/tutor/dashboard");
      else if (mappedStoredRole === "admin") router.push("/admin/dashboard");
    }

    fetchProfile(token);

    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    
    // Handle back button from browser cache (BFcache)
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        if (!localStorage.getItem("token") && !localStorage.getItem("admin_token")) {
           router.push("/");
        }
      }
    };
    window.addEventListener("pageshow", handlePageShow);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, [role, router]);

  const fetchProfile = async (token: string) => {
    try {
      const response = await fetch(API_URLS.USER.PROFILE, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setUserProfile(data);
      }
    } catch (error) {
      console.error("Dashboard profile fetch error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      let logoutUrl = "/api/auth/student/logout";
      if (role === "tutor") logoutUrl = "/api/auth/tutor/logout";

      await fetch(logoutUrl, { method: "POST", credentials: "include" });
    } catch (error) {
      console.error("Logout error:", error);
    }
    
    localStorage.removeItem("token");
    localStorage.removeItem("admin_token");
    localStorage.removeItem("user_role");
    router.push("/");
  };

  const profileLink = role === 'tutor' ? '/tutor/profile' : '/student/profile';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col md:flex-row">
      {/* Sidebar - Componentized and Fixed */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} role={role} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:ml-72 min-h-screen">
        {/* Top Header */}
        <header className="sticky top-0 z-40 w-full h-20 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <div className="md:hidden font-bold text-xl">
               Ed<span className="text-blue-600">techtech</span>
            </div>
            <h2 className="hidden md:block text-sm font-bold text-slate-500 uppercase tracking-widest">
               {pathname.split('/').pop()?.replace('-', ' ')}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors relative">
               <Bell size={20} />
               <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-950" />
            </button>
            
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-1" />

            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-3 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              >
                <div className="flex flex-col items-end hidden sm:flex mr-1">
                   <p className="text-xs font-bold text-slate-900 dark:text-white">{userProfile?.first_name || userProfile?.username || "Account"}</p>
                   <p className="text-[10px] font-medium text-slate-400 capitalize">{role}</p>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-blue-600/20 overflow-hidden">
                  {userProfile?.profile_image ? (
                    <img src={userProfile.profile_image} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    (userProfile?.username?.[0] || 'U').toUpperCase()
                  )}
                </div>
                <ChevronDown size={14} className={`text-slate-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-slate-900 rounded-[24px] shadow-2xl border border-slate-200 dark:border-slate-800 py-3 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 mb-2">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{userProfile?.email}</p>
                    <p className="text-xs font-medium text-slate-400 mt-1 uppercase tracking-tighter">Personal Account</p>
                  </div>
                  
                  <Link 
                    href={role === 'tutor' ? '/tutor/dashboard' : '/student/dashboard'}
                    onClick={() => setShowDropdown(false)}
                    className="flex items-center gap-3 px-5 py-3 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <LayoutDashboard size={18} className="text-slate-400" />
                    Dashboard Overview
                  </Link>
                  
                  <Link 
                    href={profileLink}
                    onClick={() => setShowDropdown(false)}
                    className="flex items-center gap-3 px-5 py-3 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <User size={18} className="text-slate-400" />
                    Edit Profile
                  </Link>

                  <Link 
                    href={role === 'tutor' ? '/tutor/security' : '/student/security'}
                    onClick={() => setShowDropdown(false)}
                    className="flex items-center gap-3 px-5 py-3 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <Lock size={18} className="text-slate-400" />
                    Account Security
                  </Link>

                  <div className="h-px bg-slate-100 dark:bg-slate-800 my-2 mx-4" />
                  
                  <button 
                    onClick={handleLogout}
                    className="w-[calc(100%-16px)] mx-2 flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors text-left"
                  >
                    <LogOut size={18} />
                    Logout Securely
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Scrolling Content Area */}
        <main className="flex-1 p-4 md:p-10 bg-slate-50/50 dark:bg-slate-950/50">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
