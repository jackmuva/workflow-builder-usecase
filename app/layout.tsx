import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./markdown.css";
import ToastProvider from "@/app/components/ui/toast/toast-provider";
import '@xyflow/react/dist/style.css';
import { ReactFlowProvider } from "@xyflow/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ParaWorkflow",
  description: "Embedded workflow builder built with Paragon",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactFlowProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </ReactFlowProvider>
      </body>
    </html>
  );
}
