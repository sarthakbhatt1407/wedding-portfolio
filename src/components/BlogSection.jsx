import React from "react";
import { Row, Col, Typography, Card, Button, Image } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import styled from "styled-components";

const { Title, Paragraph } = Typography;

const BlogContainer = styled.section`
  padding: 120px 0;
  background: #fff;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SectionTitle = styled(Title)`
  &.ant-typography {
    text-align: center;
    font-size: 2.5rem !important;
    font-weight: 300 !important;
    margin-bottom: 20px !important;
    color: #333 !important;
    font-family: "Playfair Display", serif !important;

    @media (max-width: 768px) {
      font-size: 2rem !important;
    }
  }
`;

const SectionSubtitle = styled(Paragraph)`
  &.ant-typography {
    text-align: center;
    color: #666;
    font-size: 1.1rem;
    margin-bottom: 60px !important;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const BlogCard = styled(Card)`
  &.ant-card {
    border: none;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    height: 100%;

    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
    }

    .ant-card-body {
      padding: 25px;
    }
  }
`;

const BlogImage = styled(Image)`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 15px 15px 0 0;
`;

const BlogMeta = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
  font-size: 0.9rem;
  color: #4a90a4;
`;

const BlogCategory = styled.span`
  background: #e8f4f8;
  color: #4a90a4;
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
`;

const BlogTitle = styled(Title)`
  &.ant-typography {
    font-size: 1.3rem !important;
    margin-bottom: 15px !important;
    color: #333 !important;
    font-weight: 600 !important;
    line-height: 1.4 !important;

    &:hover {
      color: #4a90a4 !important;
      cursor: pointer;
    }
  }
`;

const BlogExcerpt = styled(Paragraph)`
  &.ant-typography {
    color: #666;
    line-height: 1.7;
    margin-bottom: 20px !important;
    font-size: 0.95rem;
  }
`;

const ReadMoreButton = styled(Button)`
  &.ant-btn {
    border: none;
    background: transparent;
    color: #4a90a4;
    padding: 0;
    height: auto;
    font-weight: 500;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;

    &:hover {
      color: #2c5f75;
      background: transparent;
    }

    .anticon {
      margin-left: 8px;
      transition: all 0.3s ease;
    }

    &:hover .anticon {
      transform: translateX(5px);
    }
  }
`;

const BlogSection = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Best Invitation Ideas for Your Perfect Day",
      excerpt:
        "Ut vitae feugiat magna, ut mattis ligula. Aliquam ut rutrum est. Maecenas sit amet scelerisque lorem, vel cursus ante...",
      image:
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80",
      category: "Planning",
      author: "Anna Smith",
    },
    {
      id: 2,
      title: "Tender Love: Capturing Intimate Moments",
      excerpt:
        "Ut vitae feugiat magna, ut mattis ligula. Aliquam ut rutrum est. Maecenas sit amet scelerisque lorem, vel cursus ante...",
      image:
        "https://images.unsplash.com/photo-1525258090341-4d41665746ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
      category: "Photography",
      author: "Anna Smith",
    },
    {
      id: 3,
      title: "Into the Woods: Rustic Wedding Photography",
      excerpt:
        "Ut vitae feugiat magna, ut mattis ligula. Aliquam ut rutrum est. Maecenas sit amet scelerisque lorem, vel cursus ante...",
      image:
        "https://images.unsplash.com/photo-1460978812857-470ed1c77af0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1886&q=80",
      category: "Photography",
      author: "Anna Smith",
    },
  ];

  return (
    <BlogContainer>
      <Container>
        <SectionTitle level={2}>Read Our Blog</SectionTitle>
        <SectionSubtitle>
          Alienum phaedrum torquatos nec eu, vis detraxit periculis ex, nihil
          expetendis in mei.
        </SectionSubtitle>

        <Row gutter={[40, 40]}>
          {blogPosts.map((post) => (
            <Col xs={24} md={8} key={post.id}>
              <BlogCard>
                <BlogImage src={post.image} alt={post.title} preview={false} />
                <div>
                  <BlogMeta>
                    <BlogCategory>{post.category}</BlogCategory>
                    <span>{post.author}</span>
                  </BlogMeta>
                  <BlogTitle level={4}>{post.title}</BlogTitle>
                  <BlogExcerpt>{post.excerpt}</BlogExcerpt>
                  <ReadMoreButton icon={<ArrowRightOutlined />}>
                    Read More
                  </ReadMoreButton>
                </div>
              </BlogCard>
            </Col>
          ))}
        </Row>
      </Container>
    </BlogContainer>
  );
};

export default BlogSection;
