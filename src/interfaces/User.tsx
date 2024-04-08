export interface UserData {
  users: User[]
}

export interface User {
  id: string
  avatar?: string
  fullName: string
}

export interface UserVars {
  input: object
}
