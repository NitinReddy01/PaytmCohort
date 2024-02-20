import { ChangeEvent } from "react"

interface InputBoxProps {
    placeholder:string,
    label?:string,
    type:string,
    value:string,
    onChange:(e:ChangeEvent<HTMLInputElement>)=>void
}

function InputBox({placeholder,label,type,value,onChange}:InputBoxProps) {
  return (
    <div className="mb-4" >
    {label && <div className="text-lg font-semibold text-left " >
        {label}
    </div> }
    <input placeholder={placeholder} type={type} onChange={onChange} value={value} className="w-full border rounded border-gray-400 p-2 " />
    </div>
  )
}

export default InputBox
