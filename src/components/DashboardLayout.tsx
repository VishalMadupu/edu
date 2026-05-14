"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  UserCircle, 
  LogOut, 
  Menu,
  Briefcase,
  Users
} from "lucide-react";
import { Button } from "./ui/button";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: "client" | "serviceprovider";
}

export default function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const navItems = role === "client" ? [
    { name: "Dashboard", href: "/client/dashboard", icon: LayoutDashboard },
    { name: "Profile", href: "/client/profile", icon: UserCircle },
    { name: "My Tutors", href: "#", icon: Users },
  ] : [
    { name: "Dashboard", href: "/serviceprovider/dashboard", icon: LayoutDashboard },
    { name: "Profile", href: "/serviceprovider/profile", icon: UserCircle },
    { name: "My Clients", href: "#", icon: Users },
    { name: "Earnings", href: "#", icon: Briefcase },
  ];

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-background border-b">
        <span className="font-bold text-xl">ServiceLink</span>
        <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-background border-r transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="h-full flex flex-col">
          <div className="p-6 hidden md:block">
            <span className="font-bold text-2xl tracking-tight text-primary">ServiceLink</span>
            <div className="mt-1 text-xs text-muted-foreground uppercase tracking-wider font-semibold">
              {role === "client" ? "Client Portal" : "Provider Portal"}
            </div>
          </div>
          
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium
                    ${isActive 
                      ? "bg-primary text-primary-foreground" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }
                  `}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          
          <div className="p-4 border-t">
            <Link 
              href={`/${role === 'client' ? 'client' : 'serviceprovider'}/login`}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium text-destructive hover:bg-destructive/10"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-x-hidden p-4 md:p-8">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </div>
      
      {/* Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
