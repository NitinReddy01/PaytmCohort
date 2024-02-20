import { useState } from "react";
import InputBox from "../Components/InputBox";
import { useSearchParams } from "react-router-dom";

function SendMoney() {
    const [amount,setAmount] = useState<string>("");
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const name = searchParams.get('name');
  return (
    <div className="p-2 h-screen bg-gray-200 flex justify-center items-center" >
        
      <div className="border shadow-lg w-96 h-96 p-4 bg-white">
        <div className=" font-bold text-center text-3xl mb-8" >
            Send Money
        </div>
        <div className="flex" >
            <div className="rounded-full w-12 h-12 text-2xl bg-green-500 text-center mr-4 " >
                {name && name[0].toUpperCase()}
            </div>
            <div className="font-bold text-2xl" >{name}</div>
        </div>
        <InputBox label={"Amount (in Rs)"} type={"number"} placeholder={"Enter Amount"} value={amount} onChange={(e)=>setAmount(e.target.value)} />
        <button className="w-full bg-green-500 rounded-md p-2 text-white " > Send </button>
      </div>
    </div>
  )
}

export default SendMoney
