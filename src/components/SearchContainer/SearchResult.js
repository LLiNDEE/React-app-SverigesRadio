import React,{useContext, useState} from 'react'

import EpisodeContext from '../EpisodeContext';

// Imported icons
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

// Imported components
import Episode from './Episode';
import SearchResultDetailed from './SearchResultDetailed';

export default function SearchResult(){
    const {searchTerm, episodes, totalHits, totalPages, currentPage, prevPageHandler, nextPageHandler} = useContext(EpisodeContext);

    const [view, setView] = useState("");

    function viewDetailedListHandler(){
        setView("detailed");
    }

    function render(){
        if(view == ""){
            return(
                <>
                <p>Sök resultat för "{searchTerm}"</p>
                <div className="searchResult_totalHits_div">
                    {(totalHits) ? <p>{totalHits} träffar</p> : ""}
                </div>
                <div className="searchResult_container">
                    <div className="searchResult_pagesBTN">
                        <ArrowBackIosIcon onClick={prevPageHandler} className="arrow_icon_left"/>
                        <p>Sida {currentPage} av {totalPages}</p>
                        <ArrowForwardIosIcon onClick={nextPageHandler} className="arrow_icon_right"/>
                    </div>
                    
                    {episodes.map(episode=>(
                        <Episode key={episode.id} episode={episode}/>
                    ))}
                    <p className="searchResult_showDetailed_btn" onClick={viewDetailedListHandler}>Visa detaljerad lista</p>
                </div>
                </>
            )
        }

        if(view == 'detailed'){
            return(
                <SearchResultDetailed setView={setView}/>
            )
        }
    }

    return(
        <>
            {render()}
        </>
    )
}