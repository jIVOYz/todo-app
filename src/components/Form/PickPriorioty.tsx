import { Button, Flex, Popover, PopoverBody, PopoverContent, PopoverTrigger } from "@chakra-ui/react"
import { TbFlag3Filled } from "react-icons/tb"
import { Priority } from "../../utils/models"
import { priorities } from "../../utils/other"

interface Props {
  todoPriority: Priority
  setTodoPriority: Function
}

const PickPriorioty = ({ todoPriority, setTodoPriority }: Props) => {
  return (
    <>
      {/* Pick priority popover */}
      <Popover>
        <PopoverTrigger>
          <Button
            type='button'
            background='transparent'
            _hover={{ background: "gray.200" }}
            padding={0}
            boxSize='1.3em'
          >
            <TbFlag3Filled size='1.3em' color={priorities[todoPriority.id].color} />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverBody>
            <Flex>
              {priorities.map(p => (
                <Button background='transparent' key={p.id} onClick={() => setTodoPriority(p)} padding={0}>
                  <TbFlag3Filled size='1.3em' color={p.color} />
                </Button>
              ))}
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  )
}

export default PickPriorioty
