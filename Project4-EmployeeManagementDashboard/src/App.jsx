import { BrowserRouter, Routes, Route } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Layout from './pages/Layout.jsx'
import NotFound from './pages/NotFound.jsx';
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import EmployeeList from './pages/EmployeeList.jsx';
import EmployeeCard from "./pages/EmployeeCard.jsx";
import AddEmployee from "./pages/AddEmployee.jsx";


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element= {<Layout /> }>
        <Route index element={<EmployeeList />}/>
        <Route path="login" element={<Login />}/>
        <Route path="register" element={<Register />}/>
        <Route path="addEmployee" element={<AddEmployee />}/>
        <Route path="employeeCard" element={<EmployeeCard />}/>
        <Route path="*" element={<NotFound />}/>
      </Route>
    </Routes>
  </BrowserRouter>

  )
}

export default App
