"use client";

import Image from "next/image";

import loginpageimage from "../../../../../public/images/loginpage.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ServiceProviderService } from "@/services/serviceprovider";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Suspense } from "react";

function ProviderLoginForm() {
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
      setSuccessMsg("Application submitted! Please login with your credentials.");
    }
  }, [searchParams]);

  const handleGoogleLogin = () => {
    ServiceProviderService.oauthLogin('google');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setIsLoading(true);

    try {
      const response = await ServiceProviderService.login({ email, password });
      if (response.success && response.data) {
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("user_role", "provider");
        router.push("/serviceprovider/dashboard");
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
    <div className="flex flex-col gap-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg text-sm">
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
              placeholder="name@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              disabled={isLoading}
              className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
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
              className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-900 dark:hover:text-white"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        <Button type="submit" className="w-full mt-2 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Logging in...
            </>
          ) : (
            "Login to Dashboard"
          )}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-slate-200 dark:border-slate-800" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-slate-50 dark:bg-slate-950 px-2 text-slate-500">Or continue with</span>
        </div>
      </div>

      <Button 
        variant="outline" 
        type="button" 
        className="w-full border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900"
        onClick={handleGoogleLogin}
      >
        <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
          <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
        </svg>
        Google
      </Button>
    </div>
  );
}

export default function page() {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row">
      
      {/* display login form in left for Service Provider */}
      <div className="flex-1 flex items-center justify-center p-8 bg-slate-50 dark:bg-slate-950">
        <div className="w-full max-w-md flex flex-col gap-8">
          <div className="flex justify-center md:justify-start">
            <Link
              href="/"
              className="text-2xl font-bold tracking-tighter text-slate-900 dark:text-white"
            >
              Service<span className="text-blue-600">Link</span>
            </Link>
          </div>
          <div className="flex flex-col gap-2 text-center md:text-left">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Provider Portal Login</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Welcome back! Please enter your details to manage your teaching profile.
            </p>
          </div>
          
          <Suspense fallback={<div className="flex justify-center p-8"><Loader2 className="animate-spin text-slate-900 dark:text-white" /></div>}>
            <ProviderLoginForm />
          </Suspense>
          
          <div className="text-center text-sm text-slate-500 dark:text-slate-400">
            Don&apos;t have a provider account?{" "}
            <Link href="/serviceprovider/signup" className="text-slate-900 dark:text-white hover:underline font-medium underline-offset-4">
              Apply to Teach
            </Link>
          </div>
        </div>
      </div>

      {/* display image in right  */}
      <div className="hidden md:flex flex-1 flex-col justify-center items-center p-12 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-900 opacity-90 z-10" />
        <Image
          className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
          src={loginpageimage}
          alt="background"
          fill
          priority
        />
        <div className="relative z-20 max-w-lg text-center space-y-6">
          <h2 className="text-4xl font-bold leading-tight">Empower the next generation of learners</h2>
          <p className="text-lg text-slate-300">
            Join our platform to reach thousands of students globally. Manage your schedule, set your rates, and teach what you love.
          </p>
        </div>
      </div>

    </div>
  );
}
