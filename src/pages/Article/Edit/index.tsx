import {useAccess, useParams} from "@@/exports";
import {useEffect, useState} from "react";
import {getArticleById, updateArticle} from "@/services/article";
import {Button, Card, Col, Input, message, Row, Skeleton} from "antd";
import MarkDownEdit from "@/components/MarkDownEdit";
import {history} from "umi";
import {toLoginPage} from "@/utils/utils";
import {useModel} from "@umijs/max";
import NotFound from "@/components/NotFound";

const Edit = () => {
  const {id}:{id:number} = useParams();
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState(null);
  const [title, setTitle] = useState(null);
  const [value, setValue] = useState(null);
  const access = useAccess();
  const {initialState} = useModel("@@initialState");
  const {currentUser} = initialState;

  const loadData = async () => {
    const res = await getArticleById(id);
    // console.log(res);

    if(res?.data && res?.code === 0) {
      setArticle(res?.data);
      setTitle(res?.data?.title);
      setValue(res?.data?.content);
    }

    setLoading(false);
  };

  const updateHandler = async () => {
    const res = await updateArticle({
      id: article?.id,
      title: title,
      content: value
    });

    if(res?.code === 0 && res?.data) {
      message.success("修改成功");
      history.push(`/article/${article?.id}`);
    } else {
      message.error("修改失败");
    }
  }
  useEffect(() => {
    setLoading(true);
    if (isNaN(parseInt(id))) {
      setLoading(false);
      return ;
    }
    loadData();
  }, [id]);

  if(!access.canUser) {
    toLoginPage();
  }

  return (
    <Skeleton loading={loading}>
      { (currentUser?.id === article?.author?.id || currentUser?.userRole === "admin") &&
        <div style={{marginTop: 30}}>
          <Row justify={"center"}>
            <Col span={20}>
              <Card title={"文章编辑"}>
                <Input value={title} onChange={(value) => {
                  // console.log(value);
                  setTitle(value?.target?.value);
                }} placeholder={"请输入文章标题"}></Input>
                <div style={{marginTop: 18}}></div>
                <MarkDownEdit value={value} setValue={setValue}></MarkDownEdit>
                <div style={{marginTop: 16}}>
                  <Button onClick={updateHandler} style={{float: 'right'}}>提交</Button>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      }
      {
        !(currentUser?.id === article?.author?.id || currentUser?.userRole === "admin") && <NotFound></NotFound>
      }
    </Skeleton>
  );
};

export default Edit;
