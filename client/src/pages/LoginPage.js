import { Button, Flex, Heading, Input } from "@chakra-ui/react";

export default function LoginPage() {
  return (
    <form>
      <Flex justify="center" align="center" direction="column" gap={2}>
        <Heading size="lg"> Login </Heading>
        <Input placeholder="Email" type="email" />
        <Input placeholder="Password" type="password" />
        <Button w={"full"} bg="black" color={"white"} colorScheme="black">
          Login
        </Button>
      </Flex>
    </form>
  );
}
