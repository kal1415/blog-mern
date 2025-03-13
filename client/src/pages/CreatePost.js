import { Heading, Input, Button, Box, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { Navigate } from "react-router";

export default function CreatePostPage() {
  const { register, handleSubmit, setValue,reset } = useForm();
  const [navigate, setNavigate] = useState(false);
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];
  const onSubmit = async (data) => {
    console.log(data);
    const formData = new FormData();
    formData.set("title", data.title);
    formData.set("summary", data.summary);
    formData.set("file", data.file[0]);
    formData.set("content", data.content);
    const res = await fetch("http://localhost:4000/post", {
      body: formData,
      method: "POST",
    });
    await res.json();
    if(res.ok){
      reset();
      setNavigate(true);
    }
  };

  if(navigate){
    return <Navigate to='/' />
  }
  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex direction="column" gap={2}>
          <Heading> Create post </Heading>
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
