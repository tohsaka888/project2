import React from 'react';
import Chat, {Bubble, useMessages} from "@chatui/core";

const Chatmain = ({message,id,user}) => {

    const { appendMsg, setTyping,messages } = useMessages(message);

    const send = async (content) => {
        const res = await fetch(`http://121.196.180.250:3000/send/text?user_ids=${id}&msg=${content}&cookie=${localStorage.neteaseCookie}`,{
            credentials:"include",
            mode:"cors"
        });
        const data = await res.json();
        console.log(data)
    }

    function handleSend(type, val) {
        if (type === 'text' && val.trim()) {
            appendMsg({
                type: 'text',
                content: { text: val },
                position: 'right',
            });

            setTyping(true);

            send(val);

            setTimeout(() => {
                appendMsg({
                    type: 'text',
                    content: { text: '我现在不在线，一会儿联系您~' },
                });
            }, 1000);
        }
    }

    function renderMessageContent(msg) {
        const { content } = msg;
        return <Bubble content={content.text} />;
    }

    return (
        <div>
            <Chat
                navbar={{ title: user.profile.nickname }}
                messages={messages}
                renderMessageContent={renderMessageContent}
                onSend={handleSend}/>}
        </div>
    );
};

export default Chatmain;
