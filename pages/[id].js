import {
  Layout, Image, List,
} from 'antd';
import Head from 'next/head';

import { getPosts, getPostById } from '../lib/baserow';
import MenuBar from './components/menu-bar';

const {
  Header, Footer, Content,
} = Layout;

function Post({
  title, images, posts,
}) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={title} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout className="layout">
        <Header>
          <div className="logo" />
          <MenuBar pages={posts} />
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Image.PreviewGroup>
            <List
              dataSource={images}
              grid={{ gutter: 50, column: 3 }}
              renderItem={(image) => (
                <Image
                  key={image.uploaded_at}
                  src={image.url}
                  alt={image.name}
                />
              )}
            />
          </Image.PreviewGroup>
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

export default Post;

export async function getStaticPaths() {
  const { data: { results } } = await getPosts();
  const paths = results.map(({ id }) => ({
    params: {
      id: String(id),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { data: { results: posts } } = await getPosts();
  const { data } = await getPostById(params.id);

  return {
    props: {
      ...data,
      posts,
    },
  };
}
