import { Box } from "@chakra-ui/react";
import Header from "./components/Header";
import { Outlet } from "react-router";

export default function Layout({ children }) {
  return (
    <Box m="0px 100px 0px 100px" p="10px">
      <Header />
      <Outlet />
    </Box>
  );
}
