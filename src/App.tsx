import { ChakraProvider, Box, Text, Grid, GridItem } from '@chakra-ui/react'
import Form from './components/Form'
import styles from './styles/app.module.scss'

export const App = () => (
  <ChakraProvider>
    <Box textAlign="center" fontSize="xl" className={styles.app}>
      <GridItem p="7" bg="#1d2128" className={styles.header}>
        <Form />
      </GridItem>
      <Grid className={styles.content}>
        <GridItem rounded={5}>
          <Grid templateColumns="repeat(3, 1fr)" className={styles.content__boxes}>
            <GridItem className={styles.content__box}>
              <Text className={styles.content__heading}>To Do</Text>
              <Box className={styles.content__item}>
                <Text>items</Text>
              </Box>
            </GridItem>
            <GridItem className={styles.content__box}>
              <Text className={styles.content__heading}>In Progress</Text>
              <Box className={styles.content__item}>
                <Text>items</Text>
              </Box>
            </GridItem>
            <GridItem className={styles.content__box}>
              <Text className={styles.content__heading}>Done</Text>
              <Box className={styles.content__item}>
                <Text>items</Text>
              </Box>
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </Box>
  </ChakraProvider>
)
