import { useState, useEffect } from 'react'
import { FormControl, FormHelperText, Button, Flex, Input } from '@chakra-ui/react'
import { fetchRepository } from '../api/githubAPI'
import styles from '../styles/form.module.scss'

interface GithubRepository {
  name: string
  description: string
}

export default function Form() {
  const [repository, setRepository] = useState<GithubRepository | null>(null)
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
      setRepository(repoData)
      setErrorMessage('')
    } catch (error) {
      console.error('Failed to load GitHub data', error)
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

  return (
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

      {repository && (
        <Flex gap={7} maxW={1170} mx="auto">
          {repository.name} - {repository.description}
        </Flex>
      )}
    </FormControl>
  )
}