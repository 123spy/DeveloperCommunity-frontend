import { Link, useParams } from "@@/exports";
import { useEffect, useState } from "react";
import {deleteUser, getUserByPage} from "@/services/user";
import {
  DatePicker,
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Collapse,
  Descriptions,
  Input,
  Pagination,
  Popconfirm,
  Row,
  Select,
  Skeleton,
  Space,
  Table,
  Tag,
  message
} from "antd";
const { RangePicker } = DatePicker;
import { history } from "umi";
import { formatDateStr } from "@/utils/utils";
import { Panel } from "rc-collapse";
import {Dayjs} from "dayjs";
import {deleteArticle, getArticleByPage} from "@/services/article";
import {UserOutlined} from "@ant-design/icons";


const ArticleAdmin = () => {
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);
  const { current, pageSize }: { current: number; pageSize: number } = useParams();
  const [total, setTotal]: { total: number } = useState(null);

  const [id, setId] = useState(null);
  const [authorId, setAuthorId] = useState(null);
  const [title, setTitle] = useState(null);

  const [userPhone, setUserPhone] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [createTimeStart, setCreateTimeStart] = useState(null);
  const [createTimeEnd, setCreateTimeEnd] = useState(null);

  const [updateTimeStart, setUpdateTimeStart] = useState(null);
  const [updateTimeEnd, setUpdateTimeEnd] = useState(null);

  const loadData = async () => {
    // const res = await getUserByPage({current: current, pageSize: pageSize});
    const res = await getArticleByPage({current: current, pageSize: pageSize})
    if (res?.data && res?.code === 0) {
      // console.log(res);
      await setDataSource(res?.data?.records);
      await setTotal(res?.data.total);
    } else {
      message.error("请求失败");
    }

    setLoading(false);
  };

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      align: "center",
      render: (_, record) => {
        return (
          <Link style={{ color: "black" }} to={`/${record.id}`}>
            {record.id}
          </Link>
        );
      },
    },
    {
      title: "标题",
      dataIndex: "title",
      align: "center",
      render: (_, record) => {
        return <Link to={`/article/${record.id}`}>{record?.title}</Link>;
      },
    },
    {
      title: "作者",
      dataIndex: "userName",
      align: "center",
      render: (_, record) => {
        return <Link to={`/account/${record.id}`}>{record?.author?.userName}</Link>;
      },
    },
    {
      title: "头像",
      dataIndex: "userAvatar",
      render: (_, record) => {
        // console.log(record);
        return <Avatar shape={"square"} src={record?.author?.userAvatar} icon={<UserOutlined></UserOutlined>}></Avatar>;
      },
      align: "center",
    },
    {
      title: "更新日期",
      dataIndex: "updateTime",
      render: (_, record) => {
        return <span>{formatDateStr(record.updateTime)}</span>;
      },
      align: "center",
    },
    {
      title: "创建日期",
      dataIndex: "createTime",
      render: (_, record) => {
        return <span>{formatDateStr(record?.createTime)}</span>;
      },
      align: "center",
    },
    {
      title: "操作",
      render: (_, record) => {
        return (
          <Space wrap={true}>
            <Popconfirm
              title="删除任务"
              description="你确定执行此任务吗?"
              onConfirm={
                async () => {
                  const res = await deleteArticle(record?.id);
                  if(res?.code === 0 && res?.data) {
                    message.success("删除成功");
                    loadData();
                  }
                }
                // deleteUserHandler(record?.id)
              }
              okText="Yes"
              cancelText="No"
            >
              <Button type="link">删除</Button>
            </Popconfirm>
            <Button
              type={"link"}
              onClick={async () => {
                history.push(`/article/${record?.id}/edit`)
              }}
            >
              修改
            </Button>
          </Space>
        );
      },
      align: "center",
    },
  ];


  useEffect(() => {
    setLoading(true);
    loadData();
  }, [pageSize, current]);

  const onChange = (page: any) => {
    // console.log(page);
    const newPath = `/admin/user/${page}/${pageSize}`;
    // console.log(newPath);
    history.push(newPath);
  };

  const queryArticleHandler = async () => {

    setLoading(true);

    if(id !== null && isNaN(parseInt(id))) {
      message.warning("id数据错误，请输入正确数据");
      setLoading(false);
      return ;
    }

    if(authorId !== null && isNaN(parseInt(authorId))) {
      message.warning("作者id数据错误，请输入正确数据");
      setLoading(false);
      return ;
    }

    const res = await getArticleByPage({
      id: id,
      authorId : authorId,
      title : title,


      createTimeStart: createTimeStart,
      createTimeEnd: createTimeEnd,

      updateTimeStart: updateTimeStart,
      updateTimeEnd: updateTimeEnd,

      current: current,
      pageSize: pageSize
    });

    if(res?.code === 0 && res?.data) {
      await setDataSource(res?.data?.records);
      await setTotal(res?.data.total);
    }
    setLoading(false);
  };

  const resetQueryUserHandler = async () => {
    setId(null);
    setTitle(null);
    setAuthorId(null);

    setCreateTimeStart(null);
    setCreateTimeEnd(null);

    setUpdateTimeStart(null);
    setUpdateTimeEnd(null);

  };


  const onRangeCreateTimeChange = (date: Dayjs) => {
    if (date) {
      // console.log('开始Date: ', date[0].$d);
      setCreateTimeStart(date[0]?.$d);
      // console.log('结束Date: ', date[1].$d);
      setCreateTimeEnd(date[1]?.$d);
    } else {
      // console.log('Clear');
    }
  }

  const onRangeUpdateTimeChange = (date: Dayjs) => {
    if (date) {
      // console.log('开始Date: ', date[0].$d);
      setUpdateTimeStart(date[0]?.$d);
      // console.log('结束Date: ', date[1].$d);
      setUpdateTimeEnd(date[1]?.$d);
    } else {
      // console.log('Clear');
    }
  }

  return (
    <div style={{ marginTop: 30, marginBottom: 30 }}>
      <Row justify="center">
        <Col span={20}>
          <Row>
            {/*搜索框*/}
            <Col span={24}>
              <Card>
                <Descriptions bordered={true} title="文章查询" layout="horizontal">

                  <Descriptions.Item label="ID" span={1}>
                    <Input value={id} onInput={(e) => {
                      if(e.target.value === null || e.target.value === "") setId(null);
                      else setId(e?.target?.value);
                    }} placeholder="文章id" />
                  </Descriptions.Item>
                  <Descriptions.Item label="作者ID" span={1}>
                    <Input value={authorId} onInput={(e) => {
                      if(e.target.value === null || e.target.value === "") setAuthorId(null);
                      else setAuthorId(e?.target?.value);
                    }} placeholder="作者ID" />
                  </Descriptions.Item>
                  <Descriptions.Item label="标题">
                    <Input value={title} onInput={(e) => {
                      setTitle(e?.target?.value);
                    }} placeholder="标题" />
                  </Descriptions.Item>

                  <Descriptions.Item label="创建时间">
                    <RangePicker showTime onChange={onRangeCreateTimeChange}/>
                  </Descriptions.Item>
                  <Descriptions.Item label="更新时间">
                    <RangePicker showTime onChange={onRangeUpdateTimeChange}/>
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>

            <Col style={{ marginTop: 10 }} span={24}>

              <Card title={"用户管理"} style={{ padding: 0 }} extra={
                <Space>
                  <Button onClick={queryArticleHandler} type={"primary"}>查询</Button>
                  <Button onClick={resetQueryUserHandler}>重置</Button>
                </Space>
              }>
                <Row>
                  <Col style={{}} span={24}>
                    <Skeleton loading={loading}>
                      <Table rowKey={"id"} pagination={false} dataSource={dataSource} columns={columns}></Table>
                    </Skeleton>
                  </Col>
                  <Col span={24}>
                    <Pagination onChange={onChange} style={{ marginTop: 15, float: "right" }} defaultCurrent={current} pageSize={pageSize} total={total} />
                  </Col>
                </Row>
              </Card>

            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default ArticleAdmin;
