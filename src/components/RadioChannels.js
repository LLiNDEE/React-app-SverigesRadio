import React,{useState, useEffect, useContext} from 'react';

import Context from './Context';
import MainContext from './MainContext';

//Imported icons
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import FavoriteIcon from '@mui/icons-material/Favorite';


// IMported components
import RadioChannel from './RadioChannel';
import ChannelListenEl from './ChannelListen/ChannelListen';
import FavoriteChannelList from './FavoriteChannel/FavoriteChannelList';



export default function RadioChannels() {

    const {ListenStatus, setListenStatus, rockView, setRockView,channelListen, setChannelListen} = useContext(MainContext);

    const [RadioChannels, setRadioChannels] = useState([]);


    const [viewFavChannel, setViewFavChannel] = useState(false);

    const[secretChannel, setSecretChannel] = useState("");
    const [rockCode, setRockCode] = useState(['r','o','c','k']);
    const [rockSRC, setRockSRC] = useState("https://live-bauerse-fm.sharp-stream.com/rockklassiker_instream_se_aacp?direct=true&amp;listenerid=undefined&amp;aw_0_1st.bauer_listenerid=undefined&amp;aw_0_1st.playerid=SBS_RP_WEB&amp;aw_0_1st.skey=1633703664&amp;aw_0_1st.bauer_loggedin=false&amp;aw_0_req.userConsentV2=false");
    const rockIMG = "https://media.bauerradio.com/image/upload/c_crop,g_custom/v1592841144/brand_manager/stations/bpnhincodnqx2ovi5bdj.png";

    const [nrjCode, setNRJCode] = useState(['n','r','j']);
    const nrjSRC = "https://live-bauerse-fm.sharp-stream.com/nrj_instreamtest_se_aacp?direct=true&amp;listenerid=undefined&amp;aw_0_1st.bauer_listenerid=undefined&amp;aw_0_1st.playerid=SBS_RP_WEB&amp;aw_0_1st.skey=1634218464&amp;aw_0_1st.bauer_loggedin=false&amp;aw_0_req.userConsentV2=false";
    const NRJ_IMG = "https://media.bauerradio.com/image/upload/q_auto/v1628587254/shows/ogtthdft4int7qe03c9t.png";
   

    const [nextPage, setNextPage] = useState("");
    const [prevPage, setPrevPage] = useState("");
    const [totalPages, setTotalPages] = useState("");
    const [currPage, setCurrPage] = useState("");

    const [favoriteChannels, setFavoriteChannels] = useState([]);



    useEffect(async()=>{
        let response = await fetch('https://api.sr.se/api/v2/channels/?format=json&page=1');
        response = await response.json();
        console.log(response.channels);
        console.log(response);
        setRadioChannels(response.channels);
        setNextPage(response.pagination.nextpage);
        setPrevPage(response.pagination.previouspage);
        setTotalPages(response.pagination.totalpages);
        setCurrPage(response.pagination.page);
    },[]);

    useEffect(()=>{
        let favs = JSON.parse(localStorage.getItem('favoriteChannels'));
        if(!favs) return;

        setFavoriteChannels(favs);

    },[])

    useEffect(()=>{
        localStorage.setItem('favoriteChannels',JSON.stringify(favoriteChannels));
    },[favoriteChannels])

    async function getPrograms(Fetchpage = ""){
        try{

            if(Fetchpage === "") return;

            let response = await fetch(Fetchpage);
            response = await response.json();

            setRadioChannels(response.channels);
            setNextPage(response.pagination.nextpage);
            setPrevPage(response.pagination.previouspage);
            setTotalPages(response.pagination.totalpages);
            setCurrPage(response.pagination.page);

        }catch(error){
            console.log(error.message);
        }
    }


    function nextPageHandler(){
        if(currPage === totalPages) return;
        getPrograms(nextPage);
    }

    function prevPageHandler(){
        if(currPage === 1)return;
        getPrograms(prevPage);
    }

    function viewFavoriteChannelHandler(){
        setViewFavChannel(true);
    }

    function onKeyFunc(event){
        console.log("KEY CODE -- > " + event.key);

        let tryFindKey = rockCode.find(elem=> elem === event.key);
        let tryNrjKey = nrjCode.find(elem=> elem === event.key);
        if(!tryFindKey && !tryNrjKey) {
            setSecretChannel("");
            return;
        }
        setSecretChannel(prev=>{
            return prev+event.key
        });
    }

    useEffect(()=>{
        if(secretChannel == "rock"){
            setRockView("unlocked");
            setSecretChannel("");
        }
        if(secretChannel == "nrj"){
            setRockView("nrj");
            setSecretChannel("");
        }
    },[secretChannel])

    function render(){

        if(rockView == "unlocked"){
            return(
                <>
                    <ChannelListenEl audioSRC={rockSRC} audioIMG={rockIMG} audioNAME="Rockklassiker"/>
                </>
            )
        }

        if(rockView == "nrj"){
            return(
            <>
                <ChannelListenEl audioSRC={nrjSRC} audioIMG={NRJ_IMG} audioNAME="NRJ"/>
            </>
            );
        }

        if(!ListenStatus && !viewFavChannel){
            return(
                <>
                <div className="radiochannels_top" onKeyDown={onKeyFunc} tabIndex="0">
                    <h1>Radio kanaler</h1>
                    <div className="Radiochannels_showFavorites_div">
                        <button onClick={viewFavoriteChannelHandler}> Visa favoritkanaler</button>
                    </div>
                </div>
                <div className="pageDisplay_div">
                    <ArrowForwardIosIcon onClick={nextPageHandler} className="arrow_icon_right"/>
                    <p className="currentPageText">Sida {currPage} av {totalPages} </p>
                    <ArrowBackIosIcon onClick={prevPageHandler} className="arrow_icon_left"/>
                </div>
                <div className="RadioChannels_container">
                    {(RadioChannels.map(rc=>(
                        <RadioChannel key={rc.id} channel={rc} />
                    )))}
                </div>
                </>
            );
        }
        if(viewFavChannel && !ListenStatus){
            return (
                <FavoriteChannelList/>
            )
        }
        if(ListenStatus && !viewFavChannel){
            return(
                <>
                    <ChannelListenEl/>
                </>
            )
        }
    }

    return (
        <Context.Provider value={{RadioChannels, setListenStatus, setChannelListen, channelListen, favoriteChannels, setFavoriteChannels, setViewFavChannel, setRockView}} >
            {render()}
        </Context.Provider>
    )
}
