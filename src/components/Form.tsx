import { FormControl, FormHelperText, Button, Flex, Input } from '@chakra-ui/react'
import { RootState, AppDispatch, useSelector, useDispatch } from '../redux/store'
import { loadIssues, setInputVal, setErrorMessage, setOwner, setRepo } from '../redux/slices/issuesSlice'
import Breadcrumbs from 'components/Breadcrumbs'

export default function Form() {
  const dispatch: AppDispatch = useDispatch()
  const { inputVal, errorMessage, loading, owner, repo } = useSelector((state: RootState) => state.issues)

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
    extractRepoInfo(inputVal)
    if (owner && repo) {
      dispatch(loadIssues({ owner, repo, limit: 5 }))
    }
  }

  const extractRepoInfo = (url: string) => {
    const match = url.match(/https?:\/\/github.com\/([^/]+)\/([^/]+)/)
    if (!match) {
      dispatch(setErrorMessage('Invalid GitHub repository URL'))
      return null
    }
    const [, owner, repo] = match
    dispatch(setOwner(owner))
    dispatch(setRepo(repo))
    return { owner, repo }
  }

  return (
    <>
      <FormControl onSubmit={handleSubmit}>
        <Flex as="form" gap={7} maxW={1170} mx="auto">
          <Input
            type="text"
            border="1px solid #444c56"
            variant="outline"
            placeholder="Enter repo URL"
            value={inputVal}
            onChange={handleInputChange}
          />
          <Button type="submit" colorScheme="gray" px={8} isLoading={loading}>
            Load issues
          </Button>
          {errorMessage && (
            <FormHelperText color="coral" fontSize={12} position="absolute" bottom="-21px">
              {errorMessage}
            </FormHelperText>
          )}
        </Flex>
      </FormControl>
      {owner && repo && <Breadcrumbs />}
    </>
  )
}
