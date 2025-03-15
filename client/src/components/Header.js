import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { UserContext } from "../UserContext";

export default function Header() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((res) =>
      res.json().then((userInfo) => {
        setUserInfo(userInfo);
      })
    );
  }, []);

  function logout() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  }

  const username = userInfo?.email;

  return (
    <Flex justify="space-between" align="center" mb={6}>
      <Link
        href="/"
        color="black"
        textDecoration={"none"}
        fontWeight="bold"
        fontSize={"3xl"}
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
              href="/create"
              _hover={{
                cursor: "pointer",
              }}
              bg={"black"}
              color={"white"}
              colorScheme="black"
            >
              Create new post
            </Button>
            <Button as="a" href="" onClick={logout}>
              Logout
            </Button>
          </>
        )}
      </Flex>
    </Flex>
  );
}
