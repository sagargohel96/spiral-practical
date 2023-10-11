import React, { useCallback, useState } from "react";
import { Box, Button, Stack, Text, TextInput } from "@mantine/core";
import { User } from "@/src/type";
import { useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/store";
import { login, logout } from "../../../src/reducer";
import { notifications } from "@mantine/notifications";
const Login = () => {
  const auth = useSelector((state: { user: User }) => state.user);
  const dispatch: AppDispatch = useDispatch();

  const form = useForm({
    initialValues: {
      name: "",
      password: "",
    },

    validate: {
      name: (value) => (value.length !== 0 ? null : "Invalid name"),
      password: (value) => (value.length !== 0 ? null : "Invalid name"),
    },
  });

  const handleSubmit = useCallback(
    (value: User) => {
      dispatch(login(value));
      form.reset();
      notifications.show({
        title: "login",
        message: "user loggedin successfully",
      });
    },
    [dispatch, form]
  );

  const handleLogout = useCallback(() => {
    dispatch(logout(null));
  }, [dispatch]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          style={{
            height: "400px",
            width: "320px",
            border: "3px solid #eeeeee",
            borderRadius: "50px",
            padding: "60px",
            margin: 30,
          }}
        >
          {auth?.user ? (
            <Stack>
              <Text>User Name : {auth?.user?.name}</Text>
              <Text>User Password : {auth?.user?.password}</Text>
              <Button onClick={handleLogout}>Logout</Button>
            </Stack>
          ) : (
            <form
              onSubmit={form.onSubmit((values) =>
                handleSubmit({ user: values })
              )}
            >
              <Stack>
                <Text>User Name :</Text>
                <TextInput
                  placeholder="name"
                  withAsterisk
                  {...form.getInputProps("name")}
                  autoComplete="off"
                />
                <Text>Password :</Text>
                <TextInput
                  type="password"
                  placeholder="passowrd"
                  withAsterisk
                  {...form.getInputProps("password")}
                  autoComplete="off"
                />
                <Button type="submit">login</Button>
              </Stack>
            </form>
          )}
        </Box>
      </div>
    </>
  );
};

export default Login;
