import * as React from 'react';
import * as styles from  './HomeIndex.scss';
import { Button,Layout,Menu,Icon } from 'antd';
const { Header,Footer,Sider,Content } =Layout;
const SubMenu=Menu.SubMenu;

class HomeIndex extends React.Component{
    public render():JSX.Element{
        return(
            <Layout className={styles.homeIndex}>
                <Header className={styles.homeHeader}>Header</Header>
                <Layout>
                <Sider>
                <Button type="primary"  style={{ marginBottom: 16 }}>
                <Icon type={'menu-unfold'} />
                </Button>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                >
                    <Menu.Item key="1">
                    <Icon type="pie-chart" />
                    <span>Option 1</span>
                    </Menu.Item>
                    <Menu.Item key="2">
                    <Icon type="desktop" />
                    <span>Option 2</span>
                </Menu.Item>
                <Menu.Item key="3">
                <Icon type="inbox" />
                <span>Option 3</span>
                </Menu.Item>
                <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
                    <Menu.Item key="5">Option 5</Menu.Item>
                    <Menu.Item key="6">Option 6</Menu.Item>
                    <Menu.Item key="7">Option 7</Menu.Item>
                    <Menu.Item key="8">Option 8</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}>
                    <Menu.Item key="9">Option 9</Menu.Item>
                    <Menu.Item key="10">Option 10</Menu.Item>
                <SubMenu key="sub3" title="Submenu">
                    <Menu.Item key="11">Option 11</Menu.Item>
                    <Menu.Item key="12">Option 12</Menu.Item>
                </SubMenu>
                </SubMenu>
                </Menu>
                </Sider>
                <Content className={styles.homeContent}>
                    Content
                </Content>
                </Layout>
                <Footer className={styles.homeFooter}>Footer</Footer>
            </Layout>
        )
    }
}

export default HomeIndex;