import { Breadcrumb, Button, Modal } from "antd"
import { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { Table, Select, Pagination } from 'antd';
import { useEffect, useState } from "react";
import {
    PlusOutlined,
    DeleteFilled
} from '@ant-design/icons';
import AddCategoryForm from "../components/category/AddCategoryForm";
import { Category } from "../types";
import api from "../services/api";
import moment from "moment";

const { Option } = Select;
const { confirm } = Modal;


const showDeleteConfirm = (callback: (id: string) => void, id: string) => {
    confirm({
        title: 'Are you sure you want to delete this category?',
        icon: <DeleteFilled color="red" />,
        content: 'Deleting this category will remove it permanently. This action cannot be undone.',
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


const Dashboard = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [sortBy] = useState<string>('id');
    const [sortOrder] = useState<'asc' | 'desc'>('asc');
    const [isOpen, setIsOpen] = useState(false)
    const error = false
    const [categories, setCategories] = useState<Category[]>([])
    const [currentData, setCurrentData] = useState<Category[]>([])
    const [selectedRecord, setSelectedRecord] = useState<Category | null>(null)


    const handleSelectRecord = (record: Category) => {
        setSelectedRecord(record)
        setIsOpen(true)
    }

    const handleDeleteRecord = async (id: string) => {
        setIsLoading(true)
        try {
            await api.delete(`/categories/${id}`)
            setIsLoading(false)
            fetchCategories()

        } catch (error) {
            console.log(error);
            setIsLoading(false)

        }
    }
    const columns: ColumnsType<Category> = [

        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: true,
            sortDirections: ['ascend', 'descend'],
            sortOrder: sortBy === 'name' ? (sortOrder === 'asc' ? 'ascend' : 'descend') : null,
            render: (text, record) => <a onClick={() => navigate(`/${text}/${record.id}`)}>{text}</a>,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            sorter: false,
            render: (text) => <span>{text}</span>,
        },
        {
            title: 'Created date',
            dataIndex: 'created_at',
            key: 'created_at',
            sorter: true,
            sortDirections: ['ascend', 'descend'],
            sortOrder: sortBy === 'name' ? (sortOrder === 'asc' ? 'ascend' : 'descend') : null,
            render: (date) => <>{date ? moment(date).format('DD-MMM-YYYY') : '-'}</>,
        },
        {
            title: 'Updated date',
            dataIndex: 'updated_at',
            key: 'updated_at',
            sorter: true,
            sortDirections: ['ascend', 'descend'],
            sortOrder: sortBy === 'name' ? (sortOrder === 'asc' ? 'ascend' : 'descend') : null,
            render: (date) => <>{date ? moment(date).format('DD-MMM-YYYY') : '-'}</>,
        },
        {
            title: '',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => <div>
                <Button type="link" onClick={() => handleSelectRecord(record)}>Edit</Button>
                <Button type="link" danger onClick={() => showDeleteConfirm(handleDeleteRecord, record.id)}>Delete</Button>
            </div>,
        },
    ];



    const handleCategoryFormConfirm = () => {
        setIsOpen(false)
        fetchCategories()
    }

    const handleCategoryFormCancel = () => {
        setIsOpen(false)
        setSelectedRecord(null)
    }

    const onHandlePageChangeSize = (currentPageSize = pageSize, currentPage = page) => {
        setPageSize(currentPageSize)
        setPage(currentPage)
        console.log(currentPage, currentPageSize);

        setCurrentData(categories.slice((currentPage - 1) * currentPageSize, currentPage * currentPageSize))
    }
    const fetchCategories = async () => {
        setIsLoading(true);
        try {
            const response = await api.get('/categories')

            console.log(response.data, 'response');
            setIsLoading(false);
            setCategories(response.data);
            setCurrentData(response.data.slice((page - 1) * pageSize, page * pageSize));

        } catch (error) {
            console.log("category fetching Error", error);
            setIsLoading(false);
            setCategories([]);
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])


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
                    <div className="mt-4 flex justify-between items-center">
                        <h3>
                            Category List
                        </h3>
                        <Button type="primary" size="large" onClick={() => setIsOpen(true)}><PlusOutlined classID="mr-1" />Add</Button>
                    </div>
                    <Table
                        loading={isLoading}
                        className="mt-4"
                        rowKey="id"
                        columns={columns}
                        dataSource={currentData}
                        pagination={false}
                    // onChange={handleTableChange}
                    />
                    {categories.length > 0 && (
                        <div className="bg-gray-200 p-4 flex justify-between items-center">
                            <Pagination
                                current={page}
                                pageSize={pageSize}
                                total={categories.length}
                                onChange={(p) => onHandlePageChangeSize(pageSize, p)}

                            />
                            <div>
                                Page Size:
                                <Select defaultValue={10} style={{ width: 120, marginLeft: 8 }} onChange={(value) => onHandlePageChangeSize(value)}>
                                    <Option value={5}>5</Option>
                                    <Option value={10}>10</Option>
                                    <Option value={20}>20</Option>
                                    <Option value={50}>50</Option>
                                </Select>
                            </div>

                        </div>

                    )}
                    {categories.length === 0 && !isLoading && !error && <p>No products in this category.</p>}
                </div>
            </div>
            {
                isOpen && <AddCategoryForm
                    isOpen={isOpen}
                    handleCancel={handleCategoryFormCancel}
                    handleOk={handleCategoryFormConfirm}
                    category={selectedRecord}
                    categories={categories}
                />

            }

        </>
    )
}

export default Dashboard

