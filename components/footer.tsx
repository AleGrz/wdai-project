import { Box, Container, Stack, Text, Link } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box
      bg='gray.900'
      color='gray.200'
      py={4}
    >
      <Container as={Stack} maxW={'6xl'} justifyContent={'center'} alignContent={'center'}>
        <Stack direction={'row'} gap={4}>
          <Link href={'#'}>Home</Link>
          <Link href={'#'}>Shop</Link>
          <Link href={'#'}>About</Link>
          <Link href={'#'}>Contact</Link>
        </Stack>
      </Container>
      <Box borderTopWidth={1} borderStyle='solid' borderColor='gray.700'>
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          gap={4}
          justifyContent={{ md: 'space-between' }}
          alignContent={{ md: 'center' }}
        >
          <Text>© 2023 Your Shop. All rights reserved</Text>
          <Stack direction={'row'} gap={6}>
            <Link href={'#'}>Privacy Policy</Link>
            <Link href={'#'}>Terms of Service</Link>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;