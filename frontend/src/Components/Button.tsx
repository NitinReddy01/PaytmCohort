
interface ButtonProps{
    onClick:()=>void,
    label:string
}

export default  function Button({label,onClick}:ButtonProps){
    return (
        <>
        <button type="button"  onClick={onClick} className="w-full border rounded-lg bg-gray-700 text-white p-2" >{label}</button>
        </>
    )
}