import Navbar from "@/components/Navbar";
import "./global.css";

import { SessionProvider } from "next-auth/react";

export const metadata = {
  title: "My App",
  description: "This is my Next.js application.",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="bg-black h-screen ">
        <SessionProvider>
          <Navbar />
          <main>{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
};

export default Layout;
