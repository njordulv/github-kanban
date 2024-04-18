import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'
import { Issue } from 'types'
import { loadRepoIssues, fetchRepo } from '../utils/githubApiThunks'

interface StateTypes {
  inputVal: string
  lastUrl: string
  issues: Issue[]
  isDataLoaded: boolean
  loading: boolean
  errorMessage: string | null
  owner: string
  repo: string
  repoStars: number
}

const initialState: StateTypes = {
  inputVal: '',
  lastUrl: '',
  issues: [] as Issue[],
  isDataLoaded: false,
  loading: false,
  errorMessage: '',
  owner: '',
  repo: '',
  repoStars: 0
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
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadRepoIssues.pending, (state) => {
        state.loading = true
      })
      .addCase(loadRepoIssues.fulfilled, (state, action) => {
        state.issues = action.payload
        state.isDataLoaded = true
        state.loading = false
        state.errorMessage = ''
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

export const { setInputVal, setLastUrl, setErrorMessage, setOwner, setRepo, setRepoStars } = issuesSlice.actions
export const selectInputVal = (state: RootState) => state.issues.inputVal
export const selectLastUrl = (state: RootState) => state.issues.lastUrl
export const selectIssues = (state: RootState) => state.issues.issues
export const selectIsDataLoaded = (state: RootState) => state.issues.isDataLoaded
export const selectErrorMessage = (state: RootState) => state.issues.errorMessage
export const selectLoading = (state: RootState) => state.issues.loading
export const selectOwner = (state: RootState) => state.issues.owner
export const selectRepo = (state: RootState) => state.issues.repo
export const selectRepoStars = (state: RootState) => state.issues.repoStars

export default issuesSlice.reducer
