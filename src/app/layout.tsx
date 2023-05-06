import localFont from "next/font/local";

import { AppProviders } from "../providers/AppProviders";
import "../styles/globals.css";

const walsheim = localFont({
  src: [
    {
      path: "../../public/fonts/GT-Walsheim-Black.woff2",
      weight: "400",
    },
    {
      path: "../../public/fonts/GT-Walsheim-Medium.woff2",
      weight: "600",
    },
    {
      path: "../../public/fonts/GT-Walsheim-Regular.woff2",
      weight: "normal",
    },
  ],
  variable: "--font-walsheim",
});

const leagueMono = localFont({
  src: "../../public/fonts/LeagueMono-Regular.woff2",
  variable: "--font-league-mono",
});

const kenfolg = localFont({
  src: "../../public/fonts/Kenfolg.otf",
  variable: "--font-kenfolg",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${walsheim.variable} ${leagueMono.variable} ${kenfolg.variable}`}
      >
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
