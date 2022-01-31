import { Layout, Menu } from 'antd';
import Head from 'next/head';
import Image from 'next/image';

import { getPosts, getPostById } from '../lib/baserow';

const {
  Header, Footer, Content,
} = Layout;

function Post({
  title, id, name, images,
}) {
  return (
    <>
      <Head>
        <title>{name}</title>
        <meta name="description" content={title} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            {new Array(7).fill(null).map((_, index) => {
              const key = index + 1;
              return <Menu.Item key={key}>{`nav ${key}`}</Menu.Item>;
            })}
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          {title}
          {id}
          {images.map((image) => (
            <Image
              key={image.uploaded_at}
              src={image.url}
              alt={image.name}
              width={100}
              height="100%"
            />
          ))}
        </Content>
      </Layout>

      <Footer style={{ textAlign: 'center' }}>
        <a
          href="https://sena.omg.lol"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by
          {' '}
          <span>
            I Komang Sena Aji Buwana
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
  const { data } = await getPostById(params.id);

  return {
    props: {
      ...data,
    },
  };
}
