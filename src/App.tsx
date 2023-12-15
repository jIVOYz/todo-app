import { Route, Routes } from "react-router-dom"
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
        <Route path='/todo-app/' element={<Layout />}>
          <Route path='/todo-app/' element={<AllTodos />} />
          <Route path='/todo-app/today' element={<Today />} />
          <Route path='/todo-app/week' element={<Week />} />
          <Route path='/todo-app/category/:categoryId' element={<CategoryPage />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
