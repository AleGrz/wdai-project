"use client";

import type { TokenPair, MessageResponse } from "@/types"

import { Button, Fieldset, Input, Link, Stack } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"

import { Field } from "@/components/ui/field"
import { PasswordInput } from "@/components/ui/password-input"
import { login } from "@/app/(auth)/helper"

interface FormValues {
  email: string
  password: string
}

const LoginPage: React.FC = () => {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      })
    }).catch((e) => console.error(e));
    
    // if (response.ok) {
    //   const tokens = await response.json() as TokenPair;

    //   await login(tokens);
    //   router.push("/");
    // } else {
    //   const body = await response.json() as MessageResponse;

    //   if (body.message === "User not found!") {
    //     setError("email", { type: "manual", message: "User not found!" });
    //   } else if (body.message === "Invalid password!") {
    //     setError("password", { type: "manual", message: "Invalid password!" });
    //   }
    // }
  });

  return (
    (<Fieldset.Root size="lg" maxW="md">
      <form onSubmit={onSubmit} noValidate>
        <Stack>
          <Fieldset.Legend>Log in</Fieldset.Legend>
        </Stack>

        <Fieldset.Content>
          <Field
            label="Email address"
            invalid={!!errors.email}
            errorText={errors.email?.message}
            required
          >
            <Input
              {...register("email", {
                required: "Email is required!",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Entered value does not match email format!",
                },
              })}
            />
          </Field>
          <Field
            label="Password"
            invalid={!!errors.password}
            errorText={errors.password?.message}
            required
          >
            <PasswordInput
              {...register("password", { required: "Password is required!" })}
            />
          </Field>
        </Fieldset.Content>

        <Button variant="outline" type="submit" marginTop={5}>Log in</Button>
      </form>
      <Fieldset.HelperText>
        Don&apos;t have an account? <Link href="/signup">Sign up</Link>
      </Fieldset.HelperText>
    </Fieldset.Root>)
  );
}

export default LoginPage;
