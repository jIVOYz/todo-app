import { CalendarIcon } from "@chakra-ui/icons"
import { Button, Flex, Input, Text, Tooltip } from "@chakra-ui/react"
import { isThisYear, isToday, isTomorrow } from "date-fns"
import { useRef } from "react"
import { TodoModel } from "../../utils/models"

interface Props {
  todoDueDate: TodoModel["dueDate"]
  setTodoDueDate: Function
}
const PickDate = ({ todoDueDate, setTodoDueDate }: Props) => {
  const dateInputRef = useRef<any>()

  const formatedDate = () => {
    const date = new Date(todoDueDate)
    const dateStr = new Date(todoDueDate).toDateString()

    const monthName = dateStr.split(" ")
    const stringDate = monthName[1] + " " + date.getDate()
    const nextYearDateStr = date.getFullYear() + " " + monthName[1] + " " + date.getDate()
    const isDateToday = isToday(date)
    const isDateTomorrow = isTomorrow(date)

    return isDateToday
      ? "Today"
      : isDateTomorrow
        ? "Tomorrow"
        : isThisYear(date)
          ? stringDate
          : nextYearDateStr
  }

  return (
    <>
      {/* Pick date button */}
      <Tooltip openDelay={300} label='Date'>
        <Button
          type='button'
          background='transparent'
          _hover={{ background: 'transparent' }}
          paddingY={4}
          onClick={() => {
            dateInputRef.current.showPicker()
          }}
          display="inline-flex"
          justifyContent='flex-start'
        >
          <Flex alignItems="center">
            <CalendarIcon />
            {todoDueDate !== "" ? (
              <Text fontSize={{ base: 14, md: 16 }} marginX={2}>
                {formatedDate()}
              </Text>

            ): <Text fontSize={{ base: 14, md: 16 }} marginX={2}>Date</Text>}
          </Flex>
        </Button>
      </Tooltip>
      <Input
        visibility='hidden'
        position='absolute'
        left='0'
        top='0px'
        type='date'
        ref={dateInputRef}
        onChange={e => setTodoDueDate(e.target.value)}
        value={todoDueDate}
      />
    </>
  )
}

export default PickDate
