import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddCategory = () => {
    const [category, setCategory] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3000/auth/add_category', {category})
        .then(result => {
            if(result.data.Status) {
                navigate('/dashboard/category')
            } else {
                alert(result.data.Error)
            }
        })
        .catch(err => console.log(err))
    }
  return (
    <div className='d-flex justify-content-center align-items-center h-75'style={{
        backgroundImage: "url('https://i.pinimg.com/736x/1d/b2/41/1db24183e11b8304c65f1ec7137ac84b.jpg')",
        backgroundRepeat: 'no-repeat',
      }}>
        <div className='p-3 rounded w-25 border ' style={{backgroundColor: '#ffffff',}}>
            <h2>Add Location</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="category"><strong>Location:</strong></label>
                    <input type="text" id='category' name='category' placeholder='Enter Location'
                     onChange={(e) => setCategory(e.target.value)} className='form-control rounded-0'/>
                </div>
                <button className='btn btn-success w-100 rounded-0 mb-2'>Add Location to Wishlist</button>
            </form>
        </div>
    </div>
  )
}

export default AddCategory