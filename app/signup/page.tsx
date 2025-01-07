import { Button, Fieldset, Input, Stack, Link } from "@chakra-ui/react";

import { Field } from "@/components/ui/field";

export default function SignupPage() {
  // const tokens = await fetch("/api/auth/register", {
  //   method: "POST",
  //   body: JSON.stringify({
  //     email: data.email,
  //     firstName: data.firstName,
  //     lastName: data.lastName,
  //     password: data.password,
  //   }),
  //   headers: {
  //     "Content-type": "application/json; charset=UTF-8",
  //   },
  // });
  return (
    <Fieldset.Root size="lg" maxW="md">
      <Stack>
        <Fieldset.Legend>Sign up</Fieldset.Legend>
      </Stack>

      <Fieldset.Content>
        <Field label="First Name">
          <Input name="firstName" />
        </Field>

        <Field label="Last Name">
          <Input name="lastName" />
        </Field>

        <Field label="Email address">
          <Input name="email" type="email" />
        </Field>
        <Field label="Password">
          <Input name="password" type="password" />
        </Field>
        <Field label="Repeat Password">
          <Input name="repeatPassword" type="password" />
        </Field>
      </Fieldset.Content>

      <Button type="submit">Sign up</Button>
      <Fieldset.HelperText>
        Already have an account? <Link href="/login">Log in</Link>
      </Fieldset.HelperText>
    </Fieldset.Root>
  );
}
