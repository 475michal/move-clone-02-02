import { UserButton } from '@clerk/clerk-react';
import React from 'react';
import pack from './img/package.png'
import taxi from './img/taxi.png'
import logo from './img/logo-02.png';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
    const headerMenu = [
        {
            id: 1,
            name: "Ride",
            icon: taxi
        },
        {
            id: 2,
            name: "Package",
            icon: pack
        }
    ];

    return (
        <div className="p-5 pb-3 pl-10 border-b-4 border-gray-200 d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-3">
                <img src={logo} width={160} height={60} alt='Logo' />
                {headerMenu.map((item) => (
                    <div className="d-flex align-items-center" key={item.id}>
                        <img src={item.icon} width={30} height={30} alt={item.name} />
                        <h4 className="text-[14px] font-medium">{item.name}</h4>
                    </div>
                ))}
            </div>
            <UserButton />
        </div>
    );
}

export default Header;
