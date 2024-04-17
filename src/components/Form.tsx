import { FormControl, FormHelperText, Button, Flex, Input } from '@chakra-ui/react'
import { RootState, AppDispatch, useSelector, useDispatch } from '../redux/store'
import { loadIssues, setInputVal, setErrorMessage } from '../redux/slices/issuesSlice'
import styles from 'styles/form.module.scss'

export default function Form() {
  const dispatch: AppDispatch = useDispatch()
  const { inputVal, errorMessage, loading } = useSelector((state: RootState) => state.issues)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(event.target.value)
    dispatch(setInputVal(event.target.value))
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
    dispatch(loadIssues({ owner, repo, limit: 5 }))
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
          {errorMessage && (
            <FormHelperText color="coral" fontSize={12} className={styles.form__error}>
              {errorMessage}
            </FormHelperText>
          )}
        </Flex>
      </FormControl>
    </>
  )
}
