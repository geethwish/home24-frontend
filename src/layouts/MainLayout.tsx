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
import { useEffect, useState } from 'react';
import api from '../services/api';
import { WidgetProps } from '../types';

const { Content } = Layout;
const MainLayout = () => {
    const [widgetData, setWidgetData] = useState<WidgetProps>(null);

    const fetchWidgetData = async () => {
        try {
            const response = await api.get('/support');
            setWidgetData(response.data);
        } catch (error) {
            console.error('Error fetching widget data:', error);
        }

    }

    useEffect(() => {
        fetchWidgetData();
        const interval = setInterval(() => {
            fetchWidgetData();
        }, 10000);

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

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
                            {
                                widgetData && widgetData.latestProduct && <LastModifiedProduct {...widgetData.latestProduct} title='Last Modified Product' />
                            }
                            {
                                widgetData && widgetData.recentlyAddedProducts && <LastModifiedProduct {...widgetData.recentlyAddedProducts} title='Recently Added Product' />
                            }



                            {
                                widgetData && widgetData.totalCategoriesCount && <CountCard title='Categories' count={widgetData.totalCategoriesCount} icon={<UnorderedListOutlined size={48} />} />
                            }

                            {
                                widgetData && widgetData.totalProductCount && <CountCard title='Products' icon={<ProductOutlined />} count={widgetData.totalProductCount} />

                            }

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