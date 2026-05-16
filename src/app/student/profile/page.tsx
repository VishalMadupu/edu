"use client";

import DashboardLayout from "@/components/DashboardLayout";
import ProfileForm from "@/components/ProfileForm";

export default function StudentProfile() {
  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Student Profile</h1>
          <p className="text-muted-foreground mt-2">Manage your learning profile and educational preferences.</p>
        </div>
        
        <ProfileForm role="student" />
      </div>
    </DashboardLayout>
  );
}
