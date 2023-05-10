import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import defaultSettings from '../config/defaultSettings';
import React from 'react';
import './plugins/axios';
import "./plugins/moment";
import "./plugins/day";
import {CurrentUser} from "@/modals/User";
import {getLoginUser} from "@/services/user";

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
    const res = await getLoginUser();

    if(res?.code === 0 && res?.data) {
      return {
        currentUser: res?.data,
        settings: defaultSettings as Partial<LayoutSettings>,
      };
    }


    return {
      currentUser : null,
      settings: defaultSettings as Partial<LayoutSettings>,
    };
}

export const layout = () => {
  return {
    menuHeaderRender: undefined,
    headerRender: false,
  }
}
