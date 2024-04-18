import { Box, Text, Grid, GridItem } from '@chakra-ui/react'
import AppProviders from 'providers/AppProviders'
import Form from 'components/Form'
import ListIssues from 'components/ListIssues'
import styles from 'styles/app.module.scss'

export const App = () => (
  <AppProviders>
    <Box textAlign="center" fontSize="xl" bg="#22272e" color="#c5d1de">
      <GridItem px={7} py={14} position="relative">
        <Form />
      </GridItem>
      <Grid className={styles.content}>
        <GridItem rounded={5}>
          <Grid templateColumns="repeat(3, 1fr)" className={styles.content__boxes}>
            <GridItem className={styles.content__box}>
              <Text className={styles.content__heading}>To Do</Text>
              <Box className={styles.content__items}>
                <ListIssues />
              </Box>
            </GridItem>
            <GridItem className={styles.content__box}>
              <Text className={styles.content__heading}>In Progress</Text>
              <Box className={styles.content__items}></Box>
            </GridItem>
            <GridItem className={styles.content__box}>
              <Text className={styles.content__heading}>Done</Text>
              <Box className={styles.content__items}></Box>
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </Box>
  </AppProviders>
)
