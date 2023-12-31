import { Grid, GridItem } from "@chakra-ui/react"
import React from "react"
import { Outlet } from "react-router-dom"
import MobileMenu from "./NavBar/MobileMenu"
import NavBar from "./NavBar/NavBar"

if (localStorage.getItem("tasks") === null) {
  localStorage.setItem("tasks", JSON.stringify([]))
}

const Layout = React.memo(() => {
  return (
    <div>
      <Grid
        templateAreas={`"nav main"`}
        gridTemplateRows={"1fr"}
        gridTemplateColumns={{ base: "0", md: "250px 1fr" }}
        h='100vh'
        gap='1'
        color='blackAlpha.700'
        marginRight={4}
        overflowX='hidden'
      >
        <GridItem p={0} area={"nav"}>
          <NavBar />
          <MobileMenu />
        </GridItem>
        <GridItem pl='2' pt='2' area={"main"}>
          <Outlet />
        </GridItem>
      </Grid>
    </div>
  )
})

export default Layout
