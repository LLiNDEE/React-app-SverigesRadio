import React,{useRef, useState, useEffect} from 'react'

import { FaStop, FaPlay } from "react-icons/fa";

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { CircleOutlined } from '@mui/icons-material';


export default function AudioElement({ duration ,audioSRC }) {

    const [pauseStatus, setPauseStatus] = useState(false);
    const [value, setValue] = useState(10);
    const [volumeOFF,setVolumeOFF] = useState(false);
    const [muted, setMuted] = useState(false);
    const [prevVolume, setPrevVolume] = useState(0);

    const [position, setPosition] = useState(0);
    const [totalTime, setTotalTime] = useState("");
    const [prevPos, setPrevpos] = useState("");
    // const [duration, setDuration] = useState(200);

    const [timePlayed, setTimePlayed] = useState("");
    const [isPlaying, setIsPlaying ] = useState(true);

    let SliderDuration = duration;

    const audioEl = useRef();

    useEffect(()=>{
        setPosition(0);
        audioEl.current.load();
        audioEl.current.currentTime = position;
        playHandler();
    },[audioSRC])

    useEffect(()=>{
        // let seconds = String(duration%60);
        // let minutes = String(duration/60);
        // minutes = minutes.split(".");
        // seconds = seconds.split(".");
        // let totalTime = `${minutes[0]}:${seconds}`
        // setTotalTime(totalTime);
        let seconds = Math.floor(duration%60);
        let minutes = Math.floor(duration/60);
        if(seconds < 10){
            seconds = `0${seconds}`;
        }
        if(minutes < 10){
            minutes = `0${minutes}`;
        }
        let totalTime = `${minutes}:${seconds}`;
        setTotalTime(totalTime);
        // SliderDuration = totalTime;
    },[duration]);

    useEffect(()=>{
        audioEl.current.volume = value/100;
    },[])

    useEffect(()=>{

        if(value/100 !== 0){
            setMuted(false);
            setVolumeOFF(false);
            turnVolumeONhandler();
        }

        if((value/100) === 0){
            setVolumeOFF(true);
        }else{
            setVolumeOFF(false);
        }

    },[value])

    function pauseHandler(){
        setPauseStatus(true);
        setIsPlaying(false);
        setPrevpos(position);
        audioEl.current.pause();
    }

    function playHandler(){
        if(position == duration){
            audioEl.current.currentTime = 0;
            setPauseStatus(false);
            setIsPlaying(true);
            setPosition(0);
            audioEl.current.play();
            return;
        }

        setPauseStatus(false);
        setIsPlaying(true);
        setPosition(prev=>{
            return prev+1
        });
        audioEl.current.play();
    }

    function toggleBtnHandler(){
        if(!pauseStatus){
            return(
                <button className="stopBTN" onClick={pauseHandler}><FaStop id="stopICON"/></button>
            )
        }
        if(pauseStatus){
            return (
                <button className="playBTN" onClick={playHandler}><FaPlay id="playICON"/></button>
            )
        }
    }

    function volumeHandler(){
        audioEl.current.volume = value/100;
    }

    function handleChange(event, newValue){
        setValue(newValue);
        volumeHandler();
      };

      function turnVolumeOffHandler(){
          if(!muted){
            setPrevVolume(value);
            setValue(0);
            audioEl.current.muted = true;
            setMuted(true);
          }
      }
        
    function turnVolumeONhandler(){
        if(muted){
            setValue(prevVolume);
            audioEl.current.muted = false;
            setMuted(false);
        }
    }

    useEffect(()=>{
        let seconds = Math.floor(position%60);
        let minutes = Math.floor(position/60);
        if(minutes <10){
            minutes = `0${minutes}`;
        }
        if(seconds <10){
            seconds = `0${seconds}`;
        }
        let time_string = `${minutes}:${seconds}`;
        
        let currentTime = audioEl.current.currentTime;
        if(currentTime == duration){
            return;
        }
        setTimePlayed(time_string);
        setAudioTime();
    },[position])

    function setAudioTime(){
        audioEl.current.currentTime = position;
    }

    useEffect(()=>{
        if(position == duration) {
            pauseHandler();
            return;
        }
        const interval = setInterval(()=>{
            if(!isPlaying) return;
            setPosition(prev=>{
                return prev+1;
            });
        },1000);
        return () => clearInterval(interval);
    },[position])


    return (
        <div className="audioElement_div">
            <audio autoPlay ref={audioEl}>
                <source src={audioSRC}></source>
            </audio>
            <div className="volume-slider-div">
                <Box sx={{ width: 400 }}>
                    <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                        {(volumeOFF) ? <VolumeOffIcon onClick={turnVolumeONhandler} className="volume-off-btn"/> : <VolumeDown onClick={turnVolumeOffHandler} className="volume-down-btn"/>}
                        <Slider aria-label="Volume" value={value} onChange={handleChange} />
                        <VolumeUp />
                    </Stack>
                </Box>
            </div>
            <div className="audio-progressbar">
            <p className="currentTime">{timePlayed}</p>
                <Slider
                    aria-label="time-indicator"
                    color="secondary"
                    value={position}
                    min={0}
                    max={SliderDuration}
                    step={1}
                    onChange={(_,value)=> setPosition(value)}
                    className="pB-slider"
                />
                <p className="totalTime">{totalTime}</p>
            </div>
            
            
            {toggleBtnHandler()}
        </div>
    )
}
