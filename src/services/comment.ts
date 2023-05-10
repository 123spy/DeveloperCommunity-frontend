import axios from "axios";

/**
 * 添加评论
 */
export async function addComment(params : any) {
  return axios.post("/comment/add", {...params})
    .then((res : any) => {
      return res;
    })
    .catch((err : any) => {
      return null;
    })
}

/**
 * 删除文章
 */
export async function deleteComment(id : number) {
  console.log(id);
  return axios.get("/comment/delete", {params: {id: id}})
    .then((res : any) => {
      return res?.data;
    })
    .catch((err:any) => {
      return false;
    })
}
