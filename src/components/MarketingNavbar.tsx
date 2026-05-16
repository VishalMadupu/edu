"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap, LayoutDashboard, LogOut, User, Settings, ChevronDown, Lock } from "lucide-react";
import { Button } from "./ui/button";
import { API_URLS } from "@/services/urls";

export default function MarketingNavbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token") || localStorage.getItem("admin_token");
    const role = localStorage.getItem("user_role");
    if (token) {
      setIsLoggedIn(true);
      setUserRole(role);
      fetchProfile(token);
    }

    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      console.error("Navbar profile fetch error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const role = localStorage.getItem("user_role");
      let logoutUrl = "/api/auth/student/logout";
      if (role === "admin") logoutUrl = "/api/auth/admin/logout";
      else if (role === "tutor" || role === "provider") logoutUrl = "/api/auth/tutor/logout";

      await fetch(logoutUrl, { method: "POST", credentials: "include" });
    } catch (error) {
      console.error("Logout error:", error);
    }
    
    localStorage.removeItem("token");
    localStorage.removeItem("admin_token");
    localStorage.removeItem("user_role");
    setIsLoggedIn(false);
    setShowDropdown(false);
    router.push("/");
  };

  const getProfileLink = () => {
    if (userRole === 'admin') return '/admin/dashboard';
    if (userRole === 'tutor' || userRole === 'provider') return '/tutor/profile';
    return '/student/profile';
  };

  const getDashboardLink = () => {
    if (userRole === 'admin') return '/admin/dashboard';
    if (userRole === 'tutor' || userRole === 'provider') return '/tutor/dashboard';
    return '/student/dashboard';
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-6 lg:px-12">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-xl font-bold tracking-tighter text-slate-900 dark:text-white">
              Ed<span className="text-blue-600">tech</span>
            </span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">
              About
            </Link>
            <Link href="/courses" className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">
              Courses
            </Link>
            {!isLoggedIn && (
              <Link href="/tutor/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">
                Become a Tutor
              </Link>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-slate-200 dark:border-slate-700"
              >
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shadow-sm overflow-hidden">
                  {userProfile?.profile_image ? (
                    <img src={userProfile.profile_image} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    userRole === 'admin' ? 'AD' : (userProfile?.username?.[0] || 'U').toUpperCase()
                  )}
                </div>
                <ChevronDown size={14} className={`text-slate-500 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 mb-1">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Account</p>
                  </div>
                  
                  <Link 
                    href={getDashboardLink()}
                    onClick={() => setShowDropdown(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <LayoutDashboard size={16} className="text-slate-400" />
                    Dashboard
                  </Link>
                  
                  <Link 
                    href={getProfileLink()}
                    onClick={() => setShowDropdown(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <User size={16} className="text-slate-400" />
                    My Profile
                  </Link>

                  <Link 
                    href={userRole === 'tutor' || userRole === 'provider' ? '/tutor/security' : '/student/security'}
                    onClick={() => setShowDropdown(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <Lock size={16} className="text-slate-400" />
                    Change Password
                  </Link>

                  <div className="h-px bg-slate-100 dark:bg-slate-800 my-1" />
                  
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link 
                href="/student/login"
                className="hidden sm:inline-flex text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
              >
                Log in
              </Link>
              <Link 
                href="/student/signup"
                className="inline-flex h-9 items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-sm"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
