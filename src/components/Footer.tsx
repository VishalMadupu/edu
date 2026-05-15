import Link from "next/link";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link
              href="/"
              className="text-2xl font-bold tracking-tighter text-slate-900 dark:text-white"
            >
              Service<span className="text-blue-600">Link</span>
            </Link>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
              The premier platform connecting top-tier independent professionals
              with ambitious clients worldwide.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="text-slate-400 hover:text-blue-600 transition-colors"
              >
                <span className="sr-only">Twitter</span>
                <FaTwitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-blue-600 transition-colors"
              >
                <span className="sr-only">GitHub</span>
                <FaGithub className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-blue-600 transition-colors"
              >
                <span className="sr-only">LinkedIn</span>
                <FaLinkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
              Platform
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors"
                >
                  Our Services
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
              Users
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/admin/login"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors"
                >
                  Admin Portal
                </Link>
              </li>
              <li>
                <Link
                  href="/client/login"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors"
                >
                  Client Portal
                </Link>
              </li>
              <li>
                <Link
                  href="/serviceprovider/login"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors"
                >
                  Provider Portal
                </Link>
              </li>
              <li>
                <Link
                  href="/client/signup"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors"
                >
                  Find a Professional
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            &copy; {new Date().getFullYear()} ServiceLink Inc. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
