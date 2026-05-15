"use client";

import Image from "next/image";

import loginpageimage from "../../../../../public/images/loginpage.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ClientService } from "@/services/client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Suspense } from "react";

function LoginForm() {
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
  }, [searchParams]);

  const handleGoogleLogin = () => {
    ClientService.oauthLogin('google');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setIsLoading(true);
    
    try {
      const response = await ClientService.login({ email, password });
      if (response.success && response.data) {
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("user_role", "client");
        router.push("/client/dashboard");
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
              id="username"
              type="text" 
              placeholder="Username or Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              disabled={isLoading}
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
              className="pr-10"
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
        <Button type="submit" className="w-full mt-2" disabled={isLoading}>
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

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <Button 
        variant="outline" 
        type="button" 
        className="w-full"
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
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2">
      {/* display image in left  */}
      <div className="hidden md:flex flex-col justify-center items-center p-8 bg-muted/20 relative">
        <Image
          className="w-full max-w-md h-auto object-cover rounded-2xl shadow-xl"
          src={loginpageimage}
          alt="women with thumbsup symbol"
          width={400}
          height={600}
          priority
        />
      </div>

      {/* display login form in right */}
      <div className="flex items-center justify-center p-8">
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
            <h1 className="text-3xl font-bold tracking-tight">Client Login</h1>
            <p className="text-sm text-muted-foreground">
              Enter your credentials to access your account
            </p>
          </div>
          
          <Suspense fallback={<div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>}>
            <LoginForm />
          </Suspense>
          
          <div className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/client/signup" className="text-primary hover:underline underline-offset-4">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
