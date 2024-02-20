import Balance from "../Components/Balance"
import Navbar from "../Components/Navbar"
import Users from "../Components/Users"


function Dashboard() {
  return (
    <div className="p-4 bg-gray-200 h-screen" >
      <Navbar />
      <Balance amount={5000} />
      <Users/>
    </div>
  )
}

export default Dashboard
