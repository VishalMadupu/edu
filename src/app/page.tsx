import Link from "next/link";
import { ArrowRight, BookOpen, GraduationCap, Video, Star, Users, BrainCircuit } from "lucide-react";
import MarketingNavbar from "@/components/MarketingNavbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col relative overflow-x-hidden">
      <MarketingNavbar />
      
      {/* Background decorations */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/20 blur-[120px]" />
      </div>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex flex-col items-center p-6 text-center">
        <div className="max-w-4xl space-y-6 mb-16 mt-16 md:mt-24">
          <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm text-blue-600 dark:border-blue-900 dark:bg-blue-900/30 dark:text-blue-400 mb-4 shadow-sm animate-fade-in">
            <BrainCircuit className="w-4 h-4 mr-2" />
            AI-Powered Personalized Learning
          </div>
          <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Master Any Skill. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
              Shape Your Future.
            </span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            The intelligent EdTech platform connecting ambitious learners with world-class tutors. 
            Experience interactive courses, AI insights, and professional mentorship.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link 
              href="/student/signup"
              className="inline-flex h-12 items-center justify-center rounded-full bg-blue-600 px-8 text-base font-semibold text-white hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/25"
            >
              Start Learning Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link 
              href="/courses"
              className="inline-flex h-12 items-center justify-center rounded-full bg-white dark:bg-slate-900 px-8 text-base font-semibold text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
            >
              Browse Courses
            </Link>
          </div>
        </div>

        {/* Feature Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl w-full mb-24 px-4">
          {[
            { label: "Active Students", value: "10K+", icon: Users },
            { label: "Expert Tutors", value: "500+", icon: GraduationCap },
            { label: "Video Lessons", value: "1.2K+", icon: Video },
            { label: "Avg. Rating", value: "4.9/5", icon: Star },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 flex items-center justify-center shadow-sm border border-slate-100 dark:border-slate-800 mb-3">
                <stat.icon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Roles Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full mb-24">
          {/* Student Card */}
          <div className="group relative bg-white dark:bg-slate-900/50 rounded-3xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
            <div className="relative">
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/50 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <BookOpen className="w-7 h-7 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 text-left">I am a Student</h2>
              <p className="text-slate-600 dark:text-slate-400 text-left mb-8 h-12">
                Join our community of learners, access top-tier courses, and track your progress with AI insights.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Link 
                  href="/student/login"
                  className="flex-1 inline-flex justify-center items-center px-4 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-medium hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors shadow-sm"
                >
                  Login
                </Link>
                <Link 
                  href="/student/signup"
                  className="flex-1 inline-flex justify-center items-center px-4 py-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-xl font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group/btn shadow-sm"
                >
                  Join for Free
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Tutor Card */}
          <div className="group relative bg-white dark:bg-slate-900/50 rounded-3xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
            <div className="relative">
              <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/50 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <GraduationCap className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 text-left">I am a Tutor</h2>
              <p className="text-slate-600 dark:text-slate-400 text-left mb-8 h-12">
                Share your expertise with the world, create high-impact courses, and build your teaching brand.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Link 
                  href="/tutor/login"
                  className="flex-1 inline-flex justify-center items-center px-4 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-sm"
                >
                  Login
                </Link>
                <Link 
                  href="/tutor/signup"
                  className="flex-1 inline-flex justify-center items-center px-4 py-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-xl font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group/btn shadow-sm"
                >
                  Start Teaching
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
