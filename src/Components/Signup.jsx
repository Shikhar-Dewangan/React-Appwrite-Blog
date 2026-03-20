import React from 'react'
import { useDispatch } from 'react-redux'
import { data, Link, useNavigation } from 'react-router-dom'
import { useForm } from "react-hook-form"
import authService from "../AppWrite/auth"
import { login } from '../store/authSlice'
import { Button, Input } from "./index"
import { useState } from 'react'

function Signup() {

    const navigate = useNavigation()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")

    const create = async (data) => {
        setError("")
        try {
            const userData = await authService.crreateAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(login(userData))
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-6">

            <div className="bg-gray-800 w-full max-w-md p-8 rounded-xl shadow-lg">

                <h2 className="text-3xl font-bold text-white text-center mb-6">
                    Create Account
                </h2>

                <form onSubmit={handleSubmit(create)}
                    className="space-y-5">

                    {/* Name */}
                    <div>
                        <label className="block text-white text-sm mb-1">Name</label>
                        <Input
                            type="text"
                            placeholder="Enter your name"
                            {...register("name", {
                                required: true,
                            })}
                            className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-700 focus:outline-none focus:border-white"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-white text-sm mb-1">Email</label>
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                            className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-700 focus:outline-none focus:border-white"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-white text-sm mb-1">Password</label>
                        <Input
                            type="password"
                            placeholder="Create password"
                            {...register("password", {
                                required: true,
                            })}

                            className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-700 focus:outline-none focus:border-white"
                        />
                    </div>

                    {/* Submit */}
                    <Button
                        type="submit"
                        className="w-full bg-gray-400 text-black py-2 rounded font-semibold hover:bg-gray-700 transition"
                    >
                        Signup
                    </Button>

                </form>

                {/* Bottom Login Link */}
                <p className="text-center text-sm mt-6">
                    Already have an account?{" "}
                    <Link to="/login" className="text-white hover:underline">
                        Login
                    </Link>
                </p>

            </div>

        </div>
    )
}

export default Signup