import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import MainLayout from './Layout/MainLayout';
import Loading from './components/reusable/Loading';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '@ag-grid-community/styles/ag-theme-quartz.css';
import EmployeeData from './pages/EmployeeData';
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <MainLayout>
        <HomePage />
      </MainLayout>
    ),
  },
  {
    path: '/employee-list',
    element: (
      <MainLayout>
        <EmployeeData />
      </MainLayout>
    ),
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/loading',
    element: <Loading />,
  },
]);
function App() {
  return (
    <>
      
      <RouterProvider router={router} />
    </>
  );
}

export default App;
