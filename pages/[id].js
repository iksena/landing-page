import {
  Layout, Image, List, BackTop, Row, PageHeader, Carousel,
} from 'antd';
import Head from 'next/head';
import NextImage from 'next/image';
import ReactPlayer from 'react-player/youtube';

import Link from 'next/link';
import { getPosts, getPostById } from '../lib/baserow';
import MenuBar from '../components/menu-bar';

const {
  Header, Footer, Content,
} = Layout;

function Post({
  title, images, posts, description, video, slides,
}) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout className="layout">
        <BackTop />
        <Header style={{ background: '#f6f3f2' }}>
          <Row align="middle">
            <Link href="/" passHref>
              <NextImage src="/logo.webp" layout="fixed" width="310" height="44" />
            </Link>
            <MenuBar pages={posts} />
          </Row>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <PageHeader
            style={{ border: '1px solid rgb(235, 237, 240)' }}
            title={title}
            subTitle={description}
          />
          <Carousel
            autoplay
            effect="fade"
            style={{
              color: 'blue',
              lineHeight: '160px',
              textAlign: 'center',
              marginVertical: 16,
            }}
          >
            {!!video && (<ReactPlayer url={video} height="30vw" width="100%" />)}
            {!!slides && slides.map((slide, key) => (
              <div key={slide.url}><Image src={slide.url} alt={key} preview={false} /></div>
            ))}
          </Carousel>
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
