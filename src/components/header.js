import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Form,
  Input,
  Layout,
  Menu,
  Modal,
  Popover,
} from "antd";
import "./header.css";
import {
  TaobaoCircleFilled,
  MessageOutlined,
  SettingOutlined,
  ImportOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Link, useHistory, useLocation } from "react-router-dom";

const Header = ({
  visible,
  setVisible,
  setUserLike,
  loginStatus,
  setSongData,
  setLoginStatus,
  setMymusic,
  setCookie,
  setPlay,
  setComment,
  cookie,
}) => {
  const loc = useLocation();
  const history = useHistory();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { Search } = Input;
  const { Header } = Layout;
  const { Item } = Menu;

  // useEffect(()=>{
  //     follow();
  // },[])
  const login = async () => {
    const res = await fetch(
      `http://139.196.141.233:3000/login/cellphone?phone=${phone}&password=${password}`,
      {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify({ phone: phone, password: password }),
        mode: "cors",
        credentials: "include",
      }
    );
    const data = await res.json();
    setCookie(data.cookie);
    console.log(data.cookie);
    localStorage.neteaseCookie = data.cookie;
    setVisible(false);
    setLoginStatus(data);
  };

  const search = async (value) => {
    const res = await fetch(
      `http://139.196.141.233:3000/search?keywords=${value}`
    );
    const data = await res.json();
    setSongData(data.result.songs);
  };

  const logout = async () => {
    const res = await fetch(
      `http://139.196.141.233:3000/logout?cookie=${cookie}`
    );
    const data = await res.json();
    if (data.code === 200) {
      setLoginStatus({ code: 301 });
      localStorage.neteaseCookie = "";
      setCookie("logout");
    }
  };

  const mymusic = async () => {
    const res = await fetch(
      `http://139.196.141.233:3000/user/playlist?uid=${loginStatus.profile.userId}&cookie=${cookie}`
    );
    const data = await res.json();
    setMymusic(data);
    const res2 = await fetch(
      `http://139.196.141.233:3000/playlist/detail?id=${data.playlist[0].id}&cookie=${cookie}`,
      {
        credentials: "include",
        mode: "cors",
      }
    );
    const data2 = await res2.json();
    setPlay(data2.playlist);
    const res1 = await fetch(
      `http://139.196.141.233:3000/comment/playlist?id=${data.playlist[0].id}&cookie=${cookie}`
    );
    const data1 = await res1.json();
    setComment(data1);
    history.push(`/mymusic/${data.playlist[0].id}`);
  };

  const follow = async () => {
    const res = await fetch(
      `http://139.196.141.233:3000/login/status?cookie=${cookie}`
    );
    const data = await res.json();
    if (data.profile !== undefined) {
      const res1 = await fetch(
        `http://139.196.141.233:3000/user/follows?uid=${data.profile.userId}`
      );
      const data1 = await res1.json();
      history.push(
        `/myfriend/${data.profile.userId}/message/${data1.follow[0].userId}`
      );
    }
  };
  const myTrends = () => {
    const userId = loginStatus.profile.userId;
    if (userId !== undefined) {
      history.push(`/trends/${loginStatus.profile.userId}`);
    }
  };
  const content = (
    <div>
      <Button
        size="small"
        icon={<HomeOutlined />}
        style={{ border: "none", fontSize: "12px" }}
      >
        我的主页
      </Button>
      <br />
      <Button
        size="small"
        icon={<SettingOutlined />}
        style={{ border: "none", marginTop: "10px", fontSize: "12px" }}
      >
        我的设置
      </Button>
      <br />
      <Button
        size="small"
        icon={<MessageOutlined />}
        style={{ border: "none", marginTop: "10px", fontSize: "12px" }}
      >
        我的消息
      </Button>
      <br />
      <Button
        size="small"
        icon={<ImportOutlined />}
        style={{ border: "none", marginTop: "10px", fontSize: "12px" }}
        onClick={logout}
      >
        退出登录
      </Button>
    </div>
  );

  return (
    <div>
      <Header
        style={{
          display: "flex",
          position: "fixed",
          width: "100%",
          zIndex: "100",
          alignItems: "center",
          justifyContent: "center",
          justifyItems: "center",
        }}
      >
        <div>
          <TaobaoCircleFilled
            style={{
              color: "#f83d3d",
              verticalAlign: "middle",
              fontSize: "30px",
            }}
          />
          <span
            style={{
              fontFamily: "title",
              fontSize: "18px",
              color: "white",
              marginLeft: "1vw",
              marginRight: "1vw",
            }}
          >
            网易云音乐
          </span>
        </div>
        <Menu
          mode="horizontal"
          theme="dark"
          className="menu"
          defaultSelectedKeys={[loc.pathname.split("/")[1]]}
        >
          <Item key="/">
            <Link to="/">
              <span>发现音乐</span>
            </Link>
          </Item>
          <Item key="mymusic" onClick={mymusic}>
            <span>我的音乐</span>
          </Item>
          <Item key="trends" onClick={myTrends}>
            我的动态
          </Item>
          <Item key="playlist"><Link to={'playlistMain'}>歌单</Link></Item>
          {loginStatus.profile && (
            <Item
              key="friend"
              onClick={() => {
                follow();
              }}
            >
              <span>朋友</span>
            </Item>
          )}
        </Menu>
        <div style={{ marginLeft: "1vw" }}>
          <Search
            placeholder="音乐/视频/电台/用户 "
            onSearch={(value) => {
              search(value);
              history.push(`/search/${value}`);
            }}
            style={{ width: "25vw", verticalAlign: "middle" }}
          />
        </div>
        {loginStatus.code !== 200 && loginStatus && (
          <Button
            shape="round"
            style={{ marginLeft: "1.5vw", fontWeight: "900" }}
            type="primary"
            onClick={() => {
              setVisible(true);
            }}
          >
            登录
          </Button>
        )}
        {loginStatus.code === 200 && loginStatus && (
          <Popover content={content}>
            <Avatar
              src={loginStatus.profile.avatarUrl}
              style={{ marginLeft: "2vw", fontSize: "1.5vw" }}
            />
          </Popover>
        )}
        <Modal
          visible={visible}
          onCancel={() => setVisible(false)}
          onOk={() => {
            login();
          }}
          title="登录"
        >
          <Form>
            <Form.Item
              label="手机号"
              labelCol={{ span: 5 }}
              wrapperCol={16}
              name="phone"
            >
              <Input
                style={{ width: "300px" }}
                onChange={(event) => {
                  setPhone(event.target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              label="密码"
              name="pass"
              labelCol={{ span: 5 }}
              wrapperCol={16}
            >
              <Input
                style={{ width: "300px" }}
                type="password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </Form.Item>
          </Form>
        </Modal>
      </Header>
    </div>
  );
};

export default Header;
