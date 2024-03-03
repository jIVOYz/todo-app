import { Button, Flex } from "@chakra-ui/react"
import { TbFlag3Filled } from "react-icons/tb"
import { Priority } from "../../utils/models"
import { priorities } from "../../utils/other"

interface Props {
  todoPriority: Priority
  setTodoPriority: Function
}

const PickPriorioty = ({todoPriority, setTodoPriority }: Props) => {
  return (
    <>
      <Flex gap={2}>
        {priorities.map(p => (
          <Button background={todoPriority.id === p.id ? "gray.200" : "transparent"} key={p.id} onClick={() => setTodoPriority(p)} padding={0}>
            <TbFlag3Filled size='1.3em' color={p.color} />
          </Button>
        ))}
      </Flex>
    </>
  )
}

export default PickPriorioty
