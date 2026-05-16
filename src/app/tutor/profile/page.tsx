"use client";

import DashboardLayout from "@/components/DashboardLayout";
import ProfileForm from "@/components/ProfileForm";

export default function TutorProfile() {
  return (
    <DashboardLayout role="tutor">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tutor Profile Settings</h1>
          <p className="text-muted-foreground mt-2">Manage your teaching biography, subject expertise, and student analytics.</p>
        </div>
        
        <ProfileForm role="tutor" />
      </div>
    </DashboardLayout>
  );
}
