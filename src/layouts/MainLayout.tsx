import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import FooterSection from '../components/Footer';

import HeaderSection from '../components/Header';
import Sidebar from '../components/Sidebar';
import LastModifiedProduct from '../components/product/LastModifiedProduct';
import CountCard from '../components/product/CountCard';
import {
    UnorderedListOutlined, ProductOutlined
} from '@ant-design/icons';

const { Content } = Layout;
const MainLayout = () => {
    return (
        <Layout style={{ minHeight: '100vh' }}>

            <Layout>
                <Sidebar />
                <Layout>
                    <HeaderSection />
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        <div className="flex  gap-2 flex-wrap">
                            <LastModifiedProduct productName={"Lorem Ipsum"} title='Last Modified Product' />
                            <LastModifiedProduct productName={"Lorem Ipsum"} title='Recently Added Product' />
                            <CountCard title='Categories' count={14} icon={<UnorderedListOutlined size={48} />} />
                            <CountCard title='Products' icon={<ProductOutlined />} count={200} />
                        </div>


                        <Outlet />
                    </Content>
                    <FooterSection />
                </Layout>
            </Layout>
        </Layout>
    )
}

export default MainLayout