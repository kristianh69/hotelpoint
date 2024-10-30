import Navbar from "@/components/Navbar";
import "./global.css";

export const metadata = {
  title: "My App",
  description: "This is my Next.js application.",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="bg-black h-screen ">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
};

export default Layout;
