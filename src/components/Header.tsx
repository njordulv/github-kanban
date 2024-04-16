import { FormControl, Button, Flex, Input } from '@chakra-ui/react'

export default function Header() {
  return (
    <FormControl>
      <Flex gap={7} maxW={1170} mx="auto">
        <Input type="text" variant="outline" placeholder="Enter repo URL" />
        <Button colorScheme="gray" px={8}>
          Load issues
        </Button>
      </Flex>
    </FormControl>
  )
}
