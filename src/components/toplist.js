import React from 'react';
import {Button, Divider, List} from 'antd'
import {PlayCircleOutlined} from '@ant-design/icons'

const Toplist = ({toplist1, toplistSongs, toplistSongs1, toplistSongs2, setMusicUrl}) => {

    const play1 = async (id) => {
        const res = await fetch(`http://121.196.180.250:3000/song/url?id=${id}`);
        const data = await res.json();
        setMusicUrl(data.data[0].url);
    }

    return (
        <div>
            <List split dataSource={toplist1} grid={{gutter: 16, column: 3}} renderItem={(item, index) => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<img src={item.coverImgUrl} alt={item.overImgUrl}
                                     style={{width: "80px", height: "80px"}}/>}
                        title={<span style={{fontSize: "18px", fontFamily: "title2"}}>{item.name}</span>}/>
                    {index === 0 && toplistSongs.map((item, index) => {
                        return (
                            <List.Item key={index} style={{
                                textAlign: "left",
                                fontSize: "16px",
                                fontFamily: "text",
                                marginTop: "10px",
                            }}>
                                <Divider/>
                                {item.name}
                                <Button style={{float: "right"}} icon={<PlayCircleOutlined/>} type="primary"
                                        shape="circle" size='small' onClick={()=>{play1(item.id)}}/>
                            </List.Item>
                        )
                    })}
                    {index === 1 && toplistSongs1.map((item, index) => {
                        return (
                            <List.Item key={index} style={{
                                textAlign: "left",
                                fontSize: "16px",
                                fontFamily: "text",
                                marginTop: "10px",
                            }}>
                                <Divider/>
                                {item.name}
                                <Button style={{float: "right"}} icon={<PlayCircleOutlined/>} type="primary"
                                        shape="circle" size='small' onClick={()=>{play1(item.id)}}/>
                            </List.Item>
                        )
                    })}
                    {index === 2 && toplistSongs2.map((item, index) => {
                        return (
                            <List.Item key={index} style={{
                                textAlign: "left",
                                fontSize: "16px",
                                fontFamily: "text",
                                marginTop: "10px",
                            }}>
                                <Divider/>
                                {item.name}
                                <Button style={{float: "right"}} icon={<PlayCircleOutlined/>} type="primary"
                                        shape="circle" size='small' onClick={()=>{play1(item.id)}}/>
                            </List.Item>
                        )
                    })}
                </List.Item>
            )}/>
        </div>
    );
};

export default Toplist;
