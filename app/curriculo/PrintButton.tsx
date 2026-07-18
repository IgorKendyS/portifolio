"use client";

import React from "react";
import { Download } from "lucide-react";

export function PrintButton() {
  return (
    <div className="fixed top-6 right-6 print:hidden z-50">
      <button
        onClick={() => window.print()}
        className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-full shadow-lg hover:bg-gray-800 transition-colors font-medium text-sm"
      >
        <Download size={16} />
        Salvar como PDF
      </button>
    </div>
  );
}
