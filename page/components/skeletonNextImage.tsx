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
  imageStyle?: React.CSSProperties | undefined,
  width?: number | undefined,
  height?: number | undefined,
  variant?: "shine" | "pulse" | "none",
}> = ({src, alt, quality, loading, priority, fill, sizes, style, imageStyle, width, height, variant = "shine"}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && <Skeleton height="100%" width="100%" variant={variant} />}
      <Box style={{ ...style, height: "100%", width: "100%", position: "relative", visibility: isLoaded ? "visible" : "hidden" }}>
        <Image
          src={src}
          alt={alt}
          quality={quality}
          loading={loading}
          priority={priority}
          onLoad={() => setIsLoaded(true)}
          fill={fill}
          sizes={sizes}
          style={imageStyle}
          width={width}
          height={height} />
      </Box>
    </>
  )
}

export default SkeletonNextImage;