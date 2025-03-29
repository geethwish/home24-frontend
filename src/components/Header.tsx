import { Avatar, Button, Dropdown, Layout, MenuProps } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { toggleMenuCollapse } from '../redux/slices/themeSettings.slice';

const { Header } = Layout;

const items: MenuProps['items'] = [
    {
        key: '1',
        label: 'Logout',
        icon: <LogoutOutlined />,
        extra: '',
    },
];

const HeaderSection = () => {
    const isCollapsed = useSelector((state: RootState) => state.themeSettings.isMenuCollapsed);
    const dispatch = useDispatch();

    // Handle toggle menu collapse
    const handleToggleMenu = () => {
        dispatch(toggleMenuCollapse())
    }

    console.log(isCollapsed, 'isCollapsed');

    return (
        <Header className="text-white flex justify-between items-center" style={{ backgroundColor: '#ffff', paddingLeft: 0 }}>
            <Button
                className='p-0 m-0 bg-primary'
                type="link"
                icon={isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={handleToggleMenu}
                style={{
                    fontSize: '24px',
                    width: 64,
                    height: 64,
                }}
            />
            <Dropdown menu={{ items }} placement='bottomCenter' trigger={['click']}>
                <Avatar size={40}>G</Avatar>
            </Dropdown>
        </Header>

    )
}

export default HeaderSection