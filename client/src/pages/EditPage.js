import { Input, Button, Box, Flex, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { Navigate, useParams } from "react-router";
import { formats, modules } from "../_helpers/reactQuillModules";
import { serverURL } from "../components/Post";

export default function EditPage() {
  const { register, handleSubmit, reset } = useForm();
  const [navigate, setNavigate] = useState(false);
  const { id } = useParams();
  const [content, setContent] = useState("");
  const toast = useToast();

  useEffect(() => {
    fetch(`${serverURL}/post/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((postInfo) => {
        if (postInfo) {
          // Set form values
          reset({
            title: postInfo.title,
            summary: postInfo.summary,
          });
          setContent(postInfo.content);
        }
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
      });
  }, [id, reset]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.set("title", data.title);
    formData.set("summary", data.summary);
    formData.set("content", content);
    formData.set("id", id);
    if (data.file?.[0]) {
      formData.set("file", data.file[0]);
    }

    try {
      const response = await fetch(`${serverURL}/post`, {
        method: "PUT",
        body: formData,
        credentials: "include",
      });

      if (response.ok) {
        setNavigate(true);
        toast({
          position: "top",
          title: "Post Updated.",
          description: "Your post has been updated successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          position: "top",
          title: "Error!",
          description: "There was an error updating your post.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  if (navigate) {
    return <Navigate to={`/post/${id}`} />;
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
            value={content}
            onChange={setContent}
          />
          <Button
            w={"full"}
            bg="black"
            color={"white"}
            colorScheme="black"
            type="submit"
          >
            Update post
          </Button>
        </Flex>
      </form>
    </Box>
  );
}
