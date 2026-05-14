"use client";

import Image from "next/image";

import loginpageimage from "../../../../../public/images/loginpage.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function page() {


  return (
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2">
      {/* display login form in right */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md flex flex-col gap-8">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <h1 className="text-3xl font-bold tracking-tight">Client SignUp</h1>
            <p className="text-sm text-muted-foreground">
              Enter your credentials to access your account
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
                />
              </div>
              <div className="grid gap-2">
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  required
                />
              </div>
              <div>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="confirm-password"
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full mt-2">
              SignUp
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/client/login"
              className="text-primary hover:underline underline-offset-4"
            >
              Login
            </Link>
          </div>
          <div>
            <Button className="w-full mt-2">
              Sign Up with Google
            </Button>
          </div>
        </div>
      </div>

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
    </div>
  );
}
