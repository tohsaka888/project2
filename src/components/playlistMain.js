import React, { useEffect, useState } from "react";
import { Row, Col, Pagination } from "antd";
import { useHistory } from "react-router-dom";
function PlaylistMain() {
  const [lastTime, setLastTime] = useState(0);
  const [current, setCurrent] = useState(1);
  const [playlist, setPlaylist] = useState([]);
  const history = useHistory();
  const getPlaylist = async () => {
    const res = await fetch(
      `http://139.196.141.233:3000/top/playlist/highquality`
    );
    const data = await res.json();
    setPlaylist(data.playlists);
    setLastTime(data.lasttime);
  };
  const ChangePlaylist = async () => {
    const res = await fetch(
      `http://139.196.141.233:3000/top/playlist/highquality&before=${lastTime}`
    );
    const data = await res.json();
    setPlaylist(data.playlists);
    setLastTime(data.lasttime);
  };
  useEffect(() => {
    getPlaylist();
  }, [0]);
  return (
    <div
      style={{
        marginTop: "67px",
        marginLeft: "25vw",
        marginRight: "25vw",
        background: "white",
      }}
    >
      <div style={{ marginTop: "30px" }}>
        <Row>
          {playlist.slice(0, 6).map((item, index) => {
            return (
              <Col span={4} key={index}>
                <div>
                  <img
                    onClick={() => {
                      history.push(`/playlist/${item.id}`);
                    }}
                    src={item.coverImgUrl}
                    style={{ width: "7vw", borderRadius: "5px" }}
                    className={"playlistImg"}
                  />
                  <div
                    style={{
                      textAlign: "left",
                      marginLeft: "13px",
                      marginTop: "10px",
                    }}
                    className={"playlistText"}
                    onClick={() => {
                      history.push(`/playlist/${item.id}`);
                    }}
                  >
                    {item.name}
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
        <Row>
          {playlist.slice(6, 12).map((item, index) => {
            return (
              <Col span={4} key={index}>
                <div>
                  <img
                    onClick={() => {
                      history.push(`/playlist/${item.id}`);
                    }}
                    src={item.coverImgUrl}
                    style={{ width: "7vw", borderRadius: "5px" }}
                    className={"playlistImg"}
                  />
                  <div
                    style={{
                      textAlign: "left",
                      marginLeft: "13px",
                      marginTop: "10px",
                    }}
                    className={"playlistText"}
                    onClick={() => {
                      history.push(`/playlist/${item.id}`);
                    }}
                  >
                    {item.name}
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
        <Row>
          {playlist.slice(12, 18).map((item, index) => {
            return (
              <Col span={4} key={index}>
                <div>
                  <img
                    onClick={() => {
                      history.push(`/playlist/${item.id}`);
                    }}
                    src={item.coverImgUrl}
                    style={{ width: "7vw", borderRadius: "5px" }}
                    className={"playlistImg"}
                  />
                  <div
                    style={{
                      textAlign: "left",
                      marginLeft: "13px",
                      marginTop: "10px",
                    }}
                    className={"playlistText"}
                    onClick={() => {
                      history.push(`/playlist/${item.id}`);
                    }}
                  >
                    {item.name}
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
        <Row>
          {playlist.slice(18, 24).map((item, index) => {
            return (
              <Col span={4} key={index}>
                <div>
                  <img
                    onClick={() => {
                      history.push(`/playlist/${item.id}`);
                    }}
                    src={item.coverImgUrl}
                    style={{ width: "7vw", borderRadius: "5px" }}
                    className={"playlistImg"}
                  />
                  <div
                    style={{
                      textAlign: "left",
                      marginLeft: "13px",
                      marginTop: "10px",
                    }}
                    className={"playlistText"}
                    onClick={() => {
                      history.push(`/playlist/${item.id}`);
                    }}
                  >
                    {item.name}
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
        <Row>
          {playlist.slice(24, 30).map((item, index) => {
            return (
              <Col span={4} key={index}>
                <div>
                  <img
                    onClick={() => {
                      history.push(`/playlist/${item.id}`);
                    }}
                    src={item.coverImgUrl}
                    style={{ width: "7vw", borderRadius: "5px" }}
                    className={"playlistImg"}
                  />
                  <div
                    style={{
                      textAlign: "left",
                      marginLeft: "13px",
                      marginTop: "10px",
                    }}
                    className={"playlistText"}
                    onClick={() => {
                      history.push(`/playlist/${item.id}`);
                    }}
                  >
                    {item.name}
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
        <Row>
          {playlist.slice(30, 36).map((item, index) => {
            return (
              <Col span={4} key={index}>
                <div>
                  <img
                    onClick={() => {
                      history.push(`/playlist/${item.id}`);
                    }}
                    src={item.coverImgUrl}
                    style={{ width: "7vw", borderRadius: "5px" }}
                    className={"playlistImg"}
                  />
                  <div
                    style={{
                      textAlign: "left",
                      marginLeft: "13px",
                      marginTop: "10px",
                    }}
                    className={"playlistText"}
                    onClick={() => {
                      history.push(`/playlist/${item.id}`);
                    }}
                  >
                    {item.name}
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
        <Row>
          {playlist.slice(36, 42).map((item, index) => {
            return (
              <Col span={4} key={index}>
                <div>
                  <img
                    onClick={() => {
                      history.push(`/playlist/${item.id}`);
                    }}
                    src={item.coverImgUrl}
                    style={{ width: "7vw", borderRadius: "5px" }}
                    className={"playlistImg"}
                  />
                  <div
                    style={{
                      textAlign: "left",
                      marginLeft: "13px",
                      marginTop: "10px",
                    }}
                    className={"playlistText"}
                    onClick={() => {
                      history.push(`/playlist/${item.id}`);
                    }}
                  >
                    {item.name}
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
        <Row>
          {playlist.slice(42, 48).map((item, index) => {
            return (
              <Col span={4} key={index}>
                <div>
                  <img
                    onClick={() => {
                      history.push(`/playlist/${item.id}`);
                    }}
                    src={item.coverImgUrl}
                    style={{ width: "7vw", borderRadius: "5px" }}
                    className={"playlistImg"}
                  />
                  <div
                    style={{
                      textAlign: "left",
                      marginLeft: "13px",
                      marginTop: "10px",
                    }}
                    className={"playlistText"}
                    onClick={() => {
                      history.push(`/playlist/${item.id}`);
                    }}
                  >
                    {item.name}
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
      <Pagination
        defaultPageSize={50}
        total={385}
        defaultCurrent={current}
        style={{ marginTop: "20px" }}
        onChange={(value) => {
          setCurrent(value);
          ChangePlaylist();
        }}
      />
    </div>
  );
}

export default PlaylistMain;
