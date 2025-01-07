import { Metadata, Viewport } from "next";
import { fontSans } from "@/config/fonts";
import CategoryMenu from "../components/categoryMenu";
import { Provider } from "@/components/ui/provider"

export const metadata: Metadata = {
  title: {
    default: "Sklep grzybów",
    template: `%s - ${"Sklep grzybów"}`,
  },
  description: "Grzyby dla przeciętniaków",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontSans.variable} ${fontSans.variable} antialiased`}
      >
        <Provider>
          <CategoryMenu />
        {children}
        </Provider>
      </body>
    </html>
  );
}
