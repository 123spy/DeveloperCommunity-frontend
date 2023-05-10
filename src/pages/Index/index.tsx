import { useModel } from "@umijs/max";
import { Card, Col, Row, Space, theme } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./index.less";
import { Link } from "../../.umi/exports";
import { BookTwoTone} from "@ant-design/icons";
import { getArticleByPage } from "@/services/article";
import IndexArticleCard from "@/pages/Index/component/IndexArticleCard";
import IndexDynamicCard from "@/pages/Index/component/IndexDynamicCard";
import IndexBar from "@/pages/Index/component/IndexBar";

const Welcome: React.FC = () => {
  const { token } = theme.useToken();
  const { initialState } = useModel("@@initialState");
  const [articleList, setArticleList] = useState([]);

  const loadDataArticle = async () => {
    const res = await getArticleByPage({ current: 1, pageSize: 5, sortField: "updateTime", sortOrder: "desc" });

    if (res?.data) {
      // console.log(res);
      setArticleList(res?.data?.records);
    }
  };

  useEffect(() => {
    loadDataArticle();
  }, []);
  return (
    <div style={{ marginTop: 30, marginBottom: 30 }} >
      <Row justify={"center"}>
        <Col span={20}>
          <div className={styles.welcome}>
            <h1 style={{ color: "white" }}>Hi, 欢迎使用开发者社区</h1>
            <p style={{ color: "white" }}>
              轻松学习，提升知识，交流分享，
              <BookTwoTone />
              <Link style={{ color: "white", textDecoration: "underline" }} to={"/learn"}>
                开始学习
              </Link>
            </p>
          </div>
        </Col>
      </Row>

      <Row gutter={[0, 16]} style={{ marginTop: 20 }} justify={"center"}>
        <Col span={20}>
          <IndexBar></IndexBar>
        </Col>

        <Col span={20}>
          <Row gutter={[6, 16]} justify={"space-between"}>
            <Col span={19}>
              <Row gutter={[0, 10]}>
                <Col span={24}>
                  <IndexArticleCard articleList={articleList}></IndexArticleCard>
                </Col>
                <Col span={24}>
                  <IndexDynamicCard></IndexDynamicCard>
                </Col>
              </Row>
            </Col>

            <Col span={5}>
              <Row gutter={[0, 8]}>
                <Col span={24}>
                  <Card title={"公告"}>
                    <Link to={"/"}>使用帮助</Link>
                  </Card>
                </Col>
                <Col span={24}>
                  <Card title={"使用帮助"}>
                    <Link to={"/"}>使用帮助</Link>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Welcome;
