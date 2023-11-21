import { Select } from "@chakra-ui/react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { TodoModel } from "../utils/models.ts"

type Props = {
  setSortBy: Function
}

const Filter = ({ setSortBy }: Props) => {
  const sortTypes = {
    none: { id: 0, sortProperty: "none" },
    date: { id: 1, sortProperty: "date" },
    priority: { id: 2, sortProperty: "priority" },
  }
  return (
    <Select
      width='240px'
      variant='filled'
      bgColor='gray.100'
      onChange={e => {
        setSortBy(prev => {
          prev.set("sortBy", e.target.value)
          return prev
        })
      }}
      defaultValue='none'
    >
      <option disabled value={sortTypes.none.sortProperty}>
        Sort By
      </option>
      <option value={sortTypes.date.sortProperty}>Date Descending</option>
      <option value={sortTypes.priority.sortProperty}>High Priority</option>
    </Select>
  )
}

export default Filter
