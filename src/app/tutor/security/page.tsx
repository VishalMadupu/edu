"use client";

import DashboardLayout from "@/components/DashboardLayout";
import PasswordSettings from "@/components/PasswordSettings";

export default function TutorSecurity() {
  return (
    <DashboardLayout role="tutor">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Teacher Security</h1>
          <p className="text-slate-500 mt-2">Manage your password and protect your teaching account.</p>
        </div>
        
        <PasswordSettings />
      </div>
    </DashboardLayout>
  );
}
