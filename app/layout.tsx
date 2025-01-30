import Navbar from "@/components/Navbar";
import "./global.css";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import Footer from "@/components/main/Footer";
import { auth } from "@/auth";
import Head from "next/head";

export const metadata = {
  title: "hotelpoint",
  description: "This is my Next.js application.",
};

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  const userRole = session?.user?.role;
  console.log(userRole);

  return (
    <html lang="en">
      <body className="bg-black h-screen">
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
