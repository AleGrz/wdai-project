import { AbsoluteCenter, Separator, Stack } from "@chakra-ui/react";
import { TbDeviceUnknownFilled } from "react-icons/tb";

import { EmptyState } from "@/components/ui/empty-state";

export default function NotFoundPage() {
  return (
    <AbsoluteCenter>
      <Stack width={{ base: "100%", lg: "600px" }} gap={4} textAlign="center">
        <Separator />
        <EmptyState
          icon={<TbDeviceUnknownFilled />}
          size="lg"
          title="Page not found"
          description="Sorry, we couldn't find the page you were looking for."
        />
        <Separator />
      </Stack>
    </AbsoluteCenter>
  );
}
