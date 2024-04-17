import { useState } from 'react'
import { FormControl, FormHelperText, Button, Flex, Input } from '@chakra-ui/react'
import { Issue } from 'types'
import { RootState, AppDispatch } from '../redux/store'
import { useSelector, useDispatch } from '../redux/store'
import { loadIssues, setErrorMessage } from '../redux/slices/issuesSlice'
import CardIssue from 'components/CardIssue'
import styles from 'styles/form.module.scss'

export default function Form() {
  const dispatch: AppDispatch = useDispatch()
  const [inputVal, setInputVal] = useState('')
  const { issues, isDataLoaded, errorMessage, loading } = useSelector((state: RootState) => state.issues)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(event.target.value)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLDivElement>) => {
    event.preventDefault()
    if (!inputVal.trim()) {
      return
    }
    const repoInfo = extractRepoInfo(inputVal)
    if (!repoInfo) {
      return
    }
    const { owner, repo } = repoInfo
    dispatch(loadIssues({ owner, repo, limit: 4 }))
  }

  const extractRepoInfo = (url: string) => {
    const match = url.match(/https?:\/\/github.com\/([^/]+)\/([^/]+)/)
    if (!match) {
      dispatch(setErrorMessage('Invalid GitHub repository URL'))
      return null
    }
    const [, owner, repo] = match
    return { owner, repo }
  }

  const loadMoreIssues = () => {
    const repoInfo = extractRepoInfo(inputVal)
    if (!repoInfo) {
      return
    }
    const { owner, repo } = repoInfo
    dispatch(loadIssues({ owner, repo, limit: issues.length + 4 }))
  }

  return (
    <>
      <FormControl onSubmit={handleSubmit} className={styles.form}>
        <Flex as="form" gap={7} maxW={1170} mx="auto">
          <Input
            type="text"
            variant="outline"
            placeholder="Enter repo URL"
            value={inputVal}
            onChange={handleInputChange}
          />
          <Button type="submit" colorScheme="gray" px={8} isLoading={loading}>
            Load issues
          </Button>
          {errorMessage && <FormHelperText className={styles.form__error}>{errorMessage}</FormHelperText>}
        </Flex>
      </FormControl>
      <Flex flexDirection="column" gap={7} maxW={1170} mx="auto">
        {issues.map((issue: Issue) => (
          <CardIssue key={issue.id} {...issue} />
        ))}
        {isDataLoaded && (
          <Button colorScheme="gray" px={8} onClick={loadMoreIssues}>
            Load more
          </Button>
        )}
      </Flex>
    </>
  )
}
