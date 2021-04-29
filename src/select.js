import React from "react";
export function SelectComponent({data, onChange, setLoadingMain}){
    console.log("renderizado de select component", data?.length);
    const element = 
        <select name="selectComponent" id="selectComponent" onChange={onChange}>
            <option key={`select-${-1}`} value={-1}> Seleccione un elemento</option>
            { data &&
                data.map((item, index)=>
                <option key={`select-${item.id}`} value={item.id}>{item.name}</option>
                )
            }
        </select>
    ;
    return element;
}


/**
 * Creación del componente MemoSelectComponent con React.memo
 */
export const MemoSelectComponent = React.memo(SelectComponent);