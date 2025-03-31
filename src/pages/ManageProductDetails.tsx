import { Breadcrumb, Button, Card, Form, Image, Input, Select, Tooltip } from 'antd';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Product } from '../types';
import {
    EditOutlined,
    EyeFilled
} from '@ant-design/icons';
import api from '../services/api';
import { toast } from 'react-toastify';

const { TextArea } = Input
const { Option } = Select;


const ManageProductDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [form] = Form.useForm<Product>()
    const [isEdit, setIsEdit] = useState(false);
    const [showForm, setShowForm] = useState(false)
    const [product, setProduct] = useState<Product>(null)
    const [categories, setCategories] = useState<Product[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const fetchCategories = async () => {
        setIsLoading(true);
        try {
            const response = await api.get('/categories')
            setIsLoading(false);
            setCategories(response.data);

        } catch (error) {
            console.log("category fetching Error", error);
            setIsLoading(false);
            setCategories([]);
        }
    }

    const handleFormSubmit = async (values: Product) => {

        if (isEdit) {
            try {
                await api.patch(`/products/${product?.id}`, { ...values })
                toast.success('Product updated successfully');
                form.resetFields()
                navigate(`/products/${product?.category_id}`)
            } catch (error) {
                console.log(error);
            }

        } else {
            try {
                await api.post('/products', { ...values })
                toast.success('Product added successfully');
                form.resetFields()

            } catch (error) {
                console.log(error);

            }
        }


    }
    const handleFormSubmitFailed = (errorInfo: unknown) => {
        console.log('Failed:', errorInfo);
    }

    const fetchProductById = async (id: string) => {
        try {
            const response = await api.get(`/products/${id}`);
            setProduct(response.data);
            console.log(response.data, 'response');
        } catch (error) {
            console.log(error);
            setProduct(null);

        }
    }
    useEffect(() => {
        if (id) {
            setIsEdit(true);
            fetchProductById(id);
        } else {
            setIsEdit(false);
        }
    }, [id]);

    useEffect(() => {
        fetchCategories()
    }, [])

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
                    {
                        isEdit && <>
                            <Image
                                className='w-full'
                                src={product?.imageUrl ?? ""}
                                alt="Product Image"
                            />
                            <h2 className='text-primary text-xl mt-2 mb-2'>{product?.name ?? ""}
                                <Tooltip title={!showForm ? "Edit Product" : "View Product"}>
                                    <Button type="link" shape="circle"
                                        icon={showForm ? <EyeFilled /> : <EditOutlined />}
                                        onClick={() => setShowForm((prev) => !prev)} />
                                </Tooltip>
                            </h2>
                        </>
                    }


                    {
                        isEdit && !showForm && <>

                            <strong className='text-gray-400'>Description</strong>
                            <h6 className='mt-1 mb-2 text-gray-500'>

                                {
                                    product?.description ?? ""
                                }
                            </h6>
                            <p className='text-gray-400'>Category</p>
                            <h6 className='mt-1 mb-2 text-gray-500'>
                                {
                                    product?.category_id ?? ""
                                }
                            </h6>
                            <p className='text-gray-400'>Price</p>
                            <h6 className='mt-1 mb-2 text-gray-500'>
                                ${
                                    product?.price
                                }
                            </h6>
                            <p className='text-gray-400'>Stock</p>
                            <h6 className='mt-1 mb-2 text-gray-500'>
                                {
                                    product?.stock ?? ""
                                }
                            </h6>
                            <p className='text-gray-400'>Created At</p>
                            <h6 className='mt-1 mb-2 text-gray-500'>
                                {
                                    product?.created_at ?? ""
                                }
                            </h6>
                            <p className='text-gray-400'>Updated At</p>
                            <h6 className='mt-1 mb-2 text-gray-500'>
                                {
                                    product?.updated_at ?? ""
                                }
                            </h6>
                        </>

                    }

                    {
                        (!isEdit || showForm) && <Form
                            form={form}
                            name="productForm"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ maxWidth: 600 }}
                            initialValues={{ ...product }}
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
                                name="category_id"
                            >
                                <Select placeholder='Select Category' size='large'>
                                    {
                                        categories.length > 0 && categories.map((category) => (
                                            <Option key={category.id} value={category.id}>{category.name}</Option>
                                        ))
                                    }
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