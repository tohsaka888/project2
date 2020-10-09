import React, {useEffect, useState} from 'react';
import {Button, Flex, InputItem, Modal} from "antd-mobile";
import {Avatar, Typography} from "antd";
import {PlayCircleOutlined,WarningOutlined} from '@ant-design/icons'

const SongRc = ({setMusicSrc,visible,setVisible}) => {

    const [phone,setPhone] = useState("");
    const [password,setPassword] = useState("");
    const [cookie, setCookie] = useState(localStorage.neteaseCookie);
    const [recommend, setRecommend] = useState([]);

    useEffect(() => {
        const recommend = async () => {
            const res = await fetch(`http://121.196.180.250:3000/recommend/songs?cookie=${localStorage.neteaseCookie}`, {
                mode: "cors",
                credentials: "include"
            });
            const data = await res.json();
            if (data.code === 200) {
                setRecommend(data.data.dailySongs);
            }
        }
        recommend();
    }, [cookie])

    const getSongs = async (id) => {
        const res = await fetch(`http://121.196.180.250:3000/song/url?id=${id}`);
        const data = await res.json();
        setMusicSrc(data.data[0].url);
    }

    const login = async () => {
        setVisible(false)
        const res = await fetch(`http://121.196.180.250:3000/login/cellphone?phone=${phone}&password=${password}`, {
            method: "POST",
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify({"phone": phone, "password": password}),
            mode: "cors",
            credentials: "include"
        });
        const data = await res.json();
        setCookie(data.cookie);
        localStorage.neteaseCookie = data.cookie;
    }

    return (
        <div>
            <p style={{fontFamily: "title", fontSize: "18px", marginTop: "10px"}}>歌曲推荐</p>
            {recommend.length !== 0 && recommend.slice(0, 10).map((item, index) => {
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
            {recommend.length === 0 &&
            <div>
                <div style={{
                    width: "100%",
                    textAlign: "center",
                    fontSize: "25px",
                    fontFamily: "title2",
                    border:"1px solid #CECECE",
                    borderRadius:"20px",
                    paddingTop:"10vh",
                    paddingBottom:"10vh",
                }} onClick={() => {setVisible(true)}}>
                    <WarningOutlined style={{color:"red",marginRight:"5vw"}}/>请先登录~
                </div>
                <Modal visible={visible} closable onClose={()=>{setVisible(false)}}>
                    <h1 style={{fontFamily:"title"}}>登录</h1>
                    <div style={{border:"1px solid #F9F9F9",borderRadius:"10px"}}>
                        <InputItem type={"number"} onChange={(value)=>{setPhone(value)}}>手机号：</InputItem>
                        <InputItem type={"password"} onChange={(value => setPassword(value))}>密码：</InputItem>
                    </div>
                    <Button type={"primary"} style={{marginTop:"2vh",borderRadius:"20px"}} onClick={()=>{login()}}>登录</Button>
                </Modal>
            </div>
            }
        </div>
    );
};

export default SongRc;
