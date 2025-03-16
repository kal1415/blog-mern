import { Heading, Input, Button, Box, Flex, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { Navigate } from "react-router";
import { formats, modules } from "../_helpers/reactQuillModules";

export default function CreatePostPage() {
  const { register, handleSubmit, setValue, reset } = useForm();
  const [navigate, setNavigate] = useState(false);
  const toast = useToast();
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.set("title", data.title);
    formData.set("summary", data.summary);
    formData.set("file", data.file[0]);
    formData.set("content", data.content);
    const res = await fetch("http://localhost:4000/post", {
      body: formData,
      method: "POST",
      credentials: "include",
    });
    await res.json();
    if (res.ok) {
      reset();
      setNavigate(true);
      toast({
        position: "top",
        title: "Post created.",
        description: "Your post has been created successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        position: "top",
        title: "Error.",
        description: "There was an error creating your post.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (navigate) {
    return <Navigate to="/" />;
  }
  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex direction="column" gap={2}>
          <Input placeholder="Title" {...register("title")} />
          <Input placeholder="Summary" {...register("summary")} />
          <Input type="file" {...register("file")} />
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            {...register("content")}
            onChange={(newValue) => setValue("content", newValue)}
          />
          <Button
            w={"full"}
            bg="black"
            color={"white"}
            colorScheme="black"
            type="submit"
          >
            Create post
          </Button>
        </Flex>
      </form>
    </Box>
  );
}
