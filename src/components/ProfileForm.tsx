import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Loader2, CheckCircle2, Sparkles, Camera, User as UserIcon } from "lucide-react";
import { API_URLS } from "@/services/urls";
import Image from "next/image";

interface ProfileFormProps {
  role: "student" | "tutor" | "client" | "serviceprovider"; // Support both for compatibility
}

export default function ProfileForm({ role }: ProfileFormProps) {
  const isTutor = role === "tutor" || role === "serviceprovider";
  
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    bio: "",
    hourly_rate: 0,
    specialization: "",
    profile_image: ""
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
          specialization: data.specialization || "",
          profile_image: data.profile_image || ""
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

  if (isLoading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-blue-600" /></div>;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-10 border-b border-slate-100 dark:border-slate-800">
        <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <div className="relative group">
            <div className="w-24 h-24 rounded-3xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center overflow-hidden border-2 border-dashed border-blue-200 dark:border-blue-800 group-hover:border-blue-500 transition-colors">
              {formData.profile_image ? (
                <Image src={formData.profile_image} alt="Profile" fill className="object-cover" />
              ) : (
                <UserIcon className="w-10 h-10 text-blue-300 dark:text-blue-700" />
              )}
            </div>
            <button className="absolute -bottom-2 -right-2 p-2 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-colors">
              <Camera size={16} />
            </button>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              {formData.first_name ? `${formData.first_name} ${formData.last_name}` : formData.username || "Update Your Profile"}
            </h2>
            <p className="text-slate-500 mt-1">{formData.email}</p>
            <div className="mt-2 inline-flex px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
              {role} Account
            </div>
          </div>
        </div>

        {message.text && (
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
            {message.type === 'success' && <CheckCircle2 size={16} />}
            {message.text}
          </div>
        )}
      </div>
      
      <form className="space-y-8" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Username</label>
            <Input name="username" value={formData.username} onChange={handleInputChange} className="h-11 rounded-xl" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Email (Primary ID)</label>
            <Input value={formData.email} disabled className="h-11 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-500" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">First Name</label>
            <Input name="first_name" value={formData.first_name} onChange={handleInputChange} className="h-11 rounded-xl" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Last Name</label>
            <Input name="last_name" value={formData.last_name} onChange={handleInputChange} className="h-11 rounded-xl" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Phone Number</label>
            <Input name="phone_number" type="tel" value={formData.phone_number} onChange={handleInputChange} placeholder="+1 (555) 000-0000" className="h-11 rounded-xl" />
          </div>
          
          {isTutor && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Hourly Tutoring Rate ($)</label>
                <Input name="hourly_rate" type="number" value={formData.hourly_rate} onChange={handleInputChange} className="h-11 rounded-xl" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Subject Specialization</label>
                <Input name="specialization" value={formData.specialization} onChange={handleInputChange} placeholder="e.g. Mathematics, Computer Science" className="h-11 rounded-xl" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <div className="flex items-center justify-between mb-1">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Teacher Biography</label>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleAiBio}
                    disabled={isAiLoading}
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 h-8 px-3 rounded-full text-xs font-bold flex gap-1.5 transition-all"
                  >
                    {isAiLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5" />}
                    Optimize with Gemini AI
                  </Button>
                </div>
                <textarea 
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="flex min-h-[160px] w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-transparent px-4 py-3 text-sm shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-900"
                  placeholder="Tell your students about your experience, teaching style, and what they can expect to learn..."
                />
              </div>
            </>
          )}
        </div>
        
        <div className="flex justify-end gap-4 border-t border-slate-100 dark:border-slate-800 pt-8 mt-4">
          <Button variant="outline" type="button" onClick={fetchProfile} disabled={isSaving} className="rounded-xl h-11 px-6">
            Discard Changes
          </Button>
          <Button type="submit" disabled={isSaving} className="bg-blue-600 hover:bg-blue-700 rounded-xl h-11 px-8 shadow-lg shadow-blue-600/20">
            {isSaving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : "Save Profile Settings"}
          </Button>
        </div>
      </form>
    </div>
  );
}
