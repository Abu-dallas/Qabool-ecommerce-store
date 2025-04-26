import "./globals.css";
import ToasterWrapper from "@/Components/constants/Toaster";
import AuthProvider from "@/Components/AuthProvider";
import ReduxProvider from "@/Components/ReduxProvider";

export const metadata = {
  title: "Qabool",
  description: "Qabool E-ecommerce web store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ToasterWrapper />
          <ReduxProvider>{children}</ReduxProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
