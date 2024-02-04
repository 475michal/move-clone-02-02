import React, { useContext, useEffect } from "react";

import { SourceContext } from "../Context/SourceContext";
import { DestinationContext } from "../Context/DestinationContext";
import InputItem from "./InputItem";

function Search(){
    const {source,setSource} =useContext(SourceContext);
    const {desitnation,setDesitnation} =useContext(DestinationContext);
    
    useEffect(()=>{
        if(source){
            console.log(source);
        }
        if(desitnation){
            console.log(desitnation);
        }
    },[source,desitnation])

    

return(
    <div className="p-2 md:pd-6 border-[2px] rounded-xl">
       <p className="text-[20px] font-bold ">Get a move</p>
       <InputItem type='source'/>
       <InputItem type='desitnation'/>
        <button className="p-3 bg-black w-full mt-5 text-white rounded-lg">Search</button>
    </div>
);
}
export default Search;