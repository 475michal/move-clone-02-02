/* global google */

import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import move from './img/move.png';
import { useContext, useEffect, useState } from 'react';
import { SourceContext } from './Context/SourceContext';
import { DestinationContext } from './Context/DestinationContext';

const GOOGLEMAP_KEY = 'AIzaSyBNVjEXhyDOUvcCECJFY5x_OGKt38dxVBk';

function InputItem({ type }) {
    const [value, setValue] = useState(null);
    const [placeholder, setPlaceholder] = useState(null);
    const { source, setSource } = useContext(SourceContext);
    const { desitnation, setDestination } = useContext(DestinationContext);


    useEffect(() => {
        type == 'source'
            ? setPlaceholder('pickup Location')
            : setPlaceholder('Dropoff Location')
    }, []);

    const getLatAndLng = (place, type) => {
        if (place && place.value) {  // הוסף בדיקה כאן
            const placeId = place.value.place_id;
            const service = new google.maps.places.PlacesService(document.createElement('div'));
            service.getDetails({ placeId }, (place, status) => {
                if (status === 'OK' && place.geometry && place.geometry.location) {
                    console.log(place.geometry.location.lng());
                    if (type === 'source') {
                        setSource({
                            lat: place.geometry.location.lat(),
                            lng: place.geometry.location.lng(),
                            name: place.formatted_address,
                            label: place.name
                        });
                    } else {
                        setDestination({
                            lat: place.geometry.location.lat(),
                            lng: place.geometry.location.lng(),
                            name: place.formatted_address,
                            label: place.name
                        });
                    }
                }
            });
        }
    }
    

    return (

        <div className='bg-slate-200 p-3 rounded-lg mt-3 flex items-center gap-4'>
            <img src={move} width={25} height={45} alt="Move icon" />
            {/* <input type="text" placeholder={type=='source'?"Pickup Location":'Drop of Location'} 
                className='bg-transparent w-full outline-none'/>*/}
            <GooglePlacesAutocomplete
                apiKey={GOOGLEMAP_KEY}
                selectProps={{
                    value,
                    onChange: (place) => {
                        getLatAndLng(place, type);
                        setValue(place)
                    },
                    placeholder: 'Pickup location',
                    isClearable: true,
                    className: 'w-full',
                    components: {
                        DropdownIndicator: false
                    },
                    styles: {
                        control: (provided) => ({
                            ...provided,
                            backgroundColor: '#00ffff00',
                            border: 'none',
                        }),
                    }
                }}

            />
        </div>
    );
}

export default InputItem;