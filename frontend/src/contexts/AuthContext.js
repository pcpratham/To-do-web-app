import { createContext, useContext, useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';


const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const api = process.env.REACT_APP_API_URL;

    const login = (formData) => {
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
                   setIsLoggedIn(true);
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

    const signup = (formData) => {
        try{

            fetch(`${api}`+"/api/v1/register",{
                method:"POST",
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(response=>response.json())
            .then(data=>{
                // console.log("success in register ",data);
                if(data.success){
                    navigate("/task")
                    setIsLoggedIn(true);
                }
                else{
                    alert("Please use unique email!!");
                }
                
            })
            .catch((err)=>{
                console.log("error in calling register api");
                console.log(err);
            })
        }
        catch(err){
            console.log("Error while registering the User!!");
            console.log(err.message);
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/');
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, signup,logout }}>
          {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
};