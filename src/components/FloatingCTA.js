"use client";

import { motion } from "framer-motion";

export default function FloatingCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed bottom-6 right-6"
    >
      <a href= "tel:+447344294706">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: [
            "0px 0px 0px rgba(34,197,94,0.5)",
            "0px 0px 20px rgba(34,197,94,0.8)",
            "0px 0px 0px rgba(34,197,94,0.5)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="bg-green-600 text-white px-5 py-3 rounded-full shadow-lg"
      >
        Call Us
      </motion.button>
      </a>
    </motion.div>
    
  );
}