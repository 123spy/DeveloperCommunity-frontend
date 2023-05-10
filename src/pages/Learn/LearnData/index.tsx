import {Layout, Menu} from "antd";
import Sider from "antd/es/layout/Sider";

const items = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const LearnData = () => {
  return (
    <div style={{width: "100%", minHeight: "140vh", backgroundColor: "rgb(245, 245, 245)"}}>
      <Layout>
        <Sider
          theme={"light"}
          width={240}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{
              height: '100%',
              borderRight: 0,
            }}
            items={items}
          />
        </Sider>
      </Layout>
    </div>)
};
export default LearnData;
