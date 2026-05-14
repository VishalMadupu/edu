import Link from "next/link";

export default function MarketingNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-6 lg:px-12">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="text-2xl font-bold tracking-tighter text-slate-900 dark:text-white">
            Service<span className="text-blue-600">Link</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">
              About
            </Link>
            <Link href="/services" className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">
              Services
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link 
            href="/client/login"
            className="hidden sm:inline-flex text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
          >
            Log in
          </Link>
          <Link 
            href="/client/signup"
            className="inline-flex h-9 items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-sm"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
