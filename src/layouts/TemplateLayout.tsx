import {ProLayout} from "@ant-design/pro-layout";
import logo from "@/assets/logo.png";
import defaultSettings from "../../config/defaultSettings";
import {history} from "umi";
import GlobalFooter from "@/components/GlobalFooter";
import {MenuDataItem} from "@umijs/route-utils";
import menu from "../../config/headerMenu";
import {Link, useAccess} from "@@/exports";
import styles from "./TemplateLayout.less";
import {BellOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import GlobalAvatar from "@/components/GlobalAvatar";
import {App} from "antd";

// 决定渲染什么
const menuDataRender = (menuList: MenuDataItem[], access: any) => {
  return menuList.filter((menuItem) => {
    return !menuItem.access || access[menuItem.access];
  });
};

const TemplateLayout = (props : any) => {
  const access = useAccess();

  return (
    <App>
    <div>
      <ProLayout
        title={"开发者社区"}
        logo={logo}
        {...props}
        {...defaultSettings}
        splitMenus
        onMenuHeaderClick={() => {history.push("/");}}
        footerRender={() => <GlobalFooter />}
        menuDataRender={() => menuDataRender(menu, access)}
        menuItemRender={(
          menuItemProps, defaultDom
        ) => {
          if(menuItemProps.isUrl || !menuItemProps.path) {
            return defaultDom;
          }
          return <Link style={{color: "black"}} to={menuItemProps.path}>{defaultDom}</Link>
        }}
        actionsRender={() => [
          <QuestionCircleOutlined key={"question"} style={{fontSize: 17, margin: "auto 10px"}} onClick={() => {history.push("/help")}} />,
          <BellOutlined key={"message"} style={{fontSize: 17, margin: "auto 10px"}} />
        ]}
        avatarProps={{
          render: () => <GlobalAvatar></GlobalAvatar>
        }}
      >
        {/*基础布局模板*/}
        <div className={styles.TemplateContent}>
          {props.children}
        </div>
      </ProLayout>
    </div>
    </App>
  )
};

export default TemplateLayout;
