import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/dashboard"
import Login from "./components/login"
import Users from "./pages/users"
import Attendances from "./pages/attendances"
import FormAddUser from "./pages/addUser"
import FromAddAttendance from "./pages/addAttendance"

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/attendances" element={<Attendances />} />
          <Route path="/users/add" element={<FormAddUser />} />
          <Route path="/attendances/add" element={<FromAddAttendance />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
