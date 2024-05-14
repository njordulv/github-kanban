import reducer, { setInputVal, setLastUrl, setErrorMessage, setOwner, setRepo } from '../redux/issuesSlice'

describe('Header component', () => {
  const initialState = {
    inputVal: '',
    lastUrl: '',
    issues: [],
    loading: false,
    error: null,
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

  const linkRepo = 'https://github.com/owner/repo'

  it('should handle setInputVal', () => {
    const action = setInputVal(linkRepo)
    const nextState = reducer(initialState, action)

    expect(nextState.inputVal).toBe(linkRepo)
  })

  it('should handle setLastUrl', () => {
    const action = setLastUrl(linkRepo)
    const nextState = reducer(initialState, action)

    expect(nextState.lastUrl).toBe(linkRepo)
  })

  it('should handle setErrorMessage', () => {
    const action = setErrorMessage('Failed to load issues')
    const nextState = reducer(initialState, action)

    expect(nextState.errorMessage).toBe('Failed to load issues')
  })

  it('should handle setOwner', () => {
    const action = setOwner('owner')
    const nextState = reducer(initialState, action)

    expect(nextState.owner).toBe('owner')
  })

  it('should handle setRepo', () => {
    const action = setRepo('repo')
    const nextState = reducer(initialState, action)

    expect(nextState.repo).toBe('repo')
  })
})
