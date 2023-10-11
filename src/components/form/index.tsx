import { createBlog, editBlog, getSingleBlog } from "@/src/api/service";
import { Blog, BlogPayload } from "@/src/type";
import {
  Modal,
  TextInput,
  Text,
  Button,
  Stack,
  Textarea,
  Box,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";

const Form = () => {
  const [editValue, setEditValue] = useState<Partial<Blog>>();
  const router = useRouter();
  const id = router.query.id;

  useEffect(() => {
    async function fetchData() {
      if (id) {
        const data = await getSingleBlog(id as string);
        if (data) {
          setEditValue(data);
        }
      }
    }
    fetchData();
  }, [id]);

  const form = useForm({
    initialValues: {
      text: "",
      writer: "",
      title: "",
    },

    validate: {
      text: (value) => (value && value.length !== 0 ? null : "required"),
      writer: (value) => (value && value.length !== 0 ? null : "required"),
      title: (value) => (value && value.length !== 0 ? null : "required"),
    },
  });
  const formRef = useRef(form);

  useEffect(() => {
    if (id) {
      formRef.current.setValues({
        text: editValue?.text ?? "",
        title: editValue?.title ?? "",
        writer: editValue?.writer ?? "",
      });
    }
  }, [editValue?.text, editValue?.title, editValue?.writer, id]);

  const handleSubmit = useCallback(
    async (values: BlogPayload) => {
      if (id) {
        await editBlog(values, id as string);
        router.push("/blog");
      } else {
        await createBlog(values);
        router.push("/blog");
      }
    },
    [id, router]
  );

  return (
    <Box
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={form.onSubmit((values) =>
          handleSubmit(values as BlogPayload)
        )}
        style={{
          border: "2px solid #eee",
          padding: "30px",
          borderRadius: "20px",
        }}
      >
        <Stack>
          <Text>Title :</Text>
          <TextInput
            placeholder="tilte"
            withAsterisk
            {...form.getInputProps("title")}
            autoComplete="off"
          />
          <Text>Writer Name :</Text>
          <TextInput
            placeholder="writer"
            withAsterisk
            {...form.getInputProps("writer")}
            autoComplete="off"
          />
          <Text>Text :</Text>
          <Textarea
            multiline
            placeholder="text"
            withAsterisk
            {...form.getInputProps("text")}
            autoComplete="off"
          />
          <Button type="submit">{id ? "Update" : "Add"}</Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Form;
