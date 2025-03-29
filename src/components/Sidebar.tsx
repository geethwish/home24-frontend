import { Layout, Menu } from 'antd'
import logo from '../assets/images/logo.png'
import {
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
const { Sider } = Layout;

const Sidebar = () => {
    const isCollapsed = useSelector((state: RootState) => state.themeSettings.isMenuCollapsed);
    return (
        <Sider trigger={null} collapsible collapsed={isCollapsed} style={{ backgroundColor: '#ffff' }} >

            <div className='flex flex-col justify-center items-center'>
                <img
                    src={logo}
                    alt={"Home24 BXP Logo"}
                    loading="lazy"
                    className="w-16 h-16"
                />
                {
                    !isCollapsed && <h3 className='text-primary font-bold text-2xl'>
                        Home24 BXP
                    </h3>
                }

            </div>
            <Menu
                theme="light"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={[
                    {
                        key: '1',
                        icon: <UserOutlined />,
                        label: 'nav 1',
                    },
                    {
                        key: '2',
                        icon: <VideoCameraOutlined />,
                        label: 'nav 2',
                    },
                    {
                        key: '3',
                        icon: <UploadOutlined />,
                        label: 'nav 3',
                    },
                ]}
            />
        </Sider>
    )
}

export default Sidebar