import { Breadcrumb, Button, Card, Form, Image, Input, Select, Tooltip } from 'antd';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../types';
import {
    EditOutlined,
    EyeFilled
} from '@ant-design/icons';

const { TextArea } = Input
const { Option } = Select;

const productData = {
    id: 1,
    name: 'Product 1',
    category: 'Electronics',
    price: 100,
    stock: 50,
    createdAt: '2023-01-01',
    updatedAt: '2023-01-02',
    imageUrl: 'https://example.com/image.jpg',
    description: 'This is a sample product description.',
}
const ManageProductDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [isEdit, setIsEdit] = useState(false);
    const [showForm, setShowForm] = useState(false)

    const handleFormSubmit = (values: Product) => {
        console.log('Success:', values);
    }
    const handleFormSubmitFailed = (errorInfo: unknown) => {
        console.log('Failed:', errorInfo);
    }

    useEffect(() => {
        if (id) {
            setIsEdit(true);
        } else {
            setIsEdit(false);
        }
    }, [id]);
    return (
        <div>
            <div className="mt-4 mb-1">
                <Breadcrumb
                    items={[
                        {
                            title: 'Products',
                        },
                        {
                            title: isEdit ? `Modify Product` : 'Add Product',
                        },
                    ]}
                />
            </div>
            <div className='flex justify-center items-center'>
                <Card title={isEdit ? 'Modify Product' : "Add Product"
                } style={{ width: 600, marginTop: 16 }}>
                    <Image
                        className='w-full'
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    />
                    <h2 className='text-primary text-xl mt-2 mb-2'>{productData.name}
                        <Tooltip title={!showForm ? "Edit Product" : "View Product"}>
                            <Button type="link" shape="circle"
                                icon={showForm ? <EyeFilled /> : <EditOutlined />}
                                onClick={() => setShowForm((prev) => !prev)} />
                        </Tooltip>
                    </h2>
                    {
                        isEdit && !showForm && <>

                            <strong className='text-gray-400'>Description</strong>
                            <h6 className='mt-1 mb-2 text-gray-500'>

                                {
                                    productData.description
                                }
                            </h6>
                            <p className='text-gray-400'>Category</p>
                            <h6 className='mt-1 mb-2 text-gray-500'>
                                {
                                    productData.category
                                }
                            </h6>
                            <p className='text-gray-400'>Price</p>
                            <h6 className='mt-1 mb-2 text-gray-500'>
                                ${
                                    productData.price
                                }
                            </h6>
                            <p className='text-gray-400'>Stock</p>
                            <h6 className='mt-1 mb-2 text-gray-500'>
                                {
                                    productData.stock
                                }
                            </h6>
                            <p className='text-gray-400'>Created At</p>
                            <h6 className='mt-1 mb-2 text-gray-500'>
                                {
                                    productData.createdAt
                                }
                            </h6>
                            <p className='text-gray-400'>Updated At</p>
                            <h6 className='mt-1 mb-2 text-gray-500'>
                                {
                                    productData.updatedAt
                                }
                            </h6>
                        </>

                    }

                    {
                        showForm && <Form
                            name="productForm"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ maxWidth: 600 }}
                            initialValues={{ remember: true }}
                            onFinish={handleFormSubmit}
                            onFinishFailed={handleFormSubmitFailed}
                            autoComplete="off"
                            requiredMark={false}
                        >


                            <Form.Item<Product>
                                label="Product Name"
                                name="name"
                                rules={[{ required: true, message: 'Please input your email!' }]}
                            >
                                <Input size='large' placeholder='johnsmith@example.com' />
                            </Form.Item>

                            <Form.Item<Product>
                                label="Product Description"
                                name="description"
                            >
                                <TextArea size='large' placeholder='johnsmith@example.com' />
                            </Form.Item>

                            <Form.Item<Product>
                                label="Product Price"
                                name="price"
                                rules={[{ required: true, message: 'Please input your email!' }]}
                            >
                                <Input size='large' placeholder='$0.00' />
                            </Form.Item>
                            <Form.Item<Product>
                                label="Product Image URL"
                                name="imageUrl"
                                rules={[{ required: true, message: 'Please input your email!' }]}
                            >
                                <Input size='large' placeholder='https://example.com/image.jpg' />
                            </Form.Item>
                            <Form.Item<Product>
                                label="Product Stock"
                                name="stock"
                                rules={[{ required: true, message: 'Please input your email!' }]}
                            >
                                <Input size='large' placeholder='100' />
                            </Form.Item>
                            <Form.Item<Product>
                                label="Product Category"
                                name="category"
                            >
                                <Select defaultValue={10}>
                                    <Option value={5}>Electronics</Option>
                                    <Option value={10}>Books</Option>
                                    <Option value={20}>Clothing</Option>
                                </Select>
                            </Form.Item>

                            <div className='mt-1 flex justify-between items-center'>
                                <Button htmlType="reset" className='' size='large'>
                                    Reset
                                </Button>
                                <Button type="primary" htmlType="submit" className='' size='large'>
                                    Submit
                                </Button>
                            </div>
                        </Form>
                    }

                </Card>

            </div>
        </div>
    )
}

export default ManageProductDetails