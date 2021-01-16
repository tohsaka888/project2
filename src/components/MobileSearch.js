import React, {useEffect, useState} from 'react';
import {useParams,useHistory,Link} from 'react-router-dom'
import {Flex, SearchBar} from "antd-mobile";
import {ArrowLeftOutlined,PlayCircleOutlined} from '@ant-design/icons'
import {Avatar, Typography} from "antd";

const MobileSearch = ({setMusicSrc}) => {

    const [songs,setSongs] = useState([]);
    const {value} = useParams();
    const history = useHistory();

    useEffect(()=>{
        const search = async () => {
            const res = await fetch(`http://139.196.141.233:3000/search?keywords=${value}`);
            const data = await res.json();
            setSongs(data.result.songs);
        }
        search();
    },[value])

    const search = (value) => {
        history.push(`/search/${value}`)
    }

    const getSongs = async (id) => {
        const res = await fetch(`http://139.196.141.233:3000/song/url?id=${id}`);
        const data = await res.json();
        setMusicSrc(data.data[0].url);
    }

    return (
        <div>
            <Flex>
                <div style={{height:"44px",background:"red",alignItems:"middle"}}>
                    <ArrowLeftOutlined style={{background:"red",marginTop:"12px",fontSize:"18px",marginLeft:"2vw",color:"white"}}
                                       onClick={()=>{history.push('/')}}/>
                </div>
                <SearchBar style={{width:"100%",background:"red",color:"white"}} placeholder={value} onSubmit={(value)=>{search(value)}} />
            </Flex>
            {console.log(songs)}
            {songs && songs.map((item,index)=>{
                return (
                    <Link to={`/song/${item.id}`}>
                        <Flex key={index} justify={"center"} alignContent={"center"}
                              style={{border: "1px solid #F9F9F9", marginTop: "2vh"}}>
                            <Avatar src={item.album.artist.img1v1Url} size={"large"}/>
                            <span style={{fontFamily: "text", width: "40%", marginLeft: "4vw",fontSize:"16px"}}>{item.name}</span>
                            <span style={{width:"20%",overflow:"hidden",maxHeight:"5vw"}}>
                                {item.ar && item.ar.map((item,index)=>{
                                    return (
                                        <Typography.Text key={index} style={{fontSize:"6px"}}>{item.name+' '}</Typography.Text>
                                    )
                                })}
                            </span>
                            <PlayCircleOutlined style={{color: "red",float:"right",fontSize:"16px"}} onClick={() => {
                                getSongs(item.id)
                            }}/>
                        </Flex>
                    </Link>
                )
            })}
        </div>
    );
};

export default MobileSearch;
