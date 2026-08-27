import axios from 'axios';
import React ,  { useEffect, useState } from 'react'

const App = () => {

  const [name , setName] = useState("");
  const [email , setEmail] = useState("");
  const [contact , setContact] = useState("");
  const [password , setPassword ]= useState("");
  const [address , setAddress ]= useState("");
  const [users , setUser ]= useState([]);
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(()=>{
    fetchUser()

  } , [])

  // ------------Edit method 

  const handleEdit = (id) =>{
    const u = users.find((u) => u._id === id)
    if(u){
      setName(u.name);
      setEmail(u.email);
      setPassword(u.password);
      setContact(u.contact);
      setAddress(u.address);
      setEditingUserId(u._id);
    }
  }

  //-----------Delete method

const handleDelete = async (id) =>{

  try{
    const res = await axios.delete(`http://127.0.0.1:4000/users/${id}`)
    alert("User deleted successfully")  
    fetchUser()

  }
  catch(e){
    console.log(e);
    
  }
}


  //-----------Fetch method

  const fetchUser = async (e) =>{

    try{
      const res = await axios.get("http://127.0.0.1:4000/users")
      setUser(res.data)

    }
    catch(e){
      console.log(e);
      
    }
  }


  //-----------Insert method

  const handleSubmit = async (e) =>{

    e.preventDefault();

    const formData = {name , email , contact , password , "address" : "Karachi"}
    try{
      if (editingUserId) {
        // Update existing user
        const res =  await axios.put(`http://localhost:4000/users/${editingUserId}`, formData,)
        console.log(res.data);
        alert("User updated successfully");
         console.log(response.data);
      }
      else{
      const response = await axios.post("http://127.0.0.1:4000/users", formData)
      console.log(response.data);
      alert("User added successfully");
       console.log(response.data);

      }

      fetchUser()
      setName("");
      setEmail("");
      setContact("");
      setPassword("");
      setAddress("");
      fetchUser();

    }
    catch(e){
      console.log(e);
    }
  }


  return (
    <div className='container my-3'>
      <h1>Create User</h1>
      <form className='container' onSubmit={handleSubmit}>
          <input className='form-control' type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter user name...' />
          <br />

          <input className='form-control' type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter user email...' />
          <br />

          <input className='form-control' type="text" value={contact} onChange={(e) => setContact(e.target.value)} placeholder='Enter user contact...'/>
          <br />

          <input className='form-control' type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter user password...' />
          <br />

          <input className='form-control' type="text" value={address} onChange={(e) => setAddress(e.target.value)}  placeholder='Enter user address...'/>
          <br />

          <button className='btn btn-info' type='submit'>Add User</button>
      </form>


      <table className='table'>

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
      {users.map((u) =>(

        <tr key={u._id}>
          <td>{u._id}</td>
          <td>{u.name}</td>
          <td>{u.email}</td>
          <td>{u.contact}</td>
          <td>{u.password}</td>
          <td>{u.address}</td>
          <td>
            <button className='btn btn-sm btn-danger me-2' onClick={() =>{handleDelete(u._id)}}>Delete</button> 
            <button className='btn btn-sm btn-info' onClick={() => handleEdit(u._id)}>Update</button>

          </td>


        </tr>
      ))}
      </tbody>
      </table>

    </div>
  )
}

export default App
