import { Card, CardHeader, Heading, CardBody, Text, CardFooter, Flex } from '@chakra-ui/react'
import { Issue } from '../types'
import { timeSince } from '../utils/openedSince'

export default function CardIssue({ title, number, comments, user, created_at }: Issue) {
  return (
    <Card textAlign="left" variant="outline" borderRadius="lg" gap={3} p={3}>
      <CardHeader p={0}>
        <Heading size="md">{title}</Heading>
      </CardHeader>
      <CardBody p={0}>
        <Flex flexDirection="row" gap={2}>
          <Text>#{number}</Text>
          <Text>opened {timeSince(created_at)}</Text>
        </Flex>
      </CardBody>
      <CardFooter flexDirection="row" gap={2} p={0}>
        <Text>{user.login}</Text>
        <Text>Comments: {comments}</Text>
      </CardFooter>
    </Card>
  )
}
