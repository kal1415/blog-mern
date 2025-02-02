import { Button, Flex, Heading, Input } from "@chakra-ui/react";

export default function RegisterPage() {
  return (
    <form>
      <Flex justify="center" align="center" direction="column" gap={2}>
        <Heading size="lg">Register</Heading>

        <Input placeholder="Email" type="email" />
        <Input placeholder="Password" type="password" />
        <Button w={"full"} bg="black" color={"white"} colorScheme="black">
          Register
        </Button>
      </Flex>
    </form>
  );
}
