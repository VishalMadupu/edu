"use client";

import Image from "next/image";

import loginpageimage from "../../../../../public/images/loginpage.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function page() {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row">
      
      {/* display login form in left for Service Provider */}
      <div className="flex-1 flex items-center justify-center p-8 bg-slate-50 dark:bg-slate-950">
        <div className="w-full max-w-md flex flex-col gap-8">   
          <div className="flex flex-col gap-2 text-center md:text-left">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Provider Portal Login</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Welcome back! Please enter your details to manage your teaching profile.
            </p>
          </div>
          
          <form className="flex flex-col gap-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Input 
                  id="email"
                  type="email" 
                  placeholder="name@example.com" 
                  required 
                  className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                />
              </div>
              <div className="grid gap-2">
                <Input 
                  id="password"
                  type="password" 
                  placeholder="Password" 
                  required 
                  className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                />
              </div>
            </div>
            <Button type="submit" className="w-full mt-2 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200">
              Login to Dashboard
            </Button>
          </form>
          
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
