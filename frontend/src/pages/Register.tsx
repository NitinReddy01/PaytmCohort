import { useNavigate } from "react-router-dom"
import Button from "../Components/Button"
import Footer from "../Components/Footer"
import Heading from "../Components/Heading"
import InputBox from "../Components/InputBox"
import { useState } from "react"
import axios from "axios"


function Register() {
  const navigate = useNavigate();
  const [email,setEmail] = useState('');
  const [firstName,setFirstName] = useState('');
  const [lastName,setLastName] = useState('');
  const [password,setPassword] = useState('');

  const submit = async ()=>{
    try {
      await axios.post('http://localhost:9000/api/auth/signup',{email,firstName,lastName,password});
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
    <div className="h-screen bg-gray-400 flex justify-center items-center" >
      <div className=" w-96 h-max bg-white rounded-lg text-center p-4 ">
        <Heading heading={"Register"} subHeading={"Enter your information to create an account"}/>
        <InputBox placeholder={"firstname"} type={"text"}  value={firstName} onChange={(e)=>setFirstName(e.target.value)}  label={"Firstname"} />
        <InputBox placeholder={"Lastname"} type={"text"} value={lastName} onChange={(e)=>setLastName(e.target.value)} label={"Lastname"} />
        <InputBox placeholder={"johnexample@gmail.com"} value={email} onChange={(e)=>setEmail(e.target.value)} type={"text"} label={"Email"} />
        <InputBox placeholder={"password"} type={"password"} value={password} onChange={(e)=>setPassword(e.target.value)} label={"Password"} />
        <Button label={"Register"} onClick={submit }  />
        <Footer msg={"Already have an account?"} to={"/login"} buttonText={"Login"} />
      </div>
    </div>
    </>
  )
}

export default Register
