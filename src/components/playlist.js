import React, {useContext, useEffect, useState} from 'react';
import {Avatar, Button, Col, Empty, Row, Typography, Tag, Comment, Menu, Spin, Input} from "antd";
import {PlayCircleOutlined, EnvironmentOutlined, DislikeOutlined, LikeOutlined} from '@ant-design/icons'
import {useTrail, animated} from "react-spring";
import {useParams, Link} from 'react-router-dom'
import {playContext} from "./Context";

const PlayList = ({setMusicUrl, comment, margin, myId = null, myCookie = null}) => {

    const [loginStatus, setLoginStatus] = useState({code: 0});
    const [play, setPlay] = useState({tracks: []})
    const {id, cookie} = useParams();
    const playlist = useContext(playContext);
    const [newComment, setNewComment] = useState({comment: null});
    const [contentText, setContentText] = useState("");
    const {TextArea} = Input;
    const trailAnimes = useTrail(play.tracks.length, {
        transform: "translate3d(0vw, 0px, 0px)",
        from: {transform: "translate3d(-10vw, 0px, 0px)"},
        config: {
            mass: 0.8,
            tension: 280,
            friction: 20,
        },
        delay: 200,
    });

    const play1 = async (id) => {
        const res = await fetch(`http://121.196.180.250:3000/song/url?id=${id}`);
        const data = await res.json();
        setMusicUrl(data.data[0].url);
    }

    const sendComment = async () => {
        const res = await fetch(`http://121.196.180.250:3000/comment?t=1&type=2&id=${play.id}&content=${contentText}&cookie=${cookie ? cookie : myCookie}`);
        const data = await res.json();
        setNewComment(data);
    }

    useEffect(() => {
        playlist(id ? id : myId, cookie ? cookie : myCookie).then(value => {
            setPlay(value.playlist)
        })
        const login = async () => {
            const res = await fetch(`http://121.196.180.250:3000/login/status?cookie=${cookie ? cookie : myCookie}`, {
                credentials: "include",
                mode: "cors"
            });
            const data = await res.json();
            setLoginStatus(data)
        }
        login();
    }, [myId, myCookie, cookie, id, playlist])

    return (
        <div style={{
            marginTop: "20px",
            marginBottom: "20px",
            backgroundColor: "white",
            marginLeft: margin,
            marginRight: margin,
            padding: "20px",
            height: "100%"
        }}>
            <div style={{float: "left", width: "100%", display: "flex"}}>
                {play.tracks.length === 0 && <Spin/>}
                {play.tracks.length !== 0 && <img src={play.coverImgUrl} alt="null"
                                                  style={{
                                                      width: "208px",
                                                      height: "208px",
                                                      border: "2px solid red",
                                                      float: "left"
                                                  }}/>}
                <Typography style={{float: "left", marginLeft: "20px"}}>
                    <Typography.Title level={3} style={{fontFamily: "title", float: "left"}}>
                        {play.name}
                    </Typography.Title>
                    <div style={{float: "left", width: "100%"}}>
                        {play.tracks.length === 0 && <Spin/>}
                        {play.tracks.length !== 0 && <Avatar src={play.creator.avatarUrl}
                                                             style={{float: "left"}}/>}
                        {play.tracks.length === 0 && <Spin/>}
                        {play.tracks.length !== 0 && <Typography.Text
                            style={{
                                float: "left",
                                marginTop: "5px",
                                marginLeft: "10px"
                            }}>{play.creator.nickname}<span style={{marginLeft: "10px"}}>创建</span></Typography.Text>}
                    </div>
                    <div style={{float: "left", width: "100%", marginTop: "10px"}}>
                        {play.tracks.length === 0 && <Spin/>}
                        {play.tracks.length !== 0 && play.tags.map((item, index) => {
                            return (
                                <Tag color="#f50" key={index} style={{float: "left"}}>{item}</Tag>
                            )
                        })}
                    </div>
                    <Typography.Paragraph ellipsis={{rows: 4, expandable: true, symbol: 'more'}}
                                          style={{
                                              float: "left",
                                              textAlign: "left",
                                              marginTop: "10px",
                                          }}>
                        {play.description}
                    </Typography.Paragraph>
                </Typography>
            </div>
            <Row style={{
                borderBottom: "2px solid red",
                fontSize: "20px",
                fontFamily: "text",
                borderRadius: "5px",
            }} className="row">
                <Col span={1}/>
                <Col span={6}>歌名</Col>
                <Col span={5}>作者</Col>
                <Col span={10}>歌曲信息</Col>
                <Col span={2}>时长</Col>
            </Row>
            {play.tracks.length === 0 && <Empty style={{marginTop: "400px", height: "600px"}}/>}
            {play.tracks.length !== 0 && play.tracks.map((item, index) => {
                return (
                    <animated.div key={index} style={trailAnimes[index]}>
                        <Row key={index} style={{
                            marginTop: "10px", borderBottom: "2px solid #F9F9F9", float: "left",
                            width: "100%"
                        }} className="songs">
                            <Col span={1}><Button icon={<PlayCircleOutlined/>} type="primary" shape="circle"
                                                  size='small'
                                                  onClick={() => {
                                                      play1(item.id)
                                                  }}/></Col>
                            <Col span={6}><Link to={`/musicdetail/${item.id}`}>{item.name}</Link></Col>
                            <Col span={5}>{item.ar.map((item, index) => {
                                return <span key={index}>{item.name + " "}</span>
                            })}</Col>
                            <Col span={10}>{item.alia.length ? item.alia.map((item, index) => {
                                return <span key={index}>{item}</span>
                            }) : <span>无此歌曲信息</span>}</Col>
                            <Col span={2}>time</Col>
                        </Row>
                    </animated.div>
                )
            })}
            <Menu mode="horizontal"
                  style={{borderBottom: "2px solid #C10D0C", float: "left", width: "100%", marginTop: "30px"}}>
                <Menu.Item disabled icon={<EnvironmentOutlined style={{color: "#C10D0C"}}/>}><span
                    style={{fontSize: "20px", color: "black", marginTop: "20px"}}>评论</span></Menu.Item>
            </Menu>
            <Comment style={{width: "100%", float: "left"}}
                     content={
                         <div>
                             <TextArea style={{
                                 marginTop: "20px",
                                 width: "100%",
                                 height: "80px",
                                 border: "1px solid #DCDCDC",
                                 borderRadius: "5px"
                             }} onChange={(event) => {
                                 setContentText(event.target.value)
                             }}/>
                             <Button htmlType="submit" type="primary" style={{float: "right", marginTop: "10px"}}
                                     onClick={sendComment}>
                                 发表评论
                             </Button>
                         </div>
                     }
                     avatar={
                         loginStatus.code === 200 && <Avatar
                             src={loginStatus.profile.avatarUrl}
                             alt="avatar"
                         />
                     }
            />
            {comment.hotComments && comment.hotComments.length !== 0 &&
            <Menu mode="horizontal" style={{borderBottom: "2px solid #C10D0C", float: "left", width: "100%"}}>
                <Menu.Item disabled icon={<EnvironmentOutlined style={{color: "#C10D0C"}}/>}><span
                    style={{fontSize: "20px", color: "black", marginTop: "20px"}}>最热评论</span></Menu.Item>
            </Menu>}
            {comment.hotComments && comment.hotComments.length !== 0 && comment.hotComments.map((item, index) => {
                return <Comment content={item.content} author={item.user.nickname}
                                datetime={new Date(item.time).toLocaleString()}
                                avatar={<Avatar src={item.user.avatarUrl} style={{width: "36px", height: "36px"}}/>}
                                key={index} style={{
                    float: "left",
                    width: "100%",
                    textAlign: "left",
                    borderBottom: "1px solid #DCDCDC",
                }}>
                    <div style={{marginBottom: "10px", marginLeft: "5px", marginTop: "0px", top: "-10px"}}>
                        <LikeOutlined/>
                        <span>{item.likedCount}</span>
                        <DislikeOutlined style={{marginLeft: "20px"}}/>
                        <span style={{marginLeft: "20px"}}>回复</span>
                    </div>
                    {item.beReplied.map((item, index) => {
                        return (
                            <Comment content={item.content} author={item.user.nickname}
                                     avatar={<Avatar src={item.user.avatarUrl}
                                                     style={{width: "36px", height: "36px"}}/>}
                                     key={index} style={{
                                float: "left",
                                width: "100%",
                                textAlign: "left",
                                background: "rgb(243,243,243)",
                                borderRadius: "10px",
                                marginBottom: "10px",
                                paddingLeft: "10px"
                            }}/>
                        )
                    })}
                </Comment>
            })
            }
            {comment.comments && comment.comments.length !== 0 &&
            <Menu mode="horizontal" style={{borderBottom: "2px solid #C10D0C", float: "left", width: "100%"}}>
                <Menu.Item disabled icon={<EnvironmentOutlined style={{color: "#C10D0C"}}/>}><span
                    style={{fontSize: "20px", color: "black", marginTop: "20px"}}>最新评论</span></Menu.Item>
            </Menu>}
            {newComment.comment &&
            <Comment content={newComment.comment.content} author={newComment.comment.user.nickname}
                     datetime={new Date(newComment.comment.time).toLocaleString()}
                     avatar={<Avatar src={newComment.comment.user.avatarUrl} style={{width: "36px", height: "36px"}}/>}
                     style={{
                         float: "left",
                         width: "100%",
                         textAlign: "left",
                         borderBottom: "1px solid #DCDCDC",
                     }}>
                <div style={{marginBottom: "10px", marginLeft: "5px", marginTop: "0px", top: "-10px"}}>
                    <LikeOutlined/>
                    <DislikeOutlined style={{marginLeft: "20px"}}/>
                    <span style={{marginLeft: "20px"}}>回复</span>
                </div>
            </Comment>}
            {comment.comments && comment.comments.map((item, index) => {
                return <Comment content={item.content} author={item.user.nickname}
                                datetime={new Date(item.time).toLocaleString()}
                                avatar={<Avatar src={item.user.avatarUrl} style={{width: "36px", height: "36px"}}/>}
                                key={index} style={{
                    float: "left",
                    width: "100%",
                    textAlign: "left",
                    borderBottom: "1px solid #DCDCDC",
                }}>
                    <div style={{marginBottom: "10px", marginLeft: "5px", marginTop: "0px", top: "-10px"}}>
                        <LikeOutlined/>
                        <span>{item.likedCount}</span>
                        <DislikeOutlined style={{marginLeft: "20px"}}/>
                        <span style={{marginLeft: "20px"}}>回复</span>
                    </div>
                    {item.beReplied.map((item, index) => {
                        return (
                            <Comment content={item.content} author={item.user.nickname}
                                     avatar={<Avatar src={item.user.avatarUrl}
                                                     style={{width: "36px", height: "36px"}}/>}
                                     key={index} style={{
                                float: "left",
                                width: "100%",
                                textAlign: "left",
                                background: "rgb(243,243,243)",
                                borderRadius: "10px",
                                marginBottom: "10px",
                                paddingLeft: "10px",
                                border: "1px solid #CECECE"
                            }}/>
                        )
                    })}
                </Comment>
            })}
        </div>
    );
};

export default PlayList;
