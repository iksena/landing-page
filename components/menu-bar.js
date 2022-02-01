import { Menu } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';

function MenuBar({ pages }) {
  const { query } = useRouter();

  return (
    <Menu mode="horizontal" selectedKeys={[query.id]} style={{ background: '#f6f3f2' }}>
      {pages.map(({ id, name }) => <Menu.Item key={id}><Link href={`/${id}`}>{name}</Link></Menu.Item>)}
    </Menu>
  );
}

export default MenuBar;
