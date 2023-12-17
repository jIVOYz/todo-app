import { Box, Divider, Flex, Heading } from "@chakra-ui/react"
import { formatISO, isToday } from "date-fns"
import { useState } from "react"
import { useReadLocalStorage } from "usehooks-ts"
import Filter from "../components/Filter"
import Form from "../components/Form/Form"
import TodoList from "../components/TodoList"
import { TodoModel } from "../utils/models"
import { sortMethods } from "../utils/other"

const Today = () => {
  const todos = useReadLocalStorage<TodoModel[]>("tasks")

  const todayTodos = todos?.filter(todo => {
    if (isToday(new Date(todo.dueDate))) {
      return todo
    }
  })
  const [sort, setSort] = useState<string>("date")
  const todayDate = formatISO(new Date(), { representation: "date" })

  return (
    <div>
      <Box mb={4}>
        <Heading textAlign={{ base: "center", md: "left" }} mb={2}>
          Today
        </Heading>
        <Divider />
      </Box>
      <Flex flexDirection='column' gap={2}>
        <Filter setSortBy={setSort} />
        <Form initialDate={todayDate} title='Today' />
      </Flex>
      {/* @ts-ignore */}
      <TodoList todos={todayTodos.sort(sortMethods[sort].method)} />
    </div>
  )
}

export default Today
