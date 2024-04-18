import { Breadcrumb, BreadcrumbItem, Link } from '@chakra-ui/react'
import { IoChevronForward } from 'react-icons/io5'
import { useSelector, RootState } from '../redux/store'
import { capitalize } from 'utils/capitalize'

export default function Breadcrumbs() {
  const { owner, repo, errorMessage } = useSelector((state: RootState) => state.issues)

  if (errorMessage === 'Failed to load GitHub data') {
    return <></>
  }

  return (
    <Breadcrumb spacing="6px" fontSize="14px" color="#539bf5" gap={7} separator={<IoChevronForward />}>
      <BreadcrumbItem>
        <Link href={`https://github.com/${owner}`} isExternal transform="capitalize">
          {capitalize(owner)}
        </Link>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Link href={`https://github.com/${owner}/${repo}`} isExternal transform="capitalize">
          {capitalize(repo)}
        </Link>
      </BreadcrumbItem>
    </Breadcrumb>
  )
}
