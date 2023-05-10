import axios from "axios";
import {registerParamsType} from "@/services/user";

/**
 * 上传用户头像-OSS
 */
export async function avatarUploadOss(params : any) {
  return axios.post("/util/uploadFileOss", params, {headers: {'Content-Type': 'multipart/form-data'}})
    .then((res : any) => {
      return res;
    })
    .catch((err:any) => {
      return null;
    })
}

/**
 * 上传用户头像-本地
 */
export async function avatarUploadLocal(params : any) {
  console.log("上传");
  return axios.post("/util/uploadFileLocal", params, {headers: {'Content-Type': 'multipart/form-data'}})
    .then((res : any) => {
      console.log(res);
      return res;
    })
    .catch((err:any) => {
      return null;
    })
}
