import { auth } from '@/firebase/firebase';
import React from 'react';
import { FiLogOut } from 'react-icons/fi';
import { useSignOut } from 'react-firebase-hooks/auth';

type LogoutProps = {};

const Logout:React.FC<LogoutProps> = () => {
    const [signOut, loading, error] = useSignOut(auth);
    const handleLogout = () => {
        signOut();
    }
    return (
        <button className='bg-dark-fill-3 py-1.5 px-3 cursor-pointer rounded text-brand-orange' onClick={handleLogout}>
            <FiLogOut />
        </button>
    )
}
export default Logout;