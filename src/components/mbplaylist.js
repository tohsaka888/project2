import React, {useEffect, useState} from 'react';
import {Flex} from "antd-mobile";
import {Typography} from 'antd'
import {Link} from "react-router-dom";

const Mbplaylist = () => {

    const [playlist, setPlaylist] = useState([]);

    useEffect(() => {
        const gedan = async () => {
            const res = await fetch(`http://139.196.141.233:3000/top/playlist?limit=12`, {mode: "cors"});
            const data = await res.json();
            setPlaylist(data.playlists);
        }
        gedan();
    }, [])

    return (
        <div>
            <p style={{fontFamily: "title", fontSize: "18px", marginTop: "10px"}}>歌单精选</p>
            <Flex justify={'center'} alignContent={"center"}>
                {playlist.slice(0, 4).map((item, index) => {
                    return (
                        <div key={index}>
                            <Link to={`/playlist/${item.id}`}>
                                <img className="playlist" src={item.coverImgUrl} style={{
                                    width: "70px",
                                    height: "70px",
                                    borderRadius: "50%",
                                    boxShadow: "5px 5px 5px #888888",
                                    marginLeft:"2vw",
                                    marginRight:"2vw"
                                }} alt={index}/>
                            </Link>
                            <Typography style={{marginTop: "5px"}}>
                                <Typography.Paragraph ellipsis={{rows: 2}} style={{
                                    fontFamily: "text",
                                    fontSize: "5px",
                                    width: "70px",
                                    marginLeft:"2vw",
                                    marginRight:"2vw"
                                }}>{item.name}</Typography.Paragraph>
                            </Typography>
                        </div>
                    )
                })}
            </Flex>
            <Flex justify={"center"}>
                {playlist.slice(4, 8).map((item, index) => {
                    return (
                        <div key={index}>
                            <Link to={`/playlist/${item.id}`}>
                                <img className="playlist" src={item.coverImgUrl} style={{
                                    width: "70px",
                                    height: "70px",
                                    borderRadius: "50%",
                                    boxShadow: "5px 5px 5px #888888",
                                    marginLeft:"2vw",
                                    marginRight:"2vw"
                                }} alt={index}/>
                            </Link>
                            <Typography style={{marginTop: "5px"}}>
                                <Typography.Paragraph ellipsis={{rows: 2}} style={{
                                    fontSize: "5px",
                                    width: "70px",
                                    fontFamily: "text",
                                    marginLeft:"2vw",
                                    marginRight:"2vw"
                                }}>{item.name}</Typography.Paragraph>
                            </Typography>
                        </div>
                    )
                })}
            </Flex>
        </div>
    );
};

export default Mbplaylist;
