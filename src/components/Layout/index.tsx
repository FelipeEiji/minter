import { Layout as AntdLayout, Menu } from 'antd';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import styles from './styles.module.css'

const { Header, Content, Footer } = AntdLayout;



export type LayoutProps = {
  children: React.ReactNode
}

const MinterLayout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter() 

  const items = useMemo(() => [
    { label: 'Store', key: '/store', onClick: () => router.push('/store') },
    { label: 'My NFTs', key: '/my-nfts', onClick: () => router.push('/my-nfts') },
    { label: 'Mint', key: '/mint', onClick: () => router.push('/mint') },
  ], []);

  return (
  
    <AntdLayout className="layout">
      <Header className={styles.header} >
        <div className={styles.navContainer}>
          <img className={styles.logo} src="/logo.svg" />
          <Menu
            className={styles.nav}
            theme="dark"
            mode="horizontal"
            // defaultSelectedKeys={[router.pathname]}
            items={items}
          />
        </div>
        
      </Header>
      <Content className={styles.content}  style={{ marginTop: 16 }}>
        {children}
      </Content>
      <Footer style={{ textAlign: 'center' }}>Minter 2022</Footer>
    </AntdLayout>
  )
};

export default MinterLayout;
