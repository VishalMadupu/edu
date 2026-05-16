"use client";

import Image from "next/image";

import loginpageimage from "../../../../../public/images/loginpage.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { StudentService } from "@/services/student";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Loader2, BrainCircuit, GraduationCap } from "lucide-react";

function LoginContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("signup") === "success") {
      setSuccessMsg("Signup successful! Please login with your credentials.");
    }
    const urlError = searchParams.get("error");
    if (urlError) {
      setError(urlError);
    }
  }, [searchParams]);

  const handleGoogleLogin = () => {
    StudentService.oauthLogin('google', 'login');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setIsLoading(true);
    
    try {
      const response = await StudentService.login({ email, password });
      if (response.success && response.data) {
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("user_role", response.data.user.user_type);
        router.push("/student/dashboard");
      } else {
        setError(response.message || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2">
      {/* display image in left  */}
      <div className="hidden md:flex flex-col justify-center items-center p-8 bg-blue-600 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600 to-indigo-800 opacity-90" />
        <div className="relative z-10 text-white text-center max-w-md">
          <BrainCircuit className="w-16 h-16 mx-auto mb-8 opacity-80" />
          <h2 className="text-4xl font-bold mb-4 tracking-tight">Unlock Your Potential</h2>
          <p className="text-blue-100 text-lg mb-12">
            Join thousands of students mastering new skills with our AI-powered learning platform.
          </p>
          <Image
            className="w-full h-auto object-cover rounded-2xl shadow-2xl border-4 border-white/10"
            src={loginpageimage}
            alt="learning student"
            width={400}
            height={600}
            priority
          />
        </div>
      </div>

      {/* display login form in right */}
      <div className="flex flex-col items-center justify-center p-8 bg-background relative">
        {/* Logo Top Left */}
        <div className="absolute top-8 left-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tighter text-slate-900 dark:text-white">
              Ed<span className="text-blue-600">tech</span>
            </span>
          </Link>
        </div>

        <div className="w-full max-w-md flex flex-col gap-8 mt-12 md:mt-0">   
          <div className="flex flex-col gap-2 text-center md:text-left">
            <h1 className="text-3xl font-bold tracking-tight">Learner Login</h1>
            <p className="text-sm text-muted-foreground">
              Welcome back! Enter your credentials to access your courses
            </p>
          </div>
          
          <div className="flex flex-col gap-4">
            {error && (
              <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-2 rounded-lg text-sm">
                {error}
              </div>
            )}

            {successMsg && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-lg text-sm">
                {successMsg}
              </div>
            )}

            <form className="flex flex-col gap-4" onSubmit={handleLogin}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Input 
                    id="email"
                    type="email" 
                    placeholder="Email Address" 
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
                    className="h-11 pr-10 rounded-xl"
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
              <Button type="submit" className="w-full mt-2 h-11 bg-blue-600 hover:bg-blue-700 rounded-xl font-bold" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>

            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground font-medium">Or continue with</span>
              </div>
            </div>

            <Button 
              variant="outline" 
              type="button" 
              className="w-full h-11 rounded-xl flex items-center justify-center gap-3 font-semibold text-slate-700 border-slate-200 hover:bg-slate-50 transition-colors"
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
              Google Account
            </Button>
          </div>
          
          <div className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/student/signup" className="text-blue-600 font-bold hover:underline underline-offset-4 transition-all">
              Sign Up for Free
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
