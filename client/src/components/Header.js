import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function Header() {
  const [username, setUserName] = useState(null);
  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((res) =>
      res.json().then((userInfo) => {
        setUserName(userInfo.email);
      })
    );
  }, []);

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
          {!username ? (
            <>
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
            </>
          ) : (
            <>
              <Button
                as="a"
                _hover={{
                  cursor: "pointer",
                }}
                // href="/login"
                bg={"black"}
                color={"white"}
                colorScheme="black"
              >
                Create new post
              </Button>
              <Button as="a" href="">
                Logout
              </Button>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}
