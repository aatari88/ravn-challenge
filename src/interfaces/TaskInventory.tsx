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
  fullName: string
  avatar: string
}

export interface TaskInventoryVars {
  input: object
}
