import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from './api';

function Users() {
    const [users, setUsers] = useState([])

    const fetchUsers = () => {
        api.get('/')
            .then(result => setUsers(result.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const handleDelete = (id) => {
        api.delete('/deleteUser/' + id)
            .then(res => {
                console.log(res)
                fetchUsers()
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <Link to="/create" className="btn btn-success">Add+</Link>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.length > 0 ? users.map((user) => {
                                return (
                                    <tr key={user._id || user.email}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.age}</td>
                                        <td>
                                            <Link to={`/update/${user._id}`} className="btn btn-success">Update</Link>
                                            <button className='btn btn-danger' onClick={() => handleDelete(user._id)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            }) : (
                                <tr>
                                    <td colSpan="4" className="text-center">No users found</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Users;