import React, { useState } from 'react';
import {Upload, message, Spin} from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {avatarUploadLocal} from "@/services/upload";

const ImgUpload = (props:any) => {
  const {imageUrl, setImageUrl} = props;
  const [loading, setLoading] = useState(false);

  const uploadAvatar = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await avatarUploadLocal(formData);
      if(res?.code === 0 && res?.data) {
        setImageUrl(res?.data);
        message.success("上传成功");
      } else {
        message.error("上传失败");
        return ;
      }
    } catch (err) {
      message.error("上传失败");
    } finally {
      setLoading(false);
    }
  };

  const beforeUpload = (file) => {
    setLoading(true);
    uploadAvatar(file);
    return false; // 返回false，阻止Antd的Upload组件自动上传文件
  };

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      return;
    }
    if (info.file.status === 'done') {
      setImageUrl(info.file.response.url);
      setLoading(false);
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传头像</div>
    </div>
  );

  return (
    <div>
      { loading && <Spin></Spin> }
      {!loading &&
        <>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{width: '100%'}}/>
            ) : (
              uploadButton
            )}
          </Upload>
        </>
      }
    </div>
  );
};

export default ImgUpload;
