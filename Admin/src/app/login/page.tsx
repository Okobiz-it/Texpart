"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  Loader2,
  Shirt,
  Printer,
} from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/";

  const [email, setEmail] = useState("texpartdesign@gmail.com");
  const [password, setPassword] = useState("123456");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
          rememberMe,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.error || "Authentication failed. Please verify your credentials.");
        setIsLoading(false);
        return;
      }

      router.push(from);
      router.refresh();
    } catch (err: any) {
      setErrorMessage(err.message || "Network error. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] text-[#0A2540] flex items-center justify-center p-4 sm:p-6 lg:p-10 relative overflow-hidden">
      {/* Background Vector Graphic Patterns */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle Technical Dot Grid */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.35]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="admin-grid-pattern"
              width="32"
              height="32"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1" fill="#0066CC" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#admin-grid-pattern)" />
        </svg>

        {/* Ambient Radial Gradient Accents */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-[120px]" />

        {/* Geometric Vector Lines */}
        <svg
          className="absolute -top-24 -left-24 w-96 h-96 text-blue-200/40 opacity-70"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="100" cy="100" r="55" stroke="currentColor" strokeWidth="1" />
          <path d="M100 20 V180 M20 100 H180" stroke="currentColor" strokeWidth="0.75" />
        </svg>

        <svg
          className="absolute -bottom-20 -right-20 w-[420px] h-[420px] text-blue-200/30 opacity-60"
          viewBox="0 0 300 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="50" y="50" width="200" height="200" rx="8" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 6" />
          <rect x="80" y="80" width="140" height="140" rx="4" stroke="currentColor" strokeWidth="1" />
          <circle cx="150" cy="150" r="30" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      {/* Main Dual-Column Container */}
      <div className="w-full max-w-5xl bg-white rounded-[8px] border border-slate-200/90 shadow-[0_20px_60px_-15px_rgba(10,37,64,0.08),0_1px_3px_rgba(0,0,0,0.04)] relative z-10 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
        {/* LEFT COLUMN: Visual Brand & Vector Showcase (hidden on mobile, visible on lg) */}
        <div className="hidden lg:flex lg:col-span-6 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100/60 p-8 xl:p-12 flex-col justify-center space-y-8 border-r border-slate-200/80 relative overflow-hidden">
          {/* Subtle Isometric Graphic Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-40">
            <svg className="w-full h-full" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 100 L200 0 L400 100 L200 200 Z" stroke="#0066CC" strokeWidth="0.75" strokeOpacity="0.2" fill="none" />
              <path d="M0 200 L200 100 L400 200 L200 300 Z" stroke="#0066CC" strokeWidth="0.75" strokeOpacity="0.15" fill="none" />
              <path d="M0 300 L200 200 L400 300 L200 400 Z" stroke="#0066CC" strokeWidth="0.75" strokeOpacity="0.1" fill="none" />
            </svg>
          </div>

          {/* Heading */}
          <div className="relative z-10 space-y-2">
            <h2 className="text-2xl xl:text-3xl font-heading font-black text-[#0A2540] tracking-tight leading-tight">
              Texpart Design &amp; Packaging Solutions
            </h2>
            <p className="text-xs xl:text-sm text-slate-500 font-medium leading-relaxed">
              Centralized administration portal for industrial garment accessories, precision offset packaging, and live client quotations.
            </p>
          </div>

          {/* Center: Vector Feature Cards */}
          <div className="relative z-10 space-y-3">
            {/* Card 1: Private Jobs */}
            <div className="p-3.5 bg-white/90 backdrop-blur-xs border border-slate-200/80 rounded-[6px] shadow-xs flex items-center justify-between hover:border-[#0066CC]/40 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-[4px] bg-blue-50 text-[#0066CC] border border-blue-100 flex items-center justify-center shrink-0">
                  <Shirt className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="text-xs font-heading font-bold text-[#0A2540]">
                    Private Jobs Division
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Apparel accessories, woven labels &amp; trims
                  </p>
                </div>
              </div>
              <span className="px-2 py-0.5 bg-blue-50 text-[#0066CC] text-[10px] font-mono font-bold rounded-[3px]">
                Active
              </span>
            </div>

            {/* Card 2: Commercial Printing */}
            <div className="p-3.5 bg-white/90 backdrop-blur-xs border border-slate-200/80 rounded-[6px] shadow-xs flex items-center justify-between hover:border-[#0066CC]/40 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-[4px] bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center shrink-0">
                  <Printer className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="text-xs font-heading font-bold text-[#0A2540]">
                    Commercial Printing
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Luxury packaging, cartons, catalogs &amp; print
                  </p>
                </div>
              </div>
              <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-mono font-bold rounded-[3px]">
                Offset Ready
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Clean White Login Form Card */}
        <div className="col-span-1 lg:col-span-6 bg-white p-6 sm:p-10 xl:p-12 flex flex-col justify-center">
          <div className="w-full max-w-sm mx-auto space-y-6">
            {/* Header: Pure Logo sitting directly on white background */}
            <div className="space-y-4">
              <div className="relative w-44 h-11">
                <Image
                  src="/logo-full.png"
                  alt="Texpart Logo"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>

              <div>
                <h1 className="text-xl sm:text-2xl font-heading font-black text-[#0A2540] tracking-tight">
                  Sign In to Admin Portal
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Enter your administrative credentials to continue.
                </p>
              </div>
            </div>

            {/* Error Banner */}
            {errorMessage && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-[4px] text-xs flex items-start gap-2.5 animate-in fade-in duration-150">
                <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                <span className="font-medium leading-relaxed">{errorMessage}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <div className="space-y-1.5">
                <label
                  htmlFor="admin-email"
                  className="block text-xs font-heading font-bold uppercase tracking-wider text-[#0A2540]"
                >
                  Admin Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="admin-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="texpartdesign@gmail.com"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-[4px] text-xs font-medium text-[#0A2540] placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 transition-all"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <label
                  htmlFor="admin-password"
                  className="block text-xs font-heading font-bold uppercase tracking-wider text-[#0A2540]"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-[4px] text-xs font-medium text-[#0A2540] placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-[#0066CC] rounded-[3px] border-slate-300 focus:ring-[#0066CC] cursor-pointer"
                  />
                  <span className="text-xs text-slate-600 font-medium">
                    Remember this session
                  </span>
                </label>
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 bg-[#0066CC] hover:bg-[#0052CC] text-white text-xs font-heading font-black uppercase tracking-wider rounded-[4px] shadow-sm flex items-center justify-center gap-2 transition-all disabled:opacity-70 cursor-pointer hover:shadow-md mt-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full bg-[#F8FAFC] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-slate-200 border-t-[#0066CC] rounded-full animate-spin" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
