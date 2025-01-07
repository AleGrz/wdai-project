"use client"
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "./color-mode"
import { useState, useEffect } from 'react';

export default function Provider(props: ColorModeProviderProps) {
    const [hydrated, setHydrated] = useState(false);
    useEffect(() => {
        setHydrated(true)
    }, []);

    if (!hydrated) {
        return null
    } 
    return (
      <ChakraProvider value={defaultSystem} >
        <ColorModeProvider {...props} />
      </ChakraProvider>
    )
}
