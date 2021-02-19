import React, { useEffect, useState, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import Content from "./content";
import { Layout, Typography, Button, Menu, Avatar, Comment, Input } from "antd";
import {
  PlayCircleOutlined,
  EnvironmentOutlined,
  LikeOutlined,
  DislikeOutlined,
} from "@ant-design/icons";
import lrcParser from "lrc-parser";
import { indexContext } from "./Context";

const MusicDetail = ({ setMusicUrl, loginStatus, cookie }) => {
  const [comment, setComment] = useState({});
  const [newComment, setNewComment] = useState({ comment: null });
  const [contentText, setContentText] = useState("");
  const { TextArea } = Input;
  const color = useRef(null);
  const { Content } = Layout;
  const { id } = useParams();
  const [songs, setSongs] = useState({});
  const [imgUrl, setImgurl] = useState("");
  const [text, setText] = useState([]);
  const change = useContext(indexContext);

  useEffect(() => {
    const audio = document.getElementById("audio");
    audio.addEventListener("timeupdate", function () {
      change.setState(audio.currentTime);
    });

    const musicComment = async () => {
      const res = await fetch(
        `http://139.196.141.233:3000/comment/music?id=${id}`,
        {
          mode: "cors",
        }
      );
      const data = await res.json();
      setComment(data);
    };

    const detail = async () => {
      const res = await fetch(
        `http://139.196.141.233:3000/song/detail?ids=${id}`,
        {
          mode: "cors",
        }
      );
      const data = await res.json();
      setSongs(data.songs[0]);
      setImgurl(data.songs[0].al.picUrl);
    };
    const lyric = async () => {
      const res = await fetch(`http://139.196.141.233:3000/lyric?id=${id}`, {
        mode: "cors",
      });
      const data = await res.json();
      if (data.lrc) {
        let lrc = lrcParser(data.lrc.lyric);
        setText(lrc.scripts);
      } else {
        setText(["这首歌目前没有歌词哦"]);
      }
    };
    detail();
    lyric();
    musicComment();
  }, [id]);

  const play1 = async () => {
    const res = await fetch(`http://139.196.141.233:3000/song/url?id=${id}`, {
      mode: "cors",
    });
    const data = await res.json();
    setMusicUrl(data.data[0].url);
  };

  const sendComment = async () => {
    const res = await fetch(
      `http://139.196.141.233:3000/comment/music?t=1&type=0&id=${id}&content=${contentText}&cookie=${cookie}`,
      {
        mode: "cors",
      }
    );
    const data = await res.json();
    setNewComment(data);
  };

  const { Title, Paragraph } = Typography;

  return (
    <Content
      style={{ marginLeft: "15vw", marginRight: "15vw", background: "white" }}
    >
      <div
        style={{
          float: "left",
          display: "flex",
          marginTop: "87px",
          marginLeft: "30px",
        }}
      >
        <img
          src={imgUrl}
          style={{
            width: "170px",
            height: "170px",
            borderRadius: "50%",
            border: "5px solid",
            padding: "5px",
          }}
          alt={id}
        />
        <Typography style={{ marginLeft: "50px" }}>
          <Title
            level={1}
            style={{ fontFamily: "title", float: "left", textAlign: "left" }}
          >
            {songs.name}
          </Title>
          {songs.ar && (
            <div>
              {songs.ar.map((item, index) => {
                return (
                  <div
                    key={index}
                    style={{ float: "left", fontFamily: "text", width: "100%" }}
                  >
                    <span style={{ float: "left", fontSize: "18px" }}>
                      歌手:{item.name}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
          <Button
            type={"primary"}
            shape={"round"}
            style={{ float: "left", marginTop: "30px" }}
            onClick={() => {
              play1();
            }}
          >
            <PlayCircleOutlined />
            播放
          </Button>
          <Paragraph
            style={{ float: "left", marginTop: "30px" }}
            ellipsis={{ expandable: true, rows: 30 }}
          >
            {text.map((item, index) => {
              if (change.state >= item.start && change.state <= item.end) {
                return (
                  <Paragraph
                    key={index}
                    style={{ float: "left", width: "26.3vw" }}
                  >
                    <span
                      style={{
                        float: "left",
                        color: "red",
                        fontWeight: "bolder",
                      }}
                      ref={color}
                    >
                      {item.text}
                    </span>
                  </Paragraph>
                );
              } else {
                return (
                  <Paragraph
                    key={index}
                    style={{ float: "left", width: "26.3vw" }}
                  >
                    <span style={{ float: "left" }} ref={color}>
                      {item.text}
                    </span>
                  </Paragraph>
                );
              }
            })}
          </Paragraph>
        </Typography>
      </div>
      <Menu
        mode="horizontal"
        style={{
          borderBottom: "2px solid #C10D0C",
          float: "left",
          width: "100%",
          marginTop: "30px",
        }}
      >
        <Menu.Item
          disabled
          icon={<EnvironmentOutlined style={{ color: "#C10D0C" }} />}
        >
          <span style={{ fontSize: "20px", color: "black", marginTop: "20px" }}>
            评论
          </span>
        </Menu.Item>
      </Menu>
      <Comment
        style={{ width: "90%", float: "left", marginLeft: "5%" }}
        content={
          <div>
            <TextArea
              style={{
                marginTop: "20px",
                width: "100%",
                height: "80px",
                border: "1px solid #DCDCDC",
                borderRadius: "5px",
              }}
              onChange={(event) => {
                setContentText(event.target.value);
              }}
            />
            <Button
              htmlType="submit"
              type="primary"
              style={{ float: "right", marginTop: "10px" }}
              onClick={sendComment}
            >
              发表评论
            </Button>
          </div>
        }
        avatar={
          loginStatus.code === 200 && (
            <Avatar src={loginStatus.profile.avatarUrl} alt="avatar" />
          )
        }
      />
      {comment.hotComments && comment.hotComments.length !== 0 && (
        <Menu
          mode="horizontal"
          style={{
            borderBottom: "2px solid #C10D0C",
            float: "left",
            width: "100%",
          }}
        >
          <Menu.Item
            disabled
            icon={<EnvironmentOutlined style={{ color: "#C10D0C" }} />}
          >
            <span
              style={{ fontSize: "20px", color: "black", marginTop: "20px" }}
            >
              最热评论
            </span>
          </Menu.Item>
        </Menu>
      )}
      {comment.hotComments &&
        comment.hotComments.length !== 0 &&
        comment.hotComments.map((item, index) => {
          return (
            <Comment
              content={item.content}
              author={item.user.nickname}
              datetime={new Date(item.time).toLocaleString()}
              avatar={
                <Avatar
                  src={item.user.avatarUrl}
                  style={{ width: "36px", height: "36px" }}
                />
              }
              key={index}
              style={{
                float: "left",
                width: "90%",
                textAlign: "left",
                borderBottom: "1px solid #DCDCDC",
                marginLeft: "5%",
              }}
            >
              <div
                style={{
                  marginBottom: "10px",
                  marginLeft: "5px",
                  marginTop: "0px",
                  top: "-10px",
                }}
              >
                <LikeOutlined />
                <span>{item.likedCount}</span>
                <DislikeOutlined style={{ marginLeft: "20px" }} />
                <span style={{ marginLeft: "20px" }}>回复</span>
              </div>
              {item.beReplied.map((item, index) => {
                return (
                  <Comment
                    content={item.content}
                    author={item.user.nickname}
                    avatar={
                      <Avatar
                        src={item.user.avatarUrl}
                        style={{ width: "36px", height: "36px" }}
                      />
                    }
                    key={index}
                    style={{
                      float: "left",
                      width: "100%",
                      textAlign: "left",
                      background: "rgb(243,243,243)",
                      borderRadius: "10px",
                      marginBottom: "10px",
                      paddingLeft: "10px",
                    }}
                  />
                );
              })}
            </Comment>
          );
        })}
      {comment.comments && comment.comments.length !== 0 && (
        <Menu
          mode="horizontal"
          style={{
            borderBottom: "2px solid #C10D0C",
            float: "left",
            width: "100%",
          }}
        >
          <Menu.Item
            disabled
            icon={<EnvironmentOutlined style={{ color: "#C10D0C" }} />}
          >
            <span
              style={{ fontSize: "20px", color: "black", marginTop: "20px" }}
            >
              最新评论
            </span>
          </Menu.Item>
        </Menu>
      )}
      {newComment.comment && (
        <Comment
          content={newComment.comment.content}
          author={newComment.comment.user.nickname}
          datetime={new Date(newComment.comment.time).toLocaleString()}
          avatar={
            <Avatar
              src={newComment.comment.user.avatarUrl}
              style={{ width: "36px", height: "36px" }}
            />
          }
          style={{
            float: "left",
            width: "90%",
            textAlign: "left",
            borderBottom: "1px solid #DCDCDC",
            marginLeft: "5%",
          }}
        >
          <div
            style={{
              marginBottom: "10px",
              marginLeft: "5px",
              marginTop: "0px",
              top: "-10px",
            }}
          >
            <LikeOutlined />
            <DislikeOutlined style={{ marginLeft: "20px" }} />
            <span style={{ marginLeft: "20px" }}>回复</span>
          </div>
        </Comment>
      )}
      {comment.comments &&
        comment.comments.map((item, index) => {
          return (
            <Comment
              content={item.content}
              author={item.user.nickname}
              datetime={new Date(item.time).toLocaleString()}
              avatar={
                <Avatar
                  src={item.user.avatarUrl}
                  style={{ width: "36px", height: "36px" }}
                />
              }
              key={index}
              style={{
                float: "left",
                width: "90%",
                textAlign: "left",
                borderBottom: "1px solid #DCDCDC",
                marginLeft: "5%",
              }}
            >
              <div
                style={{
                  marginBottom: "10px",
                  marginLeft: "5px",
                  marginTop: "0px",
                  top: "-10px",
                }}
              >
                <LikeOutlined />
                <span>{item.likedCount}</span>
                <DislikeOutlined style={{ marginLeft: "20px" }} />
                <span style={{ marginLeft: "20px" }}>回复</span>
              </div>
              {item.beReplied.map((item, index) => {
                return (
                  <Comment
                    content={item.content}
                    author={item.user.nickname}
                    avatar={
                      <Avatar
                        src={item.user.avatarUrl}
                        style={{ width: "36px", height: "36px" }}
                      />
                    }
                    key={index}
                    style={{
                      float: "left",
                      width: "90%",
                      textAlign: "left",
                      background: "rgb(243,243,243)",
                      borderRadius: "10px",
                      marginBottom: "10px",
                      paddingLeft: "10px",
                      border: "1px solid #CECECE",
                      marginLeft: "5%",
                    }}
                  />
                );
              })}
            </Comment>
          );
        })}
    </Content>
  );
};

export default MusicDetail;
