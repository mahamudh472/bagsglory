"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  AlertCircle,
  KeyRound,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please provide both email and password.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Authentication failed. Please verify your credentials.");
        setIsLoading(false);
        return;
      }

      // Successful login
      router.push("/admin");
      router.refresh();
    } catch {
      setError("An unexpected network error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail("admin@bagsglory.com");
    setPassword("Admin@123");
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#0D0C0B] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Background Decorative Accents */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#C9A45C_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#C9A45C]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#C9A45C]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        {/* Brand Emblem */}
        <div className="text-center space-y-2 mb-8">
          <Link href="/" className="inline-block">
            <span className="font-heading text-3xl sm:text-4xl text-[#F8F5EF] tracking-wider uppercase">
              Bags<span className="text-[#C9A45C]">Glory</span>
            </span>
          </Link>
          <div className="w-12 h-[1px] bg-[#C9A45C] mx-auto my-2" />
          <p className="text-xs uppercase tracking-[0.25em] text-[#C9A45C] font-semibold">
            Atelier Executive Portal
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-[#171513] border border-[#2A2622] p-8 sm:p-10 shadow-2xl space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-heading text-[#F8F5EF]">
              Administrator Sign In
            </h2>
            <p className="text-xs text-[#A8A095] font-light">
              Enter authorized credentials to manage catalog, orders, and telemetry.
            </p>
          </div>

          {error && (
            <div className="bg-[#EF4444]/10 border border-[#EF4444]/30 p-3.5 flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-[#EF4444] shrink-0 mt-0.5" />
              <p className="text-xs text-[#EF4444] font-light leading-relaxed">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#D8D2C7]">
                Executive Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#746C63] absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@bagsglory.com"
                  className="w-full bg-[#0D0C0B] border border-[#2A2622] text-[#F8F5EF] text-xs pl-10 pr-4 py-3 placeholder:text-[#524C44] focus:outline-none focus:border-[#C9A45C] transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#D8D2C7]">
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#746C63] absolute left-3.5 top-3.5" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#0D0C0B] border border-[#2A2622] text-[#F8F5EF] text-xs pl-10 pr-10 py-3 placeholder:text-[#524C44] focus:outline-none focus:border-[#C9A45C] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-[#746C63] hover:text-[#C9A45C] p-0.5 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-[#C9A45C] hover:bg-[#D8B46E] text-[#0D0C0B] text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all disabled:opacity-50 mt-2"
            >
              {isLoading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-[#0D0C0B] border-t-transparent rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Authenticate Access</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Fill Helper */}
          <div className="pt-4 border-t border-[#2A2622] space-y-3">
            <div className="flex items-center justify-between text-[11px] text-[#746C63]">
              <span className="flex items-center gap-1">
                <KeyRound className="w-3.5 h-3.5 text-[#C9A45C]" />
                <span>Default Initial Credentials:</span>
              </span>
              <button
                type="button"
                onClick={handleFillDemo}
                className="text-[#C9A45C] hover:underline font-medium"
              >
                Auto-fill Demo
              </button>
            </div>
            <div className="p-2.5 bg-[#0D0C0B]/60 border border-[#2A2622] text-[11px] text-[#A8A095] font-mono space-y-0.5">
              <div>Email: <strong className="text-[#F8F5EF]">admin@bagsglory.com</strong></div>
              <div>Password: <strong className="text-[#F8F5EF]">Admin@123</strong></div>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-8 text-center text-xs text-[#746C63] flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#C9A45C]" />
          <span>Encrypted Session • Neon PostgreSQL Backed</span>
        </div>
      </div>
    </div>
  );
}
