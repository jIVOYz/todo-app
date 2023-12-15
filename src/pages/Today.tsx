import { Box, Divider, Flex, Heading } from "@chakra-ui/react"
import { isToday } from "date-fns"
import { useReadLocalStorage } from "usehooks-ts"
// import Filter from "../components/Filter"
import Form from "../components/Form"
import TodoList from "../components/TodoList"
import { TodoModel } from "../utils/models"

const Today = () => {
  const todos = useReadLocalStorage<TodoModel[]>("tasks")

  const todayTodos = todos?.filter(todo => {
    if (isToday(new Date(todo.dueDate))) {
      return todo
    }
  })

  return (
    <div>
      <Box mb={4}>
        <Heading textAlign={{ base: "center", md: "left" }} mb={2}>
          Today
        </Heading>
        <Divider />
      </Box>
      <Flex gap={2}>
        <Form />
      </Flex>
      <TodoList todos={todayTodos} />
    </div>
  )
}

export default Today
