import {
  Heading,
  Image,
  Stack,
  Text,
  Card,
  CardBody,
  Flex,
} from "@chakra-ui/react";
export default function Post() {
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      mb={4}
    >
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "200px" }}
        src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
        alt="Caffe Latte"
      />

      <Stack>
        <CardBody>
          <Heading size="md">The perfect latte</Heading>

          <Text py="2">
            Caffè latte is a coffee beverage of Italian origin made with
            espresso and steamed milk. Caffè latte is a coffee beverage of
            Italian origin made with espresso and steamed milk.
          </Text>
          <Flex gap={2}>
            <Text py="2" fontSize="sm">
              Author: John Doe
            </Text>
            <Text py="2" fontSize="sm">
              02-02-2025
            </Text>
            <Text py="2" fontSize="sm">
              18:19
            </Text>
          </Flex>
        </CardBody>
      </Stack>
    </Card>
  );
}
