import Navbar from '@/components/Navbar/Navbar';
import React from 'react';

type authPageProps = {
    
};

const authPage:React.FC<authPageProps> = () => {
    return <div className='bg-gradient-to-b from-gray-600 to-black h-screen relative'>
        <div className='max-w-7x1 mx-auto'>
            <Navbar />
            <div className='flex items-center justify-center h-[calc(100vh-5rem)] pointer-events-none select-none'>
                <img src='hero.png' alt='Hero image' />
            </div>
        </div>
    </div>
}
export default authPage;