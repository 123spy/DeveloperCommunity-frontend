import axios from "axios";

/**
 * 添加文章
 */
export async function addArticle(params : any) {
  return axios.post("/article/add", {...params})
    .then((res : any) => {
      return res;
    })
    .catch((err : any) => {
      return null;
    })
};

/**
 * 根据ID查询文章
 */
export async function getArticleById(id:number) {
  return axios
    .get("/article/get", {params: {id: id}})
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
 * 删除文章
 */
export async function deleteArticle(id : number) {
  return axios.get("/article/delete", {params : {id : id}})
    .then((res : any) => {
      return res;
    })
    .catch((err:any) => {
      return null;
    })
}

/**
 * 分页查询文章
 */
export async function getArticleByPage(params:any) {
  return axios.post("/article/list/page", params)
    .then((res:any) => {
      // console.log("获取用户成功", res);
      return res;
    })
    .catch((e:any) => {
      // console.log("获取用户失败", e);
      return null;
    });
};

/**
 * 分页查询文章
 */
export async function searchArticle(params:any) {
  return axios.post("/article/search/page", params)
    .then((res:any) => {
      // console.log("获取用户成功", res);
      return res;
    })
    .catch((e:any) => {
      // console.log("获取用户失败", e);
      return null;
    });
};

/**
 * 修改文章信息
 */
export async function updateArticle(params:any) {
  return axios.post("/article/update", {...params})
    .then((res:any) => {
      return res;
    })
    .catch((err:any) => {
      return null;
    })
}
