import { useState } from 'react'
import useProducts from '../hooks/useAllProducts';
import { Breadcrumb, Button, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
    DeleteFilled,
    PlusOutlined,
} from '@ant-design/icons';
import ProductTable from '../components/product/ProductTable';
import api from '../services/api';
import { toast } from 'react-toastify';

const { confirm } = Modal
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


const Products = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [sortBy, setSortBy] = useState<string>('id');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    // Use react-query to fetch products
    const { data, isLoading, error, refreshProducts } = useProducts(
        page,
        pageSize,
        sortBy,
        sortOrder,
    );
    const products = data?.data;
    const total = data?.data?.totalPages * (data?.data?.pageSize || 0);

    const handleDeleteProduct = async (id: string) => {
        try {
            await api.delete(`/products/${id}`)
            toast.success('Product deleted successfully');
            refreshProducts()
        } catch (error) {
            console.log(error);

        }
    };

    const onHandlePageChange = (page: number, pageSize: number) => {
        setPage(page);
        setPageSize(pageSize);

    }

    return (
        <>
            <div className="mt-4 mb-1">
                <Breadcrumb
                    items={[
                        {
                            title: 'Products',
                        },
                        {
                            title: 'All',
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
                    <ProductTable
                        products={products || null}
                        isLoading={isLoading}
                        error={error}
                        page={page}
                        onPageChange={onHandlePageChange}
                        pageSize={pageSize}
                        onSortChange={(sortBy, sortOrder) => {
                            setSortBy(sortBy);
                            setSortOrder(sortOrder);
                        }}
                        onDeleteProduct={(id) => showDeleteConfirm(handleDeleteProduct, id)}
                        total={total}
                        sortBy={sortBy}
                        sortOrder={sortOrder}
                    />
                </div>
            </div>
        </ >

    )
}

export default Products