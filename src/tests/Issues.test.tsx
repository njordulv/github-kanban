import reducer, {
  initialState,
  setInputVal,
  setErrorMessage,
  setOwner,
  setRepo,
  setRepoStars
} from '../redux/issuesSlice'
import { loadRepoIssues } from 'utils/githubApiThunks'

const linkRepo = 'https://github.com/owner/repo'
const error = 'Failed to fetch issues'

describe('Issue reducers', () => {
  it('should handle input value', () => {
    const action = setInputVal(linkRepo)
    const nextState = reducer(initialState, action)

    expect(nextState.inputVal).toBe(linkRepo)
  })

  it('should handle error message', () => {
    const action = setErrorMessage(error)
    const nextState = reducer(initialState, action)

    expect(nextState.errorMessage).toBe(error)
  })

  it('should handle owner', () => {
    const action = setOwner('owner')
    const nextState = reducer(initialState, action)

    expect(nextState.owner).toBe('owner')
  })

  it('should handle repository', () => {
    const action = setRepo('repo')
    const nextState = reducer(initialState, action)

    expect(nextState.repo).toBe('repo')
  })

  it('should handle repository stars', () => {
    const action = setRepoStars(99)
    const nextState = reducer(initialState, action)

    expect(nextState.repoStars).toBe(99)
  })
})

describe('Issue extraReducers', () => {
  it('should fetch issues with loadRepoIssues.pending action', () => {
    const action = { type: loadRepoIssues.pending.type }
    const nextState = reducer(initialState, action)

    expect(nextState.loading).toBe(true)
    expect(nextState.errorMessage).toBe('')
  })

  it('should fetch issues with loadRepoIssues.fulfilled action', () => {
    const mockIssues = [
      { id: 1, title: 'Issue 1' },
      { id: 2, title: 'Issue 2' }
    ]
    const action = { type: loadRepoIssues.fulfilled.type, payload: mockIssues }
    const nextState = reducer(initialState, action)

    expect(nextState.loading).toBe(false)
    expect(nextState.issues).toEqual(mockIssues)
    expect(nextState.errorMessage).toBe('')
    expect(nextState.taskStatus).toEqual({
      toDo: {
        name: 'To Do',
        items: action.payload.map((issue, index) => ({
          issue,
          position: { x: 0, y: index * 50 }
        }))
      },
      inProgress: {
        name: 'In Progress',
        items: []
      },
      done: {
        name: 'Done',
        items: []
      }
    })
  })

  it('should fetch issues with loadRepoIssues.rejected action', () => {
    const action = { type: loadRepoIssues.rejected.type, payload: error }
    const nextState = reducer(initialState, action)

    expect(nextState.loading).toBe(false)
    expect(nextState.errorMessage).toBe(error)
  })
})
