"use client";
import { Button, Fieldset, Input, Stack, Link } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Field } from "@/components/ui/field";
import { setCookies } from "./actions";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const tokens = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        password: formData.password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((res) => res.json());
    console.log(tokens);
    setCookies(tokens);
    router.push("/");
  };

  return (
    <Fieldset.Root size="lg" maxW="md">
      <form onSubmit={handleSubmit}>
        <Stack>
          <Fieldset.Legend>Sign up</Fieldset.Legend>
        </Stack>

        <Fieldset.Content>
          <Field label="First Name">
            <Input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </Field>

          <Field label="Last Name">
            <Input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </Field>

          <Field label="Email address">
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Field>
          <Field label="Password">
            <Input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Field>
          <Field label="Repeat Password">
            <Input
              name="repeatPassword"
              type="password"
              value={formData.repeatPassword}
              onChange={handleChange}
            />
          </Field>
        </Fieldset.Content>

        <Button type="submit">Sign up</Button>
        <Fieldset.HelperText>
          Already have an account? <Link href="/login">Log in</Link>
        </Fieldset.HelperText>
      </form>
    </Fieldset.Root>
  );
}
