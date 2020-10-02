import React, {useEffect, useState} from 'react';
import {NavBar, Icon, TabBar, Carousel, WingBlank,Modal,SearchBar,Flex} from "antd-mobile";
import {HomeOutlined,UserOutlined,MenuOutlined,VerticalAlignTopOutlined,ArrowLeftOutlined} from '@ant-design/icons'
import Mbplaylist from "./components/mbplaylist";
import SongRc from "./components/SongRC";
import {Route,Switch,useHistory} from 'react-router-dom'
import {Affix,Drawer,Typography} from "antd";
import MobilePlaylist from "./components/MobilePlaylist";
import MobileSearch from "./components/MobileSearch";

const Mobile = () => {

    const [banner,setBanner] = useState([]);
    const [musicSrc,setMusicSrc] = useState("");
    const [open,setOpen] = useState(false);
    const [rightOpen,setRightOpen] = useState(false);
    const [hotSearch,setHotSearch] = useState([]);
    const history = useHistory();

    useEffect(()=>{
        const send = async () => {
            const res = await fetch("http://121.196.180.250:3000/banner", {mode: "cors"});
            const data = await res.json();
            setBanner(data.banners);
        }
        const hotSearch = async () => {
            const res = await fetch("http://121.196.180.250:3000/search/hot/detail");
            const data = await res.json();
            setHotSearch(data.data)
        }
        send();
        hotSearch();
    },[])

    const search = (value) => {
        history.push(`/search/${value}`)
    }

    return (
        <div>
            <Switch>
                <Route exact path={'/'}>
                    <div style={{background:"white"}}>
                        <div style={{height:"50px",background:"red"}}>
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
                            <Drawer visible={open} onClose={()=>{setOpen(false)}} placement={"left"}>
                                <SearchBar placeholder="Search" maxLength={8} />
                                <Flex>
                                    <VerticalAlignTopOutlined />
                                </Flex>
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
                        <SongRc setMusicSrc={setMusicSrc} style={{marginBottom:"2vw"}}/>
                        <TabBar unselectedTintColor="#949494"
                                tabBarPosition={"bottom"}
                                tintColor="#33A3F4"
                                barTintColor="white"
                                style={{marginTop:"2vw"}}>
                            <TabBar.Item title={"首页"} icon={<HomeOutlined />}/>
                            <TabBar.Item title={"我的"} icon={<UserOutlined />}/>
                        </TabBar>
                    </div>
                </Route>
                <Route path={'/playlist/:id'}>
                    <MobilePlaylist setMusicSrc={setMusicSrc} />
                </Route>
                <Route path={'/search/:value'}>
                    <MobileSearch setMusicSrc={setMusicSrc}/>
                </Route>
            </Switch>
            <Affix offsetBottom={0}>
                <audio src={musicSrc} autoPlay controls style={{width:"100%"}}/>
            </Affix>
        </div>
    );
};

export default Mobile;
