import {
  Button,
  Flex,
  Input,
  MenuItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react"
import Compact from "@uiw/react-color-compact"
import { useState } from "react"
import { useLocalStorage } from "usehooks-ts"
import { Category, TodoModel } from "../utils/models"

type Props = {
  category: Category
}

const EditCategoryForm = ({ category }: Props) => {
  const [newTitle, setNewTitle] = useState<string>(category.title)
  const [newHex, setNewHex] = useState<string>(category.color)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [categories, setCategories] = useLocalStorage<Category[]>("categories", [])
  const [todos, setTodos] = useLocalStorage<TodoModel[]>("tasks", [])

  const todosWithThisCategory = todos.filter(todo => todo.category && todo.category.id === category.id)
  function updateCategory() {
    const thisCategory = categories.find(c => c.id === category.id)

    if (thisCategory) {
      thisCategory.title = newTitle
      thisCategory.color = newHex

      if (todosWithThisCategory) {
        todosWithThisCategory.map(todo => (todo.category = thisCategory))
      }

      setTodos(todos)
      setCategories(categories)
    } else {
      console.error("Category not found")
    }
  }
  return (
    <>
      <MenuItem onClick={onOpen}>Edit</MenuItem>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Category {category.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input onChange={e => setNewTitle(e.target.value)} value={newTitle} placeholder='Title' />
            <Flex mt={4} direction='column' gap={2}>
              <Compact
                color={newHex}
                style={{
                  boxShadow: "rgb(0 0 0 / 15%) 0px 0px 0px 1px, rgb(0 0 0 / 15%) 0px 8px 16px",
                }}
                onChange={color => {
                  setNewHex(color.hex)
                }}
              />
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='purple' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              bgColor='gray.300'
              _hover={{ bgColor: "gray.200" }}
              onClick={updateCategory}
              variant='ghost'
            >
              Edit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default EditCategoryForm
