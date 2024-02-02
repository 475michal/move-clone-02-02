import { SourceContext } from "./Context/SourceContext";
import MapsSection from "./MapsSection";
import Search from "./Search";
import { DestinationContext } from "./Context/DestinationContext";
import { useState } from "react";


const GoogleMap = () => {
  const [source, setSource] = useState([]);
  const [destination, setDestination] = useState([]);

  return (
    <SourceContext.Provider value={{ source, setSource }}>
      <DestinationContext.Provider value={{ destination, setDestination }}>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <MapsSection />
          </div>
          <div className="col-span-2">
            <Search />
          </div>
        </div>
      </DestinationContext.Provider>
    </SourceContext.Provider>
  );
}
export default GoogleMap;