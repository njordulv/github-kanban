import { Breadcrumb, BreadcrumbItem, Text } from '@chakra-ui/react'
import { IoChevronForward } from 'react-icons/io5'
import { useSelector, RootState } from '../redux/store'
import { capitalize } from 'utils/capitalize'

export default function Breadcrumbs() {
  const { owner, repo, errorMessage } = useSelector((state: RootState) => state.issues)

  if (errorMessage === 'Failed to load GitHub data') {
    return <Text>{errorMessage}</Text>
  }

  return (
    <Breadcrumb
      spacing="6px"
      fontSize="14px"
      gap={7}
      maxW={1170}
      mx="auto"
      position="absolute"
      bottom={0}
      left={0}
      right={0}
      separator={<IoChevronForward color="gray.300" />}
    >
      <BreadcrumbItem>
        <Text transform="capitalize">{capitalize(owner)}</Text>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Text transform="capitalize">{capitalize(repo)}</Text>
      </BreadcrumbItem>
    </Breadcrumb>
  )
}
