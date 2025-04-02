import { Layout, Menu, MenuProps } from 'antd'
import logo from '../assets/images/logo.png'
import {
    BranchesOutlined,
    CustomerServiceFilled,
    HomeFilled
} from '@ant-design/icons';
import { MdRamenDining, MdSportsFootball } from "react-icons/md";
import { HiComputerDesktop } from "react-icons/hi2";
import { GiHeartBeats } from "react-icons/gi";
import { FaApple, FaAtom, FaAvianex, FaBloggerB, FaBrain } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import api from '../services/api';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();
    const isCollapsed = useSelector((state: RootState) => state.themeSettings.isMenuCollapsed);
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);


    const getRandomIcon = (id: number) => {
        const icons = [<HomeFilled />, <BranchesOutlined />, <CustomerServiceFilled />, <MdRamenDining />, <HiComputerDesktop />, <GiHeartBeats />, <MdSportsFootball />, <FaApple />, <FaAvianex />, <FaAtom />, <FaBloggerB />, <FaBrain />];
        return icons[id];
    };
    const reArrangeMenuItems = (categories: Category[]) => {

        // CHeck for unlimited subcategories
        const transformCategoriesToMenuItems = (categories: Category[]): MenuItem[] => {
            return categories.map((category: Category, index: number) => ({
                key: `/products/${category.id}`,
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
                    { key: '/products', label: 'Products' },
                    { key: '/product', label: 'Add Product' },
                ],
            },
        ]

        setMenuItems(temporaryItems);

    }



    const fetchCategories = async () => {

        try {
            const response = await api.get('/categories/categoryMenu')

            reArrangeMenuItems(response.data);

        } catch (error) {
            console.log("category fetching Error", error);

            reArrangeMenuItems([]);
        }
    }

    const handleMenuClick: MenuProps['onClick'] = (e) => {
        const selectedKey = e.key;
        navigate(`${selectedKey}`)

    }

    useEffect(() => {
        fetchCategories()
    }, [])


    return (
        <Sider trigger={null} collapsible collapsed={isCollapsed} style={{ backgroundColor: '#ffff' }} width={260} >

            <div className='flex flex-col justify-center items-center'>
                <Link to={'/'} className='w-full flex flex-col items-center'>
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
                </Link>

            </div>
            <Menu
                onClick={handleMenuClick}
                theme="light"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={menuItems}
            />
        </Sider>
    )
}

export default Sidebar