import { Button, Text } from '@chakra-ui/react'
import { AppDispatch, useSelector, useDispatch, RootState } from '../redux/store'
import { Issue } from 'types'
import { loadRepoIssues } from '../utils/githubApiThunks'

interface LoadMoreProps {
  inputVal: string
  issues: Issue[]
}

const LoadMore: React.FC<LoadMoreProps> = () => {
  const dispatch: AppDispatch = useDispatch()
  const { inputVal, issues, isDataLoaded } = useSelector((state: RootState) => state.issues)

  const extractRepoInfo = (url: string) => {
    const match = url.match(/https?:\/\/github.com\/([^/]+)\/([^/]+)/)
    if (!match) {
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
    dispatch(loadRepoIssues({ owner, repo, limit: issues.length + 5 }))
  }

  return (
    <>
      {isDataLoaded && issues.length > 0 && (
        <Button colorScheme="gray" px={8} onClick={loadMoreIssues}>
          Load more
        </Button>
      )}
      {isDataLoaded && !issues.length && (
        <Text align="center" fontSize={13}>
          No issues found in this repository
        </Text>
      )}
    </>
  )
}

export default LoadMore
