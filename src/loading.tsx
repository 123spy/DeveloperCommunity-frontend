import {Spin} from "antd";

const loading = () => {
  return (
    <div style={{height: "100vh",width: "100vw", display: "flex", alignItems: "center", justifyContent: "center"}}>
      <Spin tip={"加载中..."} size={"large"} />
    </div>
  );
};

export default loading;
