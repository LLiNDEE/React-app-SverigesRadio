import React,{useContext, useEffect, useState} from 'react';

import Alert from '@mui/material/Alert';

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

                {(EpisodeListen.listenpodfile) ? <AudioEl duration={EpisodeListen.listenpodfile.duration} audioSRC={EpisodeListen.listenpodfile.url}/> : <Alert variant="filled" severity="warning">Avsnittet har ingen ljudfil...</Alert>}
                {/* <AudioEl duration={EpisodeListen.listenpodfile.duration} audioSRC={EpisodeListen.listenpodfile.url}/> */}
            </div>
    </div>
    )
}
