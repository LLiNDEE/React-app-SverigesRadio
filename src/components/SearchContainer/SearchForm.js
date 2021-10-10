import React,{useContext} from 'react'

import EpisodeContext from '../EpisodeContext';

export default function SearchForm() {

    const {searchTerm, setSearchTerm} = useContext(EpisodeContext);

    return (
        <form className="searchForm">
            <input onChange={e=>setSearchTerm(e.target.value)} value={searchTerm} className="searchInput" type="text" name="searchTerm" placeholder="Sök efter program..."></input>
        </form>
    )
}
