import Link from "next/link";
import { ArrowRight, Briefcase, User } from "lucide-react";
import MarketingNavbar from "@/components/MarketingNavbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col relative overflow-hidden">
      <MarketingNavbar />
      
      {/* Background decorations */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/20 blur-[120px]" />
      </div>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-3xl space-y-6 mb-16 mt-8">
          <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm text-blue-600 dark:border-blue-900 dark:bg-blue-900/30 dark:text-blue-400 mb-4 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
            The premier platform for independent professionals
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Connect. Collaborate. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
              Succeed Together.
            </span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Whether you&apos;re looking for top-tier talent or ready to offer your expertise to the world, ServiceLink makes it seamless.
          </p>
        </div>

        {/* Roles Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full mb-12">
          {/* Client Card */}
          <div className="group relative bg-white dark:bg-slate-900/50 rounded-3xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
            <div className="relative">
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/50 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <User className="w-7 h-7 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 text-left">I am a Client</h2>
              <p className="text-slate-600 dark:text-slate-400 text-left mb-8 h-12">
                Hire vetted professionals for your projects and manage them efficiently.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Link 
                  href="/client/login"
                  className="flex-1 inline-flex justify-center items-center px-4 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-medium hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors shadow-sm"
                >
                  Login
                </Link>
                <Link 
                  href="/client/signup"
                  className="flex-1 inline-flex justify-center items-center px-4 py-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-xl font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group/btn shadow-sm"
                >
                  Sign Up
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Service Provider Card */}
          <div className="group relative bg-white dark:bg-slate-900/50 rounded-3xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
            <div className="relative">
              <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/50 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <Briefcase className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 text-left">I am a Provider</h2>
              <p className="text-slate-600 dark:text-slate-400 text-left mb-8 h-12">
                Offer your services, reach new clients, and get paid securely.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Link 
                  href="/serviceprovider/login"
                  className="flex-1 inline-flex justify-center items-center px-4 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-sm"
                >
                  Login
                </Link>
                <Link 
                  href="/serviceprovider/signup"
                  className="flex-1 inline-flex justify-center items-center px-4 py-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-xl font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group/btn shadow-sm"
                >
                  Sign Up
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
