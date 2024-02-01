import { authModalState } from '@/atoms/authModalAtom';
import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

type ResetPasswordProps = {};

const ResetPassword:React.FC<ResetPasswordProps> = () => {
	const [inputs, setInputs] = useState({email:''})

    const setAuthModalState = useSetRecoilState(authModalState)
    const closeModal = useCallback(() => {
        setAuthModalState((prev) => ({...prev, isOpen: false, type: 'login'}));
    }, [setAuthModalState]);

    const handleChangeInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        setInputs((prev) => ({...prev, [e.target.name]: e.target.value}));
    }

	const handleResetPassword = async (e:React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if(!inputs.email) return toast.warning("Please fill all fields", {position: "top-center", autoClose: 3000, theme: "dark"});
		try {
			toast.success("Email was sent!", {position: "top-center", autoClose: 3000, theme: "dark"});
			closeModal();
		} catch (error:any) {
			toast.error(error.message, {position: "top-center", autoClose: 3000, theme: "dark"});
		}
	}

    return (
		<form className='space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8' onSubmit={handleResetPassword}>
			<h3 className='text-xl font-medium  text-white'>Reset Password</h3>
			<p className='text-sm text-white '>
				Forgotten your password? Enter your e-mail address below, and we&apos;ll send you an e-mail allowing you
				to reset it.
			</p>
			<div>
				<label htmlFor='email' className='text-sm font-medium block mb-2 text-gray-300'>
					Your email
				</label>
				<input
					onChange={handleChangeInput}
					type='email'
					name='email'
					id='email'
					className='border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                    bg-gray-600 border-gray-500 placeholder-gray-400 text-white'
					placeholder='name@company.com'
				/>
			</div>

			<button
				type='submit'
				className={`w-full text-white  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                bg-brand-orange hover:bg-brand-orange-s `}
			>
				Reset Password
			</button>
		</form>
    )
}
export default ResetPassword;