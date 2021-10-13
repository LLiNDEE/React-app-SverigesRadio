import React,{useContext} from 'react'

import EpisodeContext from '../EpisodeContext';

export default function EpisodeDetailed({ episode }) {

    const {setEpisodeListen, setListeningStatus} = useContext(EpisodeContext);

    function episode_date(){
        let date = episode.publishdateutc;
         date = date.split("/").join("");
         date = date.split("Date").join("");
        date = date.split("(").join("");
        date = date.split(")").join("");
        let d = parseInt(date);
        let _d = new Date(d);

        let day = _d.getDate();
        let month = _d.getMonth();
        let year = _d.getFullYear();
        month = month+1;
        if(day <10){
            day = `0${day}`;
        }
        if(month <10){
            month = `0${month}`;
        }

        let _date = `${year}-${month}-${day}`;
        return (_date);
    }

    function listenHandler(){
        setListeningStatus(true);
        setEpisodeListen(episode);
    }

    return (
        <div className="episode">
            <div className="episode_img">
                <img src={episode.imageurl}/>
                <div className="episode_description hidden">
                {/* <p>{episode.description}</p> */}
                <p>{(episode.description.length <150) ? episode.description.trim() : episode.description.substring(0,147).trim()+"..."}</p>
            </div>
            </div>
            <div className="e_container">
                <h4 className="episode_title">{episode.title}</h4>
                <p className="publish_date">Publicerad: {episode_date()}</p> 
            </div>

            <button onClick={listenHandler} className="episode_listenBTN">Lyssna</button>
            
        </div>
    )
}
