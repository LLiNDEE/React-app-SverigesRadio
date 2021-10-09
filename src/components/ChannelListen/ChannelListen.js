import React,{useContext} from 'react';

import Context from '../Context';

import AudioEl from './AudioElement';

export default function ChannelListen() {

    const { channelListen, setListenStatus, setChannelListen } = useContext(Context);

    function goBackHandler(){
        setListenStatus(false);
        setChannelListen("");
    }

    return (
        <div className="channelListen_div">
            <button className="goBackBTN" onClick={goBackHandler}>Gå tillbaka</button>
            <h3>Lyssnar på {channelListen.name}</h3>
            <img src={channelListen.image}/>
            <p>{channelListen.tagline}</p>
            <div className="audioEl">
                <AudioEl audioSRC={channelListen.liveaudio.url}/>
            </div>
        </div>
    )
}
