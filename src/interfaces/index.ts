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

export interface RequestTypes {
  owner: string
  repo: string
}
