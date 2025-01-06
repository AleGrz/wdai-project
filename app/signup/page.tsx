"use client";

import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import { Form } from "@nextui-org/react";
import { useState } from "react";

export async function LoginPage() {
  const [submitted, setSubmitted] = useState(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));

    const tokens = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  };

  return (
    <Form
      className="flex flex-col flex-wrap gap-4 items-center"
      validationBehavior="native"
      onSubmit={onSubmit}
    >
      <Input
        isRequired
        errorMessage="Please enter a valid email"
        label="Email"
        name="email"
        placeholder="Enter your email"
        type="email"
        variant="faded"
      />
      <Input
        isRequired
        errorMessage="Please enter your first name"
        label="First name"
        name="firstName"
        placeholder="Enter your first name"
        type="text"
        variant="faded"
      />
      <Input
        isRequired
        errorMessage="Please enter your last name"
        label="Last name"
        name="lastName"
        placeholder="Enter your last name"
        type="text"
        variant="faded"
      />
      <Input
        isRequired
        label="Password"
        name="password"
        placeholder="Enter your password"
        type="password"
      />
      <Input
        isRequired
        label="Repeat Password"
        name="passwordRepeat"
        placeholder="Re-enter your password"
        type="password"
      />
      <Button type="submit">Submit</Button>
    </Form>
  );
}
