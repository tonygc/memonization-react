import React, { useEffect } from 'react';
import UseFetchData from './UseEffectFetchData';
export function Details( { id, setLoadingMain } ){
    const { data, loading, error } = UseFetchData(`https://myfakeapi.com/api/football/teams/${id}`);
    
    useEffect(() => {
        setLoadingMain(loading);
    },[loading]);

    console.log("render details", data);
    return(
        <div>
            { data && data.Team &&
                <div>
                    <p><label>emoji: {data.Team.emoji}</label></p>
                    <p><label htmlFor="">emojiString:{data.Team.emojiString}</label></p>
                    <p><img style={{maxWidth:"100px"}} src={data.Team.flag} alt=""/></p>
                </div>
            }
        </div>
        
    );
}

export const MemoDetails = React.memo(Details);