import {useState, useEffect} from "react";

function UseEffectFetchData(url){
    const [stateFetch, setStateFetch ] = useState({loading: true, data: null, error: null});
    useEffect(()=>{
        if(!url) return;
        console.log("render useeffect fetch data");    
        async function getResponse(){
            
            try{
                setStateFetch(info=> ({...info, error:null, loading:true, data:null}));
                /**
                * Función asincrona para obtener data
                */
                const response = await fetch(url);
                const json = await response.json();
                /**
                * Al hacer setPaises se vuelve a renderizar el componente principal
                */
                 setStateFetch(info=> ({...info, error:null, loading:false, data:json}));
            }catch(err){    
                setStateFetch(info=> ({...info, error:err, loading:false, data:null}));
            }
        }
        getResponse();
    }, [url]);

    return { data: stateFetch.data, loading: stateFetch.loading, error: stateFetch.error };
}

export default UseEffectFetchData;