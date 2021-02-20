import React, { useEffect, useContext } from "react";
import Chat, { Bubble, useMessages } from "@chatui/core";
import { chatContext } from "./Context";

const Chatmain = ({ id, user }) => {
  const { message } = useContext(chatContext);
  const { appendMsg, setTyping, messages } = useMessages(message);
  console.log(messages)
  const send = async (content) => {
    const res = await fetch(
      `http://139.196.141.233:3000/send/text?user_ids=${id}&msg=${content}&cookie=${localStorage.neteaseCookie}`,
      {
        credentials: "include",
        mode: "cors",
      }
    );
    const data = await res.json();
  };

  function handleSend(type, val) {
    if (type === "text" && val.trim()) {
      appendMsg({
        type: "text",
        content: { text: val },
        position: "right",
      });

      setTyping(true);

      send(val);
    }
  }

  function renderMessageContent(msg) {
    const { type, content } = msg;

    // 根据消息类型来渲染
    switch (type) {
      case "text":
        return <Bubble content={content.text} />;
      case "image":
        return (
          <Bubble type="image">
            <img src={content.picUrl} alt="" />
          </Bubble>
        );
      default:
        return null;
    }
  }

  return (
    <Chat
      navbar={{ title: user.profile.nickname }}
      messages={messages}
      renderMessageContent={renderMessageContent}
      onSend={handleSend}
    />
  );
};
export default Chatmain;
