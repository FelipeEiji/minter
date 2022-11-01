import { Layout as AntdLayout, Menu } from 'antd';
import React from 'react';
import styles from './styles.module.css'

const { Header, Content, Footer } = AntdLayout;

const items = [
  { label: 'Store', key: '1' },
  { label: 'My NFTs', key: '2' },
  { label: 'Mint', key: '3' },
];

export type LayoutProps = {
  children: React.ReactNode
}

const MinterLayout: React.FC<LayoutProps> = ({ children }) => (
  <AntdLayout className="layout">
    <Header className={styles.header} >
      <div className={styles.navContainer}>
        <img className={styles.logo} src="/logo.svg" />
        <Menu
          className={styles.nav}
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={items}
        />
      </div>
      
    </Header>
    <Content className={styles.content}>
      {children}
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </AntdLayout>
);

export default MinterLayout;
