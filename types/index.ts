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