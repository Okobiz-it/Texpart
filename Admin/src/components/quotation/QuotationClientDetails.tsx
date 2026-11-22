"use client";

import React from "react";

interface QuotationClientDetailsProps {
  refNo: string;
  setRefNo: (val: string) => void;
  quoteDate: string;
  setQuoteDate: (val: string) => void;
  clientName: string;
  setClientName: (val: string) => void;
  organizationName: string;
  setOrganizationName: (val: string) => void;
  phone: string;
  setPhone: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  address: string;
  setAddress: (val: string) => void;
  subject: string;
  setSubject: (val: string) => void;
}

export default function QuotationClientDetails({
  refNo,
  setRefNo,
  quoteDate,
  setQuoteDate,
  clientName,
  setClientName,
  organizationName,
  setOrganizationName,
  phone,
  setPhone,
  email,
  setEmail,
  address,
  setAddress,
  subject,
  setSubject,
}: QuotationClientDetailsProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-[4px] shadow-xs p-5 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-[4px] bg-blue-50 text-[#0066CC] font-bold text-xs flex items-center justify-center">
            1
          </span>
          <h3 className="text-sm font-heading font-bold text-[#0A2540]">
            Client &amp; Quotation Reference Details
          </h3>
        </div>
        <span className="text-[11px] text-slate-400 font-medium">Basic Meta</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-heading font-bold text-slate-700">
            Reference No. <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={refNo}
            onChange={(e) => setRefNo(e.target.value)}
            placeholder="e.g. texpart/quote/001/17/26"
            className="w-full h-9 px-3 text-xs rounded-[4px] border border-slate-200 focus:outline-none focus:border-[#0066CC] font-mono text-[#0066CC] font-bold"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-heading font-bold text-slate-700">
            Quotation Date
          </label>
          <input
            type="date"
            value={quoteDate}
            onChange={(e) => setQuoteDate(e.target.value)}
            className="w-full h-9 px-3 text-xs rounded-[4px] border border-slate-200 focus:outline-none focus:border-[#0066CC]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-heading font-bold text-slate-700">
            Client Name (Person) <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="e.g. Mr. Rafiqul Islam, Merchandiser"
            className="w-full h-9 px-3 text-xs rounded-[4px] border border-slate-200 focus:outline-none focus:border-[#0066CC]"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-heading font-bold text-slate-700">
            Organization / Factory
          </label>
          <input
            type="text"
            value={organizationName}
            onChange={(e) => setOrganizationName(e.target.value)}
            placeholder="e.g. Apex Holdings Ltd. / Ha-Meem Group"
            className="w-full h-9 px-3 text-xs rounded-[4px] border border-slate-200 focus:outline-none focus:border-[#0066CC]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-heading font-bold text-slate-700">
            Phone / WhatsApp
          </label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="e.g. +880 1712 345678"
            className="w-full h-9 px-3 text-xs rounded-[4px] border border-slate-200 focus:outline-none focus:border-[#0066CC]"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-heading font-bold text-slate-700">
            Client Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. procurement@brand.com"
            className="w-full h-9 px-3 text-xs rounded-[4px] border border-slate-200 focus:outline-none focus:border-[#0066CC]"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-heading font-bold text-slate-700">
          Client Address / Factory Location
        </label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="e.g. Plot #14, Sector #3, Export Processing Zone (DEPZ), Savar, Dhaka"
          className="w-full h-9 px-3 text-xs rounded-[4px] border border-slate-200 focus:outline-none focus:border-[#0066CC]"
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-heading font-bold text-slate-700">
          Quotation Subject <span className="text-rose-500">*</span>
        </label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="e.g. Quotation for Luxury Apparel Packaging & Brand Labels"
          className="w-full h-9 px-3 text-xs rounded-[4px] border border-slate-200 focus:outline-none focus:border-[#0066CC] font-semibold text-slate-900"
        />
      </div>
    </div>
  );
}
