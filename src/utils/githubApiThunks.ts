import { createAsyncThunk } from '@reduxjs/toolkit'
import { RequestTypes, Issue } from 'types'
import axios from 'axios'

const getGithubApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github.v3+json',
    Authorization: `Bearer ${process.env.REACT_APP_GITHUB_API_KEY}`
  }
})

const fetchRepoIssues = async ({ owner, repo, limit }: RequestTypes) => {
  const response = await getGithubApi.get(`/repos/${owner}/${repo}/issues?per_page=${limit}`)
  return response.data
}

export const loadRepoIssues = createAsyncThunk<Issue[], RequestTypes, { rejectValue: string }>(
  'issues/loadRepoIssues',
  async ({ owner, repo, limit = 5 }, { rejectWithValue }) => {
    try {
      const issues = await fetchRepoIssues({ owner, repo, limit })
      return issues
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to load GitHub data')
    }
  }
)
