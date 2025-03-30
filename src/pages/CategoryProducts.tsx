import { Avatar, Breadcrumb, Button, Pagination, Select, Table } from "antd"
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    PlusOutlined,
} from '@ant-design/icons';
import { ColumnsType } from "antd/es/table";
import { Product } from "../types";
const { Option } = Select;

const productData = [
    {
        id: 1,
        name: 'Product 1',
        category: 'Electronics',
        price: 100,
        stock: 50,
        createdAt: '2023-01-01',
        updatedAt: '2023-01-02',

    },
    {
        id: 2,
        name: 'Product 2',
        category: 'Books',
        price: 20,
        stock: 100,
        createdAt: '2023-01-01',
        updatedAt: '2023-01-02',

    },
    {
        id: 3,
        name: 'Product 3',
        category: 'Clothing',
        price: 30,
        stock: 200,
        createdAt: '2023-01-01',
        updatedAt: '2023-01-02',

    },
    {
        id: 4,
        name: 'Product 4',
        category: 'Electronics',
        price: 150,
        stock: 20,
        createdAt: '2023-01-01',
        updatedAt: '2023-01-02',

    },
    {
        id: 5,
        name: 'Product 5',
        category: 'Books',
        price: 25,
        stock: 80,
        createdAt: '2023-01-01',
        updatedAt: '2023-01-02',
    }
]
const CategoryProducts = () => {
    const navigate = useNavigate();
    const { category: routeCategory, id: routeId } = useParams<{ category: string; id: string }>();
    const [category, setCategory] = useState<string | undefined>();
    const [id, setId] = useState<string | undefined>();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [sortBy, setSortBy] = useState<string>('id');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const total = 10
    const error = false
    const isLoading = false


    useEffect(() => {
        setCategory(routeCategory);
        setId(routeId);
    }, [routeCategory, routeId]);


    const showDeleteConfirm = () => {
        // Show a confirmation modal before deleting the product
        console.log('Delete product');
    };
    const columns: ColumnsType<Product> = [
        {
            title: 'Product Image',
            dataIndex: 'imageUrl',
            key: 'imageUrl',
            render: (text) => <Avatar shape="square" src={text} alt="Product Image" size={64} />,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: true,
            sortDirections: ['ascend', 'descend'],
            // sortOrder: sortBy === 'name' ? (sortOrder === 'asc' ? 'ascend' : 'descend') : null,
            // onHeaderCell: (column) => ({
            //     onClick: () => {
            //         setSortBy(column.dataIndex as string);
            //         setSortOrder(sortBy === column.dataIndex && sortOrder === 'asc' ? 'desc' : 'asc');
            //     },
            // }),
            render: (text, record) => <a onClick={() => navigate(`/product/${record.id}`)}>{text}</a>,
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            sorter: true,
            sortDirections: ['ascend', 'descend'],
            // sortOrder: sortBy === 'name' ? (sortOrder === 'asc' ? 'ascend' : 'descend') : null,
            // onHeaderCell: (column) => ({
            //     onClick: () => {
            //         setSortBy(column.dataIndex as string);
            //         setSortOrder(sortBy === column.dataIndex && sortOrder === 'asc' ? 'desc' : 'asc');
            //     },
            // }),
            // render: (text, record) => <a onClick={() => navigate(`/product/${record.id}`)}>{text}</a>,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            sorter: true,
            sortDirections: ['ascend', 'descend'],
        },
        {
            title: 'Stock',
            dataIndex: 'stock',
            key: 'stock',
            sorter: true,
            sortDirections: ['ascend', 'descend'],
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            sorter: true,
            sortDirections: ['ascend', 'descend'],
        },
        {
            title: 'Updated At',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            sorter: true,
            sortDirections: ['ascend', 'descend'],
        },
        {
            title: '',
            dataIndex: 'action',
            key: 'action',
            // sorter: true,
            // sortDirections: ['ascend', 'descend'],
            // sortOrder: sortBy === 'name' ? (sortOrder === 'asc' ? 'ascend' : 'descend') : null,
            // onHeaderCell: (column) => ({
            //     onClick: () => {
            //         setSortBy(column.dataIndex as string);
            //         setSortOrder(sortBy === column.dataIndex && sortOrder === 'asc' ? 'desc' : 'asc');
            //     },
            // }),
            render: (text, record) => <div>
                <Button type="link" onClick={() => navigate(`/product/${record.id}`)}>Edit</Button>
                <Button type="link" danger onClick={() => showDeleteConfirm()}>Delete</Button>
            </div>,
        },
        // Add more columns as needed
    ];


    return (
        <>
            <div className="mt-4 mb-1">
                <Breadcrumb
                    items={[
                        {
                            title: 'Category',
                        },
                        {
                            title: category,
                        },
                    ]}
                />
            </div>
            <div>
                <div>
                    <div className="mt-4 flex justify-between items-center">
                        <h3>
                            Product List
                        </h3>
                        <Button type="primary" size="large" onClick={() => navigate('/product')}><PlusOutlined classID="mr-1" />Add</Button>
                    </div>
                    <Table
                        className="mt-4"
                        rowKey="id"
                        columns={columns}
                        dataSource={productData}
                        pagination={false}
                    // loading={isLoading}
                    // onChange={handleTableChange}
                    />
                    {productData.length > 0 && (
                        <div className="bg-gray-200 p-4 flex justify-between items-center">
                            <Pagination
                                current={page}
                                pageSize={pageSize}
                                total={total}
                                onChange={(p) => setPage(p)}

                            />
                            <div>
                                Page Size:
                                <Select defaultValue={10} style={{ width: 120, marginLeft: 8 }} onChange={(value) => setPageSize(value)}>
                                    <Option value={5}>5</Option>
                                    <Option value={10}>10</Option>
                                    <Option value={20}>20</Option>
                                    <Option value={50}>50</Option>
                                </Select>
                            </div>

                        </div>

                    )}
                    {productData.length === 0 && !isLoading && !error && <p>No products in this category.</p>}
                </div>
            </div>
        </>
    )
}

export default CategoryProducts