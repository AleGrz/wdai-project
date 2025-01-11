import { Box } from "@chakra-ui/react";

import { MenuRoot, MenuContent, MenuTrigger, MenuItem } from "@/components/ui/menu";
import { Avatar } from "@/components/ui/avatar";
import LogoutButton from "@/components/nav/logoutButton";

const AvatarButton: React.FC<{
  name?: string | undefined
}> = ({ name }) => {
  return (
    <MenuRoot>
      <MenuTrigger
        asChild
        _hover={{
            boxShadow: "0 0 1px 1px white"
        }}>
        <Box borderRadius="full">
          <Avatar size={"sm"} name={name}  />
        </Box>
      </MenuTrigger>
      <MenuContent>
        <MenuItem value="logout" asChild>
          <LogoutButton variant="ghost" width="100%">Log out</LogoutButton>
        </MenuItem>
      </MenuContent>
    </MenuRoot>
  );
}

export default AvatarButton;