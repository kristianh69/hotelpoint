// app/layout.tsx
import "./global.css";

import Navbar from "./components/Navbar";

export const metadata = {
  title: "My App",
  description: "This is my Next.js application.",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="bg-gradient-to-r from-gray-800 to-black h-screen ">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
};

export default Layout;
