import React, { useEffect, useState } from "react";
import { useParams, Switch, Route, Link } from "react-router-dom";
import { Avatar, Layout } from "antd";
import Message from "./message";

const Friend = () => {
  const { Sider, Content } = Layout;
  const { id } = useParams();
  const [follows, setFollows] = useState([]);

  const follow = async () => {
    const res = await fetch(
      `http://139.196.141.233:3000/user/follows?uid=${id}`
    );
    const data = await res.json();
    setFollows(data.follow);
  };

  useEffect(() => {
    follow();
  }, []);

  return (
    <Layout
      style={{
        marginTop: "64px",
        height: "100vh",
        paddingLeft: "16.5vw",
        paddingRight: "16.5vw",
      }}
    >
      <Sider
        theme={"light"}
        style={{
          overflow: "auto",
          position: "fixed",
          height: "100%",
          background: "#F9F9F9",
          zIndex: 100,
          width: "15vw",
          maxWidth: "15vw",
          minWidth: "15vw",
        }}
      >
        {follows.map((item, index) => {
          return (
            <Link to={`/myfriend/${id}/message/${item.userId}`}>
              <div
                key={index}
                style={{
                  textAlign: "left",
                  padding: "20px",
                  display: "flex",
                  alignItems: "center",
                  alignContent: "center",
                }}
              >
                <Avatar alt={index} src={item.avatarUrl} size={"large"} />
                <span style={{ marginLeft: "5px" }}>{item.nickname}</span>
              </div>
            </Link>
          );
        })}
      </Sider>
      <Content
        style={{
          background: "white",
          marginLeft: "200px",
          position: "fixed",
        }}
      >
        <Switch>
          <Route component={Message} path={`/myfriend/${id}/message/:id`} />
        </Switch>
      </Content>
    </Layout>
  );
};

export default Friend;
