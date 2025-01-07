import NavBar from "@/components/navBar";
import { DesktopCategoryMenu } from "@/components/categoryMenu";
import Provider from "@/components/ui/provider";
import { Box } from "@chakra-ui/react";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await fetch("http://localhost:3000/api/category").then(
    (data) => data.json()
  );
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body>
        <Provider>
          <NavBar />
          <DesktopCategoryMenu categories={categories} />
          {children}
        </Provider>
      </body>
    </html>
  );
}
