"use client";
import { useState, useEffect } from "react";
import { FaWhatsapp, FaInstagram, FaFacebook, FaShareAlt } from "react-icons/fa";

export default function SocialLinks() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) setVisible(true);
    else {
      const timeout = setTimeout(() => setVisible(false), 500); // match longest animation
      return () => clearTimeout(timeout);
    }
  }, [open]);

  const socials = [
    {
      name: "WhatsApp",
      href: "https://wa.me/447344294706",
      icon: <FaWhatsapp />,
      bg: "bg-green-500",
      delay: "delay-100",
    },
    {
      name: "Instagram",
      href: "https://instagram.com/GreenLineFacilities",
      icon: <FaInstagram />,
      bg: "bg-pink-500",
      delay: "delay-200",
    },
    {
      name: "Facebook",
      href: "https://facebook.com/greenlinefacilitieslimited",
      icon: <FaFacebook />,
      bg: "bg-blue-600",
      delay: "delay-300",
    },
  ];

  return (
    <>
      {/* BACKGROUND OVERLAY */}
      {visible && (
        <div
          onClick={() => setOpen(false)}
          className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      <div className="fixed bottom-24 right-4 flex flex-col items-end gap-3 z-50">

        {/* EXPANDED SOCIALS */}
        {visible &&
          socials.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              className={`flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 transform ${
                open
                  ? "opacity-100 translate-x-0 animate-slide-pop"
                  : "opacity-0 translate-x-8 scale-75"
              } ${social.delay}`}
            >
              <span className="text-sm text-gray-700">{social.name}</span>
              <div className={`${social.bg} text-white p-2 rounded-full`}>
                {social.icon}
              </div>
            </a>
          ))}

        {/* MAIN TOGGLE BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className={`bg-green-600 text-white p-4 rounded-full shadow-xl hover:scale-110 transition-transform duration-300 z-50 transform ${
            open ? "rotate-45" : "rotate-0"
          }`}
        >
          <FaShareAlt />
        </button>
      </div>

      {/* SLIDE + POP KEYFRAMES */}
      <style jsx>{`
        @keyframes slidePop {
          0% {
            transform: translateX(32px) scale(0.75);
            opacity: 0;
          }
          50% {
            transform: translateX(-8px) scale(1.2);
            opacity: 1;
          }
          70% {
            transform: translateX(4px) scale(0.95);
          }
          100% {
            transform: translateX(0) scale(1);
          }
        }
        .animate-slide-pop {
          animation: slidePop 0.4s ease forwards;
        }
      `}</style>
    </>
  );
}