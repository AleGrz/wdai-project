import NavBar from "@/components/navBar";
import Provider from "@/components/ui/provider";
import { Flex } from "@chakra-ui/react";
import Footer from "@/components/footer";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body>
        <Provider>
          <Flex
            justifyContent={"center"}
            bg="linear-gradient(to right, #0f2027, #203a43, #2c5364)"
          >
            <Flex flex={1} direction="column" maxW={1650}>
              <Flex flex={1} direction="column" minH="100dvh" background={"black"}>
                <NavBar />
                {children}
              </Flex>
              <Footer />
            </Flex>
          </Flex>
        </Provider>
      </body>
    </html>
  );
}
