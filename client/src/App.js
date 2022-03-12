import './App.css';
import {useEffect, useState} from "react";
import {useQuery} from "@apollo/client";
import {GET_ALL_USERS} from "./query/user";

function App() {
    const [users, setUsers] = useState([]);
    const {data, loading, error} = useQuery(GET_ALL_USERS)
    console.log('data', data)
    useEffect(() => {
        if (!loading) {
            setUsers(data.getAllUsers)
        }
    }, [data])

    if (loading) {
        return <h1>Loading ...</h1>
    }

    return (
        <div>
            <form>
                <input type="text"/>
                <input type="number"/>
                <div className={'btns'}>
                    <button>Create User</button>
                    <button>Get Users</button>
                </div>
            </form>
            <div>
                {users.map(user => (
                    <div className={'user'} key={user.id}>{user.id}. {user.userName} {user.age}</div>
                ))}
            </div>
        </div>
    );
}

export default App;
