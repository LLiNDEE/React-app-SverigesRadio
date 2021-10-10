import React,{useRef, useState, useEffect} from 'react'

import { FaStop, FaPlay } from "react-icons/fa";

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';


export default function AudioElement({ duration ,audioSRC }) {

    const [pauseStatus, setPauseStatus] = useState(false);
    const [value, setValue] = useState(10);
    const [volumeOFF,setVolumeOFF] = useState(false);
    const [muted, setMuted] = useState(false);
    const [prevVolume, setPrevVolume] = useState(0);

    // const [position, setPosition] = useState(30);
    const [totalTime, setTotalTime] = useState("");
    // const [duration, setDuration] = useState(200);

    let SliderDuration;

    const audioEl = useRef();

    useEffect(()=>{
        let seconds = String(duration%60);
        let minutes = String(duration/60);
        minutes = minutes.split(".");
        seconds = seconds.split(".");
        let totalTime = `${minutes[0]}:${seconds}`
        setTotalTime(totalTime);
        // SliderDuration = totalTime;
    },[]);

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
        audioEl.current.pause();
    }

    function playHandler(){
        setPauseStatus(false);
        audioEl.current.play();
        audioEl.current.load();
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



    return (
        <div className="audioElement_div">
            <audio autoPlay ref={audioEl}>
                <source src={audioSRC}></source>
            </audio>
            <Box sx={{ width: 200 }}>
                <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                    {(volumeOFF) ? <VolumeOffIcon onClick={turnVolumeONhandler} className="volume-off-btn"/> : <VolumeDown onClick={turnVolumeOffHandler} className="volume-down-btn"/>}
                    <Slider aria-label="Volume" value={value} onChange={handleChange} />
                    <VolumeUp />
                </Stack>
            </Box>
            {/* <p>{totalTime}</p> */}
            {/* <Slider
                aria-label="time-indicator"
                color="secondary"
                value={position}
                min={0}
                max={SliderDuration}
                step={0.1}
                onChange={(_,value)=> setPosition(value)}
            /> */}
            {/* <p>Total time {totalTime}</p>
            <p>CURRENT TIME {position}</p>
            <audio controls> 
                <source src={audioSRC}></source>
            </audio> */}
            {toggleBtnHandler()}
        </div>
    )
}
