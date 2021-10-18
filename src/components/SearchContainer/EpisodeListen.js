import React,{useContext, useEffect, useState} from 'react';

import EpisodeContext from '../EpisodeContext';

import Alert from '@mui/material/Alert';

import AudioEl from './EpisodeAudioElement';

export default function EpisodeListen() {

    const {EpisodeListen, setListeningStatus} = useContext(EpisodeContext);
    
    const [error, setError] = useState("");

    useEffect(()=>{
        if(!EpisodeListen.listenpodfile){
            setError(true);
        }
    },[])

    useEffect(()=>{
        console.log(EpisodeListen);
    },[EpisodeListen])

    function goBackHandler(){
        setListeningStatus(false);
    }

    return (
        <div className="EpisodeListen_div">
            <button onClick={goBackHandler} className="goBackBTN" >Gå tillbaka</button>
            <h3>Lyssnar på {EpisodeListen.title}</h3>
            <img src={EpisodeListen.imageurl}/>
            <p className="description">{EpisodeListen.description}</p>
            <div className="audioEl">
                {/* <AudioEl duration={EpisodeListen.listenpodfile.duration} audioSRC={EpisodeListen.listenpodfile.url}/> */}
                {(error) ? <Alert variant="filled" severity="warning">Det här avsnittet har ingen ljudfil!</Alert> : ""}
                {(EpisodeListen.listenpodfile) ? <AudioEl duration={EpisodeListen.listenpodfile.duration} audioSRC={EpisodeListen.listenpodfile.url}/> : ""}
                {/* <AudioEl duration={EpisodeListen.listenpodfile.duration} audioSRC={EpisodeListen.listenpodfile.url}/> */}
            </div>
    </div>
    )
}
