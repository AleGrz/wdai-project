import { Product } from "@prisma/client";
import { Card, Image, Text, Button } from "@chakra-ui/react";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <a href={`/product/${product.id}`}>
      <Card.Root maxW="sm" overflow="hidden">
        <Image
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="Green double couch with wooden legs"
        />
        <Card.Body gap="2">
          <Card.Title>{product.name}</Card.Title>
          <Card.Description>{product.brand}</Card.Description>
          <Text
            textStyle="2xl"
            fontWeight="medium"
            letterSpacing="tight"
            mt="2"
          >
            {product.price}
          </Text>
        </Card.Body>
        <Card.Footer>
          <Button variant="ghost">Add to cart</Button>
        </Card.Footer>
      </Card.Root>
    </a>
  );
}
