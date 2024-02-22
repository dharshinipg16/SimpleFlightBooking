import React, { useState } from 'react';
import './style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState(null);
  const [showLoginForm, setShowLoginForm] = useState(true); // State to toggle between login and registration forms
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3000/auth/adminlogin', values)
      .then(result => {
        if (result.data.loginStatus) {
          navigate('/dashboard');
        } else {
          setError(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  const handleRegistration = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3000/auth/register', values)
      .then((result) => {
        if (result.data.Status) {
          // Registration successful, you may want to handle this case
          console.log('Registration successful:', result);
        } else {
          setError(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  const toggleForm = () => {
    setShowLoginForm(!showLoginForm);
    setError(null); // Clear any previous errors when toggling forms
  };

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
      <div className='p-3 rounded w-25 border loginForm'>
        <div className="text-warning">
          {error && error}
        </div>

        {showLoginForm ? (
          <>
            <h2>Login Page</h2>
            <form onSubmit={handleSubmit}>
              <div className='mb-3'>
                <label htmlFor="email"><strong>Email:</strong></label>
                <input type="email" id='email' name='email' autoComplete='off' placeholder='Enter Email'
                  onChange={(e) => setValues({ ...values, email: e.target.value })} className='form-control rounded-0' />
              </div>
              <div className='mb-3'>
                <label htmlFor="password"><strong>Password:</strong></label>
                <input type="password" id='password' name='password' placeholder='Enter Password'
                  onChange={(e) => setValues({ ...values, password: e.target.value })} className='form-control rounded-0' />
              </div>
              <button className='btn btn-success w-100 rounded-0 mb-2'>Log in</button>
              <div className='mb-1'>
                <input type="checkbox" name='tick' id='tick' className='me-2' />
                <label htmlFor="password"> Agree with terms and conditions</label>
              </div>
            </form>
            <div className='mb-1 links-container'>
              <span className='link' onClick={toggleForm}>New User? Register</span>
              <span className='link ms-2'>Forget Password?</span>
            </div>
          </>
        ) : (
          <>
            <h2>Register</h2>
            <form onSubmit={handleRegistration}>
              <div className='mb-3'>
                <label htmlFor="email"><strong>Email:</strong></label>
                <input type="email" id='email' name='email' autoComplete='off' placeholder='Enter Email'
                  onChange={(e) => setValues({ ...values, email: e.target.value })} className='form-control rounded-0' />
              </div>
              <div className='mb-3'>
                <label htmlFor="password"><strong>Password:</strong></label>
                <input type="password" id='password' name='password' placeholder='Enter Password'
                  onChange={(e) => setValues({ ...values, password: e.target.value })} className='form-control rounded-0' />
              </div>
              <button className='btn btn-success w-100 rounded-0 mb-2'>Register</button>
            </form>
            <div className='mb-1'>
              <span className='link' onClick={toggleForm}>Already have an account? Login</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
