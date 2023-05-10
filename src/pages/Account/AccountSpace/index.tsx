import {Link, useParams} from "@@/exports";
import { useEffect, useState } from "react";
import { getUserById } from "@/services/user";
import NotFound from "@/components/NotFound";
import {
  Avatar,
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Empty,
  Layout,
  Menu,
  message,
  Row,
  Skeleton,
  Space,
  Tabs
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { history, useOutletContext } from "umi";
import TextArea from "antd/es/input/TextArea";
import { getArticleByPage } from "@/services/article";
import MarkDownView from "@/components/MarkDownView";
import Title from "antd/es/typography/Title";
import DescriptionsItem from "antd/es/descriptions/Item";
import {formDateStrFromNow} from "@/utils/utils";
import UserInfo from "@/pages/Account/AccountSpace/component/UserInfo";
import {currentUser} from "@/services/ant-design-pro/api";
import {useModel} from "@umijs/max";

const AccountSpace = (props: any) => {
  const { id } = useParams();
  const { user } = useOutletContext();
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [articleList, setArticleList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const {initialState} = useModel("@@initialState");
  const {currentUser} = initialState;

  const loadData = async () => {
    setLoading(true);
    const res = await getArticleByPage({ authorId: id, current: current, pageSize });

    if (res?.code === 0 && res?.data) {
      await setArticleList((prevState) => {
        return [...prevState, ...res?.data?.records];
      });
      setTotal(res?.data.total);
      setCurrent((prevState) => {
        return prevState + 1;
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [id]);
  return (
    <div style={{marginTop: 30, marginBottom: 30, paddingRight: 110, paddingLeft: 110}}>
      <Skeleton loading={loading}>
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <UserInfo user={user}></UserInfo>
          </Col>
          <Col span={18}>
              <div>
                {total === 0 && (
                  <div style={{ backgroundColor: "white", padding: "20px 0px", borderRadius: "8px", width: "100%" }}>
                    <Empty></Empty>
                  </div>
                )}
                {articleList.map((item, index) => {
                  return (
                    <div key={index} style={{marginBottom: 20}}>
                      <Card>
                        <div style={{display: "flex"}}>
                          <div style={{width: "4%"}}>
                            <Avatar src={user?.userAvatar} size={36} icon={<UserOutlined/>}></Avatar>
                          </div>
                          <div style={{marginLeft: 16, width: "96%"}}>
                            <div style={{display: "flex", justifyContent: "space-between"}}>
                              <div>
                                <Link to={`/article/${item?.id}`} style={{color: "rgb(251,114,153)"}}><h1 style={{margin: 0}}>{item?.title}</h1></Link>
                                <span>{item?.author?.userName}</span>
                              </div>
                              <span>{formDateStrFromNow(item?.updateTime)}</span>
                            </div>
                            <div style={{marginTop: 6}}>
                              <MarkDownView>{item?.content}</MarkDownView>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  );
                })}
                {total === articleList.length && total !== 0 && <Divider>暂无更多内容😊</Divider>}
                {total !== articleList.length && (
                  <Divider>
                    <span onClick={loadData} style={{ color: "rgb(51, 153, 255)", cursor: "pointer" }}>
                      查看更多
                    </span>
                  </Divider>
                )}
              </div>
          </Col>

          <Col span={6}>
            <Row justify={"center"}>
              <Card style={{ width: "100%" }} title={"公告"}>
                <div style={{}}>大家好啊，我是来自地球的人类，喜欢狗</div>
              </Card>

              <Card extra={(user?.id === currentUser?.id || currentUser?.userRole === "admin") ? <Link to={`/account/${user?.id}/profile`}>修改</Link> : <></>} style={{ width: "100%", marginTop: 20 }} title={"用户介绍"}>
                <Descriptions layout={"horizontal"} column={1}>
                  <Descriptions.Item label="ID" >{user?.id}</Descriptions.Item>
                  <Descriptions.Item label="姓名" >{user?.userName}</Descriptions.Item>
                  <Descriptions.Item label="手机号">{user?.userPhone}</Descriptions.Item>
                </Descriptions>
              </Card>
            </Row>
          </Col>
        </Row>
      </Skeleton>
    </div>
  );
};

export default AccountSpace;
