import { Box, Divider, Flex, Heading } from "@chakra-ui/react"
import { isThisWeek } from "date-fns"
import { useState } from "react"
import { useReadLocalStorage } from "usehooks-ts"
import Filter from "../components/Filter"
import Form from "../components/Form/Form"
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

  const [sort, setSort] = useState<string>("date")

  return (
    <div>
      <Box mb={4}>
        <Heading textAlign={{ base: "center", md: "left" }} mb={2}>
          This Week
        </Heading>
        <Divider />
      </Box>
      <Flex flexDirection='column' gap={2}>
        <Filter setSortBy={setSort} />
        <Form title='This week' />
      </Flex>
      {/* @ts-ignore */}
      <TodoList todos={thisWeekTodos?.sort(sortMethods[sort].method)} />
    </div>
  )
}

export default Week
