import { Card, CardHeader, CardBody, Text, CardFooter, Flex, Link } from '@chakra-ui/react'
import { Issue } from 'types'
import { timeSince } from 'utils/openedSince'

export default function Task({ title, html_url, number, comments, user, created_at }: Issue) {
  return (
    <Card variant="outline" bg="#22272e" border="none" rounded="md" color="#717e8b" p={3} fontSize={13} gap={1}>
      <CardHeader p={0}>
        <Link href={html_url} color="#c5d1de" fontSize={15} mb={1} fontWeight="bold" isExternal>
          {title}
        </Link>
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
