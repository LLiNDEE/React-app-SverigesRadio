import React,{useContext, useState, useEffect} from 'react';
import Context from './Context';

// Imported icons
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function RadioChannel({ channel }) {

    const {setListenStatus, setChannelListen, favoriteChannels, setFavoriteChannels} = useContext(Context);
    const [favStatus, setFavStatus] = useState(false);

    function ChannelListenHandler(){
        setListenStatus(true);
        setChannelListen(channel);
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
           return prev.filter(item=>item.id == channel.id)
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
                    <img src={channel.image}/>
                <button className="listenBTN" onClick={ChannelListenHandler}>Lyssna</button>
                {(favStatus) ? <button className="likeBTN" onClick={removeFromFavoritesHandler}>Ta bort från favoriter</button> : <button className="likeBTN" onClick={addToFavoritesHandler}>Lägg till i favoriter</button>}
            </div>
    )
}
