import React,{useState, useEffect} from 'react';

import Context from './Context';

//Imported icons
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import FavoriteIcon from '@mui/icons-material/Favorite';


// IMported components
import RadioChannel from './RadioChannel';
import ChannelListenEl from './ChannelListen/ChannelListen';



export default function RadioChannels() {

    const [RadioChannels, setRadioChannels] = useState([]);
    const [ListenStatus, setListenStatus] = useState(false);
    const [channelListen, setChannelListen] = useState("");

    const [nextPage, setNextPage] = useState("");
    const [prevPage, setPrevPage] = useState("");
    const [totalPages, setTotalPages] = useState("");
    const [currPage, setCurrPage] = useState("");

    const [favoriteChannels, setFavoriteChannels] = useState([]);



    useEffect(async()=>{
        let response = await fetch('https://api.sr.se/api/v2/channels/?format=json&page=1');
        response = await response.json();
        console.log(response.channels);
        console.log(response);
        setRadioChannels(response.channels);
        setNextPage(response.pagination.nextpage);
        setPrevPage(response.pagination.previouspage);
        setTotalPages(response.pagination.totalpages);
        setCurrPage(response.pagination.page);
    },[]);

    useEffect(()=>{
        let favs = JSON.parse(localStorage.getItem('favoriteChannels'));
        if(!favs) return;

        setFavoriteChannels(favs);

    },[])

    useEffect(()=>{
        localStorage.setItem('favoriteChannels',JSON.stringify(favoriteChannels));
    },[favoriteChannels])

    async function getPrograms(Fetchpage = ""){
        try{

            if(Fetchpage === "") return;

            let response = await fetch(Fetchpage);
            response = await response.json();

            setRadioChannels(response.channels);
            setNextPage(response.pagination.nextpage);
            setPrevPage(response.pagination.previouspage);
            setTotalPages(response.pagination.totalpages);
            setCurrPage(response.pagination.page);

        }catch(error){
            console.log(error.message);
        }
    }


    function nextPageHandler(){
        if(currPage === totalPages) return;
        getPrograms(nextPage);
    }

    function prevPageHandler(){
        if(currPage === 1)return;
        getPrograms(prevPage);
    }

    function render(){
        if(!ListenStatus){
            return(
                <>
                <div className="radiochannels_top">
                    <h1>Radio kanaler</h1>
                    <div className="Radiochannels_showFavorites_div">
                        <button> Visa favoritkanaler</button>
                    </div>
                </div>
                <div className="pageDisplay_div">
                    <ArrowForwardIosIcon onClick={nextPageHandler} className="arrow_icon_right"/>
                    <p className="currentPageText">Sida {currPage} av {totalPages} </p>
                    <ArrowBackIosIcon onClick={prevPageHandler} className="arrow_icon_left"/>
                </div>
                <div className="RadioChannels_container">
                    {(RadioChannels.map(rc=>(
                        <RadioChannel key={rc.id} channel={rc} />
                    )))}
                </div>
                </>
            );
        }
        if(ListenStatus){
            return(
                <>
                    <ChannelListenEl/>
                </>
            )
        }
    }

    return (
        <Context.Provider value={{RadioChannels, setListenStatus, setChannelListen, channelListen, favoriteChannels, setFavoriteChannels}} >
            {render()}
        </Context.Provider>
    )
}
