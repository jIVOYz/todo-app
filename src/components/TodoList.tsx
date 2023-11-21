import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Text,
} from "@chakra-ui/react"
import { AiFillPushpin } from "react-icons/ai"
import { useReadLocalStorage } from "usehooks-ts"
import { TodoModel } from "../utils/models"
import TodoItem from "./TodoItem"

type Props = {
  todos: TodoModel[]
}

const TodoList = ({ todos }: Props) => {
  let allTodos = useReadLocalStorage<TodoModel[]>("tasks")
  const pinnedTodos = allTodos?.filter(t => t.pinned === true)
  return (
    <Flex direction='column' gap='2'>
      <Accordion allowMultiple defaultIndex={[0]} hidden={pinnedTodos?.length ? false : true}>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as='span' flex='1' textAlign='left'>
                <Flex alignItems='center' gap={2}>
                  <AiFillPushpin /> Pinned
                </Flex>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Flex direction='column' gap={2}>
              {todos.map(todo => todo.pinned && <TodoItem key={todo.id} todo={todo} />)}
            </Flex>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      {todos.length ? (
        todos.map(todo => !todo.pinned && <TodoItem key={todo.id} todo={todo} />)
      ) : (
        <Text fontSize={18} fontWeight={500}>
          Empty. Add new todos
        </Text>
      )}
    </Flex>
  )
}

export default TodoList
