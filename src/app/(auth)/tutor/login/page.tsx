"use client";

import Image from "next/image";

import loginpageimage from "../../../../../public/images/loginpage.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { TutorService } from "@/services/tutor";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, GraduationCap, Eye, EyeOff } from "lucide-react";

function TutorLoginContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const urlError = searchParams.get("error");
    if (urlError) {
      setError(urlError);
    }
  }, [searchParams]);

  const handleGoogleLogin = () => {
    TutorService.oauthLogin('google', 'login');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const response = await TutorService.login({ email, password });
      if (response.success && response.data) {
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("user_role", response.data.user.user_type);
        router.push("/tutor/dashboard");
      } else {
        setError(response.message || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row">
      
      {/* display login form in left for Tutor */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-slate-950 relative">
        {/* Logo Top Left */}
        <div className="absolute top-8 left-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tighter text-slate-900 dark:text-white">
              Ed<span className="text-blue-600">tech</span>
            </span>
          </Link>
        </div>

        <div className="w-full max-w-md flex flex-col gap-8 mt-12 md:mt-0">   
          <div className="flex flex-col gap-2 text-center md:text-left">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Teacher Portal Login</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Welcome back! Please enter your details to manage your courses and students.
            </p>
          </div>
          
          <div className="flex flex-col gap-4">
            {error && (
              <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-2 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form className="flex flex-col gap-4" onSubmit={handleLogin}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Input 
                    id="email"
                    type="email" 
                    placeholder="name@university.edu" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                    disabled={isLoading}
                    className="h-11 rounded-xl"
                  />
                </div>
                <div className="grid gap-2 relative">
                  <Input 
                    id="password"
                    type={showPassword ? "text" : "password"} 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                    disabled={isLoading}
                    className="h-11 rounded-xl pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full mt-2 h-11 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  "Login to Dashboard"
                )}
              </Button>
            </form>

            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200 dark:border-slate-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-slate-50 dark:bg-slate-950 px-2 text-slate-500 font-medium">Or continue with</span>
              </div>
            </div>

            <Button 
              variant="outline" 
              type="button" 
              className="w-full h-11 rounded-xl flex items-center justify-center gap-3 font-semibold text-slate-700 border-slate-200 hover:bg-slate-50 transition-colors bg-white dark:bg-slate-900"
              onClick={handleGoogleLogin}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google for Education
            </Button>
          </div>
          
          <div className="text-center text-sm text-slate-500 dark:text-slate-400">
            Interested in teaching?{" "}
            <Link href="/tutor/signup" className="text-indigo-600 dark:text-indigo-400 hover:underline font-bold underline-offset-4">
              Apply to become a Tutor
            </Link>
          </div>
        </div>
      </div>

      {/* display image in right  */}
      <div className="hidden md:flex flex-1 flex-col justify-center items-center p-12 bg-indigo-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-indigo-900 opacity-90 z-10" />
        <Image
          className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
          src={loginpageimage}
          alt="background"
          fill
          priority
        />
        <div className="relative z-20 max-w-lg text-center space-y-6">
          <GraduationCap className="w-16 h-16 mx-auto mb-4 opacity-80" />
          <h2 className="text-4xl font-bold leading-tight tracking-tight">Empower the next generation of learners</h2>
          <p className="text-lg text-indigo-100/80 leading-relaxed">
            Join our platform to reach thousands of students globally. Create interactive courses, set your own schedule, and build your digital teaching career.
          </p>
        </div>
      </div>

    </div>
  );
}

export default function page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 text-slate-500 font-medium">Loading teacher portal...</div>}>
      <TutorLoginContent />
    </Suspense>
  );
}
