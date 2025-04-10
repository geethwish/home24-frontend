import { Breadcrumb, Button, Card, Col, Form, Image, Input, InputNumber, Row, Select, Tooltip } from 'antd';
import { useState, useEffect, FC, ReactElement, ReactNode } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Product } from '../types';
import {
    CloseOutlined,
    EditOutlined,
    EyeFilled
} from '@ant-design/icons';
import api from '../services/api';
import { toast } from 'react-toastify';
import { attributeType } from '../static/attributesType';
import { attributeTags } from '../static/attributeTags';

const { TextArea } = Input
const { Option } = Select;


const ManageProductDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [form] = Form.useForm<Product>()
    const attributesValues = Form.useWatch('attributes', form);
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

    console.log(isLoading, 'avalues');

    const getCardHeader = (text: string): ReactNode => {
        return <div className='flex justify-between items-center'>
            <h6 >{text}</h6>
            {
                isEdit && <Button type="link" shape="circle"
                    icon={showForm ? <EyeFilled /> : <EditOutlined />}
                    onClick={() => setShowForm((prev) => !prev)} >
                    {showForm ? 'View' : "Edit"}
                </Button>
            }

        </div>
    };

    const getValueField = (type: 'text' | 'url' | 'number' | 'boolean' | 'tags'): ReactNode => {
        if (type === 'boolean') {
            return <Select size='large'>
                <Option value="true">True</Option>
                <Option value="false">False</Option>
            </Select>
        } else if (type === 'text' || type === 'url') {
            return <Input size='large' />

        } else if (type === 'number') {
            return <InputNumber size='large' className='w-full' style={{ width: '100%' }} />
        } else if (type === 'tags') {
            return <Select mode="tags" size='large' placeholder="Tags" >
                {
                    attributeTags.map((tag) => (
                        <Option key={tag.name} value={tag.name}>{tag.label}</Option>
                    ))
                }
            </Select>
        }
    }
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

                <Card
                    title={getCardHeader(isEdit ? 'Modify Product' : "Add Product")}
                    style={{ marginTop: 16 }}
                    className='w-full'
                >
                    {
                        isEdit && <div className='product-image'>
                            <Image
                                className="w-full"
                                src={product?.imageUrl}
                                alt="Product Image"
                                fallback={'/src/assets/images/placeholderImage.png'}
                                wrapperStyle={{ width: '100%' }}
                                loading={'lazy'}
                                height={300}

                            />
                            <h2 className='text-primary text-xl mt-2 mb-2'>{product?.name ?? ""}
                                <Tooltip title={!showForm ? "Edit Product" : "View Product"}>
                                    <Button type="link" shape="circle"
                                        icon={showForm ? <EyeFilled /> : <EditOutlined />}
                                        onClick={() => setShowForm((prev) => !prev)} />
                                </Tooltip>
                            </h2>
                        </div>
                    }


                    {
                        isEdit && !showForm && <div className='flex flex-wrap justify-between  mb-4'>
                            <div className='flex-1'>
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
                            </div>
                            <div className='flex-1'>
                                {
                                    product?.attributes && product?.attributes.length > 0 && <div className='w-full md:w-1/2 lg:w-1/2'>
                                        <strong className='text-gray-400'>Attributes</strong>
                                        {
                                            product?.attributes.map((attribute, index) => (
                                                <div key={index} className='mt-2 mb-2'>
                                                    <p className='text-gray-400'>{attribute.code}</p>
                                                    <h6 className='mt-1 mb-2 text-gray-500 capitalize'>
                                                        {
                                                            Array.isArray(attribute.value) ? attribute.value.join(', ') : attribute.value
                                                        }
                                                    </h6>
                                                </div>
                                            ))
                                        }
                                    </div>
                                }
                            </div>



                        </div>

                    }

                    {
                        (!isEdit || showForm) && <Form
                            form={form}
                            name="productForm"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}

                            initialValues={{ ...product }}
                            onFinish={handleFormSubmit}
                            onFinishFailed={handleFormSubmitFailed}
                            autoComplete="off"
                            requiredMark={false}
                        >

                            <Row gutter={16}>
                                <Col className="gutter-row" xs={24} sm={24} md={12} lg={12}>
                                    <Form.Item<Product>
                                        label="Product Name"
                                        name="name"
                                        rules={[{ required: true, message: 'Please input product name' }]}
                                    >
                                        <Input size='large' placeholder='Wall sticker' />
                                    </Form.Item>
                                </Col>
                                <Col className="gutter-row" xs={24} sm={24} md={12} lg={12}>
                                    <Form.Item<Product>
                                        label="Product Image URL"
                                        name="imageUrl"
                                        rules={[{ required: true, message: 'Please input product image url' }]}
                                    >
                                        <Input size='large' placeholder='https://example.com/image.jpg' />
                                    </Form.Item>
                                </Col>
                            </Row>



                            <Row gutter={16}>
                                <Col className="gutter-row" xs={24} sm={8} md={8} lg={8}>
                                    <Form.Item<Product>
                                        label="Product Price"
                                        name="price"
                                        rules={[{ required: true, message: 'Please input your product price' }]}
                                    >
                                        <Input size='large' placeholder='$0.00' />
                                    </Form.Item>
                                </Col>

                                <Col className="gutter-row" xs={24} sm={8} md={8} lg={8}>
                                    <Form.Item<Product>
                                        label="Product Stock"
                                        name="stock"
                                        rules={[{ required: true, message: 'Please input available stock' }]}
                                    >
                                        <Input size='large' placeholder='100' />
                                    </Form.Item>
                                </Col>
                                <Col className="gutter-row" xs={24} sm={8} md={8} lg={8}>
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
                                </Col>
                                <Col className="gutter-row" span={24}>
                                    <Form.Item<Product>
                                        label="Product Description"
                                        name="description"
                                    >
                                        <TextArea size='large' placeholder='Color full, Different size, Different shape wall mirror stickers' />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <h6 className='text-gray-800 mb-3 text-lg'>
                                Attributes
                            </h6>
                            <Form.List name="attributes">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map((field, index) => (
                                            <div className='mb-4' key={field.key}>
                                                <Card
                                                    size="small"
                                                    title={`Attribute ${index + 1}`}
                                                    extra={
                                                        <CloseOutlined
                                                            onClick={() => {
                                                                remove(field.name);
                                                            }}
                                                        />
                                                    }
                                                >
                                                    <Row gutter={16}>
                                                        <Col className="gutter-row" xs={24} sm={8} md={8} lg={8}>
                                                            <Form.Item label="Type" name={[field.name, 'type']}
                                                                rules={[{ required: true, message: 'Please input attribute type' }]}>
                                                                <Select
                                                                    placeholder='Select Attribute Type'
                                                                    size='large'

                                                                >
                                                                    {
                                                                        attributeType.length > 0 && attributeType.map((attribute) => (
                                                                            <Option key={attribute.id} value={attribute.name}>{attribute.label}</Option>
                                                                        ))
                                                                    }
                                                                </Select>
                                                            </Form.Item>
                                                        </Col>
                                                        <Col className="gutter-row" xs={24} sm={8} md={8} lg={8}>
                                                            <Form.Item
                                                                label="Name"
                                                                name={[field.name, 'code']}
                                                                rules={[{ required: true, message: 'Please input attribute name' }]}
                                                            >
                                                                <Input size='large' />
                                                            </Form.Item>
                                                        </Col>
                                                        {
                                                            attributesValues !== undefined && attributesValues[index] !== undefined && attributesValues[index].type && <Col className="gutter-row" xs={24} sm={8} md={8} lg={8}>
                                                                <Form.Item label="Value" name={[field.name, 'value']}
                                                                    rules={[{ required: true, message: 'Please input attribute value' }]}>
                                                                    {
                                                                        getValueField(attributesValues[index].type)
                                                                    }
                                                                </Form.Item>
                                                            </Col>
                                                        }

                                                    </Row>
                                                </Card>
                                            </div>
                                        ))}
                                        <Button type="primary" className='mt-3 mb-3' size='large' onClick={() => add()}>
                                            Add Attribute
                                        </Button>
                                    </>
                                )}
                            </Form.List>

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