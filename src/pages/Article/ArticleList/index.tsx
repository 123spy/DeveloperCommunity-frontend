import { Link, useParams } from "@@/exports";
import {Avatar, Card, Col, Input, List, message, Pagination, Row, Skeleton, Space} from "antd";
import { useEffect, useState } from "react";
import {getArticleByPage, searchArticle} from "@/services/article";
import MarkDownView from "@/components/MarkDownView";
import { Typography } from "antd";
import Title from "antd/es/typography/Title";
import { formatDateStr } from "@/utils/utils";
import {history} from "umi";
import Search from "antd/es/input/Search";
import {UserOutlined} from "@ant-design/icons";
const { Paragraph } = Typography;

const getColor = (index) => {
  if (index % 2 === 0) return "white";
  return "rgb(249,249,249)";
};

const ArticleList = () => {
  const { current, pageSize }:{current:number, pageSize:number} = useParams();
  const [dataSource, setDataSource] = useState([]);
  const [total, setTotal] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(null);

  const loadData = async () => {
    setLoading(true);
    const res = await searchArticle({current: current, pageSize: pageSize, sortField: "updateTime", sortOrder: "asc", param: search});
    if (res?.data) {
      await setDataSource(res?.data?.records);
      await setTotal(res?.data.total ?? 1);
    } else {
      message.error("加载失败");
    }
    setLoading(false);
  };

  const onChange = (page:any) => {
    const newPath = `/article/${page}/${pageSize}`;
    history.push(newPath);
  };

  useEffect(() => {
    loadData();
  }, [current, pageSize]);

  return (
    <div style={{ marginTop: 30, marginBottom: 30 }}>

        <Row justify={"center"}>
          <Col span={20}>
            <Card title={"文章" + dataSource.length}>
              <Row justify={"center"}>
                <Col span={20}>
                  <Search value={search} size={"large"} onInput={(e) => {
                    setSearch(e.target.value);
                  }} placeholder="请输搜索文章标题，作者名称" onSearch={loadData} enterButton />
                </Col>
                <Col style={{ borderRadius: 8, padding: 20 }} span={24}>
                  <Skeleton loading={loading}>
                    <List
                      dataSource={dataSource}
                      renderItem={(item, index) => (
                        <div key={index} style={{ width: "100%", height: "auto", backgroundColor: getColor(index), padding: "10px 40px" }}>
                          <Row>
                            <Col span={8}>
                              <Link to={`/article/${item?.id}`}>
                                <span>{item?.title}</span>
                              </Link>
                            </Col>
                            <Col span={8}>
                        <span style={{ margin: 10 }}>
                          <Link to={`/account/${item?.author?.id}`}>
                            <Avatar src={item?.author?.userAvatar} icon={<UserOutlined></UserOutlined>}></Avatar>
                            <span style={{ marginLeft: 6 }}>{item?.author?.userName}</span>
                          </Link>
                        </span>
                            </Col>
                            <Col span={8}>
                              <span style={{ float: "right" }}>时间: {formatDateStr(item?.updateTime)}</span>
                            </Col>
                          </Row>
                        </div>
                      )}
                    ></List>
                  </Skeleton>
                </Col>
                <Col span={24}>
                  <Pagination onChange={onChange} style={{marginTop: 15, float: "right"}} defaultCurrent={current} pageSize={pageSize} total={total} />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
    </div>
  );
};

export default ArticleList;
