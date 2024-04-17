import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { RequestTypes, Issue } from 'types'
import { fetchRepoIssues } from 'api/githubAPI'

interface StateTypes {
  inputVal: string
  issues: Issue[]
  isDataLoaded: boolean
  hasMoreData: boolean
  loading: boolean
  errorMessage: string | null
  owner: string
  repo: string
}

const initialState: StateTypes = {
  inputVal: '',
  issues: [] as Issue[],
  isDataLoaded: false,
  hasMoreData: true,
  loading: false,
  errorMessage: '',
  owner: '',
  repo: ''
}

export const loadIssues = createAsyncThunk<Issue[], RequestTypes, { rejectValue: string }>(
  'issues/load',
  async ({ owner, repo, limit = 5 }, { rejectWithValue }) => {
    try {
      return await fetchRepoIssues(owner, repo, limit)
    } catch (error) {
      return rejectWithValue('Failed to load GitHub data')
    }
  }
)

const issuesSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    setInputVal: (state, action: PayloadAction<string>) => {
      state.inputVal = action.payload
    },
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload
    },
    setOwner: (state, action: PayloadAction<string>) => {
      state.owner = action.payload
    },
    setRepo: (state, action: PayloadAction<string>) => {
      state.repo = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadIssues.pending, (state) => {
        state.loading = true
      })
      .addCase(loadIssues.fulfilled, (state, action) => {
        const oldLength = state.issues.length
        state.issues = action.payload
        state.hasMoreData = action.payload.length > oldLength
        state.isDataLoaded = true
        state.loading = false
        state.errorMessage = ''
      })
      .addCase(loadIssues.rejected, (state, action) => {
        state.loading = false
        state.errorMessage = action.payload as string
      })
  }
})

export const { setInputVal, setErrorMessage, setOwner, setRepo } = issuesSlice.actions
export const selectInputVal = (state: RootState) => state.issues.inputVal
export const selectIssues = (state: RootState) => state.issues.issues
export const selectIsDataLoaded = (state: RootState) => state.issues.isDataLoaded
export const selectHasMoreData = (state: RootState) => state.issues.hasMoreData
export const selectErrorMessage = (state: RootState) => state.issues.errorMessage
export const selectLoading = (state: RootState) => state.issues.loading
export const selectOwner = (state: RootState) => state.issues.owner
export const selectRepo = (state: RootState) => state.issues.repo

export default issuesSlice.reducer
