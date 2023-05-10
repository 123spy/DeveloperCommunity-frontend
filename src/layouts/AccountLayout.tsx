import TemplateLayout from "@/layouts/TemplateLayout";
import {history, Outlet, useParams} from "@@/exports";
import {Avatar, Card, Col, Divider, Layout, message, Row, Skeleton, Space, Tag} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {Content} from "antd/es/layout/layout";
import NotFound from "@/components/NotFound";
import {useEffect, useState} from "react";
import {getUserById} from "@/services/user";
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

const AccountLayout = () => {
  const {id, tab} = useParams();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  const loadData = async () => {
    setLoading(true);
    const res = await getUserById(id);

    if(res?.data && res?.code === 0) {
      // console.log(res);
      await setUser(res?.data);
    } else {
      message.success("请求失败");
    }

    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    if (isNaN(parseInt(id))) {
      setLoading(false);
      return;
    }
    loadData();
  }, [id, tab]);

  return (
    <TemplateLayout>
      <Outlet context={{user: user}}></Outlet>
    </TemplateLayout>
  );
};

export default AccountLayout;
