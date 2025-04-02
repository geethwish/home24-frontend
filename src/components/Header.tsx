import { Avatar, Button, Dropdown, Layout, MenuProps } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { toggleMenuCollapse } from '../redux/slices/themeSettings.slice';
import { getNameInitials } from '../utils/getNameInitials';
import { logout } from '../redux/slices/user.slice';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;



const HeaderSection = () => {
    const isCollapsed = useSelector((state: RootState) => state.themeSettings.isMenuCollapsed);
    const userDetails = useSelector((state: RootState) => state.user.userDetails);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Handle toggle menu collapse
    const handleToggleMenu = () => {
        dispatch(toggleMenuCollapse())
    }

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: 'Logout',
            icon: <LogoutOutlined />,
            extra: '',
            onClick: () => {
                dispatch(logout());
                navigate('/login');

            }
        },
    ];

    return (
        <Header className="text-white flex justify-between items-center" style={{ backgroundColor: '#ffff', paddingLeft: 0 }}>
            <Button
                className='p-0 m-0 bg-primary'
                type="link"
                icon={isCollapsed ? <FaArrowRightLong /> : <FaArrowLeftLong />}
                onClick={handleToggleMenu}
                style={{
                    fontSize: '24px',
                    width: 64,
                    height: 64,
                }}
            />
            <Dropdown menu={{ items }} placement='bottomCenter' trigger={['click']}>
                <Avatar size={40}>{getNameInitials(userDetails?.user?.name)}</Avatar>
            </Dropdown>
        </Header>

    )
}

export default HeaderSection