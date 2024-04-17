import { Issue } from 'types'
import { RootState, useSelector } from '../redux/store'
import LoadMore from 'components/LoadMore'
import CardIssue from 'components/CardIssue'

export default function ListIssues() {
  const { issues, inputVal } = useSelector((state: RootState) => state.issues)

  return (
    <>
      {issues.map((issue: Issue) => (
        <CardIssue key={issue.id} {...issue} />
      ))}
      <LoadMore inputVal={inputVal} issues={issues} />
    </>
  )
}
