import React,{useContext, useState} from 'react';

import EpisodeContext from '../EpisodeContext';

// Imported icons
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';

// import Episode from './Episode';
import EpisodeDetailed from './EpisodeDetailed';

export default function SearchResultDetailed({ setView, view }){

    const {searchTerm, episodes, totalHits, totalPages, currentPage, prevPageHandler, nextPageHandler, getEpisodesByPage} = useContext(EpisodeContext);

    const [pageNum, setPageNum] = useState("");

    function submitHandler(e){
        e.preventDefault();
        if(pageNum > totalPages) return;
        if(pageNum < 1) return;
        getEpisodesByPage(pageNum);
        setPageNum("");
    }

    function viewListHandler(){
        setView("list");
    }

    function viewDetailedListHandler(){
        setView("detailed");
    }


    return(
        <div className="searchResult_detailed">
        <p>Sök resultat för {searchTerm}</p>
        <form onSubmit={submitHandler}>
            <input className="pageNum_input" type="number" placeholder="Sidnr" onChange={e=>setPageNum(e.target.value)} value={pageNum} />
            <input className="pageNum_btn" type="submit" value="Gå"/>

        </form>
        <div className="searchResult_btnICON_div">
            <div className="icon">
                <ViewListIcon sx={{ fontSize: 32 }} onClick={viewListHandler} className={(view === 'list') ? "viewBTN active" : "viewBTN" } />
                <ViewModuleIcon sx={{ fontSize: 32 }} onClick={viewDetailedListHandler} className={(view === 'detailed')? "viewBTN2 active" : "viewBTN2"}/>
            </div>  
        </div>
        <div className="searchResult_pagesBTN">
            <ArrowBackIosIcon onClick={prevPageHandler} className="arrow_icon_left"/>
            <p>Sida {currentPage} av {totalPages}</p>
            <ArrowForwardIosIcon onClick={nextPageHandler} className="arrow_icon_right"/>
        </div>
        <p className="searchResultDetailed_showNormalList">{totalHits} träffar</p>
        <div className="episode_container">
        {episodes.map(episode=>(
                        <EpisodeDetailed key={episode.id} episode={episode}/>
                    ))}

        </div>
       
        </div>
    )
}