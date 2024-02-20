
interface headingProps {
    heading:string,
    subHeading:string
}

export default function Heading({heading,subHeading}:headingProps){
    return (
        <>
            <div className="font-sans font-bold text-4xl py-2" >
                {heading}
            </div>
            <div className="text-gray-500 pb-4" >
                {subHeading}
            </div>
        </>
    )
}