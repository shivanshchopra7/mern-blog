import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {  useDispatch, useSelector } from 'react-redux';
import { signInSuccess, signInStart, signInFailure } from '../redux/user/UserSlice';
import OAuth from '../components/OAuth';
function SignIn () {
  const[formData, setFormData] = useState({});

const {loading, error: errorMessage} = useSelector(state=> state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim()})
  };
 const handleSubmit = async (e) => {
  e.preventDefault();
  if(!formData.email || !formData.password) {
    return dispatch(signInFailure('Please fill out all fields.'));
  }
  try{
  dispatch(signInStart());
    const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if(data.success === false) {
      dispatch(signInFailure(data.message));
    }
     
    if(res.ok) {
      dispatch(signInSuccess(data));
      navigate('/');
    }
  } catch (error) {
   dispatch(signInFailure(error.message))
  }
 };
  return <div className='min-h-screen mt-20'>
<div className=' flex p-4 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
  <div className='flex-1'>
<Link to="/" className='  font-bold dark:text-white text-4xl'>
        <span className='px-2 py-1 bg-gradient-to-r from bg-indigo-500 via-purple-500 to-pink-300 rounded-lg text-white'>Write Your</span>
        Blogs
    </Link>
    <p className='text-md mt-5'>
      This is a blogging project
    </p>
</div>

<div className='flex-1'>
  <form className='flex flex-col gap-4' onSubmit={handleSubmit}>

    <div>
      <Label value='Your email'  />
      <TextInput 
      onChange={handleChange}
      type='email'
      placeholder='Email'
      id='email'
      />
    </div>
    <div>
      <Label value='Your password'  />
      <TextInput 
      onChange={handleChange}
      type='password'
      placeholder='Password'
      id='password'
      />
    </div>
    <Button type='submit' disabled={loading}>
      {
        loading ? (
          <>
          <Spinner size='sm' />
          <span>Loading...</span>
          </>
        ) : 'Sign In'
      }
      
      </Button>
      <OAuth />
  </form>
  <div className='flex gap-2 text-sm mt-5'>
  <span>Don't Have an account?</span>
  <Link to='/sign-up' className='text-blue-500'>
    Sign Up
  </Link>
  </div>
  {errorMessage && (
    <Alert className='mt-5' color='failure'>
      {errorMessage}
    </Alert>
  )}
</div>
  </div>
  </div>
}

export default SignIn