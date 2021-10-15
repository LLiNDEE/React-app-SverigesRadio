import React,{useContext, useState, useEffect} from 'react';
import Context from '../Context';

// Imported icons
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function FavChannel({ channel, favoriteChannels }) {

    const {setListenStatus, setChannelListen,setFavoriteChannels ,setViewFavChannel} = useContext(Context);
    const [favStatus, setFavStatus] = useState(false);
    // const [currList, setCurrList] = useState([]);

    function ChannelListenHandler(){
        setListenStatus(true);
        setChannelListen(channel);
        setViewFavChannel(false);
    }
    let favChannels;
    useEffect(()=>{
         favChannels = JSON.parse(localStorage.getItem('favoriteChannels'));
        if(!favChannels) return;
        favChannels.forEach(item=>{
            if(item.id === channel.id){
                setFavStatus(true);
                return;
            }
        })
        // setCurrList(favChannels);
    },[])

    function removeFromFavoritesHandler(){
        // setFavoriteChannels(prev=>{
        //     return prev.filter(item=>item.id != channel.id)
        //  });
        //  setFavStatus(false);
        // let newArr = []; 
        // favoriteChannels.forEach(item=>{
        //     console.log(item);
        //     if(item.id != channel.id){
        //         newArr.push(item);
        //     }
        // });
        // console.log(newArr);
        // console.log(currList);
        // let newArr = [];
        // currList.forEach(item=>{
        //     if(item.id != channel.id){
        //         newArr.push(item);
        //     }
        // });
        // console.log(newArr);
        // setFavoriteChannels(currList.filter(item=>item.id != channel.id));
        // setFavStatus(false);
        setFavoriteChannels(prev=>{
            return prev.filter(item=>item.id !== channel.id)
         });
         setFavStatus(false); 
    }

    function addToFavoritesHandler(){
        setFavoriteChannels(prev=>{
            return [channel,...prev]
        });
        setFavStatus(true);
    }

    // function heartRender(){
    //     if(favStatus){
    //         return (
    //             // <FavoriteIcon id="fullHeartIcon" onClick={removeFromFavoritesHandler}/>
    //             <button className="likeBTN" onClick={removeFromFavoritesHandler}>Ta bort från favoriter</button>
    //         )
    //     }
    //     if(!favStatus){
    //         return(
    //             // <FavoriteBorderIcon id="heartICON" onClick={addToFavoritesHandler}/>
    //             <button className="likeBTN" onClick={addToFavoritesHandler}>Lägg till i favoriter</button>
    //         )
    //     }
    // }

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
