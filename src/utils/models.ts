export interface TodoModel {
  id: string
  title: string
  description: string
  status: boolean
  dueDate: string | Date
  pinned: boolean
  priority: Priority
  category: Category
}

export interface Category {
  id: number
  title: string
  color: string
}

export interface Priority {
  id: number
  title: string
  color: string
}
