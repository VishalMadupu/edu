"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import loginpageimage from "../../../../../public/images/loginpage.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { adminService } from "@/services/admin";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
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
        router.push("/admin/dashboard");
      } else {
        setError(response.message || "Login failed");
      }
    } catch (err: any) {
      setError("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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
            <h1 className="text-3xl font-bold tracking-tight">SuperAdmin Login</h1>
            <p className="text-sm text-muted-foreground">
              Administrative access only
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
                    placeholder="admin@example.com" 
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
                  "Login as Admin"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
