import React, {useEffect} from 'react';
import {Button, Col, Empty, Row, Input} from "antd";
import {PlayCircleOutlined} from '@ant-design/icons'
import {Link, useParams} from 'react-router-dom'

const Search = ({songData, setMusicSrc, cookie, setSongData}) => {

    const play = async (id) => {
        const res = await fetch(`http://139.196.141.233:3000/song/url?id=${id}&cookie=${cookie}`);
        const data = await res.json();
        setMusicSrc(data.data[0].url);
    }

    const {Search} = Input;
    const {keywords} = useParams();

    const search = async (value) => {
        const res = await fetch(`http://139.196.141.233:3000/search?keywords=${value}&cookie=${cookie}`);
        const data = await res.json();
        console.log(data)
        setSongData(data.result.songs);
    }

    useEffect(()=>{
        const search = async () => {
            const res = await fetch(`http://139.196.141.233:3000/search?keywords=${keywords}`);
            const data = await res.json();
            setSongData(data.result.songs);
        }
        search();
    },[keywords,setSongData])

    return (
        <div style={{
            marginTop: "20px",
            marginBottom: "20px",
            backgroundColor: "white",
            marginLeft: "15vw",
            marginRight: "15vw"
        }}>
            <div style={{height:"20px",background:"#f0f2f5"}}/>
            <div style={{paddingLeft:"10vw",paddingRight:"10vw",background:"#f0f2f5"}}>
                <Search defaultValue={keywords} enterButton size={"large"} onSearch={value => search(value)}/>
            </div>
            <div style={{height:"40px",background:"#f0f2f5"}}/>
            <Row style={{borderBottom: "2px solid red", fontSize: "20px", fontFamily: "title2", borderRadius: "5px",marginTop:"0px"}}
                 className="row">
                <Col span={1}/>
                <Col span={6}>歌名</Col>
                <Col span={5}>作者</Col>
                <Col span={10}>歌曲信息</Col>
                <Col span={2}>时长</Col>
            </Row>
            {songData.length === 0 && <Empty style={{marginTop: "200px", height: "600px"}}/>}
            {songData.map((item, index) => {
                return (
                    <Row key={index} style={{
                        marginTop: "10px", borderBottom: "2px solid #F9F9F9", float: "left",
                        width: "100%"
                    }}>
                        <Col span={1}><Button icon={<PlayCircleOutlined/>} type="primary" shape="circle" size='small'
                                              onClick={() => {
                                                  play(item.id)
                                              }}/></Col>
                        <Col span={6}><Link to={`/musicdetail/${item.id}`}>{item.name}</Link></Col>
                        <Col span={5}>{item.artists.map((item, index) => {
                            return <span key={index}>{item.name + " "}</span>
                        })}</Col>
                        <Col span={10}>{item.alias.length ? item.alias.map((item = "null", index) => {
                            return <span key={index}>{item}</span>
                        }) : <span>无此歌曲信息</span>}</Col>
                        <Col span={2}>time</Col>
                    </Row>
                )
            })}
        </div>
    );
};

export default Search;
