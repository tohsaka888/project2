import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Chatmain from "./chatmain";
import { chatContext } from "./Context";

const Message = () => {
  const [message, setMessage] = useState([]);
  const { id } = useParams();
  const [user, setUser] = useState({});
  const msgRef = useRef(0);
  const userDetail = async () => {
    const res = await fetch(
      `http://139.196.141.233:3000/user/detail?uid=${id}`
    );
    const data = await res.json();
    setUser(data);
    msgRef.current = 0;
  };
  const historyMessage = async () => {
    const res = await fetch(
      `http://139.196.141.233:3000/msg/private/history?uid=${id}&cookie=${localStorage.neteaseCookie}`,
      {
        credentials: "include",
        mode: "cors",
      }
    );
    const data = await res.json();
    if (data.msgs.length === 0) {
      msgRef.current = 1;
    }
    let arr = [];
    data.msgs.map((item, index) => {
      const msg = JSON.parse(item.msg);
      const temp = {
        position: item.fromUser.userId === parseInt(id) ? "left" : "right",
        type: msg.msg === "" ? "image" : "text",
        content: {
          text: msg.msg,
          picUrl: msg.picInfo === undefined ? "" : msg.picInfo.picUrl,
        },
        user: { avatar: item.fromUser.avatarUrl },
        createdAt: item.time,
      };
      arr.push(temp);
    });
    arr.reverse();
    setMessage(arr);
  };

  useEffect(() => {
    setMessage([]);
    userDetail();
    historyMessage();
  }, [id]);

  return (
    <chatContext.Provider value={{ message }}>
      <div style={{ height: "90vh", width: "55vw" }}>
        {user.profile && message.length !== 0 && (
          <Chatmain id={id} user={user} />
        )}
        {user.profile && msgRef.current !== 0 && (
          <Chatmain id={id} user={user} />
        )}
      </div>
    </chatContext.Provider>
  );
};

export default Message;
