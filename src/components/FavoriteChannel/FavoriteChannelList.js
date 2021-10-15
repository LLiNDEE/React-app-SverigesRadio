import React,{useContext, useEffect, useState} from 'react';
import Context from '../Context';

// Imported icons
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

// Imported components
import FavChannel from './FavChannel';



export default function FavoriteChannelList(){

    const {favoriteChannels, setViewFavChannel} = useContext(Context);
    
    const [totalPages, setTotalPages] = useState("");
    const [pageNumber, setPageNumber] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);


    function goBackHandler(){
        setViewFavChannel(false);
    }

    function renderPAGE(){
        const channelsPerPage = 10;
        const arr = favoriteChannels;
        const groups = arr.map((e, i) => { 
            return i % channelsPerPage === 0 ? arr.slice(i, i + channelsPerPage) : null; 
        }).filter(e => { return e; });

        console.log("CUR PAGE --> " + currentPage);

        if(!groups[currentPage]){
            setCurrentPage(prev=>{
                return prev-1
            });
            return groups[currentPage-1].map((item)=>(
                <FavChannel favoriteChannels={favoriteChannels} key={item.id} channel={item}/>
            ));
        }

        return groups[currentPage].map((item)=>(
            <FavChannel favoriteChannels={favoriteChannels} key={item.id} channel={item}/>
        ));
    }

    function nextPageHandler(){

        if((currentPage+1) >= Math.ceil(favoriteChannels.length/10)){
            return;
        }

        setCurrentPage(prev=>{
            return prev+1
        });

    }

    function prevPageHandler(){
        if((currentPage-1) < 0){
            return;
        }
        setCurrentPage(prev=>{
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
                     <p className="currentPageText">Sida {currentPage+1} av {Math.ceil(favoriteChannels.length/10)} </p>
                     <ArrowBackIosIcon onClick={prevPageHandler} className="arrow_icon_left"/>
                 </div>
         <div className="RadioChannels_container">
                {renderPAGE()}
         </div>
        </>
    );
}