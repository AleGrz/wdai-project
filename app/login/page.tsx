import { Button, Fieldset, Input, Stack, Link } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";

export default function LoginPage() {
  return (
    <Fieldset.Root size="lg" maxW="md">
      <Stack>
        <Fieldset.Legend>Log in</Fieldset.Legend>
      </Stack>

      <Fieldset.Content>
        <Field label="Email address">
          <Input name="email" type="email" />
        </Field>
        <Field label="Password">
          <Input name="password" type="password" />
        </Field>
      </Fieldset.Content>

      <Button type="submit">Log in</Button>
      <Fieldset.HelperText>
        Don't have an account? <Link href="/signup">Sign up</Link>
      </Fieldset.HelperText>
    </Fieldset.Root>
  );
}
