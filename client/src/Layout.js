import { Box } from "@chakra-ui/react";
import Header from "./components/Header";
import { Outlet } from "react-router";

export default function Layout({ children }) {
  return (
    <Box maxW="800px" m="0px auto" p="10px">
      <Header />
      <Outlet />
    </Box>
  );
}
