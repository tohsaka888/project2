import React, {useEffect, useState} from 'react';
import {NavBar, Icon, Carousel, WingBlank,Modal,SearchBar,Flex} from "antd-mobile";
import {MenuOutlined,SolutionOutlined,ArrowLeftOutlined,ExportOutlined,UserOutlined} from '@ant-design/icons'
import Mbplaylist from "./components/mbplaylist";
import SongRc from "./components/SongRC";
import {Link, Route, Switch, useHistory} from 'react-router-dom'
import {Affix, Drawer, Typography, Avatar, Divider} from "antd";
import MobilePlaylist from "./components/MobilePlaylist";
import MobileSearch from "./components/MobileSearch";
import MobileMy from "./components/MobileMy";
import MobileSongDetail from "./components/MobileSongDetail";

const Mobile = () => {

    const [loginStatus,setLoginStatus] = useState({});
    const [banner,setBanner] = useState([]);
    const [musicSrc,setMusicSrc] = useState("");
    const [open,setOpen] = useState(false);
    const [rightOpen,setRightOpen] = useState(false);
    const [hotSearch,setHotSearch] = useState([]);
    const [visible,setVisible] = useState(false)
    const history = useHistory();
    const logout = async () => {
        const res = await fetch(`http://musicapi.leanapp.cn/logout?cookie=${localStorage.neteaseCookie}`,{
            mode:"cors",
            credentials:"include"
        });
        const data = await res.json();
        console.log(data)
        if(data.code === 200) {
            setLoginStatus({code:301});
            localStorage.neteaseCookie = "";
        }
    }

    useEffect(()=>{
        const send = async () => {
            const res = await fetch("http://139.196.141.233:3000/banner", {mode: "cors"});
            const data = await res.json();
            setBanner(data.banners);
        }
        const hotSearch = async () => {
            const res = await fetch("http://139.196.141.233:3000/search/hot/detail");
            const data = await res.json();
            setHotSearch(data.data)
        }
        const isLogin = async () => {
            const res = await fetch(`http://139.196.141.233:3000/login/status?cookie=${localStorage.neteaseCookie}`,{
                mode:"cors",
                credentials:"include"
            });
            const data = await res.json();
            console.log(data);
            setLoginStatus(data)
        }
        send();
        hotSearch();
        isLogin();
    },[localStorage.neteaseCookie])

    const search = (value) => {
        history.push(`/search/${value}`)
    }

    return (
        <div>
            <Switch>
                <Route exact path={'/'}>
                    <div style={{background:"white"}}>
                        <div style={{height:"50px",background:"red"}}>
                            <Affix offsetTop={0}>
                                <NavBar
                                    mode="dark"
                                    style={{background:"red",fontFamily:"title"}}
                                    leftContent={[
                                        <MenuOutlined key={"0"}/>
                                    ]}
                                    rightContent={[
                                        <Icon key="1" type="search" style={{ marginRight: '16px' }} size={"sm"} onClick={()=>{setRightOpen(true)}}/>,
                                    ]}
                                    onLeftClick={()=>{setOpen(true)}}
                                >网易云音乐</NavBar>
                            </Affix>
                            <Drawer visible={open} onClose={()=>{setOpen(false)}} placement={"left"}>
                                {loginStatus.code === 301 &&
                                    <div style={{marginTop:"24px"}}>
                                        <Flex justify={"center"}>
                                            <Avatar alt={'none'} size={80}/>
                                        </Flex>
                                        <Flex justify={"center"}>
                                            <span style={{fontFamily:"text",fontSize:"30px"}}>游客账户</span>
                                        </Flex>
                                    </div>
                                }
                                {loginStatus.code === 200 &&
                                <div style={{marginTop:"24px"}}>
                                    <Flex justify={"center"}>
                                        <Avatar alt={'none'} size={80} src={loginStatus.profile.avatarUrl}/>
                                    </Flex>
                                    <Flex justify={"center"}>
                                        <span style={{fontFamily:"text",fontSize:"30px"}}>{loginStatus.profile.nickname}</span>
                                    </Flex>
                                </div>
                                }
                                <div style={{height:"100%",background:"whitesmoke",borderRadius:"30px",width:"100%",padding:"10vw"}}>
                                    {loginStatus.code === 200 &&
                                    <Link to={'/my'}>
                                        <Flex>
                                            <SolutionOutlined style={{fontSize:"30px"}}/>
                                            <span style={{marginLeft:"15vw",fontSize:"20px",fontFamily:"text"}}>我的歌单</span>
                                        </Flex>
                                    </Link>}
                                    {loginStatus.code === 301 &&
                                    <Link to={'/'}>
                                        <Flex>
                                            <SolutionOutlined style={{fontSize:"30px"}}/>
                                            <span style={{marginLeft:"15vw",fontSize:"20px",fontFamily:"text"}}>我的歌单(请先登录)</span>
                                        </Flex>
                                    </Link>}
                                    <Divider/>
                                    <Link to={'/'}>
                                        <Flex onClick={()=>{setVisible(true)}}>
                                            <UserOutlined style={{fontSize:"30px"}}/>
                                            <span style={{marginLeft:"15vw",fontSize:"20px",fontFamily:"text"}}>登录</span>
                                        </Flex>
                                    </Link>
                                    <Divider />
                                    <Link to={'/'}>
                                        <Flex onClick={()=>{logout()}}>
                                            <ExportOutlined style={{fontSize:"30px"}}/>
                                            <span style={{marginLeft:"15vw",fontSize:"20px",fontFamily:"text"}}>退出登录</span>
                                        </Flex>
                                    </Link>
                                </div>
                            </Drawer>
                            <Modal visible={rightOpen}>
                                <Flex>
                                    <div style={{height:"44px",background:"red",alignItems:"middle"}}>
                                        <ArrowLeftOutlined style={{background:"red",marginTop:"12px",fontSize:"18px",marginLeft:"2vw",color:"white"}}
                                                           onClick={()=>{setRightOpen(false)}}/>
                                    </div>
                                    <SearchBar style={{width:"100%",background:"red",color:"white"}} placeholder={"Search"} onSubmit={(value)=>{search(value)}} />
                                </Flex>
                                {hotSearch && hotSearch.map((item,index)=>{
                                    return (
                                        <Typography key={index} style={{marginLeft:"5vw",borderBottom:"1px solid #CECECE"}}>
                                            <div>
                                                <Typography.Text style={{fontFamily:"title",textAlign:"left",marginTop:"2vw",fontSize:"15px",fontWeight:"bold",width:"100%"}}>
                                                    <div>{index+1+" "}{item.searchWord}</div>
                                                </Typography.Text>
                                            </div>
                                            <Typography.Paragraph style={{fontFamily:"text",textAlign:"left",fontSize:"6px",width:"100%"}}>
                                                {item.content}
                                                <Typography.Text style={{float:"right",marginRight:"5vw"}}>{item.score}</Typography.Text>
                                            </Typography.Paragraph>
                                        </Typography>
                                    )
                                })}
                            </Modal>
                            <div style={{height:"20vw",background:"red"}} />
                        </div>
                        <div style={{height:"fit-content"}}>
                            <WingBlank style={{height:"fit-content"}}>
                                <Carousel autoplay infinite style={{height:"fit-content"}}>
                                    {banner.map((item, index) => {
                                        return (
                                            <div key={index}>
                                                <img src={item.imageUrl} alt={index} style={{borderRadius:"10px",width:"100%",height:"100%",}}/>
                                            </div>
                                        )
                                    })}
                                </Carousel>
                            </WingBlank>
                        </div>
                        <Mbplaylist />
                        <SongRc setMusicSrc={setMusicSrc} visible={visible} setVisible={setVisible} style={{marginBottom:"2vw"}}/>
                    </div>
                </Route>
                <Route path={'/playlist/:id'}>
                    <MobilePlaylist setMusicSrc={setMusicSrc} />
                </Route>
                <Route path={'/search/:value'}>
                    <MobileSearch setMusicSrc={setMusicSrc}/>
                </Route>
                <Route path={'/my'}>
                    <MobileMy />
                </Route>
                <Route path={'/song/:id'}>
                    <MobileSongDetail setMusicSrc={setMusicSrc}/>
                </Route>
            </Switch>
            <Affix offsetBottom={0}>
                <audio src={musicSrc} autoPlay controls style={{width:"100%"}} id={'audio'}/>
            </Affix>
        </div>
    );
};

export default Mobile;
