import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import RouteMessengerScript from "@/components/RouteMessengerScript";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "MIT ADT - Academic Portal",
  description: "Centralised academic access portal for MIT ADT University",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ErrorReporter />
        <RouteMessengerScript />
        {children}
        <Toaster />
        <VisualEditsMessenger />
      </body>
    </html>
  );
}