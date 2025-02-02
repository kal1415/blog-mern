import { Box, Button, Flex, Link } from "@chakra-ui/react";

export default function Header() {
  return (
    <Box maxW="800px" m="0px auto" p="10px">
      <Flex justify="space-between" align="center" mb={6}>
        <Link
          href="/"
          color="black"
          textDecoration={"none"}
          fontWeight="bold"
          fontSize={"xl"}
          _hover={{ textDecoration: "none" }}
        >
          My Blog
        </Link>
        <Flex gap={6}>
          <Button as="a" href="/login">
            Login
          </Button>
          <Button
            as="a"
            href="/register"
            bg={"black"}
            color={"white"}
            colorScheme="black"
          >
            Register
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}
