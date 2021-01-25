import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listUsers, deleteUser } from '../actions/userActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { USER_DETAILS_REQUEST } from '../constants/userConstants'
import './css/UserListScreen.css'

export default function UserListScreen(props) {
    const userList = useSelector((state) => state.userList)
    const { loading, error, users } = userList
    const dispatch = useDispatch()

    const userDelete = useSelector((state) => state.userDelete)
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete
    } = userDelete

    const deleteHandler = (user) => {
        if(window.confirm('Are you sure?')) {
            dispatch(deleteUser(user._id))
        }
    }

    useEffect(() => {
        dispatch(listUsers())
        dispatch({
            type: USER_DETAILS_REQUEST
        })
    }, [dispatch, successDelete])

    return (
        <div className="userlistscreen-container">
            <div>
                <h1>Users</h1>
                {loadingDelete && <LoadingBox></LoadingBox>}
                {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
                {successDelete && (
                    <MessageBox variant="success">User deleted successfully!</MessageBox>
                )}
                {loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>IS ADMIN</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                                    <td>
                                        <button
                                            type="button"
                                            className="user-edit-button"
                                            onClick={() => props.history.push(`/user/${user._id}/edit`)}
                                        >Edit</button>
                                        <button
                                            type="button"
                                            className="user-delete-button"
                                            onClick={() => deleteHandler(user)}    
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}