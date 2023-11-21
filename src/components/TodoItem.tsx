import { CalendarIcon } from "@chakra-ui/icons"
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
} from "@chakra-ui/react"
import { isToday, isTomorrow } from "date-fns"
import { useLocalStorage } from "usehooks-ts"
import { TodoModel } from "../utils/models"
import EditTodoForm from "./EditTodoForm"

type Props = {
  todo: TodoModel
}

const TodoItem = ({ todo }: Props) => {
  const [todos, setTodos] = useLocalStorage<TodoModel[]>("tasks", [])

  function toggleTodo() {
    let thisTodo = todos.find(t => t.id === todo.id)
    if (thisTodo) {
      thisTodo.status = !todo.status
    }
    setTodos(todos)
  }

  function deleteTodo() {
    setTodos(todos.filter(t => t.id !== todo.id))
  }

  function pinTodo() {
    let thisTodo = todos.find(t => t.id === todo.id)
    if (thisTodo) {
      thisTodo.pinned = !todo.pinned
    }
    setTodos(todos)
  }
  return (
    <>
      <Flex
        direction='column'
        gap={2}
        w='60%'
        justifyContent='center'
        border='1px'
        borderColor='gray.300'
        px='2'
        py={2}
        borderRadius={6}
        boxShadow='sm'
        display={"inline-flex"}
      >
        <Flex gap={2}>
          <Checkbox onChange={toggleTodo} isChecked={todo.status} colorScheme='purple' />
          <Flex direction='column'>
            <Text fontWeight={500}>{todo.title}</Text>
            <Text fontSize='14px' color='gray.400'>
              {todo.description}
            </Text>
          </Flex>
        </Flex>
        <Flex gap={3}>
          <Flex alignItems='center' gap='2'>
            {todo.dueDate && (
              <CalendarIcon
                w={3}
                h={3}
                color={
                  isToday(new Date(todo.dueDate)) || isTomorrow(new Date(todo.dueDate)) ? "purple" : "gray"
                }
              />
            )}
            <Text
              fontWeight={500}
              bgColor='rgba(171, 71, 188, 0.08)'
              p='2px 4px'
              borderRadius={6}
              color={isToday(new Date(todo.dueDate)) || isTomorrow(new Date(todo.dueDate)) ? "purple" : ""}
            >
              {isToday(new Date(todo.dueDate))
                ? "Today"
                : isTomorrow(new Date(todo.dueDate))
                ? "Tomorrow"
                : todo.dueDate}
            </Text>
            <Box bgColor={todo.category.color} p='2px 4px' borderRadius='6px'>
              <Text fontWeight={500}>{todo.category ? todo.category.title : ""}</Text>
            </Box>
            <Tooltip label={todo.priority.title}>
              <Box bgColor={todo.priority.color} w={4} h={4} borderRadius='full' />
            </Tooltip>
          </Flex>
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
                  <EditTodoForm todo={todo} />
                  <MenuItem onClick={pinTodo}>{!todo.pinned ? "Pin" : "Unpin"}</MenuItem>
                  <MenuItem onClick={deleteTodo}>Delete</MenuItem>
                </MenuList>
              </>
            )}
          </Menu>
        </Flex>
      </Flex>
    </>
  )
}

export default TodoItem
