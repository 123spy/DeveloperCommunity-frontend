import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import '@umijs/max';
import React from 'react';

const GlobalFooter: React.FC = () => {
  const defaultMessage = '蚂蚁集团体验技术部出品';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      style={{
        // background: 'none',
        backgroundColor: "rgb(240,243,250)"
      }}
      copyright={`${currentYear} ${"开发者社区版权所有"}`}
    />
  );
};
export default GlobalFooter;
