import React, { useEffect, useState } from 'react';
import axios from 'axios';

const User = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axios.get('http://localhost:5000/api/users')
            .then(response => setUsers(response.data))
            .catch(error => console.error('There was an error!', error));
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setName(user.name);
        setEmail(user.email);
        setPassword('');
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/api/users/${id}`)
            .then(() => fetchUsers())
            .catch(error => console.error('There was an error!', error));
    };

    const handleUpdate = () => {
        axios.put(`http://localhost:5000/api/users/${editingUser.id}`, { name, email, password })
            .then(() => {
                setEditingUser(null);
                setName('');
                setEmail('');
                setPassword('');
                fetchUsers();
            })
            .catch(error => console.error('There was an error!', error));
    };

    return (
        <div>
            <h1>User List</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <button onClick={() => handleEdit(user)}>Edit</button>
                                <button onClick={() => handleDelete(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editingUser && (
                <div>
                    <h2>Edit User</h2>
                    <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                        />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                        <button type="submit">Update User</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default User;
