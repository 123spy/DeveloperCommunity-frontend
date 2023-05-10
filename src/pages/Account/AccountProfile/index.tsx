import {Button, Card, Col, Form, Input, message, Row, Select, Skeleton, Space, Spin, Upload} from "antd";
import { useOutletContext, useParams } from "@@/exports";
import { useEffect, useState } from "react";
import {getUserById, updateUser} from "@/services/user";
import NotFound from "@/components/NotFound";
import {currentUser} from "@/services/ant-design-pro/api";
import {useModel} from "@umijs/max";
import ImgUpload from "@/components/ImgUpload";

const AccountProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const {initialState, setInitialState} = useModel("@@initialState");
  const {currentUser} = initialState;
  const [password, setPassword] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const loadData = async () => {
    setLoading(true);
    const res = await getUserById(id);
    if (res?.data && res?.code == 0) {
      setUser(res?.data);
      setImageUrl(res?.data?.userAvatar);
    } else {
    }
    setLoading(false);
  };

  const updateUserHandler = async () => {

    // 前端对数据进行检查
    if(currentUser.userRole === "admin") {
      // 如果是管理员，无需进行管理
    } else if(currentUser?.id === id) {
      // 如果是普通用户
      const {userPassword, userRole} = user;
      if(userPassword || userRole) {
        message.warning("无权修改");
        return ;
      }
    } else {
      message.warning("无权修改");
    }
    const res = await updateUser({...user, password : password, userAvatar : imageUrl});
    if(res?.code === 0 && res?.data) {
      setInitialState((preState) => {
        return {
          ...preState,
          currentUser : user,
          userAvatar : imageUrl
        }
      });
      message.success("更新成功");
    } else {
      message.error("更新失败");
    }
  };
  useEffect(() => {
    setLoading(true);

    loadData();

    setLoading(false);
  }, []);

  return (
    <div style={{ marginTop: 30 }}>
      <Skeleton loading={loading}>
        {((user?.id === currentUser?.id && currentUser?.id && user?.id) || currentUser?.userRole === "admin") && (
          <Row justify={"center"}>
            <Col span={18}>
              <Card title={"用户信息编辑"}>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems: "center" }}>
                  <div style={{ marginTop: 20, display: "flex", justifyContent: "space-around", alignItems: "center", width: "35%" }}>
                    <span style={{ width: 100, margin: "0 30px" }}>用户名: </span>
                    <Input
                      style={{ width: "40%" }}
                      placeholder={"请输入用户名"}
                      value={user?.userName}
                      onInput={(e) => {
                        setUser((prevState) => {
                          return { ...prevState, userName: e.target.value };
                        });
                      }}
                    ></Input>
                  </div>

                  <div style={{ marginTop: 20, display: "flex", justifyContent: "space-around", alignItems: "center", width: "35%" }}>
                    <span style={{ width: 100, margin: "0 30px" }}>手机: </span>
                    <Input
                      style={{ width: "40%" }}
                      placeholder={"请输入手机号"}
                      value={user?.userPhone}
                      onInput={(e) => {
                        setUser((prevState) => {
                          return { ...prevState, userPhone: e.target.value };
                        });
                      }}
                    ></Input>
                  </div>

                  {/*非管理员，无法在本页面进行更新密码*/}
                  {currentUser?.userRole === "admin" &&
                    <div style={{
                      marginTop: 20,
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                      width: "35%"
                    }}>
                      <span style={{width: 100, margin: "0 30px"}}>密码: </span>
                      <Input
                        style={{width: "40%"}}
                        placeholder={"请输入用户密码"}
                        value={password}
                        onInput={(e) => {
                          setPassword(e.target.value);
                        }}
                      ></Input>
                    </div>
                  }

                  {/*非管理员，无法在本页面进行更新密码*/}
                  {currentUser?.userRole === "admin" &&
                    <div style={{
                      marginTop: 20,
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                      width: "35%"
                    }}>
                      <span style={{width: 100, margin: "0 30px"}}>身份: </span>
                      <Select
                        defaultValue="admin"
                        style={{
                          width: 120,
                        }}
                        onChange={(value) => {
                          setInitialState((preState) => {
                            return {
                              ...preState,
                              ...currentUser,
                              userRole : value
                            }
                          })
                          console.log(value)}}
                        options={[
                          {
                            value: 'admin',
                            label: '管理员',
                          },
                          {
                            value: 'user',
                            label: '用户',
                          },
                        ]}
                      />
                    </div>
                  }

                  <div style={{ marginTop: 20, display: "flex", justifyContent: "space-around", alignItems: "center", width: "35%" }}>
                    <span style={{ width: 100, margin: "0 30px" }}>头像: </span>
                    <div style={{ width: "40%" }}>
                      <ImgUpload imageUrl={imageUrl} setImageUrl={setImageUrl}></ImgUpload>
                    </div>
                  </div>


                  <div style={{ marginTop: 20, display: "flex", justifyContent: "space-around", alignItems: "center", width: "40%" }}>
                    <div style={{ width: "40%" }}>
                      <Button onClick={updateUserHandler}>提交</Button>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        )}
        {!((user?.id === currentUser?.id && currentUser?.id && user?.id) || currentUser?.userRole === "admin") && <NotFound></NotFound>}
      </Skeleton>
    </div>
  );
};

export default AccountProfile;
