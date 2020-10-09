import React, {useEffect, useState} from 'react';
import {Avatar, Typography} from "antd";
import {Flex, Tag} from "antd-mobile";
import {ClockCircleOutlined, CustomerServiceOutlined, PaperClipOutlined, UserOutlined,ArrowLeftOutlined} from '@ant-design/icons'
import {Link} from "react-router-dom";

const MobileMy = () => {

    const [user, setUser] = useState({});
    const [playlist, setPlaylist] = useState([]);

    useEffect(() => {
        const userDetail = async () => {
            const res = await fetch(`http://121.196.180.250:3000/login/status?cookie=${localStorage.neteaseCookie}`, {
                mode: "cors",
                credentials: "include"
            });
            const data = await res.json();
            const res1 = await fetch(`http://121.196.180.250:3000/user/detail?uid=${data.profile.userId}`);
            const data1 = await res1.json();
            setUser(data1);
            const res2 = await fetch(`http://121.196.180.250:3000/user/playlist?uid=${data.profile.userId}`, {
                mode: "cors",
                credentials: "include"
            });
            const data2 = await res2.json();
            setPlaylist(data2.playlist)
        }
        userDetail();
    }, [])

    return (
        <div>
            {
                user.profile &&
                <div>
                    <div className={'homepage'}
                         style={{height: "90vw", backgroundImage: `url(${user.profile.backgroundUrl})`, zIndex: "-1"}}/>
                    <div className={'homepageText'} style={{width: "100%"}}>
                        <Link to={'/'}><ArrowLeftOutlined style={{color:"white",top:"0px",fontSize:"25px",marginLeft:"2vw",marginTop:"2vw"}}/></Link>
                        <Flex alignContent={"center"} style={{marginLeft: "8vw"}}>
                            {user.profile && <Avatar src={user.profile.avatarUrl} size={70}/>}
                            {user.profile &&
                            <Typography style={{marginLeft: "2vw"}}>
                                <Typography.Text
                                    style={{
                                        fontSize: "20px",
                                        fontFamily: "text",
                                        color: "whitesmoke"
                                    }}>{user.profile.nickname}</Typography.Text>
                                <div><Tag style={{
                                    borderRadius: "20px",
                                    background: "#CECECE",
                                    color: "white",
                                    fontStyle: "italic"
                                }}>Lv.{+user.level}</Tag></div>
                            </Typography>}
                        </Flex>
                        <Flex style={{marginTop: "5vw", marginLeft: "10vw", marginBottom: "5vw"}}>
                            <ClockCircleOutlined style={{color: "white", fontSize: "45px"}}/>
                            <Typography style={{paddingTop: "2vw", paddingBottom: "2vw", marginLeft: "2vw"}}>
                                <span style={{color: "white", fontSize: "16px"}}>使用天数</span>
                                <div style={{color: "white", fontSize: "16px"}}>{user.createDays}</div>
                            </Typography>
                            <CustomerServiceOutlined style={{color: "white", fontSize: "45px", marginLeft: "12vw"}}/>
                            <Typography style={{paddingTop: "2vw", paddingBottom: "2vw", marginLeft: "2vw"}}>
                                <span style={{color: "white", fontSize: "16px"}}>听过的歌</span>
                                <div style={{color: "white", fontSize: "16px"}}>{user.listenSongs}</div>
                            </Typography>
                        </Flex>
                        <Flex style={{marginTop: "5vw", marginLeft: "10vw", marginBottom: "5vw"}}>
                            <PaperClipOutlined style={{color: "white", fontSize: "45px"}}/>
                            <Typography style={{paddingTop: "2vw", paddingBottom: "2vw", marginLeft: "2vw"}}>
                                <div style={{color: "white", fontSize: "16px"}}>个性签名</div>
                                <Typography.Text style={{color: "white", fontSize: "16px"}}
                                                 ellipsis={{rows: 1}}>{user.profile.signature}</Typography.Text>
                            </Typography>
                            <UserOutlined style={{color: "white", fontSize: "45px", marginLeft: "12vw"}}/>
                            <Typography style={{paddingTop: "2vw", paddingBottom: "2vw", marginLeft: "2vw"}}>
                                <div style={{color: "white", fontSize: "16px"}}>关注的人</div>
                                <Typography.Text style={{color: "white", fontSize: "16px"}}
                                                 ellipsis={{rows: 1}}>{user.profile.follows}</Typography.Text>
                            </Typography>
                        </Flex>
                        <div style={{
                            margin: "0px",
                            borderRadius: "30px",
                            background: "white",
                            position: "absolute",
                            zIndex: "1000"
                        }}>
                            <div style={{height:"5vw"}}/>
                            <span style={{
                                marginTop:"10vw",
                                marginLeft: "5vw",
                                fontSize: "20px",
                                fontWeight: "bold",
                                fontFamily: "text"
                            }}>我的歌单</span>
                            <div>
                                <div style={{height:"5vw"}}/>
                                {playlist && playlist.map((item, index) => {
                                    return (
                                        <Link to={`/playlist/${item.id}`}>
                                            <div key={index} style={{
                                                width: "48%",
                                                display: "inline-flex",
                                                marginBottom: "5vw",
                                                paddingLeft: "5vw",
                                                paddingRight: "5vw",
                                                alignItems: "middle"
                                            }}>
                                                <img style={{width: "18vw", height: "18vw", borderRadius: "5px"}}
                                                     alt={"none"} src={item.coverImgUrl}/>
                                                <Typography style={{marginLeft: "2vw", paddingBottom: "2vw"}}>
                                                    <div strong style={{
                                                        fontSize: "14px",
                                                        fontFamily: "text",
                                                        height: "42px",
                                                        overflow: "hidden"
                                                    }}>{item.name}</div>
                                                    <div>{item.trackCount}首</div>
                                                </Typography>
                                            </div>
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default MobileMy;
