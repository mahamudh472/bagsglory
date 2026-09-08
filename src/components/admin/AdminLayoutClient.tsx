"use client";

import React, { useState, useEffect, createContext, useContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AdminSidebar } from "./AdminSidebar";
import { AdminBottomNav } from "./AdminBottomNav";

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AdminUIContextType {
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: (open: boolean) => void;
  toggleMobileSidebar: () => void;
  user: AdminUser | null;
  logout: () => Promise<void>;
  isLoadingAuth: boolean;
}

const AdminUIContext = createContext<AdminUIContextType | undefined>(undefined);

export const useAdminUI = () => {
  const context = useContext(AdminUIContext);
  if (!context) {
    throw new Error("useAdminUI must be used within AdminLayoutClient");
  }
  return context;
};

export const AdminLayoutClient: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(!isLoginPage);

  useEffect(() => {
    if (isLoginPage) {
      setIsLoadingAuth(false);
      return;
    }

    let isMounted = true;
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            if (data.authenticated && data.user) {
              setUser(data.user);
            } else {
              router.push("/admin/login");
            }
          }
        } else {
          if (isMounted) {
            router.push("/admin/login");
          }
        }
      } catch {
        if (isMounted) {
          router.push("/admin/login");
        }
      } finally {
        if (isMounted) {
          setIsLoadingAuth(false);
        }
      }
    }

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [isLoginPage, router]);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen((prev) => !prev);
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      router.push("/admin/login");
      router.refresh();
    } catch (e) {
      console.error("Logout failed:", e);
    }
  };

  // If on login page, render child without sidebar
  if (isLoginPage) {
    return (
      <AdminUIContext.Provider
        value={{
          isMobileSidebarOpen,
          setIsMobileSidebarOpen,
          toggleMobileSidebar,
          user,
          logout,
          isLoadingAuth,
        }}
      >
        {children}
      </AdminUIContext.Provider>
    );
  }

  // If still verifying auth on protected admin pages, show luxury loading state
  if (isLoadingAuth) {
    return (
      <div className="min-h-screen bg-[#0D0C0B] flex flex-col items-center justify-center font-sans space-y-4">
        <div className="w-12 h-12 border-2 border-[#C9A45C] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs uppercase tracking-[0.25em] text-[#C9A45C] font-semibold">
          Verifying Executive Credentials...
        </p>
      </div>
    );
  }

  return (
    <AdminUIContext.Provider
      value={{
        isMobileSidebarOpen,
        setIsMobileSidebarOpen,
        toggleMobileSidebar,
        user,
        logout,
        isLoadingAuth,
      }}
    >
      <div className="flex min-h-screen bg-[#F8F5EF] font-sans text-slate-900 pb-16 lg:pb-0">
        {/* Desktop & Mobile Responsive Sidebar */}
        <AdminSidebar
          isOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 w-full overflow-x-hidden">
          {children}
        </div>

        {/* Mobile Fixed Bottom Navigation Bar */}
        <AdminBottomNav onOpenMenu={() => setIsMobileSidebarOpen(true)} />
      </div>
    </AdminUIContext.Provider>
  );
};
