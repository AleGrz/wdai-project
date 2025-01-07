"use client";
import { Input } from "@chakra-ui/react";
import { RiSearch2Fill } from "react-icons/ri";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Button } from "./ui/button";


const SearchControl: React.FC = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const queryParam = urlParams.get("query");

    if (window.location.pathname === "/search") {
      setQuery(queryParam || "");
    }
  }, []);

  return (
    <>
      <Input 
        placeholder="Search" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        onKeyDown={(e) => e.key === "Enter" && router.push(`/search?query=${query}`)}
      />
      <Button variant="outline" onClick={() => router.push(`/search?query=${query}`)}>
        <RiSearch2Fill />
      </Button>
    </>
  );
}

export default SearchControl;
