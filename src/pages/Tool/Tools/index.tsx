import {Card, Col, Empty, Row} from "antd";

const Tools = () => {
  return (
    <div style={{ marginTop: 30, marginBottom: 30 }}>
      <Row justify={"center"}>
        <Col span={20}>
          <Card title={"开发工具"}>
            <Empty></Empty>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Tools;
