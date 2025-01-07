import NavBar from "@/components/navBar";
import { DesktopCategoryMenu } from "@/components/categoryMenu";
import Provider from "@/components/ui/provider";
import { Box, Flex } from "@chakra-ui/react";
import Footer from "@/components/footer";

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
          <Flex
            justifyContent={"center"}
            bg="linear-gradient(to right, #0f2027, #203a43, #2c5364)"
            minH="100vh"
          >
            <Box maxW={1650} background={"black"}>
              <NavBar />
              <DesktopCategoryMenu categories={categories} />
              {children}
              <Footer />
            </Box>
          </Flex>
        </Provider>
      </body>
    </html>
  );
}
