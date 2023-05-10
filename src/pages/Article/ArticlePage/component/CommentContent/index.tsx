import { Avatar, Button, Card, Col, Divider, List, message, Row } from "antd";
import CommentEdit from "@/components/CommentEdit";
import { Link, useModel } from "@@/exports";
import {formatDateStr, formDateStrFormNow, formDateStrFromNow} from "@/utils/utils";
import React, { useState } from "react";
import { addComment, deleteComment } from "@/services/comment";
import { deleteArticle } from "@/services/article";
import {UserOutlined} from "@ant-design/icons";

const CommentContent = (props: any) => {
  const { initialState, setInitialState } = useModel("@@initialState");
  const { currentUser } = initialState;
  const { article, loadData } = props;
  const [commentValue, setCommentValue] = useState(null);

  const addCommentHandler = async () => {
    if (commentValue === null || commentValue === "") {
      message.warning("评论为空");
      return;
    }
    if (article?.id === null || article?.id <= 0) {
      message.warning("参数错误");
      return;
    }
    const res = await addComment({ articleId: article?.id, content: commentValue });

    if (res?.data && res?.code === 0) {
      // message.success("评论成功");
      loadData();
      setCommentValue(null);
    } else {
      message.error("评论失败");
    }
  };

  const deleteCommentHandler = async (id) => {
    const res = await deleteComment(id);
    if (res) {
      loadData();
    } else {
      message.error("删除评论失败");
    }
  };
  return (
    <Card
      title={
        <>
          评论<span style={{ marginLeft: 8, fontSize: "0.8em" }}>{article?.comments.length}</span>
        </>
      }
    >
      <Row justify={"center"}>
        <Col span={20} style={{ marginBottom: 27 }}>
          {currentUser?.id && (
            <div>
              <div style={{width: "100%"}}>
                <CommentEdit value={commentValue} setValue={setCommentValue}></CommentEdit>
              </div>
              <div style={{width: "100%", marginTop: 15}}>
                <Button style={{float: "right", textAlign: "center", backgroundColor: "rgb(0,174,236)", color: "white" }} onClick={addCommentHandler}>
                  发布评论
                </Button>
              </div>
            </div>
          )}
          {!currentUser?.id && (
            <>
              <div>
                <div style={{ borderRadius: 8, backgroundColor: "rgb(241,242,243)", height: 60, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  请先&nbsp;&nbsp;<Link to={"/user/login"}>登录</Link>&nbsp;&nbsp;, 发表评论
                </div>
              </div>
            </>
          )}
        </Col>
        <Col span={20}>
          <List
            dataSource={article?.comments}
            itemLayout="horizontal"
            renderItem={(item, index) => {
              // console.log(item);
              return (
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between"}}>
                    <div style={{ width: "5%" }}>
                      <Link to={`/account/${item?.author?.id}`}>
                        <Avatar src={item?.author?.userAvatar} icon={<UserOutlined></UserOutlined>} />
                      </Link>
                    </div>
                    <div style={{ width: "90%" }}>
                      <div>
                        <Link to={`/account/${item?.author?.id}`}>{item?.author?.userName}</Link>
                        <span style={{ marginLeft: 10 }}>{formDateStrFromNow(item?.createTime)}</span>
                      </div>
                      <div style={{marginTop: 3}}>{item?.content}</div>
                    </div>
                    <div style={{ width: "5%", }}>
                      {(currentUser?.id === article?.author?.id || currentUser?.userRole === "admin") && (
                        <a href={"#"} onClick={() => deleteCommentHandler(item?.id)}>
                          删除
                        </a>
                      )}
                    </div>
                  </div>
                  <Divider></Divider>
                </div>
              );
            }}
          ></List>
        </Col>
      </Row>
    </Card>
  );
};

export default CommentContent;
