export interface TodoModel {
  id: string
  title: string
  description: string
  status: boolean
  dueDate: string
  pinned: boolean
  priority: Priority
  category: Category | null
}

export interface Category {
  id: string
  title: string
  color: string
}

export interface Priority {
  id: number
  title: string
  color: string
}
