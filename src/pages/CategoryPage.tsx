import { Box, Divider, Flex, Heading } from "@chakra-ui/react"
import { useParams, useSearchParams } from "react-router-dom"
import { useReadLocalStorage } from "usehooks-ts"
import Filter from "../components/Filter"
import Form from "../components/Form"
import TodoList from "../components/TodoList"
import { Category, TodoModel } from "../utils/models"
import { sortMethods } from "../utils/other"

const CategoryPage = () => {
  const { categoryId } = useParams()
  const categories = useReadLocalStorage<Category[]>("categories")
  const findCategory = categories?.find(c => String(c.id) === categoryId)

  const todos = useReadLocalStorage<TodoModel[]>("tasks")
  const todosWithThisCategory = todos?.filter(todo => todo.category?.id === findCategory?.id)

  const [sort, setSort] = useSearchParams({ sortBy: "priority" })

  return (
    <div>
      <Box mb={4}>
        <Heading textAlign={{ base: "center", md: "left" }} mb={2}>
          {findCategory?.title}
        </Heading>
        <Divider />
      </Box>
      <Flex gap={2}>
        <Form />
        <Filter setSortBy={setSort} />
      </Flex>
      {/* @ts-ignore */}
      <TodoList todos={todosWithThisCategory?.sort(sortMethods[sort.get("sortBy")].method)} />
    </div>
  )
}

export default CategoryPage
