import { FormControl, FormHelperText, Button, Flex, Input } from '@chakra-ui/react'
import { RootState, AppDispatch } from '../redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { setInputVal, setLastUrl, setErrorMessage, setOwner, setRepo } from '../redux/issuesSlice'
import { loadRepoIssues } from 'utils/githubApiThunks'
import Breadcrumbs from 'components/Breadcrumbs'
import Stars from 'components/Stars'

export default function Form() {
  const dispatch: AppDispatch = useDispatch()
  const { inputVal, lastUrl, errorMessage, loading, owner, repo } = useSelector((state: RootState) => state.issues)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(event.target.value)
    dispatch(setInputVal(event.target.value))
  }

  const extractRepoInfo = (url: string) => {
    const match = url.match(/https?:\/\/github.com\/([^/]+)\/([^/]+)/)

    if (!match) {
      dispatch(setErrorMessage('Invalid GitHub repository URL'))
      setTimeout(() => dispatch(setErrorMessage('')), 3000)
      return null
    }

    const [, owner, repo] = match
    dispatch(setOwner(owner))
    dispatch(setRepo(repo))

    return { owner, repo }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLDivElement>) => {
    event.preventDefault()

    if (!inputVal.trim()) {
      dispatch(setErrorMessage('The input field cannot be empty'))
      setTimeout(() => dispatch(setErrorMessage('')), 3000)
      return
    }

    if (inputVal !== lastUrl) {
      const repoInfo = extractRepoInfo(inputVal)
      if (repoInfo) {
        dispatch(loadRepoIssues({ owner: repoInfo.owner, repo: repoInfo.repo, limit: 10 }))
        dispatch(setLastUrl(inputVal))
      }
    }
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
            <FormHelperText color="white" fontSize={11} position="absolute" bottom="-14px">
              {errorMessage}
            </FormHelperText>
          )}
        </Flex>
      </FormControl>
      {owner && repo && (
        <Flex
          maxW={1170}
          mx="auto"
          position="absolute"
          alignItems="center"
          bottom="18px"
          left={0}
          right={0}
          gap={3}
          fontSize="14px"
        >
          <Breadcrumbs />
          <Stars owner={owner} repo={repo} />
        </Flex>
      )}
    </>
  )
}
