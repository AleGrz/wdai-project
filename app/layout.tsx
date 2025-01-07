import NavBar from "@/components/navBar";
import { DesktopCategoryMenu } from "@/components/categoryMenu";
import Provider from "@/components/ui/provider";
import { Box } from "@chakra-ui/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body>
        <Provider>
          <NavBar />
          {children}
        </Provider>
      </body>
    </html>
  );
}
