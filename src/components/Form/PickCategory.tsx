import {
  Button,
  Flex,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  Tooltip,
} from "@chakra-ui/react"
// import { useState } from "react"
import { TbCategory } from "react-icons/tb"
import { useReadLocalStorage } from "usehooks-ts"
import { Category } from "../../utils/models"

interface Props {
  todoCategory: Category | null
  setTodoCategory: Function
}
const PickCategory = ({ todoCategory, setTodoCategory }: Props) => {
  const categories = useReadLocalStorage<Category[] | null>("categories")
  return (
    <>
      {/* Pick category popover */}
      <Popover>
        <PopoverTrigger>
          <Flex direction='column' alignItems='center'>
            <Tooltip openDelay={300} label='Category'>
              <Button
                type='button'
                background='transparent'
                _hover={{ background: "transparent" }}
                paddingY={4}
                paddingX={8}
                boxSize='1em'
              >
                <Flex direction='column' alignItems='center'>
                  <TbCategory size='1.2em' />
                  <Text fontSize={{ base: 14, md: 16 }} fontWeight={500}>
                    {todoCategory && todoCategory.title.substr(0, 10)}
                  </Text>
                </Flex>
              </Button>
            </Tooltip>
          </Flex>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverBody>
            <Flex direction='column' gap={2}>
              {categories &&
                categories.map(c => (
                  <Button background='transparent' key={c.id} onClick={() => setTodoCategory(c)} padding={0}>
                    {c.title}
                  </Button>
                ))}
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  )
}

export default PickCategory
