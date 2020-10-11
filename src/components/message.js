import React, {useEffect, useRef, useState} from 'react';
import {useParams} from 'react-router-dom'
import Chatmain from "./chatmain";

const Message = () => {

    const message = useRef([
        {
            type: 'text',
            content: { text: '主人好，我是智能助理，你的贴心小助手~' },
        },
    ]);
    const {id} = useParams();
    const [user,setUser] = useState({});

    const userDetail = async () => {
        const res = await fetch(`http://121.196.180.250:3000/user/detail?uid=${id}`);
        const data = await res.json();
        setUser(data);
    }

    const historyMessage = async () => {
        const res = await fetch(`http://121.196.180.250:3000/msg/private/history?uid=${id}&cookie=${localStorage.neteaseCookie}`,{
            credentials:"include",
            mode:"cors"
        });
        const data = await res.json();
        data.msgs.map((item,index) => {
            const textmsg = JSON.parse(item.msg);
            message.current[index] =  {type:"text",content:{text:textmsg.msg}};
        })
    }

    useEffect(()=>{
        message.current[0].content.text = 'music';
        userDetail();
        historyMessage();
    },[id])


    return (
        <div style={{height:"90vh"}}>
            {console.log(message.current)}
            <div style={{height:"90vh",width:"56vw"}}>
                {user.profile && message.current[0].content.text!=='music'&&
                <Chatmain id={id} user={user} message={message.current}/>}
            </div>
        </div>
    );
};

export default Message;
