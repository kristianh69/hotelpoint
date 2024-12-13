import Navbar from "@/components/Navbar";
import "./global.css";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import Footer from "@/components/main/Footer";

export const metadata = {
  title: "hotelpoint",
  description: "This is my Next.js application.",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="bg-black h-screen ">
        <SessionProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />

          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
};

export default Layout;
