import { Box, Flex, Grid, GridItem, useMediaQuery } from '@chakra-ui/react';
import Link from 'next/link';
import { FaLocationDot, FaPhone } from 'react-icons/fa6';

const Footer: React.FC = () => {
  return (
    <Box
      bg='gray.900'
      color='gray.200'
      px={20}
      py={4}
    >
      <Grid       
      templateRows="repeat(4, 1fr)"
      templateColumns={{ base: "repeat(1, 1fr)", xl: "repeat(3, 1fr)" }}
      gap={4}
      >
        <GridItem colStart={1}>
        <Link href="/">Home</Link>
        </GridItem>
        <GridItem colStart={1}>
        <Link href="#">About</Link>
        </GridItem>
        <GridItem colStart={1}>
        <Link href="#">Terms of Service</Link>
        </GridItem>
        <GridItem colStart={1}>
        <Link href="#">Privacy Policy</Link>
        </GridItem>
        <GridItem colStart={{base: 1, xl: 2}} rowStart={{base: 5, xl: 1}}>
        <Flex alignItems={"center"} gap={3}><FaPhone /> 123-456-7890</Flex>
        </GridItem>
        <GridItem colStart={{base: 1, xl: 2}} rowStart={{base: 6, xl: 2}}>
        <Flex alignItems={"center"} gap={3}><FaLocationDot /> Kawiory 6, 30-055 Kraków</Flex>
        </GridItem>
        <GridItem colStart={{base: 1, xl: 3}} rowStart={{base: 7, xl: 4}} textAlign={"right"}>
          Made by Aleksander Grzybek & Jakub Jurczyk
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Footer;