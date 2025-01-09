"use client";
import { Button, Fieldset, Input, Stack, Link } from "@chakra-ui/react";

import { Field } from "@/components/ui/field";
import { useState } from "react";
import { setCookies } from "./actions";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    if (!response.ok) {
      alert("Invalid email or password");
      return;
    }
    const tokens = await response.json();
    setCookies(tokens);
  };

  return (
    <Fieldset.Root size="lg" maxW="md">
      <form onSubmit={handleSubmit}>
        <Stack>
          <Fieldset.Legend>Log in</Fieldset.Legend>
        </Stack>

        <Fieldset.Content>
          <Field label="Email address">
            <Input name="email" type="email" onChange={handleChange} />
          </Field>
          <Field label="Password">
            <Input name="password" type="password" onChange={handleChange} />
          </Field>
        </Fieldset.Content>

        <Button type="submit">Log in</Button>
      </form>
      <Fieldset.HelperText>
        Don&apos;t have an account? <Link href="/signup">Sign up</Link>
      </Fieldset.HelperText>
    </Fieldset.Root>
  );
}
