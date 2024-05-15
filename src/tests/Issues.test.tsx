import reducer, { setInputVal, setErrorMessage, setOwner, setRepo, setRepoStars } from '../redux/issuesSlice'
import { loadRepoIssues } from 'utils/githubApiThunks'

const initialState = {
  inputVal: '',
  lastUrl: '',
  issues: [],
  loading: false,
  errorMessage: '',
  owner: '',
  repo: '',
  repoStars: 0,
  taskStatus: {
    toDo: {
      name: 'To Do',
      items: []
    },
    inProgress: {
      name: 'In Progress',
      items: []
    },
    done: {
      name: 'Done',
      items: []
    }
  }
}

describe('Issues reducers', () => {
  const linkRepo = 'https://github.com/owner/repo'

  it('should handle input value', () => {
    const action = setInputVal(linkRepo)
    const nextState = reducer(initialState, action)

    expect(nextState.inputVal).toBe(linkRepo)
  })

  it('should handle error message', () => {
    const action = setErrorMessage('Failed to load issues')
    const nextState = reducer(initialState, action)

    expect(nextState.errorMessage).toBe('Failed to load issues')
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

describe('Issues extraReducers', () => {
  it('should handle loadRepoIssues.pending', () => {
    const action = { type: loadRepoIssues.pending.type }
    const nextState = reducer(initialState, action)

    expect(nextState.loading).toBe(true)
    expect(nextState.errorMessage).toBe('')
  })

  it('should handle loadRepoIssues.fulfilled', () => {
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

  it('should handle loadRepoIssues.rejected', () => {
    const error = 'Failed to fetch issues'
    const action = { type: loadRepoIssues.rejected.type, payload: error }
    const nextState = reducer(initialState, action)

    expect(nextState.loading).toBe(false)
    expect(nextState.errorMessage).toBe(error)
  })
})
