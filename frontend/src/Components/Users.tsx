import { useState, useEffect } from "react"
import InputBox from "./InputBox"
import axios from "axios";
import Button from "./Button";
import { useNavigate } from "react-router-dom";


function useDebounce(filter:string,time:number){
    const [debounceValue,setDebounceValue] = useState<string>();

    useEffect(()=>{
        let timer  = setTimeout(()=>{
            setDebounceValue(filter);
        },time)

        return (()=>{
            clearTimeout(timer);
        })
    },[time,filter])
    return debounceValue;
}

function Users() {
    const [users, setUsers] = useState<[{ id: string, email: string, firstName: string, lastName: string }]>();
    const [filter, setFilter] = useState('');
    const navigate = useNavigate();
    const debouncedFilter = useDebounce(filter,500);

    useEffect(() => {
        const getData = async () => {
            let res = await axios.get('http://localhost:9000/api/users/allUsers?filter=' + debouncedFilter);
            setUsers(res.data.users);
        }
        getData();
    }, [debouncedFilter])

    return (
        <div className="mt-6" >
            <div className="font-bold text-3xl" >
                Users
                Debounced Filter: {debouncedFilter}
            </div>
            <div className="mt-4" >
                <InputBox onChange={(e) => setFilter(e.target.value)} placeholder={"Search Users..."} type={"string"} value={filter} />
            </div>
            <div>
                {users && users.map((user) => {
                    return (
                        <div key={user.id} className="mt-6" >
                            <div className="flex justify-between">
                                <div className="flex text-2xl font-bold" >
                                    <div className="rounded-full border h-12 w-12 text-center bg-gray-200 mr-4 " >
                                        {user.firstName[0]}
                                    </div>
                                    <div>
                                        {user.firstName + " " + user.lastName}
                                    </div>
                                </div>
                                <div className="text-lg">
                                    <Button onClick={()=>{navigate(`/send?id=${user.id}&name=${user.firstName}`)}} label={"Send money"} />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Users
