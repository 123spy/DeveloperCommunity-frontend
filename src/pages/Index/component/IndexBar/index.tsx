import { Avatar, Card, Divider, Space } from "antd";
import learn from "@/assets/index/learn.png";
import tool from "@/assets/index/tool.png";
import game from "@/assets/index/game.png";
import { Link } from "@@/exports";
import edit from "@/assets/index/edit.png";
import React from "react";

const IndexBar = () => {
  return (
    <Card
      // title={"学习专区"}
    >
      <Space split={<Divider type={"vertical"} style={{ height: 45 }}></Divider>}>
        <Link to={"/learn"}>
          <div style={{ color: "black", cursor: "pointer", display: "flex", flexDirection: "column", fontSize: 12, justifyContent: "center", alignItems: "center" }}>
            {/*<Image src={learn}></Image>*/}
            <Avatar size={26} src={learn}></Avatar>
            <span style={{ marginTop: 6 }}>学习资源</span>
          </div>
        </Link>

        <Link to={"/tool"}>
          <div style={{ color: "black", cursor: "pointer", display: "flex", flexDirection: "column", fontSize: 12, justifyContent: "center", alignItems: "center" }}>
            {/*<Image src={learn}></Image>*/}
            <Avatar size={26} src={tool}></Avatar>
            <span style={{ marginTop: 6 }}>开发工具</span>
          </div>
        </Link>

        <div style={{ cursor: "pointer", display: "flex", flexDirection: "column", fontSize: 12, justifyContent: "center", alignItems: "center" }}>
          {/*<Image src={learn}></Image>*/}
          <Avatar size={26} src={game}></Avatar>
          <span style={{ marginTop: 6 }}>游戏</span>
        </div>

        <Link to={"/article/upload"}>
          <div style={{ color: "black", cursor: "pointer", display: "flex", flexDirection: "column", fontSize: 12, justifyContent: "center", alignItems: "center" }}>
            {/*<Image src={learn}></Image>*/}
            <Avatar size={26} src={edit}></Avatar>
            <span style={{ marginTop: 6 }}>发布文章</span>
          </div>
        </Link>
      </Space>
    </Card>
  );
};

export default IndexBar;
