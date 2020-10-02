import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom'
import {ArrowLeftOutlined,PlayCircleOutlined} from '@ant-design/icons'
import {Avatar, Typography} from 'antd'
import {Flex} from "antd-mobile";

const MobilePlaylist = ({setMusicSrc}) => {

    const {id} = useParams();
    const [playlist,setPlaylist] = useState({})

    const getSongs = async (id) => {
        const res = await fetch(`http://121.196.180.250:3000/song/url?id=${id}`);
        const data = await res.json();
        setMusicSrc(data.data[0].url);
    }

    useEffect(()=>{
        const playlistDetail = async () => {
            const res = await fetch(`http://121.196.180.250:3000/playlist/detail?id=${id}`,{
                mode:"cors",
                credentials:"include"
            });
            const data = await res.json();
            setPlaylist(data.playlist);
        }
        playlistDetail();
    },[])

    return (
        <div>
            <div style={{height:"60vw",backgroundImage:`url(${playlist.coverImgUrl})`}} className={'mbplaylist'}/>
            <div style={{zIndex:1,position:"absolute",top:"0px"}}>
                <Link to={'/'}><ArrowLeftOutlined style={{fontSize:"20px",color:"white"}}/></Link>
                <span style={{fontSize:"20px",marginLeft:"5vw",fontFamily:"title",color:"white"}}>歌单</span>
                <div style={{display:"flex",marginTop:"5vw",marginLeft:"5vw"}}>
                    <img src={playlist.coverImgUrl} style={{width:"35vw",height:"35vw",borderRadius:"2px"}}/>
                    <Typography style={{marginLeft:"5vw"}}>
                        <Typography.Paragraph style={{color:"white",fontFamily:"title",fontSize:"18px"}}>
                            {playlist.name}
                        </Typography.Paragraph>
                        <Typography.Paragraph>
                            {playlist.creator && <Avatar src={playlist.creator.avatarUrl}/>}
                            {playlist.creator && <span style={{fontFamily:"text",color:"white",marginLeft:"2vw"}}>{playlist.creator.nickname}</span>}
                        </Typography.Paragraph>
                    </Typography>
                </div>
            </div>
            <div style={{borderRadius:"30px",background:"white",paddingTop:"5vw",width:"100%"}}>
                {playlist.tracks && playlist.tracks.map((item,index)=>{
                    return (
                        <Flex key={index} justify={"center"} alignContent={"center"}
                              style={{border: "1px solid #F9F9F9", marginTop: "2vh"}}>
                            <Avatar src={item.al.picUrl} size={"large"}/>
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
                    )
                })}
            </div>
        </div>
    );
};

export default MobilePlaylist;
