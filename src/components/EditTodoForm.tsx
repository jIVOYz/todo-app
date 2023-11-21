import { ChevronDownIcon } from "@chakra-ui/icons"
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

type Props = {
  todo: TodoModel
}

const EditTodoForm = ({ todo }: Props) => {
  const [newTodoTitle, setNewTodoTitle] = useState<string>(todo.title)
  const [newTodoDescription, setNewTodoDescription] = useState<string>(todo.description)
  const [newTodoDueDate, setNewTodoDueDate] = useState<string>(todo.dueDate)
  const [newTodoPriority, setNewTodoPriority] = useState<Priority>(todo.priority)
  const [newTodoCategory, setNewTodoCategory] = useState<Category | null>(todo.category)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [todos, setTodos] = useLocalStorage<TodoModel[]>("tasks", [])
  const categories = useReadLocalStorage<Category[]>("categories")

  function updateTodo() {
    let thisTodo = todos.find(t => t.id === todo.id)

    if (thisTodo) {
      thisTodo.title = newTodoTitle
      thisTodo.description = newTodoDescription
      thisTodo.dueDate = newTodoDueDate
      thisTodo.priority = newTodoPriority
      thisTodo.category = newTodoCategory
      setTodos(todos)
    } else {
      console.error("Todo not found")
    }
  }

  return (
    <>
      <MenuItem onClick={onOpen}>Edit</MenuItem>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input onChange={e => setNewTodoTitle(e.target.value)} value={newTodoTitle} placeholder='Title' />
            <Input
              onChange={e => setNewTodoDescription(e.target.value)}
              value={newTodoDescription}
              mt={2}
              placeholder='Description'
            />
            <Input
              mt={2}
              onChange={e => setNewTodoDueDate(e.target.value)}
              type='date'
              value={newTodoDueDate}
            />
            <Flex direction='column' gap={2}>
              <Menu>
                <MenuButton mt={5} colorScheme='purple' as={Button} rightIcon={<ChevronDownIcon />}>
                  {newTodoPriority.title}
                </MenuButton>
                <MenuList>
                  {priorities.map(p => (
                    <MenuItem key={Math.random()} onClick={() => setNewTodoPriority(p)}>
                      {p.title}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>

              <Menu>
                <MenuButton mt={5} colorScheme='purple' as={Button} rightIcon={<ChevronDownIcon />}>
                  {newTodoCategory ? newTodoCategory.title : "Category"}
                </MenuButton>

                <MenuList>
                  <MenuItem onClick={() => setNewTodoCategory({ id: 0, title: "", color: "" })}>
                    No Category
                  </MenuItem>
                  {categories?.map(category => (
                    <MenuItem
                      key={category.id}
                      onClick={() => {
                        setNewTodoCategory(category)
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
            <Button colorScheme='purple' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button bgColor='gray.300' _hover={{ bgColor: "gray.200" }} onClick={updateTodo} variant='ghost'>
              Edit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default EditTodoForm
