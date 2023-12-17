import { Box, Divider, Flex, Heading } from "@chakra-ui/react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { useReadLocalStorage } from "usehooks-ts"
import Filter from "../components/Filter"
import Form from "../components/Form/Form"
import TodoList from "../components/TodoList"
import { Category, TodoModel } from "../utils/models"
import { sortMethods } from "../utils/other"

const CategoryPage = () => {
  const { categoryId } = useParams()
  const categories = useReadLocalStorage<Category[]>("categories")
  const findCategory = categories && categories.find(c => String(c.id) === categoryId)

  const todos = useReadLocalStorage<TodoModel[]>("tasks")
  const todosWithThisCategory = todos?.filter(todo => todo.category?.id === findCategory?.id)

  const [sort, setSort] = useState<string>("date")

  return (
    <div>
      <Box mb={4}>
        <Heading textAlign={{ base: "center", md: "left" }} mb={2}>
          {findCategory?.title}
        </Heading>
        <Divider />
      </Box>
      <Flex direction='column' gap={2}>
        <Filter setSortBy={setSort} />
        <Form initialCategory={findCategory} title={findCategory?.title} />
      </Flex>
      {/* @ts-ignore */}
      <TodoList todos={todosWithThisCategory?.sort(sortMethods[sort].method)} />
    </div>
  )
}

export default CategoryPage
