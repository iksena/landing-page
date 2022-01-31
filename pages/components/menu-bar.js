import { Menu } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';

function MenuBar({ pages }) {
  const { query } = useRouter();

  return (
    <Menu theme="dark" mode="horizontal" selectedKeys={[query.id]}>
      {pages.map(({ id, name }) => <Menu.Item key={id}><Link href={`/${id}`}>{name}</Link></Menu.Item>)}
    </Menu>
  );
}

export default MenuBar;
