import React from 'react'
import { useState } from 'react'
import axiosInstance from '../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import login from '../assets/images/login.svg';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        //Login API call
        try {
          const response = await axiosInstance.post("./login", {
            email: email,
            password: password
          });

          if (response.data && response.data.accessToken) {
            localStorage.setItem("token", response.data.accessToken);
            navigate("/");
          }
        } catch (error) {
          if (error.response && error.response.data && error.response.data.message) {
            setError(error.response.data.message);
          } else {
            setError("Something went wrong. Please try again later.");
          }
        }
    };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">

        <img src={login} alt="login" className="w-52 h-52" />

        <form 
            onSubmit={handleSubmit} 
            className="bg-white p-8 w-96"
        >
            <h1 className="text-2xl font-bold mb-6 text-center font-pregular">Login</h1>
            
            <input 
                type="email" 
                placeholder="Email" 
                onChange={(e) => setEmail(e.target.value)} 
                className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />
            
            <input 
                type="password" 
                placeholder="Password" 
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full p-3 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />

            <p>{error}</p>
            
            <button 
                type="submit" 
                className="w-full bg-black text-white p-3 rounded hover:bg-gray-700 transition"
            >
                Login
            </button>
            
            <p className="mt-4 text-center text-gray-600">
                Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign Up</a>
            </p>
        </form>
    </div>

  )
}

export default Login