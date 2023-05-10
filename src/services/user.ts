import axios from "axios";

export interface registerParamsType {
  userPhone:string,
  userPassword:string
}

/**
 * 注册
 */
export async function userRegister(params : registerParamsType) {
  return axios.post("/user/register", {...params})
    .then((res : any) => {
      return res;
    })
    .catch((err:any) => {
      return null;
    })

}


/**
 * 获取当前登录用户
 */
export async function getLoginUser() {
  return axios.get("/user/get/login")
    .then((res:any) => {
      // console.log("获取当前用户成功", res);
      return res;
    })
    .catch((e:any) => {
      // console.log("获取用户失败", e);
      return null;
    });
};

/**
 * 添加用户
 */
export async function addUser(addUserParams : any) {
  return axios.post("/user/add", {...addUserParams})
    .then((res : any) => {
      return res?.data;
    })
    .catch((err : any) => {
      return false;
    })
}

/**
 * 删除用户
 */
export async function deleteUser(id : number) {
  return axios.get("/user/delete", {params : {id : id}})
    .then((res : any) => {
      return res;
    })
    .catch((err:any) => {
      return null;
    })
}

/**
 * 修改用户信息
 */
export async function updateUser(params:any) {
  return axios.post("/user/update", {...params})
    .then((res:any) => {
      return res;
    })
    .catch((err:any) => {
      return null;
    })
}

/**
 * 根据ID查询用户
 */
export async function getUserById(id:number) {
  return axios
    .get("/user/get", {params: {id: id}})
    .then((res:any) => {
      // console.log("获取用户信息成功", res);
      return res;
    })
    .catch((err:any) => {
      // console.log("获取用户信息失败", err);
      return null;
    })
};

/**
 * 分页查询用户
 */
export async function getUserByPage(params:any) {
  return axios.post("/user/list/page", params)
    .then((res:any) => {
      // console.log("获取用户成功", res);
      return res;
    })
    .catch((e:any) => {
      // console.log("获取用户失败", e);
      return null;
    });
};
