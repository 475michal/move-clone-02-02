import { UserButton } from '@clerk/clerk-react';
import React from 'react';
import pack from './img/package.png'
import taxi from './img/taxi.png'
import logo from './img/logo-02.png';

function Header() {
    const headerMenu = [
        {
            id: 1,
            name: "Ride",
            icon:taxi
        },
        {
            id: 2,
            name: "Package",
            icon: pack
        }
    ];

    return (
        <div className='p-5 pb-3 pl-10 border-b-4 border-gray-200 flex items-center justify-between '>
            <div className='flex gap-24 items-center'>
                <img src={logo} width={140} height={60} alt='Logo' />
                <div className='flex gap-6 items-center'>
                    {headerMenu.map((item) => (
                        <div className='flex gap-2 items-center' key={item.id}>
                            <img src={item.icon} width={30} height={30} alt={item.name} />
                            <h4 className='text-[14px] font-medium'>{item.name}</h4>
                        </div>
                    ))}
                </div>
            </div>
            <UserButton />
        </div>
    );
}

export default Header;
