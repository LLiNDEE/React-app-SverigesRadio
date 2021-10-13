import React,{useContext, useState, useEffect} from 'react';
import Context from './Context';

// Imported icons
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import {FaRegHeart} from 'react-icons/fa';

export default function RadioChannel({ channel }) {

    const {setListenStatus, setChannelListen, favoriteChannels, setFavoriteChannels, setViewFavChannel} = useContext(Context);
    const [favStatus, setFavStatus] = useState(false);

    function ChannelListenHandler(){
        setListenStatus(true);
        setChannelListen(channel);
        setViewFavChannel(false);
    }

    useEffect(()=>{
        let favChannels = JSON.parse(localStorage.getItem('favoriteChannels'));
        if(!favChannels) return;
        favChannels.forEach(item=>{
            if(item.id == channel.id){
                setFavStatus(true);
                return;
            }
        })
    },[])

    function removeFromFavoritesHandler(){
        setFavoriteChannels(prev=>{
           return prev.filter(item=>item.id != channel.id)
        });
        setFavStatus(false); 
    }

    function addToFavoritesHandler(){
        setFavoriteChannels(prev=>{
            return [channel,...prev]
        });
        setFavStatus(true);
    }

    function heartRender(){
        if(favStatus){
            return (
                // <FavoriteIcon id="fullHeartIcon" onClick={removeFromFavoritesHandler}/>
                <button className="likeBTN" onClick={removeFromFavoritesHandler}>Ta bort från favoriter</button>
            )
        }
        if(!favStatus){
            return(
                // <FavoriteBorderIcon id="heartICON" onClick={addToFavoritesHandler}/>
                <button className="likeBTN" onClick={addToFavoritesHandler}>Lägg till i favoriter</button>
            )
        }
    }

    return (
            <div className="radiochannel">

                <h3>{channel.name}</h3>
                <div className="channel_img_heart_div">
                    <img src={(channel.image) ? channel.image : "https://www.jazzmusicarchives.com/images/covers/quantic(united-kingdom)-the-sheepskin-sessions-20210219105013.jpg"}/>
                    
                    {(favStatus) ? <FavoriteIcon sx={{ fontSize: 65 }} onClick={removeFromFavoritesHandler} className="channel_heartICON_Half ColorRED hidden" /> : <FavoriteBorderIcon onClick={addToFavoritesHandler} sx={{ fontSize: 65 }} className="channel_heartICON_Half hidden"/>}
                </div>
                <button className="listenBTN" onClick={ChannelListenHandler}>Lyssna</button>
                {/* {(favStatus) ? <button className="likeBTN" onClick={removeFromFavoritesHandler}>Ta bort från favoriter</button> : <button className="likeBTN" onClick={addToFavoritesHandler}>Lägg till i favoriter</button>} */}
            </div>
    )
}
