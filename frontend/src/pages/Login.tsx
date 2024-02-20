import { useNavigate } from "react-router-dom"
import Button from "../Components/Button"
import Footer from "../Components/Footer"
import Heading from "../Components/Heading"
import InputBox from "../Components/InputBox"
import { useState } from "react"
import axios from "axios"

function Login() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const navigate = useNavigate();

  const submit = async ()=>{
    try {
      await axios.post('http://localhost:9000/api/auth/signin',{email,password});
      setEmail('');
      setPassword('');
      navigate('/dashboard')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
    <div className="h-screen bg-gray-400 flex justify-center items-center" >
      <div className=" w-96 h-max bg-white rounded-lg text-center p-4 ">
        <Heading heading={"Login"}  subHeading={"Enter your credentials to access your account"} />
        <InputBox placeholder={"johnexample@gmail.com"} value={email} onChange={(e)=>setEmail(e.target.value)} type={"text"} label={"Email"} />
        <InputBox placeholder={"password"} type={"password"} value={password} onChange={(e)=>setPassword(e.target.value)} label={"Password"} />
        <Button label={"login"} onClick={submit} />
        <Footer msg={"Don't have an account?"} to={"/register"} buttonText={"Register"} />
      </div>
    </div>
    </>
  )
}

export default Login
