import {Button, Result} from "antd";
import {history} from "umi";

const NotFound = () => {
  return (
    <Result
      style={{backgroundColor: "white"}}
      status={"404"}
      title={"404"}
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button type="primary" onClick={() => {history.push("/")}}>返回首页</Button>}
    ></Result>
  );
};

export default NotFound;
