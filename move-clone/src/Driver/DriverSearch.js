/* global google */

import React, { useContext, useEffect, useState } from "react";

import { Context } from "./Context/Context";
import DriverInput from "./DriverInput";
import { addDriverToServer, fetchDriver, postDriver } from "../Redux/slices/drivers";
import { useDispatch } from "react-redux";
import { useClerk } from "@clerk/clerk-react";

function DriverSearch() {
    const { source, setSource } = useContext(Context);
    const [distance, setDistance] = useState();

    const dispatch = useDispatch();

    const handleAddDriver = async () => {
        console.log(await dispatch(fetchDriver()));
        
        if (source && user) {
            const userEmail = user.emailAddresses.find(email => email.verification.status === 'verified');
            console.log(user.firstName);
            console.log(source.lat);
            console.log(source.lng);
            console.log(userEmail.emailAddress);
            try {
                await dispatch(addDriverToServer({               
                    nameDriver: user.firstName,
                    status: true,
                    lat: source.lat,
                    lng: source.lng,
                    email: userEmail.emailAddress,
                    Password: "",
                    phoneNumber: ""
                }));
            } catch (error) {
                console.error('Error adding driver to server:', error.message);
            }
        }
    };
    
    // const DriverData = {
    //     nameDriver: 'michal1',
    //     status: true,
    //     location: 'אלעד',
    //     email: '475michal@gmail.com',
    //     passwword: '123',
    //     phoneNumber: '0504115329'
    // };
    useEffect(() => {
        if (source) {
            console.log(source);
        }
    }, [source]);

    const { user } = useClerk();

    return (
        <div>
            <div className="p-2 md:pd-6 border-[2px] rounded-xl">
                <h4 className="text-18 font-bold">Get a move</h4>
                <DriverInput type='source' />
                <button className="p-3 bg-black w-full mt-5 text-white rounded-lg"
                    onClick={handleAddDriver}>Add</button>
            </div>
            {/* <button onClick={()=> dispatch(postDriver (DriverData))}>post</button> */}

        </div>
    );
}
export default DriverSearch;
