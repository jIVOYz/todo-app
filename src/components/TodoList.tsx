import { Flex, Text } from "@chakra-ui/react"
import { TodoModel } from "../utils/models"
import TodoItem from "./TodoItem"

type Props = {
  todos: TodoModel[]
}

const TodoList = ({ todos }: Props) => {
  const pinnedTodos = todos?.filter(t => t.pinned === true)
  const completedTodos = todos?.filter(t => t.status === true && !t.pinned)
  return (
    <>
      <Flex direction='column' gap='2'>
        {pinnedTodos?.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
        {todos?.length ? (
          todos.map(todo => !todo.pinned && !todo.status && <TodoItem key={todo.id} todo={todo} />)
        ) : (
          <Text fontSize={18} fontWeight={500}>
            Empty for now. Add new tasks.
          </Text>
        )}
        {completedTodos?.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </Flex>
    </>
  )
}

export default TodoList
