import { Box, Grid, GridItem } from '@chakra-ui/react'
import AppProviders from 'providers/AppProviders'
import Form from 'components/Form'
import Board from 'components/Board'
import './App.css'

export const App = () => (
  <AppProviders>
    <Box textAlign="center" fontSize="xl" bg="#22272e" color="#c5d1de">
      <GridItem px={7} py={14} position="relative">
        <Form />
      </GridItem>
      <Grid color="#c5d1de" m="auto" w="100%" p={0} maxW="1170px" minH="calc(100vh - 175px)">
        <GridItem rounded={5}>
          <Board />
        </GridItem>
      </Grid>
    </Box>
  </AppProviders>
)
