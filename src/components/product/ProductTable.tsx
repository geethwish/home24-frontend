import { ColumnsType } from 'antd/es/table';
import React, { FC } from 'react'
import { Product, ProductTableProps } from '../../types';
import { Button, Image, Pagination, Select, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const { Option } = Select;



const ProductTable: FC<ProductTableProps> = (props) => {
    const navigate = useNavigate();
    const { products, isLoading, error, page, onPageChange, pageSize, total, onDeleteProduct, sortBy, sortOrder, onSortChange } = props;

    console.log(products, 'products');

    const columns: ColumnsType<Product> = [
        {
            title: 'Product Image',
            dataIndex: 'imageUrl',
            key: 'imageUrl',
            render: (text) => <Image src={text} alt="Product Image" width={140} height={120} className='object-cover'
                fallback={'/src/assets/images/placeholderImage.png'}
            />,
            responsive: ['sm'],
            minWidth: 120,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: true,
            sortDirections: ['ascend', 'descend'],
            sortOrder: sortBy === 'name' ? (sortOrder === 'asc' ? 'ascend' : 'descend') : null,
            onHeaderCell: (column) => ({
                onClick: () => {
                    if ('dataIndex' in column) {
                        onSortChange(column.dataIndex as string, sortOrder === 'asc' ? 'desc' : 'asc');
                    }
                },
            }),
            render: (text, record) => <a onClick={() => navigate(`/product/${record.id}`)}>{text}</a>,
            minWidth: 120,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            sorter: true,
            sortDirections: ['ascend', 'descend'],
            sortOrder: sortBy === 'price' ? (sortOrder === 'asc' ? 'ascend' : 'descend') : null,
            onHeaderCell: (column) => ({
                onClick: () => {
                    if ('dataIndex' in column) {
                        onSortChange(column.dataIndex as string, sortOrder === 'asc' ? 'desc' : 'asc');
                    }
                },
            }),
            responsive: ['sm'],
            minWidth: 120,
        },
        {
            title: 'Stock',
            dataIndex: 'stock',
            key: 'stock',
            sorter: true,
            sortDirections: ['ascend', 'descend'],
            sortOrder: sortBy === 'stock' ? (sortOrder === 'asc' ? 'ascend' : 'descend') : null,
            onHeaderCell: (column) => ({
                onClick: () => {
                    if ('dataIndex' in column) {
                        onSortChange(column.dataIndex as string, sortOrder === 'asc' ? 'desc' : 'asc');
                    }
                },
            }),
            responsive: ['sm'],
            minWidth: 120,
        },
        {
            title: 'Created At',
            dataIndex: 'created_at',
            key: 'created_at',
            sorter: true,
            sortDirections: ['ascend', 'descend'],
            sortOrder: sortBy === 'created_at' ? (sortOrder === 'asc' ? 'ascend' : 'descend') : null,
            onHeaderCell: (column) => ({
                onClick: () => {
                    if ('dataIndex' in column) {
                        onSortChange(column.dataIndex as string, sortOrder === 'asc' ? 'desc' : 'asc');
                    }
                },
            }),
            responsive: ['sm'],
            render: (date) => <>{date ? moment(date).format('DD-MMM-YYYY') : '-'}</>,
            minWidth: 120,
        },
        {
            title: 'Updated At',
            dataIndex: 'updated_at',
            key: 'updated_at',
            sorter: true,
            sortDirections: ['ascend', 'descend'],
            sortOrder: sortBy === 'updated_at' ? (sortOrder === 'asc' ? 'ascend' : 'descend') : null,
            onHeaderCell: (column) => ({
                onClick: () => {
                    if ('dataIndex' in column) {
                        onSortChange(column.dataIndex as string, sortOrder === 'asc' ? 'desc' : 'asc');
                    }
                },
            }),
            responsive: ['sm'],
            render: (date) => <>{date ? moment(date).format('DD-MMM-YYYY') : '-'}</>,
        },
        {
            title: '',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => <div>
                <Button type="link" onClick={() => navigate(`/product/${record.id}`)}>Edit</Button>
                <Button type="link" danger onClick={() => onDeleteProduct(record.id)}>Delete</Button>
            </div>,
            responsive: ['sm'],
            minWidth: 120,
        },
    ];
    return (
        <>
            <Table
                tableLayout="auto"
                scroll={{ x: 'max-content', y: 55 * 10 }}
                className="mt-4 "
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
                        onChange={(currentPage) => onPageChange(currentPage, pageSize)}

                    />
                    <div>
                        Page Size:
                        <Select defaultValue={pageSize} style={{ width: 120, marginLeft: 8 }} onChange={(value) => onPageChange(page, value)}>
                            <Option value={5}>5</Option>
                            <Option value={10}>10</Option>
                            <Option value={20}>20</Option>
                            <Option value={50}>50</Option>
                        </Select>
                    </div>

                </div>

            )}
            {products !== null && products.total === 0 && !isLoading && !error && <p>No products in this category.</p>}</>
    )
}

export default ProductTable