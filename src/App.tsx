import { Route, Routes } from "react-router-dom"

import { useEffect } from "react"
import { useLocalStorage } from "usehooks-ts"
import Layout from "./components/Layout"
import AllTodos from "./pages/AllTodos"
import CategoryPage from "./pages/CategoryPage"
import NotFound from "./pages/NotFound"
import Today from "./pages/Today"
import Week from "./pages/Week"

if (localStorage.getItem("tasks") === null) {
  localStorage.setItem("tasks", JSON.stringify([]))
}

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<AllTodos />} />
          <Route path='today' element={<Today />} />
          <Route path='week' element={<Week />} />
          <Route path='category/:categoryId' element={<CategoryPage />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
