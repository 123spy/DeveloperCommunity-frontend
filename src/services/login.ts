import axios from "axios";

/**
 * 登录
 * @param loginParams
 */
export async function userLogin(loginParams : any) {
  return axios.post("/user/login", {...loginParams})
    .then((res : any) => {
      return res;
    })
    .catch((err) => {
      return null;
    })
};

/**
 * 用户退出
 */
export async function userLogout() {
  return axios.post("/user/logout")
    .then((res:any) => {
      return res;
    })
    .catch((err:any) => {
      return null;
    })
}
