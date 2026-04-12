"use client";
import { useState, useEffect, useRef } from "react";
import { FaTimes, FaCommentDots } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatWidget() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const chatRef = useRef();
  const bottomRef = useRef();
  const prevMessages = useRef([]);

  // Fetch messages
  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/get-messages");
      const data = await res.json();
      if (Array.isArray(data)) {
        setMessages(data);

        // Calculate new unread messages when chat is closed
        if (!open) {
          const newCount = data.length - prevMessages.current.length;
          if (newCount > 0) setUnreadCount(newCount);
        } else {
          setUnreadCount(0);
        }

        prevMessages.current = data;
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 2000);
    return () => clearInterval(interval);
  }, [open]);

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (chatRef.current && !chatRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Send message
  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);

    await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    setInput("");
    setLoading(false);
    fetchMessages();
  };

  // Toggle chat open/close
  const toggleChat = () => {
    setOpen(!open);
    if (!open) setUnreadCount(0); // reset unread on open
  };

  return (
    <>
      {/* Floating chat button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 left-4 bg-green-600 text-white p-4 rounded-full shadow-xl z-50 hover:scale-110 transition relative"
      >
        {open ? <FaTimes /> : <FaCommentDots />}
        {!open && unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Chat box */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={chatRef}
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-20 left-4 w-80 bg-white shadow-2xl rounded-xl flex flex-col z-50 border"
          >
            {/* Header */}
            <div className="bg-green-600 text-white p-3 rounded-t-xl flex justify-between items-center">
              <span>Live Support 🟢</span>
              <button onClick={toggleChat}>
                <FaTimes />
              </button>
            </div>

            {/* Messages */}
            <div className="p-3 h-64 overflow-y-auto space-y-2 bg-gray-50">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-3 max-w-[80%] break-words text-black rounded-lg shadow-md transition hover:shadow-lg ${
                    msg.role === "user"
                      ? "bg-green-400 ml-auto rounded-tr-none"
                      : "bg-gray-300 mr-auto rounded-tl-none"
                  }`}
                >
                  {msg.content}
                </div>
              ))}

              {loading && (
                <div className="text-xs text-gray-500">AI is typing...</div>
              )}

              <div ref={bottomRef}></div>
            </div>

            {/* Input */}
            <div className="flex border-t items-end p-2 gap-2">
              <textarea
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  e.target.style.height = "auto"; 
                  e.target.style.height = e.target.scrollHeight + "px";
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                    e.target.style.height = "auto";
                  }
                }}
                rows={1}
                className="flex-1 p-2 outline-none text-sm text-black placeholder-gray-400 resize-none rounded-lg border border-gray-300"
                placeholder="Ask about cleaning..."
              />
              <button
                onClick={sendMessage}
                className="bg-green-600 text-white px-4 text-sm hover:bg-green-700 transition rounded-lg"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}