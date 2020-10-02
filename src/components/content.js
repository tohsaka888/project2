import React from 'react';
import {Carousel, Col, Layout, Menu, Row, Tabs, Collapse, Avatar, Button, message} from "antd"
import {EnvironmentOutlined, LeftOutlined, RightOutlined, UserOutlined} from "@ant-design/icons"
import {useHistory} from 'react-router-dom'
import "./content.css"
import Toplist from "./toplist";

const Content = ({setSongUrl, toplistSongs2, toplistSongs1, toplistSongs, toplist1, banner, playlist, img, userLike, weekData, loginStatus, setPlay, setComment, artist, artist1, artist2, artist3, cookie}) => {

    const {TabPane} = Tabs;
    const {Item} = Menu;
    const {Content} = Layout;
    const history = useHistory();

    const playlistDetail = async (id) => {
        const res = await fetch(`http://121.196.180.250:3000/playlist/detail?id=${id}`, {
            credentials: "include",
            mode: "cors"
        });
        const data = await res.json();
        setPlay(data.playlist);
        const res1 = await fetch(`http://121.196.180.250:3000/comment/playlist?id=${id}`);
        const data1 = await res1.json();
        setComment(data1);
        history.push(`/playlist/${id}`);
    }

    const sign = async () => {
        const res = await fetch(`http://121.196.180.250:3000/daily_signin?type=1&cookie=${cookie}`,{
            mode : "cors",
        });
        const data = await res.json();
        console.log(data)
        if(data.code === 200) {
            message.success("签到成功，积分+2！");
        }else if (data.code === -2) {
            message.warn("您已经签到过了，明天再来吧~")
        }else if (data.code === 301) {
            message.error("请先登录哦~");
        }
    }

    return (
        <div>
            <div style={{overflow: "hidden",height:"40vh"}}>
                <div style={{width: "15vw", height: "40vh",position:"absolute",top:0,marginTop:"10vh",zIndex:"10"}}>
                    <LeftOutlined style={{fontSize: "51px"}} className="icon"
                                  onClick={() => {
                                      img.current.prev()
                                  }}/>
                </div>
                <Carousel autoplay ref={img} style={{width: "100%"}}>
                    {banner.map((item, index) => {
                        return (
                            <div key={index} style={{position:"relative"}}>
                                <img src={item.imageUrl} alt={index} style={{width:"53vw",top:0,zIndex:"10",position:"absolute",marginLeft:"15vw"}}/>
                                <img src={item.imageUrl} alt={index} style={{width:"100%",position:"relative"}} className={'lunbo'}/>
                            </div>
                        )
                    })}
                </Carousel>
                <div style={{position:"absolute",marginLeft:"68vw",top:0,marginTop:"10vh",borderRight:"2px solid #F9F9F9",borderLeft:"2px solid #F9F9F9",height:"inherit",paddingLeft:"2vw",paddingRight:"2vw",width:"17vw"}}>
                    {loginStatus.code === 200 &&
                    <Avatar src={loginStatus.profile.avatarUrl} style={{marginTop: "50px"}} size={50}/>}
                    {!(loginStatus.code === 200) && <Avatar icon={<UserOutlined/>} style={{marginTop: "50px"}} size={50}/>}
                    <div style={{marginTop: "20px"}}>
                        <span style={{fontSize: "22px", fontFamily: "text", color: "white"}}>欢迎，</span>
                        {loginStatus.code === 200 && <span style={{
                            fontSize: "22px",
                            fontFamily: "text",
                            color: "white"
                        }}>{loginStatus.profile.nickname} !</span>}
                        {!(loginStatus.code === 200) &&
                        <span style={{fontSize: "22px", fontFamily: "text", color: "white"}}>游客账户 !</span>}
                        <div>
                            <Button size={"large"} shape={"round"} type={"primary"} style={{marginTop:"20px",width:"80%",fontWeight:"bolder"}} onClick={()=>{sign()}}>签到</Button>
                        </div>
                    </div>
                </div>
                <div style={{width: "15vw", height: "40vh",position:"absolute",top:0,marginTop:"10vh",zIndex:"10",marginLeft:"85vw"}}>
                    <RightOutlined style={{fontSize: "51px"}} className="icon"
                                  onClick={() => {
                                      img.current.next()
                                  }}/>
                </div>
            </div>
            <Content className="content" style={{background: "white"}}>
                <Menu mode="horizontal" style={{borderBottom: "2px solid #C10D0C"}}>
                    <Item disabled icon={<EnvironmentOutlined style={{color: "#C10D0C"}}/>}><span
                        style={{fontSize: "20px", color: "black"}}>热门推荐</span></Item>
                </Menu>
                <Row style={{marginTop: "20px"}}>
                    {playlist.slice(0, 6).map((item, index) => {
                        return (
                            <Col span={4} key={index}>
                                <img className="playlist" src={item.coverImgUrl} style={{
                                    width: "140px",
                                    height: "140px",
                                    borderRadius: "50%",
                                    boxShadow: "10px 10px 5px #888888"
                                }} alt={index} onClick={() => {
                                    playlistDetail(item.id)
                                }}/>
                                <div className="playlist" style={{
                                    textAlign: "left",
                                    width: "140px",
                                    marginLeft: "20px",
                                    marginTop: "10px"
                                }} onClick={() => {
                                    playlistDetail(item.id)
                                }}>{item.name}</div>
                            </Col>
                        )
                    })}
                </Row>
                <Row>
                    {playlist.slice(6, 12).map((item, index) => {
                        return (
                            <Col span={4} key={index}>
                                <img className="playlist" src={item.coverImgUrl} style={{
                                    width: "140px",
                                    height: "140px",
                                    borderRadius: "50%",
                                    boxShadow: "10px 10px 5px #888888"
                                }} alt={index} onClick={() => {
                                    playlistDetail(item.id)
                                }}/>
                                <div className="playlist" style={{
                                    textAlign: "left",
                                    width: "140px",
                                    marginLeft: "20px",
                                    marginTop: "10px"
                                }} onClick={() => {
                                    playlistDetail(item.id)
                                }}>{item.name}</div>
                            </Col>
                        )

                    })}
                </Row>
                {loginStatus.code === 200 && loginStatus && userLike &&
                <Menu mode="horizontal" style={{borderBottom: "2px solid #C10D0C"}}>
                    <Item disabled icon={<EnvironmentOutlined style={{color: "#C10D0C"}}/>}><span
                        style={{fontSize: "20px", color: "black"}}>为你推荐</span></Item>
                </Menu>}
                {loginStatus.code === 200 && loginStatus && userLike &&
                <Row>
                    {userLike.slice(0, 6).map((item, index) => {
                        return (
                            <Col span={4} key={index} style={{marginTop: "20px"}}>
                                <img className="playlist" src={item.picUrl} style={{
                                    width: "140px",
                                    height: "140px",
                                    borderRadius: "15px",
                                    boxShadow: "10px 10px 5px #888888"
                                }} alt={index} onClick={() => {
                                    playlistDetail(item.id)
                                }}/>
                                <div className="playlist" style={{
                                    textAlign: "left",
                                    width: "140px",
                                    marginLeft: "20px",
                                    marginTop: "10px"
                                }} onClick={() => {
                                    playlistDetail(item.id)
                                }}>{item.name}</div>
                            </Col>
                        )
                    })}
                </Row>
                }
                <Menu mode="horizontal" style={{borderBottom: "2px solid #C10D0C"}}>
                    <Item disabled icon={<EnvironmentOutlined style={{color: "#C10D0C"}}/>}><span
                        style={{fontSize: "20px", color: "black"}}>新碟上架</span></Item>
                </Menu>
                <Tabs tabPosition="bottom" style={{
                    width: "83%",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: "60px"
                }} tabBarStyle={{marginLeft: "auto", marginRight: "auto"}} tabBarGutter={40} animated>
                    <TabPane tab="1" key={1}>
                        <div style={{display: "flex"}}>
                            {weekData.slice(0, 5).map((item, index) => {
                                return (
                                    <div style={{marginLeft: "30px"}} key={index}>
                                        <img className="playlist" src={item.picUrl} style={{
                                            width: "140px",
                                            height: "140px",
                                            borderRadius: "50%",
                                            boxShadow: "10px 10px 5px #888888"
                                        }} alt={index} onClick={() => {
                                            playlistDetail(item.id)
                                        }}/>
                                        <div className="playlist" style={{
                                            marginTop: "20px",
                                            fontFamily: "text",
                                            fontSize: "18px"
                                        }} onClick={() => {
                                            playlistDetail(item.id)
                                        }}>{item.artist.name}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </TabPane>
                    <TabPane tab="2" key={2}>
                        <div style={{display: "flex"}}>
                            {weekData.slice(5, 10).map((item, index) => {
                                return (
                                    <div style={{marginLeft: "30px"}} key={index}>
                                        <img className="playlist" src={item.picUrl} style={{
                                            width: "140px",
                                            height: "140px",
                                            borderRadius: "50%",
                                            boxShadow: "10px 10px 5px #888888"
                                        }} alt={index} onClick={() => {
                                            playlistDetail(item.id)
                                        }}/>
                                        <div className="playlist" style={{
                                            marginTop: "20px",
                                            fontFamily: "text",
                                            fontSize: "18px"
                                        }} onClick={() => {
                                            playlistDetail(item.id)
                                        }}>{item.artist.name}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </TabPane>
                    <TabPane tab="3" key={3}>
                        <div style={{display: "flex"}}>
                            {weekData.slice(10, 15).map((item, index) => {
                                return (
                                    <div style={{marginLeft: "30px"}} key={index}>
                                        <img className="playlist" src={item.picUrl} style={{
                                            width: "140px",
                                            height: "140px",
                                            borderRadius: "50%",
                                            boxShadow: "10px 10px 5px #888888"
                                        }} onClick={() => {
                                            playlistDetail(item.id)
                                        }} alt={index}/>
                                        <div className="playlist" style={{
                                            marginTop: "20px",
                                            fontFamily: "text",
                                            fontSize: "18px"
                                        }} onClick={() => {
                                            playlistDetail(item.id)
                                        }}>{item.artist.name}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </TabPane>
                    <TabPane tab="4" key={4}>
                        <div style={{display: "flex"}}>
                            {weekData.slice(15, 20).map((item, index) => {
                                return (
                                    <div style={{marginLeft: "30px"}} key={index}>
                                        <img className="playlist" src={item.picUrl} style={{
                                            width: "140px",
                                            height: "140px",
                                            borderRadius: "50%",
                                            boxShadow: "10px 10px 5px #888888"
                                        }} alt={index} onClick={() => {
                                            playlistDetail(item.id)
                                        }}/>
                                        <div className="playlist" style={{
                                            marginTop: "20px",
                                            fontFamily: "text",
                                            fontSize: "18px"
                                        }} onClick={() => {
                                            playlistDetail(item.id)
                                        }}>{item.artist.name}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </TabPane>
                    <TabPane tab="5" key={5}>
                        <div style={{display: "flex"}}>
                            {weekData.slice(20, 25).map((item, index) => {
                                return (
                                    <div style={{marginLeft: "30px"}} key={index}>
                                        <img className="playlist" src={item.picUrl} style={{
                                            width: "140px",
                                            height: "140px",
                                            borderRadius: "50%",
                                            boxShadow: "10px 10px 5px #888888"
                                        }} onClick={() => {
                                            playlistDetail(item.id)
                                        }} alt={index}/>
                                        <div className="playlist" style={{
                                            marginTop: "20px",
                                            fontFamily: "text",
                                            fontSize: "18px"
                                        }} onClick={() => {
                                            playlistDetail(item.id)
                                        }}>{item.artist.name}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </TabPane>
                    <TabPane tab="6" key={6}>
                        <div style={{display: "flex"}}>
                            {weekData.slice(25, 30).map((item, index) => {
                                return (
                                    <div style={{marginLeft: "30px"}} key={index}>
                                        <img className="playlist" src={item.picUrl} style={{
                                            width: "140px",
                                            height: "140px",
                                            borderRadius: "50%",
                                            boxShadow: "10px 10px 5px #888888"
                                        }} onClick={() => {
                                            playlistDetail(item.id)
                                        }} alt={index}/>
                                        <div className="playlist" style={{
                                            marginTop: "20px",
                                            fontFamily: "text",
                                            fontSize: "18px"
                                        }} onClick={() => {
                                            playlistDetail(item.id)
                                        }}>{item.artist.name}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </TabPane>
                </Tabs>
                <Menu mode="horizontal" style={{borderBottom: "2px solid #C10D0C"}}>
                    <Item disabled icon={<EnvironmentOutlined style={{color: "#C10D0C"}}/>}><span
                        style={{fontSize: "20px", color: "black"}}>榜单</span></Item>
                </Menu>
                <div style={{height: "20px"}}/>
                <div style={{
                    background: "whitesmoke",
                    marginLeft: "100px",
                    marginRight: "100px",
                    padding: "20px",
                    border: "1px solid #d9d9d9"
                }}>{toplist1 &&
                <Toplist setMusicUrl={setSongUrl} toplist1={toplist1} toplistSongs={toplistSongs}
                         toplistSongs1={toplistSongs1} toplistSongs2={toplistSongs2}/>}</div>
                <div style={{height: "40px"}}/>
                <Menu mode="horizontal" style={{borderBottom: "2px solid #C10D0C"}}>
                    <Item disabled icon={<EnvironmentOutlined style={{color: "#C10D0C"}}/>}><span
                        style={{fontSize: "20px", color: "black"}}>人气歌手</span></Item>
                </Menu>
                <Collapse defaultActiveKey={1} accordion style={{marginTop: "20px", fontFamily: "title"}}>
                    <Collapse.Panel key={1} header="中国最受欢迎歌手列表" style={{fontSize: "20px"}}>
                        {artist.slice(0, 10).map((item, index) => {
                            return (
                                <Row key={index} style={{
                                    display: "flex",
                                    marginBottom: "20px",
                                    borderBottom: "1px solid #DCDCDC"
                                }}>
                                    <Col span={3}><img src={item.img1v1Url}
                                                       alt={item.img1v1Url}
                                                       style={{
                                                           width: "56px",
                                                           height: "56px",
                                                           borderRadius: "50%",
                                                           float: "left",
                                                           display: "block"
                                                       }}/></Col>
                                    <Col span={6}>
                                        <div style={{
                                            float: "left",
                                            marginTop: "10px",
                                            fontSize: "20px",
                                            fontFamily: "text",
                                            marginLeft: "50px"
                                        }}>{item.name}</div>
                                    </Col>
                                    <Col span={8}>
                                        <div style={{
                                            marginLeft: "30px",
                                            marginTop: "10px",
                                            fontSize: "20px",
                                            fontFamily: "title2"
                                        }}>{"Top" + (index + 1)}</div>
                                    </Col>
                                    <Col>
                                        <div style={{
                                            marginLeft: "50px",
                                            marginTop: "10px",
                                            fontSize: "20px",
                                            fontFamily: "title2"
                                        }}>{"人气指数：" + item.score}</div>
                                    </Col>
                                </Row>
                            )
                        })}
                    </Collapse.Panel>
                    <Collapse.Panel key={2} header="欧美最受欢迎歌手列表" style={{fontSize: "20px"}}>
                        {artist1.slice(0, 10).map((item, index) => {
                            return (
                                <Row key={index} style={{
                                    display: "flex",
                                    marginBottom: "20px",
                                    borderBottom: "1px solid #DCDCDC"
                                }}>
                                    <Col span={3}><img src={item.img1v1Url}
                                                       alt={item.img1v1Url}
                                                       style={{
                                                           width: "56px",
                                                           height: "56px",
                                                           borderRadius: "50%",
                                                           float: "left",
                                                           display: "block"
                                                       }}/></Col>
                                    <Col span={6}>
                                        <div style={{
                                            float: "left",
                                            marginTop: "10px",
                                            fontSize: "20px",
                                            fontFamily: "text",
                                            marginLeft: "50px"
                                        }}>{item.name}</div>
                                    </Col>
                                    <Col span={8}>
                                        <div style={{
                                            marginLeft: "30px",
                                            marginTop: "10px",
                                            fontSize: "20px",
                                            fontFamily: "title2"
                                        }}>{"Top" + (index + 1)}</div>
                                    </Col>
                                    <Col>
                                        <div style={{
                                            marginLeft: "50px",
                                            marginTop: "10px",
                                            fontSize: "20px",
                                            fontFamily: "title2"
                                        }}>{"人气指数：" + item.score}</div>
                                    </Col>
                                </Row>
                            )
                        })}
                    </Collapse.Panel>
                    <Collapse.Panel key={3} header="韩国最受欢迎歌手列表" style={{fontSize: "20px"}}>
                        {artist2.slice(0, 10).map((item, index) => {
                            return (
                                <Row key={index} style={{
                                    display: "flex",
                                    marginBottom: "20px",
                                    borderBottom: "1px solid #DCDCDC"
                                }}>
                                    <Col span={3}><img src={item.img1v1Url}
                                                       alt={item.img1v1Url}
                                                       style={{
                                                           width: "56px",
                                                           height: "56px",
                                                           borderRadius: "50%",
                                                           float: "left",
                                                           display: "block"
                                                       }}/></Col>
                                    <Col span={6}>
                                        <div style={{
                                            float: "left",
                                            marginTop: "10px",
                                            fontSize: "20px",
                                            fontFamily: "text",
                                            marginLeft: "50px"
                                        }}>{item.name}</div>
                                    </Col>
                                    <Col span={8}>
                                        <div style={{
                                            marginLeft: "30px",
                                            marginTop: "10px",
                                            fontSize: "20px",
                                            fontFamily: "title2"
                                        }}>{"Top" + (index + 1)}</div>
                                    </Col>
                                    <Col>
                                        <div style={{
                                            marginLeft: "50px",
                                            marginTop: "10px",
                                            fontSize: "20px",
                                            fontFamily: "title2"
                                        }}>{"人气指数：" + item.score}</div>
                                    </Col>
                                </Row>
                            )
                        })}
                    </Collapse.Panel>
                    <Collapse.Panel key={4} header="日本最受欢迎歌手列表" style={{fontSize: "20px"}}>
                        {artist3.slice(0, 10).map((item, index) => {

                            return (
                                <Row key={index} style={{
                                    display: "flex",
                                    marginBottom: "20px",
                                    borderBottom: "1px solid #DCDCDC"
                                }}>
                                    <Col span={3}><img src={item.img1v1Url}
                                                       alt={item.img1v1Url}
                                                       style={{
                                                           width: "56px",
                                                           height: "56px",
                                                           borderRadius: "50%",
                                                           float: "left",
                                                           display: "block"
                                                       }}/></Col>
                                    <Col span={6}>
                                        <div style={{
                                            float: "left",
                                            marginTop: "10px",
                                            fontSize: "20px",
                                            fontFamily: "text",
                                            marginLeft: "50px"
                                        }}>{item.name}</div>
                                    </Col>
                                    <Col span={8}>
                                        <div style={{
                                            marginLeft: "30px",
                                            marginTop: "10px",
                                            fontSize: "20px",
                                            fontFamily: "title2"
                                        }}>{"Top" + (index + 1)}</div>
                                    </Col>
                                    <Col>
                                        <div style={{
                                            marginLeft: "50px",
                                            marginTop: "10px",
                                            fontSize: "20px",
                                            fontFamily: "title2"
                                        }}>{"人气指数：" + item.score}</div>
                                    </Col>
                                </Row>
                            )
                        })}
                    </Collapse.Panel>
                </Collapse>
            </Content>
        </div>
    );
};

export default Content;
