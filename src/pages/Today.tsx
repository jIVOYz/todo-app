import { Box, Divider, Flex, Heading } from "@chakra-ui/react"
import { isToday } from "date-fns"
import { useReadLocalStorage } from "usehooks-ts"
import Form from "../components/Form"
import TodoList from "../components/TodoList"
import { TodoModel } from "../utils/models"

const Today = () => {
  const todos = useReadLocalStorage<TodoModel[]>("tasks")

  const todayTodos = todos?.filter(t => {
    if (isToday(new Date(t.dueDate))) {
      return t
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
      {/* @ts-ignore */}
      <TodoList todos={todayTodos} />
    </div>
  )
}

export default Today
