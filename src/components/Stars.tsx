import { useEffect, useState } from 'react'
import { Flex, Spinner } from '@chakra-ui/react'
import { IoStarSharp } from 'react-icons/io5'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { fetchRepo } from 'utils/githubApiThunks'
import { getRoundedNumber } from 'utils/getRoundedNumber'
import { RequestTypes } from 'interfaces'

const Stars = ({ owner, repo }: RequestTypes) => {
  const dispatch: AppDispatch = useDispatch()
  const { repoStars, errorMessage, loading } = useSelector((state: RootState) => state.issues)
  const [initialLoading, setInitialLoading] = useState(true)

  useEffect(() => {
    dispatch(fetchRepo({ owner, repo }))
  }, [dispatch, owner, repo])

  useEffect(() => {
    if (loading && initialLoading) {
      setInitialLoading(false)
    }
  }, [loading, initialLoading])

  if (repoStars === 0 || repoStars === undefined || repoStars === null) {
    return <></>
  }

  if (loading && initialLoading) return <Spinner size="xs" />
  if (errorMessage) return <></>

  return (
    <Flex alignItems="center" gap={1}>
      <IoStarSharp color="#ffcb3f" size={16} /> {getRoundedNumber(repoStars)} stars
    </Flex>
  )
}

export default Stars
