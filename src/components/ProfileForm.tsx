"use client";

import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface ProfileFormProps {
  role: "client" | "serviceprovider";
  initialData?: any;
}

export default function ProfileForm({ role, initialData }: ProfileFormProps) {
  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-bold mb-6">Profile Information</h2>
      
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">First Name</label>
            <Input defaultValue="Jane" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Last Name</label>
            <Input defaultValue="Doe" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email Address</label>
            <Input type="email" defaultValue="jane.doe@example.com" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Phone Number</label>
            <Input type="tel" defaultValue="+1 (555) 000-0000" />
          </div>
          
          {role === "serviceprovider" && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium">Hourly Rate ($)</label>
                <Input type="number" defaultValue="50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Specialization</label>
                <Input defaultValue="Mathematics & Physics" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Bio</label>
                <textarea 
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue="Experienced tutor with over 10 years of teaching high school mathematics and physics."
                />
              </div>
            </>
          )}
        </div>
        
        <div className="flex justify-end gap-4 border-t pt-6 mt-6">
          <Button variant="outline" type="button">Cancel</Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  );
}
