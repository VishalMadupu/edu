import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Loader2, CheckCircle2 } from "lucide-react";
import { API_URLS } from "@/services/urls";

interface ProfileFormProps {
  role: "client" | "provider";
}

export default function ProfileForm({ role }: ProfileFormProps) {
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    bio: "",
    hourly_rate: 0,
    specialization: ""
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token") || localStorage.getItem("admin_token");
      const response = await fetch(API_URLS.USER.PROFILE, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok) {
        setFormData({
          username: data.username || "",
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          email: data.email || "",
          phone_number: data.phone_number || "",
          bio: data.bio || "",
          hourly_rate: data.hourly_rate || 0,
          specialization: data.specialization || ""
        });
      }
    } catch (error) {
      console.error("Failed to fetch profile", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const token = localStorage.getItem("token") || localStorage.getItem("admin_token");
      const response = await fetch(API_URLS.USER.UPDATE_PROFILE, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setMessage({ type: "success", text: "Profile updated successfully!" });
      } else {
        setMessage({ type: "error", text: "Failed to update profile." });
      }
    } catch (error) {
      setMessage({ type: "error", text: "An error occurred while saving." });
    } finally {
      setIsSaving(false);
    }
  };

  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleAiBio = async () => {
    if (!formData.bio && !formData.specialization) {
      setMessage({ type: "error", text: "Please enter some details in bio or specialization first." });
      return;
    }
    
    setIsAiLoading(true);
    try {
      const response = await fetch("/api/ai/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: "Enhance my professional teacher bio to be more engaging for students.",
          context: `Current Bio: ${formData.bio}\nSpecialization: ${formData.specialization}\nName: ${formData.first_name} ${formData.last_name}`
        })
      });
      const data = await response.json();
      if (data.result) {
        setFormData(prev => ({ ...prev, bio: data.result }));
        setMessage({ type: "success", text: "Bio enhanced with AI!" });
      } else {
        setMessage({ type: "error", text: data.error || "AI enhancement failed." });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to connect to AI service." });
    } finally {
      setIsAiLoading(false);
    }
  };

  if (isLoading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Profile Information</h2>
        {message.text && (
          <div className={`flex items-center gap-2 text-sm ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
            {message.type === 'success' && <CheckCircle2 size={16} />}
            {message.text}
          </div>
        )}
      </div>
      
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Username</label>
            <Input name="username" value={formData.username} onChange={handleInputChange} />
          </div>
          <div className="space-y-2 text-muted-foreground">
            <label className="text-sm font-medium">Email (Account ID)</label>
            <Input value={formData.email} disabled className="bg-muted/50" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">First Name</label>
            <Input name="first_name" value={formData.first_name} onChange={handleInputChange} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Last Name</label>
            <Input name="last_name" value={formData.last_name} onChange={handleInputChange} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Phone Number</label>
            <Input name="phone_number" type="tel" value={formData.phone_number} onChange={handleInputChange} placeholder="+1 (555) 000-0000" />
          </div>
          
          {role === "provider" && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium">Hourly Rate ($)</label>
                <Input name="hourly_rate" type="number" value={formData.hourly_rate} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Specialization</label>
                <Input name="specialization" value={formData.specialization} onChange={handleInputChange} placeholder="e.g. Mathematics, Piano" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Bio</label>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleAiBio}
                    disabled={isAiLoading}
                    className="text-blue-600 hover:text-blue-700 h-7 text-xs flex gap-1"
                  >
                    {isAiLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : "✨ Enhance with AI"}
                  </Button>
                </div>
                <textarea 
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Tell students about your experience..."
                />
              </div>
            </>
          )}
        </div>
        
        <div className="flex justify-end gap-4 border-t pt-6 mt-6">
          <Button variant="outline" type="button" onClick={fetchProfile} disabled={isSaving}>Discard Changes</Button>
          <Button type="submit" disabled={isSaving}>
            {isSaving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
