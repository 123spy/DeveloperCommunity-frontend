import {Avatar, Card, Col, Divider, Layout, message, Row, Skeleton, Space, Tag} from "antd";
import {UserOutlined} from "@ant-design/icons";
import Title from "antd/es/typography/Title";

const UserInfo = (props:any) => {
  const {user} = props;
  return (
    <Card>
      <div style={{width: "100%", display: "flex"}}>
        <div style={{width: "6%", display: "flex", justifyContent: "center"}}>
          <Avatar src={user?.userAvatar} size={50} icon={<UserOutlined/>}></Avatar>
        </div>
        <div style={{width: "82%"}}>
          <Space direction={"vertical"}>
            <Title level={1} style={{margin: 0, padding: 0, fontSize: "1.3em"}}>{user?.userName || "暂无"}</Title>
            {user?.userRole === "admin" && <Tag color={"red"}>管理员</Tag> }
            {user?.userRole !== "admin" && <Tag color={"red"}>用户</Tag> }
          </Space>
        </div>
        <div style={{width: "12%", display: "flex", justifyContent: "center"}}>
          <Space style={{float: "right"}} split={<Divider type={"vertical"}></Divider>}>
            <span>关注: 0</span>
            <span>粉丝: 0</span>
          </Space>
        </div>
      </div>
    </Card>
  )
};

export default UserInfo;
