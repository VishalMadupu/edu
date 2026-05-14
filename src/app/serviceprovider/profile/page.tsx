"use client";

import DashboardLayout from "@/components/DashboardLayout";
import ProfileForm from "@/components/ProfileForm";

export default function ServiceProviderProfile() {
  return (
    <DashboardLayout role="serviceprovider">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Provider Profile Settings</h1>
          <p className="text-muted-foreground mt-2">Manage your public profile, rates, and contact details.</p>
        </div>
        
        <ProfileForm role="serviceprovider" />
      </div>
    </DashboardLayout>
  );
}
