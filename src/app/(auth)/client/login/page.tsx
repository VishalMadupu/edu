"use client";

import Image from "next/image";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import loginpageimage from "../../../../../public/images/loginpage.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ClientService } from "@/services/client";
import { Eye, EyeOff, Loader2, Mail, Lock, Info, Check, X } from "lucide-react";
import Link from "next/link";

const GoogleIcon = () => (
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
);

const AppleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="black">
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.24-.7 3.59-.71 1.58-.06 2.81.56 3.61 1.76-3.11 1.85-2.58 6.11.36 7.36-.69 1.48-1.57 2.87-2.64 3.76zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.39 2.4-2.06 4.38-3.74 4.25z" />
  </svg>
);

function ClientLoginContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("signup") === "success") {
      setSuccessMsg("Signup successful! Please login with your credentials.");
    }
  }, [searchParams]);

  const handleGoogleLogin = () => {
    ClientService.oauthLogin("google");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccessMsg("");

    try {
      const response = await ClientService.login({ email, password });
      if (response.success && response.data) {
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("user_role", "client");
        setShowSuccessModal(true);
        setTimeout(() => {
          router.push("/client/dashboard");
        }, 1500);
      } else {
        setError(response.message || "Your username or password is incorrect");
      }
    } catch (err: any) {
      setError("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F8F9FB] flex">
      {/* display image in left */}
      <div className="hidden md:block w-1/2 p-4 lg:p-6 h-screen">
        <div className="relative w-full h-full rounded-[40px] overflow-hidden shadow-sm">
          <Image
            className="object-cover"
            src={loginpageimage}
            alt="login background"
            fill
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

          <div className="absolute top-8 right-10 flex items-center gap-3 text-white">
            <div className="relative w-7 h-7">
              <svg
                viewBox="0 0 24 24"
                fill="white"
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 2H14V10H22V14H14V22H10V14H2V10H10V2Z"
                  fill="white"
                />
              </svg>
            </div>
            <span className="text-[22px] font-bold tracking-wide">
              ServiceLink
            </span>
          </div>

          <div className="absolute bottom-12 left-12 right-12 text-white">
            <h2 className="text-[40px] leading-[1.1] font-bold mb-4 max-w-[400px]">
              Unlock your learning potential with ServiceLink
            </h2>
            <p className="text-gray-300 text-[15px] max-w-[460px] leading-relaxed">
              Join our platform to access top-tier service providers globally.
              Manage your learning schedule and track your progress
              effortlessly.
            </p>
          </div>
        </div>
      </div>

      {/* display login form in right */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-[#F8F9FB] relative">
        <div className="absolute top-8 left-8 md:top-10 md:left-12">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-[#5D5FEF] rounded-lg flex items-center justify-center shadow-md group-hover:bg-[#4b4dc4] transition-colors">
              <svg
                viewBox="0 0 24 24"
                fill="white"
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 2H14V10H22V14H14V22H10V14H2V10H10V2Z"
                  fill="white"
                />
              </svg>
            </div>
            <span className="text-[22px] font-bold tracking-tight text-slate-900">
              ServiceLink
            </span>
          </Link>
        </div>

        <div className="w-full max-w-[440px] flex flex-col mt-16 md:mt-0">
          <div className="flex flex-col gap-2 text-center mb-10">
            <h1 className="text-[32px] font-bold tracking-tight text-slate-900">
              Client Login
            </h1>
            <p className="text-[15px] text-gray-500">
              Enter your credentials to access your account
            </p>
          </div>

          <div className="flex gap-4 mb-6">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex-1 flex items-center justify-center gap-2 h-[48px] bg-white border border-gray-200 rounded-[14px] text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
            >
              <GoogleIcon /> Sign in with Google
            </button>
            <button
              type="button"
              className="flex-1 flex items-center justify-center gap-2 h-[48px] bg-white border border-gray-200 rounded-[14px] text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
            >
              <AppleIcon /> Sign in with Apple
            </button>
          </div>

          <div className="relative flex items-center py-4 mb-6">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink-0 mx-4 text-gray-400 text-xs font-medium">
              Or Sign in with
            </span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          {error && (
            <div className="bg-[#FEF2F2] border border-[#FECACA] text-[#EF4444] px-4 py-3 rounded-[12px] text-[13px] flex items-center gap-2 mb-4 shadow-sm">
              <Info className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="bg-[#ECFDF5] border border-[#A7F3D0] text-[#10B981] px-4 py-3 rounded-[12px] text-[13px] flex items-center gap-2 mb-4 shadow-sm">
              <Check className="w-4 h-4 flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <form className="flex flex-col gap-5" onSubmit={handleLogin}>
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-semibold text-gray-700 ml-1">
                Email or Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-[18px] w-[18px] text-gray-400" />
                </div>
                <Input
                  id="email"
                  type="text"
                  placeholder="Input your email or username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className={`pl-11 h-[52px] rounded-[14px] bg-white border-gray-200 focus-visible:ring-[#5D5FEF] text-[15px] shadow-sm ${error ? "border-[#EF4444] bg-[#FEF2F2]/50" : ""}`}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-semibold text-gray-700 ml-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-[18px] w-[18px] text-gray-400" />
                </div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Input your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className={`pl-11 pr-12 h-[52px] rounded-[14px] bg-white border-gray-200 focus-visible:ring-[#5D5FEF] text-[15px] shadow-sm ${error ? "border-[#EF4444] bg-[#FEF2F2]/50" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mt-2 mb-2 px-1">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="rounded border-gray-300 text-[#5D5FEF] focus:ring-[#5D5FEF] w-[18px] h-[18px] cursor-pointer"
                />
                <label
                  htmlFor="remember"
                  className="text-[13px] text-gray-500 cursor-pointer font-medium"
                >
                  Remember me
                </label>
              </div>
              <Link
                href="#"
                className="text-[13px] text-gray-500 hover:text-gray-800 font-medium transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full h-[52px] mt-2 rounded-[14px] bg-[#5D5FEF] hover:bg-[#4b4dc4] text-white font-semibold text-[15px] shadow-md transition-all"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>

            <p className="text-center text-[13px] text-gray-500 mt-2">
              Don't have an account?{" "}
              <Link
                href="/client/signup"
                className="text-[#5D5FEF] font-semibold hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
          <div className="bg-white rounded-[32px] p-10 max-w-[420px] w-full mx-4 flex flex-col items-center text-center shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="w-[88px] h-[88px] bg-[#e6f8f3] rounded-full flex items-center justify-center mb-6">
              <div className="w-[60px] h-[60px] bg-[#34d399] rounded-full flex items-center justify-center shadow-lg shadow-[#34d399]/30">
                <Check className="w-7 h-7 text-white stroke-[3]" />
              </div>
            </div>
            <h2 className="text-[26px] font-bold text-gray-900 mb-3 tracking-tight">
              Login Successful
            </h2>
            <p className="text-[15px] text-gray-500 mb-8 px-4 leading-relaxed">
              Welcome back to ServiceLink! We are redirecting you to your
              dashboard.
            </p>
            <Button
              className="w-full h-[52px] bg-[#5D5FEF] hover:bg-[#4b4dc4] text-white rounded-[14px] font-semibold text-[16px] shadow-md transition-all"
              onClick={() => router.push("/client/dashboard")}
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full flex items-center justify-center bg-[#F8F9FB]">
          <Loader2 className="animate-spin text-[#5D5FEF] w-8 h-8" />
        </div>
      }
    >
      <ClientLoginContent />
    </Suspense>
  );
}
