import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


const Home = () => {
  return (
    <div className='px-5 mt-3'>
      <Link to="/dashboard/booking" className='btn btn-success'>Check Available Flights</Link>
    </div>
  )
}

export default Home

