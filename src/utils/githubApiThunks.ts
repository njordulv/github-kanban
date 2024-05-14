import { createAsyncThunk } from '@reduxjs/toolkit'
import { RequestTypes, Issue } from 'interfaces'

interface RequestOptions extends RequestInit {
  headers?: Record<string, string>
}

interface GithubApiResponse {
  stargazers_count: number
}

const getGithubApi = async <T>(endpoint: string, options: RequestOptions = {}): Promise<T> => {
  const url = `https://api.github.com${endpoint}`
  const headers = {
    Accept: 'application/vnd.github.v3+json',
    Authorization: `Bearer ${process.env.REACT_APP_GITHUB_API_KEY}`,
    ...options.headers
  }

  const response = await fetch(url, {
    ...options,
    headers
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return response.json()
}

const fetchRepoIssues = async ({ owner, repo }: RequestTypes) => {
  const response = await getGithubApi<Issue[]>(`/repos/${owner}/${repo}/issues?state=open`)
  return response
}

export const loadRepoIssues = createAsyncThunk<Issue[], RequestTypes, { rejectValue: string }>(
  'issues/loadRepoIssues',
  async ({ owner, repo }, { rejectWithValue }) => {
    try {
      const issues = await fetchRepoIssues({ owner, repo })
      return issues
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to load GitHub data')
    }
  }
)

export const fetchRepo = createAsyncThunk(
  'issues/fetchRepo',
  async ({ owner, repo }: RequestTypes, { rejectWithValue }) => {
    try {
      const response = await getGithubApi<GithubApiResponse>(`/repos/${owner}/${repo}`)
      return response.stargazers_count
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error fetching repository')
    }
  }
)
