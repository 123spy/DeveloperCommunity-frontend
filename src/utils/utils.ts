import {history} from "@umijs/max";
import moment from "moment";
import dayjs from "dayjs";

const LOGINPATH = "/user/login";

/**
 * 跳转登陆界面
 */
export const toLoginPage = () => {
  history.replace({
    pathname: LOGINPATH,
    // search: stringify({
    //   redirect: window.location.href
    // })
  })
}

/**
 * 获得格式化日期字符串
 * @param time
 */
export const formatDateStr = (time: any) => {
  if (!time) {
    return '';
  }
  return moment(time)?.format('YYYY-MM-DD');
};

export const formDateStrFromNow = (time:any) => {
  if(!time) {
    return "";
  }
  return dayjs(time).startOf("seconds").fromNow();
  // return moment(time).startOf('seconds').fromNow();
}

/**
 * 检测是否为移动设备
 */
export const isMobile = () => {
  const deviceWidth = document.querySelector('body')?.offsetWidth;
  return deviceWidth && deviceWidth < 480;
};
