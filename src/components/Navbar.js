
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkClass = (path) =>
  `transition ${
    pathname === path
      ? "text-green-700 font-semibold"
      : "text-gray-800 hover:text-green-600"
  
    }`;

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
      className={`sticky top-0 z-50 px-6 ${
        scrolled ? "bg-white shadow-md py-3" : "bg-white py-5"
      }`}
    >
      <div className="flex justify-between items-center">
        
        {/* LOGO */}
        <div className="flex items-center gap-2">
          <Image src="/logo.JPG" alt="logo" width={40} height={40} />
          <span className="font-bold text-green-700">
            GreenLine Facilities 
          </span>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-6 items-center">
          <Link href="/" className={linkClass("/")}>Home</Link>
          <Link href="/services" className={linkClass("/services")}>Services</Link>
          <Link href="/contact" className={linkClass("/contact")}>Contact</Link>

          <Link href="/contact">
            <button className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition">
              Get Quote
            </button>
          </Link>
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden mt-4 flex flex-col gap-4"
        >
          <Link href="/" className={linkClass("/")}>Home</Link>
          <Link href="/services" className={linkClass("/services")}>Services</Link>
          <Link href="/contact" className={linkClass("/contact")}>Contact</Link>

          <Link href="/contact">
            <button className="bg-green-700 text-white px-4 py-2 rounded-lg">
              Get Quote
            </button>
          </Link>
        </motion.div>
      )}
    </motion.nav>
  );
}