import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigation } from 'react-router-dom'
import { useForm } from "react-hook-form"
import authService from "../AppWrite/auth"
import { login as authLogin } from '../store/authSlice'
import { Button, Input } from "./index"
import { useState } from 'react'

function Login() {
    const [error, seterror] = useState("")
    const { register, handleSubmit } = useForm()
    const navigate = useNavigation()
    const dispatch = useDispatch()

    const login = async (data) => {
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(authLogin(userData));
                navigate("/")
            }
        } catch (error) {
            seterror(error.message)
        }
    }

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-6">

            <div className="bg-gray-800 w-full max-w-md p-8 rounded-xl shadow-lg">

                <h2 className="text-3xl font-bold text-white text-center mb-6">
                    Login
                </h2>

                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(login)} className="space-y-5">

                 
                    <div>
                        <label className="block text-sm mb-1 text-white" >Email</label>
                        <Input
                            className="w-full px-4 py-2 rounded bg-gray-900 border border-gray-700 focus:outline-none focus:border-white"
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />

                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm text-white mb-1">Password</label>
                        <Input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 rounded bg-gray-900 border border-gray-700 focus:outline-none focus:border-white"
                            {...register("password", {
                                required: true,
                            })}
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full bg-gray-400 text-black py-2 rounded font-semibold hover:bg-gray-700 transition"
                    >
                        Login
                    </button>

                </form>

                {/* Bottom */}
                <p className="text-center text-sm mt-6">
                    Don’t have an account?{" "}
                    <Link to="/signup" className="text-white hover:underline">
                        Signup
                    </Link>
                </p>

            </div>

        </div>
    );
};



export default Login;