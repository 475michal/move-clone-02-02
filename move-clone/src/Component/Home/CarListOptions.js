import React, { useState } from "react";
import { CarListData } from "./CarListDate";
import CarListItem from "./CarListItem";

const CarListOptions = ({ distance }) => {
    const [activeIndex, setActiveIndex] = useState();
    const [selectedCar, setSelectedCar] = useState({});

    return (
        <div className="mt-5 overflow-auto h-[250px]">
            <h4 className="text-15 font-bold">Recommended</h4>
            {CarListData.map((item, index) => (
                <div key={index} className={`cursor-pointer p-2 rounded-md border-black ${activeIndex === index ? 'border-[2px]' : ''}`}
                    onClick={() => {
                        setActiveIndex(index);
                        setSelectedCar(item);
                    }}
                >
                    <CarListItem car={item} distance={distance} />
                </div>
            ))}

            {selectedCar.name && (
                <div className="flex justify-between fixed bottom-5 bg-white p-3 shadow-xl w-full md:w-[30%] border-[1px] items-center rounded-lg ">
                    <h4>Make Payment For</h4>
                    <button className="p-3 bg-black text-white text-center">Request {selectedCar.name}</button>
                </div>
            )}
        </div>
    );
}

export default CarListOptions;
