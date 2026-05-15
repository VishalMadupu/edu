"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import loginpageimage from "../../../../../public/images/loginpage.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { adminService } from "@/services/admin";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await adminService.login({ email, password });
      // Store token in localStorage or a better state management solution
      localStorage.setItem("admin_token", response.token);
      localStorage.setItem("user_role", "admin");
      router.push("/admin/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed");
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
          <div className="flex flex-col gap-2 text-center md:text-left">
            <h1 className="text-3xl font-bold tracking-tight">SuperAdmin Login</h1>
            <p className="text-sm text-muted-foreground">
              Administrative access only
            </p>
          </div>
          
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
                />
              </div>
              <div className="grid gap-2">
                <Input 
                  id="password"
                  type="password" 
                  placeholder="Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full mt-2" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login as Admin"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
