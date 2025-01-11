"use client";

import type { TokenPair, MessageResponse } from "@/types"

import { Button, Fieldset, Input, Link, Stack } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"

import { Field } from "@/components/ui/field"
import { PasswordInput } from "@/components/ui/password-input"
import { login } from "@/app/api/auth/helper"

interface FormValues {
  email: string
  firstName: string
  lastName: string
  password: string
  repeatPassword: string
}

const SignupPage: React.FC = () => {
  const {
    register,
    setError,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>()
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
      })
    });

    if (response.ok) {
      const tokens = await response.json() as TokenPair;

      await login(tokens);
      router.push("/");
    } else {
      const body = await response.json() as MessageResponse;

      if (body.message === "Email already exists!") {
        setError("email", { type: "manual", message: "Email already exists!" });
      }
    }
  });

  return (
    (<Fieldset.Root size="lg" maxW="md">
      <form onSubmit={onSubmit} noValidate>
        <Stack>
          <Fieldset.Legend>Log in</Fieldset.Legend>
        </Stack>

        <Fieldset.Content>
          <Field
            label="First name"
            invalid={!!errors.firstName}
            errorText={errors.firstName?.message}
            required
          >
            <Input
              {...register("firstName", {
                  required: "First name is required!",
              })}
            />
          </Field>
          <Field
            label="Last name"
            invalid={!!errors.lastName}
            errorText={errors.lastName?.message}
            required
          >
            <Input
              {...register("lastName", {
                  required: "Last name is required!",
              })}
            />
          </Field>
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
              {...register("password", {
                required: "Password is required!"
              })}
            />
          </Field>
          <Field
            label="Repeat password"
            invalid={!!errors.repeatPassword}
            errorText={errors.repeatPassword?.message}
            required
          >
            <PasswordInput
              {...register("repeatPassword", {
                required: "Repeated password is required!",
                validate: (value) => {
                  if (watch("password") !== value)
                    return "Passwords do not match!";
                }
              })}
            />
          </Field>
        </Fieldset.Content>

        <Button variant="outline" type="submit" marginTop={5}>Sign up</Button>
      </form>
      <Fieldset.HelperText>
        Already have an account? <Link href="/login">Log in</Link>
      </Fieldset.HelperText>
    </Fieldset.Root>)
  );
}

export default SignupPage;

