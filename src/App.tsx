import './App.css'
import { Button } from "@/components/ui/button"
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import MainLayout from './Layout/MainLayout';

const router = createBrowserRouter([
  {
    path: "/",
   element:<MainLayout>
     <HomePage/>
   </MainLayout>
  },
  {
    path: "/login",
   element: <Login/>
  }
])
function App() {
  return (
    <>
       <RouterProvider router={router} />
    </>
  )
}

export default App




