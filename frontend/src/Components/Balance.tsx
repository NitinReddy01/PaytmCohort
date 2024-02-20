
interface BalanceProps {
    amount: number
}

function Balance({ amount }: BalanceProps) {
    return (
        <div className="font-bold text-3xl flex " >
            Your Balance
            <div className="ml-4 font-bold">
                ${amount}
            </div> 
        </div>
    )
}

export default Balance
