export interface Repository {
  name: string
  description: string
}

export interface User {
  login: string
}

export interface Issue {
  id: number
  title: string
  html_url: string
  number: number
  comments: number
  created_at: string
  user: User
}

export interface TaskStatus {
  toDo: {
    name: string
    items: { issue: Issue; position: { x: number; y: number } }[]
  }
  inProgress: {
    name: string
    items: { issue: Issue; position: { x: number; y: number } }[]
  }
  done: {
    name: string
    items: { issue: Issue; position: { x: number; y: number } }[]
  }
  [key: string]: {
    name: string
    items: { issue: Issue; position: { x: number; y: number } }[]
  }
}

export interface StateTypes {
  inputVal: string
  lastUrl: string
  issues: Issue[]
  loading: boolean
  errorMessage: string | null
  owner: string
  repo: string
  repoStars: number
  taskStatus: TaskStatus
}

export interface RequestTypes {
  owner: string
  repo: string
}
