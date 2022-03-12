import './App.css';
import {useEffect, useState} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {GET_ALL_USERS, GET_ONE_USER} from "./query/user";
import {CREATE_USER} from "./mutations/user";

function App() {
    const [users, setUsers] = useState([]);
    const [userName, setUserName] = useState('');
    const [age, setAge] = useState('');

    const {data, loading, error, refetch} = useQuery(GET_ALL_USERS)
    const {data: oneUser, loading: loadingOneUse} = useQuery(GET_ONE_USER, {
        variables: {
            id: 1
        }
    })

    console.log('one', oneUser)
    const [newUser] = useMutation(CREATE_USER)

    const addUser = (e) => {
        e.preventDefault()
        newUser({
            variables: {
                input: {
                    userName, age
                }
            }
        }).then(({data}) => {
            console.log(data)
            setUserName('')
            setAge('')
        })
    }

    const getAll = (e) => {
        e.preventDefault()
        refetch()
    }

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
                <input type="text" value={userName} onChange={event => setUserName(event.currentTarget.value)}/>
                <input type="number" value={age} onChange={event => setAge(event.currentTarget.value)}/>
                <div className={'btns'}>
                    <button onClick={(e) => addUser(e)}>Create User</button>
                    <button onClick={event => getAll(event)}>Get Users</button>
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
