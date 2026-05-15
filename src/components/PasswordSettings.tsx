"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { API_URLS } from "@/services/urls";

export default function PasswordSettings() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage({ text: "New passwords do not match", type: "error" });
      return;
    }

    setIsLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const token = localStorage.getItem("token") || localStorage.getItem("admin_token");
      const response = await fetch(API_URLS.USER.CHANGE_PASSWORD, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          old_password: oldPassword,
          new_password: newPassword
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "Failed to update password");

      setMessage({ text: "Password updated successfully!", type: "success" });
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setMessage({ text: err.message, type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm mt-8">
      <h2 className="text-xl font-bold mb-6">Security Settings</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Update your password to keep your account secure. If you joined via Google, you can set a local password here.
      </p>

      <form className="space-y-4 max-w-md" onSubmit={handleChangePassword}>
        <div className="space-y-2">
          <label className="text-sm font-medium">Current Password</label>
          <Input 
            type="password" 
            placeholder="Required if setting a new password" 
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">New Password</label>
          <Input 
            type="password" 
            placeholder="Min. 8 characters" 
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Confirm New Password</label>
          <Input 
            type="password" 
            placeholder="Repeat new password" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {message.text && (
          <p className={`text-sm ${message.type === "error" ? "text-red-500" : "text-green-500"}`}>
            {message.text}
          </p>
        )}

        <Button type="submit" disabled={isLoading} className="mt-2">
          {isLoading ? "Updating..." : "Update Password"}
        </Button>
      </form>
    </div>
  );
}
