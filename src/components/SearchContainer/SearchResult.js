import React,{useContext} from 'react'

import EpisodeContext from '../EpisodeContext';

import Episode from './Episode';

export default function SearchResult(){
    const {searchTerm, episodes, totalHits, totalPages, currentPage} = useContext(EpisodeContext);
    return(
        <>
        <p>Sök resultat för "{searchTerm}"</p>
        <div className="searchResult_totalHits_div">
            {(totalHits) ? <p>{totalHits} träffar</p> : ""}
        </div>
        <div className="searchResult_container">
            <p>Sida {currentPage} av {totalPages}</p>
            {episodes.map(episode=>(
                <Episode key={episode.id} episode={episode}/>
            ))}
        </div>
        </>
    )
}