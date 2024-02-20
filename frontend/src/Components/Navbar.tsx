
function Navbar() {
  return (
    <div className="shadow flex justify-between border-b border-gray-300 pb-2 mb-10 ">
      <div className="font-extrabold text-3xl " >
        Payments App
      </div>
      <div className="flex text-2xl font-semibold" >
        Hello, User
        <div className="rounded-full border w-8 text-center bg-gray-200 ml-2 " >
          U
        </div>
      </div>
    </div>
  )
}

export default Navbar
