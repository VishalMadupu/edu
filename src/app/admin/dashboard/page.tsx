"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { adminService } from "@/services/admin";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    const role = localStorage.getItem("user_role");

    if (!token || role !== "admin") {
      router.push("/admin/login");
      return;
    }

    const fetchStats = async () => {
      try {
        const data = await adminService.getStats(token);
        setStats(data);
      } catch (err: any) {
        setError(err.message || "Failed to load stats");
        if (err.message.includes("401") || err.message.includes("403")) {
          router.push("/admin/login");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("user_role");
    router.push("/admin/login");
  };

  if (isLoading) return <div className="p-8">Loading dashboard...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Platform Overview</h1>
        <Button variant="outline" onClick={handleLogout}>Logout</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-card p-6 rounded-xl border shadow-sm">
          <p className="text-muted-foreground text-sm uppercase tracking-wider mb-2">Total Clients</p>
          <p className="text-4xl font-bold">{stats?.total_clients || 0}</p>
        </div>
        <div className="bg-card p-6 rounded-xl border shadow-sm">
          <p className="text-muted-foreground text-sm uppercase tracking-wider mb-2">Service Providers</p>
          <p className="text-4xl font-bold">{stats?.total_providers || 0}</p>
        </div>
        <div className="bg-card p-6 rounded-xl border shadow-sm">
          <p className="text-muted-foreground text-sm uppercase tracking-wider mb-2">Posted Works</p>
          <p className="text-4xl font-bold">{stats?.total_projects || 0}</p>
        </div>
      </div>

      <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-muted/50">
          <h2 className="font-semibold">Recent Platform Activity</h2>
        </div>
        <div className="p-8 text-center text-muted-foreground">
          Detailed logs and user management tables will appear here.
        </div>
      </div>
    </div>
  );
}
