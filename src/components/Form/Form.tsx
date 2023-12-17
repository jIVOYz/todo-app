import { Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useLocalStorage } from "usehooks-ts"
import { Category, Priority, TodoModel } from "../../utils/models"
import { priorities } from "../../utils/other"
import PickCategory from "./PickCategory"
import PickDate from "./PickDate"
import PickPriorioty from "./PickPriorioty"

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

  useEffect(() => {
    setTodoCategory(
      initialCategory
        ? initialCategory
        : {
            id: crypto.randomUUID(),
            title: "",
            color: "",
          }
    )
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

  // @ts-ignore
  const [todos, setTodos] = useLocalStorage<TodoModel[]>("tasks", [])
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
    <div style={{ marginBottom: "10px", zIndex: 100 }}>
      <form
        onSubmit={e => {
          e.preventDefault()
        }}
      >
        <InputGroup>
          <Input
            paddingY={4}
            paddingRight={24}
            _focus={{ border: "none" }}
            onKeyUp={e => {
              if (e.key === "Enter") {
                if (todoTitle === "") return
                createNewTodo()
                clearFields()
              }
            }}
            onChange={e => setTodoTitle(e.target.value)}
            value={todoTitle}
            placeholder={`Add task to ${title} `}
          />
          <InputRightElement display='flex' alignItems='center' marginRight={{ base: 16, md: 20 }}>
            <PickPriorioty todoPriority={todoPriority} setTodoPriority={setTodoPriority} />
            <PickCategory todoCategory={todoCategory} setTodoCategory={setTodoCategory} />
            <PickDate todoDueDate={todoDueDate} setTodoDueDate={setTodoDueDate} />
          </InputRightElement>
        </InputGroup>
      </form>
    </div>
  )
}

export default Form
