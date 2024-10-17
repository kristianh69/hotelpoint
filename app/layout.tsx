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
      <body className=" ">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
};

export default Layout;
