"use client";

import DashboardLayout from "@/components/DashboardLayout";
import PasswordSettings from "@/components/PasswordSettings";

export default function StudentSecurity() {
  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Account Security</h1>
          <p className="text-slate-500 mt-2">Manage your password and protect your account.</p>
        </div>
        
        <PasswordSettings />
      </div>
    </DashboardLayout>
  );
}
