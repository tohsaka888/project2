import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import {Affix, Layout, BackTop} from 'antd'
import Header from "./components/header";
import Content from "./components/content";
import {Route, Switch} from 'react-router-dom'
import Search from "./components/Search";
import PlayList from "./components/playlist";
import My from "./components/My";
import {playContext} from "./components/Context";
import {indexContext} from "./components/Context";
import MusicDetail from "./components/musicDetail";

function Pc() {

    const [play, setPlay] = useState({tracks: []})
    const [toplistSongs2, setToplistSongs2] = useState([]);
    const [toplistSongs1, setToplistSongs1] = useState([]);
    const [toplistSongs, setToplistSongs] = useState([]);
    const [cookie, setCookie] = useState(localStorage.neteaseCookie);
    const [songData, setSongData] = useState([]);
    const [musicSrc, setMusicSrc] = useState("");
    const [visible, setVisible] = useState(false);
    const [banner, setBanner] = useState([]);
    const [playlist, setPlaylist] = useState([]);
    const img = useRef(null);
    const [loginState, setLoginState] = useState({});
    const [userLike, setUserLike] = useState([]);
    const [weekData, setWeekData] = useState([]);
    const [comment, setComment] = useState({});
    const [artist, setArtist] = useState([]);
    const [artist1, setArtist1] = useState([]);
    const [artist2, setArtist2] = useState([]);
    const [artist3, setArtist3] = useState([]);
    const [mymusic, setMymusic] = useState({});
    const [toplist1, setToplist] = useState([]);
    const [change,setChange] = useState(0)
    const audio = useRef(null)
    const changeProp = {
        state : change,
        setState : setChange
    }

    const playlistDetail = async (id, cookie) => {
        const res = await fetch(`http://121.196.180.250:3000/playlist/detail?id=${id}&cookie=${cookie}`,{mode:"cors"});
        const data = await res.json();
        return data;
    }

    useEffect(() => {

        const send = async () => {
            const res = await fetch("http://121.196.180.250:3000/banner", {mode: "cors"});
            const data = await res.json();
            setBanner(data.banners);
        }

        const gedan = async () => {
            const res = await fetch(`http://121.196.180.250:3000/top/playlist?limit=12&cookie=${cookie}`, {mode: "cors"});
            const data = await res.json();
            setPlaylist(data.playlists);
        }

        const toplist = async () => {
            const res = await fetch("http://121.196.180.250:3000/toplist/artist?type=1", {mode: "cors"});
            const data = await res.json();
            setArtist(data.list.artists);
            const res1 = await fetch("http://121.196.180.250:3000/toplist/artist?type=2", {mode: "cors"});
            const data1 = await res1.json();
            setArtist1(data1.list.artists);
            const res2 = await fetch("http://121.196.180.250:3000/toplist/artist?type=3", {mode: "cors"});
            const data2 = await res2.json();
            setArtist2(data2.list.artists);
            const res3 = await fetch("http://121.196.180.250:3000/toplist/artist?type=4", {mode: "cors"});
            const data3 = await res3.json();
            setArtist3(data3.list.artists);
            const res4 = await fetch("http://121.196.180.250:3000/toplist");
            const data4 = await res4.json();
            setToplist(data4.list.slice(0, 3));
            const res5 = await fetch(`http://121.196.180.250:3000/playlist/detail?id=${data4.list[0].id}`);
            const data5 = await res5.json();
            setToplistSongs(data5.playlist.tracks.slice(0, 10));
            const res6 = await fetch(`http://121.196.180.250:3000/playlist/detail?id=${data4.list[1].id}`);
            const data6 = await res6.json();
            setToplistSongs1(data6.playlist.tracks.slice(0, 10));
            const res7 = await fetch(`http://121.196.180.250:3000/playlist/detail?id=${data4.list[2].id}`);
            const data7 = await res7.json();
            setToplistSongs2(data7.playlist.tracks.slice(0, 10));
        }
        const login = async () => {
            const res = await fetch(`http://121.196.180.250:3000/login/status?cookie=${cookie}`, {
                credentials: "include",
                mode: "cors"
            });
            const data = await res.json();
            await fetch(`http://121.196.180.250:3000/login/refresh?cookie=${cookie}`, {credentials: "include", mode: "cors"});
            setLoginState(data);
        }
        const newAlbum = async () => {
            const res = await fetch(`http://121.196.180.250:3000/top/album?limit=30&cookie=${cookie}`, {
                mode: "cors",
                credentials: "include"
            });
            const data = await res.json();
            setWeekData(data.monthData);
        }

        const like = async () => {
            const res = await fetch(`http://121.196.180.250:3000/recommend/resource?cookie=${cookie}`, {
                mode: "cors",
                credentials: "include"
            });
            const data = await res.json();
            setUserLike(data.recommend);
        }
        login();
        newAlbum();
        send();
        gedan();
        toplist();
        like();
    }, [cookie])

    return (
        <indexContext.Provider value={changeProp}>
            <playContext.Provider value={playlistDetail}>
                <div className="App">
                    <div>
                        <Layout>
                            <BackTop visibilityHeight={100}/>
                            <Header visible={visible} setVisible={setVisible} setUserLike={setUserLike} userLike={userLike}
                                    cookie={cookie} loginStatus={loginState} songData={songData} setSongData={setSongData} setPlay={setPlay}
                                    setLoginStatus={setLoginState} setMymusic={setMymusic} setComment={setComment}
                                    setCookie={setCookie}/>
                            <Switch>
                                <Route exact path="/">
                                    <Content banner={banner} playlist={playlist} img={img} visible={visible} cookie={cookie}
                                             toplistSongs2={toplistSongs2}
                                             setVisible={setVisible} setPlay={setPlay} setComment={setComment}
                                             toplist1={toplist1} setSongUrl={setMusicSrc}
                                             loginStatus={loginState} userLike={userLike} weekData={weekData}
                                             toplistSongs={toplistSongs}
                                             artist={artist} artist1={artist1} artist3={artist3} artist2={artist2}
                                             toplistSongs1={toplistSongs1}
                                    />
                                </Route>
                                <Route path={`/mymusic/:id`}><My mymusic={mymusic} comment={comment}
                                                                 setMusicUrl={setMusicSrc}
                                                                 loginStatus={loginState}
                                                                 play={play} setComment={setComment}
                                                                 setPlay={setPlay} setMymusic={setMymusic}
                                                                 cookie={cookie}/></Route>
                                <Route path={`/search/:keywords`}><Search songData={songData} setMusicSrc={setMusicSrc}
                                                                          cookie={cookie} setSongData={setSongData}/></Route>
                                <Route path={`/playlist/:id`}>
                                    <PlayList setMusicUrl={setMusicSrc} loginStatus={loginState}
                                              comment={comment} setComment={setComment} margin="15vw"/>
                                </Route>
                                <Route path={'/musicdetail/:id'}>
                                    <MusicDetail setMusicUrl={setMusicSrc} loginStatus={loginState} cookie={cookie}/>
                                </Route>
                            </Switch>
                            <div style={{height: "20px"}}/>
                            <Affix offsetBottom={0} className="audio" style={{zIndex: "100"}}>
                                <div style={{
                                    background: "black",
                                    height: "70px",
                                    padding: "8px",
                                    borderRadius: "50px",
                                    zIndex: "100"
                                }}>
                                    <audio id={'audio'} ref={audio}
                                           src={musicSrc} autoPlay
                                           controls style={{
                                        width: "70vw",
                                        marginLeft: "auto",
                                        marginRight: "auto",
                                        background: "black",
                                        border: "none"
                                    }}/>
                                </div>
                            </Affix>
                        </Layout>
                    </div>
                </div>
            </playContext.Provider>
        </indexContext.Provider>
    );
}

export default Pc;

