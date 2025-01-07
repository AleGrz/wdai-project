"use client"
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { useState, useEffect } from 'react';

import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "./color-mode"

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
