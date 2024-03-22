import React, { useState } from "react";
import { CarListData } from "./CarListDate";
import CarListItem from "./CarListItem";
import { addOrderingToServer } from "../../Redux/slices/orders";
import { useDispatch, useSelector } from "react-redux";
import { useClerk } from "@clerk/clerk-react";
import { fetchUser, fetchUserEmail } from "../../Redux/slices/users";

function CarListOptions({id, distance, source, destination }) {
  const [selectedCar, setSelectedCar] = useState({});
  const [activeIndex, setActivedCar] = useState();

  const dispatch = useDispatch();
  const driverCoordinates = useSelector(state => state.driver.data);
  const selectedDriverId = useSelector(state => state.orders.selectedDriverId);
  const selectedUserId = useSelector(state => state.users.User);
  const { user } = useClerk();


  //Add ordering
  const addOrdering = async() => {
    

    if (source && destination && selectedCar && selectedDriverId) {

      debugger
             await dispatch(addOrderingToServer({
                iduser: id,
                iddriver: selectedDriverId,
                status: true,
                choiseCar: selectedCar.name,
                source: source.label,
                destination: destination.label,
                driveTime: new Date().toISOString(),
              }));
            } else {
              console.log('User not found');
            }
  };


  return (
    <div className="mt-5 overflow-auto h-[250px]">
      <h4 className="text-15 font-bold">Recommended</h4>
      {CarListData.map((item, index) => (
        <div
          className={`cursor-pointer p-2 rounded-md border-black
          ${activeIndex == index ? 'border-[3px]' : null}`}
          onClick={() => {
            setActivedCar(index);
            setSelectedCar(item)
          }}
        >
          <CarListItem car={item} distance={distance} />
        </div>
      ))}

      {selectedCar.name && (
        <div className="flex justify-between fixed bottom-5 bg-white p-3 shadow-xl w-full md:w-[30%] border-[1px] items-center rounded-lg ">
          <h4>Make Payment For</h4>
          <button
            className="p-3 bg-black text-white text-center"
            onClick={addOrdering}
          >
            Request {selectedCar.name}
          </button>
        </div>
      )}

      {/* Display the DriverMap component
      {selectedCar.name && <DriverMap selectedCar={selectedCar} />} */}
    </div>
  );
};

export default CarListOptions;
