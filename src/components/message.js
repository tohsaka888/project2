import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Chatmain from "./chatmain";

const Message = () => {
  const message = useRef([]);
  const { id } = useParams();
  const [user, setUser] = useState({});
  const userDetail = async () => {
    const res = await fetch(
      `http://139.196.141.233:3000/user/detail?uid=${id}`
    );
    const data = await res.json();
    setUser(data);
  };
  const historyMessage = async () => {
    message.current = [];
    const res = await fetch(
      `http://139.196.141.233:3000/msg/private/history?uid=${id}&cookie=${localStorage.neteaseCookie}`,
      {
        credentials: "include",
        mode: "cors",
      }
    );
    const data = await res.json();
    data.msgs.map((item, index) => {
      const msg = JSON.parse(item.msg).msg;
      const temp = {
        position: "right",
        type: "text",
        content: { text: msg },
        //   user: { avatar: '//gw.alicdn.com/tfs/TB1DYHLwMHqK1RjSZFEXXcGMXXa-56-62.svg' },
      };
      message.current.push(temp);
    });
  };

  useEffect(() => {
    userDetail();
    historyMessage();
  }, [id]);

  return (
    <div style={{ height: "90vh", width: "55vw" }}>
      {user.profile && message.current.length !== 0 && (
        <Chatmain id={id} user={user} message={message.current} />
      )}
    </div>
  );
};

export default Message;
