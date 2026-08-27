import axios from 'axios';
import React, { useEffect, useState, FormEvent, ChangeEvent } from 'react';

type User = {
  _id: string;
  name: string;
  email: string;
  contact: string;
  password: string;
  address: string;
};

const App: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [contact, setContact] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [address, setAddress] = useState<string>('Karachi');
  const [users, setUsers] = useState<User[]>([]);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);

  useEffect(() => {
    fetchUser();
  }, []);

  // --------- Fetch Users ----------
  const fetchUser = async () => {
    try {
      const res = await axios.get<User[]>("http://127.0.0.1:4000/users");
      setUsers(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  // ---------- Edit ----------
  const handleEdit = (id: string) => {
    const u = users.find((user) => user._id === id);
    if (u) {
      setName(u.name);
      setEmail(u.email);
      setContact(u.contact);
      setPassword(u.password);
      setAddress(u.address);
      setEditingUserId(u._id);
    }
  };

  // ---------- Delete ----------
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://127.0.0.1:4000/users/${id}`);
      alert("User deleted successfully");
      fetchUser();
    } catch (e) {
      console.error(e);
    }
  };

  // ---------- Insert / Update ----------
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = { name, email, contact, password, address };

    try {
      if (editingUserId) {
        const res = await axios.put(
          `http://127.0.0.1:4000/users/${editingUserId}`,
          formData
        );
        alert("User updated successfully");
      } else {
        const res = await axios.post("http://127.0.0.1:4000/users", formData);
        alert("User added successfully");
      }

      setName('');
      setEmail('');
      setContact('');
      setPassword('');
      setAddress('Karachi');
      setEditingUserId(null);
      fetchUser();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className='container my-3'>
      <h1>Create User</h1>
      <form className='container' onSubmit={handleSubmit}>
        <input
          className='form-control'
          type='text'
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          placeholder='Enter user name...'
        />
        <br />

        <input
          className='form-control'
          type='email'
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          placeholder='Enter user email...'
        />
        <br />

        <input
          className='form-control'
          type='text'
          value={contact}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setContact(e.target.value)}
          placeholder='Enter user contact...'
        />
        <br />

        <input
          className='form-control'
          type='password'
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          placeholder='Enter user password...'
        />
        <br />

        <input
          className='form-control'
          type='text'
          value={address}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
          placeholder='Enter user address...'
        />
        <br />

        <button className='btn btn-info' type='submit'>
          {editingUserId ? "Update User" : "Add User"}
        </button>
      </form>

      <table className='table mt-4'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Password</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u._id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.contact}</td>
              <td>{u.password}</td>
              <td>{u.address}</td>
              <td>
                <button
                  className='btn btn-sm btn-danger me-2'
                  onClick={() => handleDelete(u._id)}
                >
                  Delete
                </button>
                <button
                  className='btn btn-sm btn-info'
                  onClick={() => handleEdit(u._id)}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
