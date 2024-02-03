import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const api = process.env.REACT_APP_API_URL;
    const [formData,setFormData] = useState({
        email:"",
        password:"",
    });

    const changeHandler = (event) => {
        const {name,value} = event.target;
        setFormData({
          ...formData,
          [name] : value
        });
    }


    const navigate = useNavigate();

    function submitHandler(event){
      event.preventDefault();
      try{

          fetch(`${api}`+"/api/v1/login",{
              method:"POST",
              headers:{
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData)
          })
          .then(response=>response.json())
          .then(data=>{
              // console.log("success in Login  ",data);

              if(data.success){
                const token = data.token;
                 localStorage.setItem('token',token);
                 navigate('/task')
              }
              else{
                  alert("Login failed try again!!");
              }
              
          })
          .catch((err)=>{
              console.log("error in calling Login api");
              console.log(err);
          })
      }
      catch(err){
          console.log("Error while Logging the User!!");
          console.log(err.message);
      }
    }
  return (
    <div className='flex justify-center my-auto items-center h-[600px] transate-y-52 '>
        <div className='flex flex-col gap-8 border shadow-lg p-6 rounded-lg border-gray-600'>
            <h2 className='text-red-600 font-bold text-2xl text-center'>Login Form</h2>
            <form onSubmit={submitHandler} className='flex flex-col items-center justify-center gap-8'>
                <input type="text" placeholder='Enter Your Email' name="email" value={formData.email} onChange={changeHandler} className='border border-black text-center rounded-md w-[250px] h-8 p-2' />
                <input type="password" placeholder='Enter Your Password' name="password" value={formData.password} onChange={changeHandler} className='border border-black text-center rounded-md w-[250px] h-8 p-2' />
                <button type='submit' className='border rounded-md text-white bg-red-400 text-xl font-semibold p-2 hover:bg-red-700 transition-all '>Sign In</button>
            </form>
        </div>
    </div>
  )
}

export default Login