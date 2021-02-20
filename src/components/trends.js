import { Divider, Image, Layout, Typography } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Trends() {
  const { Content } = Layout;
  const { userId } = useParams();
  const [myTrends, setMyTrends] = useState([]);
  const getTrends = async () => {
    const res = await fetch(
      `http://139.196.141.233:3000/event/?pagesize=30&lasttime=-1&cookie=${localStorage.neteaseCookie}`
    );
    const data = await res.json();
    console.log(data.event);
    setMyTrends(data.event);
  };
  useEffect(() => {
    getTrends();
  }, [0]);
  return (
    <Layout
      style={{ paddingLeft: "25vw", paddingRight: "25vw", marginTop: "64px" }}
    >
      <Content
        style={{
          backgroundColor: "white",
          paddingTop: "20px",
        }}
      >
        <div
          style={{
            fontSize: "24px",
            fontWeight: "900",
            textAlign: "left",
            marginLeft: "1vw",
            fontFamily: "text",
            borderBottom: "3px solid red",
            marginBottom: "20px",
          }}
        >
          动态
        </div>
        <div style={{ paddingLeft: "1vw", paddingRight: "1vw" }}>
          {myTrends.map((item, index) => {
            let date = new Date();
            const data = JSON.parse(item.json);
            const year = date.getFullYear(data.publishTime);
            const month = date.getMonth(data.publishTime) + 1;
            const day = date.getDay(data.publishTime);
            return (
              <div key={index}>
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <div>
                    <Avatar
                      src={item.user.avatarUrl}
                      style={{ float: "left", boxShadow: "3px 3px 3px gray" }}
                      size={"large"}
                    />
                  </div>
                  <div style={{ textAlign: "left", marginLeft: "0.8vw" }}>
                    <div style={{ fontSize: "16px" }}>{item.user.nickname}</div>
                    <div
                      style={{
                        fontSize: "8px",
                        color: "gray",
                        marginTop: "5px",
                      }}
                    >
                      {year + "年" + month + "月" + day + "日"}
                    </div>
                    <div
                      style={{
                        textAlign: "left",
                        marginTop: "5px",
                        marginBottom: "5px",
                      }}
                    >
                      {data.msg === undefined && (
                        <div>这个人很懒，没有发任何消息~</div>
                      )}
                      {data.msg !== "" && (
                        <div style={{ fontSize: "15px" }}>{data.msg}</div>
                      )}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        borderRadius: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      {item.pics.length <= 3 &&
                        item.pics.map((data, index) => {
                          return (
                            <div
                              style={{
                                width: "13vw",
                                height: "13vw",
                                marginRight: 8,
                                borderRadius: 5,
                              }}
                            >
                              <Image key={index} src={data.squareUrl} />
                            </div>
                          );
                        })}
                      {item.pics.length > 3 &&
                        item.pics.slice(0, 3).map((data, index) => {
                          return (
                            <div
                              style={{
                                width: "13vw",
                                height: "13vw",
                                marginRight: 8,
                                borderRadius: 5,
                              }}
                            >
                              <Image key={index} src={data.squareUrl} />
                            </div>
                          );
                        })}
                      {item.pics.length > 3 &&
                        item.pics.slice(3, 6).map((data, index) => {
                          return (
                            <Image
                              key={index}
                              src={data.squareUrl}
                              style={{
                                width: "100px",
                                height: "100px",
                                marginTop: "1vw",
                                marginRight: 10,
                                borderRadius: 5,
                              }}
                            />
                          );
                        })}
                    </div>
                  </div>
                </div>
                <Divider />
              </div>
            );
          })}
        </div>
      </Content>
    </Layout>
  );
}

export default Trends;
