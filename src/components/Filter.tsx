import { Box, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react"
import { FaFilter } from "react-icons/fa"

type Props = {
  setSortBy: Function
}

const Filter = ({ setSortBy }: Props) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px", zIndex: 101 }}>
      <Menu>
        <MenuButton _hover={{ background: "gray.200" }} padding={2} borderRadius={4}>
          <Box display="flex" alignItems='center' gap={2}>
            <FaFilter />
            <Text fontWeight={700}>Sort</Text>
          </Box>
        </MenuButton>
        <MenuList>
          <MenuItem onClick={(e: any) => setSortBy(e.target.value)} value='date'>
            Date
          </MenuItem>
          <MenuItem onClick={(e: any) => setSortBy(e.target.value)} value='priority'>
            Priority
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  )
}

export default Filter
