import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectAllUsers, useAddNewUserMutation, useDeleteUserMutation } from '../reducers/userSlice';
import { nanoid } from '@reduxjs/toolkit';

const UsersList = () =>{
    const [user,setUser] = useState("");

    // const dispatch = useDispatch()
    const users = useSelector(selectAllUsers)
    const [addNewUser,{isLoading}] = useAddNewUserMutation();
    const [deleteUser] = useDeleteUserMutation();

    const handleDelete = (userId) => {
        deleteUser(userId)
    }

    const onUserChange = e => setUser(e.target.value);
    const canSave = Boolean(user);
    const handleSubmitForm = () => {
        if(canSave){
            addNewUser({
                id:nanoid(),
                fullname: user
            })
            setUser("")
        }
    }

    const renderedUsers = users.map(user=>(
        <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.fullname}</Link>
            &nbsp;
            <Link 
                style={{marginRight:"10ps",color:"tomato"}}
                onClick={()=> handleDelete(user.id)}
                >
            &otimes;
            </Link>
        </li>
    ))
    return(
        <section>
            <div>
                <form autoComplete="off">
                    <label htmlFor="user">نام نویسنده :</label>
                    <input
                        type="text"
                        id="user"
                        name="user"
                        value={user}
                        onChange={onUserChange}
                    />

                    <button
                        type="button"
                        onClick={handleSubmitForm}
                        disabled={!canSave}
                    >
                        ساخت نویسنده جدید
                    </button>
                </form>
            </div>

            <h2>لیست نویسنگان</h2>
            <ul>{renderedUsers}</ul>
        </section>
    )
}

export default UsersList;