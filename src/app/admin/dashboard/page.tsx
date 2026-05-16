"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { adminService } from "@/services/admin";
import { Button } from "@/components/ui/button";
import { Loader2, Users, BookOpen, Mail, Phone, User as UserIcon, Settings as SettingsIcon, LogOut, GraduationCap } from "lucide-react";
import PasswordSettings from "@/components/PasswordSettings";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [tutors, setTutors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"students" | "tutors" | "settings">("students");
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
        const [statsData, studentsData, tutorsData] = await Promise.all([
          adminService.getStats(token),
          adminService.listStudents(token),
          adminService.listTutors(token)
        ]);
        
        setStats(statsData);
        setStudents(studentsData || []);
        setTutors(tutorsData || []);
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

  const handleLogout = async () => {
    await adminService.logout();
    router.push("/admin/login");
  };

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-slate-50 dark:bg-slate-950">
      <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-600/20 animate-bounce">
        <GraduationCap className="text-white w-7 h-7" />
      </div>
      <p className="text-slate-500 font-medium animate-pulse">Syncing platform data...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                <GraduationCap className="text-white w-6 h-6" />
             </div>
             <div>
               <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Edtech Admin</h1>
               <p className="text-slate-500 text-sm">Platform oversight and educator management.</p>
             </div>
          </div>
          <Button variant="outline" onClick={handleLogout} className="rounded-xl border-slate-200 hover:bg-red-50 hover:text-red-600 transition-all">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard 
            title="Total Students" 
            value={stats?.total_clients || students.length || 0} 
            icon={<Users className="text-blue-600" />} 
            description="Active learners"
          />
          <StatCard 
            title="Expert Tutors" 
            value={stats?.total_providers || tutors.length || 0} 
            icon={<UserIcon className="text-indigo-600" />} 
            description="Verified educators"
          />
          <StatCard 
            title="Active Courses" 
            value={stats?.total_projects || 0} 
            icon={<BookOpen className="text-purple-600" />} 
            description="Learning content"
          />
        </div>

        {/* User Management */}
        <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="flex border-b border-slate-100 dark:border-slate-800 overflow-x-auto">
            <button 
              onClick={() => setActiveTab("students")}
              className={`px-8 py-5 text-sm font-bold transition-all whitespace-nowrap ${activeTab === "students" ? "border-b-2 border-blue-600 text-blue-600 bg-blue-50/50" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"}`}
            >
              Manage Students ({students.length})
            </button>
            <button 
              onClick={() => setActiveTab("tutors")}
              className={`px-8 py-5 text-sm font-bold transition-all whitespace-nowrap ${activeTab === "tutors" ? "border-b-2 border-blue-600 text-blue-600 bg-blue-50/50" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"}`}
            >
              Manage Tutors ({tutors.length})
            </button>
            <button 
              onClick={() => setActiveTab("settings")}
              className={`px-8 py-5 text-sm font-bold transition-all whitespace-nowrap ${activeTab === "settings" ? "border-b-2 border-blue-600 text-blue-600 bg-blue-50/50" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"}`}
            >
              <div className="flex items-center gap-2">
                <SettingsIcon size={16} />
                Global Settings
              </div>
            </button>
          </div>

          <div className="p-0 overflow-x-auto">
            {activeTab === "settings" ? (
              <div className="p-8 max-w-2xl mx-auto">
                <PasswordSettings />
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 dark:bg-slate-800/50 text-[11px] uppercase tracking-[0.1em] font-bold text-slate-500">
                    <th className="px-8 py-4">User Details</th>
                    <th className="px-8 py-4">Contact</th>
                    <th className="px-8 py-4">Specialization / Bio</th>
                    <th className="px-8 py-4 text-right">Verification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {(activeTab === "students" ? students : tutors).map((user: any) => (
                    <tr key={user.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white font-bold text-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                            {(user.first_name?.[0] || user.username?.[0] || "?").toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 dark:text-white">{user.first_name} {user.last_name || user.username}</p>
                            <p className="text-xs text-slate-400 font-medium tracking-wide">STUDENT ID: #{user.id.toString().padStart(5, '0')}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400">
                            <Mail size={14} className="text-slate-400" />
                            <span>{user.email}</span>
                          </div>
                          {user.phone_number && (
                            <div className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400">
                              <Phone size={14} className="text-slate-400" />
                              <span>{user.phone_number}</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="max-w-xs truncate text-xs font-medium text-slate-500">
                          {activeTab === "tutors" ? (
                            <div className="flex flex-col gap-1">
                              <span className="text-slate-900 dark:text-white font-bold">{user.specialization || "General Education"}</span>
                              <span>Starting at ${user.hourly_rate || 0}/hour</span>
                            </div>
                          ) : (
                            user.bio || "Learner at Edtech platform"
                          )}
                        </div>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <Button variant="ghost" size="sm" className="rounded-lg font-bold text-blue-600 hover:bg-blue-50 opacity-0 group-hover:opacity-100 transition-all">Verify User</Button>
                      </td>
                    </tr>
                  ))}
                  {(activeTab === "students" ? students : tutors).length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-8 py-20 text-center text-slate-400 font-medium italic bg-slate-50/20">
                         <div className="flex flex-col items-center gap-2">
                            <Users className="w-10 h-10 opacity-20" />
                            <span>No {activeTab} accounts registered yet.</span>
                         </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, description }: { title: string, value: any, icon: React.ReactNode, description: string }) {
  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-2 hover:scale-[1.02] transition-transform cursor-default">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl shadow-inner">{icon}</div>
        <span className="text-4xl font-black text-slate-900 dark:text-white tabular-nums tracking-tight">{value}</span>
      </div>
      <div>
        <p className="font-bold text-slate-900 dark:text-white text-sm">{title}</p>
        <p className="text-xs text-slate-500 font-medium mt-0.5">{description}</p>
      </div>
    </div>
  );
}
