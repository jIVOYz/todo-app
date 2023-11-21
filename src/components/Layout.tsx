import { Grid, GridItem } from "@chakra-ui/react"
import React from "react"
import { Outlet } from "react-router-dom"

import NavBar from "./NavBar/NavBar"

const Layout = React.memo(() => {
  return (
    <div>
      <Grid
        templateAreas={`"nav main"`}
        gridTemplateRows={"1fr"}
        gridTemplateColumns={"250px 1fr"}
        h='100vh'
        gap='1'
        color='blackAlpha.700'
      >
        <GridItem p={0} area={"nav"}>
          <NavBar />
        </GridItem>
        <GridItem pl='2' pt='2' area={"main"}>
          <Outlet />
        </GridItem>
      </Grid>
    </div>
  )
})

export default Layout
