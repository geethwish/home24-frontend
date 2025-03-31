import { Avatar, Breadcrumb, Button, Modal, Pagination, Select, Table } from "antd"
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    DeleteFilled,
    PlusOutlined,
} from '@ant-design/icons';
import { ColumnsType } from "antd/es/table";
import { Product, ProductDetails } from "../types";
import api from "../services/api";
import moment from "moment";
import { toast } from "react-toastify";
const { Option } = Select;
const { confirm } = Modal;

const showDeleteConfirm = (callback: (id: string) => void, id: string) => {
    confirm({
        title: 'Are you sure you want to delete this product?',
        icon: <DeleteFilled color="red" />,
        content: 'Deleting this product will remove it permanently. This action cannot be undone.',
        okText: 'Yes, Delete',
        okType: 'danger',
        cancelText: 'Cancel',
        width: 500,
        onOk() {
            callback(id);
        },
        onCancel() {
            console.log('Delete action canceled');
        },
    });
};

const CategoryProducts = () => {
    const navigate = useNavigate();
    const { category: routeCategory, id: routeId } = useParams<{ category: string; id: string }>();
    const [category, setCategory] = useState<string | undefined>();
    const [products, setProducts] = useState<ProductDetails | null>(null)
    const [id, setId] = useState<string | undefined>();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [sortBy, setSortBy] = useState<string>('id');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const total = 10
    const error = false
    const [isLoading, setIsLoading] = useState(false)

    const fetchProducts = async () => {
        setIsLoading(true)
        try {
            const response = await api.get(`/products/categories/${id}`)
            console.log(response.data, 'response');
            setIsLoading(false)
            setProducts(response.data)

        } catch (error) {
            console.log(error);
            setIsLoading(false)
            setProducts(null)

        }
    }


    useEffect(() => {
        setCategory(routeCategory);
        setId(routeId);
    }, [routeCategory, routeId]);

    useEffect(() => {
        if (id) {
            fetchProducts()
        }
    }, [id]);


    const handleDeleteProduct = async (id: string) => {
        try {
            await api.delete(`/products/${id}`)
            toast.success('Product deleted successfully');
            fetchProducts()
        } catch (error) {
            console.log(error);

        }
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
            dataIndex: 'created_at',
            key: 'created_at',
            sorter: true,
            sortDirections: ['ascend', 'descend'],
            render: (date) => <>{date ? moment(date).format('DD-MMM-YYYY') : '-'}</>,
        },
        {
            title: 'Updated At',
            dataIndex: 'updated_at',
            key: 'updated_at',
            sorter: true,
            sortDirections: ['ascend', 'descend'],
            render: (date) => <>{date ? moment(date).format('DD-MMM-YYYY') : '-'}</>,
        },
        {
            title: '',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => <div>
                <Button type="link" onClick={() => navigate(`/product/${record.id}`)}>Edit</Button>
                <Button type="link" danger onClick={() => showDeleteConfirm(handleDeleteProduct, record.id)}>Delete</Button>
            </div>,
        },
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
                        columns={columns}
                        dataSource={products !== null && products.products}
                        pagination={false}
                        loading={isLoading}
                    // onChange={handleTableChange}
                    />
                    {products !== null && products.products.length > 0 && (
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
                    {products !== null && products.total === 0 && !isLoading && !error && <p>No products in this category.</p>}
                </div>
            </div>
        </>
    )
}

export default CategoryProducts