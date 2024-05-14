import { Box, Grid, GridItem } from '@chakra-ui/react'
import AppProviders from 'providers/AppProviders'
import Header from 'components/Header'
import Board from 'components/Board'
import 'components/App/App.css'

export const App = () => (
  <AppProviders>
    <Box bg="#22272e">
      <Grid
        textAlign="center"
        fontSize="xl"
        color="#c5d1de"
        m="auto"
        w="100%"
        p={0}
        maxW="1170px"
        minH="calc(100vh - 275px)"
      >
        <GridItem px={7} py={14} position="relative">
          <Header />
        </GridItem>
        <GridItem px={7} rounded={5}>
          <Box color="#c5d1de">
            <Board />
          </Box>
        </GridItem>
      </Grid>
    </Box>
  </AppProviders>
)
