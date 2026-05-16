import MarketingNavbar from "@/components/MarketingNavbar";
import Footer from "@/components/Footer";
import {
  Code,
  PenTool,
  TrendingUp,
  MonitorSmartphone,
  Globe,
  Shield,
} from "lucide-react";

export default function ServicesPage() {
  const services = [
    {
      title: "Web Development",
      description:
        "Custom websites, web applications, and e-commerce platforms built with modern technologies.",
      icon: Code,
    },
    {
      title: "Design & Creative",
      description:
        "UI/UX design, branding, illustration, and motion graphics that make your business stand out.",
      icon: PenTool,
    },
    {
      title: "Digital Marketing",
      description:
        "SEO, social media management, and paid advertising to drive traffic and boost conversions.",
      icon: TrendingUp,
    },
    {
      title: "Mobile App Development",
      description:
        "Native and cross-platform mobile applications for iOS and Android devices.",
      icon: MonitorSmartphone,
    },
    {
      title: "Translation & Localization",
      description:
        "Professional translation services to help you reach a global audience.",
      icon: Globe,
    },
    {
      title: "Cybersecurity Consulting",
      description:
        "Audits, penetration testing, and security compliance to protect your digital assets.",
      icon: Shield,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <MarketingNavbar />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-blue-600 text-white py-20 px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold">Our Services</h1>
            <p className="text-lg md:text-xl text-blue-100">
              Discover the wide range of expertise available on Edtech. Find the
              right professional for any project.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-shadow group"
                >
                  <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
