import { Box, Divider, Flex, Heading } from "@chakra-ui/react"
import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { useReadLocalStorage } from "usehooks-ts"
import Filter from "../components/Filter"
import Form from "../components/Form"
import TodoList from "../components/TodoList"
import { TodoModel } from "../utils/models"
import { sortMethods } from "../utils/other"

const AllTodos = () => {
  let todos = useReadLocalStorage<TodoModel[] | null>("tasks")

  const [sort, setSort] = useSearchParams({ sortBy: "none" })
  const sortVal = sort.get("sortBy")
  return (
    <div>
      <Box mb={4}>
        <Heading mb={2}>To-do</Heading>
        <Divider />
      </Box>
      <Flex gap={2}>
        <Form />
        <Filter setSortBy={setSort} />
      </Flex>
      <TodoList todos={todos.sort(sortMethods[sortVal].method)} />
    </div>
  )
}

export default AllTodos
