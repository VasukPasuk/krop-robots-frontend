import type {Metadata} from "next";
import "./globals.css";
import {Inter} from 'next/font/google'
import React from "react";
import "react-toastify/scss/main.scss"
import {TanStackProvider} from "@/config/TanStackProvider";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v13-appRouter";
import {CssBaseline, StyledEngineProvider} from "@mui/material";
import {GoogleAnalytics} from '@next/third-parties/google'
import ReduxProvider from "@/store/Provider";
import ToastWrapper from "@/components/widgets/ToastWrapper";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})


export const metadata: Metadata = {
  title: "Krop Robots",
  description: 'Офіційний сайт ГО "Krop Robots"',
  keywords: "Krop Robots, STEM освіта, 3д-друкування, Arduino",
  category: "STEM",
  publisher: "Krop Robots",
  creator: "Krop Robots",

};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
    <AppRouterCacheProvider>
      <StyledEngineProvider injectFirst>
        <TanStackProvider>
          <CssBaseline/>
          <ReduxProvider>
            <body
              className={`${inter.className} relative dark:bg-[#02090D] dark:text-[#D7DFE4]`}
            >
            {children}
            <ToastWrapper/>
            </body>
          </ReduxProvider>

        </TanStackProvider>
      </StyledEngineProvider>
    </AppRouterCacheProvider>
    <GoogleAnalytics gaId={"G-4T0LWV9MZ7"}/>
    </html>
  );
}
