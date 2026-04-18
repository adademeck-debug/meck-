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
    google: "9nnU_JsPGPwlYAxe5-zIz6uV3JFtXPO2qnLnDZTu_Xs"
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

