/* global google */

import React, { useContext, useEffect, useState } from "react";
import { SourceContext } from "../Context/SourceContext";
import { DestinationContext } from "../Context/DestinationContext";
import InputItem from "./InputItem";
import CarListOptions from "./CarListOptions";
import { addOrderingToServer } from "../../Redux/slices/orders";
import { useDispatch } from "react-redux";

function Search() {
    const { source, setSource } = useContext(SourceContext);
    const { destination, setDestination } = useContext(DestinationContext);
    const [distance, setDistance] = useState();
    const [selectedCar, setSelectedCar] = useState(null); // Define selectedCar state

    const dispatch = useDispatch();

    const calculateDistance = () => {
        const dist = google.maps.geometry.spherical.computeDistanceBetween(
            { lat: source.lat, lng: source.lng },
            { lat: destination.lat, lng: destination.lng }
        );

        console.log(dist * 0.000621374);
        setDistance(dist * 0.000621374);
    };

    const handleCarSelection = (selectedCar) => {
        console.log('Selected Car:', selectedCar);
        setSelectedCar(selectedCar); // Set the selected car
    };

   
    useEffect(() => {
        if (source) {
            console.log(source);
        }
        if (destination) {
            console.log(destination);
        }
    }, [source, destination]);

    return (
        <div>
            <div className="p-2 md:pd-6 border-[2px] rounded-xl">
                <h4 className="text-18 font-bold">Get a move</h4>
                <InputItem type='source' />
                <InputItem type='destination' />
                <button className="p-3 bg-black w-full mt-5 text-white rounded-lg"
                    onClick={() => calculateDistance()}
                >Search</button>
            </div>
            {distance ? <CarListOptions distance={distance} source={source} destination={destination} onRequestCar={handleCarSelection} /> : null}
            {selectedCar ? <button>Add</button> : null}
        </div>
    );
}

export default Search;
