"use client";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

import { getUserData } from "@/app/(auth)/helper";

export default function WriteReviewButton() {
  const router = useRouter();
  const handleClick = async () => {
    const user = await getUserData();

    if (!user) {
      router.push("/login");
    }
  };

  return <Button onClick={handleClick}>Write a review</Button>;
}
