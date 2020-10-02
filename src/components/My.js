import React, {useEffect} from 'react';
import {Layout, Menu} from 'antd'
import {Route, Switch, useHistory, useParams, useLocation} from "react-router-dom"
import PlayList from "./playlist";

const My = ({mymusic, comment, setMusicUrl, setComment, setMymusic, cookie}) => {

    const {id} = useParams();
    const {Sider, Content} = Layout;
    const {SubMenu, Item} = Menu;
    const history = useHistory();
    const loc = useLocation();

    useEffect(() => {
        const myList = async () => {
            const res1 = await fetch(`http://121.196.180.250:3000/comment/playlist?id=${id}`);
            const data1 = await res1.json();
            setComment(data1);
        }
        const Mymusic = async () => {
            const res = await fetch(`http://121.196.180.250:3000/login/status?cookie=${cookie}`, {
                credentials: "include",
                mode: "cors"
            });
            const data = await res.json();
            const res1 = await fetch(`http://121.196.180.250:3000/user/playlist?uid=${data.profile.userId}&cookie=${cookie}`);
            const data1 = await res1.json();
            setMymusic(data1);
        }
        Mymusic();
        myList();
    },[id,cookie,setMymusic,setComment])

    return (
        <Layout style={{marginLeft: "15vw", marginRight: "15vw", background: "white"}}>
            <Sider theme={"light"}
                   style={{overflow: "auto", position: "fixed", height: "100%", zIndex: "100", marginTop: "20px"}}>
                <Menu style={{height: "100%"}} mode={"inline"} onSelect={({key}) => {
                    history.push(`/mymusic/${key}`);
                }} defaultSelectedKeys={[loc.pathname.split('/')[2]]} defaultOpenKeys={['0']} >
                    <SubMenu title={"创建的歌单"} style={{fontSize: "18px", fontFamily: "text"}} key={0}>
                        {mymusic.playlist && mymusic.playlist.map((item) => {
                            return (
                                <Item key={item.id} style={{fontFamily: "微软雅黑"}}>{item.name}</Item>
                            )
                        })}
                    </SubMenu>
                </Menu>
            </Sider>
            <Content style={{width: "70%", paddingLeft: "13vw", background: "white", height: "100%"}}>
                <Switch>
                    <Route path="/mymusic/:id">
                        <PlayList comment={comment} setMusicUrl={setMusicUrl}
                                  myCookie={cookie} setComment={setComment} myId={id}/>
                    </Route>
                </Switch>
            </Content>
        </Layout>
    );
};

export default My;
