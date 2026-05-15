"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { adminService } from "@/services/admin";
import { Button } from "@/components/ui/button";
import { Loader2, Users, Briefcase, Mail, Phone, User as UserIcon, Settings as SettingsIcon } from "lucide-react";
import PasswordSettings from "@/components/PasswordSettings";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [clients, setClients] = useState<any[]>([]);
  const [providers, setProviders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"clients" | "providers" | "settings">("clients");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    const role = localStorage.getItem("user_role");

    if (!token || role !== "admin") {
      router.push("/admin/login");
      return;
    }

    const fetchData = async () => {
      try {
        const [statsData, clientsData, providersData] = await Promise.all([
          adminService.getStats(token),
          adminService.listClients(token),
          adminService.listProviders(token)
        ]);
        
        setStats(statsData);
        setClients(clientsData || []);
        setProviders(providersData || []);
      } catch (err: any) {
        setError(err.message || "Failed to load dashboard data");
        if (err.message.includes("401") || err.message.includes("403")) {
          router.push("/admin/login");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("user_role");
    router.push("/admin/login");
  };

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-muted-foreground animate-pulse">Analyzing platform data...</p>
    </div>
  );

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Control Center</h1>
          <p className="text-muted-foreground mt-1">Real-time platform analytics and user management.</p>
        </div>
        <Button variant="destructive" onClick={handleLogout}>Logout</Button>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total Clients" 
          value={stats?.total_clients || 0} 
          icon={<Users className="text-blue-500" />} 
          description="Registered learners"
        />
        <StatCard 
          title="Service Providers" 
          value={stats?.total_providers || 0} 
          icon={<UserIcon className="text-green-500" />} 
          description="Active educators"
        />
        <StatCard 
          title="Total Projects" 
          value={stats?.total_projects || 0} 
          icon={<Briefcase className="text-purple-500" />} 
          description="Posted service requests"
        />
      </div>

      {/* User Management */}
      <div className="bg-card rounded-2xl border shadow-sm overflow-hidden">
        <div className="flex border-b">
          <button 
            onClick={() => setActiveTab("clients")}
            className={`px-6 py-4 text-sm font-medium transition-colors ${activeTab === "clients" ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-foreground"}`}
          >
            Manage Clients ({clients.length})
          </button>
          <button 
            onClick={() => setActiveTab("providers")}
            className={`px-6 py-4 text-sm font-medium transition-colors ${activeTab === "providers" ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-foreground"}`}
          >
            Manage Providers ({providers.length})
          </button>
          <button 
            onClick={() => setActiveTab("settings")}
            className={`px-6 py-4 text-sm font-medium transition-colors ${activeTab === "settings" ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-foreground"}`}
          >
            <div className="flex items-center gap-2">
              <SettingsIcon size={16} />
              Platform Settings
            </div>
          </button>
        </div>

        <div className="p-0 overflow-x-auto">
          {activeTab === "settings" ? (
            <div className="p-8 max-w-2xl">
              <PasswordSettings />
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted/50 text-xs uppercase tracking-wider">
                  <th className="px-6 py-4 font-semibold">User</th>
                  <th className="px-6 py-4 font-semibold">Contact Details</th>
                  <th className="px-6 py-4 font-semibold">Profile Info</th>
                  <th className="px-6 py-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {(activeTab === "clients" ? clients : providers).map((user: any) => (
                  <tr key={user.id} className="hover:bg-muted/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                          {(user.first_name?.[0] || user.username?.[0] || "?").toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{user.first_name} {user.last_name || user.username}</p>
                          <p className="text-xs text-muted-foreground">ID: #{user.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs">
                          <Mail size={14} className="text-muted-foreground" />
                          <span>{user.email}</span>
                        </div>
                        {user.phone_number && (
                          <div className="flex items-center gap-2 text-xs">
                            <Phone size={14} className="text-muted-foreground" />
                            <span>{user.phone_number}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs truncate text-xs text-muted-foreground">
                        {activeTab === "providers" ? (
                          <>
                            <span className="font-medium text-foreground">{user.specialization || "General"}</span>
                            <span className="mx-2">•</span>
                            <span>${user.hourly_rate || 0}/hr</span>
                          </>
                        ) : (
                          user.bio || "No bio provided"
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100">View Details</Button>
                    </td>
                  </tr>
                ))}
                {(activeTab === "clients" ? clients : providers).length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground italic">
                      No users found in this category.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, description }: { title: string, value: any, icon: React.ReactNode, description: string }) {
  return (
    <div className="bg-card p-6 rounded-2xl border shadow-sm flex flex-col gap-1">
      <div className="flex justify-between items-start mb-2">
        <div className="p-2 bg-muted rounded-xl">{icon}</div>
        <span className="text-2xl font-bold">{value}</span>
      </div>
      <p className="font-semibold text-sm">{title}</p>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
}
