import MarketingNavbar from "@/components/MarketingNavbar";
import Footer from "@/components/Footer";
import { CheckCircle2 } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <MarketingNavbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-slate-900 text-white py-20 px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold">About ServiceLink</h1>
            <p className="text-lg md:text-xl text-slate-300">
              We are on a mission to build the world's most trusted network of independent professionals.
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-5xl mx-auto px-6 py-16 lg:py-24 space-y-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Our Story</h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                ServiceLink was founded with a simple idea: it should be easy for talented professionals to find great clients, and just as easy for clients to find reliable experts. We cut through the noise of traditional freelance marketplaces by focusing on quality, transparency, and seamless collaboration.
              </p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 rounded-3xl p-8 aspect-square flex items-center justify-center">
              <div className="text-blue-600 dark:text-blue-400 text-center space-y-2">
                <div className="text-6xl font-bold">10k+</div>
                <div className="text-xl font-medium">Active Providers</div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center">Why Choose Us?</h2>
            <div className="grid sm:grid-cols-3 gap-8">
              {[
                "Vetted Professionals",
                "Secure Payments",
                "24/7 Dedicated Support",
                "Transparent Pricing",
                "Global Reach",
                "Flexible Contracts"
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-3 p-4 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                  <CheckCircle2 className="text-blue-600 w-6 h-6 flex-shrink-0" />
                  <span className="font-medium text-slate-700 dark:text-slate-300">{feature}</span>
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
