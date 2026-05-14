"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { BookOpen, Clock, Star, TrendingUp } from "lucide-react";

export default function ClientDashboard() {
  return (
    <DashboardLayout role="client">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, Jane!</h1>
          <p className="text-muted-foreground mt-2">Here's what's happening with your learning journey.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="Total Sessions" 
            value="24" 
            icon={<BookOpen className="h-5 w-5 text-blue-500" />} 
          />
          <StatCard 
            title="Hours Learned" 
            value="36.5" 
            icon={<Clock className="h-5 w-5 text-green-500" />} 
          />
          <StatCard 
            title="Avg Rating Given" 
            value="4.9" 
            icon={<Star className="h-5 w-5 text-yellow-500" />} 
          />
          <StatCard 
            title="Progress Score" 
            value="92%" 
            icon={<TrendingUp className="h-5 w-5 text-purple-500" />} 
          />
        </div>

        {/* Recent Activity */}
        <div className="bg-card border rounded-2xl p-6 shadow-sm mt-8">
          <h2 className="text-xl font-bold mb-4">Recent Sessions</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-xl hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    M
                  </div>
                  <div>
                    <h3 className="font-semibold">Advanced Mathematics</h3>
                    <p className="text-sm text-muted-foreground">with Mr. Smith • 2 days ago</p>
                  </div>
                </div>
                <div className="text-sm font-medium">1.5 hrs</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatCard({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) {
  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        <div className="p-2 bg-muted rounded-lg">{icon}</div>
      </div>
      <div className="text-3xl font-bold">{value}</div>
    </div>
  );
}
