import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../AppWrite/auth'
import { logout } from '../../store/authSlice'
import { useNavigate } from 'react-router-dom';
import { current } from '@reduxjs/toolkit';

function LogoutBtn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        authService.logout()
            .then(() => {
                dispatch(logout())
                   navigate("/login")
                     console.log('Logged out successfully' ,logout);
            });
    }
    return (
        <div>
            <button
                className='bg-red-500 text-white px-4 py-2 rounded'
                onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default LogoutBtn