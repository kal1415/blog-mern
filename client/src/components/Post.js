import {
  Heading,
  Image,
  Stack,
  Text,
  Card,
  CardBody,
  Flex,
  Box,
} from "@chakra-ui/react";
import { Link } from "react-router";
import { format } from "date-fns";
export const serverURL = "http://localhost:4000";

export default function Post({
  title,
  summary,
  cover,
  content,
  createdAt,
  author,
  _id,
}) {
  const imageURL = cover ? `${serverURL}/${cover}` : null;
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      mb={4}
    >
      <Box width={{ base: "100%", sm: "200px" }} height="200px">
        <Link to={`/post/${_id}`}>
          <Image
            width="100%"
            height="100%"
            objectFit="cover"
            maxW={{ base: "100%", sm: "200px" }}
            src={imageURL}
            alt=""
          />
        </Link>
      </Box>
      <Stack>
        <CardBody>
          <Link to={`/post/${_id}`}>
            <Heading size="md">{title}</Heading>
          </Link>
          <Text py="2">{summary}</Text>
          <Flex gap={2}>
            <Text py="2" fontSize="sm">
              Author : {author?.email.split("@")[0]}
            </Text>
            <Text py="2" fontSize="sm">
              {format(new Date(createdAt), "MMM d yyyy")}
            </Text>
          </Flex>
        </CardBody>
      </Stack>
    </Card>
  );
}
