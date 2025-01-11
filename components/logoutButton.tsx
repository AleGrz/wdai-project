"use client";
import { logout } from "../app/api/auth/helper";

import { Button } from "./ui/button";

const LogoutButton: React.FC<{
  children?: React.ReactNode,
}> = ({ children }) => {
  return (
    <Button variant="outline" onClick={() => logout()}>{children}</Button>
  )
};

export default LogoutButton;