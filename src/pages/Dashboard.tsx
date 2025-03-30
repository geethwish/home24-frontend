import { Breadcrumb, Button, Modal } from "antd"
import { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { Table, Select, Pagination } from 'antd';
import { useState } from "react";
import {
    PlusOutlined,
    DeleteFilled
} from '@ant-design/icons';
import AddCategoryForm from "../components/category/AddCategoryForm";
import { Category } from "../types";

const { Option } = Select;
const { confirm } = Modal;



const categoryData = [
    {
        id: 1,
        name: 'Electronics',
    },
    {
        id: 2,
        name: 'Books',
    },
    {
        id: 3,
        name: 'Clothing',
    }
]

const showDeleteConfirm = () => {
    confirm({
        title: 'Are you sure you want to delete this category?',
        icon: <DeleteFilled color="red" />,
        content: 'Deleting this category will remove it permanently. This action cannot be undone.',
        okText: 'Yes, Delete',
        okType: 'danger',
        cancelText: 'Cancel',
        width: 500,
        onOk() {
            console.log('Category deleted');
        },
        onCancel() {
            console.log('Delete action canceled');
        },
    });
};


const Dashboard = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [sortBy, setSortBy] = useState<string>('id');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [isOpen, setIsOpen] = useState(false)
    const total = 10
    const error = false
    const [selectedRecord, setSelectedRecord] = useState<Category | null>(null)


    const handleSelectRecord = (record: Category) => {
        setSelectedRecord(record)
        setIsOpen(true)
    }
    const columns: ColumnsType<Category> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: true,
            sortDirections: ['ascend', 'descend'],
            // sortOrder: sortBy === 'id' ? (sortOrder === 'asc' ? 'ascend' : 'descend') : null,
            // onHeaderCell: (column) => ({
            //     onClick: () => {
            //         setSortBy(column.dataIndex as string);
            //         setSortOrder(sortBy === column.dataIndex && sortOrder === 'asc' ? 'desc' : 'asc');
            //     },
            // }),
            render: (text) => <span>{text}</span>,
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
                <Button type="link" onClick={() => handleSelectRecord(record)}>Edit</Button>
                <Button type="link" danger onClick={() => showDeleteConfirm()}>Delete</Button>
            </div>,
        },
        // Add more columns as needed
    ];



    const handleCategoryFormConfirm = () => {

    }

    return (
        <>
            <div className="mt-4 mb-1">
                <Breadcrumb
                    items={[
                        {
                            title: 'Dashboard',
                        },
                        {
                            title: 'Categories',
                        },
                    ]}
                />
            </div>

            <div>
                <div>
                    <div className="mt-1 flex justify-end">
                        <Button type="primary" size="large" onClick={() => setIsOpen(true)}><PlusOutlined classID="mr-1" />Add</Button>
                    </div>
                    <Table
                        className="mt-4"
                        rowKey="id"
                        columns={columns}
                        dataSource={categoryData}
                        pagination={false}
                    // loading={isLoading}
                    // onChange={handleTableChange}
                    />
                    {categoryData.length > 0 && (
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
                    {categoryData.length === 0 && !isLoading && !error && <p>No products in this category.</p>}
                </div>
            </div>
            <AddCategoryForm isOpen={isOpen} handleCancel={() => setIsOpen(false)} handleOk={handleCategoryFormConfirm} category={selectedRecord} />
        </>
    )
}

export default Dashboard