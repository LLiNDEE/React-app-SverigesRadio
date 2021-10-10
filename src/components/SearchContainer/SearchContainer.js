import React,{useState, useEffect} from 'react'

import EpisodeContext from '../EpisodeContext';

// Imported components
import SearchForm from './SearchForm';
import SearchResult from './SearchResult';
import EpisodeListenContainer from './EpisodeListen';

export default function SearchContainer() {

    const [searchTerm, setSearchTerm] = useState("");
    const [episodes, setEpisodes] = useState([]);
    const [totalPages, setTotalPages] = useState("");
    const [nextPage, setNextPage] = useState("");
    const [prevPage, setPrevPage] = useState("");
    const [totalHits, setTotalHits] = useState("");
    const [currentPage, setCurrentPage] = useState("");

    const [listeningStatus, setListeningStatus] = useState(false);
    const [EpisodeListen, setEpisodeListen] = useState("");

    useEffect(async()=>{

        if(searchTerm === "") return;

        let response = await fetch(`https://api.sr.se/api/v2/episodes/search/?query=${searchTerm}&format=json`);
        response = await response.json();
        console.log(response);
        setEpisodes(response.episodes);
        setTotalPages(response.pagination.totalpages);
        setTotalHits(response.pagination.totalhits);
        setNextPage(response.pagination.nextpage);
        setCurrentPage(response.pagination.page);

        if(response.pagination.previouspage){
            setPrevPage(response.pagination.previouspage);
        }

    },[searchTerm])

    
    function renderListen(){
        if(listeningStatus){
            return(
                <EpisodeListenContainer/>
            );
        }
    }

    return (
        <EpisodeContext.Provider value={{searchTerm, setSearchTerm, episodes, totalHits, totalPages, currentPage, setEpisodeListen, setListeningStatus, EpisodeListen}} >
        <div className="SearchContainer">
                {renderListen()}
                <h1>Sök...</h1>
                <SearchForm/>
                {(searchTerm !== "" && searchTerm.length >1) ? <SearchResult/> : ""}
        </div>
        </EpisodeContext.Provider>
    )
}