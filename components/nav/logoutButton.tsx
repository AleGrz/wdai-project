"use client";
import { useRouter } from "next/navigation";

import { logout } from "@/app/api/auth/helper";
import { Button } from "@/components/ui/button";

const LogoutButton: React.FC<{
  children?: React.ReactNode,
  width?: number | string | undefined,
  height?: number | string | undefined,
  variant?: "solid" | "subtle" | "surface" | "outline" | "ghost" | "plain" | undefined,
}> = ({ children, width, height, variant = "solid" }) => {
  const router = useRouter();

  return (
    <Button variant={variant} width={width} height={height} onClick={async () => {
      await logout();
      router.refresh();
    }}>{children}</Button>
  )
};

export default LogoutButton;