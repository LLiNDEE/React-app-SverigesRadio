import React,{useState} from 'react'

import MainContext from './MainContext';


import RadioChannels from './RadioChannels';
import SearchContainer from './SearchContainer/SearchContainer';

export default function Main() {


    const [ListenStatus, setListenStatus] = useState(false);
    const [rockView, setRockView] = useState("");
    const [channelListen, setChannelListen] = useState("");

    const [listeningStatus, setListeningStatus] = useState(false);

    return (
        <main>
            <MainContext.Provider value={{ListenStatus, setListenStatus, rockView, setRockView,channelListen, setChannelListen,listeningStatus, setListeningStatus }}>
                <RadioChannels/>
                <hr/>
                <SearchContainer/>
            </MainContext.Provider>
        </main>
    )
}
