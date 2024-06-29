import { message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GetLoggedInUserDetails } from '../services/users'

function ProtectedRoute(children) {
    const navigate = useNavigate()
    const [user,setUser]=useState(null)
        
    const validateUserToken = async () => {
        try {
           const response = await GetLoggedInUserDetails();
            if (response.success) {
                setUser(response.data)
            } else {
                message.error(response.message)
            }
            
        } catch (error) {
        message.error(error.message)
           
        }
    }
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/login')
        } else {
            validateUserToken();
            
        }
    },[])
    return (
        <div>
        {user && (
            <>
             <h1> {user.name}</h1>
             <h1>{user.email}</h1>
             <h1>{user.role}</h1>
             {children}
        </>
)}
</div >
);
}

export default ProtectedRoute

