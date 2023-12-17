import { Box, Divider, Flex, Heading } from "@chakra-ui/react"
import { useState } from "react"
import { useReadLocalStorage } from "usehooks-ts"
import Filter from "../components/Filter"
import Form from "../components/Form/Form"
import TodoList from "../components/TodoList"
import { TodoModel } from "../utils/models"
import { sortMethods } from "../utils/other"

const AllTodos = () => {
  let todos = useReadLocalStorage<TodoModel[]>("tasks")

  const [sort, setSort] = useState<string>("date")

  return (
    <div>
      <Box mb={4}>
        <Heading textAlign={{ base: "center", md: "left" }} mb={2}>
          To-do
        </Heading>
        <Divider />
      </Box>
      <Flex flexDirection='column' gap={2}>
        <Filter setSortBy={setSort} />
        <Form title='Inbox' />
      </Flex>
      {/* @ts-ignore */}
      <TodoList todos={todos.sort(sortMethods[sort].method)} />
    </div>
  )
}

export default AllTodos
