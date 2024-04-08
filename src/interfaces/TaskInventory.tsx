export interface TaskInventoryData {
  tasks: TaskInventory[]
}

export interface TaskInventory {
  id: string
  name: string
  status: string
  dueDate: string
  tags: string[]
  pointEstimate: string
  assignee: Assignee
}

export interface Assignee {
  id: string
  fullName: string
  avatar: string
}

export interface TaskInventoryVars {
  input: TaskVar
}

export interface TaskVar {
  assigneeId: string
  dueDate: string
  name: string
  pointEstimate: string
  status: string
  tags: string[]
}
