import { Box, Divider, Flex, Heading } from "@chakra-ui/react"
import { useSearchParams } from "react-router-dom"
import { useReadLocalStorage } from "usehooks-ts"
import Filter from "../components/Filter"
import Form from "../components/Form"
import TodoList from "../components/TodoList"
import { TodoModel } from "../utils/models"
import { sortMethods } from "../utils/other"

const AllTodos = () => {
  let todos = useReadLocalStorage<TodoModel[]>("tasks")

  const [sortBy, setSortBy] = useSearchParams({ sortBy: "none" })
  const sortVal = sortBy.get("sortBy")
  return (
    <div>
      <Box mb={4}>
        <Heading textAlign={{ base: "center", md: "left" }} mb={2}>
          To-do
        </Heading>
        <Divider />
      </Box>
      <Flex gap={2}>
        <Form />
        <Filter setSortBy={setSortBy} />
      </Flex>
      {/* @ts-ignore */}
      <TodoList todos={todos.sort(sortMethods[sortVal].method)} />
    </div>
  )
}

export default AllTodos
