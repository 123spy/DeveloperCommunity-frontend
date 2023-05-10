import {Avatar, Card, Col, message, Popconfirm, Row, Space} from "antd";
import {history} from "@@/core/history";
import {Link, useModel} from "@@/exports";
import {formatDateStr} from "@/utils/utils";
import MarkDownView from "@/components/MarkDownView";
import React from "react";
import {deleteArticle} from "@/services/article";
import {UserOutlined} from "@ant-design/icons";

const ArticleContent = (props:any) => {
  const {initialState, setInitialState} = useModel("@@initialState");
  const {currentUser} = initialState;
  const {article} = props;

  const deleteArticleHandler = async () => {
    const res = await deleteArticle(article?.id);

    if(res) {
      message.success("删除成功");
      history.push("/");
    } else {
      message.warning("删除失败");
    }
  }

  return (
    <Card
      title={<h1>{article?.title}</h1>}
      extra={
        <Space>
          <div>
            { (article?.author?.id === currentUser?.id || currentUser?.userRole === "admin") && <a href={"#"} onClick={() => {
              const editPath = `/article/${article?.id}/edit`;
              // console.log("修改的路径为:", editPath);
              history.push(editPath);
            }}>修改</a> }
          </div>
          <div>
            { (article?.author?.id === currentUser?.id || currentUser?.userRole === "admin") &&
              (
                <Popconfirm
                  placement="topLeft"
                  title={"删除"}
                  description={"你确定要删除此文章吗"}
                  onConfirm={deleteArticleHandler}
                  okText="Yes"
                  cancelText="No"
                >
                  <a href={"#"}>删除</a>
                </Popconfirm>

              ) }
          </div>
        </Space>
      }
    >
      <Row>
        <Col span={24}>
          <div style={{display: "flex", alignItems: "center"}}>
            <Avatar size={26} src={article?.author?.userAvatar} icon={<UserOutlined></UserOutlined>}></Avatar>
            <Link style={{margin: "auto 6px"}} to={`/account/${article?.author?.id}`}>{article?.author?.userName}</Link>
            <span style={{margin: "auto 6px"}}>{formatDateStr(article?.updateTime)} 发布</span>
          </div>
        </Col>
        <Col style={{marginTop : 16}} span={24}>
          <MarkDownView>{article?.content}</MarkDownView>
        </Col>
      </Row>
    </Card>
  );
};

export default ArticleContent;
