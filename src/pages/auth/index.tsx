import { authModalState } from '@/atoms/authModalAtom';
import AuthModal from '@/components/Modals/AuthModal';
import Navbar from '@/components/Navbar/Navbar';
import { auth } from '@/firebase/firebase';
import Image from "next/image";
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';

type AuthPageProps = {};

const AuthPage:React.FC<AuthPageProps> = () => {
    const router = useRouter();
    const authModal = useRecoilValue(authModalState);
    const [user, loading, error] = useAuthState(auth);
    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
        if(user) router.push('/');
        if(!loading && !user) setPageLoading(false);
    }, [user, error, router, loading]);

    if (pageLoading) return null;


    return <div className='bg-gradient-to-b from-gray-600 to-black h-screen relative'>
        <div className='max-w-7x1 mx-auto'>
            <Navbar />
            <div className='flex items-center justify-center h-[calc(100vh-5rem)] pointer-events-none select-none'>
                <Image src='/hero.png' alt='Hero image' height={700} width={700} />
            </div>
            {authModal.isOpen && <AuthModal />}
        </div>
    </div>
}
export default AuthPage;