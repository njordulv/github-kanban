import axios from 'axios'

const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github.v3+json',
    Authorization: `Bearer ${process.env.REACT_APP_GITHUB_API_KEY}`
  }
})

export const fetchRepository = async (repoPath: string) => {
  try {
    const response = await githubApi.get(`/repos/${repoPath}`)
    return response.data
  } catch (error) {
    console.error('Error fetching repository: ', error)
    throw error
  }
}
