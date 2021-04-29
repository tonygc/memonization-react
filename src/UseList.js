import { useEffect, useState } from "react";

export function UseList(arrayItems){
    const [dataArray, setData] = useState(arrayItems);
    
    useEffect(()=>{
        setData(arrayItems);
    },[arrayItems])

    function addStartItem(item){
        setData(p=>([
                item
                , ...p]
        ));
    }

    function addEndItem(item){
        
        setData(p=>([
                ...p 
                ,item
                ]
        ));
    }

    function removeItem(item){
        setData(dataArray.splice(dataArray.indexOf(item)-1, 1))
    }


    return { dataArray, addStartItem, addEndItem, removeItem };
}