import React, { useEffect } from 'react';
import { UserButton, useClerk } from '@clerk/clerk-react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

import pack from '../img/package.png';
import taxi from '../img/taxi.png';
import logo from '../img/logo-02.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { addUserToServer, fetchUser } from '../Redux/slices/users';

function Header() {
    
    const { user } = useClerk();
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        if (user) {
            const userEmail = user.emailAddresses.find(email => email.verification.status === 'verified');

            //add User
            if (userEmail) {
                console.log('User email:', userEmail.emailAddress);
                dispatch(fetchUser()).then((userData) => {
                    // const emailExists = userData.email === userEmail.emailAddress;
                    // if (emailExists) {
                        dispatch(addUserToServer({ email: userEmail.emailAddress, password: 'YourPassword', username: user.firstName }));
                    // } else {
                    //     console.log("Email already exists in the database");
                    // }
                });
            } else {
                console.log('User does not have a verified email address.');
            }
            console.log('User username:', user.firstName);
        }
    }, [user, dispatch]);

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
                <img src={logo} width={160} height={60} alt='Logo' onClick={()=> navigate('/Home')}/>
                {headerMenu.map((item) => (
                    <div className="d-flex align-items-center" key={item.id}>
                        <img src={item.icon} width={30} height={30} alt={item.name} />
                        <h4 className="text-[14px] font-medium">{item.name}</h4>
                    </div>
                ))}
            </div>
            <UserButton />
            <div>
                <button onClick={() => navigate('/SignDriver')}>Your Driver?</button>
            </div>
        </div>
    );
}

export default Header;
