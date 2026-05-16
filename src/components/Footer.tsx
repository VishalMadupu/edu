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
              Ed<span className="text-blue-600">tech</span>
            </Link>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
              The modern AI-powered learning platform connecting ambitious
              students with world-class tutors.
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
              Learning
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
                  href="/courses"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors"
                >
                  All Courses
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors"
                >
                  Free Tutorials
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
              Portals
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
                  href="/student/login"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors"
                >
                  Student Portal
                </Link>
              </li>
              <li>
                <Link
                  href="/tutor/login"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors"
                >
                  Teacher Portal
                </Link>
              </li>
              <li>
                <Link
                  href="/student/signup"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors"
                >
                  Become a Learner
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
            &copy; {new Date().getFullYear()} Edtech. All rights
            reserved.
          </p>

          <div className="flex flex-col items-center md:items-end gap-1">
            <p className="text-sm font-medium text-slate-900 dark:text-white">
              Developed by <span className="text-blue-600">Vishal Madupu</span>
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/vishalmadupu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-500 hover:text-blue-600 transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/vishalreddy4500/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-500 hover:text-blue-600 transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
