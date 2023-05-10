import {Outlet} from "@@/exports";
import TemplateLayout from "@/layouts/TemplateLayout";

const BasicLayout = () => {
  return (
    <TemplateLayout>
      <Outlet></Outlet>
    </TemplateLayout>
  )
};

export default BasicLayout;
