import { useState } from "react";
import { SourceContext } from "./Context/SourceContext";
import MapsSection from "./MapsSection";
import Search from "./Search";
import { DesitnationContext } from "./Context/DestinationContext";


const GoogleMap = () => {
     const [source,setSource]=useState([]);
      const [destination,setDestination]=useState([]);
    
      return (
      <SourceContext.Provider value={{source,setSource}}>
      <DesitnationContext.Provider value={{destination,setDestination} }>
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5"> 
        <div>
            <MapsSection/>
        </div>
         <div className="col-span-2">
            <Search/>
        </div>
      </div>
      </DesitnationContext.Provider>
      </SourceContext.Provider>
    );
  }
  export default GoogleMap;