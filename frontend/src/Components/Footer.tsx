import { Link } from "react-router-dom"

interface FooterProps {
    msg:string,
    to:string,
    buttonText:string
}

function Footer({msg,to,buttonText}:FooterProps) {
  return (
    <>
    <div className="p-4 text-sm font-medium">
        {msg}
        <Link className="underline pl-1" to={to} > {buttonText} </Link>
    </div>
    </>
  )
}

export default Footer
