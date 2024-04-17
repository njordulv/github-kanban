import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { RequestTypes } from 'types'
import { fetchRepoIssues } from 'api/githubAPI'

interface StateTypes {
  inputVal: string
  issues: []
  isDataLoaded: boolean
  hasMoreData: boolean
  loading: boolean
  errorMessage: string | null
}

const initialState: StateTypes = {
  inputVal: '',
  issues: [],
  isDataLoaded: false,
  hasMoreData: true,
  loading: false,
  errorMessage: ''
}

export const loadIssues = createAsyncThunk(
  'issues/load',
  async ({ owner, repo, limit }: RequestTypes, { rejectWithValue }) => {
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

export const { setInputVal, setErrorMessage } = issuesSlice.actions
export const selectInputVal = (state: RootState) => state.issues.inputVal
export const selectIssues = (state: RootState) => state.issues.issues
export const selectIsDataLoaded = (state: RootState) => state.issues.isDataLoaded
export const selectHasMoreData = (state: RootState) => state.issues.hasMoreData
export const selectErrorMessage = (state: RootState) => state.issues.errorMessage
export const selectLoading = (state: RootState) => state.issues.loading

export default issuesSlice.reducer
