"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import loginpageimage from "../../../../../public/images/loginpage.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { adminService } from "@/services/admin";
import { Eye, EyeOff, Loader2, Mail, Lock, Info, Check, X, GraduationCap } from "lucide-react";
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

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await adminService.login({ email, password });
      if (response.success && response.data) {
        localStorage.setItem("admin_token", response.data.access_token);
        localStorage.setItem("user_role", "admin");
        setShowSuccessModal(true);
        setTimeout(() => {
          router.push("/admin/dashboard");
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
      {/* display image in left  */}
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

          {/* Logo Top Right */}
          <div className="absolute top-8 right-10 flex items-center gap-3 text-white">
            <div className="relative w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-[22px] font-bold tracking-tight text-white">
              Ed<span className="text-blue-400">tech</span>
            </span>
          </div>

          {/* Text Bottom */}
          <div className="absolute bottom-12 left-12 right-12 text-white">
            <h2 className="text-[40px] leading-[1.1] font-bold mb-4 max-w-[400px]">
              Manage your educational platform
            </h2>
            <p className="text-gray-300 text-[15px] max-w-[460px] leading-relaxed">
              Edtech admin portal allows you to monitor student progress, manage tutor applications, and oversee course quality across the platform.
            </p>
          </div>
        </div>
      </div>

      {/* display login form in right */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-[#F8F9FB] relative">
        <div className="absolute top-8 left-8 md:top-10 md:left-12">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-[22px] font-bold tracking-tight text-slate-900">
              Ed<span className="text-blue-600">tech</span>
            </span>
          </Link>
        </div>

        <div className="w-full max-w-[440px] flex flex-col mt-16 md:mt-0">
          <div className="flex flex-col gap-2 text-center mb-10">
            <h1 className="text-[32px] font-bold tracking-tight text-slate-900">
              Admin Login
            </h1>
            <p className="text-[15px] text-gray-500">
              Enter your credentials to access the management dashboard
            </p>
          </div>

          {error && (
            <div className="bg-[#FEF2F2] border border-[#FECACA] text-[#EF4444] px-4 py-3 rounded-[12px] text-[13px] flex items-center gap-2 mb-6 shadow-sm">
              <Info className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form className="flex flex-col gap-5" onSubmit={handleLogin}>
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-semibold text-gray-700 ml-1">
                Admin Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-[18px] w-[18px] text-gray-400" />
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@edtech.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className={`pl-11 h-[52px] rounded-[14px] bg-white border-gray-200 focus-visible:ring-blue-600 text-[15px] shadow-sm ${error ? "border-[#EF4444] bg-[#FEF2F2]/50" : ""}`}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-semibold text-gray-700 ml-1">
                Secret Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-[18px] w-[18px] text-gray-400" />
                </div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className={`pl-11 pr-12 h-[52px] rounded-[14px] bg-white border-gray-200 focus-visible:ring-blue-600 text-[15px] shadow-sm ${error ? "border-[#EF4444] bg-[#FEF2F2]/50" : ""}`}
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

            <Button
              type="submit"
              className="w-full h-[52px] mt-4 rounded-[14px] bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[15px] shadow-md transition-all"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Authenticating...
                </>
              ) : (
                "Enter Admin Dashboard"
              )}
            </Button>
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
            <div className="w-[88px] h-[88px] bg-blue-50 rounded-full flex items-center justify-center mb-6">
              <div className="w-[60px] h-[60px] bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-600/30">
                <Check className="w-7 h-7 text-white stroke-[3]" />
              </div>
            </div>
            <h2 className="text-[26px] font-bold text-gray-900 mb-3 tracking-tight">
              Admin Verified
            </h2>
            <p className="text-[15px] text-gray-500 mb-8 px-4 leading-relaxed">
              Platform administration tools are now unlocked. Redirecting to your dashboard...
            </p>
            <Button
              className="w-full h-[52px] bg-blue-600 hover:bg-blue-700 text-white rounded-[14px] font-semibold text-[16px] shadow-md transition-all"
              onClick={() => router.push("/admin/dashboard")}
            >
              Go to Dashboard
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
