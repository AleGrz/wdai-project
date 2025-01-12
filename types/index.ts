import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Token = {
  value: string;
  expiresIn: number;
}

export type TokenPair = {
  accessToken: Token;
  refreshToken: Token;
}

export type MessageResponse = {
  message: string;
}

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  isAdmin: boolean;
}

export type Review = {
  id: string;
  userId: number;
  productId: number;
  rating: number;
  description: string;
}

export type Product = {
  id: number;
  name: string;
  brand: string;
  description: string;
  price: number;
  inStock: number;
  categoryId: number;
  imageUrl: string;
  reviewCount: number;
  rating: number;
}

export type ReviewWithUser = Review & {
  user: User;
}