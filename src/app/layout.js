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
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",

  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>

        <Navbar />

        {children}

        <Footer />
        <FloatingCTA />
        <hatsAppButton/>
        <ChatWidget />
        <SocialLinks />

      </body>
    </html>
  );
}

