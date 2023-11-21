import { AddIcon, ChevronDownIcon } from "@chakra-ui/icons"
import {
  Button,
  Flex,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react"
import { useState } from "react"
import { useLocalStorage, useReadLocalStorage } from "usehooks-ts"
import { Category, Priority, TodoModel } from "../utils/models"
import { priorities } from "../utils/other"

const Form = () => {
  const [todoTitle, setTodoTitle] = useState<string>("")
  const [todoDescription, setTodoDescription] = useState<string>("")
  const [todoDueDate, setTodoDueDate] = useState<Date | string>("")
  const [todoPriority, setTodoPriority] = useState<Priority>({
    id: 0,
    title: "No Priority",
    color: "#E2E8F0",
  })
  const [todoCategory, setTodoCategory] = useState<Category | null>({ id: 0, title: "", color: "" })

  const clearFields: Function = () => {
    setTodoTitle("")
    setTodoDescription("")
    setTodoDueDate("")
    setTodoPriority({
      id: 0,
      title: "No Priority",
      color: "#E2E8F0",
    })
    setTodoCategory({ id: 0, title: "", color: "" })
  }

  const categories = useReadLocalStorage<Category[]>("categories")

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [todos, setTodos] = useLocalStorage<TodoModel[]>("tasks", [])
  function createNewTodo() {
    const newTodo: TodoModel = {
      id: crypto.randomUUID(),
      title: todoTitle,
      description: todoDescription,
      dueDate: todoDueDate,
      category: todoCategory,
      pinned: false,
      priority: todoPriority,
      status: false,
    }

    setTodos(currentTodos => {
      return [newTodo, ...currentTodos]
    })
  }

  return (
    <div style={{ marginBottom: "10px" }}>
      <Button onClick={onOpen} bgColor='purple.600' _hover={{ bgColor: "purple.500" }} color='white'>
        <Flex gap={2} alignItems='center'>
          <AddIcon />
          New Task
        </Flex>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New TODO</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input onChange={e => setTodoTitle(e.target.value)} value={todoTitle} placeholder='Title' />
            <Input
              onChange={e => setTodoDescription(e.target.value)}
              value={todoDescription}
              mt={2}
              placeholder='Description'
            />
            <Input mt={2} onChange={e => setTodoDueDate(e.target.value)} value={todoDueDate} type='date' />

            <Flex direction='column' gap={2}>
              <Menu>
                <MenuButton mt={5} colorScheme='purple' as={Button} rightIcon={<ChevronDownIcon />}>
                  {todoPriority.title}
                </MenuButton>
                <MenuList>
                  {priorities.map(p => (
                    <MenuItem
                      key={Math.random()}
                      onClick={() => {
                        setTodoPriority(p)
                      }}
                    >
                      {p.title}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>

              <Menu>
                <MenuButton mt={5} colorScheme='purple' as={Button} rightIcon={<ChevronDownIcon />}>
                  {todoCategory?.title ? todoCategory?.title : "Category"}
                </MenuButton>

                <MenuList>
                  <MenuItem onClick={() => setTodoCategory(null)}>No Category</MenuItem>
                  {categories?.map(category => (
                    <MenuItem
                      key={category.id}
                      onClick={() => {
                        setTodoCategory(category)
                      }}
                    >
                      {category.title}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              onClick={() => {
                createNewTodo()
                if (todoTitle === "") return
                clearFields()
              }}
              bgColor='gray.300'
              _hover={{ bgColor: "gray.200" }}
              variant='ghost'
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default Form
