import React,{useContext, useState} from 'react'

import EpisodeContext from '../EpisodeContext';

// Imported icons
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';

// Imported components
import Episode from './Episode';
import SearchResultDetailed from './SearchResultDetailed';

export default function SearchResult(){
    const {searchTerm, episodes, totalHits, totalPages, currentPage, prevPageHandler, nextPageHandler} = useContext(EpisodeContext);

    const [view, setView] = useState("list");

    // function viewDetailedListHandler(){
    //     setView("detailed");
    // }

    function viewListHandler(){
        setView("list");
    }

    function viewDetailedListHandler(){
        setView("detailed");
    }

    function render(){
        if(view === "list"){
            return(
                <>
                <p>Sök resultat för "{searchTerm}"</p>
                <div className="searchResult_totalHits_div">
                    {(totalHits) ? <p>{totalHits} träffar</p> : ""}
                </div>


                <div className="searchResult_container">
                <div className="searchResult_btnICON_div">
                    <div className="icon">
                        <ViewListIcon sx={{ fontSize: 32 }} onClick={viewListHandler} className={(view === 'list') ? "viewBTN active" : "viewBTN" } />
                        <ViewModuleIcon sx={{ fontSize: 32 }} onClick={viewDetailedListHandler} className={(view === 'list-detailed')?"viewBTN2 active" : "viewBTN2"}/>
                    </div>
                    
                </div>
                    <div className="searchResult_pagesBTN">
                        <ArrowBackIosIcon onClick={prevPageHandler} className={(currentPage == 1) ? "arrow_icon_left btn_disabled" : "arrow_icon_left"}/>
                        <p>Sida {currentPage} av {totalPages}</p>
                        <ArrowForwardIosIcon onClick={nextPageHandler} className="arrow_icon_right"/>
                    </div>
                    
                    {episodes.map(episode=>(
                        <Episode key={episode.id} episode={episode}/>
                    ))}
                    {/* <p className="searchResult_showDetailed_btn" onClick={viewDetailedListHandler}>Visa detaljerad lista</p> */}
                </div>
                </>
            )
        }

        if(view === 'detailed'){
            return(
                <SearchResultDetailed view={view} setView={setView}/>
            )
        }
    }

    return(
        <>
            {render()}
        </>
    )
}