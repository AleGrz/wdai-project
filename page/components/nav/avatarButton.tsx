import { MenuRoot, MenuContent, MenuTrigger, MenuItem } from "@/components/ui/menu";
import { Avatar } from "@/components/ui/avatar";
import LogoutButton from "@/components/nav/logoutButton";
import { Button } from "@/components/ui/button";

const colorPalette = ["red", "blue", "green", "yellow", "purple", "orange"]

const pickPalette = (name: string | undefined) => {
  if (!name) return colorPalette[0];
  const index = name.charCodeAt(0) % colorPalette.length
  
  return colorPalette[index]
}

const AvatarButton: React.FC<{
  name?: string | undefined
}> = ({ name }) => {
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button
          borderRadius="full"
          variant="ghost"
          aspectRatio={1}
          _hover={{
            boxShadow: "0 0 1px 1px white"
          }}>
          <Avatar size={"sm"} name={name} colorPalette={pickPalette(name)} />
        </Button>
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