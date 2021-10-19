import React,{useContext, useEffect, useState} from 'react';

import Context from '../Context';

import AudioEl from './AudioElement';

export default function ChannelListen({audioSRC, audioIMG, audioNAME}) {

    const { channelListen, setListenStatus, setChannelListen, setRockView } = useContext(Context);

    const [currentSong, setCurrentSong] = useState([]);
    const [nextSong, setNextSong] = useState([]);
    const [nextSongTime, setNextSongTime] = useState("");
    const [prevSong, setPrevSong] = useState([]);

    useEffect(()=>{
        getSongs();
    },[])

    async function getSongs(){
        try{
            let response = await fetch(`https://api.sr.se/api/v2/playlists/rightnow?channelid=${channelListen.id}&format=json`);
            if(!response) return;
            response = await response.json();
            console.log(response.playlist);
            if(!response.playlist.song) return;
            setCurrentSong(response.playlist.song);
            setNextSong(response.playlist.nextsong);
            setPrevSong(response.playlist.previoussong);
        }catch(error){
            console.log(error.message);
        }
    }

    useEffect(()=>{
        if(!nextSong) return;
        if(!nextSong.starttimeutc) return;
        let time = episode_date(nextSong.starttimeutc);
        console.log(time);
        setNextSongTime(time);
    },[nextSong])

    useEffect(()=>{
        if(!currentSong.starttimeutc) return;

        let startTime = episode_date(currentSong.starttimeutc); // Tid låten börjar i 00:00 format
        let endTime = getSongLength(currentSong.stoptimeutc); // Tiden låten slutar i Date.now() format
        let songStart = getSongLength(currentSong.starttimeutc); // Tiden låten börjar i Date.now() format
        console.log("SONG START --> " + startTime);

        let songLength = endTime -songStart;
        console.log("SONG LENGTH --> " + songLength);
        

        let timeUntilNextSong = Math.abs(Date.now()-endTime);

        let songLenght_minutes = (songLength/1000)/60;
        console.log("SONG LENGTH in minutes --> " + songLenght_minutes);
        refreshSongs(timeUntilNextSong);

        console.log("Time until next song -->" + timeUntilNextSong);

    },[currentSong])

    function refreshSongs(time){
        if(!time) return;
        setTimeout(()=>{
            getSongs();
        },time)
    }

    function getSongLength(date){
        date = date.split("/").join("");
        date = date.split("Date").join("");
       date = date.split("(").join("");
       date = date.split(")").join("");
       let d = parseInt(date);
       return d;

    }

    function episode_date(date){
         date = date.split("/").join("");
         date = date.split("Date").join("");
        date = date.split("(").join("");
        date = date.split(")").join("");
        let d = parseInt(date);
        let _d = new Date(d);

        let hours = _d.getHours();
        let minutes = _d.getMinutes();
        if(hours <10){
            hours = `0${hours}`;
        }
        if(minutes <10){
            minutes = `0${minutes}`;
        }
        let date_output = `${hours}:${minutes}`;
        return date_output;
        // let day = _d.getDate();
        // let month = _d.getMonth();
        // let year = _d.getFullYear();
        // month = month+1;
        // if(day <10){
        //     day = `0${day}`;
        // }
        // if(month <10){
        //     month = `0${month}`;
        // }

        // let _date = `${year}-${month}-${day}`;
        // return (_date);
    }

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
            <p >{channelListen.tagline}</p>
            {(currentSong && currentSong.length !== 0) ? <p className="currentSong"><span>Just nu:</span> {currentSong.title} av {currentSong.artist}</p> : ""}
            {(nextSong && nextSong.length !== 0) ? <p className="nextSong"><span>Nästa låt:</span> {nextSong.title} av {nextSong.artist} ({nextSongTime})</p> : ""}
            <div className="audioEl">
                <AudioEl audioSRC={(audioSRC) ? audioSRC : channelListen.liveaudio.url}/>
            </div>
        </div>
    )
}
