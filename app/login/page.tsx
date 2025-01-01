"use client";

import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import { Form } from "@nextui-org/react";
import React from "react";

export default function LoginPage() {
  const [submitted, setSubmitted] = React.useState(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
  };

  return (
    <Form
      onSubmit={onSubmit}
      validationBehavior="native"
      className="flex flex-col flex-wrap gap-4 items-center"
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
        label="Password"
        name="password"
        placeholder="Enter your password"
        type="password"
        variant="faded"
      />
      <Button type="submit" variant="faded">
        Submit
      </Button>
    </Form>
  );
}
