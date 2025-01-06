export const metadata: any = {
  title: {
    default: "Sklep grzybów",
    template: `%s - ${"Sklep grzybów"}`,
  },
  description: "Grzyby dla przeciętniaków",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: any = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body>{children}</body>
    </html>
  );
}
