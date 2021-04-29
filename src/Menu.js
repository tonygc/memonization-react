import { useState, useEffect, useCallback } from 'react';
import { MemoSelectComponent, SelectComponent } from './select';
import { MemoDetails, Details } from './details';
import UseFetchData from './UseEffectFetchData';
import { UseList } from './UseList';

/**
 * Componente principal
 */
export default function Menu(){
    const [ url, setUrl] = useState("https://myfakeapi.com/api/football/teams")
    const { data, loading, error } = UseFetchData(url);
    const { dataArray, addStartItem, addEndItem, removeItem } = UseList(data?.Teams);
    /**
     * Variable de estado "paises" que contiene un loading y un array de paises
     */
    //const [paises, setPaises] = useState({data:null, loading:true});
    /**
     * Variable de estado "objPais" que contiene un booleano para saber si
     * estamos haciendo una peticion loading y data donde tenemos la información del pais
     */
    //const [objPais, setObjPais] = useState({data:null, loading:false});
    /**
     * Variable de estado contador de clicks
     */
    const [count, setCount] = useState(0);

    const [ id, setId ] = useState(0);

    const [ loadingMain, setLoadingMain ] = useState(true);
    /**
     * Mostrar console log para ver la cantidad de veces que se renderiza el componente
     */
    console.log("app principal rendered");
    // useEffect(()=>{
    //     async function getTeam(){
    //         /**
    //         * Función asincrona para obtener el array de paises
    //         */
    //         const response = await fetch("https://myfakeapi.com/api/football/teams");
    //         const json = await response.json();
    //         /**
    //         * Al hacer setPaises se vuelve a renderizar el componente principal
    //         */
    //         setPaises(p=> ({...p, data:json.Teams, loading:false}));
    //     }
    //     getTeam();
    // },[]);

    /**
     * Función "useCallback" para no generar una nueva instancia
     * cada vez que se renderice este componente.
     * Es de gran utilidad para evitar el re-renderizado del componente MemoSelectComponent
     */
    const handleSelectChange=useCallback((e)=>{
        let valueSelected=e.target.value;
        // const getTeamId = async(id)=>{
        //     setObjPais(objPais=>({...objPais, data:null, loading:true}));
        //     const response = await fetch(`https://myfakeapi.com/api/football/teams/${id}`);
        //     const json = await response.json();
        //     setObjPais(objPais=>({...objPais, data:json.Team, loading:false}));
        // }
        // getTeamId(valueSelected);
        setId(valueSelected);
    },[]);

    /**
     * Método para agregar un item de prueba en el top del array 
     * de paises mediante setPaises.
     * Ésta acción proboca el re-renderizado de MemoSelectComponent debido a que
     * se modifica el array de paises, el cual es una propiedad del componente.
     */
    function addItem(){
        addStartItem({id:dataArray.length+1, name:"noee", flag:"" });
        // setPaises(p=>({ data : [
        //     {id:paises.data.length+1, name:"noee", flag:"" }
        //     , ...p.data ]
        //     }
        // ));
    }

    const setLoadingMainCallback=useCallback((loading)=>{
        
        setLoadingMain(loading);
    },[]);

    const setLoadingMainNormal=(loading)=>{
        
        setLoadingMain(loading);
    };
    return (
        <div className="row">
            {(loadingMain || loading) &&
                <div className="col-12">Loading...</div>
            }
            <div className="row">
                <button className="btn btn-primary col-4" onClick={()=>setCount(count+1)}>Clicked {count} times</button>
                <button className="btn btn-danger col-4 offset-4" onClick={addItem}>Add item to select</button>
            </div>
            
            <div className="col-6">
                <h3>Países</h3>
                <MemoSelectComponent data={dataArray} onChange={handleSelectChange} setLoadingMain={setLoadingMain} />
            </div>
            <div className="col-6">
                <h3>Información País</h3>
                    <MemoDetails 
                        id={id}
                        setLoadingMain={setLoadingMain}
                    />
            </div>
        </div>
    )
}