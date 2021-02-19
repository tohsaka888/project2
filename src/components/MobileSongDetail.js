import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Flex } from "antd-mobile";
import { Affix, Typography } from "antd";
import lrcParser from "lrc-parser";

const MobileSongDetail = ({ setMusicSrc }) => {
  const { id } = useParams();
  const [text, setText] = useState([]);
  const [songs, setSongs] = useState({});
  const [imgUrl, setImgurl] = useState("");
  const [change, setChange] = useState(0);

  useEffect(() => {
    const audio = document.getElementById("audio");
    audio.addEventListener("timeupdate", function () {
      setChange(audio.currentTime);
    });
    const detail = async () => {
      const res = await fetch(
        `http://139.196.141.233:3000/song/detail?ids=${id}`
      );
      const data = await res.json();
      setSongs(data.songs[0]);
      setImgurl(data.songs[0].al.picUrl);
    };
    detail();
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
    lyric();
  }, [id]);

  const getSongs = async (id) => {
    const res = await fetch(`http://139.196.141.233:3000/song/url?id=${id}`);
    const data = await res.json();
    setMusicSrc(data.data[0].url);
  };

  return (
    <div>
      <div
        className={"musicbg"}
        style={{
          width: "100vw",
          height: "100vh",
          backgroundImage: `url(${imgUrl})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "0px",
          width: "100vw",
          overflow: "hidden",
          height: "100vh",
        }}
      >
        <Affix offsetTop={0}>
          <Flex style={{ marginTop: "5vw", marginLeft: "2vw" }}>
            <Link to={`/`}>
              <ArrowLeftOutlined style={{ fontSize: "25px" }} />
            </Link>
            <Typography>
              <div
                style={{
                  marginLeft: "2vw",
                  fontSize: "18px",
                  fontFamily: "title",
                }}
              >
                {songs.name}
              </div>
              <div style={{ height: "40px", overflow: "hidden" }}>
                {songs.ar &&
                  songs.ar.map((item, index) => {
                    return <div style={{ marginLeft: "2vw" }}>{item.name}</div>;
                  })}
              </div>
            </Typography>
          </Flex>
        </Affix>
        <Flex justify={"center"}>
          <img
            src={imgUrl}
            alt={imgUrl}
            style={{
              borderRadius: "50%",
              width: "50vw",
              height: "50vw",
              marginTop: "5vw",
              marginBottom: "5vw",
            }}
            onClick={() => {
              getSongs(id);
            }}
          />
        </Flex>
        <Typography.Text style={{ overflow: "hidden" }}>
          {text.map((item, index) => {
            if (index >= 1) {
              if (change >= item.start && change <= item.end) {
                for (let i = 1; i < text.length; i++) {
                  text[i - 1] = text[i];
                }
                text.splice(text.length - 1, 1);
              }
            }
          })}
          {text.map((item, index) => {
            if (change >= item.start && change <= item.end) {
              return (
                <Flex
                  justify={"center"}
                  alignContent={"center"}
                  align={"center"}
                  style={{
                    marginTop: "2vw",
                    color: "red",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  {item.text}
                </Flex>
              );
            } else {
              return (
                <Flex
                  justify={"center"}
                  align={"start"}
                  alignContent={"start"}
                  style={{ marginTop: "2vw", color: "white", fontSize: "14px" }}
                >
                  {item.text}
                </Flex>
              );
            }
          })}
        </Typography.Text>
      </div>
    </div>
  );
};

export default MobileSongDetail;
