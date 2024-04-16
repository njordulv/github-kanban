import { useState, useEffect } from 'react'
import { FormControl, FormHelperText, Button, Flex, Input } from '@chakra-ui/react'
import { fetchRepository, fetchRepositoryIssues } from 'api/githubAPI'
import { Repository, Issue } from 'types'
import CardIssue from 'components/CardIssue'
import styles from 'styles/form.module.scss'

export default function Form() {
  const [repository, setRepository] = useState<Repository | null>(null)
  const [issues, setIssues] = useState<Issue[]>([])
  const [inputVal, setInputVal] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

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
      const repoPath = inputVal.replace(/^\/|\/$|https?:\/\/github\.com\//g, '')
      const repoData = await fetchRepository(repoPath)
      const { owner, repo } = extractRepoInfo(inputVal)
      const issuesData = await fetchRepositoryIssues(owner, repo)
      setRepository(repoData)
      setIssues(issuesData)
      setErrorMessage('')
    } catch (error) {
      setErrorMessage('Failed to load GitHub data')
    }
  }

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null
    if (errorMessage) {
      timeout = setTimeout(() => {
        setErrorMessage('')
      }, 3000)
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }, [errorMessage])

  const extractRepoInfo = (url: string) => {
    const match = url.match(/https?:\/\/github.com\/([^/]+)\/([^/]+)/)
    if (!match) {
      throw new Error('Invalid GitHub repository URL')
    }
    const [, owner, repo] = match
    return { owner, repo }
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
      </Flex>
    </>
  )
}
