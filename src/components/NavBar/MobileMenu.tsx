import { HamburgerIcon } from "@chakra-ui/icons"
import { Box, Button, Divider, Flex, Slide, useDisclosure } from "@chakra-ui/react"
import classNames from "classnames"
import { HiOutlineRectangleStack } from "react-icons/hi2"
import { TbCalendar, TbCalendarEvent } from "react-icons/tb"
import { NavLink } from "react-router-dom"
import Categories from "../Categories"
import classes from "./Colors.module.css"

const MobileMenu = () => {
  // const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Box p={4} display={{ base: "flex", md: "none" }}>
      <Button onClick={onToggle} bgColor='gray.200' position='fixed' left='8px' top='10px'>
        <HamburgerIcon />
      </Button>
      <Slide direction='left' in={isOpen} style={{ zIndex: 100 }}>
        <Flex
          bgColor='gray.100'
          position='fixed'
          w={{ base: "100%", sm: "60%" }}
          h='100%'
          p={3}
          pt={12}
          direction='column'
          zIndex={100}
        >
          <Button onClick={onToggle} bgColor='gray.300' position='absolute' left='8px' top='5px'>
            <HamburgerIcon />
          </Button>
          <NavLink
            to='/'
            className={({ isActive, isPending }) =>
              isPending ? "" : isActive ? classNames(classes.all, classes.item) : classes.item
            }
            onClick={onToggle}
          >
            <Flex alignItems='center' gap={2} fontWeight={500}>
              <HiOutlineRectangleStack size='1.5em' color='#4A5568' />
              All
            </Flex>
          </NavLink>
          <NavLink
            to='/today'
            className={({ isActive, isPending }) =>
              isPending ? "" : isActive ? classNames(classes.other, classes.item) : classes.item
            }
            onClick={onToggle}
          >
            <Flex alignItems='center' gap={2} fontWeight={500}>
              <TbCalendarEvent size='1.5em' color='#4A5568' />
              Today
            </Flex>
          </NavLink>
          <NavLink
            to='/week'
            className={({ isActive, isPending }) =>
              isPending ? "" : isActive ? classNames(classes.other, classes.item) : classes.item
            }
            onClick={onToggle}
          >
            <Flex alignItems='center' gap={2} fontWeight={500}>
              <TbCalendar size='1.5em' color='#4A5568' />
              This Week
            </Flex>
          </NavLink>
          <Divider mt={4} colorScheme='purple' />
          <Categories onToggle={onToggle} />
        </Flex>
      </Slide>
    </Box>
  )
}

export default MobileMenu
