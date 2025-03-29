import { Layout, Menu, MenuProps } from 'antd'
import logo from '../assets/images/logo.png'
import {
    AppstoreOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
const { Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        key: 'categories',
        label: 'Categories',
        type: 'group',
        children: [
            {
                key: '9', label: 'Option 9', icon: <AppstoreOutlined />, children: [
                    { key: '9-1', label: 'Option 9-1' },
                    { key: '9-2', label: 'Option 9-2' },
                ]
            },
            { key: '10', label: 'Option 10' },
            { key: '11', label: 'Option 11' },
            { key: '12', label: 'Option 12' },
        ],
    },
    {
        key: 'grp',
        label: 'Product',
        type: 'group',
        children: [
            { key: '13', label: 'Products' },
            { key: '14', label: 'Add Product' },
        ],
    },
];

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
                items={items}
            />
        </Sider>
    )
}

export default Sidebar