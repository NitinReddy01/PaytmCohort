import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import SendMoney from "./pages/SendMoney"


function App() {

  return (
    <>
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="register" element={<Register/>} />
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path='/send' element={<SendMoney/>}/>
    </Routes>
    </>
  )
}

export default App
