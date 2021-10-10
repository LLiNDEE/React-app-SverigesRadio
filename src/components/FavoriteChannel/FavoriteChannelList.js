import React,{useContext, useEffect, useState} from 'react';
import Context from '../Context';

// Imported icons
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

// Imported components
import RadioChannel from '../RadioChannel';



export default function FavoriteChannelList(){

    const {favoriteChannels, setViewFavChannel} = useContext(Context);
    const [favoriteList, setFavoriteList] = useState(favoriteChannels);
    const [totalPages, setTotalPages] = useState("");
    const [pageNumber, setPageNumber] = useState(0);

    const channelsPerPage = 10;
    const pagesVisited = pageNumber * channelsPerPage;

    function goBackHandler(){
        setViewFavChannel(false);
    }

    useEffect(()=>{
        // if(favoriteChannels.length > 10){
        //     // console.log("ANTAL FAVORITISERADE " +favoriteChannels.length);
        //     let AntalSidor = 1;
        //     let antalObjekt = 0;
        //     let newArr = [];
        //     for(let i = 0; i<favoriteChannels.length; i++){
        //         if(newArr.length >=9 && antalObjekt == 10){
        //             AntalSidor  = AntalSidor +1;
        //             antalObjekt = 0;
        //         }
                
        //         newArr.push({"page":AntalSidor, "channel": favoriteChannels[i]});
        //         antalObjekt++;
        //     }

        //     setTotalFavPages(AntalSidor);
        //     setCurrentPage(1);
            
        // }
        // console.log(favoriteChannels.splice(10,15));
        let total_pages = Math.ceil(favoriteList.length/10);
        setTotalPages(total_pages);
    },[])

    function render(){
        // favoriteList.splice(0, 10).map((item)=>{
        //     console.log(favoriteList);
        //     return(
        //         <RadioChannel key={item.id} channel={item}/>
        //     )
        // })
        // if(favoriteList.length < (pagesVisited+channelsPerPage)){

        // }
        let maxPAGE = (pagesVisited+channelsPerPage);
        let amount = favoriteList.slice(pagesVisited,maxPAGE);

        return (amount.map((item)=>{
            console.log(item);
            return (
                <RadioChannel key={item.id} channel={item}/>
            )
        }));
    }

    function renderCurrentPage(page){
        // console.log("RAD 53")
        // favoriteList.map(item=>{
        //     if(item.page == page){
        //         console.log(`CHANNEL ON PAGE ${page} --> ` + item);
        //         return(
        //             <RadioChannel key={item.channel.id} channel={item.channel}/>
        //         )
        //     }
        // })
    }

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
            {render()}
            
        </div>
        </>
    );
}