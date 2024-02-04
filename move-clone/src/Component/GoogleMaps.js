import { SourceContext } from "./Context/SourceContext";
import MapsSection from "./Home/MapsSection";
import Search from "./Home/Search";
import { DestinationContext } from "./Context/DestinationContext";
import { useState } from "react";
import { LoadScript } from "@react-google-maps/api";

const GOOGLEMAP_KEY = 'AIzaSyBNVjEXhyDOUvcCECJFY5x_OGKt38dxVBk';

const GoogleMap = () => {
  const [source, setSource] = useState([]);
  const [destination, setDestination] = useState([]);

  return (
    <SourceContext.Provider value={{ source, setSource }}>
      <DestinationContext.Provider value={{ destination, setDestination }}>
       <LoadScript
       libraries={['places']}
        googleMapsApiKey={GOOGLEMAP_KEY}>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <MapsSection />
          </div>
          <div className="col-span-2">
            <Search />
          </div>
        </div>
        </LoadScript>
      </DestinationContext.Provider>
    </SourceContext.Provider>
  );
}
export default GoogleMap;