import { Layout, Menu, MenuProps } from 'antd'
import logo from '../assets/images/logo.png'
import {
    AppstoreOutlined,
    BranchesOutlined,
    CustomerServiceFilled,
    HomeFilled
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import api from '../services/api';
import { useEffect, useState } from 'react';
const { Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

interface Category {
    id: string;
    name: string;
    children: SubCategory[];
}

interface SubCategory {
    id: string;
    name: string;
    children: SubCategory[];
}


const Sidebar = () => {
    const isCollapsed = useSelector((state: RootState) => state.themeSettings.isMenuCollapsed);
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

    const getRandomIcon = (id: number) => {
        const icons = [<HomeFilled />, <BranchesOutlined />, <CustomerServiceFilled />];
        return icons[id];
    };
    const reArrangeMenuItems = (categories: Category[]) => {

        // CHeck for unlimited subcategories
        const transformCategoriesToMenuItems = (categories: Category[]): MenuItem[] => {
            return categories.map((category: Category, index: number) => ({
                key: category.id,
                label: category.name,
                icon: category.children && category.children.length > 0 ? getRandomIcon(index) : null,
                type: category.children && category.children.length > 0 ? 'submenu' : 'item',
                children: category.children && category.children.length > 0
                    ? transformCategoriesToMenuItems(category.children)
                    : undefined,
            }));
        };

        const transformedItems: MenuItem[] = transformCategoriesToMenuItems(categories);


        const temporaryItems: MenuItem[] = [
            {
                key: 'categories',
                label: 'Categories',
                type: 'group',
                children: [
                    ...transformedItems
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
        ]

        setMenuItems(temporaryItems);

    }



    const fetchCategories = async () => {

        try {
            const response = await api.get('/categories/categoryMenu')

            console.log(response.data, 'response');

            reArrangeMenuItems(response.data);

        } catch (error) {
            console.log("category fetching Error", error);

            reArrangeMenuItems([]);
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])


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
                items={menuItems}
            />
        </Sider>
    )
}

export default Sidebar