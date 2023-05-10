import MarkDownEdit from "@/components/MarkDownEdit";
import {useState} from "react";
import {Button, Card, Col, Input, message, Row} from "antd";
import {useAccess} from "@@/exports";
import {toLoginPage} from "@/utils/utils";
import {addArticle} from "@/services/article";
import {history} from "umi";

const Upload = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState<string>("");

  const access = useAccess();
  if(!access.canUser) {
    toLoginPage();
  }

  const addArticleHandler = async () => {
    console.log("标题", title);
    console.log("内容", value);

    if(title === "" || title === null) {
      message.warning("内容不能为空");
      return ;
    }

    if(value === null || value === "") {
      message.warning("内容不能为空");
      return ;
    }

    const res = await addArticle({title : title, content : value});

    if(res?.data && res?.code === 0) {
      message.success("提交成功");
      // console.log(res);
      history.push(`/article/${res?.data}`);
    } else {
      message.error("提交失败");
    }

  }
  return (
    <div style={{marginTop: 30}}>
      <Row justify={"center"}>
        <Col span={20}>
          <Card title={"文章发布"}>
            <Input value={title} onChange={(value) => {
              // console.log(value);
              setTitle(value.target.value);
            }} placeholder={"请输入文章标题"}></Input>
            <div style={{marginTop: 18}}></div>
          <MarkDownEdit value={value} setValue={setValue}></MarkDownEdit>
            <div style={{marginTop: 16}}>
              <Button onClick={addArticleHandler} style={{float: 'right'}}>提交</Button>
            </div>
          </Card>
          </Col>
      </Row>
    </div>
  );
};

export default Upload;
