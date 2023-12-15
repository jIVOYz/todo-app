import { ChakraProvider } from "@chakra-ui/react"
import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Layout from "./components/Layout.tsx"
import AllTodos from "./pages/AllTodos.tsx"
import CategoryPage from "./pages/CategoryPage.tsx"
import NotFound from "./pages/NotFound.tsx"
import Today from "./pages/Today.tsx"
import Week from "./pages/Week.tsx"

const router = createBrowserRouter([
  {
    path: "/todo-app/",
    element: <Layout />,
    children: [
      {
        path: "/todo-app/",
        element: <AllTodos />,
      },
      {
        path: "/todo-app/today",
        element: <Today />,
      },
      {
        path: "/todo-app/week",
        element: <Week />,
      },
      {
        path: "/todo-app/category/:categoryId",
        element: <CategoryPage />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
)
