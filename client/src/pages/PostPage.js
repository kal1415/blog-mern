import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { serverURL } from "../components/Post";
import { Flex, Heading, Image, Text } from "@chakra-ui/react";
import { format } from "date-fns";

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    fetch(`${serverURL}/post/${id}`).then((response) =>
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
      })
    );
  }, []);
  if (!postInfo) return;
  return (
    <>
      <Flex direction="column" gap={4}>
        <Heading textAlign="center">{postInfo.title}</Heading>
        <Text textAlign="center" fontSize="lg" fontWeight={400}>
          {postInfo.summary}
        </Text>
        <Text
          textAlign="center"
          fontSize="sm"
          fontWeight={400}
          color="GrayText"
        >
          {format(new Date(postInfo.createdAt), "MMM d yyyy")}
          {"    "}
          By @{postInfo.author?.email.split("@")[0]}
        </Text>
        <Image
          h={300}
          w="full"
          objectFit="cover"
          src={`${serverURL}/${postInfo.cover}`}
          alt=""
          borderRadius="12px"
        />
        <Text dangerouslySetInnerHTML={{ __html: postInfo.content }} />
      </Flex>
    </>
  );
}
