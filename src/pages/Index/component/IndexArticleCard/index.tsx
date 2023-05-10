import {Link} from "@@/exports";
import {Avatar, Card, Empty, List} from "antd";
import {formatDateStr} from "@/utils/utils";
import React from "react";
import {UserOutlined} from "@ant-design/icons";

const IndexArticleCard = (props:any) => {
  const {articleList} = props;

  return articleList ? (
    <Card title={"文章"} extra={<Link to={"/"}>更多</Link>}>
      <List
        dataSource={articleList}
        itemLayout="horizontal"
        renderItem={(item, index) => {
          return (
            <List.Item>
              <List.Item.Meta
                avatar={<Link to={`/account/${item?.author?.id}`}><Avatar src={item?.author?.userAvatar} icon={<UserOutlined></UserOutlined>} /></Link>}
                title={<Link to={`/article/${item?.id}`}>{item.title}</Link>}
                description={<span>{item?.author?.userName}在{formatDateStr(item?.updateTime)}时发表了{item?.title}</span>}
              />
            </List.Item>
          )
        }}
      >
      </List>
    </Card>
  ) : <Card title={"文章"}><Empty></Empty></Card>;
};

export default IndexArticleCard;
