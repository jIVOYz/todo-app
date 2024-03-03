import {
  Button,
  Flex,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
} from "@chakra-ui/react"
import { TbCategoryFilled } from "react-icons/tb"
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
                fontWeight={500}
              >
               <TbCategoryFilled size="1.5em" color={todoCategory?.color} /> 
             </Button>
            </Tooltip>
          </Flex>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverBody>
            <Flex direction='column' gap={2}>
              {categories &&
                categories.map(c => (
                  <Button background={todoCategory!.id === c.id ? "gray.100" : "transparent" } key={c.id} onClick={() => setTodoCategory(c)} padding={0}>
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
