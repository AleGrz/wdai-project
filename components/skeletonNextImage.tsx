"use client";
import { useState } from "react";
import Image from "next/image";
import { Box } from "@chakra-ui/react";

import { Skeleton } from "@/components/ui/skeleton";

const SkeletonNextImage: React.FC<{
  src: string,
  alt: string,
  quality?: number | undefined,
  loading?: "eager" | "lazy" | undefined,
  priority?: boolean | undefined,
  fill?: boolean | undefined,
  sizes?: string | undefined,
  style?: React.CSSProperties | undefined,
  imageStyle?: React.CSSProperties | undefined
}> = ({src, alt, quality, loading, priority, fill, sizes, style, imageStyle}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && <Skeleton height="100%" width="100%" variant="shine" />}
      <Box style={{ ...style, height: "100%", width: "100%", position: "relative" }}>
        <Image
          src={src}
          alt={alt}
          quality={quality}
          loading={loading}
          priority={priority}
          onLoad={() => setIsLoaded(true)}
          fill={fill}
          sizes={sizes}
          style={imageStyle} />
      </Box>
    </>
  )
}

export default SkeletonNextImage;