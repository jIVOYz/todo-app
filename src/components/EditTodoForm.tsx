import { ChevronDownIcon } from "@chakra-ui/icons"
import {
  Button,
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
  Textarea,
  useDisclosure,
} from "@chakra-ui/react"
import { useState } from "react"
import { useLocalStorage, useReadLocalStorage } from "usehooks-ts"
import { Category, Priority, TodoModel } from "../utils/models"
import PickPriorioty from "./Form/PickPriorioty"

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
            <Textarea
              onChange={e => setNewTodoDescription(e.target.value)}
              value={newTodoDescription}
              resize='none'
              height="auto"
              mt={2}
              placeholder='Description'
            />
            <Input
              mt={2}
              onChange={e => setNewTodoDueDate(e.target.value)}
              type='date'
              value={newTodoDueDate}
            />
              <PickPriorioty todoPriority={newTodoPriority} setTodoPriority={setNewTodoPriority}/>
              <Menu>
                <MenuButton mt={5} fontWeight={500} as={Button} rightIcon={<ChevronDownIcon />}>
                  {newTodoCategory !== null ? newTodoCategory.title : "Category"}
                </MenuButton>

                <MenuList>
                  <MenuItem
                    onClick={() => setNewTodoCategory(null)}
                  >
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
