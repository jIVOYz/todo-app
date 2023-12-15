import {
  Box,
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import Compact from "@uiw/react-color-compact"
import { useState } from "react"

type Props = {
  createNewCategory: Function
}

const NewCategoryForm = ({ createNewCategory }: Props) => {
  const [categoryTitle, setCategoryTitle] = useState<string>("")
  const [hex, setHex] = useState<string>("")

  const clearFields: Function = () => {
    setCategoryTitle("")
  }

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <div style={{ marginBottom: "10px" }}>
      <Button onClick={onOpen}>
        <Flex gap={2} alignItems='center' color='gray.600'>
          New Category
        </Flex>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Category</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              onChange={e => setCategoryTitle(e.target.value)}
              value={categoryTitle}
              placeholder='Title'
            />

            <Box mt={4}>
              <Text mb={2} fontSize={18} fontWeight={500} color='gray.600'>
                Color
              </Text>
              <Compact
                color={hex}
                style={{
                  boxShadow: "rgb(0 0 0 / 15%) 0px 0px 0px 1px, rgb(0 0 0 / 15%) 0px 8px 16px",
                }}
                onChange={color => {
                  setHex(color.hex)
                }}
              />
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              onClick={() => {
                createNewCategory(categoryTitle, hex)
                if (categoryTitle === "") return
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

export default NewCategoryForm
