import {Card, Col, Row} from "antd";
import HelpBox from "@/components/HelpBox";

const Help = () => {
  return (
    <div style={{marginTop: 30}}>
      <Row align={"middle"} justify={"center"}>
        <Col span={18}>
          <Card title={"问题反馈"}>
            <HelpBox></HelpBox>
          </Card>
        </Col>
      </Row>
    </div>
  )
};

export default Help;
