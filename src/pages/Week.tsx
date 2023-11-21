import { Box, Divider, Flex, Heading } from "@chakra-ui/react"
import { isThisWeek } from "date-fns"
import { useSearchParams } from "react-router-dom"
import { useReadLocalStorage } from "usehooks-ts"
import Filter from "../components/Filter"
import Form from "../components/Form"
import TodoList from "../components/TodoList"
import { TodoModel } from "../utils/models"
import { sortMethods } from "../utils/other"

const Week = () => {
  const todos = useReadLocalStorage<TodoModel[]>("tasks")
  const thisWeekTodos = todos?.filter(t => {
    if (isThisWeek(new Date(t.dueDate), { weekStartsOn: 1 })) {
      return t
    }
  })

  const [sort, setSort] = useSearchParams({ sortBy: "none" })

  return (
    <div>
      <Box mb={4}>
        <Heading mb={2}>This Week</Heading>
        <Divider />
      </Box>
      <Flex gap={2}>
        <Form />
        <Filter setSortBy={setSort} />
      </Flex>
      <TodoList todos={thisWeekTodos?.sort(sortMethods[sort.get("sortBy")].method)} />
    </div>
  )
}

export default Week
