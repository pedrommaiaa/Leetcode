import { authModalState } from '@/atoms/authModalAtom';
import { auth } from "@/firebase/firebase";
import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { toast } from "react-toastify";

type SignupProps = {};

const Signup:React.FC<SignupProps> = () => {
    const setAuthModalState = useSetRecoilState(authModalState)
    const handleClick = (type:"login" | "register" | "forgotPassword") => {
        setAuthModalState((prev) => ({ ...prev, type}));
    }

    const router = useRouter();
    const [inputs, setInputs] = useState({email:'', displayName:'', password:''});
    const [createUserWithEmailAndPassword, user, loading, error,] = useCreateUserWithEmailAndPassword(auth);

    const handleChangeInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        setInputs((prev) => ({...prev, [e.target.name]: e.target.value}));
    }

    const handleRegister = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!inputs.email || !inputs.password || !inputs.displayName) return toast.warning("Please fill all fields", {position: "top-center", autoClose: 3000, theme: "dark"});
        try {
            const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
            if (!newUser) return;
            toast.success("Account Registered!", {position: "top-center", autoClose: 3000, theme: "dark"});
            router.push('/')
        } catch (error:any) {
            toast.error(error.message, {position: "top-center", autoClose: 3000, theme: "dark"});
        }
    }

    useEffect(() => {
        if(error) toast.error(error.message, {position: "top-center", autoClose: 3000, theme: "dark"});
    }, [error])

    return (
        <form className='space-y-6 px-6 pb-4' onSubmit={handleRegister}>
            <h3 className='text-xl font-medium text-white'>Register to Leetcode 2.0</h3>
            <div>
                <label htmlFor="email" className='text-sm font-medium block mb-2 text-gray-300'>Email</label>
                <input onChange={handleChangeInput} type="email" name="email" id="email" className='border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500
                focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white' placeholder='name@company.com' />
            </div>
            <div>
                <label htmlFor="displayName" className='text-sm font-medium block mb-2 text-gray-300'>Display Name</label>
                <input onChange={handleChangeInput} type="displayName" name="displayName" id="displayName" className='border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500
                focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white' placeholder='John Doe' />
            </div>
            <div>
                <label htmlFor="password" className='text-sm font-medium block mb-2 text-gray-300'>Password</label>
                <input onChange={handleChangeInput} type="password" name="password" id="password" className='border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500
                focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white' placeholder='*********' />
            </div>
        
            <button type='submit' className='w-full text-white focus:ring-blue-300 font-medium rounded-lg
            text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s' onClick={() => handleClick("register")}>{loading ? "Registering..." : "Register"}</button>
    
            <button className='flex w-full justify-end'>
                <a href="#" className='text-sm block text-brand-orange hover:underline w-full text-right' onClick={() => handleClick("forgotPassword")}>
                    Forgot Password?
                </a>
            </button>
        
            <div className='text-sm font-medium text-gray-300'>
                Already have an account?{" "}
                <a href="#" className='text-blue-700 hover:underline' onClick={() => handleClick("login")}>
                    Log In
                </a>
            </div>
        </form>
    )
}

export default Signup;