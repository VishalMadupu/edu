"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { DollarSign, Users, CalendarCheck, Star } from "lucide-react";

export default function ServiceProviderDashboard() {
  return (
    <DashboardLayout role="serviceprovider">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Provider Dashboard</h1>
          <p className="text-muted-foreground mt-2">Here is a summary of your teaching activity.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="Total Earnings" 
            value="$1,240.00" 
            icon={<DollarSign className="h-5 w-5 text-green-500" />} 
          />
          <StatCard 
            title="Active Clients" 
            value="12" 
            icon={<Users className="h-5 w-5 text-blue-500" />} 
          />
          <StatCard 
            title="Sessions this week" 
            value="8" 
            icon={<CalendarCheck className="h-5 w-5 text-purple-500" />} 
          />
          <StatCard 
            title="Average Rating" 
            value="4.8" 
            icon={<Star className="h-5 w-5 text-yellow-500" />} 
          />
        </div>

        {/* Recent Activity */}
        <div className="bg-card border rounded-2xl p-6 shadow-sm mt-8">
          <h2 className="text-xl font-bold mb-4">Upcoming Appointments</h2>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-xl hover:bg-muted/50 transition-colors gap-4 sm:gap-0">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    A
                  </div>
                  <div>
                    <h3 className="font-semibold">Algebra 101 - Exam Prep</h3>
                    <p className="text-sm text-muted-foreground">with Alice Johnson</p>
                  </div>
                </div>
                <div className="flex flex-col sm:items-end">
                  <span className="text-sm font-medium">Tomorrow, 10:00 AM</span>
                  <span className="text-xs text-muted-foreground">1 hour session</span>
                </div>
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
