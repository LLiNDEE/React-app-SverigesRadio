import React,{useContext} from 'react'

import EpisodeContext from '../EpisodeContext';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import Episode from './Episode';

export default function SearchResult(){
    const {searchTerm, episodes, totalHits, totalPages, currentPage, prevPageHandler, nextPageHandler} = useContext(EpisodeContext);



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
        </div>
        </>
    )
}