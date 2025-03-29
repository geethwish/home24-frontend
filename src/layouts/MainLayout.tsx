import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import FooterSection from '../components/Footer';

import HeaderSection from '../components/Header';
import Sidebar from '../components/Sidebar';


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
                        {/* {lastModifiedProduct && <LastModifiedProductWidget productName={lastModifiedProduct} />} */}
                        <Outlet />
                    </Content>
                    <FooterSection />
                </Layout>
            </Layout>
        </Layout>
    )
}

export default MainLayout