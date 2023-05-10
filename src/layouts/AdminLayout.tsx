import TemplateLayout from "@/layouts/TemplateLayout";
import {Outlet, useAccess} from "@@/exports";
import NotFound from "@/components/NotFound";
import {Layout, Menu} from "antd";
import Sider from "antd/es/layout/Sider";
import {Content} from "antd/es/layout/layout";
import {AppstoreOutlined, EditOutlined, MailOutlined, SettingOutlined, UserOutlined} from "@ant-design/icons";
import {history, useLocation} from "umi";
const items = [
  {
    label: '用户管理',
    key: 'user',
    icon: <UserOutlined />,
  },
  {
    label: '文章管理',
    key: 'article',
    icon: <EditOutlined />,
  },
];
const AdminLayout = () => {
  const current = useLocation().pathname.split("/")[2].toString();
  const access = useAccess();

  const onClick = (value) => {
    history.push(`/admin/${value.key}/1/30`);
  }

  return access?.canAdmin ? (
    <TemplateLayout>
      <Outlet></Outlet>
    </TemplateLayout>
  ) : (
    <NotFound></NotFound>
  )
};

export default AdminLayout;
