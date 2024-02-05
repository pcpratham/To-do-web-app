import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import isLoggedIn from "../utils/Authutil";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';



const Navbar = () => {
  const navigate = useNavigate();
  // const [isLoggedIn,setisLoggedIn] = useState(false);
  const {isLoggedIn} = useAuth();
  const {logout} = useAuth();

  return (
    <div className='flex items-center justify-between px-20 mt-4 border-2 rounded-md border-blue-700 w-[90%] mx-auto  bg-white '>
      <Link to="/" ><div className='text-3xl font-bold text-blue-800 py-2 '>Task pro</div></Link>
      <div className='flex gap-6 ' >
        {/* <Link to="/login"  className='border border-sky-600 bg-blue-300 text-blue-900 font-bold px-4 py-2 rounded-md cursor-pointer '>
          <button>Login</button>
        </Link>

        <Link to="/signup" className='border border-sky-600 bg-blue-300 text-blue-900 font-bold px-4 py-2 rounded-md cursor-pointer ' >
          <button>Sign up</button>
        </Link> */}
        {
          isLoggedIn ? (<button onClick={logout}  className='border border-sky-600 bg-red-300 text-blue-900 font-bold px-4 py-2 rounded-md cursor-pointer '  >Log out</button>) :
            (<div className='flex gap-6 '>
              <Link to="/login" className='border border-sky-600 bg-blue-300 text-blue-900 font-bold px-4 py-2 rounded-md cursor-pointer '>
                <button>Login</button>
              </Link>

              <Link to="/signup" className='border border-sky-600 bg-blue-300 text-blue-900 font-bold px-4 py-2 rounded-md cursor-pointer ' >
                <button>Sign up</button>
              </Link>
            </div>)
        }
      </div>
    </div>
  )
}

export default Navbar