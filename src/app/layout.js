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
  openGraph: {

    title: "Green Line Facilities",

    description: "Professional Cleaning & Facilities Management Services",

    url: "https://greenlinefacilities.co.uk",

    siteName: "Green Line Facilities",

    images: [

      {

        url: "/og-image.png",

        width: 1200,

        height: 630,

      },

    ],

    locale: "en_GB",

    type: "website",

  },

  twitter: {

    card: "summary_large_image",

    title: "Green Line Facilities",

    description: "Professional Cleaning & Facilities Management Services",

    images: ["/og-image.png"],

  },


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

