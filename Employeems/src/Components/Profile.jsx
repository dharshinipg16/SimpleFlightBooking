import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


const Profile = () => {

    const [booking, setBooking] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/auth/yourbooking')
            .then(result => {
                if (result.data.Status) {
                    setBooking(result.data.Result);
                } else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))
    }, [])

    return (
        <div className='px-5 mt-3'>
            <div className='d-flex justify-content-center'>
                <h3>YOUR FLIGHTS</h3>
            </div>
            <Link to="/dashboard/add_category" className='btn btn-success'>Go to Add Location</Link>
            <div className='mt-3'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Source</th>
                            <th>Destination</th>
                            <th>Departure</th>
                            <th>Arrival</th>
                            <th>Available slots</th>
                            <th>Seats Booked</th>
                        </tr>
                        
                    </thead>
                    <tbody>
                        {
                            booking.map(b => (
                                <tr>
                                  <td>{b.name}</td>
                                  <td>{b.source}</td>
                                  <td>{b.destination}</td>
                                  <td>{b.departure}</td>
                                  <td>{b.arrival}</td>
                                  <td>{b.availableslots}</td>
                                  <td>{b.ubooked}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Profile