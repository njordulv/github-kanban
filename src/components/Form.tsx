import { useState, useEffect } from 'react'
import { FormControl, FormHelperText, Button, Flex, Input, VisuallyHidden } from '@chakra-ui/react'
import { fetchRepoIssues } from 'api/githubAPI'
import { Issue } from 'types'
import CardIssue from 'components/CardIssue'
import styles from 'styles/form.module.scss'

export default function Form() {
  const [issues, setIssues] = useState<Issue[]>([])
  const [inputVal, setInputVal] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isDataLoaded, setIsDataLoaded] = useState(false)
  const [hasMoreData, setHasMoreData] = useState(true)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(event.target.value)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLDivElement>) => {
    event.preventDefault()

    if (!inputVal.trim()) {
      setErrorMessage('Field is empty')
      setTimeout(() => {
        setErrorMessage('')
      }, 3000)
      return
    }

    try {
      const repoInfo = extractRepoInfo(inputVal)
      const limit = 4
      const issuesData = await fetchRepoIssues(repoInfo.owner, repoInfo.repo, limit)
      setIssues(issuesData)
      setIsDataLoaded(true)
      setHasMoreData(issuesData.length === limit)
      setErrorMessage('')
    } catch (error) {
      setErrorMessage('Failed to load GitHub data')
    }
  }

  useEffect(() => {
    let timeout = setTimeout(() => {
      if (errorMessage) {
        setErrorMessage('')
      }
    }, 3000)
    return () => clearTimeout(timeout)
  }, [errorMessage])

  const extractRepoInfo = (url: string) => {
    const match = url.match(/https?:\/\/github.com\/([^/]+)\/([^/]+)/)
    if (!match || match.length < 3) {
      throw new Error('Invalid GitHub repository URL')
    }
    const [, owner, repo] = match
    return { owner, repo }
  }

  const loadMoreUsers = async () => {
    try {
      const { owner, repo } = extractRepoInfo(inputVal)
      const newLimit = issues.length + 4
      const apiUsers = await fetchRepoIssues(owner, repo, newLimit)
      setIssues(apiUsers)
      setIsDataLoaded(true)
      setHasMoreData(apiUsers.length > issues.length)
    } catch (error) {
      setErrorMessage('Error loading more issues')
    }
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
          <Button type="submit" colorScheme="gray" px={8}>
            Load issues
          </Button>
          {errorMessage && <FormHelperText className={styles.form__error}>{errorMessage}</FormHelperText>}
        </Flex>
      </FormControl>
      <Flex flexDirection="column" gap={7} maxW={1170} mx="auto">
        {issues && issues.map((issue: Issue) => <CardIssue key={issue.id} {...issue} />)}
        <VisuallyHidden></VisuallyHidden>
        {isDataLoaded && hasMoreData && (
          <Button type="submit" colorScheme="gray" px={8} onClick={loadMoreUsers}>
            Load more
          </Button>
        )}
      </Flex>
    </>
  )
}
