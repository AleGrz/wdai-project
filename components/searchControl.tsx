"use client";
import { Flex, Input } from "@chakra-ui/react";
import { RiSearch2Fill } from "react-icons/ri";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import { Button } from "./ui/button";


const SearchControl: React.FC = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push(`/search?query=${query}`);
    }
  }, [query, router]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
      <Flex gap={0}>
        <Input
          placeholder="Search" 
          value={query} 
          onChange={handleChange} 
          onKeyDown={handleKeyDown}
          aria-label="Search"
        />
        <Button type="submit" variant="outline">
          <RiSearch2Fill />
        </Button>
      </Flex>
    </form>
  );
}

export default SearchControl;
