import {Avatar, Button, Col, Divider, Popover, Row, Space, Tag} from "antd";
import {useModel} from "@umijs/max";
import {CurrentUser} from "@/modals/User";
import {LogoutOutlined, RightOutlined} from "@ant-design/icons";
import styles from "./index.less";
import {userLogout} from "@/services/login";
import {history} from "umi";
import {Link} from "@@/exports";

const content = () => {

  const {initialState, setInitialState} = useModel("@@initialState");
  const {currentUser} = initialState;

  const logoutHandler = async () => {
    const res = await userLogout();
    if(res?.code === 0) {
      setInitialState({
        ...initialState,
        currentUser: null
      })
    }
  }

  return (
    <div style={{width: 200}}>
      {/*头像信息*/}
      <div>
        <Row justify={"center"}>
          <Col style={{display: "flex"}} span={24}>
            <div style={{display: "flex",flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "0 15px"}}>
              <span>{currentUser?.userName ?? "暂无"}</span>
            </div>
          </Col>
        </Row>
      </div>

      <div style={{marginTop: 20}}>
        <Row>
          <Col span={24}>
            <Link to={`/account/${currentUser?.id}`}>
              <div className={styles.avatarMenuItem}>
                <span>用户中心</span>
                <RightOutlined />
              </div>
            </Link>
          </Col>
          {/*<Col style={{marginTop: 6}} span={24}>*/}
          {/*  <div className={styles.avatarMenuItem}>*/}
          {/*    <span>系统设置</span>*/}
          {/*    <RightOutlined />*/}
          {/*  </div>*/}
          {/*</Col>*/}
          <Col style={{marginTop: 6}} span={24}>
            <Link to={`/account/${currentUser?.id}/profile`}>
              <div className={styles.avatarMenuItem}>
                <span>个人资料</span>
                <RightOutlined />
              </div>
            </Link>
          </Col>
        </Row>
      </div>
      <Divider style={{margin: 5}} />
      <div onClick={logoutHandler} className={styles.avatarMenuItem}>
        <span>退出</span>
        <LogoutOutlined />
      </div>
    </div>
  )};

const GlobalAvatar = () => {

  const {initialState} = useModel("@@initialState");
  // @ts-ignore
  const {currentUser}:{currentUser : CurrentUser} = initialState;

  return currentUser?.id && currentUser ? (
    <div>
      <Popover
        placement="bottom"
        // title={currentUser?.userName}
        content={content}
        trigger="click"
      >
        <Avatar size={30} src={currentUser?.userAvatar}></Avatar>
      </Popover>
    </div>
  ) : (
    <Space>
      <Link to={"/user/login"} style={{color: "rgb(89,89,89)"}}>
        登录
      </Link>
      &nbsp;
      <span style={{color: "rgb(140,140,140)"}}>或</span>
      &nbsp;
      <Link to={"/user/register"} style={{color: "rgb(89,89,89)"}}>
        注册
      </Link>
    </Space>
  )
};

export default GlobalAvatar;
