import { Button } from '@chakra-ui/react'
import { AppDispatch, useSelector, useDispatch } from '../redux/store'
import { Issue } from 'types'
import { RootState } from '../redux/store'
import { loadIssues } from '../redux/slices/issuesSlice'

interface LoadMoreProps {
  inputVal: string
  issues: Issue[]
}

const LoadMore: React.FC<LoadMoreProps> = () => {
  const dispatch: AppDispatch = useDispatch()
  const { inputVal, issues, isDataLoaded, hasMoreData } = useSelector((state: RootState) => state.issues)

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
    dispatch(loadIssues({ owner, repo, limit: issues.length + 5 }))
  }

  return (
    <>
      {isDataLoaded && (
        <Button colorScheme="gray" px={8} onClick={loadMoreIssues}>
          Load more
        </Button>
      )}
      {!hasMoreData && !issues.length && ''}
    </>
  )
}

export default LoadMore
