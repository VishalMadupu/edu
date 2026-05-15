"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function CallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const role = searchParams.get("role");

    if (token && role) {
      // Store token and role
      localStorage.setItem("token", token);
      localStorage.setItem("user_role", role);

      // Redirect to appropriate dashboard
      if (role === "client") {
        router.push("/client/dashboard");
      } else if (role === "provider") {
        router.push("/serviceprovider/dashboard");
      } else {
        router.push("/");
      }
    } else {
      // Handle error or missing params
      console.error("Missing token or role in OAuth callback");
      router.push("/login");
    }
  }, [router, searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Authenticating...</h2>
        <p className="text-muted-foreground">Please wait while we complete your login.</p>
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <CallbackHandler />
    </Suspense>
  );
}
