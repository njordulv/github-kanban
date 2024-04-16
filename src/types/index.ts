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
  number: number
  comments: number
  created_at: string
  user: User
}
