import { Divider, Flex } from "@chakra-ui/react"
import classNames from "classnames"
import React from "react"
import { HiOutlineRectangleStack } from "react-icons/hi2"
import { TbCalendar, TbCalendarEvent } from "react-icons/tb"
import { NavLink } from "react-router-dom"
import Categories from "../Categories"
import classes from "./Colors.module.css"

const NavBar = React.memo(() => {
  return (
    <>
      <Flex display={{ base: "none", md: "block" }} bgColor='gray.100' h='100vh' p={3} direction='column'>
        <NavLink
          to='/todo-app/'
          className={({ isActive, isPending }) =>
            isPending ? "" : isActive ? classNames(classes.all, classes.item) : classes.item
          }
        >
          <Flex alignItems='center' gap={2} fontWeight={500}>
            <HiOutlineRectangleStack size='1.5em' color='#4A5568' />
            All
          </Flex>
        </NavLink>
        <NavLink
          to='/todo-app/today'
          className={({ isActive, isPending }) =>
            isPending ? "" : isActive ? classNames(classes.other, classes.item) : classes.item
          }
        >
          <Flex alignItems='center' gap={2} fontWeight={500}>
            <TbCalendarEvent size='1.5em' color='#4A5568' />
            Today
          </Flex>
        </NavLink>
        <NavLink
          to='/todo-app/week'
          className={({ isActive, isPending }) =>
            isPending ? "" : isActive ? classNames(classes.other, classes.item) : classes.item
          }
        >
          <Flex alignItems='center' gap={2} fontWeight={500}>
            <TbCalendar size='1.5em' color='#4A5568' />
            This Week
          </Flex>
        </NavLink>
        <Divider mt={4} colorScheme='purple' />
        <Categories />
      </Flex>
    </>
  )
})

export default NavBar
