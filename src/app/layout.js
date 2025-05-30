// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";



export const metadata = {
  title: "Skill Merchants",
  description: "A platform for skill-based mentorship",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body
        className={`$  antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
