import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { serverURL } from "../components/Post";
import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import { EditIcon } from "@chakra-ui/icons";
import { UserContext } from "../UserContext";

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
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
        {userInfo.id === postInfo.author._id && (
          <>
            <Box display="flex" alignItems="end" justifyContent="end">
              <Button
                leftIcon={<EditIcon />}
                variant="outline"
                as="a"
                href={`/edit/${postInfo._id}`}
                w="max-content"
                bg="black"
                color={"white"}
                colorScheme="black"
              >
                Edit Post
              </Button>
            </Box>
          </>
        )}
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
