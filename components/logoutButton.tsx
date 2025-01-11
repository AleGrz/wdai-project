"use client";
import { useRouter } from "next/navigation";

import { logout } from "../app/api/auth/helper";

import { Button } from "./ui/button";

const LogoutButton: React.FC<{
  children?: React.ReactNode,
}> = ({ children }) => {
  const router = useRouter();

  return (
    <Button variant="outline" onClick={async () => {
      await logout();
      router.refresh();
    }}>{children}</Button>
  )
};

export default LogoutButton;