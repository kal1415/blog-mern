import { Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    await fetch("http://localhost:4000/register", {
      body: JSON.stringify(data),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex justify="center" direction="column" gap={2}>
        <Heading size="lg" textAlign="center">
          Register
        </Heading>
        <Input
          placeholder="Email"
          type="email"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <Text color="red.600">{errors.email.message}</Text>}
        <Input
          placeholder="Password"
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must have at least 6 characters",
            },
          })}
        />
        {errors.password && (
          <Text color="red.600">{errors.password.message}</Text>
        )}
        <Button
          w={"full"}
          bg="black"
          color={"white"}
          colorScheme="black"
          type="submit"
        >
          Register
        </Button>
      </Flex>
    </form>
  );
}
