"use client";
import { useRouter } from "next/navigation";

import { Button } from "./ui/button";

const NavButton: React.FC<{
  route: string,
  children?: React.ReactNode,
}> = ({route, children}) => {
  const router = useRouter();

  return (
    <Button variant="outline" onClick={() => router.push(route)}>{children}</Button>
  )
};

export default NavButton;