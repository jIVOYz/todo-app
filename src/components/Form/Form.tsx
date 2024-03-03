import { Button, Input, InputGroup, InputRightAddon, Popover, PopoverContent, PopoverTrigger } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useLocalStorage } from "usehooks-ts"
import { Category, Priority, TodoModel } from "../../utils/models"
import { priorities } from "../../utils/other"
import PickCategory from "./PickCategory"
import PickDate from "./PickDate"
import PickPriorioty from "./PickPriorioty"
import { MdOutlineKeyboardArrowDown } from "react-icons/md"

interface Props {
  title: string | undefined
  initialDate?: TodoModel["dueDate"]
  initialCategory?: Category | null | undefined
}

const Form = ({ title, initialCategory, initialDate }: Props) => {
  const [todoTitle, setTodoTitle] = useState<string>("")
  const [todoDescription, setTodoDescription] = useState<string>("")
  const [todoDueDate, setTodoDueDate] = useState<string>(initialDate ? initialDate : "")
  const [todoPriority, setTodoPriority] = useState<Priority>(priorities[0])
  const [todoCategory, setTodoCategory] = useState<Category | null>(
    initialCategory
      ? initialCategory
      : {
        id: crypto.randomUUID(),
        title: "",
        color: "",
      }
  )
  // @ts-ignore
  const [todos, setTodos] = useLocalStorage<TodoModel[]>("tasks", [])
 
  useEffect(() => {
    setTodoCategory(
      initialCategory
        ? initialCategory
        : {
          id: crypto.randomUUID(),
          title: "",
          color: "",
        })
  }, [initialCategory])
  const clearFields = () => {
    setTodoTitle("")
    setTodoDescription("")
    setTodoDueDate(initialDate ? initialDate : "")
    setTodoPriority(priorities[0])
    setTodoCategory(
      initialCategory
        ? initialCategory
        : {
          id: crypto.randomUUID(),
          title: "",
          color: "",
        }
    )
  }

function handleSubmit(e: any) {
    if(e.key === "Enter") {
      createNewTodo()
      clearFields()
    } else {
      return
    }
  }

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

    setTodos((currentTodos: TodoModel[]) => {
      return [newTodo, ...currentTodos]
    })
  }

  return (
      <InputGroup mb={2}>
        <Input onKeyUp={e => handleSubmit(e)} placeholder={`Add todo to ${title}`} value={todoTitle} onChange={e => {
          setTodoTitle(e.target.value)
        }} />
        <InputRightAddon bg="transparent">
          {/* Set parametrs for todo */}
          <PickCategory todoCategory={todoCategory} setTodoCategory={setTodoCategory} />
          <Popover>
            <PopoverTrigger>
              <Button bg='transparent' p={0}>
                <MdOutlineKeyboardArrowDown />
              </Button>
            </PopoverTrigger>
            <PopoverContent padding={2}>
              <PickDate todoDueDate={todoDueDate} setTodoDueDate={setTodoDueDate} />
              <PickPriorioty todoPriority={todoPriority} setTodoPriority={setTodoPriority} />
            </PopoverContent>
          </Popover>

        </InputRightAddon>
      </InputGroup>
  )
}

export default Form
