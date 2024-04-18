import { Card, CardHeader, Heading, CardBody, Text, CardFooter, Flex } from '@chakra-ui/react'
import { Issue } from 'types'
import { timeSince } from 'utils/openedSince'

export default function CardIssue({ title, number, comments, user, created_at }: Issue) {
  return (
    <Card variant="outline" bg="#22272e" borderColor="#444c56" rounded="md" color="#717e8b" p={3} fontSize={13} gap={1}>
      <CardHeader p={0}>
        <Heading textColor="#c5d1de" fontSize={15} mb={1}>
          {title}
        </Heading>
      </CardHeader>
      <CardBody p={0}>
        <Flex flexDirection="row" gap={2}>
          <Text>#{number}</Text>
          <Text>opened {timeSince(created_at)}</Text>
        </Flex>
      </CardBody>
      <CardFooter flexDirection="row" gap={2} p={0}>
        <Text>{user.login}</Text> | <Text>Comments: {comments}</Text>
      </CardFooter>
    </Card>
  )
}
