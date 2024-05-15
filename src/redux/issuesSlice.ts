import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'
import { Issue, TaskStatus, StateTypes } from 'interfaces'
import { loadRepoIssues, fetchRepo } from 'utils/githubApiThunks'

export const initialState: StateTypes = {
  inputVal: '',
  lastUrl: '',
  issues: [] as Issue[],
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

const issuesSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    setInputVal: (state, action: PayloadAction<string>) => {
      state.inputVal = action.payload
    },
    setLastUrl: (state, action: PayloadAction<string>) => {
      state.lastUrl = action.payload
    },
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload
    },
    setOwner: (state, action: PayloadAction<string>) => {
      state.owner = action.payload
    },
    setRepo: (state, action: PayloadAction<string>) => {
      state.repo = action.payload
    },
    setRepoStars: (state, action: PayloadAction<number>) => {
      state.repoStars = action.payload
    },
    setTaskStatus: (state, action: PayloadAction<TaskStatus>) => {
      state.taskStatus = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadRepoIssues.pending, (state) => {
        state.loading = true
      })
      .addCase(loadRepoIssues.fulfilled, (state, action) => {
        state.issues = action.payload
        state.loading = false
        state.errorMessage = ''
        state.taskStatus = {
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
        }
      })
      .addCase(loadRepoIssues.rejected, (state, action) => {
        state.loading = false
        state.errorMessage = action.payload as string
      })
      .addCase(fetchRepo.fulfilled, (state, action) => {
        if (typeof action.payload === 'number') {
          state.repoStars = action.payload
        } else {
          state.errorMessage = ''
        }
      })
      .addCase(fetchRepo.rejected, (state, action) => {
        state.errorMessage = action.payload as string
      })
  }
})

export const { setInputVal, setLastUrl, setErrorMessage, setOwner, setRepo, setRepoStars, setTaskStatus } =
  issuesSlice.actions
export const selectInputVal = (state: RootState) => state.issues.inputVal
export const selectLastUrl = (state: RootState) => state.issues.lastUrl
export const selectIssues = (state: RootState) => state.issues.issues
export const selectErrorMessage = (state: RootState) => state.issues.errorMessage
export const selectLoading = (state: RootState) => state.issues.loading
export const selectOwner = (state: RootState) => state.issues.owner
export const selectRepo = (state: RootState) => state.issues.repo
export const selectRepoStars = (state: RootState) => state.issues.repoStars
export const selectTaskStatus = (state: RootState) => state.issues.taskStatus

export default issuesSlice.reducer
