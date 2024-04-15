import { ChakraProvider, Box, Text, Grid, GridItem } from '@chakra-ui/react'

export const App = () => (
  <ChakraProvider>
    <Box textAlign="center" fontSize="xl">
      <Grid
        templateAreas={`"header" "main"`}
        gridTemplateRows={'1fr 1fr'}
        minH="100vh"
        maxW="1170px"
        gap={3}
        m="auto"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem p="23" bg="orange.300" area={'header'}>
          Header
        </GridItem>
        <GridItem p="3" bg="orange.300" area={'main'}>
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            <GridItem w="100%" h="10" bg="blue.500">
              <Text>Edit</Text>
              <Box />
            </GridItem>
            <GridItem w="100%" h="10" bg="blue.500">
              <Text>Edit</Text>
            </GridItem>
            <GridItem w="100%" h="10" bg="blue.500">
              <Text>Edit</Text>
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </Box>
  </ChakraProvider>
)
