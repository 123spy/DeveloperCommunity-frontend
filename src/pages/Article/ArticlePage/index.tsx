import { useParams } from "@@/exports";
import React, { useEffect, useState } from "react";
import { Col, Row, Skeleton } from "antd";
import { getArticleById } from "@/services/article";
import ArticleContent from "@/pages/Article/ArticlePage/component/ArticleContent";
import CommentContent from "@/pages/Article/ArticlePage/component/CommentContent";
import NotFound from "@/components/NotFound";

const ArticlePage = () => {
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState(null);
  const { id }: { id: number } = useParams();

  const loadData = async () => {
    const res = await getArticleById(id);
    if (res?.data && res?.code === 0) {
      setArticle(res?.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    if (isNaN(parseInt(id))) {
      setLoading(false);
      return;
    }
    loadData();
  }, [id]);

  return (
    <div style={{ marginTop: 30, marginBottom: 30 }}>
      <Skeleton loading={loading}>
        {article?.id ? (
          <div style={{ marginTop: 30 }}>
            <Row justify={"center"}>
              <Col span={18}>
                <ArticleContent article={article}></ArticleContent>
              </Col>

              <Col style={{ marginTop: 16 }} span={18}>
                <CommentContent article={article} loadData={loadData}></CommentContent>
              </Col>
            </Row>
          </div>
        ) : (
          <div>
            <NotFound></NotFound>
          </div>
        )}
      </Skeleton>
    </div>
  );
};

export default ArticlePage;
