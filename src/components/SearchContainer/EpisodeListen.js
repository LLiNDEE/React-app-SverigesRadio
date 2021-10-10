import React,{useContext, useEffect} from 'react';

import EpisodeContext from '../EpisodeContext';

import AudioEl from './EpisodeAudioElement';

export default function EpisodeListen() {

    const {EpisodeListen, setListeningStatus} = useContext(EpisodeContext);

    useEffect(()=>{
        console.log(EpisodeListen);
    },[])

    return (
        <div className="EpisodeListen_div">
            <button className="goBackBTN" >Gå tillbaka</button>
            <h3>Lyssnar på {EpisodeListen.title}</h3>
            <img src={EpisodeListen.imageurl}/>
            <p className="description">{EpisodeListen.description}</p>
            <AudioEl duration={EpisodeListen.listenpodfile.duration} audioSRC={EpisodeListen.listenpodfile.url}/>
    </div>
    )
}
