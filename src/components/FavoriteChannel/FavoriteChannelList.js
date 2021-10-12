import React,{useContext, useEffect, useState} from 'react';
import Context from '../Context';

// Imported icons
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

// Imported components
import FavChannel from './FavChannel';



export default function FavoriteChannelList(){

    const {favoriteChannels, setViewFavChannel, setFavoriteChannels} = useContext(Context);
    const [favoriteList, setFavoriteList] = useState([]);
    const [totalPages, setTotalPages] = useState("");
    const [pageNumber, setPageNumber] = useState(0);

    // const [testList, setTestList] = useState([]);

    const channelsPerPage = 10;
    const pagesVisited = pageNumber * channelsPerPage;

    function goBackHandler(){
        setViewFavChannel(false);
    }

    // useEffect(()=>{
    //     let total_pages = Math.ceil(favoriteList.length/10);
    //     setTotalPages(total_pages);
    // },[])

    // let maxPAGE = (pagesVisited+channelsPerPage);

    function renderPAGE(){
        
        // let total_pages = Math.ceil(favoriteList.length/10);
        //  setTotalPages(total_pages);
        // // let amount = favoriteList.slice(pagesVisited,maxPAGE);
        // setFavoriteList(favoriteChannels.splice(pagesVisited,maxPAGE));

        // return (favoriteList.map((item)=>{
        //     console.log(item);
        //     return (
        //         <FavChannel key={item.id} channel={item}/>
        //     )
        // }));
        // console.log(favoriteChannels.splice(pagesVisited,maxPAGE));
        // console.log(favoriteChannels);


        // setTestList(favoriteChannels.splice(0,10));
        
        // Render all favorite channels. No pages...
        return (favoriteChannels.map((item)=>(
            <FavChannel favoriteChannels={favoriteChannels} key={item.id} channel={item}/>
        )));
        // return (testList.map((item)=>{
        //     <FavChannel favoriteChannels={favoriteChannels} key={item.id} channel={item}/>
        // }));
    }

    // function renderCurrentPage(page){
    //     // console.log("RAD 53")
    //     // favoriteList.map(item=>{
    //     //     if(item.page == page){
    //     //         console.log(`CHANNEL ON PAGE ${page} --> ` + item);
    //     //         return(
    //     //             <RadioChannel key={item.channel.id} channel={item.channel}/>
    //     //         )
    //     //     }
    //     // })
    // }

    function nextPageHandler(){
        let pages = pagesVisited+channelsPerPage;
        if(pages > favoriteList.length){
            console.log("RAD81")
            return;
        }

        setPageNumber(prev=>{
            return prev+1
        });
    }

    function prevPageHandler(){
        let pages = pagesVisited-channelsPerPage;
        if(pages < 0){
            return;
        }
        console.log(pages);
        setPageNumber(prev=>{
            return prev-1
        });
    }

    return(
        <>
         <div className="radiochannels_top">
             <h1>Favoriter</h1>
             <div className="Radiochannels_showFavorites_div">
                 <button onClick={goBackHandler}>Gå tillbaka</button>
             </div>
            
         </div>
        
        
         <div className="pageDisplay_div">
                     <ArrowForwardIosIcon onClick={nextPageHandler} className="arrow_icon_right"/>
                     <p className="currentPageText">Sida {pageNumber+1} av {totalPages} </p>
                     <ArrowBackIosIcon onClick={prevPageHandler} className="arrow_icon_left"/>
                 </div>
         <div className="RadioChannels_container">
                {renderPAGE()}
         </div>
        </>
    );
}