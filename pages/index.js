import {
  BackTop, Card, Image, Layout, List, Row,
} from 'antd';
import Head from 'next/head';
import NextImage from 'next/image';
import Link from 'next/link';

import MenuBar from '../components/menu-bar';
import { getPosts } from '../lib/baserow';

const {
  Header, Footer, Content,
} = Layout;

function Home({ posts }) {
  return (
    <>
      <Head>
        <title>Hyundai Alam Sutera</title>
        <meta name="description" content="Website Hyundai Alam Sutera" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout className="layout">
        <BackTop />
        <Header style={{ background: '#f6f3f2' }}>
          <Row align="middle">
            <NextImage src="/logo.webp" layout="fixed" width="310" height="44" />
            <MenuBar pages={posts} />
          </Row>
        </Header>
        <Content style={{ padding: '50px 50px' }}>
          <List
            dataSource={posts}
            grid={{ gutter: 50, column: 4 }}
            renderItem={(post) => (
              <Link href={`/${post.id}`} passHref>
                <Card
                  style={{ width: 350 }}
                  cover={(
                    <Image
                      preview={false}
                      alt={post.name}
                      src={post.images?.[0]?.url}
                    />
                  )}
                  hoverable
                >
                  <Card.Meta
                    title={post.title}
                    description={post.description}
                  />
                </Card>
              </Link>
            )}
          />
        </Content>
      </Layout>

      <Footer style={{ textAlign: 'center' }}>
        Powered by
        {' '}
        <a
          href="https://sena.omg.lol"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>
            Sena Aji
          </span>
        </a>
      </Footer>
    </>
  );
}

export default Home;

export async function getServerSideProps() {
  const { data: { results: posts } } = await getPosts();

  return {
    props: {
      posts,
    },
  };
}
