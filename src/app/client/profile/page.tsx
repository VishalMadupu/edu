"use client";

import DashboardLayout from "@/components/DashboardLayout";
import ProfileForm from "@/components/ProfileForm";
import PasswordSettings from "@/components/PasswordSettings";

export default function ClientProfile() {
  return (
    <DashboardLayout role="client">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
          <p className="text-muted-foreground mt-2">Manage your account details and preferences.</p>
        </div>
        
        <ProfileForm role="client" />
        <PasswordSettings />
      </div>
    </DashboardLayout>
  );
}
