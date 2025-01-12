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
  reviewsCount: number;
  rating: number;
}

export type Order = {
  id: number;
  userId: number;
  orderDate?: Date;
}

export type OrderDetail = {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
}

export type OrderWithOrderDetail = Order & {
  orderDetails: OrderDetail[];
}

export type OrderDetailWithProduct = OrderDetail & {
  product: Product;
}

export type OrderWithOrderDetailWithProduct = Order & {
  orderDetails: OrderDetailWithProduct[];
}

export type Category = {
  id: number;
  name: string;
  parentCategoryId: number;
}

export type ReviewWithUser = Review & {
  user: User;
}