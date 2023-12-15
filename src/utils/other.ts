export const priorities = [
  { id: 0, title: "No Priority", color: "#E2E8F0" },
  { id: 1, title: "Low", color: "#63B3ED" },
  { id: 2, title: "Medium", color: "#F6AD55" },
  { id: 3, title: "High", color: "#E53E3E" },
]

export const sortMethods = {
  none: {
    method: (): void => {
      return
    },
  },
  date: { method: ({ a, b }: any) => (a.dueDate > b.dueDate ? -1 : 1) },
  priority: { method: ({ a, b }: any) => (a.priority.id > b.priority.id ? -1 : 1) },
}
