import MarketingNavbar from "@/components/MarketingNavbar";
import Footer from "@/components/Footer";
import { CheckCircle2, GraduationCap } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <MarketingNavbar />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-slate-900 text-white py-24 px-6 lg:px-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 blur-[100px] -z-0" />
          <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
              <GraduationCap size={16} />
              Future of Education
            </div>
            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight">
              About Ed<span className="text-blue-600">tech</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              We are on a mission to democratize elite education by connecting 
              ambitious learners with world-class mentors through AI-enhanced experiences.
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-5xl mx-auto px-6 py-16 lg:py-24 space-y-24">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                Our Story
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                Edtech was founded with a simple idea: high-quality learning should be accessible to everyone, regardless of where they are. We recognized the gap between talented educators and students seeking specialized skills, and we built a platform that bridges that gap using cutting-edge technology.
              </p>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                Today, we empower thousands of tutors to build their own digital teaching brands and help students around the globe master the skills they need for the future.
              </p>
            </div>
            <div className="bg-blue-600 rounded-[40px] p-1 shadow-2xl shadow-blue-500/20">
               <div className="bg-white dark:bg-slate-900 rounded-[38px] p-8 aspect-square flex items-center justify-center border-8 border-slate-50 dark:border-slate-800">
                <div className="text-blue-600 dark:text-blue-400 text-center space-y-2">
                  <div className="text-6xl font-black tracking-tighter">10k+</div>
                  <div className="text-xl font-bold uppercase tracking-widest opacity-60">Active Students</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-12">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white text-center tracking-tight">
              The Edtech Edge
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Vetted Educators", desc: "Every tutor is screened for expertise and teaching quality." },
                { title: "AI-Powered Insights", desc: "Personalized course recommendations and learning paths." },
                { title: "Global Classroom", desc: "Learn from industry leaders across the globe in real-time." },
                { title: "Interactive Content", desc: "Rich video tutorials, quizzes, and project-based learning." },
                { title: "Verified Certificates", desc: "Boost your resume with industry-recognized credentials." },
                { title: "24/7 Mentorship", desc: "Access support and community forums whenever you need." },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="group p-8 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 hover:border-blue-500 transition-all hover:shadow-xl hover:shadow-blue-500/5"
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                    <CheckCircle2 className="text-blue-600 group-hover:text-white w-6 h-6 transition-colors" />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
