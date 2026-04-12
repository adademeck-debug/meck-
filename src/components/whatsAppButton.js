"use client";

import { FaWhatsapp } from "react-icons/fa";
import { usePathname } from "next/navigation";

export default function whatsAppButton() {
  const pathname = usePathname();

  // ✅ 3. Show only on selected pages
  const showOnPages = ["/", "/contact", "/services"];
  if (!showOnPages.includes(pathname)) return null;

  const phone = "447344294706";

  return (
    <div className="fixed bottom-6 left-6 group z-50">
      
      {/* Tooltip */}
      <span className="absolute left-16 bottom-1/2 translate-y-1/2 bg-black text-white text-sm px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
        Chat with us
      </span>

      {/* Button */}
      <a
        href={`https://wa.me/${phone}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition transform hover:scale-110 animate-bounce"
      >
        <FaWhatsapp size={28} />
      </a>
    </div>
  );
}