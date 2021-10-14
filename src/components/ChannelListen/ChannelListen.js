import React,{useContext} from 'react';

import Context from '../Context';

import AudioEl from './AudioElement';

export default function ChannelListen({audioSRC, audioIMG, audioNAME}) {

    const { channelListen, setListenStatus, setChannelListen, setRockView } = useContext(Context);

    function goBackHandler(){
        setListenStatus(false);
        setChannelListen("");
        setRockView("");
    }

    return (
        <div className="channelListen_div">
            <button className="goBackBTN" onClick={goBackHandler}>Gå tillbaka</button>
            <h3>Lyssnar på {(audioNAME) ? audioNAME : channelListen.name}</h3>
            <img src={(audioIMG) ? audioIMG :channelListen.image} alt="Kanal bild"/>
            <p>{channelListen.tagline}</p>
            <div className="audioEl">
                <AudioEl audioSRC={(audioSRC) ? audioSRC : channelListen.liveaudio.url}/>
            </div>
        </div>
    )
}
