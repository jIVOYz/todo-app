import { Box, Button, Flex, Heading, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react"
import classNames from "classnames"
import { NavLink, useNavigate } from "react-router-dom"
import { useLocalStorage } from "usehooks-ts"
import { Category, TodoModel } from "../utils/models"
import EditCategoryForm from "./EditCategoryForm"
import classes from "./NavBar/Colors.module.css"
import NewCategoryForm from "./NewCategoryForm"

const Categories = () => {
  const [categories, setCategories] = useLocalStorage<Category[]>("categories", [])
  function createNewCategory(title: string, color: string) {
    const newCategory: Category = {
      id: categories.length + 1,
      title,
      color,
    }

    setCategories(current => [newCategory, ...current])
  }

  const [todos, setTodos] = useLocalStorage<TodoModel[]>("tasks", [])
  const navigate = useNavigate()
  function deleteCategory(id: string) {
    const deleteCategory = categories.filter(category => category.id !== id)

    const thisCategory = categories.find(c => c.id === id)
    const todosWithThisCategory = todos.filter(todo => todo.category === thisCategory?.title)

    if (thisCategory) {
      if ((window.location.pathname = `/category/${thisCategory.id}`)) {
        navigate("/")
      }
    }

    if (todosWithThisCategory) {
      todosWithThisCategory.map(todo => (todo.category = null))
      setTodos(todos)
    }
    setCategories(deleteCategory)
  }

  return (
    <Box>
      <Flex justifyContent='space-between' alignItems='center'>
        <Heading fontSize={16} mt={4} fontWeight={500} color='gray.500'>
          Categories
        </Heading>
      </Flex>

      <Flex direction='column' mt={4} gap={2}>
        {categories.map(category => (
          <Flex key={category.id} alignItems='center'>
            <Text flex='1 1 75%' mx={2} color='black'>
              <NavLink
                className={({ isActive, isPending }) =>
                  isPending ? "" : isActive ? classNames(classes.other, classes.item) : classes.item
                }
                to={`/category/${category.id}`}
              >
                {category.title}
              </NavLink>
            </Text>
            <Box w={5} h={5} borderRadius='full' bgColor={category.color}></Box>

            <Menu>
              {({ isOpen }) => (
                <>
                  <MenuButton
                    h='6'
                    p={0}
                    _hover={{ bgColor: "gray.100" }}
                    bgColor='transparent'
                    isActive={isOpen}
                    as={Button}
                  >
                    ...
                  </MenuButton>
                  <MenuList>
                    <EditCategoryForm category={category} />
                    <MenuItem onClick={() => deleteCategory(category.id)}>Delete</MenuItem>
                  </MenuList>
                </>
              )}
            </Menu>
          </Flex>
        ))}
        <NewCategoryForm createNewCategory={createNewCategory} />
      </Flex>
    </Box>
  )
}

export default Categories
