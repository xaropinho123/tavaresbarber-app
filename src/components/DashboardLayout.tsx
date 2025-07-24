// src/components/DashboardLayout.tsx

"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "./AuthProvider";
import Button from "./Button";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const { profile, signOut } = useAuth();

  const navItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Serviços", href: "/dashboard/services" },
    { name: "Link de Agendamento", href: "/dashboard/booking-link" },
    { name: "Configurações", href: "/dashboard/settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 p-4 flex items-center justify-between">
        <Link href="/dashboard" className="text-2xl font-bold text-primary">
          TavaresBarber
        </Link>
        <div className="flex items-center space-x-4">
          {profile && (
            <span className="text-gray-300 text-sm hidden md:block">
              Olá, {profile.barbershop_name}
            </span>
          )}
          <Button onClick={signOut} variant="outline" size="sm">
            Sair
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 border-r border-gray-700 p-4 hidden md:block">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${pathname === item.href
                    ? "bg-primary text-black"
                    : "text-gray-300 hover:bg-gray-700"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
