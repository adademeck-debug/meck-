import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingCTA from "../components/FloatingCTA";
import WhatsAppButton from "../components/whatsAppButton";
import ChatWidget from "../components/ChatWidget";
import SocialLinks from "../components/SocialLinks";

export const metadata = {
  title: "Green Line Facilities",
  description: "Professional Cleaning Services",
  verification: {
    google: "2KA3W8C7_OHMuBI1IupZB9iYR_0Ta1c5KkVLPifBiNw" 
  },
  icons: {
    icon: "/favicon.ico?v=2",
    apple: "/apple-touch-icon.png?v=2",

  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>

        <Navbar />

        {children}

        <Footer />
        <FloatingCTA />
        <whatsAppButton/>
        <ChatWidget />
        <SocialLinks />

      </body>
    </html>
  );
}

