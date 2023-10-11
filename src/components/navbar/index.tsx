import { Box, Text } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import s from "./navbar.module.css";

const Navbar = () => {
  const router = useRouter();
  return (
    <Box className={s.container}>
      <Text
        className={s.navItemWrapper}
        onClick={() => router.push("/auth/login")}
      >
        Log_In_screen
      </Text>
      <Text className={s.navItemWrapper} onClick={() => router.push("/blog")}>
        Blog
      </Text>
    </Box>
  );
};

export default Navbar;
